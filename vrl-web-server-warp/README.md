## The VRL Web server

The VRL Web [server] is a [Rust] web server created using the [Warp] framework. It's essentially a
thin HTTP layer over Vector Remap Language logic found in the main [Vector repo][repo], specifically
the [`vrl`][vrl_lib] libraries.

The server is deployed as a [Docker image][dockerfile] on the [Fly] PaaS platform. The current web
address of the server is https://vrl-server.fly.dev.

## Running locally

```shell
cargo run
```

## Deploying

The server is deployed as a Docker image running on [Fly]. To build and push the image:

```shell
make docker-build && make docker-push
```

This currently uses the `lucperkins` org on Docker Hub but we will update this to the
`vectordotdev` org later on.

## API

The VRL Web server's API is described in [OpenAPI] format in [`openapi.yaml`][api]. Below are some
example API calls (using [HTTPie]).

### Get VRL function info

```shell
http :8080/functions
```

### Resolve an event/program

```shell
http post :8080/resolve program='.id = uuid_v4(); .timestamp = now()' event:='{"message":"success"}'
```

Example result:

```json
{
  "success": {
    "output": "2021-11-19T15:56:54.908681Z",
    "result": {
      "id": "b2d63616-a0b1-4943-aed8-d6be509371e9",
      "message": "success",
      "timestamp": "2021-11-19T15:56:54.908681Z"
    }
  }
}
```

### Resolve just a program

```shell
http post :8080/resolve program='includes(["apple"], "orange")'
```

Result:

```json
{
  "success": {
    "output": false,
    "result": {}
  }
}
```

[api]: ./api/openapi.yaml
[dockerfile]: ./vrl-web-server-warp/Dockerfile
[fly]: https://fly.io
[httpie]: https://httpie.io
[openapi]: https://www.openapis.org
[repo]: https://github.com/vectordotdev/vector
[rust]: https://rust-lang.org
[server]: ./vrl-web-server-warp
[vrl_lib]: https://github.com/vectordotdev/vector/tree/master/lib/vrl
[warp]: https://github.com/seanmonstar/warp