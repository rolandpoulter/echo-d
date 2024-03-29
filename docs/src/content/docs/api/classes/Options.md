---
editUrl: false
next: true
prev: true
title: "Options"
---

The Options class represents the options for a node.

## Constructors

### new Options(options, actionsThis)

> **new Options**(`options`, `actionsThis`): [`Options`](/api/classes/options/)

Constructs a new Options object.

#### Parameters

• **options**: [`Options`](/api/classes/options/) \| [`OptionsProps`](/api/interfaces/optionsprops/)= `{}`

The options for the node.

• **actionsThis**: `any`= `null`

The context for the actions.

#### Returns

[`Options`](/api/classes/options/)

#### Source

ecmascript/src/options.ts:128

## Properties

### actions

> **actions**: `Object`

#### Index signature

 \[`key`: `string`\]: `Function`

#### Type declaration

##### addSymbol

> **addSymbol**: `Function`

##### getSymbol

> **getSymbol**: `Function`

#### Source

ecmascript/src/options.ts:77

***

### batchActionPayloadSizes

> **batchActionPayloadSizes**: `Object`

#### Source

ecmascript/src/options.ts:82

***

### compressStringsAsInts

> **compressStringsAsInts**: `boolean`

#### Source

ecmascript/src/options.ts:83

***

### defaultSymbols

> **defaultSymbols**: `string`[]

#### Source

ecmascript/src/options.ts:84

***

### enableQuerying

> **enableQuerying**: `boolean`

#### Source

ecmascript/src/options.ts:86

***

### enableRollback

> **enableRollback**: `boolean`

#### Source

ecmascript/src/options.ts:85

***

### enumDefaultSymbols

> **enumDefaultSymbols**: `Object`

#### Source

ecmascript/src/options.ts:87

***

### getActorId

> **getActorId**: `Function`

#### Source

ecmascript/src/options.ts:88

***

### getGroupedValue

> **getGroupedValue**: `Function`

#### Source

ecmascript/src/options.ts:89

***

### indexes

> **indexes**: `Object`

#### Source

ecmascript/src/options.ts:90

***

### isAsyncStorage

> **isAsyncStorage**: `boolean`

#### Source

ecmascript/src/options.ts:92

***

### isAuthority

> **isAuthority**: `boolean`

#### Source

ecmascript/src/options.ts:91

***

### isComponentRelay

> **isComponentRelay**: `boolean`

#### Source

ecmascript/src/options.ts:93

***

### isDiffed

> **isDiffed**: `boolean`

#### Source

ecmascript/src/options.ts:94

***

### isGroupedComponents

> **isGroupedComponents**: `boolean`

#### Source

ecmascript/src/options.ts:95

***

### isOrdered

> **isOrdered**: `boolean`

#### Source

ecmascript/src/options.ts:96

***

### isReadOnly

> **isReadOnly**: `boolean`

#### Source

ecmascript/src/options.ts:97

***

### isSymbolLeader

> **isSymbolLeader**: `boolean`

#### Source

ecmascript/src/options.ts:98

***

### isSymbolRelay

> **isSymbolRelay**: `boolean`

#### Source

ecmascript/src/options.ts:99

***

### onUpdate

> **onUpdate**: `null` \| `Function`

#### Source

ecmascript/src/options.ts:100

***

### pageSize

> **pageSize**: `number`

#### Source

ecmascript/src/options.ts:101

***

### responder

> **responder**: `Function`

#### Source

ecmascript/src/options.ts:102

***

### setGroupedValue

> **setGroupedValue**: `Function`

#### Source

ecmascript/src/options.ts:105

***

### skipPending

> **skipPending**: `boolean`

#### Source

ecmascript/src/options.ts:103

***

### storeOptions

> **storeOptions**: `Object`

#### Source

ecmascript/src/options.ts:106

***

### types

> **types**: `Object`

#### Source

ecmascript/src/options.ts:104

***

### updateOptions

> **updateOptions**: [`UpdateOptions`](/api/interfaces/updateoptions/)

#### Source

ecmascript/src/options.ts:107

***

### worldOptions

> **worldOptions**: `any`

#### Source

ecmascript/src/options.ts:108

## Methods

### clone()

> **clone**(): [`Options`](/api/classes/options/)

Creates a new Options object from the current one.

#### Returns

[`Options`](/api/classes/options/)

#### Source

ecmascript/src/options.ts:211

***

### extend()

> **extend**(`options`, `actionThis`): [`Options`](/api/classes/options/)

Extends the current Options object.

#### Parameters

• **options**: `Object` \| [`Options`](/api/classes/options/) \| [`OptionsProps`](/api/interfaces/optionsprops/)

The options for the node.

• **actionThis**: `any`= `undefined`

The context for the actions.

#### Returns

[`Options`](/api/classes/options/)

#### Source

ecmascript/src/options.ts:221

***

### ensure()

> **`static`** **ensure**(`options`, `actionsThis`): [`Options`](/api/classes/options/)

Ensures that the provided options are an instance of Options.

#### Parameters

• **options**: [`Options`](/api/classes/options/) \| [`OptionsProps`](/api/interfaces/optionsprops/)= `{}`

The options for the node.

• **actionsThis**: `any`

The context for the actions.

#### Returns

[`Options`](/api/classes/options/)

- An instance of Options.

#### Source

ecmascript/src/options.ts:118

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
