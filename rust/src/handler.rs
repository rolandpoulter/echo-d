use promises::Promise;
use serde_json::Value;
use std::any::Any;
use std::error::Error;

// use crate::hash::HashMap;
use crate::context::Context;
use crate::options::{Options, OptionsInput};
use crate::storage::Store;
use crate::string::str;
use crate::symbols::Symbols;
use crate::updater::updater;
// use crate::constants::PayloadSize;
use crate::types::{
    Action,
    ActionInput,
    Actions as ActionsHashMap,
    // ExtendOptions,
    // Message,
    // MessageArray,
    // Messages,
    // Payload,
    // Value
    // Symbols as SymbolsHashMap,
    PayloadSize,
    PromiseOrValue,
    // Promise,
    // PromiseOrValue,
    Query,
    // ValueEnum,
};

/**
 * Gets the symbol action.
 *
 * @param action - The action.
 * @param symbols - The symbols.
 * @returns The symbol action.
 */
pub fn get_symbol_action<'a>(symbol: ActionInput, symbols: &Symbols) -> &'a String {
    match symbol {
        ActionInput::String(string) => &string,
        ActionInput::Number(number) => {
            if let Some(symbol) = symbols.get(number as usize) {
                return &symbol.to_string();
            }
            &number.to_string()
        }
    }
}

/**
 * The void action function.
 */
// pub fn void_action_fn() {}

/**
 * Gets the action handler.
 *
 * @param action - The action.
 * @param options - The options.
 * @returns The action handler, and the symbol action.
 */
pub fn get_action_handler<'a>(
    action: Action,
    actions: &ActionsHashMap,
    symbols: &Symbols,
) -> (Option<Box<dyn Any>>, Option<&'a String>) {
    if actions.is_empty() {
        return (None, None);
    }
    let symbol = get_symbol_action(ActionInput::String(action), symbols);
    if let Some(action_fn) = actions.get(&action) {
        return (Some(*action_fn), Some(symbol));
    }
    (None, None)
}

/**
 * Handles a single message.
 *
 * @param message - The message to handle.
 * @param context - The context for the handler.
 * @param options - The options for the handler.
 */
pub fn one_handler(message: &Value, context: &Context, options: &Options) {
    let (handler, payload) = match message {
        Value::Array(msg) => {
            if let Some(action) = msg[0].as_str() {
                let (handler, _) =
                    get_action_handler(str(action), &options.actions, &context.symbols);
                (handler, msg[1])
            } else {
                (None, Value::Null)
            }
        }
        Value::Object(msg) => {
            let (handler, _) = get_action_handler(
                str(msg.get("action").unwrap().as_str().unwrap()),
                &options.actions,
                &context.symbols,
            );
            let payload = msg.get("payload").unwrap_or(&Value::Null);
            (handler, *payload)
        }
        _ => (None, Value::Null),
    };

    if let Some(handler) = handler {
        let execute_handler = handler.downcast_ref::<fn(&Value, &Context, &Options)>();
        if let Some(execute_handler) = execute_handler {
            execute_handler(&payload, context, options);
        }
    }
}

/**
 * Handles multiple messages.
 *
 * @param messages - The messages to handle.
 * @param context - The context for the handler.
 * @param options - The options for the handler.
 */
