---
title: Storage
description: A reference to echo.Storage.
---

The `Storage` class represents a store with actors, entities, components, and inputs. It provides methods to manipulate and retrieve data from the store.

## Example Usage

```js
const storage = new Storage();

// Add actors to the store
storage.storeActor('actor1');
storage.storeActor('actor2');

// Add entities to the store
storage.storeEntity('entity1');
storage.storeEntity('entity2');

// Add components to an entity
storage.storeComponent('entity1', 'component1', { prop1: 'value1' });
storage.storeComponent('entity1', 'component2', { prop2: 'value2' });

// Get all actors in the store
const actors = storage.getActors();
console.log(actors); // [['actor1'], ['actor2']]

// Get all components in the store
const components = storage.getComponents();
console.log(components); // [[{ component1: { prop1: 'value1' }, component2: { prop2: 'value2' } }]]

// Get all entities in the store
const entities = storage.getEntities();
console.log(entities); // [['entity1'], ['entity2']]
```

___

### Methods

- `destroyActor(id: string): boolean`: Removes an actor ID from the store.
- `destroyComponent(id: string, key: string): void`: Removes a component from an entity in the store.
- `destroyEntity(id: string): boolean`: Removes an entity ID from the store.
- `findComponents(id: string): Components`: Fetches the components container for an entity.
- `findComponent(id: string, key: string): any`: Fetches a component from an entity.
- `findInputs(id: string): InputPayload`: Fetches the inputs for an actor.
- `findInput(id: string, index: number): InputPayload`: Fetches an input for an actor.
- `getActors(): string[]`: Gets the actors in the store.
- `getComponents(): Components`: Gets the components in the store.
- `getEntities(): string[]`: Gets the entities in the store.
- `getInputs(): Inputs`: Gets the inputs in the store.
- `isActor(id: string): boolean`: Checks if an ID is an actor.
- `isEntity(id: string): boolean`: Checks if an ID is an entity.
- `listActors(query: any = null, pageSize: number = Infinity): string[][]`: Lists the actors in the store.
- `listComponents(query: any = null, pageSize: number = Infinity): Components[]`: Lists the components in the store.
- `listEntities(query: any = null, pageSize: number = Infinity): string[][]`: Lists the entities in the store.
- `listInputs(query: any = null, pageSize: number = Infinity): Inputs[]`: Lists the inputs in the store.
- `setActors(actors: string[]): string[]`: Sets the actors in the store.
- `setComponents(components: Components): Components`: Sets the components in the store.
- `setEntities(entities: string[]): string[]`: Sets the entities in the store.
- `setInputs(inputs: Inputs): Inputs`: Sets the inputs in the store.
- `storeActor(id: string): boolean`: Stores an actor ID in the store.
- `storeComponent(id: string, key: string, value: any): void`: Stores a component in an entity in the store.
- `storeEntity(id: string): boolean`: Stores an entity ID in the store.
- `storeId(list: string[], id: string): boolean`: Stores an ID in a list if it doesn't exist already.
- `storeInput(id: string, input: InputPayload, tick: number = 0): number`: Stores an input for an actor in the store.
- `queryComponents(query: any): Set<any>`: Queries the store for entities by component.
- `removeComponentsIndex(id: string, key: string, prevValue: any): void`: Removes a component from the components index.
- `updateComponentsIndex(id: string, key: string, prevValue: any, value: any): void`: Updates a component in the components index.

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

___
