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
emitter.done() // cleanup
// => 'Hello, world!'
```

## Type parameters

• **T**

## Constructors

### new Emitter(emissions, emissionsDone, handlers, handlersDone)

> **new Emitter**\<`T`\>(`emissions`, `emissionsDone`, `handlers`, `handlersDone`): [`Emitter`](/api/classes/emitter/)\<`T`\>

Constructs a new Emitter object.

#### Parameters

• **emissions**: `any`[]= `[]`

• **emissionsDone**: `boolean`= `false`

• **handlers**: `Function`[]= `[]`

• **handlersDone**: `boolean`= `false`

#### Returns

[`Emitter`](/api/classes/emitter/)\<`T`\>

#### Source

ecmascript/src/emitter.ts:29

## Properties

### emissions

> **emissions**: `T`[]

#### Source

ecmascript/src/emitter.ts:21

***

### emissionsDone

> **emissionsDone**: `boolean`

#### Source

ecmascript/src/emitter.ts:24

***

### handlers

> **handlers**: `Function`[]

The handlers of the Emitter.

#### Source

ecmascript/src/emitter.ts:20

***

### handlersDone

> **handlersDone**: `boolean`

#### Source

ecmascript/src/emitter.ts:23

## Methods

### cleanup()

> **cleanup**(): `void`

Cleans up the Emitter.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:47

***

### clear()

> **clear**(): `void`

Clears all handlers and emissions from the Emitter.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:56

***

### done()

> **done**(`handlersDone`, `emissionsDone`): `void`

Marks the Emitter as done.

#### Parameters

• **handlersDone**: `boolean`= `true`

Whether or not the Emitter is done emitting values.

• **emissionsDone**: `boolean`= `true`

Whether or not the Emitter is done emitting values.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:69

***

### emit()

> **emit**(`value`, `emissionsDone`): `void`

Emits a value to the handlers of the Emitter.

#### Parameters

• **value**: `T`

The value to emit to the handlers of the Emitter.

• **emissionsDone**: `boolean`= `false`

Whether or not the Emitter is done emitting values.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:99

***

### emitTo()

> **emitTo**(`handler`, `handlersDone`): `void`

Adds a handler to the Emitter and returns the handler.

#### Parameters

• **handler**: `Function`

The handler to add to the Emitter.

• **handlersDone**: `boolean`= `false`

Whether or not the Emitter is done emitting values.

#### Returns

`void`

The handler.

#### Source

ecmascript/src/emitter.ts:82

***

### removeEmission()

> **removeEmission**(`emission`): `void`

Removes an emission from the Emitter.

#### Parameters

• **emission**: `T`

The emission to remove from the Emitter.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:127

***

### removeHandler()

> **removeHandler**(`handler`): `void`

Removes a handler from the Emitter.

#### Parameters

• **handler**: `Function`

The handler to remove from the Emitter.

#### Returns

`void`

#### Source

ecmascript/src/emitter.ts:115

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
