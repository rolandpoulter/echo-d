// use super::{Context, ContextProps, ContextOptions, Store, Options, Pending, Symbols, PendingWithSymbols};
use crate::pending::{Pending, PendingWithSymbols, with_pending};
use crate::symbols::Symbols;
use crate::options::Options;
use crate::changes::Changes;
use crate::ticks::Ticks;
use crate::store::Store;
use crate::utils::combine_values;
/**
 * The ContextProps struct represents the properties of the context.
 */
struct ContextProps {
    changes: Option<Box<dyn Any>>,
    events: Option<Box<dyn Any>>,
    pending: Option<Box<dyn Any>>,
    store: Option<Box<dyn Any>>,
    symbols: Option<Box<dyn Any>>,
    ticks: Option<Box<dyn Any>>,
    other_props: HashMap<String, Box<dyn Any>>,
}

/**
 * The Context struct provides methods for managing the context.
 */
struct Context {
    events: Option<Box<dyn Any>>,
    store: Store,
    ticks: Option<Ticks>,
    changes: Option<Changes>,
    pending: Option<Box<dyn Any>>,
}

impl Context {
    /**
     * Creates a new instance of the Context struct.
     */
    fn new(context: ContextProps, options: ContextOptions, store: Store) -> Self {
        let ContextProps {
            changes,
            events,
            pending,
            store,
            symbols,
            ticks,
        } = context;

        let ticks = if options.is_ticked {
            Some(Ticks::new(ticks))
        } else {
            None
        };

        let changes = if options.is_diffed {
            Some(Changes::new(self, changes))
        } else {
            None
        };

        Context {
            events,
            store: Store::new(store),
            ticks,
            changes,
            pending: None,
        }
    }

    /**
    * Gets the actors from the store.
    *
    * @returns The actors from the store.
    */
    fn actors(&self) -> Vec<Actor> {
        self.store.get_actors()
    }

