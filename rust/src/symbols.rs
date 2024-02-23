use serde_json::{Map, Value};

// use crate::actions;
use crate::context::Context;
use crate::hash::HashMap;
use crate::options::Options;
use crate::string::str;
// use crate::symbols::get_symbol;
// use crate::types::Payload;
use crate::types::Symbols as SymbolsHashMap;

/**
 * The Enum struct represents a mapping from keys to numeric values.
 */
pub struct Enum<'a> {
    pub values: &'a SymbolsHashMap<'a>,
}

impl<'a> Enum<'a> {
    /**
     * Constructs a new Enum object.
     *
     * @param {HashMap<String, i32>} values - A HashMap containing the key-value pairs.
     */
    pub fn new(values: &HashMap<&String, u32>) -> Self {
        Enum { values }
    }

    /**
     * Finds the value of a key in the Enum object.
     *
     * @param {&str} key - The key to be found.
     * @returns {Option<i32>} The value of the key, or None if the key is not found.
     */
    pub fn find(&self, key: &String) -> Option<u32> {
        self.values.get(&key).cloned()
    }
}

/**
 * The Symbols struct represents a collection of symbols.
 */
pub struct Symbols<'a> {
    pub list: &'a Vec<&'a String>,
    pub enum_obj: Enum<'a>,
}

impl<'a> Symbols<'a> {
    /**
     * Constructs a new Symbols object.
     *
     * @param {Vec<String>} symbols - An optional vector of symbols.
     */
    pub fn new(symbols: &Vec<&String>) -> Self {
        let enum_obj = Enum::new(
            &symbols
                .iter()
                .enumerate()
                .map(|(i, s)| (s.clone(), i as u32))
                .collect::<HashMap<&String, u32>>(),
        );
        Symbols {
            list: symbols,
            enum_obj,
        }
    }

    /**
     * Adds a symbol to the Symbols object.
     *
     * @param {String} symbol - The symbol to be added.
     * @returns {Option<usize>} The index of the added symbol, or None if the symbol is not valid.
     */
    pub fn add(&mut self, symbol: String) -> Option<usize> {
        if !symbol.is_empty() {
            if let Some(index) = self.enum_obj.find(&symbol) {
                return Some(index as usize);
            } else {
                let index = self.list.len();
                self.list.push(&symbol.clone());
                self.enum_obj.values.insert(&symbol, index as u32);
                return Some(index);
            }
        }
        None
    }

    /**
     * Fetches a symbol and its index based on a payload.
     *
     * @param {i32} payload - The payload, which can be either a symbol or an index.
     * @returns {(String, usize)} A tuple containing the symbol and its index.
     */
    pub fn fetch(&self, payload: i32) -> (Option<&String>, Option<usize>) {
        match payload {
            index if index >= 0 && index < self.list.len() as i32 => {
                let symbol = self.list[index as usize].clone();
                (Some(&symbol), Some(index as usize))
            }
            _ => (None, None),
        }
    }

    /**
     * Finds the index of a symbol.
     *
     * @param {&str} symbol - The symbol to be found.
     * @returns {Option<usize>} The index of the symbol, or None if the symbol is not found.
     */
    pub fn find(&self, symbol: &String) -> Option<usize> {
        self.enum_obj.find(symbol).map(|index| index as usize)
    }

    /**
     * Gets the symbol at a specific index.
     *
     * @param {usize} index - The index of the symbol.
     * @returns {Option<&str>} The symbol at the specified index, or None if there is no symbol at that index.
     */
    pub fn get(&self, index: usize) -> Option<&str> {
        self.list.get(index).map(|s| s.as_str())
    }

    /**
     * Returns the list of symbols.
     *
     * @returns {&[String]} The list of symbols.
     */
    pub fn get_symbols(&self) -> &Vec<&String> {
        &self.list
    }

    /**
     * Resets the Symbols object with a new vector of symbols.
     *
     * @param {Vec<String>} symbols - The new vector of symbols.
     */
    pub fn reset(&mut self, symbols: &Vec<&String>) {
        self.list = symbols;
        self.enum_obj = Enum::new(
            &symbols
                .iter()
                .enumerate()
                .map(|(i, s)| (s.clone(), i as u32))
                .collect::<HashMap<&String, u32>>(),
        );
    }
}

/**
 * Extracts a symbol from a given index.
 *
 * @param {number | string} index - The index or symbol to be extracted.
 * @param {any} context - The context in which the symbol is to be extracted.
 * @param {any} options - The options for extracting the symbol.
 * @returns {string | number} The extracted symbol.
 */
pub fn extract_symbol<'a, T>(index: u32, context: &Context, options: &Options) -> &'a String {
    if let Some(get_symbol) = options.actions.get(str("getSymbol")) {
        let execute = get_symbol
            .downcast_ref::<fn(i: u32, c: &Context, o: &Options) -> Option<&'a String>>()
            .unwrap();
        if let Some(symbol) = execute(index, context, options) {
            return symbol;
        }
    }

    &index.to_string()
}

