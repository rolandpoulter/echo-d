use serde_json::Value;

// use crate::actions;
// use crate::string::str;
use crate::context::Context;
use crate::hash::HashMap;
use crate::options::Options;
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
    pub fn new(values: &HashMap<&String, i32>) -> Self {
        Enum { values: &values }
    }

    /**
     * Finds the value of a key in the Enum object.
     *
     * @param {&str} key - The key to be found.
     * @returns {Option<i32>} The value of the key, or None if the key is not found.
     */
    pub fn find(&self, key: &String) -> Option<i32> {
        Some(self.values.get(&key).cloned())
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
    pub fn new(symbols: Vec<String>) -> Self {
        let enum_obj = Enum::new(
            symbols
                .iter()
                .enumerate()
                .map(|(i, s)| (s.clone(), i as i32))
                .collect(),
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
            if let Some(&index) = self.enum_obj.find(&symbol) {
                return Some(index as usize);
            } else {
                let index = self.list.len();
                self.list.push(&symbol.clone());
                self.enum_obj.values.insert(&symbol, index as i32);
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
    pub fn fetch(&self, payload: i32) -> (String, usize) {
        match payload {
            index if index >= 0 && index < self.list.len() as i32 => {
                let symbol = self.list[index as usize].clone();
                (symbol, index as usize)
            }
            _ => ("".to_string(), -1),
        }
    }

    /**
     * Finds the index of a symbol.
     *
     * @param {&str} symbol - The symbol to be found.
     * @returns {Option<usize>} The index of the symbol, or None if the symbol is not found.
     */
    pub fn find(&self, symbol: &str) -> Option<usize> {
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
    pub fn get_symbols(&self) -> &[String] {
        &self.list
    }

    /**
     * Resets the Symbols object with a new vector of symbols.
     *
     * @param {Vec<String>} symbols - The new vector of symbols.
     */
    pub fn reset(&mut self, symbols: Vec<String>) {
        self.list = symbols;
        self.enum_obj = Enum::new(
            symbols
                .iter()
                .enumerate()
                .map(|(i, s)| (s.clone(), i as i32))
                .collect(),
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
pub fn extract_symbol<'a, T>(index: i32, context: &Context<T>, options: &Options<T>) -> &'a String {
    if let Some(get_symbol) = options.get_symbol {
        if let Some(symbol) = get_symbol(index, context, options) {
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
pub fn ensure_symbol_index<T>(
    symbol: &String,
    context: &Context<T>,
    options: &Options<T>,
) -> Result<i32, String> {
    if let Some(add_symbol) = options.add_symbol {
        if let Some(index) = add_symbol(symbol, context, options) {
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
pub fn recursive_symbol_extraction<T>(
    key: &String,
    value: &Value,
    context: &Context<T>,
    options: &Options<T>,
) -> Box<Value> {
    if key.starts_with('$') {
        if let Some(get_symbol) = options.get_symbol {
            return recursive_symbol_extraction_loop::<T>(&key, &value, &context, &options);
        }
    }
    Box::new(value.clone())
}

fn recursive_symbol_extraction_loop<T>(
    key: &String,
    value: &Value,
    context: &Context<T>,
    options: &Options<T>,
) {
    if let Some(array) = value.downcast_ref::<&Vec<Box<Value>>>() {
        let mut new_array = Vec::new();
        for item in array {
            let new_item = recursive_symbol_indexes_ensured_loop::<T>(&key, &item, &context, &options);
            new_array.push(new_item);
        }
        return Box::new(new_array);
    } else if let Some(number) = value.downcast_ref::<i32>() {
        // TODO: get get_symbol from options.actions
        let actions = options.actions;
        if let Some(get_symbol) = actions.get("get_symbol") {
            let execute = get_symbol.and_then(|get_symbol| {
                get_symbol.downcast_ref::<fn(i: usize, c: &Context<T>, o: &Options<T>)>()
            });
            if let Some(symbol) = execute(*number, context, options) {
                return Box::new(symbol);
            }
        }
    } else if let Some(object) = value.downcast_ref::<&HashMap<&String, Box<Value>>>() {
        let mut new_object = HashMap::new();
        for (key, value) in object {
            let new_value = recursive_symbol_indexes_ensured_loop::<T>(&key, &value, &context, &options);
            new_object.insert(key.clone(), new_value);
        }
        return Box::new(new_object);
    }
    Box::new(value.clone())
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
pub fn recursive_symbol_indexes_ensured<T>(
    key: &String,
    value: &Value,
    context: &Context<T>,
    options: &Options<T>,
) -> Box<Value> {
    if key.starts_with('$') {
        if let Some(add_symbol) = options.add_symbol {
            return recursive_symbol_indexes_ensured_loop::<T>(&key, &value, &context, &options);
        }
    }
    Box::new(value.clone())
}

fn recursive_symbol_indexes_ensured_loop<T>(
    key: &String,
    value: &Value,
    context: &Context<T>,
    options: &Options<T>,
) {
    if let Some(array) = value.downcast_ref::<Vec<Box<Value>>>() {
        let mut new_array = Vec::new();
        for item in array {
            let new_item = recursive_symbol_indexes_ensured_loop::<T>(&key, &item, &context, &options);
            new_array.push(new_item);
        }
        return Box::new(new_array);
    } else if let Some(string) = value.downcast_ref::<&String>() {
        let actions = options.actions;
        if let Some(add_symbol) = actions.get("add_symbol") {
            let execute = add_symbol.and_then(|add_symbol| {
                add_symbol.downcast_ref::<fn(s: &String, c: &Context<T>, o: &Options<T>)>()
            });
            if let Ok(index) = execute(string, context, options) {
                return Box::new(index);
            }
        }
        
    } else if let Some(object) = value.downcast_ref::<&HashMap<&String, Box<Value>>>() {
        let mut new_object = HashMap::new();
        for (key, value) in object {
            let new_value = recursive_symbol_indexes_ensured_loop::<T>(&key, &value, &context, &options);
            new_object.insert(key.clone(), new_value);
        }
        return Box::new(new_object);
    }
    Box::new(value.clone())
}
