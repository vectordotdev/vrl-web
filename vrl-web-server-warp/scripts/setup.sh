#!/bin/sh

# Setup script for MUSL builds (used only in the Docker build process)

apt-get update && apt-get install -y apt-transport-https wget gnupg2

cat <<-EOF > /etc/apt/sources.list.d/llvm.list
deb http://apt.llvm.org/xenial/ llvm-toolchain-xenial-9 main
deb-src http://apt.llvm.org/xenial/ llvm-toolchain-xenial-9 main
EOF

wget -O - https://apt.llvm.org/llvm-snapshot.gpg.key | apt-key add -

apt-get update && apt-get install -y libclang1-9 llvm-9