    /**
    * Spawns an actor with the given id and options.
    *
    * @param {string} id - The id of the actor to spawn.
    * @param {Options} options - The options for spawning the actor.
    */
    fn spawn_actor(&mut self, id: String, options: Options) {
        let Options { skip_pending, on_update, .. } = options;
        let added = self.store.store_actor(id);

        if added {
            if !skip_pending && self.pending.is_some() {
                self.pending.spawn_actor(id);
            }

            if let Some(events) = &self.events {
                events.emit("spawnActor", id);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
    * Removes an actor with the given id and options.
    *
    * @param {string} id - The id of the actor to remove.
    * @param {Options} options - The options for removing the actor.
    */
    fn remove_actor(&mut self, id: String, options: Options) {
        let Options { skip_pending, on_update, .. } = options;
        let removed = self.store.destroy_actor(id);

        if removed {
            if !skip_pending && self.pending.is_some() {
                self.pending.remove_actor(id);
            }

            if let Some(events) = &self.events {
                events.emit("removeActor", id);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
    * Merges actors with the given payload and options.
    *
    * @param {string[]} payload - The payload of the actors to merge.
    * @param {Options} options - The options for merging the actors.
    */
    fn merge_actors(&mut self, payload: Vec<String>, options: Options) {
        let Options { actions, on_update, .. } = options;

        let next_options = Options {
            actions,
            on_update: None,
            ..options
        };

        for id in payload {
            actions.spawn_actor(id, self, next_options);
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    /**
    * Gets the entities from the store.
    *
    * @returns The entities from the store.
    */
    fn entities(&self) -> Vec<any> {
        self.store.get_entities()
    }

    /**
    * Creates an entity with the given id and options.
    *
    * @param {string} id - The id of the entity to create.
    * @param {Options} options - The options for creating the entity.
    */
    fn create_entity(&mut self, id: String, options: Options) {
        let Options { skip_pending, on_update, .. } = options;
        let added = self.store.store_entity(id);

        if added {
            if !skip_pending && self.pending.is_some() {
                self.pending.create_entity(id);
            }

            if let Some(events) = &self.events {
                events.emit("createEntity", id);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
    * Removes an entity with the given id and options.
    *
    * @param {string} id - The id of the entity to remove.
    * @param {Options} options - The options for removing the entity.
    */
    fn remove_entity(&mut self, id: String, options: Options) {
        let Options { skip_pending, on_update, .. } = options;
        let removed = self.store.destroy_entity(id);

        if removed {
            if !skip_pending && self.pending.is_some() {
                self.pending.remove_entity(id);
            }

            if let Some(events) = &self.events {
                events.emit("removeEntity", id);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
    * Merges entities with the given payload and options.
    *
    * @param {string[]} payload - The payload of the entities to merge.
    * @param {Options} options - The options for merging the entities.
    */
    fn merge_entities(&mut self, payload: Vec<String>, options: Options) {
        let Options { actions, on_update, .. } = options;

        let next_options = Options {
            actions,
            on_update: None,
            ..options
        };

        for id in payload {
            actions.create_entity(id, self, next_options);
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    /**
    * Gets the components from the store.
    *
    * @returns The components from the store.
    */
    fn get_components(&self) -> HashMap<String, HashMap<String, Value>> {
        self.store.get_components()
    }

    /**
    * Changes a component with the given id, key, value, and options.
    *
    * @param {string} id - The id of the component to change.
    * @param {string} key - The key of the component to change.
    * @param {any} value - The value to change in the component.
    * @param {Options} options - The options for changing the component.
    */
    fn change_component(&mut self, id: String, key: String, value: Value, options: Options) {
        let Options { skip_pending, on_update, .. } = options;

        let current_value = self.store.fetch_component(&id, &key);

        let pending_type = if current_value.is_none() {
            "created"
        } else {
            "updated"
        };

        if self.ticks.is_some() {
            // TODO: add tick to message payload when is_ticked is true
            let tick = 0;
            // let tick = arguments[3];
            let is_valid_tick = self.ticks.change_component(&id, &key, tick);
            if !is_valid_tick && self.changes.is_none() {
                return;
            }
        }

        let next_value;
        if pending_type == "created" {
            next_value = value;
        } else {
            let combined = combine_values(current_value.unwrap(), value);
            next_value = combined.1;
        }

        if self.changes.is_some() {
            self.changes.change_component(pending_type, &id, &key, next_value);
        } else {
            self.store.store_component(&id, &key, next_value);
        }

        if !skip_pending && self.pending.is_some() {
            self.pending.change_component(pending_type, &id, &key);
        }

        if let Some(events) = &self.events {
            events.emit("changeComponent", &id, &key);
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    /**
    * Upserts a component with the given id, key, value, and options.
    *
    * @param {string} id - The id of the component to upsert.
    * @param {string} key - The key of the component to upsert.
    * @param {any} value - The value to upsert in the component.
    * @param {Options} options - The options for upserting the component.
    */
    fn upsert_component(&mut self, id: String, key: String, value: Value, options: Options) {
        let Options { skip_pending, on_update, .. } = options;

        let current_value = self.store.fetch_component(&id, &key);

        let pending_type = if current_value.is_none() {
            "created"
        } else {
            "updated"
        };

        if current_value != Some(value) {
            if self.ticks.is_some() {
                // TODO: add tick to message payload when is_ticked is true
                let tick = 0;
                // let tick = arguments[3];
                let is_valid_tick = self.ticks.upsert_component(&id, &key, tick);
                if !is_valid_tick && self.changes.is_none() {
                    return;
                }
            }

            if self.changes.is_some() {
                self.changes.upsert_component(pending_type, &id, &key, value);
            } else {
                self.store.store_component(&id, &key, value);
            }

            if !skip_pending && self.pending.is_some() {
                self.pending.upsert_component(pending_type, &id, &key);
            }

            if let Some(events) = &self.events {
                events.emit("upsertComponent", &id, &key);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
    * Removes a component with the given id, key, and options.
    *
    * @param {string} id - The id of the component to remove.
    * @param {string} key - The key of the component to remove.
    * @param {Options} options - The options for removing the component.
    */
    fn remove_component(&mut self, id: String, key: String, options: Options) {
        let Options { skip_pending, on_update, .. } = options;

        let current_value = self.store.fetch_component(&id, &key);

        if current_value.is_some() {
            self.store.destroy_component(&id, &key);

            if !skip_pending && self.pending.is_some() {
                self.pending.remove_component(&id, &key);
            }

            if let Some(events) = &self.events {
                events.emit("removeComponent", &id, &key);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
    * Merges components with the given payload and options.
    *
    * @param {any} payload - The payload of the components to merge.
    * @param {Options} options - The options for merging the components.
    */
    fn merge_components(&mut self, payload: HashMap<String, HashMap<String, Value>>, options: Options) {
        let Options { actions, on_update, is_component_relay, .. } = options;

        let next_options = Options {
            actions,
            on_update: None,
            is_component_relay,
            ..options
        };

        for (id, component_map) in payload {
            for (key, value) in component_map {
                actions.upsert_component(id.clone(), key.clone(), value, self, next_options);
            }
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    /**
    * Gets the inputs from the store.
    *
    * @returns The inputs from the store.
    */
    fn get_inputs(&self) -> Inputs {
        self.store.get_inputs()
    }

    /**
    * Handles actor input with the given id, payload, and options.
    *
    * @param {string} id - The id of the actor.
    * @param {any} payload - The payload for the actor input.
    * @param {Options} options - The options for handling the actor input.
    */
    fn actor_input(&mut self, id: String, payload: Value, options: Options) {
        let Options { skip_pending, on_update, .. } = options;

        let new_index = self.store.store_input(id.clone(), payload);

        if !skip_pending && self.pending.is_some() {
            self.pending.actor_input(id.clone(), new_index);
        }

        if let Some(events) = &self.events {
            events.emit("actorInput", &id, &payload, new_index);
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }
}

/**
 * The ContextWithSymbols struct extends the Context struct with symbols and pending properties.
 */
pub struct ContextWithSymbols {
    symbols: Symbols,
    pending: PendingWithSymbols,
}

impl ContextWithSymbols {
    /**
     * Constructs a new instance of the ContextWithSymbols struct.
     */
    pub fn new(context: ContextProps, options: ContextOptions) -> Self {
        let mut symbols = Symbols::new();
        let enum_default_symbols = options.enum_default_symbols;

        if let Some(symbols_list) = context.symbols {
            symbols.copy_enum(enum_default_symbols);
            symbols.reset(symbols_list);
        } else {
            symbols.copy_enum(enum_default_symbols);
        }

        Self {
            symbols,
            pending: PendingWithSymbols::new(),
            ..Context::new(context, options)
        }
    }

    /**
     * Gets the list of symbols.
     */
    pub fn symbols_list(&self) -> Vec<String> {
        self.symbols.get_symbols()
    }

    /**
     * Gets the enum of symbols.
     */
    pub fn symbols_enum(&self) -> HashMap<String, i32> {
        self.symbols.get_symbols_enum()
    }

    /**
     * Sets the symbols with the given symbols.
     */
    pub fn set_symbols(&mut self, symbols: Vec<String>) {
        self.symbols.reset(symbols);
    }

    /**
     * Gets a symbol with the given index and options.
     */
    pub fn get_symbol(&self, index: i32, options: Options) -> Option<String> {
        let symbol = self.symbols.get(index);

        if symbol.is_none() {
            let symbol_tuple = actions.fetch_symbol(symbol, self, options);
            return Some(symbol_tuple.0);
        }

        symbol
    }

    /**
     * Adds a symbol with the given symbol and options.
     */
    pub fn add_symbol(&mut self, symbol: String, options: Options) -> Option<i32> {
        let enum_symbols = self.symbols_enum();
        let mut index = enum_symbols.get(&symbol).cloned().unwrap_or(-1);

        if index == -1 {
            if options.is_symbol_leader {
                index = self.symbols.add(symbol.clone()).unwrap_or(-1);

                if !options.skip_pending && self.pending.is_some() {
                    self.pending.add_symbol((symbol.clone(), index));
                }

                if let Some(on_update) = options.on_update {
                    on_update();
                }
            } else if let Some(fetch_symbol) = options.fetch_symbol {
                let symbol_tuple = fetch_symbol(symbol.clone(), self, options);
                index = symbol_tuple.1;
            }
        }

        if index == -1 {
            None
        } else {
            Some(index)
        }
    }

    /**
     * Fetches a symbol with the given payload, options, and match function.
     */
    pub fn fetch_symbol(&mut self, payload: String, options: Options, on_match: fn(symbol_tuple: (String, i32))) -> (String, i32) {
        let symbol_tuple = self.symbols.fetch(payload);

        if let Some(symbol) = symbol_tuple.0 {
            if symbol_tuple.1 != -1 {
                if let Some(on_match) = on_match {
                    on_match(symbol_tuple);
                }
            } else {
                if options.is_symbol_leader {
                    let index = self.symbols.add(symbol.clone()).unwrap_or(-1);
                    symbol_tuple.1 = index;

                    if !options.skip_pending && self.pending.is_some() {
                        self.pending.add_symbol(symbol_tuple);
                    }

                    if let Some(on_update) = options.on_update {
                        on_update();
                    }
                }
            }
        }

        symbol_tuple
    }

    /**
     * Merges a symbol with the given payload and options.
     */
    pub fn merge_symbol(&mut self, payload: String, options: Options) {
        self.symbols.merge(payload);

        if (options.is_symbol_leader || options.is_symbol_relay) && !options.skip_pending && self.pending.is_some() {
            self.pending.add_symbol(payload);
        }

        if let Some(on_update) = options.on_update {
            on_update();
        }
    }

    /**
     * Resets symbols with the given payload and options.
     */
    pub fn reset_symbols(&mut self, payload: String, options: Options) {
        self.symbols.reset(payload);

        if (options.is_symbol_leader || options.is_symbol_relay) && !options.skip_pending && self.pending.is_some() {
            self.pending.replace_symbols(payload);
        }

        if let Some(on_update) = options.on_update {
            on_update();
        }
    }
}

/**
 * The ContextWithPending struct extends the Context struct.
 * It includes additional functionality for handling pending operations.
 */
pub struct ContextWithPending {
    pending: Pending,
}

impl ContextWithPending {
    /**
     * Constructs a new instance of the ContextWithPending struct.
     */
    pub fn new(context: ContextProps, options: Options) -> Self {
        Self {
            pending: Pending::new(),
            ..Context::new(context, options)
        }
    }

    /**
     * Resets the pending state.
     */
    pub fn reset_pending(&mut self) {
        self.pending.reset_pending();
    }
}

/**
 * The ContextWithPendingAndSymbols struct extends the ContextWithSymbols struct.
 * It includes additional functionality for handling pending operations and symbols.
 */
pub struct ContextWithPendingAndSymbols {
    symbols: Symbols,
    pending: PendingWithSymbols,
}

impl ContextWithPendingAndSymbols {
    /**
     * Constructs a new instance of the ContextWithPendingAndSymbols struct.
     */
    pub fn new(context: ContextProps, options: Options) -> Self {
        Self {
            symbols: Symbols::new(),
            pending: PendingWithSymbols::new(),
            ..ContextWithSymbols::new(context, options)
        }
    }

    /**
     * Resets the pending state.
     */
    pub fn reset_pending(&mut self) {
        self.pending.reset_pending();
    }
}
