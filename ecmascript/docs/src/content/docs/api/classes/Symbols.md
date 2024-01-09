---
editUrl: false
next: true
prev: true
title: "Symbols"
---

The Symbols class represents a collection of symbols.

## Constructors

### new Symbols(object)

> **new Symbols**(`object`): [`Symbols`](/api/classes/symbols/)

Constructs a new Symbols object.

#### Parameters

• **object**: `Object`= `{}`

An object containing an optional list of symbols.

• **object\.\_list?**: `string`[]

#### Returns

[`Symbols`](/api/classes/symbols/)

#### Source

symbols.ts:22

## Methods

### add()

> **add**(`symbol`): `null` \| `number`

Adds a symbol to the Symbols object.

#### Parameters

• **symbol**: `string`

The symbol to be added.

#### Returns

`null` \| `number`

The index of the added symbol, or null if the symbol is not valid.

#### Source

symbols.ts:36

***

### copyEnum()

> **copyEnum**(`enumObj`): `void`

Copies an enum into the Symbols object.

#### Parameters

• **enumObj**: `Object` \| [`Enum`](/api/interfaces/enum/)= `{}`

The enum to be copied.

#### Returns

`void`

#### Source

symbols.ts:57

***

### fetch()

> **fetch**(`payload`): [`string`, `number`]

Fetches a symbol and its index based on a payload.

#### Parameters

• **payload**: `string` \| `number`

The payload, which can be either a symbol or an index.

#### Returns

[`string`, `number`]

A tuple containing the symbol and its index.

#### Source

symbols.ts:69

***

### find()

> **find**(`symbol`): `undefined` \| `number`

Finds the index of a symbol.

#### Parameters

• **symbol**: `string`

The symbol to be found.

#### Returns

`undefined` \| `number`

The index of the symbol, or undefined if the symbol is not found.

#### Source

symbols.ts:93

***

### get()

> **get**(`index`): `undefined` \| `string`

Gets the symbol at a specific index.

#### Parameters

• **index**: `number`

The index of the symbol.

#### Returns

`undefined` \| `string`

The symbol at the specified index, or undefined if there is no symbol at that index.

#### Source

symbols.ts:103

***

### getSymbols()

> **getSymbols**(): `string`[]

Returns the list of symbols.

#### Returns

`string`[]

The list of symbols.

#### Source

symbols.ts:112

***

### getSymbolsEnum()

> **getSymbolsEnum**(): [`Enum`](/api/interfaces/enum/)

Returns the enum of symbols.

#### Returns

[`Enum`](/api/interfaces/enum/)

The enum of symbols.

#### Source

symbols.ts:121

***

### merge()

> **merge**(`symbolTuple`): `void`

Merges a symbol tuple into the Symbols object.

#### Parameters

• **symbolTuple**: [`string`, `number`]

The symbol tuple to be merged.

#### Returns

`void`

#### Source

symbols.ts:130

***

### reset()

> **reset**(`offset`, `symbolsArray`): `void`

Resets the Symbols object with a new array of symbols.

#### Parameters

• **offset**: `number`

• **symbolsArray**: `string`[]= `[]`

The new array of symbols.

#### Returns

`void`

#### Source

symbols.ts:142

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
