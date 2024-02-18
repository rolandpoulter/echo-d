// use std::any::Any;
use std::error::Error;
use promises::Promise;
use serde_json::Value;

// use crate::hash::HashMap;
use crate::context::Context;
use crate::options::Options;
use crate::storage::Storage;
use crate::symbols::Symbols;
use crate::updater::updater;
// use crate::constants::PayloadSize;
use crate::types::{
    Action,
    Actions as ActionsHashMap,
    ExtendOptions,
    Message,
    MessageArray,
    Messages,
    Payload,
    // Value
    // Symbols as SymbolsHashMap,
    PayloadSize,
    PromiseOrValue,
    // Promise,
    // PromiseOrValue,
    Query, ValueEnum,
};

/**
 * Gets the symbol action.
 *
 * @param action - The action.
 * @param symbols - The symbols.
 * @returns The symbol action.
 */
pub fn get_symbol_action<'a>(symbol: Action, symbols: &Symbols) -> &'a String {
    match symbol {
        Action::String(string) => {
            if string.is_none() {
                return &String::from("");
            }
            &string
        }
        Action::Number(number) => {
            if let Some(symbol) = symbols.get(number) {
                return &symbol.clone();
            }
            &symbol.to_string()
        }
    }
}

/**
 * The void action function.
 */
pub fn void_action_fn() {}

/**
 * Gets the action handler.
 *
 * @param action - The action.
 * @param options - The options.
 * @returns The action handler, and the symbol action.
 */
pub fn get_action_handler(
    action: Action,
    actions: &ActionsHashMap,
    symbols: &Symbols,
) -> Box<dyn Fn()> {
    if actions.is_none()
        || actions.is_empty()
        || symbols.is_none()
        || symbols.is_empty()
        || action.is_none()
        || action.is_empty()
    {
        return (void_action_fn, String::from(""));
    }
    let symbol = get_symbol_action(&action, symbols);
    if let Some(action_fn) = actions.get(&action) {
        return (action_fn, symbol);
    }
    (void_action_fn, symbol)
}

/**
 * Handles a single message.
 *
 * @param message - The message to handle.
 * @param context - The context for the handler.
 * @param options - The options for the handler.
 */
pub fn one_handler<T>(message: &Message, context: &Context<T>, options: &Options<T>) {
    let (handler, payload) = match message {
        Message::Array(msg) => {
            let (handler, _) = get_action_handler(&msg[0], &options.actions, &context.symbols);
            (handler, msg[1])
        }
        Message::Object(msg) => {
            let (handler, _) = get_action_handler(&msg.action, &options.actions, &context.symbols);
            (handler, msg.payload)
        }
    };

    if let Some(handler) = handler {
        handler(payload, context, options);
    }
}

/**
 * Handles multiple messages.
 *
 * @param messages - The messages to handle.
 * @param context - The context for the handler.
 * @param options - The options for the handler.
 */
pub fn many_handler<T>(messages: &Messages, context: &Context<T>, options: &Options<T>) {
    let batch_action_payload_sizes = &options.batch_action_payload_sizes;
    let is_ordered = &options.is_ordered;

    let action_handler = get_action_handler(&context, &options.actions, &context.symbols);

    let iterator = |payload: &Payload,
                    handler: &dyn Fn(Value, Context, Options),
                    payload_size: i8,
                    offset: i32| {
        let action = handler.action.clone();

        for i in (0..payload.len()).step_by(payload_size as usize) {
            if payload_size == 1 {
                handler(&payload[i]);
            } else if let Some(payload_slice) = payload.get(i..(i + payload_size as usize)) {
                handler(&payload_slice.to_vec());
            } else {
                // println!("BATCH MISMATCH");
            }
        }
    };

    fn get_payload_size<T>(symbol: &String, options: &Options<T>) -> i8 {
        let batch_action_payload_sizes = options.batch_action_payload_sizes;
        let payload_size = batch_action_payload_sizes.get(&symbol); // .cloned().unwrap_or(1);
        match payload_size {
            PayloadSize::Number(payload_size) => payload_size,
            PayloadSize::Object(payload_size) => {
                let is_ordered = options.is_ordered;
                let enabled_rollback = options.enabled_rollback;
                match (
                    is_ordered,
                    payload_size.rollback,
                    enabled_rollback,
                    payload_size.ordered,
                ) {
                    (true, Some(rollback), _, _) => rollback,
                    (_, _, true, Some(ordered)) => ordered,
                    _ => payload_size.default,
                }
            }
            _ => 1,
        }
    }

    match messages {
        Messages::Array(msg) => {
            match msg {
                MessageArray::Messages(msg) => {
                    for m in msg {
                        many_handler(&m, &context, &options);
                    }
                }
                MessageArray::Tuple(msg) => {
                    let (handler, symbol) =
                        get_action_handler(&msg.action, &options.actions, &context.symbols);
                    if let Some(handler) = handler {
                        let payload_size = get_payload_size::<T>(symbol, &options);
                        iterator(&msg.payload, &handler, payload_size, 1);
                    }
                } // MessageArray::Message(msg) => { one_handler(&msg, &context, &options); }
            }
        }
        Messages::Object(msg) => {
            let (handler, symbol) = get_action_handler(&msg[0], &options.actions, &context.symbols);
            if let Some(handler) = handler {
                let payload_size = get_payload_size::<T>(symbol, &options);
                iterator(&msg.payload, &handler, payload_size, 0);
            }
        }
    };
}

