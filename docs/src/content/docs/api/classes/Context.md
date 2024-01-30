---
editUrl: false
next: true
prev: true
title: "Context"
---

The Context class provides methods for managing the context.

## Constructors

### new Context(context, options, _Storage)

> **new Context**(`context`, `options`, `_Storage`): [`Context`](/api/classes/context/)

Creates a new instance of the Context class.

#### Parameters

• **context**: [`Context`](/api/classes/context/) \| `ContextProps`= `{}`

The context properties.

• **options**: `any`

The context options.

• **\_Storage**: *typeof* [`Storage`](/api/classes/storage/)= `Storage`

The store.

#### Returns

[`Context`](/api/classes/context/)

#### Source

ecmascript/src/context.ts:74

## Properties

### changes

> **changes**: `null` \| [`Changes`](/api/classes/changes/)

The changes.

#### Source

ecmascript/src/context.ts:47

***

### events

> **events**: `any`

The events.

#### Source

ecmascript/src/context.ts:44

***

### order

> **order**: `null` \| [`Ordered`](/api/classes/ordered/)

The order.

#### Source

ecmascript/src/context.ts:46

***

### pending

> **pending**: `null` \| [`Pending`](/api/classes/pending/)

The pending.

#### Source

ecmascript/src/context.ts:48

***

### store

> **store**: [`Storage`](/api/classes/storage/) \| `AsyncStorage`

The store.

#### Source

ecmascript/src/context.ts:45

***

### symbols

> **symbols**: `null` \| [`Symbols`](/api/classes/symbols/)

#### Source

ecmascript/src/context.ts:49

## Accessors

### actors

> **`get`** **actors**(): `any`

Gets the actors from the store.

#### Returns

`any`

The actors from the store.

#### Source

ecmascript/src/context.ts:143

***

### components

> **`get`** **components**(): `any`

Gets the components from the store.

#### Returns

`any`

The components from the store.

#### Source

ecmascript/src/context.ts:408

***

### entities

> **`get`** **entities**(): `any`

Gets the entities from the store.

#### Returns

`any`

The entities from the store.

#### Source

ecmascript/src/context.ts:277

***

### inputs

> **`get`** **inputs**(): `any`

Gets the inputs from the store.

#### Returns

`any`

The inputs from the store.

#### Source

ecmascript/src/context.ts:725

***

### symbolsEnum

> **`get`** **symbolsEnum**(): `undefined` \| [`Enum`](/api/interfaces/enum/)

Gets the enum of symbols.

#### Returns

`undefined` \| [`Enum`](/api/interfaces/enum/)

The enum of symbols.

#### Source

ecmascript/src/context.ts:796

***

### symbolsList

> **`get`** **symbolsList**(): `undefined` \| `string`[]

Gets the list of symbols.

#### Returns

`undefined` \| `string`[]

The list of symbols.

#### Source

ecmascript/src/context.ts:787

## Methods

### actorInput()

> **actorInput**(`id`, `input`, `tick`, `options`): `number` \| `Promise`\<`number`\>

Handles actor input with the given id, payload, and options.

#### Parameters

• **id**: `string`

The id of the actor.

