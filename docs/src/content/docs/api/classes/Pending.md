---
editUrl: false
next: true
prev: true
title: "Pending"
---

The Pending class represents a pending state with removed, updated, and created states.

## Constructors

### new Pending(isDiffed)

> **new Pending**(`isDiffed`): [`Pending`](/api/classes/pending/)

Constructs a new Pending object and resets its state.

#### Parameters

• **isDiffed**: `boolean`= `false`

#### Returns

[`Pending`](/api/classes/pending/)

#### Source

ecmascript/src/pending.ts:64

## Properties

### created

> **created**: [`CreatedState`](/api/interfaces/createdstate/)

The created state.

#### Source

ecmascript/src/pending.ts:57

***

### isDiffed

> **isDiffed**: `boolean`

#### Source

ecmascript/src/pending.ts:59

***

### removed

> **removed**: [`RemovedState`](/api/interfaces/removedstate/)

The removed state.

#### Source

ecmascript/src/pending.ts:55

***

### symbols

> **symbols**: (`number` \| [[`InputPayload`](/api/namespaces/actor/interfaces/inputpayload/), `number`])[]

#### Source

ecmascript/src/pending.ts:58

***

### updated

> **updated**: [`UpdatedState`](/api/interfaces/updatedstate/)

The updated state.

#### Source

ecmascript/src/pending.ts:56

## Methods

### actorInput()

> **actorInput**(`id`, `index`): `void`

Adds an actor input to the created inputs state.

#### Parameters

• **id**: `string`

The ID of the actor.

• **index**: `number`

The index of the new input.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:89

***

### addSymbol()

> **addSymbol**(`symbolTuple`): `void`

Adds a symbol tuple to the symbols array.

#### Parameters

• **symbolTuple**: `any`

The symbol tuple to add.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:189

***

### changeComponent()

> **changeComponent**(`pendingType`, `id`, `key`): `void`

Changes a component in the specified pending state.

#### Parameters

• **pendingType**: `string`

The type of the pending state (removed, updated, or created).

• **id**: `string`

The ID of the entity.

• **key**: `string`

The key of the component.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:101

***

### createEntity()

> **createEntity**(`id`): `void`

Marks an entity as created in the created state.

#### Parameters

• **id**: `string`

The ID of the entity to create.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:110

***

### removeActor()

> **removeActor**(`id`): `void`

Marks an actor as removed in the removed state.

#### Parameters

• **id**: `string`

The ID of the actor to remove.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:119

***

### removeComponent()

> **removeComponent**(`id`, `key`): `void`

Marks a component as removed in the removed state.

#### Parameters

• **id**: `string`

The ID of the entity.

• **key**: `string`

The key of the component to remove.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:129

***

### removeEntity()

> **removeEntity**(`id`): `void`

Marks an entity as removed in the removed state.

#### Parameters

• **id**: `string`

The ID of the entity to remove.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:139

***

### replaceSymbols()

> **replaceSymbols**(`offset`, `symbols`): `void`

Replaces the symbols array with a new array of symbol tuples.

#### Parameters

• **offset**: `number`

• **symbols**: `any`[]

The new array of symbols.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:198

***

### reset()

> **reset**(): `void`

Resets the state of the Pending object.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:146

***

### spawnActor()

> **spawnActor**(`id`): `void`

Marks an actor as spawned in the created state.

#### Parameters

• **id**: `string`

The ID of the actor to spawn.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:155

***

### upsertComponent()

> **upsertComponent**(`pendingType`, `id`, `key`): `void`

Inserts or updates a component in the specified pending state.

#### Parameters

• **pendingType**: `string`

The type of the pending state (created or updated).

• **id**: `string`

The ID of the entity.

• **key**: `string`

The key of the component.

#### Returns

`void`

#### Source

ecmascript/src/pending.ts:166

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
