---
title: Ordered
description: A reference to echo.Ordered.
---

## Summary

The `Ordered` class represents a collection of tick values and provides methods to change, reset, and insert/update tick values for components.

## Example Usage

```javascript
// Create a new Ordered object
const ordered = new Ordered();

// Change the tick value of a component
ordered.changeComponent("component1", "key1", 10);

// Reset the tick values
ordered.reset();

// Insert or update the tick value of a component
ordered.upsertComponent("component2", "key2", 20);
```

## Code Analysis

### Main functionalities

The main functionalities of the `Ordered` class are:

- Storing tick values for components in an ordered manner.
- Changing the tick value of a component.
- Resetting the tick values.
- Inserting or updating the tick value of a component.

___

### Methods

- `constructor(order: OrderedData = {})`: Constructs a new `Ordered` object with an optional initial order of tick values.
- `changeComponent(id: string, key: string, tick: number): boolean`: Changes the tick value of a component identified by its ID and key. Returns `true` if the operation was successful, `false` otherwise.
- `reset(order: OrderedData = {})`: Resets the tick values to a new order. Returns the `Ordered` object.
- `upsertComponent(id: string, key: string, tick: number): boolean`: Inserts or updates the tick value of a component identified by its ID and key. Returns `true` if the operation was successful, `false` otherwise.

___

### Fields

- `order: OrderedData`: The collection of tick values stored in an ordered manner.

___