/**
 * Ensures that a symbol is indexed.
 *
 * @param {number | string} symbol - The symbol to be indexed.
 * @param {any} context - The context in which the symbol is to be indexed.
 * @param {any} options - The options for indexing the symbol.
 * @returns {number | string} The indexed symbol.
 */
pub fn ensure_symbol_index(
    symbol: &String,
    context: &Context,
    options: &Options,
) -> Result<u32, String> {
    if let Some(add_symbol) = options.actions.get(str("addSymbol")) {
        let execute = add_symbol
            .downcast_ref::<fn(&String, &Context, &Options) -> Option<u32>>()
            .unwrap();
        if let Some(index) = execute(symbol, context, options) {
            return Ok(index);
        }
    }

    Err(symbol.to_string())
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
pub fn recursive_symbol_extraction(
    key: &String,
    value: &Value,
    context: &Context,
    options: &Options,
) -> Box<Value> {
    if key.starts_with('$') {
        if let Some(get_symbol) = options.actions.get(str("getSymbol")) {
            // let execute = get_symbol.downcast_ref::<fn(u32, &Context, &Options) -> Option<&String>>().unwrap();
            return recursive_symbol_extraction_loop(&key, &value, &context, &options);
        }
    }
    Box::new(value.clone())
}

fn recursive_symbol_extraction_loop<'a>(
    key: &String,
    value: &Value,
    context: &Context,
    options: &Options,
) -> Box<Value> {
    let box_value: Option<Box<Value>> = match *value {
        Value::Null => None,
        // Value::Bool(boolean) => None,
        Value::Number(number) => {
            // TODO: get get_symbol from options.actions
            let actions = options.actions;
            if let Some(get_symbol) = actions.get(str("getSymbol")) {
                let execute = get_symbol
                    .downcast_ref::<fn(usize, &Context, &Options) -> Option<&'a String>>()
                    .unwrap();
                let number = number.as_u64().unwrap();
                if let Some(symbol) = execute(number as usize, context, options) {
                    return Box::new(Value::String(*symbol));
                }
            }
            return Box::new(Value::Number(number));
        }
        // Value::String(string) => Some(Box::new(Value::String(string))),
        Value::Array(vec) => {
            let mut new_vec: Vec<Value> = Vec::new();
            for item in vec {
                let new_item =
                    recursive_symbol_indexes_ensured_loop(&key, &item, &context, &options);
                new_vec.push(*new_item);
            }
            return Box::new(Value::Array(new_vec));
        }
        Value::Object(map) => {
            let mut new_map = Map::new();
            for (key, value) in map {
                let new_value =
                    recursive_symbol_indexes_ensured_loop(&key, &value, &context, &options);
                new_map.insert(key.clone(), *new_value);
            }
            return Box::new(Value::Object(new_map));
        }
        _ => Some(Box::new(value.clone())),
    };
    box_value.unwrap()
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
pub fn recursive_symbol_indexes_ensured(
    key: &String,
    value: &Value,
    context: &Context,
    options: &Options,
) -> Box<Value> {
    if key.starts_with('$') {
        if let Some(get_symbol) = options.actions.get(str("getSymbol")) {
            // let execute = get_symbol.downcast_ref::<fn(u32, &Context, &Options) -> Option<&String>>().unwrap();
            return recursive_symbol_indexes_ensured_loop(&key, &value, &context, &options);
        }
    }
    Box::new(value.clone())
}

fn recursive_symbol_indexes_ensured_loop(
    key: &String,
    value: &Value,
    context: &Context,
    options: &Options,
) -> Box<Value> {
    let box_value: Option<Box<Value>> = match *value {
        Value::Null => None,
        // Value::Bool(boolean) => None,
        // Value::Number(number) => {},
        Value::String(string) => {
            let actions = options.actions;
            if let Some(add_symbol) = actions.get(str("addSymbol")) {
                let execute = add_symbol
                    .downcast_ref::<fn(&String, &Context, &Options) -> Option<u32>>()
                    .unwrap();
                if let Some(index) = execute(&string, context, options) {
                    return Box::new(Value::Number((index as u64).into()));
                }
            }
            return Box::new(Value::String(string));
        }
        Value::Array(vec) => {
            let mut new_vec = Vec::new();
            for item in vec {
                let new_item =
                    recursive_symbol_indexes_ensured_loop(&key, &item, &context, &options);
                new_vec.push(*new_item);
            }
            return Box::new(Value::Array(new_vec));
        }
        Value::Object(map) => {
            let mut new_map = Map::new();
            for (key, value) in map {
                let new_value =
                    recursive_symbol_indexes_ensured_loop(&key, &value, &context, &options);
                new_map.insert(key.clone(), *new_value);
            }
            return Box::new(Value::Object(new_map));
        }
        _ => Some(Box::new(value.clone())),
    };
    Box::new(value.clone())
}
