## The VRL Web server

The VRL Web [server] is a [Rust] web server created using the [Warp] framework. It's essentially a
thin HTTP layer over Vector Remap Language logic found in the main [Vector repo][repo], specifically
the [`vrl`][vrl_lib] libraries.

The server is deployed as a [Docker image][dockerfile] on the [Fly] PaaS platform. The current web
address of the server is https://vrl-server.fly.dev.

## API

The VRL Web server's API is described in [OpenAPI] format in [`openapi.yaml`][api].

[api]: ./api/openapi.yaml
[dockerfile]: ./vrl-web-server-warp/Dockerfile
[fly]: https://fly.io
[openapi]: https://www.openapis.org
[repo]: https://github.com/vectordotdev/vector
[rust]: https://rust-lang.org
[server]: ./vrl-web-server-warp
[vrl_lib]: https://github.com/vectordotdev/vector/tree/master/lib/vrl
[warp]: https://github.com/seanmonstar/warp