pub fn many_handler(messages: &Value, context: &Context, options: &Options) {
    let batch_action_payload_sizes = &options.batch_action_payload_sizes;
    let is_ordered = &options.is_ordered;

    // let action_handler = get_action_handler(&context, &options.actions, &context.symbols);

    let iterator = |payload: &Value,
                    handler: &dyn Any, // fn(&Value, &Context, &Options),
                    payload_size: i8,
                    offset: u32| {
        // if handler.is_none() {
        //     return;
        // }

        let execute_handler = handler
            // .unwrap()
            .downcast_ref::<fn(&Value, &Context, &Options)>()
            .unwrap();

        let array = payload.as_array().unwrap();
        let length = array.len() as u32;

        if length == offset && payload_size == offset as i8 {
            execute_handler(&Value::Null, context, options);
        } else {
            for i in (0..array.len()).step_by(payload_size as usize) {
                if payload_size == 1 {
                    execute_handler(&payload[i], context, options);
                } else if let Some(payload_slice) = array.get(i..(i + payload_size as usize)) {
                    execute_handler(&Value::Array(payload_slice.to_vec()), context, options);
                } else {
                    // println!("BATCH MISMATCH");
                }
            }
        }
    };

    fn get_payload_size(symbol: &String, options: &Options) -> i8 {
        let batch_action_payload_sizes = options.batch_action_payload_sizes;
        let payload_size = batch_action_payload_sizes.get(&symbol); // .cloned().unwrap_or(1);
        if payload_size.is_none() {
            return 1;
        }
        match payload_size.unwrap() {
            PayloadSize::Number(payload_size) => *payload_size,
            PayloadSize::Object(payload_size) => {
                let is_ordered = options.is_ordered;
                let enable_rollback = options.enable_rollback;
                match (
                    is_ordered,
                    payload_size.rollback,
                    enable_rollback,
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
        Value::Array(msg) => {
            let first = msg[0];
            match first {
                Value::Object(_) => {
                    for m in msg {
                        many_handler(&m, &context, &options);
                    }
                }
                _ => {
                // Value::Array(_) => {
                    let action = str(msg[0].as_str().unwrap());
                    let (handler, symbol) =
                        get_action_handler(action, &options.actions, &context.symbols);
                    if let (Some(handler), Some(symbol)) = (handler, symbol) {
                        let payload_size = get_payload_size(symbol, options);
                        iterator(messages, &handler, payload_size, 1);
                    }
                }
                // _ => {}
            }
        }
        Value::Object(msg) => {
            let (handler, symbol) = get_action_handler(
                str(msg.get("action").unwrap().as_str().unwrap()),
                &options.actions,
                &context.symbols
            );
            if let (Some(handler), Some(symbol)) = (handler, symbol) {
                let payload_size = get_payload_size(symbol, options);
                iterator(&msg.get("payload").unwrap(), &handler, payload_size, 0);
            }
        }
        _ => {}
    };
}

pub struct Handler<'a> {
    context: &'a Context<'a>,
    options: &'a Options<'a>,
}

impl<'a> Handler<'a> {
    pub fn new(context: &Context, options: &Options) -> Handler<'a> {
        Handler { context, options }
    }

    // pub fn get_context(&self) -> &Context { &self.context; }
    // pub fn get_options(&self) -> &Options { &self.options; }

    pub fn get_store(&self) -> &dyn Store {
        self.context.store
    }

    pub fn one(&self, message: &Value) {
        one_handler(&message, &self.context, &self.options);
    }

    pub fn many(&self, messages: &Value) {
        many_handler(&messages, &self.context, &self.options);
    }

    pub fn get_action_handler<'b>(&self, action: Action) -> (Option<Box<dyn Any>>, Option<&'a String>) {
        get_action_handler(action, &self.options.actions, &self.context.symbols)
    }

    pub fn get_symbol_action(&self, action: &str) -> &String {
        let action = ActionInput::String(str(action));
        get_symbol_action(action, &self.context.symbols)
    }

    pub fn updater<'b>(
        &self,
        extend_options: Option<&OptionsInput>,
        tick: i32,
    ) -> Promise<Vec<&'b Value>, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = &self.options.extend(extend_options, None);
            updater(&self.context, &extend_options, tick)
        } else {
            updater(&self.context, &self.options, tick)
        }
    }

    pub fn spawn_actor(
        &self,
        id: &String,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context.spawn_actor(&id, &extend_options)
        } else {
            self.context.spawn_actor(&id, self.options)
        }
    }

    pub fn remove_actor(
        &self,
        id: &String,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context.remove_actor(&id, &extend_options)
        } else {
            self.context.remove_actor(&id, self.options)
        }
    }

    pub fn actor_input(
        &self,
        id: &String,
        input: &Value,
        tick: i32,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<u32, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context.actor_input(id, input, tick, &extend_options)
        } else {
            self.context.actor_input(id, input, tick, self.options)
        }
    }

    pub fn create_entity(
        &self,
        id: &String,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context.create_entity(&id, &extend_options)
        } else {
            self.context.create_entity(&id, self.options)
        }
    }

    pub fn remove_entity(
        &self,
        id: &String,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context.remove_entity(&id, &extend_options)
        } else {
            self.context.remove_entity(&id, self.options)
        }
    }

    pub fn upsert_component(
        &self,
        id: &String,
        key: &String,
        value: &Value,
        tick: i32,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<(), Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context
                .upsert_component(&id, &key, &value, tick, &extend_options)
        } else {
            self.context
                .upsert_component(&id, &key, &value, tick, self.options)
        }
    }

    pub fn change_component(
        &self,
        id: &String,
        key: &String,
        value: &Value,
        tick: i32,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<(), Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context
                .change_component(id, key, value, tick, &extend_options)
        } else {
            self.context
                .change_component(id, key, value, tick, self.options)
        }
    }

    pub fn remove_component(
        &self,
        id: &String,
        key: &String,
        extend_options: Option<&OptionsInput>,
    ) -> PromiseOrValue<bool, Box<dyn Error + Send>> {
        if let Some(extend_options) = extend_options {
            let extend_options = self.options.extend(extend_options, None);
            self.context.remove_component(id, key, &extend_options)
        } else {
            self.context.remove_component(id, key, self.options)
        }
    }

    pub fn query_components(&self, query: Query) -> &Vec<&String> {
        let store = self.context.store;

        store.query_components(query)
    }
}
