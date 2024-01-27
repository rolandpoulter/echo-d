---
title: Handler
description: A reference to echo.Handler.
---

## Summary

The `Handler` class is responsible for handling messages and performing various actions on the context based on those messages.

## Example Usage

```javascript
// Creating a new instance of Handler
const handler = new Handler(context, options, actions);

// Handling a single message
handler.one(message, extendOptions);

// Handling multiple messages
handler.many(messages, extendOptions);

// Getting the action handler
const actionHandler = handler.getActionHandler();

// Getting the symbol action
const symbolAction = handler.getSymbolAction(action);

// Updating other nodes in the network
handler.updater(extendOptions, tick);

// Spawning an actor
handler.spawnActor(id, extendOptions);

// Despawning an actor
handler.removeActor(id, extendOptions);

// Updating an actor with an input
handler.actorInput(id, input, tick, extendOptions);

// Creating an entity
handler.createEntity(id, extendOptions);

// Removing an entity
handler.removeEntity(id, extendOptions);

// Setting a component to an entity
handler.upsertComponent(id, key, value, tick, extendOptions);

// Changing a component of an entity
handler.changeComponent(id, key, value, tick, extendOptions);

// Removing a component from an entity
handler.removeComponent(id, key, extendOptions);

// Querying components
const queriedComponents = handler.queryComponents(query);
```

## Code Analysis

### Main functionalities

- Handles messages and performs actions on the context based on those messages.
- Provides methods for handling single and multiple messages.
- Retrieves the action handler and symbol action.
- Updates other nodes in the network.
- Performs various actions on actors and entities.
- Queries components.

___

### Methods

- `one(message: Message | any[], extendOptions: Options | any)`: Handles a single message.
- `many(message: Message | any[], extendOptions: Options | any)`: Handles multiple messages.
- `getActionHandler(): ActionHandler`: Retrieves the action handler.
- `getSymbolAction(action: string | number): SymbolAction`: Retrieves the symbol action.
- `updater(extendOptions: OptionsProps | any, tick: number = Date.now()): Promise<void>`: Updates other nodes in the network.
- `spawnActor(id: string, extendOptions: OptionsProps | any)`: Spawns an actor.
- `removeActor(id: string, extendOptions: OptionsProps | any)`: Despawns an actor.
- `actorInput(id: string, input: any, tick: number = Date.now(), extendOptions: OptionsProps | any)`: Updates an actor with an input.
- `createEntity(id: string, extendOptions: OptionsProps | any)`: Creates an entity.
- `removeEntity(id: string, extendOptions: OptionsProps | any)`: Removes an entity.
- `upsertComponent(id: string, key: string, value: any, tick: number = Date.now(), extendOptions: OptionsProps | any)`: Sets a component to an entity.
- `changeComponent(id: string, key: string, value: any, tick: number = Date.now(), extendOptions: OptionsProps | any)`: Changes a component of an entity.
- `removeComponent(id: string, key: any, extendOptions: OptionsProps | any)`: Removes a component from an entity.
- `queryComponents(query: any): Set<any>`: Queries components.

___

### Fields

- `context: Context`: The context for the handler.
- `options: Options`: The options for the handler.

___
