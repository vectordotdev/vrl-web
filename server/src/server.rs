use std::net::{IpAddr, Ipv4Addr, SocketAddr};

use warp::Filter;

use crate::error::handle_err;
use crate::funcs::function_metadata;
use crate::health::healthy;
use crate::info::info;
use crate::resolve::resolve_vrl_input;

pub async fn serve() {
    let cors = warp::cors()
        .allow_any_origin()
        .allow_headers(vec!["content-type"])
        .allow_methods(vec!["GET", "POST"]);

    let resolve_endpoint = warp::path("resolve")
        .and(warp::post())
        .and(warp::body::json())
        .and_then(resolve_vrl_input);

    let functions_endpoint = warp::path("functions")
        .and(warp::get())
        .and_then(function_metadata);

    let health_endpoint = warp::path("health").and_then(healthy);

    let info_endpoint = warp::path::end().and_then(info);

    let routes = resolve_endpoint
        .or(functions_endpoint)
        .or(health_endpoint)
        .or(info_endpoint)
        .recover(handle_err)
        .with(cors);

    let addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)), 8080);

    println!("starting up the server on {}", addr.to_string());

    warp::serve(routes).run(addr).await
}
