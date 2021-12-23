FROM rust:1.56.1 AS builder

RUN apt update && apt install -y musl-tools musl-dev

WORKDIR /build

COPY . .

RUN ./scripts/setup.sh

RUN cargo build --release --target x86_64-unknown-linux-musl

FROM alpine:3.15.0

WORKDIR /app

EXPOSE 8080

RUN apk update \
    && apk add --no-cache ca-certificates \
    && rm -rf /var/cache/apk/*

COPY --from=builder /build/target/x86_64-unknown-linux-musl/release/vrl-server ./

CMD ["./vrl-server"]
