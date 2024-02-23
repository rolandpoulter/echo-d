use serde_json::{Value, json};

// use crate::hash::HashMap;
use crate::string::str;
use crate::options::{
    Options,
    // OptionsInput
};
use crate::context::Context;
// use crate::storage::Storage;
use crate::types::{
    Actions as ActionsObject,
    // SymbolPayload,
};

/**
 * The SymbolActions struct provides methods for managing symbols in a context.
 */
pub trait SymbolActions {//}

// impl SymbolActions {
    /**
     * Adds a symbol to the current context.
     *
     * @param {String} symbol - The symbol to be added.
     * @param {&dyn Context} context - The current context to which the symbol is to be added.
     * @param {&Options} options - The options for adding the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn add_symbol(symbol: &Value, context: &Context, options: &Options) -> Option<u32> {
        context.add_symbol(str(symbol.as_str().unwrap()), options)
    }

    /**
     * Fetches a symbol for the current context.
     *
     * @param {&Payload} payload - The payload containing the symbol to be fetched.
     * @param {&dyn Context} context - The current context from which the symbol is to be fetched.
     * @param {&Options} options - The options for fetching the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn fetch_symbol(payload: &Value, context: &Context, options: &Options) {
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;

        let symbols = context.symbols;
        let merge_symbol_symbol = symbols.find(str("mergeSymbol")).unwrap();

        context.fetch_symbol(payload, options, |symbol_tuple: (&String, u32)| {
            responder(&json!([merge_symbol_symbol, symbol_tuple]), None)
        });
    }

    /**
     * Retrieves a symbol from the current context by its index.
     *
     * @param {u32} index - The index of the symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn get_symbol<'a>(index: &Value, context: &Context, options: &Options) -> Option<&'a String> {
        let symbol = context.get_symbol(index.as_i64().unwrap() as u32, options);
        symbol
    }

    /**
     * Merges a symbol into the current context.
     *
     * @param {&Payload} payload - The payload containing the symbol to be merged.
     * @param {&dyn Context} context - The current context into which the symbol is to be merged.
     * @param {&Options} options - The options for merging the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn merge_symbol(payload: &Value, context: &Context, options: &Options) {
        context.merge_symbol(payload, options)
    }

    /**
     * Merges multiple symbols into the current context.
     *
     * @param {&Payload} payload - The payload containing the symbols to be merged.
     * @param {&dyn Context} context - The current context into which the symbols are to be merged.
     * @param {&Options} options - The options for merging the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn merge_symbols(payload: &Value, context: &Context, options: &Options) {
        let array = payload.as_array().unwrap();
        if !array.is_empty() {
            context.reset_symbols(payload, options)
        }
    }

    /**
     * Retrieves a symbol from the current context.
     *
     * @param {dyn Fn()} symbol - The symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn symbol(symbol: &Value, context: &Context, options: &Options) {
        let actions = options.actions;
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;
        let compress_strings_as_ints = options.compress_strings_as_ints;

        if !compress_strings_as_ints {
            return;
        }

        let symbols = context.symbols;
        let enum_symbols = symbols.enum_obj.values;

        let sym = str(symbol.as_str().unwrap());

        let index = if enum_symbols.contains_key(sym) {
            Some(*enum_symbols.get(sym).unwrap())
        } else {
            None
        };

        let index = if index.is_none() {
            let add_symbol = actions.get(str("addSymbol")).unwrap();
            let execute = add_symbol.downcast_ref::<fn(&Value, &Context, &Options) -> Option<u32>>();
            if !execute.is_none() {
                execute.unwrap()(symbol, context, options)
            } else {
                None
            }
        } else {
            index
        };

        if !index.is_none() {
            let merge_symbol_symbol = symbols.find(str("mergeSymbol")).unwrap();
        
            responder(&json!([merge_symbol_symbol, [symbol, index]]), None)
        }
    }

    /**
     * Retrieves all symbols from the current context.
     *
     * @param {dyn Fn()} _ - This parameter is not used.
     * @param {&dyn Context} context - The current context from which the symbols are to be retrieved.
     * @param {&Options} options - The options for retrieving the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn symbols(_: &Value, context: &Context, options: &Options) {
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;
        let compress_strings_as_ints = options.compress_strings_as_ints;

        if !compress_strings_as_ints {
            return;
        }

        let symbols = context.symbols;
        let merge_symbols_symbol = symbols.find(str("mergeSymbols")).unwrap();
        
        let symbols_list = symbols.list;

        // let symbols = context.symbols_list;
        // if let Some(symbols) = symbols {
        responder(&json!([merge_symbols_symbol, symbols_list]), None)
        // }
    }
}

struct Actions;

impl SymbolActions for Actions {}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("createEntity"),
        Box::new(&(Actions::add_symbol as fn(&Value, &Context, &Options) -> Option<u32>)),
    );
    actions.insert(
        &String::from("fetchSymbol"),
        Box::new(&(Actions::fetch_symbol as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("getSymbol"),
        Box::new(&(Actions::get_symbol as fn(&Value, &Context, &Options) -> Option<&'a String>)),
    );
    actions.insert(
        &String::from("mergeSymbols"),
        Box::new(&(Actions::merge_symbols as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("symbol"),
        Box::new(&(Actions::symbol as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("symbols"),
        Box::new(&(Actions::symbols as fn(&Value, &Context, &Options))),
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
