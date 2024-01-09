---
title: Updater
description: A reference to echo.updater.
---

## Summary

The `updater` function updates the context based on the provided options by processing different types of updates such as creating entities, spawning actors, removing entities and components, and updating components and inputs. It also handles batching of messages and indexing of symbols.

## Example Usage

```javascript
const context = {...}; // current context
const options = {...}; // options for updating the context
const tick = 123; // current tick
updater(context, options, tick);
```

## Code Analysis

### Inputs

- `context` (Context): The current context.
- `options` (Options | any): The options for updating the context.
- `tick` (number): The current tick (optional, default value is the current timestamp).

___

### Flow

1. Initialize variables and extract options and updateOptions from the provided options.
2. Check if there are pending updates in the context. If not, return.
3. Process batched updates by creating an array of arrays to store batches and an array to store the current batch.
4. Process created entities by indexing and queuing messages to create each entity.
5. Process created actors by indexing and queuing messages to spawn each actor.
6. Process removed entities by indexing and queuing messages to remove each entity.
7. Process removed actors by indexing and queuing messages to remove each actor.
8. Process removed components by indexing and queuing messages to remove each component.
9. Process created components by indexing and queuing messages to create each component.
10. Process updated components by indexing and queuing messages to update each component.
11. Process created inputs by queuing messages to create each input.
12. Process symbols by queuing messages to add each symbol.
13. Process batched updates by sending the batched messages.
14. Return.

___

### Outputs

None. The function updates the context based on the provided options.
___
