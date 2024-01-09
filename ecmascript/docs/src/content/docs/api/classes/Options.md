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

options.ts:110

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

options.ts:65

***

### batchActionPayloadSizes

> **batchActionPayloadSizes**: `Object`

#### Source

options.ts:70

***

### compressStringsAsInts

> **compressStringsAsInts**: `boolean`

#### Source

options.ts:71

***

### defaultSymbols

> **defaultSymbols**: `string`[]

#### Source

options.ts:72

***

### enableQuerying

> **enableQuerying**: `boolean`

#### Source

options.ts:74

***

### enableRollback

> **enableRollback**: `boolean`

#### Source

options.ts:73

***

### enumDefaultSymbols

> **enumDefaultSymbols**: `Object`

#### Source

options.ts:75

***

### getActorId

> **getActorId**: `Function`

#### Source

options.ts:76

***

### indexes

> **indexes**: `Object`

#### Source

options.ts:77

***

### isAsyncStorage

> **isAsyncStorage**: `boolean`

#### Source

options.ts:79

***

### isAuthority

> **isAuthority**: `boolean`

#### Source

options.ts:78

***

### isComponentRelay

> **isComponentRelay**: `boolean`

#### Source

options.ts:80

***

### isDiffed

> **isDiffed**: `boolean`

#### Source

options.ts:81

***

### isOrdered

> **isOrdered**: `boolean`

#### Source

options.ts:82

***

### isReadOnly

> **isReadOnly**: `boolean`

#### Source

options.ts:83

***

### isSymbolLeader

> **isSymbolLeader**: `boolean`

#### Source

options.ts:84

***

### isSymbolRelay

> **isSymbolRelay**: `boolean`

#### Source

options.ts:85

***

### onUpdate

> **onUpdate**: `null` \| `Function`

#### Source

options.ts:86

***

### pageSize

> **pageSize**: `number`

#### Source

options.ts:87

***

### responder

> **responder**: `Function`

#### Source

options.ts:88

***

### skipPending

> **skipPending**: `boolean`

#### Source

options.ts:89

***

### updateOptions

> **updateOptions**: [`UpdateOptions`](/api/interfaces/updateoptions/)

#### Source

options.ts:90

## Methods

### clone()

> **clone**(): [`Options`](/api/classes/options/)

Creates a new Options object from the current one.

#### Returns

[`Options`](/api/classes/options/)

#### Source

options.ts:181

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

options.ts:191

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

options.ts:100

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
