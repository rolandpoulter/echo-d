---
title: Emitter
description: A reference to echo.Emitter.
---

## Summary

The `Emitter` class is a class that emits values to its handlers. It allows you to add handlers, emit values to the handlers, and remove handlers and emissions.

## Example Usage

```javascript
const emitter = new Emitter()
const handler = emitter.emitTo((value) => {
  console.log(value)
})
emitter.emit('Hello, world!')
emitter.done() // cleanup
// => 'Hello, world!'
```

## Code Analysis

### Main functionalities

The main functionalities of the `Emitter` class are:

- Adding handlers to the emitter
- Emitting values to the handlers
- Removing handlers and emissions
- Marking the emitter as done

___

### Methods

- `constructor(emissions: any[] = [], emissionsDone: boolean = false, handlers: Function[] = [], handlersDone: boolean = false)`: Constructs a new `Emitter` object.
- `cleanup()`: Cleans up the emitter by clearing all handlers and emissions if both handlers and emissions are done.
- `clear()`: Clears all handlers and emissions from the emitter.
- `done(handlersDone: boolean = true, emissionsDone: boolean = true)`: Marks the emitter as done.
- `emitTo(handler: Function, handlersDone: boolean = false)`: Adds a handler to the emitter and returns the handler.
- `emit(value: T, emissionsDone: boolean = false)`: Emits a value to the handlers of the emitter.
- `removeHandler(handler: Function)`: Removes a handler from the emitter.
- `removeEmission(emission: T)`: Removes an emission from the emitter.

___

### Fields

- `handlers: Function[]`: The handlers of the emitter.
- `emissions: T[]`: The emissions of the emitter.
- `handlersDone: boolean`: Whether or not the emitter is done emitting values for the handlers.
- `emissionsDone: boolean`: Whether or not the emitter is done emitting values for the emissions.

___
