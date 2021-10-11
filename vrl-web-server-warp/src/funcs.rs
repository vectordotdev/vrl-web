use serde::Serialize;
use std::convert::{From, Infallible};
use vrl::prelude::Kind;
use warp::{reply::json, Reply};

#[derive(Serialize)]
struct Example {
    title: &'static str,
    source: &'static str,
}

#[derive(Serialize)]
struct Parameter {
    name: &'static str,
    kind: &'static str,
    required: bool,
}

#[derive(Serialize)]
struct Function {
    name: &'static str,
    parameters: Vec<Parameter>,
    examples: Vec<Example>,
}

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

pub(crate) async fn function_metadata() -> Result<impl Reply, Infallible> {
    let functions: Vec<Function> = vrl_stdlib::all().iter().map(Function::from).collect();

    Ok(json(&functions))
}
