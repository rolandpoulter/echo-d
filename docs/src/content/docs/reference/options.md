---
title: Options
description: A reference to echo.Options.
---

## Summary

The `Options` class represents the options for a node in a TypeScript code. It provides a way to configure various settings and behaviors of the node.

## Example Usage

```javascript
import Options from './Options'

// Create an instance of Options with custom options
const options = new Options({
  compressStringsAsInts: true,
  enableRollback: false,
  pageSize: 50
})

// Use the options in a node
const node = new Node(options)
```

## Code Analysis

### Main functionalities

- Allows configuring various options for a node
- Provides default values for the options
- Ensures that the provided options are an instance of Options
- Clones and extends the options object

___

### Static Methods

- `ensure(options: Options | OptionsProps = {}, actionsThis: any): Options`: Ensures that the provided options are an instance of Options. If the options are already an instance of Options, it returns the options as is. Otherwise, it creates a new instance of Options with the provided options and actions context.

___

### Methods

- `constructor(options: Options | OptionsProps = {}, actionsThis: any = null)`: Constructs a new Options object with the provided options and actions context. If no options are provided, it uses the default values defined in the `Constants` module.
- `clone(): Options`: Creates a new Options object from the current one by copying all the fields.
- `extend(options: Options | OptionsProps | Object, actionThis: any = this.actions): Options`: Extends the current Options object by merging the provided options into it. It creates a new Options object with the merged options.

___

### Fields

- `actions: { [key: string]: Function }`: An object containing action functions that can be used by the node.
- `batchActionPayloadSizes: Object`: An object defining the payload sizes for batch actions.
- `compressStringsAsInts: boolean`: A flag indicating whether to compress strings as integers.
- `defaultSymbols: Array<string>`: An array of default symbols.
- `enableRollback: boolean`: A flag indicating whether to enable rollback functionality.
- `enableQuerying: boolean`: A flag indicating whether to enable querying functionality.
- `enumDefaultSymbols: Object`: An object defining the default symbols as an enum.
- `getActorId: Function`: A function that returns the actor ID.
- `getGroupedValue: Function`: A function that returns the grouped value.
- `indexes: Object`: An object defining the indexes for the node.
- `isAuthority: boolean`: A flag indicating whether the node is an authority.
- `isAsyncStorage: boolean`: A flag indicating whether the node uses async storage.
- `isComponentRelay: boolean`: A flag indicating whether the node is a component relay.
- `isDiffed: boolean`: A flag indicating whether the node is diffed.
- `isGroupedComponents: boolean`: A flag indicating whether the node has grouped components.
- `isOrdered: boolean`: A flag indicating whether the node is ordered.
- `isReadOnly: boolean`: A flag indicating whether the node is read-only.
- `isSymbolLeader: boolean`: A flag indicating whether the node is a symbol leader.
- `isSymbolRelay: boolean`: A flag indicating whether the node is a symbol relay.
- `onUpdate: Function | null`: A function to be called on update.
- `pageSize: number`: The page size for the node.
- `responder: Function`: A function to handle responses.
- `skipPending: boolean`: A flag indicating whether to skip pending actions.
- `types: Object`: An object defining the types for the node.
- `setGroupedValue: Function`: A function to set the grouped value.
- `updateOptions: UpdateOptions`: An object defining the update options for the node.
- `worldOptions: any`: Additional options for the world.

___
