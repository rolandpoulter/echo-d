---
title: Options
description: A reference to echo.Options.
---

The `Options` class represents the options for a node in a TypeScript code. It provides a way to configure various settings and behaviors for the node.

## Example Usage

```js
import Options from './Options'

// Create an instance of Options with custom options
const options = new Options({
  compressStringsAsInts: true,
  enableRollback: false,
  pageSize: 50,
  types: {
    asset: 'str',
    position: ['f32', 3],
  },
})

// Use the options in a node
const node = new Node(options)
```

___

### Static Methods

- `ensure(options: Options | OptionsProps = {}, actionsThis: any): Options`: Ensures that the provided options are an instance of Options. Returns an instance of Options.

___

### Methods

- `constructor(options: Options | OptionsProps = {}, actionsThis: any = null)`: Constructs a new Options object with the provided options and actions context.
- `clone(): Options`: Creates a new Options object from the current one.
- `extend(options: Options | OptionsProps | Object, actionThis: any = this.actions): Options`: Extends the current Options object with the provided options.

___

### Fields

- `actions: { [key: string]: Function }`: The actions available for the node.
- `batchActionPayloadSizes: Object`: The payload sizes for batch actions.
- `compressStringsAsInts: boolean`: Whether to compress strings as integers.
- `defaultSymbols: Array<string>`: The default symbols for the node.
- `enableRollback: boolean`: Whether to enable rollback functionality.
- `enableQuerying: boolean`: Whether to enable querying functionality.
- `enumDefaultSymbols: Object`: The enum for default symbols.
- `getActorId: Function`: The function to get the actor ID.
- `getGroupedValue: Function`: The function to get the grouped value.
- `indexes: Object`: The indexes for the node.
- `isAuthority: boolean`: Whether the node is an authority.
- `isAsyncStorage: boolean`: Whether the node uses async storage.
- `isComponentRelay: boolean`: Whether the node is a component relay.
- `isDiffed: boolean`: Whether the node is diffed.
- `isGroupedComponents: boolean`: Whether the node has grouped components.
- `isOrdered: boolean`: Whether the node is ordered.
- `isReadOnly: boolean`: Whether the node is read-only.
- `isSymbolLeader: boolean`: Whether the node is a symbol leader.
- `isSymbolRelay: boolean`: Whether the node is a symbol relay.
- `onUpdate: Function | null`: The function to call on update.
- `pageSize: number`: The page size for the node.
- `responder: Function`: The responder function.
- `skipPending: boolean`: Whether to skip pending actions.
- `types: Object`: The types for the node.
- `setGroupedValue: Function`: The function to set the grouped value.
- `storeOptions: Object`: The options for the store.
- `updateOptions: UpdateOptions`: The update options for the node.
- `worldOptions: any`: The options for the world.

___
