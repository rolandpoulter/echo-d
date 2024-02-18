use futures::executor::block_on;
use futures::stream::FuturesUnordered;
use futures::{Future, StreamExt};
use serde_json::Value;
use std::pin::Pin;

// use super::{Context, ContextProps, ContextOptions, Store, Options, Pending, Symbols, PendingWithSymbols};
use crate::changes::Changes;
use crate::options::Options;
use crate::pending::Pending;
use crate::symbols::Symbols;
// use crate::index_manager::IndexManager as Indexes;
use crate::events::EventEmitter;
use crate::ordered::Ordered;
use crate::storage::Storage;
use crate::utils::combine_values;
// use crate::actor::Actor;
// use crate::query::Query;
use crate::hash::HashMap;

use crate::types::{
    Actor,
    Inputs,
    // Entity,
    Query,
    StorageOptions as StorageProps,
};

/**
 * The ContextProps struct represents the properties of the context.
 */
pub struct ContextProps<'a, T> {
    pub events: Option<&'a EventEmitter>,
    pub store: Option<&'a Storage<'a>>, // TODO: use dyn with trait to allow custom stores
    pub order: Option<&'a Ordered<'a>>,
    pub changes: Option<&'a Changes<'a, T>>,
    pub pending: Option<&'a Pending<'a>>,
    pub symbols: Option<&'a Symbols<'a>>, // other_props: HashMap<String, Box<dyn Any>>,
}

pub enum ContextInput<'a, T> {
    Props(ContextProps<'a, T>),
    Instance(Context<'a, T>),
}

/**
 * The Context struct provides methods for managing the context.
 */
pub struct Context<'a, T> {
    pub events: Option<&'a EventEmitter>,
    pub store: &'a Storage<'a>, // TODO: use dyn with trait to allow custom stores
    pub order: Option<&'a Ordered<'a>>,
    pub changes: Option<&'a Changes<'a, T>>,
    pub pending: Option<&'a Pending<'a>>,
    pub symbols: &'a Symbols<'a>,
}

impl<'a, T> Context<'a, T> {
    /**
     * Creates a new instance of the Context struct.
     */
    pub fn new(context: &ContextInput<T>, options: &Options<T>) -> Self {
        let ContextProps {
            events,
            store,
            order,
            changes,
            pending,
            symbols,
        } = match context {
            ContextInput::Props(props) => {
                props;
            }
            ContextInput::Instance(context) => {
                let props: ContextProps = context;
                props;
            }
        };

        let enum_default_symbols = options.enum_default_symbols;
        let is_read_only = options.is_read_only;
        let is_diffed = options.is_diffed;
        let is_ordered = options.is_ordered;
        // let is_symbol_leader = options.is_symbol_leader;
        let enable_querying = options.enable_querying;
        let types = options.types;
        let indexes = options.indexes;
        let store_options = options.store_options;

        let order = if is_ordered {
            Ordered::new(&order)
        } else {
            None
        };

        let symbols = if Some(symbols) {
            Symbols::new(&symbols);
        } else {
            let symbols = Symbols::new(&symbols);
            symbols.copy_enum(&enum_default_symbols);
            symbols
        };

        let pending = if is_read_only {
            None
        } else {
            Pending::new(is_diffed);
        };

        let events = if Some(events) {
            events;
        } else {
            // EventEmitter::new();
            None;
        };

        let custom_store_props = StorageProps {
            // enable_querying,
            types: Some(types),
            indexes: Some(indexes),
            other: None,
        };

        let store_options = store_options.extend(&custom_store_props);
        let store = T::new(&store, &store_options);

        let &mut context = Self {
            events,
            store,
            order,
            changes: None,
            pending,
            symbols,
        } & context.changes = if is_diffed {
            Changes::new(&context, &changes)
        } else {
            None
        };

        &context
    }

    pub fn ensure<'b>(context: &ContextInput<T>, options: &Options<T>) -> Context<'b, T> {
        Context::<T>::new(&context, &options)
    }

