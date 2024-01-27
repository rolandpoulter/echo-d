#!/bin/bash

if [ $# -eq 0 ]
  then
    npm run build
fi

deno task test --allow-hrtime
