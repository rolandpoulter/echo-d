---
editUrl: false
next: true
prev: true
title: "Emitter"
---

Emitter

## Description

An Emitter is a class that emits values to its handlers.

## Method

emitTo - Adds a handler to the Emitter and returns the handler.

## Method

emit - Emits a value to the handlers of the Emitter.

## Example

```ts
const emitter = new Emitter()
const handler = emitter.emitTo((value) => {
 console.log(value)
})
emitter.emit('Hello, world!')
// => 'Hello, world!'
```

## Type parameters

• **T**

## Constructors

### new Emitter()

> **new Emitter**\<`T`\>(): [`Emitter`](/api/classes/emitter/)\<`T`\>

Constructs a new Emitter object.

#### Returns

[`Emitter`](/api/classes/emitter/)\<`T`\>

#### Source

ecmascript/src/emitter.ts:24

## Properties

### handlers

> **handlers**: `Function`[]

The handlers of the Emitter.

#### Source

ecmascript/src/emitter.ts:19

## Methods

### emit()

> **emit**(`value`): `void`

Emits a value to the handlers of the Emitter.

#### Parameters

• **value**: `T`

The value to emit to the handlers of the Emitter.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:45

***

### emitTo()

> **emitTo**(`handler`): `Function`

Adds a handler to the Emitter and returns the handler.

#### Parameters

• **handler**: `Function`

The handler to add to the Emitter.

#### Returns

`Function`

The handler.

#### Source

ecmascript/src/emitter.ts:34

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
