---
title: Storage
description: A reference to echo.Storage.
---

## Summary

The `Storage` class represents a store with actors, entities, components, and inputs. It provides methods for managing and querying these elements.

## Example Usage

```javascript
// Create a new storage
const storage = new Storage();

// Add actors to the storage
storage.setActors(['actor1', 'actor2', 'actor3']);

// Add entities to the storage
storage.setEntities(['entity1', 'entity2', 'entity3']);

// Add components to the storage
storage.setComponents({
  'entity1': { 'component1': 'value1', 'component2': 'value2' },
  'entity2': { 'component1': 'value3', 'component2': 'value4' },
  'entity3': { 'component1': 'value5', 'component2': 'value6' },
});

// Add inputs to the storage
storage.storeInput('input1', { id: 'entity1', component: 'component1' });
storage.storeInput('input2', { id: 'entity2', component: 'component2' });

// Get actors from the storage
const actors = storage.getActors();

// Get entities from the storage
const entities = storage.getEntities();

// Get components from the storage
const components = storage.getComponents();

// Get inputs from the storage
const inputs = storage.getInputs();

// Remove an actor from the storage
storage.destroyActor('actor1');

// Remove an entity from the storage
storage.destroyEntity('entity1');

// Remove a component from the storage
storage.destroyComponent('entity2', 'component1');
```

## Code Analysis

### Main functionalities

- Store and retrieve actors, entities, components, and inputs
- Query actors and entities based on specific criteria
- Add, update, and remove components from entities

___

### Methods

- `constructor(store: Storage | StorageProps = {}, indexes: any = {})`: Constructs a new Storage object with optional initial data and indexes.
- `destroyActor(id: string): boolean`: Removes an actor ID from the storage.
- `destroyComponent(id: string, key: string): void`: Removes a component from an entity.
- `destroyEntity(id: string): boolean`: Removes an entity ID from the storage.
- `destroyId(list: string[], id: string): boolean`: Removes an ID from a list if it exists.
- `fetchComponent(id: string, key: string): any`: Fetches a component from an entity.
- `getActors(query: any = null, pageSize: number = Infinity): string[][]`: Gets the actors from the storage based on a query and page size.
- `getComponents(query: any = null, pageSize: number = Infinity): Components[]`: Gets the components from the storage based on a query and page size.
- `getEntities(query: any = null, pageSize: number = Infinity): string[][]`: Gets the entities from the storage based on a query and page size.
- `getInputs(query: any = null, pageSize: number = Infinity): Inputs[]`: Gets the inputs from the storage based on a query and page size.
- `isActor(id: string): boolean`: Checks if an ID is an actor.
- `isEntity(id: string): boolean`: Checks if an ID is an entity.
- `setActors(actors: string[]): string[]`: Sets the actors in the storage.
- `setComponents(components: Components): Components`: Sets the components in the storage.
- `setEntities(entities: string[]): string[]`: Sets the entities in the storage.
- `setInputs(inputs: Inputs): Inputs`: Sets the inputs in the storage.
- `storeActor(id: string): boolean`: Stores an actor ID in the storage.
- `storeComponent(id: string, key: string, value: any): void`: Stores a component in an entity.
- `storeEntity(id: string): boolean`: Stores an entity ID in the storage.
- `storeId(list: string[], id: string): boolean`: Stores an ID in a list if it doesn't exist already.
- `storeInput(id: string, input: InputPayload, tick: number = 0): number`: Stores an input in the storage.

___

### Fields

- `actors: string[]`: The actors in the storage.
- `entities: string[]`: The entities in the storage.
- `components: Components`: The components in the storage.
- `inputs: Inputs`: The inputs in the storage.
- `indexes: { [key: string]: { actors: Index<any, any>, entities: Index<any, any> } }`: Indexes for efficient querying of actors and entities.

___
