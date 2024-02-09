---
title: Handler
description: A reference to echo.Handler.
---

The `Handler` class is responsible for handling messages and performing various actions on the context. It provides methods for handling single and multiple messages, getting the action handler, updating other nodes in the network, spawning and removing actors, updating actors with input, creating and removing entities, and manipulating components of entities.

## Example Usage

```js
// Create a new handler instance
const handler = new Handler(context, options, actions);

// Handle a single message
handler.one(message, extendOptions);

// Handle multiple messages
handler.many(messages, extendOptions);

// Get the action handler
const [handler, symbol] = handler.getActionHandler(action, options);

// Get the symbol action
const symbolAction = handler.getSymbolAction(action);

// Update other nodes in the network
handler.updater(extendOptions, tick);

// Spawn an actor
handler.spawnActor(id, extendOptions);

// Despawn an actor
handler.removeActor(id, extendOptions);

// Update an actor with input
handler.actorInput(id, input, tick, extendOptions);

// Create an entity
handler.createEntity(id, extendOptions);

// Remove an entity
handler.removeEntity(id, extendOptions);

// Set a component to an entity
handler.upsertComponent(id, key, value, tick, extendOptions);

// Change a component of an entity
handler.changeComponent(id, key, value, tick, extendOptions);

// Remove a component from an entity
handler.removeComponent(id, key, extendOptions);

// Query components
const components = handler.queryComponents(query);
```

___

## Methods

- `one(message: Message | any[], extendOptions: Options | any)`: Handles a single message.
- `many(message: Message | any[], extendOptions: Options | any)`: Handles multiple messages.
- `getActionHandler(action: string | number): [Function, string]`: Gets the action handler.
- `getSymbolAction(action: string | number): any`: Gets the symbol action.
- `updater(extendOptions: OptionsProps | any, tick: number = now()): Promise<any[]>`: Updates other nodes in the network.
- `spawnActor(id: string, extendOptions: OptionsProps | any): Promise<boolean> | boolean`: Spawns an actor.
- `removeActor(id: string, extendOptions: OptionsProps | any): Promise<boolean> | boolean`: Despawns an actor.
- `actorInput(id: string, input: any, tick: number = now(), extendOptions: OptionsProps | any): Promise<number> | number`: Updates an actor with an input.
- `createEntity(id: string, extendOptions: OptionsProps | any): Promise<boolean> | boolean`: Creates an entity.
- `removeEntity(id: string, extendOptions: OptionsProps | any): Promise<boolean> | boolean`: Removes an entity.
- `upsertComponent(id: string, key: string, value: any, tick: number = now(), extendOptions: OptionsProps | any): Promise<any> | void`: Sets a component to an entity.
- `changeComponent(id: string, key: string, value: any, tick: number = now(), extendOptions: OptionsProps | any): Promise<any> | void`: Changes a component of an entity.
- `removeComponent(id: string, key: any, extendOptions: OptionsProps | any): Promise<boolean> | boolean`: Removes a component from an entity.
- `queryComponents(query: any): Set<any>`: Queries components.

___

## Fields

- `context: Context`: The context for the handler.
- `options: Options`: The options for the handler.
- `store: AsyncStorage | Storage`: The store for the context of the handler.

___
