use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use vector_shared::TimeZone;
use vrl::{diagnostic::Formatter, state, value, Runtime, Value};
use warp::{reply::json, Reply};

#[derive(Deserialize, Serialize)]
pub(crate) struct Input {
    program: String,
    event: Option<Value>,
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
    let tz = TimeZone::default();

    let program = match vrl::compile_with_state(&input.program, &vrl_stdlib::all(), &mut state) {
        Ok(program) => program,
        Err(diagnostics) => {
            let msg = Formatter::new(&input.program, diagnostics).to_string();
            return Outcome::Error(msg);
        }
    };

    match runtime.resolve(event, &program, &tz) {
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
