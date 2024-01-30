---
editUrl: false
next: true
prev: true
title: "ComponentsIndex"
---

The Index class represents an index.

## Extends

- [`Index`](/api/classes/index/)\<`V`, `ID`\>

## Type parameters

• **V**

• **ID**

## Constructors

### new ComponentsIndex(items, _options)

> **new ComponentsIndex**\<`V`, `ID`\>(`items`, `_options`): [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

#### Parameters

• **items**: `any`= `{}`

• **\_options**: `any`= `{}`

#### Returns

[`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

#### Overrides

[`Index.constructor`](/api/classes/index/#constructors)

#### Source

ecmascript/src/indexes/components.ts:17

## Properties

### items

> **items**: `Object`

#### Index signature

 \[`key`: `string`\]: `Set`\<`ID`\>

#### Overrides

[`Index.items`](/api/classes/index/#items)

#### Source

ecmascript/src/indexes/components.ts:13

## Methods

### clear()

> **clear**(): `void`

The clear method clears the index.

#### Returns

`void`

#### Overrides

[`Index.clear`](/api/classes/index/#clear)

#### Source

ecmascript/src/indexes/components.ts:24

***

### clone()

> **clone**(): `any`

The clone method clones the index.

#### Returns

`any`

#### Overrides

[`Index.clone`](/api/classes/index/#clone)

#### Source

ecmascript/src/indexes/components.ts:31

***

### difference()

> **difference**(`key`, `other`): [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The difference method creates a difference of two indexes.

#### Parameters

• **key**: `string`

The key of the index.

• **other**: [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The other index.

#### Returns

[`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The difference of the indexes.

#### Source

ecmascript/src/indexes/components.ts:112

***

### get()

> **get**(`value`): `any`

The get method gets a value from the index.

#### Parameters

• **value**: `any`

The value to get from the index.

#### Returns

`any`

The value from the index.

#### Overrides

[`Index.get`](/api/classes/index/#get)

#### Source

ecmascript/src/indexes/components.ts:41

***

### has()

> **has**(`value`, `id`): `boolean`

The has method checks if a value is in the index.

#### Parameters

• **value**: `any`

The value to check in the index.

• **id**: `any`

The ID of the value to check in the index.

#### Returns

`boolean`

True if the value is in the index, false otherwise.

#### Overrides

[`Index.has`](/api/classes/index/#has)

#### Source

ecmascript/src/indexes/components.ts:52

***

### intersection()

> **intersection**(`key`, `other`): [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The intersection method creates an intersection of two indexes.

#### Parameters

• **key**: `string`

The key of the index.

• **other**: [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The other index.

#### Returns

[`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The intersection of the indexes.

#### Source

ecmascript/src/indexes/components.ts:126

***

### query()

> **query**(`query`): `Set`\<`any`\>

The query method queries the index.

#### Parameters

• **query**: `any`

The query to use.

#### Returns

`Set`\<`any`\>

The result of the query.

#### Overrides

[`Index.query`](/api/classes/index/#query)

#### Source

ecmascript/src/indexes/components.ts:139

***

### remove()

> **remove**(`value`, `id`): `any`

The remove method removes a value from the index.

#### Parameters

• **value**: `any`

The value to remove from the index.

• **id**: `any`

The ID of the value to remove from the index.

#### Returns

`any`

The value removed from the index.

#### Overrides

[`Index.remove`](/api/classes/index/#remove)

#### Source

ecmascript/src/indexes/components.ts:67

***

### set()

> **set**(`value`, `id`): `any`

The set method sets a value to the index.

#### Parameters

• **value**: `any`

The value to set to the index.

• **id**: `any`

The ID to set to the index.

#### Returns

`any`

The value being set.

#### Overrides

[`Index.set`](/api/classes/index/#set)

#### Source

ecmascript/src/indexes/components.ts:82

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

### union()

> **union**(`key`, `other`): [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The union method creates an union of two indexes.

#### Parameters

• **key**: `string`

The key of the index.

• **other**: [`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The other index.

#### Returns

[`ComponentsIndex`](/api/classes/componentsindex/)\<`V`, `ID`\>

The union of the indexes.

#### Source

ecmascript/src/indexes/components.ts:98

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
