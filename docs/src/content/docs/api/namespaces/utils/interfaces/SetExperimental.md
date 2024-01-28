---
editUrl: false
next: true
prev: true
title: "SetExperimental"
---

A type that exposes experimental set operations.

## Extends

- `Set`\<`T`\>

## Type parameters

• **T**

## Properties

### [toStringTag]

> **`readonly`** **[toStringTag]**: `string`

#### Inherited from

`Set.[toStringTag]`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:145

***

### difference?

> **difference**?: (`other`) => `Set`\<`T`\>

#### Parameters

• **other**: `Set`\<`T`\>

#### Returns

`Set`\<`T`\>

#### Source

ecmascript/src/utils.ts:67

***

### intersection?

> **intersection**?: (`other`) => `Set`\<`T`\>

#### Parameters

• **other**: `Set`\<`T`\>

#### Returns

`Set`\<`T`\>

#### Source

ecmascript/src/utils.ts:68

***

### size

> **`readonly`** **size**: `number`

#### Inherited from

`Set.size`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.collection.d.ts:112

***

### union?

> **union**?: (`other`) => `Set`\<`T`\>

#### Parameters

• **other**: `Set`\<`T`\>

#### Returns

`Set`\<`T`\>

#### Source

ecmascript/src/utils.ts:66

## Methods

### `[iterator]`()

> **[iterator]**(): `IterableIterator`\<`T`\>

Iterates over values in the set.

#### Returns

`IterableIterator`\<`T`\>

#### Inherited from

`Set.[iterator]`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:170

***

### add()

> **add**(`value`): [`SetExperimental`](/api/namespaces/utils/interfaces/setexperimental/)\<`T`\>

Appends a new element with a specified value to the end of the Set.

#### Parameters

• **value**: `T`

#### Returns

[`SetExperimental`](/api/namespaces/utils/interfaces/setexperimental/)\<`T`\>

#### Inherited from

`Set.add`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.collection.d.ts:93

***

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Inherited from

`Set.clear`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.collection.d.ts:95

***

### delete()

> **delete**(`value`): `boolean`

Removes a specified value from the Set.

#### Parameters

• **value**: `T`

#### Returns

`boolean`

Returns true if an element in the Set existed and has been removed, or false if the element does not exist.

#### Inherited from

`Set.delete`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.collection.d.ts:100

***

### entries()

> **entries**(): `IterableIterator`\<[`T`, `T`]\>

Returns an iterable of [v,v] pairs for every value `v` in the set.

#### Returns

`IterableIterator`\<[`T`, `T`]\>

#### Inherited from

`Set.entries`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:174

***

### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Executes a provided function once per each value in the Set object, in insertion order.

#### Parameters

• **callbackfn**: (`value`, `value2`, `set`) => `void`

• **thisArg?**: `any`

#### Returns

`void`

#### Inherited from

`Set.forEach`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.collection.d.ts:104

***

### has()

> **has**(`value`): `boolean`

#### Parameters

• **value**: `T`

#### Returns

`boolean`

a boolean indicating whether an element with the specified value exists in the Set or not.

#### Inherited from

`Set.has`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.collection.d.ts:108

***

### keys()

> **keys**(): `IterableIterator`\<`T`\>

Despite its name, returns an iterable of the values in the set.

#### Returns

`IterableIterator`\<`T`\>

#### Inherited from

`Set.keys`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:178

***

### values()

> **values**(): `IterableIterator`\<`T`\>

Returns an iterable of values in the set.

#### Returns

`IterableIterator`\<`T`\>

#### Inherited from

`Set.values`

#### Source

docs/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:183

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
