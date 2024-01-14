---
title: Context
description: A reference to echo.Context.
---

## Summary

The `Context` class is responsible for managing the context of an application. It provides methods for handling actors, entities, components, inputs, and symbols.

## Example Usage

```javascript
const context = new Context();
context.spawnActor('actor1', options);
context.createEntity('entity1', options);
context.changeComponent('entity1', 'position', { x: 10, y: 20 }, options);
context.actorInput('actor1', { type: 'move', direction: 'up' }, 0, options);
```

## Code Analysis

### Main functionalities

- Manages the context of an application.
- Handles actors, entities, components, inputs, and symbols.
- Provides methods for creating, updating, and removing actors, entities, components, and inputs.
- Supports symbols for efficient storage and retrieval of data.

___

### Static Methods

- `ensure(context: Context | ContextProps, options: Options | any, _Storage = Storage): Context`: Ensures that the given context is a `Context` instance.

___

### Methods

context is an instance of the Context class.

- `constructor(context: Context | ContextProps = {}, options: Options | any, _Storage = Storage)`: Creates a new instance of the Context class.
- `getActors(query: any, pageSize: number): Emitter<string[][]> | string[][]`: Gets the actors from the store.
- `spawnActor(id: string, options: Options)`: Spawns an actor with the given id and options.
- `removeActor(id: string, options: Options)`: Removes an actor with the given id and options.
- `mergeActors(payload: any[], options: Options)`: Merges actors with the given payload and options.
- `getEntities(query: any, pageSize: number): Emitter<string[][]> | string[][]`: Gets the entities from the store.
- `createEntity(id: string, options: Options)`: Creates an entity with the given id and options.
- `removeEntity(id: string, options: Options)`: Removes an entity with the given id and options.
- `mergeEntities(payload: string[], options: Options)`: Merges entities with the given payload and options.
- `getComponents(query: any, pageSize: number): Emitter<Components[]> | Components[]`: Gets the components from the store.
- `changeComponent(id: string, key: string, value: any, tick: number = 0, options: Options)`: Changes a component with the given id, key, value, and options.
- `upsertComponent(id: string, key: string, value: any, tick: number = 0, options: Options)`: Upserts a component with the given id, key, value, and options.
- `removeComponent(id: string, key: string, options: Options)`: Removes a component with the given id, key, and options.
- `mergeComponents(payload: any, options: Options)`: Merges components with the given payload and options.
- `getInputs(query: any, pageSize: number): Emitter<Inputs[]> | Inputs[]`: Gets the inputs from the store.
- `actorInput(id: string, input: InputPayload, tick: number = 0, options: Options)`: Handles actor input with the given id, payload, and options.
- `getSymbol(index: number, options: Options)`: Gets a symbol with the given index and options.
- `addSymbol(symbol: string, options: Options)`: Adds a symbol with the given symbol and options.
- `fetchSymbol(payload: string | number, options: Options, onMatch: Function)`: Fetches a symbol with the given payload, options, and match function.
- `mergeSymbol(payload: [string, number], options: Options)`: Merges a symbol with the given payload and options.
- `resetSymbols(offset: number = 0, symbols: any[], options: Options)`: Resets symbols with the given payload and options.
- `resetFrame()`: Resets the current frame state.

___

### Fields

- `events: any`: The events.
- `store: Storage`: The store.
- `order: Ordered | null`: The order.
- `changes: Changes | null`: The changes.
- `pending: Pending | null`: The pending.
- `symbols: Symbols | null`: The symbols.

___
