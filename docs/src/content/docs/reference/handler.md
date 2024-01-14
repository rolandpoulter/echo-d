---
title: Handler
description: A reference to echo.Handler.
---

## Summary

The `Handler` class is responsible for handling messages and managing the context and options for message handling.

## Example Usage

```javascript
// Create a new Handler instance
const handler = new Handler(context, options)

// Handle a single message
handler.one(message)

// Handle multiple messages
handler.many(messages)

// Get the action handler
const actionHandler = handler.getActionHandler()

// Get the symbol action
const symbolAction = handler.getSymbolAction(action)

// Update other nodes in the network
const updater = handler.updater()
```

## Code Analysis

### Main functionalities

- Handles messages by calling the appropriate methods in the context and options.
- Provides methods to get the action handler and symbol action.
- Allows updating other nodes in the network.

___

### Methods

- `one(message: Message | any[], extendOptions: Options | any)`: Handles a single message by calling the `oneHandler` function with the message, context, and extended options.
- `many(message: Message | any[], extendOptions: Options | any)`: Handles multiple messages by calling the `manyHandler` function with the messages, context, and extended options.
- `getActionHandler(): Function`: Returns the action handler function.
- `getSymbolAction(action: string | number): Function`: Returns the symbol action function for the given action.
- `updater(extendOptions: Options | any)`: Returns the updater function for updating other nodes in the network.

___

### Fields

- `context: Context`: The context for the handler.
- `options: Options`: The options for the handler.

___
