#!/bin/sh

# Exit on error
set -e

# use DEBUG=echo ./docker.sh to print all commands
export DEBUG=${DEBUG:-""}

# Find out what branch we are on
BRANCH=${BRANCH:-"$(git rev-parse --abbrev-ref HEAD)"}

# Find out the version
if [ "$BRANCH" = "master" ]; then
    VERSION="latest"
elif [ "${BRANCH}" = "develop" ]; then
    VERSION="develop"
else
    exit 0
fi

# Build docker image
$DEBUG docker build --build-arg -t hub.ncsa.illinois.edu/incore/frontend:$VERSION .
