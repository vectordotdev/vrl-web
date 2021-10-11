use std::net::{IpAddr, Ipv4Addr, SocketAddr};

use clap::{AppSettings, Clap};
use warp::{reject::Rejection, Filter, Reply};

use crate::error::handle_err;
use crate::funcs::vrl_function_info;
use crate::health::healthy;
use crate::info::info;
use crate::resolve::resolve_vrl_input;

// The server logic is put into a function for testing purposes
pub(crate) fn router() -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
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
        .and_then(vrl_function_info);

    let health_endpoint = warp::path("health").and_then(healthy);

    let info_endpoint = warp::path::end().and(warp::get()).and_then(info);

    resolve_endpoint
        .or(functions_endpoint)
        .or(health_endpoint)
        .or(info_endpoint)
        .recover(handle_err)
        .with(cors)
}

#[derive(Clap)]
#[clap(version = "0.1.0", author = "Vector Contributions <vector@timber.io>")]
#[clap(setting = AppSettings::ColoredHelp)]
struct Opts {
    #[clap(env, short, long, default_value = "8080")]
    port: u16,
}

pub async fn serve() {
    let opts = Opts::parse();

    pretty_env_logger::init();

    let addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)), opts.port);

    warp::serve(router()).run(addr).await
}
