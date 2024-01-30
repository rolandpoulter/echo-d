#!/bin/bash

if [ $# -eq 0 ]
  then
    BROWSER=1 bun run build.bun.mjs
else
    bun run build.bun.mjs
fi