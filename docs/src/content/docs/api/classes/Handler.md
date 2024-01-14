---
editUrl: false
next: true
prev: true
title: "Handler"
---

The Handler class. It handles messages.

## Constructors

### new Handler(context, options, actions, _Storage)

> **new Handler**(`context`, `options`, `actions`, `_Storage`): [`Handler`](/api/classes/handler/)

Creates a new Handler instance.

#### Parameters

• **context**: `any`

The context for the handler.

• **options**: `any`

The options for the handler.

• **actions**: `Object`

The actions for the handler.

• **\_Storage**: *typeof* [`Storage`](/api/classes/storage/)= `Storage`

The storage for the handler.

#### Returns

[`Handler`](/api/classes/handler/)

#### Source

ecmascript/src/handler.ts:137

## Properties

### context

> **context**: [`Context`](/api/classes/context/)

#### Source

ecmascript/src/handler.ts:126

***

### options

> **options**: [`Options`](/api/classes/options/)

#### Source

ecmascript/src/handler.ts:127

## Methods

### actorInput()

> **actorInput**(`id`, `input`, `tick`, `extendOptions`): `void`

Updates an actor with an input.

#### Parameters

• **id**: `string`

The ID of the actor to update.

• **input**: `any`

The input for updating.

• **tick**: `number`= `undefined`

The tick for updating.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:218

***

### changeComponent()

> **changeComponent**(`id`, `key`, `value`, `tick`, `extendOptions`): `void`

Changes a component of an entity.

#### Parameters

• **id**: `string`

The ID of the entity to change the component of.

• **key**: `string`

The key of the component to change.

• **value**: `any`

The value of the component to change.

• **tick**: `number`= `undefined`

The tick for updating.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:264

***

### createEntity()

> **createEntity**(`id`, `extendOptions`): `void`

Creates an entity.

#### Parameters

• **id**: `string`

The ID of the entity to create.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:228

***

### getActionHandler()

> **getActionHandler**(): (`action`) => (`payload`) => `void`

Gets the action handler.

#### Returns

`Function`

> ##### Parameters
>
> • **action**: `string` \| `number`
>
> ##### Returns
>
> `Object`
>
> > ###### Parameters
> >
> > • **payload**: `any`
> >
> > ###### Returns
> >
> > `void`
> >
>
> > ###### action
> >
> > > **action**: `string` \| `number`
> >
>

#### Source

ecmascript/src/handler.ts:165

***

### getSymbolAction()

> **getSymbolAction**(`action`): `string` \| `number`

Gets the symbol action.

#### Parameters

• **action**: `string` \| `number`

The action.

#### Returns

`string` \| `number`

#### Source

ecmascript/src/handler.ts:174

***

### many()

> **many**(`message`, `extendOptions`): `void`

Handles multiple messages.

#### Parameters

• **message**: `any`[] \| [`Message`](/api/interfaces/message/)

The messages to handle.

• **extendOptions**: `any`

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:157

***

### one()

> **one**(`message`, `extendOptions`): `void`

Handles a single message.

#### Parameters

• **message**: `any`[] \| [`Message`](/api/interfaces/message/)

The message to handle.

• **extendOptions**: `any`

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:147

***

### queryComponents()

> **queryComponents**(`query`): `Set`\<`any`\>

Queries components.

#### Parameters

• **query**: `any`

The query for querying components.

#### Returns

`Set`\<`any`\>

The components queried.

#### Source

ecmascript/src/handler.ts:285

***

### removeActor()

> **removeActor**(`id`, `extendOptions`): `void`

Despawns an actor.

#### Parameters

• **id**: `string`

The ID of the actor to despawn.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:206

***

### removeComponent()

> **removeComponent**(`id`, `key`, `extendOptions`): `void`

Removes a component from an entity.

#### Parameters

• **id**: `string`

The ID of the entity to remove the component from.

• **key**: `any`

The key of the component to remove.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:275

***

### removeEntity()

> **removeEntity**(`id`, `extendOptions`): `void`

Removes an entity.

#### Parameters

• **id**: `string`

The ID of the entity to remove.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:238

***

### spawnActor()

> **spawnActor**(`id`, `extendOptions`): `void`

Spawns an actor.

#### Parameters

• **id**: `string`

The ID of the actor to spawn.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:196

***

### updater()

> **updater**(`extendOptions`, `tick`): `Promise`\<`void`\>

Updates other nodes in the network.

#### Parameters

• **extendOptions**: `any`

Custom options to extend the options for the handler.

• **tick**: `number`= `undefined`

The tick for updating.

#### Returns

`Promise`\<`void`\>

#### Source

ecmascript/src/handler.ts:184

***

### upsertComponent()

> **upsertComponent**(`id`, `key`, `value`, `tick`, `extendOptions`): `void`

Sets a component to an entity.

#### Parameters

• **id**: `string`

The ID of the entity to add the component to.

• **key**: `string`

The key of the component to add.

• **value**: `any`

The value of the component to add.

• **tick**: `number`= `undefined`

The tick for updating.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`void`

#### Source

ecmascript/src/handler.ts:251

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
