---
title: Changes
description: A reference to echo.Changes.
---

## Summary

The `Changes` class is responsible for managing changes in a context. It provides methods for changing components, retrieving values, resetting changes, and updating or inserting components.

## Example Usage

```javascript
const context = new Context();
const changes = new Changes(context);

// Change a component
changes.changeComponent('componentId', 'propertyKey', 'newValue', 'prevValue');

// Retrieve the changes of a value
const diffs = changes.getValue('componentId', 'propertyKey', 'storedValue');

// Reset the changes
changes.reset();

// Update or insert a component
changes.upsertComponent('componentId', 'propertyKey', 'newValue', '_prevValue');
```

___

## Methods

- `changeComponent(id, key, newValue, prevValue, isAsyncStorage)`: Changes a component in the current context. Returns a promise that resolves to the new value.
- `getValue(id, key, storedValue)`: Retrieves the changes of a value. Returns the diffs.
- `reset(changes)`: Resets the changes to a new set of changes or an empty object if no changes are provided. Returns the instance of the Changes class.
- `upsertComponent(id, key, newValue, _prevValue, isAsyncStorage)`: Updates an existing component or inserts a new one if it doesn't exist in the current context. Returns a promise that resolves to the new value.

___

## Fields

- `context`: The context in which changes are to be managed.
- `diffs`: The diffs of the changes.

___
