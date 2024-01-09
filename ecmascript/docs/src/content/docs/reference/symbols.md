---
title: Symbols
description: A reference to echo.Symbols.
---

## Summary

The `Symbols` class represents a collection of symbols and provides methods to manipulate and access these symbols.

## Example Usage

```javascript
// Create a new Symbols object
const symbols = new Symbols();

// Add symbols to the Symbols object
symbols.add('A'); // Returns 0
symbols.add('B'); // Returns 1

// Get the symbol at a specific index
symbols.get(0); // Returns 'A'

// Find the index of a symbol
symbols.find('B'); // Returns 1

// Get the list of symbols
symbols.getSymbols(); // Returns ['A', 'B']

// Get the enum of symbols
symbols.getSymbolsEnum(); // Returns { 'A': 0, 'B': 1 }

// Reset the Symbols object with a new array of symbols
symbols.reset(2, ['C', 'D']); // Resets the Symbols object with symbols ['C', 'D']
```

## Code Analysis

### Main functionalities

The main functionalities of the `Symbols` class are:

- Adding symbols to the collection
- Finding the index of a symbol
- Getting the symbol at a specific index
- Getting the list of symbols
- Getting the enum of symbols
- Resetting the collection with a new array of symbols

___

### Methods

- `constructor(object: { _list?: string[] } = {})`: Constructs a new Symbols object with an optional list of symbols.
- `add(symbol: string): number | null`: Adds a symbol to the Symbols object and returns its index, or null if the symbol is not valid.
- `copyEnum(enumObj: Enum | Object = {}): void`: Copies an enum into the Symbols object.
- `fetch(payload: number | string): [string, number]`: Fetches a symbol and its index based on a payload.
- `find(symbol: string): number | undefined`: Finds the index of a symbol.
- `get(index: number): string | undefined`: Gets the symbol at a specific index.
- `getSymbols(): string[]`: Returns the list of symbols.
- `getSymbolsEnum(): Enum`: Returns the enum of symbols.
- `merge(symbolTuple: [string, number]): void`: Merges a symbol tuple into the Symbols object.
- `reset(offset: number, symbolsArray: string[] = []): void`: Resets the Symbols object with a new array of symbols.

___

### Fields

- `_list: string[]`: The list of symbols.
- `_enum: Enum`: The enum of symbols.

___
