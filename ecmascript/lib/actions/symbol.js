import { Options } from '../options.js';
import { paginate } from '../utils.js';
/**
 * Creates a new instance of the SymbolActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the SymbolActions class.
 * @returns {any} - A new class that extends the provided Parent class and the SymbolActions class.
 */
export const SymbolActionsFactory = (Parent = Object) => class SymbolActions extends Parent {
    /**
     * Adds a symbol to the current context.
     *
     * @param {any} symbol - The symbol to be added.
     * @param {Context} context - The current context to which the symbol is to be added.
     * @param {Options | any} options - The options for adding the symbol. If an instance of Options is not provided, a new one will be created.
     */
    addSymbol(symbol, context, options) {
        options = options = Options.ensure(options, this);
        return context.addSymbol(symbol, options);
    }
    /**
     * Fetches a symbol for the current context.
     *
     * @param {string | number} payload - The payload containing the symbol to be fetched.
     * @param {Context} context - The current context from which the symbol is to be fetched.
     * @param {Options | any} options - The options for fetching the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fetchSymbol(payload, context, options) {
        options = options = Options.ensure(options, this);
        const { responder, enumDefaultSymbols } = options;
        return context.fetchSymbol(payload, options, (symbolTuple) => {
            responder([enumDefaultSymbols.mergeSymbol, symbolTuple]);
        });
    }
    /**
     * Retrieves a symbol from the current context by its index.
     *
     * @param {number} index - The index of the symbol to be retrieved.
     * @param {Context} context - The current context from which the symbol is to be retrieved.
     * @param {Options | any} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    getSymbol(index, context, options) {
        options = options = Options.ensure(options, this);
        return context.getSymbol(index, options);
    }
    /**
     * Merges a symbol into the current context.
     *
     * @param {[string, number]} payload - The payload containing the symbol to be merged.
     * @param {Context} context - The current context into which the symbol is to be merged.
     * @param {Options | any} options - The options for merging the symbol. If an instance of Options is not provided, a new one will be created.
     */
    mergeSymbol(payload, context, options) {
        options = options = Options.ensure(options, this);
        context.mergeSymbol(payload, options);
    }
    /**
     * Merges multiple symbols into the current context.
     *
     * @param {any[]} payload - The payload containing the symbols to be merged.
     * @param {Context} context - The current context into which the symbols are to be merged.
     * @param {Options | any} options - The options for merging the symbols. If an instance of Options is not provided, a new one will be created.
     */
    mergeSymbols(payload, context, options) {
        options = options = Options.ensure(options, this);
        const [offset, symbols] = payload;
        if (payload && payload.length) {
            context.resetSymbols(offset, symbols, options);
        }
    }
    /**
     * Retrieves a symbol from the current context.
     *
     * @param {any} symbol - The symbol to be retrieved.
     * @param {Context} context - The current context from which the symbol is to be retrieved.
     * @param {Options | any} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    symbol(symbol, context, options) {
        options = options = Options.ensure(options, this);
        const { actions, responder, isAuthority, enumDefaultSymbols, compressStringsAsInts } = options;
        if (!isAuthority || !compressStringsAsInts) {
            return;
        }
        const enumSymbols = context.symbolsEnum ?? {};
        let index = Object.prototype.hasOwnProperty.call(enumSymbols, symbol) ? enumSymbols[symbol] : -1;
        if (index === -1) {
            index = actions.addSymbol(symbol, context, options);
        }
        if (index !== -1) {
            responder([enumDefaultSymbols.mergeSymbol, [symbol, index]]);
        }
    }
    /**
     * Retrieves all symbols from the current context.
     *
     * @param {any} _ - This parameter is not used.
     * @param {Context} context - The current context from which the symbols are to be retrieved.
     * @param {Options | any} options - The options for retrieving the symbols. If an instance of Options is not provided, a new one will be created.
     */
    symbols(_, context, options) {
        options = options = Options.ensure(options, this);
        const { responder, isAuthority, pageSize, defaultSymbols, enumDefaultSymbols, compressStringsAsInts } = options;
        if (!isAuthority || !compressStringsAsInts) {
            return;
        }
        let symbols = context.symbolsList;
        if (symbols && symbols.length) {
            symbols = symbols.slice(defaultSymbols.length);
            // responder([enumDefaultSymbols.mergeSymbols, 0, symbols])
            const pages = paginate(symbols, pageSize);
            let i = defaultSymbols.length;
            // send pages to responder
            for (const page of pages) {
                responder([enumDefaultSymbols.mergeSymbols, i, page]);
                i += pageSize;
            }
        }
    }
};
/**
 * The SymbolActions class provides methods for managing symbols in a context.
 */
export class SymbolActions extends SymbolActionsFactory() {
}
const __SymbolActions__ = new SymbolActions();
/**
 * An object that maps the names of actions to their corresponding methods in the SymbolActions class.
 */
export const actions = {
    /**
     * Adds a symbol to the current context.
     */
    addSymbol: __SymbolActions__.addSymbol,
    /**
     * Fetches a symbol from the current context.
     */
    fetchSymbol: __SymbolActions__.fetchSymbol,
    /**
     * Retrieves a symbol from the current context by its index.
     */
    getSymbol: __SymbolActions__.getSymbol,
    /**
     * Merges a symbol into the current context.
     */
    mergeSymbol: __SymbolActions__.mergeSymbol,
    /**
     * Merges multiple symbols into the current context.
     */
    mergeSymbols: __SymbolActions__.mergeSymbols,
    /**
     * Retrieves a symbol from the current context.
     */
    symbol: __SymbolActions__.symbol,
    /**
     * Retrieves all symbols from the current context.
     */
    symbols: __SymbolActions__.symbols
};
export default actions;
