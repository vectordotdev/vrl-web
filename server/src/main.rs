use structopt::StructOpt;
use vrl_server::{serve, Opts};

#[tokio::main]
async fn main() {
    let opts = Opts::from_args();
    serve(opts).await
}