use ::value::{Secrets, Value};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::convert::Infallible;
use vector_common::TimeZone;
use vrl::{diagnostic::Formatter, state, value, Runtime, TargetValueRef};
use warp::{reply::json, Reply};

// The VRL program plus (optional) event plus (optional) time zone
#[derive(Deserialize, Serialize)]
pub(crate) struct Input {
    program: String,
    event: Option<Value>,
    tz: Option<String>,
}

// An enum for the result of a VRL resolution operation
#[derive(Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
enum Outcome {
    Success { output: Value, result: Value },
    Error(String),
}

// The VRL resolution logic
fn resolve(input: Input) -> Outcome {
    let mut value: Value = input.event.unwrap_or(value!({}));

    // TODO: instantiate this logic elsewhere rather than for each invocation,
    // as these values are basically constants. This is fine for now, as
    // performance shouldn't be an issue in the near term, but low-hanging fruit
    // for optimization later.
    let mut state = state::ExternalEnv::default();
    let mut runtime = Runtime::new(state::Runtime::default());

    // Default to default timezone if none
    let time_zone_str = input.tz.unwrap_or_default();

    let time_zone = match TimeZone::parse(&time_zone_str) {
        Some(tz) => tz,
        None => TimeZone::Local,
    };

    let (program, _) = match vrl::compile_with_state(&input.program, &vrl_stdlib::all(), &mut state)
    {
        Ok(program) => program,
        Err(diagnostics) => {
            let msg = Formatter::new(&input.program, diagnostics).to_string();
            return Outcome::Error(msg);
        }
    };

    let mut metadata = Value::Object(BTreeMap::new());
    let mut secrets = Secrets::new();
    let mut target = TargetValueRef {
        value: &mut value,
        metadata: &mut metadata,
        secrets: &mut secrets,
    };

    match runtime.resolve(&mut target, &program, &time_zone) {
        Ok(result) => Outcome::Success {
            output: result,
            // VRL's resolve function takes a mutable event, thus this clone
            // operation is actually on the mutated event, which may not be
            // immediately apparent here.
            result: value.clone(),
        },
        Err(err) => Outcome::Error(err.to_string()),
    }
}

// The VRL resolution logic as an HTTP handler
pub(crate) async fn resolve_vrl_input(input: Input) -> Result<impl Reply, Infallible> {
    let outcome = resolve(input);
    Ok(json(&outcome))
}

#[cfg(test)]
mod tests {
    // Just a small handful of tests here that pretty much only test the HTTP
    // plumbing. The assumption, of course, is that VRL itself has its ducks in
    // a row.

    use super::{Input, Outcome};
    use crate::server::router;
    use http::StatusCode;
    use serde_json::{json, Value};
    use vrl::{prelude::Bytes, value};

    fn assert_outcome_matches_expected(outcome: Outcome, body: &Bytes) {
        let s: String = serde_json::to_string(&outcome).unwrap();
        let b: Bytes = Bytes::from(s);

        assert_eq!(body, &b);
    }

    #[tokio::test]
    async fn test_successful_resolution() {
        let test_cases: Vec<(Input, Outcome)> = vec![
            (
                Input {
                    program: r#".foo = "bar""#.to_owned(),
                    event: None,
                    tz: None,
                },
                Outcome::Success {
                    result: value!({"foo": "bar"}),
                    output: value!("bar"),
                },
            ),
            (
                Input {
                    program: r#".tags.environment = "production"; del(.delete_me)"#.to_owned(),
                    event: Some(value!({"delete_me": "bye bye"})),
                    tz: None,
                },
                Outcome::Success {
                    result: value!({"tags": {"environment": "production"}}),
                    output: value!("bye bye"),
                },
            ),
        ];

        for tc in test_cases {
            let res = warp::test::request()
                .method("POST")
                .path("/resolve")
                .json(&tc.0)
                .reply(&router())
                .await;
            assert_eq!(res.status(), StatusCode::OK);
            assert_outcome_matches_expected(tc.1, res.body());
        }
    }

    #[tokio::test]
    async fn test_failures() {
        let test_cases: Vec<Value> = vec![
            // No program or event
            json!({"this": "won't work"}),
            // No program
            json!({"event": {"tags": {"environment": "staging"}}}),
        ];

        for tc in test_cases {
            let res = warp::test::request()
                .method("POST")
                .path("/resolve")
                .body(tc.to_string())
                .reply(&router())
                .await;
            assert_eq!(res.status(), StatusCode::BAD_REQUEST);
        }
    }
}
