# VRL Web

This repo houses the assets used to build VRL Web, a browser interface for experimenting with
[Vector Remap Language][vrl], a DSL for interactive with observability data that you can use in some
Vector [transforms], most notably the [`remap`][remap] transform. You can visit the app at
https://vrl-web.netlify.app.

## Status

VRL Web is currently a work in progress. The basic contours are essentially in place—e.g. choosing
from pre-selected example scenarios and resolving real program/event combinations—but the aesthetic
and the UX remain a bit rough around the edges. This will change over the coming weeks and months.

## Client

[![Netlify Status](https://api.netlify.com/api/v1/badges/da078a1c-a658-4e9b-9467-262b4d3afe9b/deploy-status)](https://app.netlify.com/sites/vrl-web/deploys)

The VRL Web [client] is a [React.js][react] application written in [TypeScript]. It uses [Tailwind]
for CSS, [Zustand] for state management, [Axios] for its HTTP client, and the [Monaco
Editor][monaco] for code windows.

The web app is deployed automatically using [Netlify].

## Server

The VRL Web [server] is a [Rust] web server created using the [Warp] framework. It's essentially a
thin HTTP layer over Vector Remap Language logic found in the main [Vector repo][repo], specifically
the [`vrl`][vrl_lib] libraries.

The server is deployed as a [Docker image][dockerfile] on the [Fly] PaaS platform. The current web
address of the server is https://vrl-server.fly-dev.

[axios]: https://axios-http.com
[client]: ./vrl-web-client
[dockerfile]: ./vrl-web-server-warp/Dockerfile
[fly]: https://fly.io
[monaco]: https://microsoft.github.io/monaco-editor
[netlify]: https://netlify.com
[react]: https://reactjs.org
[remap]: https://vector.dev/docs/reference/configuration/transforms/remap
[repo]: https://github.com/vectordotdev/vector
[rust]: https://rust-lang.org
[server]: ./vrl-web-server-warp
[tailwind]: https://tailwindcss.com
[transforms]: https://vector.dev/docs/reference/configuration/transforms
[typescript]: https://typescriptlang.org
[vrl]: https://vrl.dev
[vrl_lib]: https://github.com/vectordotdev/vector/tree/master/lib/vrl
[warp]: https://github.com/seanmonstar/warp
[zustand]: https://zustand.surge.sh