• **input**: [`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/)

The payload for the actor input.

• **tick**: `number`= `0`

The tick value for the actor input. Defaults to 0.

• **options**: [`Options`](/api/classes/options/)

The options for handling the actor input.

#### Returns

`number` \| `Promise`\<`number`\>

#### Source

ecmascript/src/context.ts:752

***

### addSymbol()

> **addSymbol**(`symbol`, `options`): `null` \| `number`

Adds a symbol with the given symbol and options.

#### Parameters

• **symbol**: `string`

The symbol to add.

• **options**: [`Options`](/api/classes/options/)

The options for adding the symbol.

#### Returns

`null` \| `number`

The index of the added symbol or null if the symbol could not be added.

#### Source

ecmascript/src/context.ts:835

***

### changeComponent()

> **changeComponent**(`id`, `key`, `value`, `tick`, `options`): `any`

Changes a component with the given id, key, value, and options.

#### Parameters

• **id**: `string` \| `Uint32Array` \| `string`[]

The id of the component to change.

• **key**: `string`

The key of the component to change.

• **value**: `any`

The value to change in the component.

• **tick**: `number`= `0`

The tick value for the component. Defaults to 0.

• **options**: [`Options`](/api/classes/options/)

The options for changing the component.

#### Returns

`any`

#### Source

ecmascript/src/context.ts:436

***

### createEntity()

> **createEntity**(`id`, `options`): `boolean` \| `Promise`\<`boolean`\>

Creates an entity with the given id and options.

#### Parameters

• **id**: `string`

The id of the entity to create.

• **options**: [`Options`](/api/classes/options/)

The options for creating the entity.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/context.ts:302

***

### fetchSymbol()

> **fetchSymbol**(`payload`, `options`, `onMatch`): `null` \| [`string`, `number`]

Fetches a symbol with the given payload, options, and match function.

#### Parameters

• **payload**: `string` \| `number`

The payload for fetching the symbol.

• **options**: [`Options`](/api/classes/options/)

The options for fetching the symbol.

• **onMatch**: `Function`

The function to call when a match is found.

#### Returns

`null` \| [`string`, `number`]

The fetched symbol tuple.

#### Source

ecmascript/src/context.ts:877

***

### getActors()

> **getActors**(`query`, `pageSize`): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

Gets the actors from the store with the given query.

#### Parameters

• **query**: `any`

The query for getting the actors.

• **pageSize**: `number`

The page size for getting the actors.

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

The actors from the store.

#### Source

ecmascript/src/context.ts:158

***

### getComponents()

> **getComponents**(`query`, `pageSize`): [`Components`](/api/interfaces/components/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Components`](/api/interfaces/components/)[]\>

Gets the components from the store with the given query.

#### Parameters

• **query**: `any`

The query for getting the components.

• **pageSize**: `number`

The page size for getting the components.

#### Returns

