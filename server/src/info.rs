use serde::Serialize;
use std::convert::Infallible;
use warp::{reply::json, Reply};

#[derive(Serialize)]
struct Info {
    vector_version: &'static str,
    vrl_version: &'static str,
}

pub async fn info() -> Result<impl Reply, Infallible> {
    let info = Info {
        vector_version: "0.17.0",
        vrl_version: "0.1.0",
    };

    Ok(json(&info))
}
