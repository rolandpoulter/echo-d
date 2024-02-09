use hash::HashMap;
use context::Context;
use options::Options;
use serde_json::Value;


/**
 * The Message enum represents a message with an action and a payload.
 * It can be an array of values with the first value being considered the action, and the remaining the payload.
 * Or it can be an object with an action and a payload.
 */
pub enum Message {
    Array(Vec<Value>),
    Object(MessageObject),
}

/**
 * The Messages enum represents one or more messages with actions and a payloads.
 */
pub enum Messages {
    Array(MessageArray),
    Object(MessageObject),
}

/**
 * The MessageArray struct represents a list of messages
 */
pub enum MessageArray {
    Tuple(Vec<Value>),
    Messages(Vec<Message>),
    Message(Message),
}

/**
 * The MessageObject struct represents a message with an action and a payload.
 */
pub struct MessageObject {
    action: String,
    payload: Payload,
}

/**
 * The Payload enum represents the payload of a message.
 */
pub enum Payload {
    Array(Vec<Value>),
    Object(Value),
}

/**
 * Gets the symbol action.
 *
 * @param action - The action.
 * @param default_symbols - The default symbols.
 * @returns The symbol action.
 */
pub fn get_symbol_action(action: &str, default_symbols: &HashMap<u32, String>) -> String {
    if let Some(symbol) = default_symbols.get(&(action.parse::<u32>().unwrap())) {
        return symbol.clone();
    }
    action.to_string()
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
pub fn get_action_handler(action: str, options: Options) -> impl Fn(&str) -> () {
    let actions: HashMap = &options.actions;
    let default_symbols: HashMap = &options.default_symbols;
    if ( actions.is_none()
      || actions.is_empty()
      || default_symbols.is_none()
      || default_symbols.is_empty()
      || action.is_none()
      || action.is_empty()
    ) {
        return (void_action_fn, ("").to_string());
    }
    let symbol = get_symbol_action(action, default_symbols);
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
pub fn one_handler(message: Message, context: Context, options: Options) {
    let (handler, payload) = match type_of(message) {
        Message::Array(msg) => {
            let (handler, _) = get_action_handler(msg[0], options);
            (handler, msg[1])
        }
        Message::Object(msg) => {
            let (handler, _) = get_action_handler(msg.action, options);
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
pub fn many_handler(messages: Messages, context: Context, options: Options) {
    let batch_action_payload_sizes = options.batch_action_payload_sizes;
    let action_handler = get_action_handler(context, options);

    let iterator = |payload: Payload, handler: &dyn Fn(Value, Context, Options), payloadSize: i8, offset: i32| {
        let action = handler.action.clone();
        let payload_size = batch_action_payload_sizes.get(&action).cloned().unwrap_or(1);

        for i in (0..payload.len()).step_by(payload_size as usize) {
            if payload_size == 1 {
                handler(payload[i].clone());
            } else if let Some(payload_slice) = payload.get(i..(i + payload_size as usize)) {
                handler(payload_slice.to_vec());
            } else {
                // println!("BATCH MISMATCH");
            }
        }
    };

    if let Some(message) = message.first() {
        if let Some(handler) = action_handler(&message.action) {
            iterator(&message.payload, &handler);
        }
    }
}

// fn main() {
//     let message = Message {
//         action: "action".to_string(),
//         payload: serde_json::json!({}),
//     };
//     let context = Context {};
//     let options = Options::new();

//     one_handler(&message, &context, &options);
// }
