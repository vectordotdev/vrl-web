use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use vector_shared::TimeZone;
use vrl::{diagnostic::Formatter, state, value, Runtime, Value};
use warp::{reply::json, Reply};

#[derive(Deserialize, Serialize)]
pub(crate) struct Input {
    program: String,
    event: Option<Value>,
    tz: Option<String>,
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
enum Outcome {
    Success { output: Value, result: Value },
    Error(String),
}

fn resolve(input: Input) -> Outcome {
    let mut value: Value = input.event.unwrap_or(value!({}));

    let event = &mut value;
    let mut state = state::Compiler::default();
    let mut runtime = Runtime::new(state::Runtime::default());

    let time_zone_str = input.tz.unwrap_or("local".into());

    let time_zone = match TimeZone::parse(&time_zone_str) {
        Some(tz) => tz,
        None => TimeZone::Local,
    };

    let program = match vrl::compile_with_state(&input.program, &vrl_stdlib::all(), &mut state) {
        Ok(program) => program,
        Err(diagnostics) => {
            let msg = Formatter::new(&input.program, diagnostics).to_string();
            return Outcome::Error(msg);
        }
    };

    match runtime.resolve(event, &program, &time_zone) {
        Ok(result) => Outcome::Success {
            output: result,
            result: event.clone(),
        },
        Err(err) => Outcome::Error(err.to_string()),
    }
}

pub(crate) async fn resolve_vrl_input(input: Input) -> Result<impl Reply, Infallible> {
    let outcome = resolve(input);
    Ok(json(&outcome))
}

#[cfg(test)]
mod tests {
    use super::{Input, Outcome};
    use crate::server::router;
    use http::StatusCode;
    use vrl::{prelude::Bytes, value};

    fn assert_outcome_matches_expected(outcome: Outcome, body: &Bytes) {
        let s: String = serde_json::to_string(&outcome).unwrap();
        let b: Bytes = Bytes::from(s);

        assert_eq!(body, &b);
    }

    #[tokio::test]
    async fn test_fully_successful_resolution() {
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
                    program: r#".tags.environment = "staging"; del(.delete_me)"#.to_owned(),
                    event: Some(value!({"delete_me": "bye bye"})),
                    tz: None,
                },
                Outcome::Success {
                    result: value!({"tags": {"environment": "staging"}}),
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
}
