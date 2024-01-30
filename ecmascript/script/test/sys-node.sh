#!/bin/bash

if [ $# -eq 0 ]
  then
    npm run build
    npm run test-node
else
  npm run test-coverage
fi
