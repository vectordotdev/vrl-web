FROM rust:1.55.0 AS builder

RUN rustup target add x86_64-unknown-linux-musl
RUN apt update && apt install -y musl-tools musl-dev

WORKDIR /build

COPY ./server .

RUN ./setup.sh

RUN cargo build --target x86_64-unknown-linux-musl --release

FROM alpine:3.14

# For use by VRL's get_env_var()
ENV ENV production

WORKDIR /app

EXPOSE 8080

RUN apk update \
    && apk add --no-cache ca-certificates \
    && rm -rf /var/cache/apk/*

COPY --from=builder /build/target/x86_64-unknown-linux-musl/release/vrl-server ./

CMD ["./vrl-server"]
