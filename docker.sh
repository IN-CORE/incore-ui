#!/bin/sh

# Exit on error
set -e

# use DEBUG=echo ./docker.sh to print all commands
export DEBUG=${DEBUG:-""}

# Specify IN-CORE service to use, default is relative for deployment
export INCORE_REMOTE_HOSTNAME=${INCORE_REMOTE_HOSTNAME:-""}

echo "Building frontend for $INCORE_REMOTE_HOSTNAME"

# Build docker image
$DEBUG docker build --build-arg INCORE_REMOTE_HOSTNAME="${INCORE_REMOTE_HOSTNAME}" -t incore/frontend .
