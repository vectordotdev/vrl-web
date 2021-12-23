use std::net::{IpAddr, Ipv4Addr, SocketAddr};

use structopt::StructOpt;
use warp::{reject::Rejection, Filter, Reply};

use crate::error::handle_err;
use crate::funcs::vrl_function_info;
use crate::health::healthy;
use crate::info::info;
use crate::resolve::resolve_vrl_input;

// The server logic is encapsulated in its own function for testing purposes
pub(crate) fn router() -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    // CORS helpers for the VRL Web client
    let cors = warp::cors()
        .allow_any_origin()
        .allow_headers(vec!["content-type"])
        .allow_methods(vec!["GET", "POST"]);

    // The core /resolve endpoint
    let resolve_endpoint = warp::path("resolve")
        .and(warp::post())
        .and(warp::body::json())
        .and_then(resolve_vrl_input);

    // The /functions endpoint, which provides info about VRL itself
    let functions_endpoint = warp::path("functions")
        .and(warp::get())
        .and_then(vrl_function_info);

    // The /health endpoint
    let health_endpoint = warp::path("health").and_then(healthy);

    // The basic VRL server endpoint (the root)
    let info_endpoint = warp::path::end().and(warp::get()).and_then(info);

    resolve_endpoint
        .or(functions_endpoint)
        .or(health_endpoint)
        .or(info_endpoint)
        .recover(handle_err)
        .with(cors)
}

// CLI helper struct
#[derive(Debug, StructOpt)]
#[structopt(version = "0.1.0", author = "Vector Contributors <vector@datadoghq.com>")]
struct Opts {
    #[structopt(env, short, long, default_value = "8080")]
    port: u16,
}

pub async fn serve() {
    let opts = Opts::from_args();

    // TODO: provide some actual logging if that proves necessary
    pretty_env_logger::init();

    let addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)), opts.port);

    warp::serve(router()).run(addr).await
}
