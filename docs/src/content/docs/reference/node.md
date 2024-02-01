---
title: Node
description: A reference to echo.Node.
---

The `NodeActions` class is a collection of actions that can be performed on different entities in a context. It combines actions from different modules and provides a convenient way to access and manipulate actors, components, entities, and symbols in the current context.

## Example Usage

```javascript
import { NodeActions } from './NodeActions'

// Create an instance of NodeActions
const nodeActions = new NodeActions()

const action = 'actorInput'

const handler = nodeActions[actorInput]

if (handler) {
    handler(payload, context, options)
}
```

___

### Methods

- `actorInput`: Handles input for a specific actor in the current context.
- `actors`: Retrieves actors from the current context.
- `mergeActors`: Merges actors into the current context.
- `removeActor`: Removes an actor from the current context.
- `spawnActor`: Spawns a new actor in the current context.
- `changeComponent`: Changes a component in the current context.
- `components`: Retrieves components from the current context.
- `mergeComponents`: Merges components into the current context.
- `removeComponent`: Removes a component from the current context.
- `upsertComponent`: Updates an existing component or inserts a new one if it doesn't exist in the current context.
- `batch`: Processes a batch of payloads in the current context.
- `createEntity`: Creates a new entity in the current context.
- `entities`: Retrieves entities from the current context.
- `mergeEntities`: Merges entities into the current context.
- `removeEntity`: Removes an entity from the current context.
- `addSymbol`: Adds a symbol to the current context.
- `fetchSymbol`: Fetches a symbol from the current context.
- `getSymbol`: Retrieves a symbol from the current context by its index.
- `mergeSymbol`: Merges a symbol into the current context.
- `mergeSymbols`: Merges multiple symbols into the current context.
- `symbol`: Retrieves a symbol from the current context.
- `symbols`: Retrieves all symbols from the current context.

___

### Fields

The `NodeActions` class does not have any fields.
___