pub struct Handler<'a, T> {
    context: &'a Context<'a, T>,
    options: &'a Options<'a, T>,
}

impl<'a, T> Handler<'a, T> {
    pub fn new(context: &Context<T>, options: &Options<T>) -> Handler<'a, T> {
        Handler { context, options }
    }

    // pub fn get_context(&self) -> &Context { &self.context; }
    // pub fn get_options(&self) -> &Options { &self.options; }

    pub fn get_store(&self) -> &Storage {
        &self.context.store
    }

    pub fn one(&self, message: &Message) {
        one_handler(&message, &self.context, &self.options);
    }

    pub fn many(&self, messages: &Messages) {
        many_handler(&messages, &self.context, &self.options);
    }

    pub fn get_action_handler<'b>(&self, action: Action) -> Box<dyn Fn()> {
        get_action_handler(action, self.options.actions, self.context.symbols)
    }

    pub fn get_symbol_action(&self, action: &str) -> String {
        get_symbol_action(action, &self.options.default_symbols);
    }

    pub fn updater(
        &self,
        extend_options: &ExtendOptions<T>,
        tick: i32,
    ) -> Promise<Vec<ValueEnum>, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                updater(&self.context, &self.options, tick);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                updater(&self.context, &extend_options, tick);
            }
        }
    }

    pub fn spawn_actor(
        &self,
        id: &str,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self.context.spawn_actor(&id, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self.context.spawn_actor(&id, &extend_options);
            }
        }
    }

    pub fn remove_actor(
        &self,
        id: &str,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self.context.remove_actor(&id, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self.context.remove_actor(&id, &extend_options);
            }
        }
    }

    pub fn actor_input(
        &self,
        id: &str,
        input: &Value,
        tick: i32,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<i32, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self.context.actor_input(&id, &input, tick, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self.context.actor_input(&id, &input, tick, &extend_options);
            }
        }
    }

    pub fn create_entity(
        &self,
        id: &str,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self.context.createEntity(&id, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self.context.createEntity(&id, &extend_options);
            }
        }
    }

    pub fn remove_entity(
        &self,
        id: &str,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self.context.remove_entity(&id, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self.context.remove_entity(&id, &extend_options);
            }
        }
    }

    pub fn upsert_component(
        &self,
        id: &str,
        key: &str,
        value: &Value,
        tick: i32,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<(), Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self
                    .context
                    .upsert_component(&id, &key, &value, tick, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self
                    .context
                    .upsert_component(&id, &key, &value, tick, &extend_options);
            }
        }
    }

    pub fn change_component(
        &self,
        id: &str,
        key: &str,
        value: &Value,
        tick: i32,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<(), Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self
                    .context
                    .change_component(&id, &key, &value, tick, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self
                    .context
                    .change_component(&id, &key, &value, tick, &extend_options);
            }
        }
    }

    pub fn remove_component(
        &self,
        id: &str,
        key: &str,
        extend_options: &ExtendOptions<T>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        match extend_options {
            ExtendOptions::Empty => {
                &self.context.remove_component(&id, &key, &self.options);
            }
            ExtendOptions::Object(options) => {
                let extend_options = &self.options.extend(&extend_options, None);
                &self.context.remove_component(&id, &key, &extend_options);
            }
        }
    }

    pub fn query_components(&self, query: Query) -> &Vec<&String> {
        return self.store.query_components(query);
    }
}