    /**
     * Gets the actors from the store.
     *
     * @returns The actors from the store.
     */
    pub fn actors<'b>(&self) -> &'b Vec<Actor<'b>> {
        let actors = self.get_actors(None, None);
        match actors {
            // Emitter(actors) => actors,
            Some(actors) => &actors, //[0],
            None => &Vec::new(),
        }
    }

    pub fn get_actors(&self, query: Option<&Query>, page_size: Option<i16>) -> &Vec<&Actor> {
        self.store.get_actors(query, page_size)
    }

    fn spawn_actor_op(&self, added: bool, id: &String, options: &Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        if added {
            if !skip_pending && self.pending.is_some() {
                self.pending.spawn_actor(&id);
            }

            if let Some(events) = self.events {
                events.emit("spawnActor", &id);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
     * Spawns an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to spawn.
     * @param {Options} options - The options for spawning the actor.
     */
    pub fn spawn_actor(&self, id: &String, options: &Options<T>) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let added = self.store.store_actor(&id);
            let result = block_on(added);
            self.spawn_actor_op(result, &id, &options);
            return result;
        }
        let added = self.store.store_actor(&id);
        self.spawn_actor_op(added, &id, &options);
        return added;
    }

    fn remove_actor_op(&self, removed: bool, id: &String, options: &Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        if removed {
            if !skip_pending && self.pending.is_some() {
                self.pending.remove_actor(id);
            }

            if let Some(events) = self.events {
                events.emit("removeActor", id);
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
    pub fn remove_actor(&self, id: &String, options: &Options<T>) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let removed = self.store.destroy_actor(&id);
            let result = block_on(removed);
            self.remove_actor_op(result, &id, &options);
            return result;
        }
        let removed = self.store.destroy_actor(&id);
        self.remove_actor_op(removed, &id, &options);
        return removed;
    }

    /**
     * Merges actors with the given payload and options.
     *
     * @param {string[]} payload - The payload of the actors to merge.
     * @param {Options} options - The options for merging the actors.
     */
    pub fn merge_actors(&self, payload: &Vec<&String>, options: &Options<T>) {
        let Options {
            actions,
            is_async_storage,
            on_update,
            ..
        } = options;

        let next_options = options.extend(
            &Options {
                // actions,
                on_update: None,
                ..options
            },
            None,
        );

        let spawn_actor = actions.get("spawnActor");

        if is_async_storage {
            let mut futures = FuturesUnordered::<Pin<Box<dyn Future<Output = String>>>>::new();

            for id in payload {
                let future = spawn_actor(&id, &self, &next_options);
                futures.push(Box::pin(future));
            }

            // wait for all futures to complete
            let promise = self.finish_futures(futures);
            block_on(promise);
        } else {
            for id in payload {
                spawn_actor(&id, &self, &next_options);
            }
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    async fn finish_futures(
        &self,
        mut futures_unordered: FuturesUnordered<Pin<Box<dyn Future<Output = String>>>>,
    ) {
        while let Some(_value) = futures_unordered.next().await {}
    }

    /**
     * Gets the entities from the store.
     *
     * @returns The entities from the store.
     */
    fn entities(&self) -> &Vec<&Vec<&String>> {
        let entities = self.get_entities(None, None);
        match entities {
            // Emitter(entities) => entities,
            Some(entities) => &entities, //[0],
            None => &Vec::new(),
        }
    }

    pub fn get_entities(
        &self,
        query: Option<&Query>,
        page_size: Option<i16>,
    ) -> &Vec<&Vec<&String>> {
        self.store.get_entities(&query, page_size)
    }

    fn create_entity_op(&self, added: bool, id: &String, options: &Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        if added {
            if !skip_pending && self.pending.is_some() {
                self.pending.create_entity(&id);
            }

            if let Some(events) = self.events {
                events.emit("createEntity", &id);
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
        }
    }

    /**
     * Creates an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to create.
     * @param {Options} options - The options for creating the entity.
     */
    pub fn create_entity(&self, id: &String, options: &Options<T>) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let added = self.store.store_entity(&id);
            let result = block_on(added);
            self.create_entity_op(result, &id, &options);
            return result;
        }
        let added = self.store.store_entity(&id);
        self.create_entity_op(added, &id, &options);
        return added;
    }

    fn remove_entity_op(&self, id: &String, options: &Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;
        let removed = self.store.destroy_entity(&id);

        if removed {
            if !skip_pending && self.pending.is_some() {
                self.pending.remove_entity(&id);
            }

            if let Some(events) = self.events {
                events.emit("removeEntity", &id);
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
    pub fn remove_entity(&self, id: &String, options: &Options<T>) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let removed = self.store.destroy_entity(&id);
            let result = block_on(removed);
            self.remove_entity_op(&id, &options);
            return result;
        }
        let removed = self.store.destroy_entity(&id);
        self.remove_entity_op(&id, &options);
        return removed;
    }

    /**
     * Merges entities with the given payload and options.
     *
     * @param {string[]} payload - The payload of the entities to merge.
     * @param {Options} options - The options for merging the entities.
     */
    pub fn merge_entities(&self, payload: &Vec<&String>, options: &Options<T>) {
        let Options {
            actions,
            is_async_storage,
            on_update,
            ..
        } = options;

        let next_options = options.extend(
            &Options {
                // actions,
                on_update: None,
                ..options
            },
            None,
        );

        let create_entity = actions.get("createEntity");

        if is_async_storage {
            let mut futures = FuturesUnordered::<Pin<Box<dyn Future<Output = String>>>>::new();

            for id in payload {
                let future = create_entity(&id, &self, &next_options);
                futures.push(Box::pin(future));
            }

            // wait for all futures to complete
            let promise = self.finish_futures(futures);
            block_on(promise);
        } else {
            for id in payload {
                create_entity(&id, &self, &next_options);
            }
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    pub fn components(&self) -> &HashMap<&String, &HashMap<&String, &Value>> {
        self.get_components()
    }

    /**
     * Gets the components from the store.
     *
     * @returns The components from the store.
     */
    pub fn get_components(&self) -> &HashMap<&String, &HashMap<&String, &Value>> {
        self.store.get_components()
    }

    fn change_component_op(&self, id: &String, key: &String, value: &Value, options: &Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        let current_value = self.store.fetch_component(&id, &key);

        let pending_type = if current_value.is_none() {
            "created"
        } else {
            "updated"
        };

        if self.order.is_some() {
            // TODO: add tick to message payload when is_ticked is true
            let tick = 0;
            // let tick = arguments[3];
            let is_valid_tick = self.order.change_component(&id, &key, tick);
            if !is_valid_tick && self.changes.is_none() {
                return;
            }
        }

        let next_value;
        if pending_type == "created" {
            next_value = value;
        } else {
            let combined = combine_values(current_value.unwrap(), value);
            next_value = &combined.1;
        }

        if self.changes.is_some() {
            self.changes
                .change_component(pending_type, &id, &key, next_value);
        } else {
            self.store.store_component(&id, &key, next_value);
        }

        if !skip_pending && self.pending.is_some() {
            self.pending.change_component(pending_type, &id, &key);
        }

        if let Some(events) = &self.events {
            events.emit("changeComponent", (&id, &key));
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    /**
     * Changes a component with the given id, key, value, and options.
     *
     * @param {string} id - The id of the component to change.
     * @param {string} key - The key of the component to change.
     * @param {any} value - The value to change in the component.
     * @param {Options} options - The options for changing the component.
     */
    pub fn change_component(
        &self,
        id: String,
        key: String,
        value: Value,
        tick: i32,
        options: Options<T>,
    ) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let result = block_on(self.store.store_component(id, key, value));
            self.change_component_op(&id, &key, &value, &options);
            return result;
        }
        let result = self.store.store_component(id, key, value);
        self.change_component_op(&id, &key, &value, &options);
        return result;
    }

    fn upsert_component_op(&self, id: String, key: String, value: Value, options: Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        let current_value = self.store.fetch_component(&id, &key);

        let pending_type = if current_value.is_none() {
            "created"
        } else {
            "updated"
        };

        if current_value != Some(value) {
            if self.order.is_some() {
                // TODO: add tick to message payload when is_ticked is true
                let tick = 0;
                // let tick = arguments[3];
                let is_valid_tick = self.order.upsert_component(&id, &key, tick);
                if !is_valid_tick && self.changes.is_none() {
                    return;
                }
            }

            if self.changes.is_some() {
                self.changes
                    .upsert_component(pending_type, &id, &key, value);
            } else {
                self.store.store_component(&id, &key, value);
            }

            if !skip_pending && self.pending.is_some() {
                self.pending.upsert_component(pending_type, &id, &key);
            }

            if let Some(events) = &self.events {
                events.emit("upsertComponent", (&id, &key));
            }

            if let Some(on_update_fn) = on_update {
                on_update_fn();
            }
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
    pub fn upsert_component(
        &self,
        id: &String,
        key: &String,
        value: &Value,
        tick: i32,
        options: Options<T>,
    ) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let result = block_on(self.store.store_component(&id, &key, &value));
            self.upsert_component_op(&id, &key, &value, &options);
            return result;
        }
        let result = self.store.store_component(&id, &key, &value);
        self.upsert_component_op(&id, &key, &value, &options);
        return result;
    }

    fn remove_component_op(&self, id: &String, key: &String, options: &Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        let current_value = self.store.fetch_component(&id, &key);

        if current_value.is_some() {
            self.store.destroy_component(&id, &key);

            if !skip_pending && self.pending.is_some() {
                self.pending.remove_component(&id, &key);
            }

            if let Some(events) = &self.events {
                events.emit("removeComponent", (&id, &key));
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
    pub fn remove_component(&self, id: String, key: String, options: Options<T>) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let result = block_on(self.store.destroy_component(id, key));
            self.remove_component_op(&id, &key, &options);
            return result;
        }
        let result = self.store.destroy_component(id, key);
        self.remove_component_op(&id, &key, &options);
        return result;
    }

    /**
     * Merges components with the given payload and options.
     *
     * @param {any} payload - The payload of the components to merge.
     * @param {Options} options - The options for merging the components.
     */
    pub fn merge_components(
        &self,
        payload: &HashMap<String, HashMap<String, Value>>,
        options: &Options<T>,
    ) {
        let Options {
            actions,
            is_async_storage,
            is_component_relay,
            on_update,
            ..
        } = options;
        let next_options = options.extend(
            &Options {
                // actions,
                skip_pending: is_component_relay,
                on_update: None,
                ..options
            },
            None,
        );
        if is_async_storage {
            let mut futures = FuturesUnordered::<Pin<Box<dyn Future<Output = String>>>>::new();

            for (id, components) in payload {
                for (key, value) in components {
                    let future = self
                        .store
                        .store_component(id.clone(), key.clone(), value.clone());
                    futures.push(Box::pin(future));
                }
            }
            let result = block_on(self.store.store_components(payload));
            self.merge_components_op(result, options);
            return result;
        }
        let result = self.store.store_components(payload);
        self.merge_components_op(result, options);
        return result;
    }

    fn inputs(&self) -> Inputs {
        self.get_inputs()
    }

    /**
     * Gets the inputs from the store.
     *
     * @returns The inputs from the store.
     */
    pub fn get_inputs(&self) -> Inputs {
        self.store.get_inputs()
    }

    fn actor_input_op(&mut self, id: String, payload: Value, options: Options<T>) {
        let Options {
            skip_pending,
            on_update,
            ..
        } = options;

        let new_index = self.store.store_input(id.clone(), payload);

        if !skip_pending && self.pending.is_some() {
            self.pending.actor_input(id.clone(), new_index);
        }

        if let Some(events) = &self.events {
            events.emit("actorInput", (&id, &payload, new_index));
        }

        if let Some(on_update_fn) = on_update {
            on_update_fn();
        }
    }

    /**
     * Handles actor input with the given id, payload, and options.
     *
     * @param {string} id - The id of the actor.
     * @param {any} payload - The payload for the actor input.
     * @param {Options} options - The options for handling the actor input.
     */
    pub fn actor_input(&mut self, id: String, payload: Value, tick: i32, options: Options<T>) {
        let Options {
            is_async_storage, ..
        } = options;
        if is_async_storage {
            let result = block_on(self.store.store_input(id, payload));
            self.actor_input_op(id, payload, options);
            return result;
        }
        let result = self.store.store_input(id, payload);
        self.actor_input_op(id, payload, options);
        return result;
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
    pub fn get_symbol(&self, index: i32, options: Options<T>) -> Option<String> {
        let symbol = self.symbols.get(index);
        let actions = options.actions;

        if symbol.is_none() {
            let fetch_symbol = actions.get("fetch_symbol");
            let symbol_tuple = fetch_symbol(symbol, self, options);
            return Some(symbol_tuple.0);
        }

        symbol
    }

    /**
     * Adds a symbol with the given symbol and options.
     */
    pub fn add_symbol(&mut self, symbol: String, options: Options<T>) -> Option<i32> {
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
    pub fn fetch_symbol(
        &mut self,
        payload: String,
        options: Options<T>,
        on_match: fn(symbol_tuple: (String, i32)),
    ) -> (String, i32) {
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
    pub fn merge_symbol(&mut self, payload: String, options: Options<T>) {
        self.symbols.merge(payload);

        if (options.is_symbol_leader || options.is_symbol_relay)
            && !options.skip_pending
            && self.pending.is_some()
        {
            self.pending.add_symbol(payload);
        }

        if let Some(on_update) = options.on_update {
            on_update();
        }
    }

    /**
     * Resets symbols with the given payload and options.
     */
    pub fn reset_symbols(&mut self, payload: String, options: Options<T>) {
        self.symbols.reset(payload);

        if (options.is_symbol_leader || options.is_symbol_relay)
            && !options.skip_pending
            && self.pending.is_some()
        {
            self.pending.replace_symbols(payload);
        }

        if let Some(on_update) = options.on_update {
            on_update();
        }
    }

    /**
     * Resets the pending state.
     */
    pub fn reset_pending(&mut self) {
        self.pending.reset_pending();
    }
}
