## The VRL Web server

The VRL Web [server] is a [Rust] web server created using the [Warp] framework. It's essentially a
thin HTTP layer over Vector Remap Language logic found in the main [Vector repo][repo], specifically
the [`vrl`][vrl_lib] libraries.

The server is deployed as a [Docker image][dockerfile] on the [Fly] PaaS platform. The current web
address of the server is https://vrl-server.fly-dev.