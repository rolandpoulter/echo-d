---
title: AsyncStorage
description: A reference to echo.AsyncStorage.
---

The `AsyncStorage` class represents an asynchronous store with actors, entities, components, and inputs. It provides methods for manipulating and retrieving data from the store.

## Example Usage

```javascript
// Create a new AsyncStorage object
const storage = new AsyncStorage();

// Store an actor ID
await storage.storeActor('actor1');

// Fetch the actors
const actors = storage.getActors();

// Remove an actor ID
await storage.destroyActor('actor1');
```

___

### Methods

- `destroyActor(id: string): Promise<boolean>`: Removes an actor ID asynchronously.
- `destroyComponent(id: string, key: string): Promise<void>`: Removes a component asynchronously.
- `destroyEntity(id: string): Promise<boolean>`: Removes an entity ID asynchronously.
- `destroyId(list: string[], id: string): Promise<boolean>`: Removes an ID from a list if it exists asynchronously.
- `findComponents(id: string): Promise<Components>`: Fetches a components container for an entity.
- `findComponent(id: string, key: string): Promise<any>`: Fetches a component.
- `findInputs(id: string): Promise<InputPayload>`: Fetches an actor's inputs asynchronously.
- `findInput(id: string, index: number): Promise<InputPayload>`: Fetches an actor's input asynchronously.
- `getActors(query: any = null, pageSize: number = Infinity): Emitter<string[][]> | string[][]`: Gets the actors.
- `getComponents(query: any = null, pageSize: number = Infinity): Emitter<Components[]> | Components[]`: Gets the components.
- `getEntities(query: any = null, pageSize: number = Infinity): Emitter<string[][]> | string[][]`: Gets the entities.
- `getInputs(query: any = null, pageSize: number = Infinity): Emitter<Inputs[]> | Inputs[]`: Gets the inputs.
- `isActor(id: string): boolean`: Checks if an ID is an actor.
- `isEntity(id: string): boolean`: Checks if an ID is an entity.
- `setActors(actors: string[]): Promise<string[]>`: Sets the actors.
- `setComponents(components: Components): Promise<Components>`: Sets the components asynchronously.
- `setEntities(entities: string[]): Promise<string[]>`: Sets the entities asynchronously.
- `setInputs(inputs: Inputs): Promise<Inputs>`: Sets the inputs asynchronously.
- `storeActor(id: string): Promise<boolean>`: Stores an actor ID asynchronously.
- `storeComponent(id: string, key: string, value: any): Promise<void>`: Stores a component asynchronously.
- `storeEntity(id: string): Promise<boolean>`: Stores an entity ID asynchronously.
- `storeId(list: string[], id: string): Promise<boolean>`: Stores an ID in a list if it doesn't exist already asynchronously.
- `storeInput(id: string, input: InputPayload, tick: number = 0): Promise<number>`: Stores an input asynchronously.
- `queryComponents(query: any): Set<any>`: Queries the store for entities by component.
- `removeComponentsIndex(id: string, key: string, prevValue: any)`: Removes a component from the components index.
- `updateComponentsIndex(id: string, key: string, prevValue: any, value: any)`: Updates a component in the components index.

___

### Fields

- `actors: string[]`: The actors in the store.
- `entities: string[]`: The entities in the store.
- `components: Components`: The components in the store.
- `inputs: Inputs`: The inputs in the store.
- `types: { [key: string]: any }`: The types in the store.
- `typeCtors: { [key: string]: Function }`: The type constructors in the store.
- `componentsIndex: ComponentsIndex<string, string>`: The components index in the store.
- `indexes: { [key: string]: { actors: Index<any, any>, entities: Index<any, any> } }`: The indexes in the store.
- `world?: any`: The world in the store.

___
