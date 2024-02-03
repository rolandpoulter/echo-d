Fast, simple network layer for Entity-Component Systems

<table align="center" border="0"><tr><td align="center" width="9999">
<img alt="Dolphin" src="https://github.com/rolandpoulter/echo-d/blob/main/docs/public/dolphin/echo-d-dolphin.png?raw=true" width="30%" style="transform: scaleX(-1) scaleY(0.9) rotate(25deg);" />

# Echo-D (rs)

Distributed Entity-Component network protocol for Rust
</td></tr></table>


### [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# WIP! The Rust implementation is coming soon...

## Installation

Install **Echo-D** with cargo

```bash
  cargo install echo-d
```

## Basic Usage

Here is an example snippet that shows the basic usage of **Echo-D**:

```rust
use log::info;
use crate:echo-d::{Handler, Context, Options}

const context = new Context({
  // events
});

fn responder(data) => {
  otherEchoD.many(data)
}

fn onUpdate() {
  // events.emit('update')
}

const options = new Options({
  responder: responder,
  onUpdate: onUpdate,
});

const echoD = new EchoD(context, options);

echoD.spawnActor('actor')

const input = Input { type: 'jump' }
echoD.actorInput('actor', input)

echoD.spawnEntity('entity')
echoD.upsertComponent('entity', 'component', 'value')

fn onUpdated() {
  info!('update finished');
}

const update = echoD.updater()
update.then(onUpdated)

```

## Documentation

Please refer to the documentation for more detailed information:

[Documentation](https://echo-d.net/guides/quick_start/)

# Development Guide

**Echo-D** (rs) is developed and tested for `rust`.
It is required to have `rust` installed for development.

## Building WASM

To build a WASM module, run the following command:

```bash
  # TODO
```

## Running Tests

To run tests, run the following command:

```bash
  # TODO
```
