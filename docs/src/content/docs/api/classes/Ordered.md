---
editUrl: false
next: true
prev: true
title: "Ordered"
---

The Ordered class represents a collection of tick values.

## Constructors

### new Ordered(order)

> **new Ordered**(`order`): [`Ordered`](/api/classes/ordered/)

Constructs a new Ordered object.

#### Parameters

• **order**: `OrderedData`= `{}`

The initial tick values.

#### Returns

[`Ordered`](/api/classes/ordered/)

#### Source

ecmascript/src/ordered.ts:23

## Methods

### changeComponent()

> **changeComponent**(`id`, `key`, `tick`): `boolean`

Changes the tick value of a component.

#### Parameters

• **id**: `string`

The ID of the component.

• **key**: `string`

The key of the component.

• **tick**: `number`

The new tick value.

#### Returns

`boolean`

Whether the operation was successful.

#### Source

ecmascript/src/ordered.ts:35

***

### reset()

> **reset**(`order`): `void`

Resets the tick values.

#### Parameters

• **order**: `OrderedData`= `{}`

The new tick values.

#### Returns

`void`

The Ordered object.

#### Source

ecmascript/src/ordered.ts:45

***

### upsertComponent()

> **upsertComponent**(`id`, `key`, `tick`): `boolean`

Inserts or updates the tick value of a component.

#### Parameters

• **id**: `string`

The ID of the component.

• **key**: `string`

The key of the component.

• **tick**: `number`

The new tick value.

#### Returns

`boolean`

Whether the operation was successful.

#### Source

ecmascript/src/ordered.ts:57

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
