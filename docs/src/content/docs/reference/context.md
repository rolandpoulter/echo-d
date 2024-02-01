---
title: Context
description: A reference to echo.Context.
---

The `Context` class is responsible for managing the context of an application. It provides methods for handling actors, entities, components, inputs, and symbols.

## Example Usage

```javascript
const context = new Context();
context.createEntity('entity1', options);
context.changeComponent('entity1', 'position', { x: 10, y: 20 }, options);
```

___

## Static Methods

- `ensure(context: Context | ContextProps, options: Options | any, _Storage = Storage): Context`: Ensures that the given context is an instance of the `Context` class.

___

## Methods

- `constructor(context: Context | ContextProps = {}, options: Options | any, _Storage = Storage)`: Creates a new instance of the `Context` class.
- `get actors(): any`: Gets the actors from the store.
- `getActors(query: any, pageSize: number): Emitter<string[][]> | string[][]`: Gets the actors from the store with the given query.
- `spawnActor(id: string, options: Options): Promise<boolean> | boolean`: Spawns an actor with the given id and options.
- `removeActor(id: string, options: Options): Promise<boolean> | boolean`: Removes an actor with the given id and options.
- `mergeActors(payload: any[], options: Options): Promise<any[]> | void`: Merges actors with the given payload and options.
- `get entities(): any`: Gets the entities from the store.
- `getEntities(query: any, pageSize: number): Emitter<string[][]> | string[][]`: Gets the entities from the store with the given query.
- `createEntity(id: string, options: Options): Promise<boolean> | boolean`: Creates an entity with the given id and options.
- `removeEntity(id: string, options: Options): Promise<boolean> | boolean`: Removes an entity with the given id and options.
- `mergeEntities(payload: string[], options: Options): Promise<any[]> | void`: Merges entities with the given payload and options.
- `get components(): any`: Gets the components from the store.
- `getComponents(query: any, pageSize: number): Emitter<Components[]> | Components[]`: Gets the components from the store with the given query.
- `changeComponent(id: string | string[] | Uint32Array, key: string, value: any | any[], tick: number = 0, options: Options): Promise<any> | any`: Changes a component with the given id, key, value, and options.
- `upsertComponent(id: string | string[] | Uint32Array, key: string, value: any | any[], tick: number = 0, options: Options): Promise<any> | any`: Upserts a component with the given id, key, value, and options.
- `removeComponent(id: string, key: string, options: Options): Promise<boolean> | boolean`: Removes a component with the given id, key, and options.
- `mergeComponents(payload: any, options: Options): Promise<any[]> | void`: Merges components with the given payload and options.
- `get inputs(): any`: Gets the inputs from the store.
- `getInputs(query: any, pageSize: number): Emitter<Inputs[]> | Inputs[]`: Gets the inputs from the store with the given query.
- `actorInput(id: string, input: InputPayload, tick: number = 0, options: Options): Promise<number> | number`: Handles actor input with the given id, payload, and options.
- `get symbolsList(): any`: Gets the list of symbols.
- `get symbolsEnum(): any`: Gets the enum of symbols.
- `setSymbols(symbols: any)`: Sets the symbols with the given symbols.
- `getSymbol(index: number, options: Options)`: Gets a symbol with the given index and options.
- `addSymbol(symbol: string, options: Options)`: Adds a symbol with the given symbol and options.
- `fetchSymbol(payload: string | number, options: Options, onMatch: Function)`: Fetches a symbol with the given payload, options, and match function.
- `mergeSymbol(payload: [string, number], options: Options)`: Merges a symbol with the given payload and options.
- `resetSymbols(offset: number = 0, symbols: any[], options: Options)`: Resets symbols with the given payload and options.
- `resetFrame(): void`: Resets the current frame state.

___

## Fields

- `events: any`: The events.
- `store: AsyncStorage | Storage`: The store.
- `order: Ordered | null`: The order.
- `changes: Changes | null`: The changes.
- `pending: Pending | null`: The pending.
- `symbols: Symbols | null`: The symbols.

___
