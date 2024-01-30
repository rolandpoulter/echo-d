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
symbols.add('symbol1'); // Returns the index of the added symbol
symbols.add('symbol2'); // Returns the index of the added symbol

// Get the list of symbols
const symbolList = symbols.getSymbols(); // Returns ['symbol1', 'symbol2']

// Get the enum of symbols
const symbolEnum = symbols.getSymbolsEnum(); // Returns { 'symbol1': 0, 'symbol2': 1 }

// Find the index of a symbol
const symbolIndex = symbols.find('symbol1'); // Returns 0

// Get the symbol at a specific index
const symbol = symbols.get(1); // Returns 'symbol2'

// Reset the Symbols object with a new array of symbols
symbols.reset(2, ['symbol3', 'symbol4']); // Resets the Symbols object with ['symbol3', 'symbol4']
```

___

### Methods

- `constructor(object: { _list?: string[] } = {})`: Constructs a new Symbols object with an optional list of symbols.
- `add(symbol: string): number | null`: Adds a symbol to the Symbols object and returns the index of the added symbol, or null if the symbol is not valid.
- `copyEnum(enumObj: Enum | Object = {}): void`: Copies an enum into the Symbols object.
- `fetch(payload: number | string): [string, number]`: Fetches a symbol and its index based on a payload, which can be either a symbol or an index.
- `find(symbol: string): number | undefined`: Finds the index of a symbol.
- `get(index: number): string | undefined`: Gets the symbol at a specific index.
- `getSymbols(): string[]`: Returns the list of symbols.
- `getSymbolsEnum(): Enum`: Returns the enum of symbols.
- `merge(symbolTuple: [string, number]): void`: Merges a symbol tuple into the Symbols object.
- `reset(offset: number, symbolsArray: string[] = []): void`: Resets the Symbols object with a new array of symbols.

___

### Fields

- `_list: string[]`: An array that stores the symbols.
- `_enum: Enum`: An object that represents the enum of symbols.

___
