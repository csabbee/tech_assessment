#!/usr/bin/env bash

docker build -f client/Dockerfile  --build-arg prefix='/assignment' -t assignment_client .
docker build -f backend/Dockerfile -t assignment_backend .
