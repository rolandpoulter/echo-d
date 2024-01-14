---
editUrl: false
next: true
prev: true
title: "SortedIndex"
---

SortedIndex class represents a sorted index.

## Extends

- [`Index`](/api/classes/index/)\<`V`, `ID`\>

## Type parameters

• **V**

• **ID**

## Constructors

### new SortedIndex(items, _options)

> **new SortedIndex**\<`V`, `ID`\>(`items`, `_options`): [`SortedIndex`](/api/classes/sortedindex/)\<`V`, `ID`\>

#### Parameters

• **items**: [`V`, `ID`[]][]= `[]`

• **\_options**: `any`= `{}`

#### Returns

[`SortedIndex`](/api/classes/sortedindex/)\<`V`, `ID`\>

#### Overrides

[`Index.constructor`](/api/classes/index/#constructors)

#### Source

ecmascript/src/indexes/sorted.ts:65

## Properties

### items

> **items**: [`V`, `ID`[]][]

#### Overrides

[`Index.items`](/api/classes/index/#items)

#### Source

ecmascript/src/indexes/sorted.ts:63

## Methods

### clear()

> **clear**(): `void`

The clear method clears the index.

#### Returns

`void`

#### Overrides

[`Index.clear`](/api/classes/index/#clear)

#### Source

ecmascript/src/indexes/sorted.ts:72

***

### clone()

> **clone**(): [`SortedIndex`](/api/classes/sortedindex/)\<`V`, `ID`\>

The clone method clones the index.

#### Returns

[`SortedIndex`](/api/classes/sortedindex/)\<`V`, `ID`\>

#### Overrides

[`Index.clone`](/api/classes/index/#clone)

#### Source

ecmascript/src/indexes/sorted.ts:79

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

ecmascript/src/indexes/sorted.ts:89

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

ecmascript/src/indexes/sorted.ts:104

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

ecmascript/src/indexes/sorted.ts:146

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

ecmascript/src/indexes/sorted.ts:122

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

ecmascript/src/indexes/sorted.ts:135

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
