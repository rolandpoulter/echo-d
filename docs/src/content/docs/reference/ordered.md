---
title: Ordered
description: A reference to echo.Ordered.
---

The `Ordered` class represents a collection of tick values and provides methods to change, reset, and insert/update tick values for components.

## Example Usage

```javascript
// Create a new Ordered object
const ordered = new Ordered();

// Change the tick value of a component
ordered.changeComponent('component1', 'key1', 10);

// Reset the tick values
ordered.reset();

// Insert or update the tick value of a component
ordered.upsertComponent('component2', 'key2', 20);
```

___

### Methods

- `changeComponent(id: string, key: string, tick: number): boolean`: Changes the tick value of a component identified by its ID and key. Returns a boolean indicating whether the operation was successful.
- `reset(order: OrderedData = {}): void`: Resets the tick values to the provided order or an empty object.
- `upsertComponent(id: string, key: string, tick: number): boolean`: Inserts or updates the tick value of a component identified by its ID and key. Returns a boolean indicating whether the operation was successful.

___

### Fields

- `order: OrderedData`: The collection of tick values for components.

___
