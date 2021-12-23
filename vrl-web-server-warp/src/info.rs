use serde::Serialize;
use std::convert::Infallible;
use warp::{reply::json, Reply};

// Basic info about the VRL Web server
#[derive(Serialize)]
struct Info {
    vector_version: &'static str,
    vrl_version: &'static str,
    mascot: &'static str,
}

pub(crate) async fn info() -> Result<impl Reply, Infallible> {
    // TODO: find a way to do this more programmatically
    let info = Info {
        vector_version: "0.19.0",
        // TODO: enact a versioning scheme for VRL
        vrl_version: "0.1.0",
        mascot: "Vector Vic",
    };

    Ok(json(&info))
}
