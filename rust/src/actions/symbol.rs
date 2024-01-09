use crate::options::Options;
use crate::context::Context;

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
trait SymbolActions {
    /**
     * Adds a symbol to the current context.
     *
     * @param {dyn Fn()} symbol - The symbol to be added.
     * @param {&dyn Context} context - The current context to which the symbol is to be added.
     * @param {&Options} options - The options for adding the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn add_symbol(&self, symbol: &dyn Fn(), context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
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
    fn fetch_symbol(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
        };

        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;

        context.fetch_symbol(payload, options, |symbol_tuple| {
            responder([enum_default_symbols.merge_symbol, symbol_tuple])
        })
    }

    /**
     * Retrieves a symbol from the current context by its index.
     *
     * @param {usize} index - The index of the symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn get_symbol(&self, index: usize, context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
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
    fn merge_symbol(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
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
    fn merge_symbols(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
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
    fn symbol(&self, symbol: &dyn Fn(), context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
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
            responder([enum_default_symbols.merge_symbol, [symbol, index]])
        }
    }

    /**
     * Retrieves all symbols from the current context.
     *
     * @param {dyn Fn()} _ - This parameter is not used.
     * @param {&dyn Context} context - The current context from which the symbols are to be retrieved.
     * @param {&Options} options - The options for retrieving the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn symbols(&self, _: &dyn Fn(), context: &dyn Context, options: &Options) {
        let options = if let Some(options) = options.as_ref() {
            options
        } else {
            Options::new(options, self)
        };

        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;
        let compress_strings_as_ints = options.compress_strings_as_ints;

        if !compress_strings_as_ints {
            return;
        }

        let symbols = context.symbols_list;

        if let Some(symbols) = symbols {
            responder([enum_default_symbols.merge_symbols, symbols])
        }
    }
}

/**
 * An object that maps the names of actions to their corresponding methods in the SymbolActions struct.
 */
struct Actions {
    /**
     * Adds a symbol to the current context.
     */
    add_symbol: SymbolActions::add_symbol,

    /**
     * Fetches a symbol from the current context.
     */
    fetch_symbol: SymbolActions::fetch_symbol,

    /**
     * Retrieves a symbol from the current context by its index.
     */
    get_symbol: SymbolActions::get_symbol,

    /**
     * Merges a symbol into the current context.
     */
    merge_symbol: SymbolActions::merge_symbol,

    /**
     * Merges multiple symbols into the current context.
     */
    merge_symbols: SymbolActions::merge_symbols,

    /**
     * Retrieves a symbol from the current context.
     */
    symbol: SymbolActions::symbol,

    /**
     * Retrieves all symbols from the current context.
     */
    symbols: SymbolActions::symbols,
}

impl Actions {
    fn new() -> Actions {
        Actions {
            add_symbol: SymbolActions::add_symbol,
            fetch_symbol: SymbolActions::fetch_symbol,
            get_symbol: SymbolActions::get_symbol,
            merge_symbol: SymbolActions::merge_symbol,
            merge_symbols: SymbolActions::merge_symbols,
            symbol: SymbolActions::symbol,
            symbols: SymbolActions::symbols,
        }
    }
}

pub struct SymbolActions {
    actions: Actions,
}

impl SymbolActions {
    fn new() -> SymbolActions {
        SymbolActions {
            actions: Actions::new(),
        }
    }
}

impl SymbolActions {
    /**
     * Adds a symbol to the current context.
     *
     * @param {dyn Fn()} symbol - The symbol to be added.
     * @param {&dyn Context} context - The current context to which the symbol is to be added.
     * @param {&Options} options - The options for adding the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn add_symbol(&self, symbol: &dyn Fn(), context: &dyn Context, options: &Options) {
        self.actions.add_symbol(symbol, context, options);
    }

    /**
     * Fetches a symbol for the current context.
     *
     * @param {&Payload} payload - The payload containing the symbol to be fetched.
     * @param {&dyn Context} context - The current context from which the symbol is to be fetched.
     * @param {&Options} options - The options for fetching the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn fetch_symbol(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        self.actions.fetch_symbol(payload, context, options);
    }

    /**
     * Retrieves a symbol from the current context by its index.
     *
     * @param {usize} index - The index of the symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn get_symbol(&self, index: usize, context: &dyn Context, options: &Options) {
        self.actions.get_symbol(index, context, options);
    }

    /**
     * Merges a symbol into the current context.
     *
     * @param {&Payload} payload - The payload containing the symbol to be merged.
     * @param {&dyn Context} context - The current context into which the symbol is to be merged.
     * @param {&Options} options - The options for merging the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn merge_symbol(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        self.actions.merge_symbol(payload, context, options);
    }

    /**
     * Merges multiple symbols into the current context.
     *
     * @param {&Payload} payload - The payload containing the symbols to be merged.
     * @param {&dyn Context} context - The current context into which the symbols are to be merged.
     * @param {&Options} options - The options for merging the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn merge_symbols(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        self.actions.merge_symbols(payload, context, options);
    }

    /**
     * Retrieves a symbol from the current context.
     *
     * @param {dyn Fn()} symbol - The symbol to be retrieved.
     * @param {&dyn Context} context - The current context from which the symbol is to be retrieved.
     * @param {&Options} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fn symbol(&self, symbol: &dyn Fn(), context: &dyn Context, options: &Options) {
        self.actions.symbol(symbol, context, options);
    }

    /**
     * Retrieves all symbols from the current context.
     *
     * @param {dyn Fn()} _ - This parameter is not used.
     * @param {&dyn Context} context - The current context from which the symbols are to be retrieved.
     * @param {&Options} options - The options for retrieving the symbols. If an instance of Options is not provided, a new one will be created.
     */
    fn symbols(&self, _: &dyn Fn(), context: &dyn Context, options: &Options) {
        self.actions.symbols(_, context, options);
    }
}

pub const ACTIONS: Actions = Actions::new();

pub fn add_symbol(symbol: &dyn Fn(), context: &dyn Context, options: &Options) {
    SymbolActions::new().add_symbol(symbol, context, options);
}

pub fn fetch_symbol(payload: &Payload, context: &dyn Context, options: &Options) {
    SymbolActions::new().fetch_symbol(payload, context, options);
}

pub fn get_symbol(index: usize, context: &dyn Context, options: &Options) {
    SymbolActions::new().get_symbol(index, context, options);
}

pub fn merge_symbol(payload: &Payload, context: &dyn Context, options: &Options) {
    SymbolActions::new().merge_symbol(payload, context, options);
}

pub fn merge_symbols(payload: &Payload, context: &dyn Context, options: &Options) {
    SymbolActions::new().merge_symbols(payload, context, options);
}

pub fn symbol(symbol: &dyn Fn(), context: &dyn Context, options: &Options) {
    SymbolActions::new().symbol(symbol, context, options);
}

pub fn symbols(_: &dyn Fn(), context: &dyn Context, options: &Options) {
    SymbolActions::new().symbols(_, context, options);
}
