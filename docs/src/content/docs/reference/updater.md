---
title: Updater
description: A reference to echo.updater.
---

The `updater` function updates the context based on the provided options. It processes various updates such as creating entities, spawning actors, removing entities and components, and updating components and inputs. It supports batching of updates and can handle different options such as compressing strings as integers, enabling rollback, and diffing changes.

## Example Usage

```js
const context = new Context();
const options = new Options();
const tick = 0;
const updates = await updater(context, options, tick);
console.log(updates);
```

The code above creates a new context and options, and then calls the `updater` function to update the context based on the options. The current tick is set to 0. The function returns a promise that resolves to an array of arrays, where each sub-array represents a batch of updates. The updates are logged to the console.

### Inputs

- `context` (Context): The current context.
- `options` (Options | any): The options for updating the context.
- `tick` (number, optional): The current tick. Defaults to the current time.

___

### Flow

1. The function checks if the `options` parameter is an instance of the `Options` class. If not, it creates a new `Options` instance.
2. The function extracts various options and properties from the `options` object.
3. The function extracts the `created`, `removed`, `symbols`, and `updated` properties from the `context.pending` object.
4. The function extracts the `store` property from the `context` object.
5. The function checks if the `mask` object or its `entities` property is not present. If so, it processes the creation of entities.
6. The function checks if the `mask` object or its `actors` property is not present. If so, it processes the spawning of actors.
7. The function checks if the `mask` object or its `entities` property is not present. If so, it processes the removal of entities.
8. The function checks if the `mask` object or its `actors` property is not present. If so, it processes the removal of actors.
9. The function checks if the `mask` object or its `components` property is not present. If so, it processes the removal of components.
10. The function checks if the `mask` object or its `components` property is not present. If so, it processes the creation of components.
11. The function checks if the `mask` object or its `components` property is not present. If so, it processes the update of components.
12. The function checks if the `mask` object or its `inputs` property is not present. If so, it processes the creation of inputs.
13. The function checks if the `mask` object or its `symbols` property is not present. If so, it processes the addition of symbols.
14. The function checks if batching is enabled and there are batches to process. If so, it sends the batches of updates to the responder.
15. The function returns the batch array.

___

### Closures

1. The function initializes an empty `batch` array to store batches of updates.
2. The function initializes an empty `batchBlock` array to store the current batch of updates.
3. The function defines a helper function `mergeBatch` to merge the current batch block into the batch array.
4. The function defines a helper function `queueMessage` to queue a message for later processing.
5. The function defines a helper function `ensureSymbol` to ensure that a symbol is indexed if the `compressStringsAsInts` option is enabled.
6. The function defines a helper function `upsertComponents` to handle the creation and update of components.

___

### Outputs

- A promise that resolves to an array of arrays, where each sub-array represents a batch of updates.

___
