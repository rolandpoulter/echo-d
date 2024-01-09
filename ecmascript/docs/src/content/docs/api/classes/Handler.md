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

handler.ts:137

## Properties

### context

> **context**: [`Context`](/api/classes/context/)

#### Source

handler.ts:126

***

### options

> **options**: [`Options`](/api/classes/options/)

#### Source

handler.ts:127

## Methods

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

handler.ts:165

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

handler.ts:174

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

handler.ts:157

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

handler.ts:147

***

### updater()

> **updater**(`extendOptions`, `tick`): `void`

Updates other nodes in the network.

#### Parameters

• **extendOptions**: `any`

The options for updating. If an instance of Options is not provided, a new one will be created.

• **tick**: `number`= `undefined`

The tick for updating.

#### Returns

`void`

#### Source

handler.ts:184

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
