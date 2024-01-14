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

ecmascript/src/context.ts:73

## Properties

### changes

> **changes**: `null` \| [`Changes`](/api/classes/changes/)

The changes.

#### Source

ecmascript/src/context.ts:46

***

### events

> **events**: `any`

The events.

#### Source

ecmascript/src/context.ts:43

***

### order

> **order**: `null` \| [`Ordered`](/api/classes/ordered/)

The order.

#### Source

ecmascript/src/context.ts:45

***

### pending

> **pending**: `null` \| [`Pending`](/api/classes/pending/)

The pending.

#### Source

ecmascript/src/context.ts:47

***

### store

> **store**: [`Storage`](/api/classes/storage/)

The store.

#### Source

ecmascript/src/context.ts:44

***

### symbols

> **symbols**: `null` \| [`Symbols`](/api/classes/symbols/)

#### Source

ecmascript/src/context.ts:48

## Accessors

### actors

> **`get`** **actors**(): `string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

Gets the actors from the store.

#### Returns

`string`[][] \| [`Emitter`](/api/classes/emitter/)\<`string`[][]\>

The actors from the store.

#### Source

ecmascript/src/context.ts:142

***

### components

> **`get`** **components**(): `any`

Gets the components from the store.

#### Returns

`any`

The components from the store.

#### Source

ecmascript/src/context.ts:326

***

### entities

> **`get`** **entities**(): `any`

Gets the entities from the store.

#### Returns

`any`

The entities from the store.

#### Source

ecmascript/src/context.ts:234

***

### inputs

> **`get`** **inputs**(): [`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

Gets the inputs from the store.

#### Returns

[`Inputs`](/api/interfaces/inputs/)[] \| [`Emitter`](/api/classes/emitter/)\<[`Inputs`](/api/interfaces/inputs/)[]\>

The inputs from the store.

#### Source

ecmascript/src/context.ts:524

***

### symbolsEnum

> **`get`** **symbolsEnum**(): `undefined` \| [`Enum`](/api/interfaces/enum/)

Gets the enum of symbols.

#### Returns

`undefined` \| [`Enum`](/api/interfaces/enum/)

The enum of symbols.

#### Source

ecmascript/src/context.ts:579

***

### symbolsList

> **`get`** **symbolsList**(): `undefined` \| `string`[]

Gets the list of symbols.

#### Returns

`undefined` \| `string`[]

The list of symbols.

#### Source

ecmascript/src/context.ts:570

## Methods

### actorInput()

> **actorInput**(`id`, `input`, `tick`, `options`): `void`

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

`void`

#### Source

ecmascript/src/context.ts:547

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

ecmascript/src/context.ts:618

***

### changeComponent()

> **changeComponent**(`id`, `key`, `value`, `tick`, `options`): `void`

Changes a component with the given id, key, value, and options.

#### Parameters

• **id**: `string` \| `string`[]

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

`void`

#### Source

ecmascript/src/context.ts:350

***

### createEntity()

> **createEntity**(`id`, `options`): `void`

Creates an entity with the given id and options.

#### Parameters

• **id**: `string`

The id of the entity to create.

• **options**: [`Options`](/api/classes/options/)

The options for creating the entity.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:255

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

ecmascript/src/context.ts:660

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

ecmascript/src/context.ts:153

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

ecmascript/src/context.ts:337

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

ecmascript/src/context.ts:245

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

ecmascript/src/context.ts:535

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

ecmascript/src/context.ts:599

***

### mergeActors()

> **mergeActors**(`payload`, `options`): `void`

Merges actors with the given payload and options.

#### Parameters

• **payload**: `any`[]

The payload of the actors to merge.

• **options**: [`Options`](/api/classes/options/)

The options for merging the actors.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:213

***

### mergeComponents()

> **mergeComponents**(`payload`, `options`): `void`

Merges components with the given payload and options.

#### Parameters

• **payload**: `any`

The payload of the components to merge.

• **options**: [`Options`](/api/classes/options/)

The options for merging the components.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:497

***

### mergeEntities()

> **mergeEntities**(`payload`, `options`): `void`

Merges entities with the given payload and options.

#### Parameters

• **payload**: `string`[]

The payload of the entities to merge.

• **options**: [`Options`](/api/classes/options/)

The options for merging the entities.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:305

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

ecmascript/src/context.ts:695

***

### removeActor()

> **removeActor**(`id`, `options`): `void`

Removes an actor with the given id and options.

#### Parameters

• **id**: `string`

The id of the actor to remove.

• **options**: [`Options`](/api/classes/options/)

The options for removing the actor.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:188

***

### removeComponent()

> **removeComponent**(`id`, `key`, `options`): `void`

Removes a component with the given id, key, and options.

#### Parameters

• **id**: `string`

The id of the component to remove.

• **key**: `string`

The key of the component to remove.

• **options**: [`Options`](/api/classes/options/)

The options for removing the component.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:469

***

### removeEntity()

> **removeEntity**(`id`, `options`): `void`

Removes an entity with the given id and options.

#### Parameters

• **id**: `string`

The id of the entity to remove.

• **options**: [`Options`](/api/classes/options/)

The options for removing the entity.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:280

***

### resetFrame()

> **resetFrame**(): `void`

Resets the current frame state.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:740

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

ecmascript/src/context.ts:719

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

ecmascript/src/context.ts:588

***

### spawnActor()

> **spawnActor**(`id`, `options`): `void`

Spawns an actor with the given id and options.

#### Parameters

• **id**: `string`

The id of the actor to spawn.

• **options**: [`Options`](/api/classes/options/)

The options for spawning the actor.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:163

***

### upsertComponent()

> **upsertComponent**(`id`, `key`, `value`, `tick`, `options`): `void`

Upserts a component with the given id, key, value, and options.

#### Parameters

• **id**: `string`

• **key**: `string`

The key of the component to upsert.

• **value**: `any`

The value to upsert in the component.

• **tick**: `number`= `0`

The tick value for the component. Defaults to 0.

• **options**: [`Options`](/api/classes/options/)

The options for upserting the component.

#### Returns

`void`

#### Source

ecmascript/src/context.ts:413

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

ecmascript/src/context.ts:58

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
