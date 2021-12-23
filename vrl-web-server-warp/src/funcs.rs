use serde::Serialize;
use std::convert::{From, Infallible};
use vrl::prelude::Kind;
use warp::{reply::json, Reply};

// VRL example
#[derive(Serialize)]
struct Example {
    title: &'static str,
    source: &'static str,
}

// VRL function parameter
#[derive(Serialize)]
struct Parameter {
    name: &'static str,
    kind: &'static str,
    required: bool,
}

// VRL function info
#[derive(Serialize)]
struct Function {
    name: &'static str,
    parameters: Vec<Parameter>,
    examples: Vec<Example>,
}

// Convert a VRL Function struct into our custom Function type (to display as JSON)
impl From<&Box<dyn vrl::Function>> for Function {
    fn from(f: &Box<dyn vrl::Function>) -> Function {
        Function {
            name: f.identifier(),
            parameters: f
                .parameters()
                .iter()
                .map(|p| Parameter {
                    name: p.keyword,
                    kind: Kind::new(p.kind).as_str(),
                    required: p.required,
                })
                .collect(),
            examples: f
                .examples()
                .iter()
                .map(|e| Example {
                    title: e.title,
                    source: e.source,
                })
                .collect(),
        }
    }
}

// All VRL function info as an HTTP JSON response
pub(crate) async fn vrl_function_info() -> Result<impl Reply, Infallible> {
    let functions: Vec<Function> = vrl_stdlib::all().iter().map(Function::from).collect();

    Ok(json(&functions))
}
