#!/bin/bash -x

if [ "$1" = "develop" ]; then
    echo "develop branch"
    sed 's/mems-server-api/memsserverdev\.mems/g' /tmp/nginx.conf > /tmp/nginx1.conf
    sed 's/mems-hasura-server/mems-hasura-dev.mems-demo/g' /tmp/nginx1.conf > /etc/nginx/nginx.conf
elif [[ $1 == Staging* ]]; then
    echo "staging branch"
    sed 's/pbd-server-api/pbdserverqa\.mems/g' /tmp/nginx.conf > /tmp/nginx1.conf
elif [[ $1 == Release* ]]; then
    echo "release branch"
    sed 's/mems-server-api/10.10.10.4/g' /tmp/nginx.conf > /tmp/nginx1.conf
    sed 's/mems-hasura-server/10.10.10.5/g' /tmp/nginx1.conf > /etc/nginx/nginx.conf
fi
