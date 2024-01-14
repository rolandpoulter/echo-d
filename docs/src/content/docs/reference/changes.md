---
title: Changes
description: A reference to echo.Changes.
---

## Summary

The `Changes` class is responsible for managing changes in a context. It provides methods for changing components, retrieving the changes of a value, resetting the changes, and updating or inserting components in the context.

## Example Usage

```javascript
const context = new Context();
const changes = new Changes(context);

// Change a component in the context
changes.changeComponent('id1', 'key1', 'new value');

// Retrieve the changes of a value
const diffs = changes.getValue('id1', 'key1');

// Reset the changes
changes.reset();

// Update or insert a component in the context
changes.upsertComponent('id2', 'key2', 'new value');
```

## Code Analysis

### Main functionalities

- Changing a component in the context
- Retrieving the changes of a value
- Resetting the changes to a new set of changes or an empty object
- Updating or inserting a component in the context

___

### Methods

- `constructor(context: Context, changes?: ChangesInput)`: Creates a new instance of the `Changes` class.
- `changeComponent(id: string, key: string, newValue: any): void`: Changes a component in the current context.
- `getValue(id: string, key: string): Record<string, any>`: Retrieves the changes of a value.
- `reset(changes?: ChangesInput): Changes`: Resets the changes to a new set of changes or an empty object.
- `upsertComponent(id: string, key: string, newValue: any): void`: Updates an existing component or inserts a new one in the current context.

___

### Fields

- `context: Context`: The context in which changes are managed.
- `diffs: Record<string, any>`: The diffs of the changes.

___
