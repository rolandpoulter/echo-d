---
title: Pending
description: A reference to echo.Pending.
---

## Summary

The `Pending` class represents a pending state with removed, updated, and created states. It allows for adding and removing actors, entities, and components, as well as updating and creating components. It also provides methods for managing symbol tuples.

## Example Usage

```javascript
// Create a new instance of the Pending class
const pending = new Pending();

// Add an actor input to the created inputs state
pending.actorInput("actor1", 0, 10);

// Change a component in the created state
pending.changeComponent("created", "entity1", "component1");

// Mark an entity as created
pending.createEntity("entity2");

// Mark an actor as removed
pending.removeActor("actor2");

// Mark a component as removed
pending.removeComponent("entity3", "component2");

// Mark an entity as removed
pending.removeEntity("entity4");

// Reset the state of the Pending object
pending.reset();

// Mark an actor as spawned
pending.spawnActor("actor3");

// Insert or update a component in the created state
pending.upsertComponent("created", "entity5", "component3");

// Add a symbol tuple to the symbols array
pending.addSymbol([symbol1, symbol2]);

// Replace the symbols array with a new array of symbol tuples
pending.replaceSymbols(2, [symbol3, symbol4]);
```

## Code Analysis

### Main functionalities

The main functionalities of the `Pending` class are:

- Managing the state of removed, updated, and created entities, components, and actors.
- Adding and removing actor inputs.
- Changing and upserting components.
- Marking entities, actors, and components as removed, created, or spawned.
- Resetting the state of the `Pending` object.
- Managing symbol tuples.

___

### Methods

- `constructor()`: Constructs a new `Pending` object and resets its state.
- `actorInput(id: string, newindex: number, tick: number = 0)`: Adds an actor input to the created inputs state.
- `changeComponent(pendingType: string, id: string, key: string)`: Changes a component in the specified pending state.
- `createEntity(id: string)`: Marks an entity as created in the created state.
- `removeActor(id: string)`: Marks an actor as removed in the removed state.
- `removeComponent(id: string, key: string)`: Marks a component as removed in the removed state.
- `removeEntity(id: string)`: Marks an entity as removed in the removed state.
- `reset()`: Resets the state of the `Pending` object.
- `spawnActor(id: string)`: Marks an actor as spawned in the created state.
- `upsertComponent(pendingType: string, id: string, key: string)`: Inserts or updates a component in the specified pending state.
- `addSymbol(symbolTuple: any)`: Adds a symbol tuple to the symbols array.
- `replaceSymbols(offset: number, symbols: any[])`: Replaces the symbols array with a new array of symbol tuples.

___

### Fields

- `removed: RemovedState`: The removed state.
- `updated: UpdatedState`: The updated state.
- `created: CreatedState`: The created state.
- `symbols: (number | [InputPayload, number])[]`: The symbols array.

___
