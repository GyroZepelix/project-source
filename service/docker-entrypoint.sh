#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

# Wait for the backend to be up, if we know where it is.
if [ -n "$CASSANDRA_HOST" ]; then
  wait-for-it "$CASSANDRA_HOST:${CASSANDRA_PORT:-6000}" --timeout=30
fi

# Run the main container command.
exec "$@"