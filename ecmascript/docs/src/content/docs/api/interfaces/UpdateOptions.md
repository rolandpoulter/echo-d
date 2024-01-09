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

updater.ts:21

***

### batched?

> **batched**?: `boolean`

#### Source

updater.ts:20

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

updater.ts:22

***

### type?

> **type**?: `any`

#### Source

updater.ts:29

***

### validkeys?

> **validkeys**?: `null` \| `Object`

#### Source

updater.ts:30

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
