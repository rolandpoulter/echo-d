---
editUrl: false
next: true
prev: true
title: "updater"
---

> **updater**(`context`, `options`, `tick`): `Promise`\<`any`[]\>

The updater function updates the context based on the provided options.

## Parameters

• **context**: [`Context`](/api/classes/context/)

The current context.

• **options**: `any`

The options for updating the context.

• **tick**: `number`= `undefined`

The current tick.

## Returns

`Promise`\<`any`[]\>

A promise that resolves to an array of arrays, where each sub-array represents a batch of updates. This is only relevant if the `batched` option is enabled.

## Source

ecmascript/src/updater.ts:45

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
