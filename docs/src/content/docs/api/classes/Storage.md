---
editUrl: false
next: true
prev: true
title: "Storage"
---

The Storage class represents a store with actors, entities, components, and inputs.

## Constructors

### new Storage(store, options)

> **new Storage**(`store`, `options`): [`Storage`](/api/classes/storage/)

Constructs a new Storage object.

#### Parameters

• **store**: [`StorageProps`](/api/interfaces/storageprops/) \| [`Storage`](/api/classes/storage/)= `{}`

The properties of the store.

• **options**: [`StorageOptions`](/api/interfaces/storageoptions/)= `{}`

#### Returns

[`Storage`](/api/classes/storage/)

#### Source

ecmascript/src/storage.ts:87

## Properties

### actors

> **actors**: `string`[]

The actors in the store.

#### Source

ecmascript/src/storage.ts:72

***

### components

> **components**: [`Components`](/api/interfaces/components/)

The components in the store.

#### Source

ecmascript/src/storage.ts:74

***

### componentsIndex

> **componentsIndex**: `ComponentsIndex`\<`string`, `string`\>

#### Source

ecmascript/src/storage.ts:79

***

### entities

> **entities**: `string`[]

The entities in the store.

#### Source

ecmascript/src/storage.ts:73

***

### indexes

> **indexes**: `Object`

#### Index signature

 \[`key`: `string`\]: `Object`

#### Source

ecmascript/src/storage.ts:76

***

### inputs

> **inputs**: [`Inputs`](/api/interfaces/inputs/)

The inputs in the store.

#### Source

ecmascript/src/storage.ts:75

***

### typeCtors

> **typeCtors**: `Object`

#### Index signature

 \[`key`: `string`\]: `Function`

#### Source

ecmascript/src/storage.ts:78

***

### types

> **types**: `Object`

#### Index signature

 \[`key`: `string`\]: `any`

#### Source

ecmascript/src/storage.ts:77

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

ecmascript/src/storage.ts:143

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

ecmascript/src/storage.ts:154

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

ecmascript/src/storage.ts:174

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

ecmascript/src/storage.ts:186

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

ecmascript/src/storage.ts:212

***

### fetchComponents()

> **fetchComponents**(`id`): [`Components`](/api/interfaces/components/)

Fetches a components container for an entity.

#### Parameters

• **id**: `string`

The ID of the entity.

#### Returns

[`Components`](/api/interfaces/components/)

The fetched components container.

#### Source

ecmascript/src/storage.ts:201

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

ecmascript/src/storage.ts:224

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

ecmascript/src/storage.ts:249

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

ecmascript/src/storage.ts:276

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

ecmascript/src/storage.ts:299

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

ecmascript/src/storage.ts:325

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

ecmascript/src/storage.ts:336

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

ecmascript/src/storage.ts:469

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

ecmascript/src/storage.ts:347

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

ecmascript/src/storage.ts:358

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

ecmascript/src/storage.ts:369

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

ecmascript/src/storage.ts:380

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

ecmascript/src/storage.ts:391

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

ecmascript/src/storage.ts:403

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

ecmascript/src/storage.ts:423

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

ecmascript/src/storage.ts:435

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

#### Source

ecmascript/src/storage.ts:451

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
