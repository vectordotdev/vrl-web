use vrl_server::server;

#[tokio::main]
async fn main() {
    server::serve().await
}
