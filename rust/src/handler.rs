use hash::HashMap;
use context::Context;
use options::Options;

/**
 * The Message struct represents a message with an action and a payload.
 */
struct Message {
    action: String,
    payload: serde_json::Value,
}

/**
 * Gets the symbol action.
 *
 * @param action - The action.
 * @param default_symbols - The default symbols.
 * @returns The symbol action.
 */
fn get_symbol_action(action: &str, default_symbols: &HashMap<u32, String>) -> String {
    if let Some(symbol) = default_symbols.get(&(action.parse::<u32>().unwrap())) {
        return symbol.clone();
    }
    action.to_string()
}

/**
 * Gets the action handler.
 *
 * @param context - The context.
 * @param options - The options.
 */
fn get_action_handler(context: &Context, options: &Options) -> impl Fn(&str) -> () {
    let actions = &options.actions;
    let default_symbols = &options.default_symbols;

    move |action: &str| {
        let action = get_symbol_action(action, default_symbols);

        let handler = move |payload: serde_json::Value| {
            if let Some(action_fn) = actions.get(&action) {
                action_fn(payload, context, options);
            }
        };

        handler
    }
}

/**
 * Handles a single message.
 *
 * @param message - The message to handle.
 * @param context - The context for the handler.
 * @param options - The options for the handler.
 */
fn one_handler(message: &Message, context: &Context, options: &Options) {
    let action_handler = get_action_handler(context, options);

    if let Some(message) = message {
        if let Some(action_fn) = action_handler(&message.action) {
            action_fn(message.payload.clone());
        }
    }
}

/**
 * Handles multiple messages.
 *
 * @param message - The messages to handle.
 * @param context - The context for the handler.
 * @param options - The options for the handler.
 */
fn many_handler(message: &Vec<Message>, context: &Context, options: &Options) {
    let batch_action_payload_sizes = &options.batch_action_payload_sizes;
    let action_handler = get_action_handler(context, options);

    let iterator = |payload: &Vec<serde_json::Value>, handler: &dyn Fn(serde_json::Value)| {
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
