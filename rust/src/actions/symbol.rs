// use crate::hash::HashMap;
use crate::options::Options;
use crate::context::Context;
use crate::types::{
    Actions as ActionsObject,
    // Payload,
};

/**
 * The Payload struct represents the payload for a symbol action.
 *
 * @property {usize} length - The length of the symbol.
 */
struct Payload {
    length: usize,
}

/**
 * The SymbolActions struct provides methods for managing symbols in a context.
 */
pub trait SymbolActions<T> {//}

// impl SymbolActions {
    /**
     * Adds a symbol to the current context.
     *
     * @param {String} symbol - The symbol to be added.
     * @param {&dyn Context} context - The current context to which the symbol is to be added.
     * @param {&Options} options - The options for adding the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn add_symbol(symbol: &String, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        context.add_symbol(symbol, options)
    }

    /**
     * Fetches a symbol for the current context.
     *
     * @param {&Payload} payload - The payload containing the symbol to be fetched.
     * @param {&dyn Context} context - The current context from which the symbol is to be fetched.
     * @param {&Options} options - The options for fetching the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn fetch_symbol(payload: &Payload, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;

        context.fetch_symbol(payload, options, |symbol_tuple| {
            responder([enum_default_symbols.merge_symbol, symbol_tuple], None)
        })
    }

    /**
     * Retrieves a symbol from the current context by its index.
     *
     * @param {usize} index - The index of the symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn get_symbol(index: usize, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        context.get_symbol(index, options)
    }

    /**
     * Merges a symbol into the current context.
     *
     * @param {&Payload} payload - The payload containing the symbol to be merged.
     * @param {&dyn Context} context - The current context into which the symbol is to be merged.
     * @param {&Options} options - The options for merging the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn merge_symbol(payload: &Payload, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        context.merge_symbol(payload, options)
    }

    /**
     * Merges multiple symbols into the current context.
     *
     * @param {&Payload} payload - The payload containing the symbols to be merged.
     * @param {&dyn Context} context - The current context into which the symbols are to be merged.
     * @param {&Options} options - The options for merging the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn merge_symbols(payload: &Payload, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        if let Some(payload_length) = payload.length {
            context.reset_symbols(payload_length, options)
        }
    }

    /**
     * Retrieves a symbol from the current context.
     *
     * @param {dyn Fn()} symbol - The symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn symbol(symbol: &String, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        let actions = options.actions;
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;
        let compress_strings_as_ints = options.compress_strings_as_ints;

        if !compress_strings_as_ints {
            return;
        }

        let enum_symbols = context.symbols_enum;

        let index = if enum_symbols.contains_key(symbol) {
            enum_symbols[symbol]
        } else {
            -1
        };

        if index == -1 {
            actions.add_symbol(symbol, context, options)
        }

        if index != -1 {
            responder([enum_default_symbols.merge_symbol, [symbol, index]], None)
        }
    }

    /**
     * Retrieves all symbols from the current context.
     *
     * @param {dyn Fn()} _ - This parameter is not used.
     * @param {&dyn Context} context - The current context from which the symbols are to be retrieved.
     * @param {&Options} options - The options for retrieving the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn symbols(_: &String, context: &Context<T>, options: &Options<T>) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, None)
        };

        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;
        let compress_strings_as_ints = options.compress_strings_as_ints;

        if !compress_strings_as_ints {
            return;
        }

        let symbols = context.symbols_list;

        if let Some(symbols) = symbols {
            responder([enum_default_symbols.merge_symbols, symbols], None)
        }
    }
}

// struct Actions;
// impl SymbolActions for Actions {}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("createEntity"),
        Box::new(SymbolActions::add_symbol),
    );
    actions.insert(
        &String::from("fetchSymbol"),
        Box::new(SymbolActions::fetch_symbol),
    );
    actions.insert(
        &String::from("getSymbol"),
        Box::new(SymbolActions::get_symbol),
    );
    actions.insert(
        &String::from("mergeSymbols"),
        Box::new(SymbolActions::merge_symbols),
    );
    actions.insert(
        &String::from("symbol"),
        Box::new(SymbolActions::symbol),
    );
    actions.insert(
        &String::from("symbols"),
        Box::new(SymbolActions::symbols),
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
