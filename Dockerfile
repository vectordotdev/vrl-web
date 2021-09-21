FROM rust:1.55.0 AS builder

RUN cargo install cargo-make
RUN apt update && apt install -y musl-tools musl-dev
RUN ./setup.sh

WORKDIR /build

COPY ./server .

RUN cargo make build-alpine

FROM alpine:3.14

WORKDIR /app

EXPOSE 8080

RUN apk update \
    && apk add --no-cache ca-certificates \
    && rm -rf /var/cache/apk/*

COPY --from=builder /build/target/x86_64-unknown-linux-musl/release/vrl-server ./

CMD ["./vrl-server"]
