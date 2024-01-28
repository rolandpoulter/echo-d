---
editUrl: false
next: true
prev: true
title: "Storage"
---

The Storage class represents a store with actors, entities, components, and inputs.

## Implements

- [`StorageInterface`](/api/interfaces/storageinterface/)

## Constructors

### new Storage(storage, options)

> **new Storage**(`storage`, `options`): [`Storage`](/api/classes/storage/)

Constructs a new Storage object.

#### Parameters

• **storage**: [`StorageProps`](/api/interfaces/storageprops/) \| [`Storage`](/api/classes/storage/)= `{}`

The properties of the store.

• **options**: [`StorageOptions`](/api/interfaces/storageoptions/)= `{}`

#### Returns

[`Storage`](/api/classes/storage/)

#### Source

ecmascript/src/storage.ts:120

## Properties

### actors

> **actors**: `string`[]

The actors in the store.

#### Implementation of

[`StorageInterface.actors`](/api/interfaces/storageinterface/#actors)

#### Source

ecmascript/src/storage.ts:101

***

### components

> **components**: [`Components`](/api/interfaces/components/)

The components in the store.

#### Implementation of

[`StorageInterface.components`](/api/interfaces/storageinterface/#components)

#### Source

ecmascript/src/storage.ts:103

***

### componentsIndex

> **componentsIndex**: `ComponentsIndex`\<`string`, `string`\>

The components index in the store.

#### Implementation of

[`StorageInterface.componentsIndex`](/api/interfaces/storageinterface/#componentsindex)

#### Source

ecmascript/src/storage.ts:110

***

### entities

> **entities**: `string`[]

The entities in the store.

#### Implementation of

[`StorageInterface.entities`](/api/interfaces/storageinterface/#entities)

#### Source

ecmascript/src/storage.ts:102

***

### indexes

> **indexes**: `Object`

The indexes in the store.

#### Index signature

 \[`key`: `string`\]: `Object`

#### Implementation of

[`StorageInterface.indexes`](/api/interfaces/storageinterface/#indexes)

#### Source

ecmascript/src/storage.ts:111

***

### inputs

> **inputs**: [`Inputs`](/api/interfaces/inputs/)

The inputs in the store.

#### Implementation of

[`StorageInterface.inputs`](/api/interfaces/storageinterface/#inputs)

#### Source

ecmascript/src/storage.ts:105

***

### typeCtors

> **typeCtors**: `Object`

The type constructors in the store

#### Index signature

 \[`key`: `string`\]: `Function`

#### Implementation of

[`StorageInterface.typeCtors`](/api/interfaces/storageinterface/#typectors)

#### Source

ecmascript/src/storage.ts:108

***

### types

> **types**: `Object`

The types in the store.

#### Index signature

 \[`key`: `string`\]: `any`

#### Implementation of

[`StorageInterface.types`](/api/interfaces/storageinterface/#types)

#### Source

ecmascript/src/storage.ts:107

## Methods

### destroyActor()

> **destroyActor**(`id`): `boolean`

Removes an actor ID.

#### Parameters

• **id**: `string`

The ID of the actor to remove.

#### Returns

`boolean`

True if the actor ID was removed, false otherwise.

#### Implementation of

[`StorageInterface.destroyActor`](/api/interfaces/storageinterface/#destroyactor)

#### Source

ecmascript/src/storage.ts:130

***

### destroyComponent()

> **destroyComponent**(`id`, `key`): `void`

Removes a component.

#### Parameters

• **id**: `string`

The ID of the component to remove.

• **key**: `string`

The key of the component to remove.

#### Returns

`void`

#### Implementation of

[`StorageInterface.destroyComponent`](/api/interfaces/storageinterface/#destroycomponent)

#### Source

ecmascript/src/storage.ts:141

***

### destroyEntity()

> **destroyEntity**(`id`): `boolean`

Removes an entity ID.

#### Parameters

• **id**: `string`

The ID of the entity to remove.

#### Returns

`boolean`

True if the entity ID was removed, false otherwise.

#### Implementation of

[`StorageInterface.destroyEntity`](/api/interfaces/storageinterface/#destroyentity)

#### Source

ecmascript/src/storage.ts:161

***

### destroyId()

> **destroyId**(`list`, `id`): `boolean`

Removes an ID from a list if it exists.

#### Parameters

• **list**: `string`[]

The list to remove the ID from.

• **id**: `string`

The ID to remove.

#### Returns

`boolean`

True if the ID was removed, false otherwise.

#### Implementation of

[`StorageInterface.destroyId`](/api/interfaces/storageinterface/#destroyid)

#### Source

ecmascript/src/storage.ts:173

***

### findComponent()

> **findComponent**(`id`, `key`): `any`

Fetches a component.

#### Parameters

• **id**: `string`

The ID of the component to fetch.

• **key**: `string`

The key of the component to fetch.

#### Returns

`any`

The fetched component.

#### Implementation of

[`StorageInterface.findComponent`](/api/interfaces/storageinterface/#findcomponent)

#### Source

ecmascript/src/storage.ts:200

***

### findComponents()

> **findComponents**(`id`): [`Components`](/api/interfaces/components/)

Fetches a components container for an entity.

#### Parameters

• **id**: `string`

The ID of the entity.

#### Returns

[`Components`](/api/interfaces/components/)

The fetched components container.

#### Implementation of

[`StorageInterface.findComponents`](/api/interfaces/storageinterface/#findcomponents)

#### Source

ecmascript/src/storage.ts:188

***

### findInput()

> **findInput**(`id`, `index`): [`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)

Fetches an actors input

#### Parameters

• **id**: `string`

The ID of the actor.

• **index**: `number`

The index of the input.

#### Returns

[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)

The fetched inputs.

#### Implementation of

[`StorageInterface.findInput`](/api/interfaces/storageinterface/#findinput)

#### Source

ecmascript/src/storage.ts:222

***

### findInputs()

> **findInputs**(`id`): [`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)

Fetches an actors inputs

#### Parameters

• **id**: `string`

The ID of the actor.

#### Returns

[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)

The fetched inputs.

#### Implementation of

[`StorageInterface.findInputs`](/api/interfaces/storageinterface/#findinputs)

#### Source

ecmascript/src/storage.ts:211

***

### getActors()

> **getActors**(`query`, `pageSize`): `string`[][]

Gets the actors.

#### Parameters

• **query**: `any`= `null`

The query to use.

• **pageSize**: `number`= `Infinity`

The page size to use.

#### Returns

`string`[][]

The actors.

#### Implementation of

[`StorageInterface.getActors`](/api/interfaces/storageinterface/#getactors)

#### Source

ecmascript/src/storage.ts:238

***

### getComponents()

> **getComponents**(`query`, `pageSize`): [`Components`](/api/interfaces/components/)[]

Gets the components.

#### Parameters

• **query**: `any`= `null`

The query to use.

• **pageSize**: `number`= `Infinity`

The page size to use.

#### Returns

[`Components`](/api/interfaces/components/)[]

The components.

#### Implementation of

[`StorageInterface.getComponents`](/api/interfaces/storageinterface/#getcomponents)

#### Source

ecmascript/src/storage.ts:263

***

### getEntities()

> **getEntities**(`query`, `pageSize`): `string`[][]

Gets the entities.

#### Parameters

• **query**: `any`= `null`

The query to use.

• **pageSize**: `number`= `Infinity`

The page size to use.

#### Returns

`string`[][]

The entities.

#### Implementation of

[`StorageInterface.getEntities`](/api/interfaces/storageinterface/#getentities)

#### Source

ecmascript/src/storage.ts:290

***

### getInputs()

> **getInputs**(`query`, `pageSize`): [`Inputs`](/api/interfaces/inputs/)[]

Gets the inputs.

#### Parameters

• **query**: `any`= `null`

• **pageSize**: `number`= `Infinity`

#### Returns

[`Inputs`](/api/interfaces/inputs/)[]

The inputs.

#### Implementation of

[`StorageInterface.getInputs`](/api/interfaces/storageinterface/#getinputs)

#### Source

ecmascript/src/storage.ts:313

***

### isActor()

> **isActor**(`id`): `boolean`

Checks if an ID is an actor.

#### Parameters

• **id**: `string`

The ID to check.

#### Returns

`boolean`

True if the ID is an actor, false otherwise.

#### Implementation of

[`StorageInterface.isActor`](/api/interfaces/storageinterface/#isactor)

#### Source

ecmascript/src/storage.ts:339

***

### isEntity()

> **isEntity**(`id`): `boolean`

Checks if an ID is an entity.

#### Parameters

• **id**: `string`

The ID to check.

#### Returns

`boolean`

True if the ID is an entity, false otherwise.

#### Implementation of

[`StorageInterface.isEntity`](/api/interfaces/storageinterface/#isentity)

#### Source

ecmascript/src/storage.ts:350

***

### queryComponents()

> **queryComponents**(`query`): `Set`\<`any`\>

Queries the store for entities by component.

#### Parameters

• **query**: `any`

The query to use.

#### Returns

`Set`\<`any`\>

The entities.

#### Source

ecmascript/src/storage.ts:487

***

### setActors()

> **setActors**(`actors`): `string`[]

Sets the actors.

#### Parameters

• **actors**: `string`[]

The actors to set.

#### Returns

`string`[]

The actors.

#### Implementation of

[`StorageInterface.setActors`](/api/interfaces/storageinterface/#setactors)

#### Source

ecmascript/src/storage.ts:361

***

### setComponents()

> **setComponents**(`components`): [`Components`](/api/interfaces/components/)

Sets the components.

#### Parameters

• **components**: [`Components`](/api/interfaces/components/)

The components to set.

#### Returns

[`Components`](/api/interfaces/components/)

The components.

#### Implementation of

[`StorageInterface.setComponents`](/api/interfaces/storageinterface/#setcomponents)

#### Source

ecmascript/src/storage.ts:372

***

### setEntities()

> **setEntities**(`entities`): `string`[]

Sets the entities.

#### Parameters

• **entities**: `string`[]

The entities to set.

#### Returns

`string`[]

The entities.

#### Implementation of

[`StorageInterface.setEntities`](/api/interfaces/storageinterface/#setentities)

#### Source

ecmascript/src/storage.ts:383

***

### setInputs()

> **setInputs**(`inputs`): [`Inputs`](/api/interfaces/inputs/)

Sets the inputs.

#### Parameters

• **inputs**: [`Inputs`](/api/interfaces/inputs/)

The inputs to set.

#### Returns

[`Inputs`](/api/interfaces/inputs/)

The inputs.

#### Implementation of

[`StorageInterface.setInputs`](/api/interfaces/storageinterface/#setinputs)

#### Source

ecmascript/src/storage.ts:394

***

### storeActor()

> **storeActor**(`id`): `boolean`

Stores an actor ID.

#### Parameters

• **id**: `string`

The ID of the actor to store.

#### Returns

`boolean`

True if the actor ID was stored, false otherwise.

#### Implementation of

[`StorageInterface.storeActor`](/api/interfaces/storageinterface/#storeactor)

#### Source

ecmascript/src/storage.ts:405

***

### storeComponent()

> **storeComponent**(`id`, `key`, `value`): `void`

Stores a component.

#### Parameters

• **id**: `string`

The ID of the component to store.

• **key**: `string`

The key of the component to store.

• **value**: `any`

The value of the component to store.

#### Returns

`void`

#### Implementation of

[`StorageInterface.storeComponent`](/api/interfaces/storageinterface/#storecomponent)

#### Source

ecmascript/src/storage.ts:417

***

### storeEntity()

> **storeEntity**(`id`): `boolean`

Stores an entity ID.

#### Parameters

• **id**: `string`

The ID of the entity to store.

#### Returns

`boolean`

True if the entity ID was stored, false otherwise.

#### Implementation of

[`StorageInterface.storeEntity`](/api/interfaces/storageinterface/#storeentity)

#### Source

ecmascript/src/storage.ts:437

***

### storeId()

> **storeId**(`list`, `id`): `boolean`

Stores an ID in a list if it doesn't exist already.

#### Parameters

• **list**: `string`[]

The list to store the ID in.

• **id**: `string`

The ID to store.

#### Returns

`boolean`

True if the ID was stored, false otherwise.

#### Implementation of

[`StorageInterface.storeId`](/api/interfaces/storageinterface/#storeid)

#### Source

ecmascript/src/storage.ts:449

***

### storeInput()

> **storeInput**(`id`, `input`, `tick`): `number`

Stores an input.

#### Parameters

• **id**: `string`

The ID of the input to store.

• **input**: [`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)

The payload of the input to store.

• **tick**: `number`= `0`

#### Returns

`number`

The new index of the stored input.

#### Implementation of

[`StorageInterface.storeInput`](/api/interfaces/storageinterface/#storeinput)

#### Source

ecmascript/src/storage.ts:465

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
