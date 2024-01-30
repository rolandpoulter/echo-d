#!/bin/bash

if [ $# -eq 0 ]
  then
    BROWSER=1 deno task build
else
    deno task build
fi
