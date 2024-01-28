---
editUrl: false
next: true
prev: true
title: "StorageInterface"
---

The StorageInterface interface represents the interface of a store.

## Properties

### actors

> **actors**: `string`[] \| `Map`\<`string`, `any`\>

#### Source

ecmascript/src/storage/interface.ts:55

***

### components

> **components**: `Map`\<`string`, `any`\> \| [`Components`](/api/interfaces/components/)

#### Source

ecmascript/src/storage/interface.ts:57

***

### componentsIndex

> **componentsIndex**: `ComponentsIndex`\<`string`, `string`\>

#### Source

ecmascript/src/storage/interface.ts:64

***

### entities

> **entities**: `string`[] \| `Map`\<`string`, `any`\>

#### Source

ecmascript/src/storage/interface.ts:56

***

### indexes

> **indexes**: `Object`

#### Index signature

 \[`key`: `string`\]: `Object`

#### Source

ecmascript/src/storage/interface.ts:65

***

### inputs

> **inputs**: [`Inputs`](/api/interfaces/inputs/)

#### Source

ecmascript/src/storage/interface.ts:59

***

### typeCtors

> **typeCtors**: `Object`

#### Index signature

 \[`key`: `string`\]: `Function`

#### Source

ecmascript/src/storage/interface.ts:62

***

### types

> **types**: `Object`

#### Index signature

 \[`key`: `string`\]: `any`

#### Source

ecmascript/src/storage/interface.ts:61

## Methods

### destroyActor()

> **destroyActor**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage/interface.ts:74

***

### destroyComponent()

> **destroyComponent**(`id`, `key`): `void` \| `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **key**: `string`

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

ecmascript/src/storage/interface.ts:75

***

### destroyEntity()

> **destroyEntity**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage/interface.ts:76

***

### destroyId()

> **destroyId**(`list`, `id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **list**: `any`

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage/interface.ts:77

***

### findComponent()

> **findComponent**(`id`, `key`): `any`

#### Parameters

• **id**: `string`

• **key**: `string`

#### Returns

`any`

#### Source

ecmascript/src/storage/interface.ts:80

***

### findComponents()

> **findComponents**(`id`): [`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Parameters

• **id**: `string`

#### Returns

[`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Source

ecmascript/src/storage/interface.ts:79

***

### findInput()

> **findInput**(`id`, `index`): [`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/) \| `Promise`\<[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)\>

#### Parameters

• **id**: `string`

• **index**: `number`

#### Returns

[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/) \| `Promise`\<[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)\>

#### Source

ecmascript/src/storage/interface.ts:83

***

### findInputs()

> **findInputs**(`id`): [`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Parameters

• **id**: `string`

#### Returns

[`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Source

ecmascript/src/storage/interface.ts:82

***

### getActors()

> **getActors**(`query`, `pageSize`): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Source

ecmascript/src/storage/interface.ts:85

***

### getComponents()

> **getComponents**(`query`, `pageSize`): [`Components`](/api/interfaces/components/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Components`](/api/interfaces/components/)[]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

[`Components`](/api/interfaces/components/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Components`](/api/interfaces/components/)[]\>

#### Source

ecmascript/src/storage/interface.ts:86

***

### getEntities()

> **getEntities**(`query`, `pageSize`): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Source

ecmascript/src/storage/interface.ts:87

***

### getInputs()

> **getInputs**(`query`, `pageSize`): [`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

[`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

#### Source

ecmascript/src/storage/interface.ts:89

***

### isActor()

> **isActor**(`id`): `boolean`

#### Parameters

• **id**: `string`

#### Returns

`boolean`

#### Source

ecmascript/src/storage/interface.ts:91

***

### isEntity()

> **isEntity**(`id`): `boolean`

#### Parameters

• **id**: `string`

#### Returns

`boolean`

#### Source

ecmascript/src/storage/interface.ts:92

***

### setActors()

> **setActors**(`actors`): `string`[] \| `Promise`\<`string`[]\>

#### Parameters

• **actors**: `string`[]

#### Returns

`string`[] \| `Promise`\<`string`[]\>

#### Source

ecmascript/src/storage/interface.ts:94

***

### setComponents()

> **setComponents**(`components`): [`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Parameters

• **components**: [`Components`](/api/interfaces/components/)

#### Returns

[`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Source

ecmascript/src/storage/interface.ts:95

***

### setEntities()

> **setEntities**(`entities`): `string`[] \| `Promise`\<`string`[]\>

#### Parameters

• **entities**: `any`

#### Returns

`string`[] \| `Promise`\<`string`[]\>

#### Source

ecmascript/src/storage/interface.ts:96

***

### setInputs()

> **setInputs**(`inputs`): [`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Parameters

• **inputs**: `any`

#### Returns

[`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Source

ecmascript/src/storage/interface.ts:98

***

### storeActor()

> **storeActor**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage/interface.ts:100

***

### storeComponent()

> **storeComponent**(`id`, `key`, `value`): `void` \| `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **key**: `string`

• **value**: `any`

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

ecmascript/src/storage/interface.ts:101

***

### storeEntity()

> **storeEntity**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage/interface.ts:102

***

### storeId()

> **storeId**(`list`, `id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **list**: `any`

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage/interface.ts:103

***

### storeInput()

> **storeInput**(`id`, `input`, `tick`): `number` \| `Promise`\<`number`\>

#### Parameters

• **id**: `string`

• **input**: `any`

• **tick**: `number`

#### Returns

`number` \| `Promise`\<`number`\>

#### Source

ecmascript/src/storage/interface.ts:105

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
