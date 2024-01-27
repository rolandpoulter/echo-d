#!/bin/bash

if [ $# -eq 0 ]
  then
    npm run build
fi

npm run build && npm run test-node
