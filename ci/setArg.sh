#!/bin/bash -x

if [ "$1" = "develop" ]; then
    echo "develop branch"
    sed 's/mems-server-api/memsserverdev\.mems/g' /tmp/nginx.conf > /tmp/nginx1.conf
elif [[ $1 == Staging* ]]; then
    echo "staging branch"
    sed 's/pds-server-api/pdsserverqa\.procuratorrate/g' /tmp/nginx.conf > /etc/nginx/nginx.conf
elif [[ $1 == Release* ]]; then
    echo "release branch"
    sed 's/pds-server-api/pds-server/g' /tmp/nginx.conf > /etc/nginx/nginx.conf
fi
