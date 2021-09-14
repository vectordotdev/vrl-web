FROM rust:latest AS builder

RUN rustup target add x86_64-unknown-linux-musl
RUN apt update && apt install -y musl-tools musl-dev
RUN update-ca-certificates

ENV USER=vrl-server
ENV UID=10001

RUN adduser \
  --disabled-password \
  --gecos "" \
  --home "/nonexistent" \
  --shell "/sbin/nologin" \
  --no-create-home \
  --uid "${UID}" \
  "${USER}"

WORKDIR /build

COPY ./server .

RUN ./setup.sh

RUN cargo build --target x86_64-unknown-linux-musl --release

FROM scratch

EXPOSE 8080

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /app

COPY --from=builder /build/target/x86_64-unknown-linux-musl/release/vrl-server ./

USER vrl-server:vrl-server

CMD ["/app/vrl-server"]