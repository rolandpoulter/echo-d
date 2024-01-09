---
title: Emitter
description: A reference to echo.Emitter.
---

## Summary

The `Emitter` class is a class that emits values to its handlers. It allows you to add handlers and emit values to those handlers.

## Example Usage

```javascript
const emitter = new Emitter()
const handler = emitter.emitTo((value) => {
  console.log(value)
})
emitter.emit('Hello, world!')
// => 'Hello, world!'
```

## Code Analysis

### Main functionalities

The main functionality of the `Emitter` class is to allow you to add handlers and emit values to those handlers. It provides methods to add a handler and emit a value.
___

### Methods

- `emitTo(handler: Function): Function`: Adds a handler to the Emitter and returns the handler.
- `emit(value: T): void`: Emits a value to the handlers of the Emitter.

___

### Fields

- `handlers: Function[]`: The handlers of the Emitter.

___
