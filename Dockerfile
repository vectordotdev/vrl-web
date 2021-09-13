FROM rust:1.55 AS builder

WORKDIR /vrl-server

COPY ./vector/rust-toolchain ./vector/Cargo.* ./vector/lib/shared/ ./vector/lib/vrl/ ./

RUN cargo build --package vrl-server --release

CMD ["./target/release/vrl-server"]