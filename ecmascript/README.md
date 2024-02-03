<table align="center" border="0"><tr><td align="center" width="9999">
<img alt="Dolphin" src="https://github.com/rolandpoulter/echo-d/blob/main/docs/public/dolphin/echo-d-dolphin.png?raw=true" width="30%" style="transform: scaleX(-1) scaleY(0.9) rotate(25deg);" />

# Echo-D (es)
</td></tr></table>

Distributed Entity-Component network protocol for JavaScript

### [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Prerequisites

* A JavaScript runtime is required. **Echo-D** has been test using:
  * Modern Browsers (Chrome, Edge, and FireFox)
  * Bun, Deno and Node.JS

## Installation

Install **Echo-D** with npm, pnpm, or yarn

```bash
  npm install echo-d 
```

## Basic Usage

Here is an example snippet that shows the basic usage of **Echo-D**:

```js
import EchoD from 'echo-d';
import { EventEmitter } from 'node:events';

const context = {
  events: new EventEmitter()
};

const options = {
  responder(data) => {
    otherEchoD.many(data)
  },
  onUpdate() {
    context.events.emit('update')
  }
};

const echoD = new EchoD(context, options);

echoD.spawnActor('actor')
echoD.actorInput('actor', { type: 'jump' })

echoD.spawnEntity('entity')
echoD.upsertComponent('entity', 'component', 'value')

echoD.updater().then(() => console.log('update finished'))
```

## Documentation

Please refer to the documentation for more detailed information:

[Documentation](https://echo-d.org/guides/quick_start/)

# Development Guide

**Echo-D** (es) is developed and tested for `web`, `bun`, `deno`, and `node.js`.
It is recommended to have `bun`, `deno`, and `node.js` installed for development.

## Building web bundle

To bundle for the web, run one of the following commands:

```bash
  script/build/all.sh # build them all:
  script/build/bun.sh # build with bun
  script/build/deno.sh # build with deno/esbuild
  script/build/node.sh # build with node/webpack
```

## Running Tests

To run tests, run one of the following commands:

```bash
  script/test/all.sh # test them all:
  script/test/web.sh # test in the web with puppeteer
  script/test/sys.sh # test the system tests:
  script/test/sys-bun.sh # test with bun
  script/test/sys-deno.sh # test with deno
  script/test/sys-node.sh # test with node
```
