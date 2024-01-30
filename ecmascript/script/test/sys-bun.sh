#!/bin/bash

if [ $# -eq 0 ]
  then
    npm run build
fi

bun test test/env/bun