[`Components`](/api/interfaces/components/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Components`](/api/interfaces/components/)[]\>

The components from the store.

#### Source

ecmascript/src/context.ts:423

***

### getEntities()

> **getEntities**(`query`, `pageSize`): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

Gets the entities from the store with the given query.

#### Parameters

• **query**: `any`

The query for getting the entities.

• **pageSize**: `number`

The page size for getting the entities.

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

The entities from the store.

#### Source

ecmascript/src/context.ts:292

***

### getInputs()

> **getInputs**(`query`, `pageSize`): [`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

Gets the inputs from the store with the given query.

#### Parameters

• **query**: `any`

The query for getting the inputs.

• **pageSize**: `number`

The page size for getting the inputs.

#### Returns

[`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

The inputs from the store.

#### Source

ecmascript/src/context.ts:740

***

### getSymbol()

> **getSymbol**(`index`, `options`): `any`

Gets a symbol with the given index and options.

#### Parameters

• **index**: `number`

The index of the symbol to get.

• **options**: [`Options`](/api/classes/options/)

The options for getting the symbol.

#### Returns

`any`

The symbol.

#### Source

ecmascript/src/context.ts:816

***

### mergeActors()

> **mergeActors**(`payload`, `options`): `void` \| `Promise`\<`any`[]\>

Merges actors with the given payload and options.

#### Parameters

• **payload**: `any`[]

The payload of the actors to merge.

• **options**: [`Options`](/api/classes/options/)

The options for merging the actors.

#### Returns

`void` \| `Promise`\<`any`[]\>

#### Source

ecmascript/src/context.ts:240

***

### mergeComponents()

> **mergeComponents**(`payload`, `options`): `void` \| `Promise`\<`any`[]\>

Merges components with the given payload and options.

#### Parameters

• **payload**: `any`

The payload of the components to merge.

• **options**: [`Options`](/api/classes/options/)

The options for merging the components.

#### Returns

`void` \| `Promise`\<`any`[]\>

#### Source

ecmascript/src/context.ts:683

***

### mergeEntities()

> **mergeEntities**(`payload`, `options`): `void` \| `Promise`\<`any`[]\>

Merges entities with the given payload and options.

#### Parameters

• **payload**: `string`[]

The payload of the entities to merge.

• **options**: [`Options`](/api/classes/options/)

The options for merging the entities.

#### Returns

`void` \| `Promise`\<`any`[]\>

#### Source

ecmascript/src/context.ts:372

***

### mergeSymbol()

> **mergeSymbol**(`payload`, `options`): `undefined` \| `null`

Merges a symbol with the given payload and options.

#### Parameters

• **payload**: [`string`, `number`]

The payload for merging the symbol.

• **options**: [`Options`](/api/classes/options/)

The options for merging the symbol.

#### Returns

`undefined` \| `null`

#### Source

ecmascript/src/context.ts:912

***

### removeActor()

> **removeActor**(`id`, `options`): `boolean` \| `Promise`\<`boolean`\>

Removes an actor with the given id and options.

#### Parameters

• **id**: `string`

The id of the actor to remove.

• **options**: [`Options`](/api/classes/options/)

The options for removing the actor.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/context.ts:205

***

### removeComponent()

> **removeComponent**(`id`, `key`, `options`): `boolean` \| `Promise`\<`boolean`\>

Removes a component with the given id, key, and options.

#### Parameters

• **id**: `string`

The id of the component to remove.

• **key**: `string`

The key of the component to remove.

• **options**: [`Options`](/api/classes/options/)

The options for removing the component.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/context.ts:639

***

### removeEntity()

> **removeEntity**(`id`, `options`): `boolean` \| `Promise`\<`boolean`\>

Removes an entity with the given id and options.

#### Parameters

• **id**: `string`

The id of the entity to remove.

• **options**: [`Options`](/api/classes/options/)

The options for removing the entity.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/context.ts:337

***

### resetFrame()

> **resetFrame**(): `void`

Resets the current frame state.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:957

***

### resetSymbols()

> **resetSymbols**(`offset`, `symbols`, `options`): `undefined` \| `null`

Resets symbols with the given payload and options.

#### Parameters

• **offset**: `number`= `0`

• **symbols**: `any`[]

• **options**: [`Options`](/api/classes/options/)

The options for resetting the symbols.

#### Returns

`undefined` \| `null`

#### Source

ecmascript/src/context.ts:936

***

### setSymbols()

> **setSymbols**(`symbols`): `void`

Sets the symbols with the given symbols.

#### Parameters

• **symbols**: `any`

The symbols to set.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:805

***

### spawnActor()

> **spawnActor**(`id`, `options`): `boolean` \| `Promise`\<`boolean`\>

Spawns an actor with the given id and options.

#### Parameters

• **id**: `string`

The id of the actor to spawn.

• **options**: [`Options`](/api/classes/options/)

The options for spawning the actor.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/context.ts:168

***

### upsertComponent()

> **upsertComponent**(`id`, `key`, `value`, `tick`, `options`): `any`

Upserts a component with the given id, key, value, and options.

#### Parameters

• **id**: `string` \| `Uint32Array` \| `string`[]

The id of the component to upsert.

• **key**: `string`

The key of the component to upsert.

• **value**: `any`

The value to upsert in the component.

• **tick**: `number`= `0`

The tick value for the component. Defaults to 0.

• **options**: [`Options`](/api/classes/options/)

The options for upserting the component.

#### Returns

`any`

#### Source

ecmascript/src/context.ts:541

***

### ensure()

> **`static`** **ensure**(`context`, `options`, `_Storage`): [`Context`](/api/classes/context/)

Ensures that the given context is an instance of the Context class.

#### Parameters

• **context**: [`Context`](/api/classes/context/) \| `ContextProps`

The context to ensure.

• **options**: `any`

The options for ensuring the context.

• **\_Storage**: *typeof* [`Storage`](/api/classes/storage/)= `Storage`

The store.

#### Returns

[`Context`](/api/classes/context/)

The context.

#### Source

ecmascript/src/context.ts:59

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
