---
editUrl: false
next: true
prev: true
title: "Storage"
---

The Storage class represents a store with actors, entities, components, and inputs.

## Constructors

### new Storage(store, indexes)

> **new Storage**(`store`, `indexes`): [`Storage`](/api/classes/storage/)

Constructs a new Storage object.

#### Parameters

• **store**: [`StorageProps`](/api/interfaces/storageprops/) \| [`Storage`](/api/classes/storage/)= `{}`

The properties of the store.

• **indexes**: `any`= `{}`

#### Returns

[`Storage`](/api/classes/storage/)

#### Source

storage.ts:64

## Properties

### actors

> **actors**: `string`[]

The actors in the store.

#### Source

storage.ts:53

***

### components

> **components**: [`Components`](/api/interfaces/components/)

The components in the store.

#### Source

storage.ts:55

***

### entities

> **entities**: `string`[]

The entities in the store.

#### Source

storage.ts:54

***

### indexes

> **indexes**: `Object`

#### Index signature

 \[`key`: `string`\]: `Object`

#### Source

storage.ts:57

***

### inputs

> **inputs**: [`Inputs`](/api/interfaces/inputs/)

The inputs in the store.

#### Source

storage.ts:56

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

#### Source

storage.ts:96

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

#### Source

storage.ts:107

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

#### Source

storage.ts:126

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

#### Source

storage.ts:138

***

### fetchComponent()

> **fetchComponent**(`id`, `key`): `any`

Fetches a component.

#### Parameters

• **id**: `string`

The ID of the component to fetch.

• **key**: `string`

The key of the component to fetch.

#### Returns

`any`

The fetched component.

#### Source

storage.ts:154

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

#### Source

storage.ts:166

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

#### Source

storage.ts:191

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

#### Source

storage.ts:218

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

#### Source

storage.ts:241

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

#### Source

storage.ts:267

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

#### Source

storage.ts:278

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

#### Source

storage.ts:289

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

#### Source

storage.ts:300

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

#### Source

storage.ts:311

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

#### Source

storage.ts:322

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

#### Source

storage.ts:333

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

#### Source

storage.ts:345

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

#### Source

storage.ts:364

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

#### Source

storage.ts:376

***

### storeInput()

> **storeInput**(`id`, `input`, `tick`): `number`

Stores an input.

#### Parameters

• **id**: `string`

The ID of the input to store.

• **input**: [`InputPayload`](/api/namespaces/actor/type-aliases/inputpayload/)

The payload of the input to store.

• **tick**: `number`= `0`

#### Returns

`number`

The new index of the stored input.

#### Source

storage.ts:392

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
