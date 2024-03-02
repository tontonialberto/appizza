#!/bin/bash

USERNAME=$1
PASSWORD=$2

if [[ -z $USERNAME || -z $PASSWORD ]]; then
    echo "Usage: $0 <USERNAME> <PASSWORD>"
    exit 1
fi

curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "username=$USERNAME&password=$PASSWORD" http://localhost:8000/api/login_verify.api.php
