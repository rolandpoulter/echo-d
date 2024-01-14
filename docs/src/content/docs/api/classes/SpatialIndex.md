---
editUrl: false
next: true
prev: true
title: "SpatialIndex"
---

The SpatialIndex class represents a spatial index.

## Extends

- [`Index`](/api/classes/index/)\<`V`, `ID`\>

## Type parameters

• **V**

• **ID**

## Constructors

### new SpatialIndex(items, __namedParameters)

> **new SpatialIndex**\<`V`, `ID`\>(`items`, `__namedParameters`): [`SpatialIndex`](/api/classes/spatialindex/)\<`V`, `ID`\>

#### Parameters

• **items**: `ID`[][]= `[]`

• **\_\_namedParameters**: `Object`= `{}`

• **\_\_namedParameters\.cellSize**: `undefined` \| `number`

#### Returns

[`SpatialIndex`](/api/classes/spatialindex/)\<`V`, `ID`\>

#### Overrides

[`Index.constructor`](/api/classes/index/#constructors)

#### Source

ecmascript/src/indexes/spatial.ts:11

## Properties

### cellSize

> **cellSize**: `number`

#### Source

ecmascript/src/indexes/spatial.ts:9

***

### items

> **items**: `ID`[][]

#### Overrides

[`Index.items`](/api/classes/index/#items)

#### Source

ecmascript/src/indexes/spatial.ts:8

## Methods

### clear()

> **clear**(): `void`

The clear method clears the index.

#### Returns

`void`

#### Overrides

[`Index.clear`](/api/classes/index/#clear)

#### Source

ecmascript/src/indexes/spatial.ts:19

***

### clone()

> **clone**(): [`SpatialIndex`](/api/classes/spatialindex/)\<`unknown`, `ID`\>

The clone method clones the index.

#### Returns

[`SpatialIndex`](/api/classes/spatialindex/)\<`unknown`, `ID`\>

#### Overrides

[`Index.clone`](/api/classes/index/#clone)

#### Source

ecmascript/src/indexes/spatial.ts:26

***

### get()

> **get**(`value`): `ID`[]

The get method gets a value from the index.

#### Parameters

• **value**: `V`

The value to get from the index.

#### Returns

`ID`[]

The value from the index.

#### Overrides

[`Index.get`](/api/classes/index/#get)

#### Source

ecmascript/src/indexes/spatial.ts:36

***

### has()

> **has**(`value`, `id`): `boolean`

The has method checks if a value is in the index.

#### Parameters

• **value**: `V`

The value to check in the index.

• **id**: `undefined` \| `ID`

The ID of the value to check in the index.

#### Returns

`boolean`

True if the value is in the index, false otherwise.

#### Overrides

[`Index.has`](/api/classes/index/#has)

#### Source

ecmascript/src/indexes/spatial.ts:53

***

### hash()

> **hash**(`value`): `number`

The hash method hashes 2D or 3D value.

#### Parameters

• **value**: `number`[]

The 2D or 3D value to hash.

#### Returns

`number`

The hash of the value.

#### Source

ecmascript/src/indexes/spatial.ts:71

***

### hash2d()

> **hash2d**(`x`, `y`): `number`

The hash2d method hashes a 2D value.

#### Parameters

• **x**: `number`= `0`

The X value to hash.

• **y**: `number`= `0`

The Y value to hash.

#### Returns

`number`

The hash of the 3D value.

#### Source

ecmascript/src/indexes/spatial.ts:84

***

### hash3d()

> **hash3d**(`x`, `y`, `z`): `number`

The hash3d method hashes a 3D value.

#### Parameters

• **x**: `number`= `0`

The X value to hash.

• **y**: `number`= `0`

The Y value to hash.

• **z**: `number`= `0`

The Z value to hash.

#### Returns

`number`

The hash of the 3D value.

#### Source

ecmascript/src/indexes/spatial.ts:97

***

### query()

> **query**(`query`): `ID`[]

The query method queries the manager.

#### Parameters

• **query**: `V`

The query to use.

#### Returns

`ID`[]

The result of the query.

#### Overrides

[`Index.query`](/api/classes/index/#query)

#### Source

ecmascript/src/indexes/spatial.ts:148

***

### remove()

> **remove**(`value`, `id`): `number`[]

The remove method removes a value from the index.

#### Parameters

• **value**: `V`

The value to remove from the index.

• **id**: `ID`

#### Returns

`number`[]

The value removed from the index.

#### Overrides

[`Index.remove`](/api/classes/index/#remove)

#### Source

ecmascript/src/indexes/spatial.ts:110

***

### set()

> **set**(`value`, `id`): `number`[]

The set method sets a value to the index.

#### Parameters

• **value**: `V`

The value to set to the index.

• **id**: `ID`

The ID of the value to set to the index.

#### Returns

`number`[]

The index of the value being set.

#### Overrides

[`Index.set`](/api/classes/index/#set)

#### Source

ecmascript/src/indexes/spatial.ts:131

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

#### Inherited from

[`Index.store`](/api/classes/index/#store)

#### Source

ecmascript/src/indexes/index.ts:73

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
