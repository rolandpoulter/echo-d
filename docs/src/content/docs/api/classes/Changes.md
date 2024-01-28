---
editUrl: false
next: true
prev: true
title: "Changes"
---

The Changes class provides methods for managing changes in a context.

## Constructors

### new Changes(context, changes)

> **new Changes**(`context`, `changes`?): [`Changes`](/api/classes/changes/)

Creates a new instance of the Changes class.

#### Parameters

• **context**: [`Context`](/api/classes/context/)

The context in which changes are to be managed.

• **changes?**: `ChangesInput`

An optional initial set of changes.

#### Returns

[`Changes`](/api/classes/changes/)

#### Source

ecmascript/src/changes.ts:29

## Methods

### changeComponent()

> **changeComponent**(`id`, `key`, `newValue`, `prevValue`): `Promise`\<`any`[]\>

Changes a component in the current context.

#### Parameters

• **id**: `string`

The ID of the component to be changed.

• **key**: `string`

The key of the property to be changed.

• **newValue**: `any`

The new value of the property.

• **prevValue**: `any`

The previous value of the property.

#### Returns

`Promise`\<`any`[]\>

The new value.

#### Source

ecmascript/src/changes.ts:43

***

### getValue()

> **getValue**(`id`, `key`, `storedValue`): `Record`\<`string`, `any`\>

Retrieves the changes of a value.

#### Parameters

• **id**: `string`

The ID of the component.

• **key**: `string`

The key of the property.

• **storedValue**: `any`

The stored value.

#### Returns

`Record`\<`string`, `any`\>

The diffs.

#### Source

ecmascript/src/changes.ts:55

***

### reset()

> **reset**(`changes`?): [`Changes`](/api/classes/changes/)

Resets the changes to a new set of changes or an empty object if no changes are provided.

#### Parameters

• **changes?**: `ChangesInput`

The new set of changes.

#### Returns

[`Changes`](/api/classes/changes/)

The instance of the Changes class.

#### Source

ecmascript/src/changes.ts:71

***

### upsertComponent()

> **upsertComponent**(`id`, `key`, `newValue`, `_prevValue`): `Promise`\<`any`[]\>

Updates an existing component or inserts a new one if it doesn't exist in the current context.

#### Parameters

• **id**: `string`

The ID of the component to be updated or inserted.

• **key**: `string`

The key of the property to be updated or inserted.

• **newValue**: `any`

The new value of the property.

• **\_prevValue**: `any`

The previous value of the property.

#### Returns

`Promise`\<`any`[]\>

The new value.

#### Source

ecmascript/src/changes.ts:85

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
