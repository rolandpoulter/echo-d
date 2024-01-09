---
editUrl: false
next: true
prev: true
title: "OptionsProps"
---

The OptionsProps interface represents the properties for the Options class.

## Properties

### actions?

> **actions**?: `Object`

An object containing the `addSymbol` and `getSymbol` functions.

#### Type declaration

##### addSymbol?

> **addSymbol**?: `Function`

##### getSymbol?

> **getSymbol**?: `Function`

#### Source

options.ts:33

***

### batchActionPayloadSizes?

> **batchActionPayloadSizes**?: `Object`

An object to specify the payload sizes for batch actions.

#### Source

options.ts:37

***

### compressStringsAsInts?

> **compressStringsAsInts**?: `boolean`

A flag to compress strings as integers.

#### Source

options.ts:38

***

### defaultSymbols?

> **defaultSymbols**?: `string`[]

An array of default symbols.

#### Source

options.ts:39

***

### enableQuerying?

> **enableQuerying**?: `boolean`

A flag to indicate if querying is enabled.

#### Source

options.ts:41

***

### enableRollback?

> **enableRollback**?: `boolean`

A flag to indicate if time rollback is enabled on inputs.

#### Source

options.ts:40

***

### enumDefaultSymbols?

> **enumDefaultSymbols**?: `Object`

An object containing the default symbols.

#### Source

options.ts:42

***

### getActorId?

> **getActorId**?: `Function`

A function to get the actor ID.

#### Source

options.ts:43

***

### indexes?

> **indexes**?: `Object`

An object containing the indexes.

#### Source

options.ts:44

***

### isAsyncStorage?

> **isAsyncStorage**?: `boolean`

A flag to indicate if the node uses async storage.

#### Source

options.ts:46

***

### isAuthority?

> **isAuthority**?: `boolean`

A flag to indicate if the node is an authority.

#### Source

options.ts:45

***

### isComponentRelay?

> **isComponentRelay**?: `boolean`

A flag to indicate if the node is a component relay.

#### Source

options.ts:47

***

### isDiffed?

> **isDiffed**?: `boolean`

A flag to indicate if the node is diffed.

#### Source

options.ts:48

***

### isOrdered?

> **isOrdered**?: `boolean`

A flag to indicate if the node is ticked.

#### Source

options.ts:49

***

### isReadOnly?

> **isReadOnly**?: `boolean`

A flag to indicate if the node is read only.

#### Source

options.ts:50

***

### isSymbolLeader?

> **isSymbolLeader**?: `boolean`

A flag to indicate if the node is a symbol leader.

#### Source

options.ts:51

***

### isSymbolRelay?

> **isSymbolRelay**?: `boolean`

A flag to indicate if the node is a symbol relay.

#### Source

options.ts:52

***

### onUpdate?

> **onUpdate**?: `Function`

A function to call when the node is updated.

#### Source

options.ts:53

***

### pageSize?

> **pageSize**?: `number`

The page size.

#### Source

options.ts:54

***

### responder?

> **responder**?: `Function`

A function to respond to actions.

#### Source

options.ts:55

***

### skipPending?

> **skipPending**?: `boolean`

A flag to skip pending actions.

#### Source

options.ts:56

***

### updateOptions?

> **updateOptions**?: [`UpdateOptions`](/api/interfaces/updateoptions/)

An object containing the valid keys for updates and any other options.

#### Source

options.ts:57

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
