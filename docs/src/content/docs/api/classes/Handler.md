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

ecmascript/src/handler.ts:141

## Properties

### context

> **context**: [`Context`](/api/classes/context/)

#### Source

ecmascript/src/handler.ts:130

***

### options

> **options**: [`Options`](/api/classes/options/)

#### Source

ecmascript/src/handler.ts:131

## Methods

### actorInput()

> **actorInput**(`id`, `input`, `tick`, `extendOptions`): `number` \| `Promise`\<`number`\>

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

`number` \| `Promise`\<`number`\>

#### Source

ecmascript/src/handler.ts:223

***

### changeComponent()

> **changeComponent**(`id`, `key`, `value`, `tick`, `extendOptions`): `void` \| `Promise`\<`any`\>

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

`void` \| `Promise`\<`any`\>

#### Source

ecmascript/src/handler.ts:269

***

### createEntity()

> **createEntity**(`id`, `extendOptions`): `boolean` \| `Promise`\<`boolean`\>

Creates an entity.

#### Parameters

• **id**: `string`

The ID of the entity to create.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/handler.ts:233

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

ecmascript/src/handler.ts:169

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

ecmascript/src/handler.ts:178

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

ecmascript/src/handler.ts:161

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

ecmascript/src/handler.ts:151

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

ecmascript/src/handler.ts:290

***

### removeActor()

> **removeActor**(`id`, `extendOptions`): `boolean` \| `Promise`\<`boolean`\>

Despawns an actor.

#### Parameters

• **id**: `string`

The ID of the actor to despawn.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/handler.ts:211

***

### removeComponent()

> **removeComponent**(`id`, `key`, `extendOptions`): `boolean` \| `Promise`\<`boolean`\>

Removes a component from an entity.

#### Parameters

• **id**: `string`

The ID of the entity to remove the component from.

• **key**: `any`

The key of the component to remove.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/handler.ts:280

***

### removeEntity()

> **removeEntity**(`id`, `extendOptions`): `boolean` \| `Promise`\<`boolean`\>

Removes an entity.

#### Parameters

• **id**: `string`

The ID of the entity to remove.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/handler.ts:243

***

### spawnActor()

> **spawnActor**(`id`, `extendOptions`): `boolean` \| `Promise`\<`boolean`\>

Spawns an actor.

#### Parameters

• **id**: `string`

The ID of the actor to spawn.

• **extendOptions**: `any`

Custom options to extend the options for the handler.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Source

ecmascript/src/handler.ts:201

***

### updater()

> **updater**(`extendOptions`, `tick`): `Promise`\<`any`[]\>

Updates other nodes in the network.

#### Parameters

• **extendOptions**: `any`

Custom options to extend the options for the handler.

• **tick**: `number`= `undefined`

The tick for updating.

#### Returns

`Promise`\<`any`[]\>

A promise that resolves with updated batch of messages.

#### Source

ecmascript/src/handler.ts:189

***

### upsertComponent()

> **upsertComponent**(`id`, `key`, `value`, `tick`, `extendOptions`): `void` \| `Promise`\<`any`\>

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

`void` \| `Promise`\<`any`\>

#### Source

ecmascript/src/handler.ts:256

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
