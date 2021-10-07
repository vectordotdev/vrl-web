use serde::Serialize;
use std::convert::Infallible;
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

pub(crate) async fn function_metadata() -> Result<impl Reply, Infallible> {
    let functions: Vec<Function> = vrl_stdlib::all()
        .iter()
        .map(|f| Function {
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
        })
        .collect();

    Ok(json(&functions))
}
