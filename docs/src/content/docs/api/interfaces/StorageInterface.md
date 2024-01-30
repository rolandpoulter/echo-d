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

ecmascript/src/storage.ts:60

***

### components

> **components**: `Map`\<`string`, `any`\> \| [`Components`](/api/interfaces/components/)

#### Source

ecmascript/src/storage.ts:62

***

### componentsIndex

> **componentsIndex**: [`ComponentsIndex`](/api/classes/componentsindex/)\<`string`, `string`\>

#### Source

ecmascript/src/storage.ts:69

***

### entities

> **entities**: `string`[] \| `Map`\<`string`, `any`\>

#### Source

ecmascript/src/storage.ts:61

***

### indexes

> **indexes**: `Object`

#### Index signature

 \[`key`: `string`\]: `Object`

#### Source

ecmascript/src/storage.ts:70

***

### inputs

> **inputs**: [`Inputs`](/api/interfaces/inputs/)

#### Source

ecmascript/src/storage.ts:64

***

### typeCtors

> **typeCtors**: `Object`

#### Index signature

 \[`key`: `string`\]: `Function`

#### Source

ecmascript/src/storage.ts:67

***

### types

> **types**: `Object`

#### Index signature

 \[`key`: `string`\]: `any`

#### Source

ecmascript/src/storage.ts:66

## Methods

### destroyActor()

> **destroyActor**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage.ts:79

***

### destroyComponent()

> **destroyComponent**(`id`, `key`): `void` \| `Promise`\<`void`\>

#### Parameters

• **id**: `string`

• **key**: `string`

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

ecmascript/src/storage.ts:80

***

### destroyEntity()

> **destroyEntity**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage.ts:81

***

### destroyId()

> **destroyId**(`list`, `id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **list**: `any`

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage.ts:82

***

### findComponent()

> **findComponent**(`id`, `key`): `any`

#### Parameters

• **id**: `string`

• **key**: `string`

#### Returns

`any`

#### Source

ecmascript/src/storage.ts:85

***

### findComponents()

> **findComponents**(`id`): [`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Parameters

• **id**: `string`

#### Returns

[`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Source

ecmascript/src/storage.ts:84

***

### findInput()

> **findInput**(`id`, `index`): [`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/) \| `Promise`\<[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)\>

#### Parameters

• **id**: `string`

• **index**: `number`

#### Returns

[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/) \| `Promise`\<[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)\>

#### Source

ecmascript/src/storage.ts:88

***

### findInputs()

> **findInputs**(`id`): [`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Parameters

• **id**: `string`

#### Returns

[`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Source

ecmascript/src/storage.ts:87

***

### getActors()

> **getActors**(`query`, `pageSize`): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Source

ecmascript/src/storage.ts:90

***

### getComponents()

> **getComponents**(`query`, `pageSize`): [`Components`](/api/interfaces/components/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Components`](/api/interfaces/components/)[]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

[`Components`](/api/interfaces/components/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Components`](/api/interfaces/components/)[]\>

#### Source

ecmascript/src/storage.ts:91

***

### getEntities()

> **getEntities**(`query`, `pageSize`): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

#### Source

ecmascript/src/storage.ts:92

***

### getInputs()

> **getInputs**(`query`, `pageSize`): [`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

#### Parameters

• **query**: `any`

• **pageSize**: `number`

#### Returns

[`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

#### Source

ecmascript/src/storage.ts:94

***

### isActor()

> **isActor**(`id`): `boolean`

#### Parameters

• **id**: `string`

#### Returns

`boolean`

#### Source

ecmascript/src/storage.ts:96

***

### isEntity()

> **isEntity**(`id`): `boolean`

#### Parameters

• **id**: `string`

#### Returns

`boolean`

#### Source

ecmascript/src/storage.ts:97

***

### setActors()

> **setActors**(`actors`): `string`[] \| `Promise`\<`string`[]\>

#### Parameters

• **actors**: `string`[]

#### Returns

`string`[] \| `Promise`\<`string`[]\>

#### Source

ecmascript/src/storage.ts:99

***

### setComponents()

> **setComponents**(`components`): [`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Parameters

• **components**: [`Components`](/api/interfaces/components/)

#### Returns

[`Components`](/api/interfaces/components/) \| `Promise`\<[`Components`](/api/interfaces/components/)\>

#### Source

ecmascript/src/storage.ts:100

***

### setEntities()

> **setEntities**(`entities`): `string`[] \| `Promise`\<`string`[]\>

#### Parameters

• **entities**: `any`

#### Returns

`string`[] \| `Promise`\<`string`[]\>

#### Source

ecmascript/src/storage.ts:101

***

### setInputs()

> **setInputs**(`inputs`): [`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Parameters

• **inputs**: `any`

#### Returns

[`Inputs`](/api/interfaces/inputs/) \| `Promise`\<[`Inputs`](/api/interfaces/inputs/)\>

#### Source

ecmascript/src/storage.ts:103

***

### storeActor()

> **storeActor**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage.ts:105

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

ecmascript/src/storage.ts:106

***

### storeEntity()

> **storeEntity**(`id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage.ts:107

***

### storeId()

> **storeId**(`list`, `id`): `boolean` \| `Promise`\<`boolean`\>

#### Parameters

• **list**: `any`

• **id**: `string`

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/storage.ts:108

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

ecmascript/src/storage.ts:110

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
