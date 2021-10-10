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
    use super::Input;
    use crate::server::router;
    use http::StatusCode;
    use vrl::value;

    #[tokio::test]
    async fn test_successful_resolution() {
        let test_inputs: Vec<Input> = vec![
            Input {
                program: r#".foo = "bar""#.to_owned(),
                event: None,
                tz: None,
            },
            Input {
                program: r#"."#.to_owned(),
                event: Some(value![{"booper": "bopper"}]),
                tz: Some("America/Los_Angeles".into()),
            },
        ];

        for input in test_inputs {
            let res = warp::test::request()
                .method("POST")
                .path("/resolve")
                .json(&input)
                .reply(&router())
                .await;
            assert_eq!(res.status(), StatusCode::OK);
        }
    }
}
