import { createEnum } from './utils.js';
/**
 * The Symbols class represents a collection of symbols.
 */
export class Symbols {
    _list;
    _enum;
    /**
     * Constructs a new Symbols object.
     *
     * @param {object} object - An object containing an optional list of symbols.
     */
    constructor(object = {}) {
        const { _list: symbols = [] } = object;
        this._list = symbols;
        this._enum = createEnum(symbols);
    }
    /**
     * Adds a symbol to the Symbols object.
     *
     * @param {string} symbol - The symbol to be added.
     * @returns {number | null} The index of the added symbol, or null if the symbol is not valid.
     */
    add(symbol) {
        if (symbol) {
            if (Object.prototype.hasOwnProperty.call(this._enum, symbol)) {
                return this._enum[symbol];
            }
            else {
                const end = this._list.length;
                this._list[end] = symbol;
                this._enum[symbol] = end;
                return end;
            }
        }
        return null;
    }
    /**
     * Copies an enum into the Symbols object.
     *
     * @param {Enum} enumObj - The enum to be copied.
     */
    copyEnum(enumObj = {}) {
        for (const symbolTuple of Object.entries(enumObj)) {
            this.merge(symbolTuple);
        }
    }
    /**
     * Fetches a symbol and its index based on a payload.
     *
     * @param {number | string} payload - The payload, which can be either a symbol or an index.
     * @returns {[string, number]} A tuple containing the symbol and its index.
     */
    fetch(payload) {
        let index;
        let symbol;
        switch (typeof payload) {
            case 'number':
                index = payload;
                symbol = this._list[index] || '';
                break;
            case 'string':
                symbol = payload;
                index = Object.prototype.hasOwnProperty.call(this._enum, symbol) ? this._enum[symbol] : -1;
                break;
        }
        return [symbol, index];
    }
    /**
     * Finds the index of a symbol.
     *
     * @param {string} symbol - The symbol to be found.
     * @returns {number | undefined} The index of the symbol, or undefined if the symbol is not found.
     */
    find(symbol) {
        return this._enum[symbol];
    }
    /**
     * Gets the symbol at a specific index.
     *
     * @param {number} index - The index of the symbol.
     * @returns {string | undefined} The symbol at the specified index, or undefined if there is no symbol at that index.
     */
    get(index) {
        return this._list[index];
    }
    /**
     * Returns the list of symbols.
     *
     * @returns {string[]} The list of symbols.
     */
    getSymbols() {
        return this._list;
    }
    /**
     * Returns the enum of symbols.
     *
     * @returns {Enum} The enum of symbols.
     */
    getSymbolsEnum() {
        return this._enum;
    }
    /**
     * Merges a symbol tuple into the Symbols object.
     *
     * @param {[string, number]} symbolTuple - The symbol tuple to be merged.
     */
    merge(symbolTuple) {
        const [symbol, index] = symbolTuple;
        this._list[index] = symbol;
        this._enum[symbol] = index;
    }
    /**
     * Resets the Symbols object with a new array of symbols.
     *
     * @param {string[]} symbolsArray - The new array of symbols.
     */
    reset(offset, symbolsArray = []) {
        if (offset > 0) {
            const { length } = symbolsArray;
            const { _list } = this;
            const { _enum } = this;
            for (let i = 0; i < length; i++) {
                const symbol = symbolsArray[i];
                const index = i + offset;
                _list[index] = symbol;
                _enum[symbol] = index;
            }
        }
        else {
            this._list = symbolsArray;
            this._enum = createEnum(symbolsArray);
        }
    }
}
export default Symbols;
/**
 * Extracts a symbol from a given index.
 *
 * @param {number | string} index - The index or symbol to be extracted.
 * @param {any} context - The context in which the symbol is to be extracted.
 * @param {any} options - The options for extracting the symbol.
 * @returns {string | number} The extracted symbol.
 */
export function extractSymbol(index, context, options) {
    if (typeof index === 'number') {
        const { actions } = options;
        const { getSymbol } = actions;
        const symbol = getSymbol(index, context, options);
        if (!symbol) {
            return '';
        }
        index = symbol;
    }
    return index;
}
/**
 * Ensures that a symbol is indexed.
 *
 * @param {number | string} symbol - The symbol to be indexed.
 * @param {any} context - The context in which the symbol is to be indexed.
 * @param {any} options - The options for indexing the symbol.
 * @returns {number | string} The indexed symbol.
 */
export function ensureSymbolIndex(symbol, context, options) {
    if (typeof symbol === 'string') {
        const { actions } = options;
        const { addSymbol } = actions;
        const index = addSymbol(symbol, context, options);
        if (typeof index === 'number') {
            return index;
        }
    }
    return symbol;
}
/**
 * Recursively extracts symbols from a given value.
 *
 * @param {string} key - The key associated with the value.
 * @param {any} value - The value from which symbols are to be extracted.
 * @param {any} context - The context in which the symbols are to be extracted.
 * @param {any} options - The options for extracting symbols.
 * @returns {any} The value with extracted symbols.
 */
export function recursiveSymbolExtraction(key, value, context, options) {
    if (key.charAt(0) === '$') {
        const { actions } = options;
        const { getSymbol } = actions;
        const recursiveFix = (value) => {
            if (Array.isArray(value)) {
                value = value.map(recursiveFix);
            }
            else {
                switch (typeof value) {
                    case 'number': {
                        const symbol = getSymbol(value, context, options);
                        if (symbol) {
                            value = symbol;
                        }
                        break;
                    }
                    case 'object':
                        for (const key of Object.keys(value)) {
                            value[key] = recursiveFix(value[key]);
                        }
                        break;
                }
                return value;
            }
        };
        return recursiveFix(value);
    }
    return value;
}
/**
 * Recursively ensures that symbols in a given value are indexed.
 *
 * @param {string} key - The key associated with the value.
 * @param {any} value - The value in which symbols are to be indexed.
 * @param {any} context - The context in which the symbols are to be indexed.
 * @param {any} options - The options for indexing symbols.
 * @returns {any} The value with indexed symbols.
 */
export function recursiveSymbolIndexesEnsured(key, value, context, options) {
    if (key.charAt(0) === '$') {
        const { actions } = options;
        const { addSymbol } = actions;
        const recursiveFix = (value) => {
            if (Array.isArray(value)) {
                value = value.map(recursiveFix);
            }
            else {
                switch (typeof value) {
                    case 'string': {
                        const symbol = addSymbol(value, context, options);
                        if (typeof symbol === 'number') {
                            value = symbol;
                        }
                        break;
                    }
                    case 'object':
                        for (const key of Object.keys(value)) {
                            value[key] = recursiveFix(value[key]);
                        }
                        break;
                }
                return value;
            }
        };
        return recursiveFix(value);
    }
    return value;
}
