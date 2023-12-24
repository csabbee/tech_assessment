#!/usr/bin/env bash

docker build -f client/Dockerfile -t assignment_client .
docker build -f backend/Dockerfile -t assignment_backend .
