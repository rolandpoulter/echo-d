---
editUrl: false
next: true
prev: true
title: "Index"
---

The Index class represents an index.

## Extended By

- [`ComponentsIndex`](/api/classes/componentsindex/)
- [`SortedIndex`](/api/classes/sortedindex/)
- [`SpatialIndex`](/api/classes/spatialindex/)

## Type parameters

• **V**

• **ID**

## Constructors

### new Index(items, _options)

> **new Index**\<`V`, `ID`\>(`items`, `_options`): [`Index`](/api/classes/index/)\<`V`, `ID`\>

#### Parameters

• **items**: `any`= `null`

• **\_options**: `any`= `{}`

#### Returns

[`Index`](/api/classes/index/)\<`V`, `ID`\>

#### Source

ecmascript/src/indexes/index.ts:8

## Properties

### items

> **items**: `any`

#### Source

ecmascript/src/indexes/index.ts:6

## Methods

### clear()

> **clear**(): `void`

The clear method clears the index.

#### Returns

`void`

#### Source

ecmascript/src/indexes/index.ts:15

***

### clone()

> **clone**(): `any`

The clone method clones the index.

#### Returns

`any`

#### Source

ecmascript/src/indexes/index.ts:22

***

### get()

> **get**(`_value`): `any`

The get method gets a value from the index.

#### Parameters

• **\_value**: `any`

The value to get from the index.

#### Returns

`any`

The value from the index.

#### Source

ecmascript/src/indexes/index.ts:32

***

### has()

> **has**(`_value`, `_id`): `boolean`

The has method checks if a value is in the index.

#### Parameters

• **\_value**: `any`

The value to check in the index.

• **\_id**: `any`

The ID of the value to check in the index.

#### Returns

`boolean`

True if the value is in the index, false otherwise.

#### Source

ecmascript/src/indexes/index.ts:41

***

### query()

> **query**(`_query`): `any`

The query method queries the index.

#### Parameters

• **\_query**: `any`

The query to use.

#### Returns

`any`

The result of the query.

#### Source

ecmascript/src/indexes/index.ts:86

***

### remove()

> **remove**(`_value`, `_id`): `any`

The remove method removes a value from the index.

#### Parameters

• **\_value**: `any`

The value to remove from the index.

• **\_id**: `any`

The ID of the value to remove from the index.

#### Returns

`any`

The value removed from the index.

#### Source

ecmascript/src/indexes/index.ts:52

***

### set()

> **set**(`_value`, `_id`): `any`

The set method sets a value to the index.

#### Parameters

• **\_value**: `any`

The value to set to the index.

• **\_id**: `any`

The ID to set to the index.

#### Returns

`any`

The value being set.

#### Source

ecmascript/src/indexes/index.ts:61

***

### store()

> **store**(`id`, `preValue`, `value`): `any`

The store method stores a value to the index.

#### Parameters

• **id**: `ID`

The ID of the value to store.

• **preValue**: `V`

The previous value to store to the index.

• **value**: `V`

The value to store to the index.

#### Returns

`any`

The value being stored.

#### Source

ecmascript/src/indexes/index.ts:73

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
