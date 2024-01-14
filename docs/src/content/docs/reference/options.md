---
title: Options
description: A reference to echo.Options.
---

## Summary

The `Handler` class is responsible for handling messages and updating the context based on those messages.

## Example Usage

```javascript
// Create a new instance of the Handler class
const handler = new Handler(context, options, actions);

// Handle a single message
handler.one(message, extendOptions);

// Handle multiple messages
handler.many(messages, extendOptions);

// Get the action handler
const actionHandler = handler.getActionHandler();

// Get the symbol action
const symbolAction = handler.getSymbolAction(action);

// Update other nodes in the network
handler.updater(extendOptions, tick);
```

## Code Analysis

### Main functionalities

- Handles messages and updates the context based on those messages.
- Provides methods for handling single and multiple messages.
- Retrieves the action handler and symbol action.
- Updates other nodes in the network.

___

### Static Methods

- `ensure(options: Options | OptionsProps, actionsThis: any): Options`: Ensures that the given options is an `Options` instance.

___

### Methods

- `one(message: Message | any[], extendOptions: Options | any)`: Handles a single message by calling the `oneHandler` function with the provided message, context, and options.
- `many(message: Message | any[], extendOptions: Options | any)`: Handles multiple messages by calling the `manyHandler` function with the provided messages, context, and options.
- `getActionHandler(): ActionHandler`: Retrieves the action handler by calling the `getActionHandler` function with the context and options.
- `getSymbolAction(action: string | number): SymbolAction`: Retrieves the symbol action by calling the `getSymbolAction` function with the provided action and default symbols from the options.
- `updater(extendOptions: Options | any, tick: number = Date.now()): void`: Updates other nodes in the network by calling the `updater` function with the context, extended options, and tick value.

___

### Fields

- `context: Context`: The context for the handler.
- `options: Options`: The options for the handler.

___
