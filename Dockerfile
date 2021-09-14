FROM rust:1.55-alpine3.13

RUN apk update && apk add clang

WORKDIR /vrl-server

COPY ./server ./

RUN cargo build

CMD ["./target/debug/vrl-server"]
