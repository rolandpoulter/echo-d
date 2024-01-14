---
editUrl: false
next: true
prev: true
title: "UpdateOptions"
---

The UpdateOptions interface represents the options for updating the application.
It includes information about the type of update, whether the update is batched, the batch size, and the valid keys.

## Properties

### batchSize?

> **batchSize**?: `number`

#### Source

ecmascript/src/updater.ts:24

***

### batched?

> **batched**?: `boolean`

#### Source

ecmascript/src/updater.ts:23

***

### mask?

> **mask**?: `Object`

#### Type declaration

##### actors?

> **actors**?: `boolean`

##### components?

> **components**?: `boolean`

##### entities?

> **entities**?: `boolean`

##### inputs?

> **inputs**?: `boolean`

##### symbols?

> **symbols**?: `boolean`

#### Source

ecmascript/src/updater.ts:25

***

### type?

> **type**?: `any`

#### Source

ecmascript/src/updater.ts:32

***

### validkeys?

> **validkeys**?: `null` \| `Object`

#### Source

ecmascript/src/updater.ts:33

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
