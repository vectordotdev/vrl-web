use serde::Serialize;
use std::convert::Infallible;
use warp::{reply::json, Reply};

// Health check endpoint
#[derive(Serialize)]
struct Health {
    ok: bool,
}

// Health OK as HTTP JSON response
pub(crate) async fn healthy() -> Result<impl Reply, Infallible> {
    let healthy = Health { ok: true };

    Ok(json(&healthy))
}
