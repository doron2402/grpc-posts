#!/bin/bash

# Generate gRPC code
npx proto-loader-gen-types \
--defaults \
--oneofs \
--outDir=./proto \
--grpcLib=@grpc/grpc-js \
proto/*.proto \
