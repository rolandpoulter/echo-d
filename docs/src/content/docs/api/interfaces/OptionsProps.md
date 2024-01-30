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

ecmascript/src/options.ts:39

***

### batchActionPayloadSizes?

> **batchActionPayloadSizes**?: `Object`

An object to specify the payload sizes for batch actions.

#### Source

ecmascript/src/options.ts:43

***

### compressStringsAsInts?

> **compressStringsAsInts**?: `boolean`

A flag to compress strings as integers.

#### Source

ecmascript/src/options.ts:44

***

### defaultSymbols?

> **defaultSymbols**?: `string`[]

An array of default symbols.

#### Source

ecmascript/src/options.ts:45

***

### enableQuerying?

> **enableQuerying**?: `boolean`

A flag to indicate if querying is enabled.

#### Source

ecmascript/src/options.ts:47

***

### enableRollback?

> **enableRollback**?: `boolean`

A flag to indicate if time rollback is enabled on inputs.

#### Source

ecmascript/src/options.ts:46

***

### enumDefaultSymbols?

> **enumDefaultSymbols**?: `Object`

An object containing the default symbols.

#### Source

ecmascript/src/options.ts:48

***

### getActorId?

> **getActorId**?: `Function`

A function to get the actor ID.

#### Source

ecmascript/src/options.ts:49

***

### getGroupedValue?

> **getGroupedValue**?: `Function`

A function to get the value from a group.

#### Source

ecmascript/src/options.ts:50

***

### indexes?

> **indexes**?: `Object`

An object containing the indexes.

#### Source

ecmascript/src/options.ts:51

***

### isAsyncStorage?

> **isAsyncStorage**?: `boolean`

A flag to indicate if the node uses async storage.

#### Source

ecmascript/src/options.ts:53

***

### isAuthority?

> **isAuthority**?: `boolean`

A flag to indicate if the node is an authority.

#### Source

ecmascript/src/options.ts:52

***

### isComponentRelay?

> **isComponentRelay**?: `boolean`

A flag to indicate if the node is a component relay.

#### Source

ecmascript/src/options.ts:54

***

### isDiffed?

> **isDiffed**?: `boolean`

A flag to indicate if the node is diffed.

#### Source

ecmascript/src/options.ts:55

***

### isGroupedComponents?

> **isGroupedComponents**?: `boolean`

A flag to indicate if the node uses grouped components.

#### Source

ecmascript/src/options.ts:56

***

### isOrdered?

> **isOrdered**?: `boolean`

A flag to indicate if the node is ticked.

#### Source

ecmascript/src/options.ts:57

***

### isReadOnly?

> **isReadOnly**?: `boolean`

A flag to indicate if the node is read only.

#### Source

ecmascript/src/options.ts:58

***

### isSymbolLeader?

> **isSymbolLeader**?: `boolean`

A flag to indicate if the node is a symbol leader.

#### Source

ecmascript/src/options.ts:59

***

### isSymbolRelay?

> **isSymbolRelay**?: `boolean`

A flag to indicate if the node is a symbol relay.

#### Source

ecmascript/src/options.ts:60

***

### onUpdate?

> **onUpdate**?: `Function`

A function to call when the node is updated.

#### Source

ecmascript/src/options.ts:61

***

### pageSize?

> **pageSize**?: `number`

The page size.

#### Source

ecmascript/src/options.ts:62

***

### responder?

> **responder**?: `Function`

A function to respond to actions.

#### Source

ecmascript/src/options.ts:63

***

### setGroupedValue?

> **setGroupedValue**?: `Function`

A function to set the value in a group.

#### Source

ecmascript/src/options.ts:66

***

### skipPending?

> **skipPending**?: `boolean`

A flag to skip pending actions.

#### Source

ecmascript/src/options.ts:64

***

### storeOptions?

> **storeOptions**?: `Object`

An object containing the store options.

#### Source

ecmascript/src/options.ts:67

***

### types?

> **types**?: `Object`

An object containing the types.

#### Source

ecmascript/src/options.ts:65

***

### updateOptions?

> **updateOptions**?: [`UpdateOptions`](/api/interfaces/updateoptions/)

An object containing the valid keys for updates and any other options.

#### Source

ecmascript/src/options.ts:68

***

### worldOptions?

> **worldOptions**?: `any`

An object containing the world options.

#### Source

ecmascript/src/options.ts:69

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
