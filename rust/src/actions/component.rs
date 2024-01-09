use crate::options::{Options, Options};
use crate::symbols::{extract_symbol, recursive_symbol_extraction};
use crate::context::Context;

/**
 * The Payload struct represents the payload for a component action.
 */
struct Payload {
    id: String,
    key: String,
    value: String,
}

/**
 * The ComponentActions struct encapsulates the logic for merging, retrieving, and changing components.
 */
struct ComponentActions {}

impl ComponentActions {
    /**
     * Changes a component in the current context.
     */
    fn change_component(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = &payload.id;
        let key = &payload.key;
        let value = &payload.value;

        if id.is_empty() || key.is_empty() {
            return;
        }

        let id = if compress_strings_as_ints {
            extract_symbol(id, context, options)
        } else {
            id.to_owned()
        };

        let key = if compress_strings_as_ints {
            extract_symbol(key, context, options)
        } else {
            key.to_owned()
        };

        let value = if compress_strings_as_ints {
            recursive_symbol_extraction(key, value, context, options)
        } else {
            value.to_owned()
        };

        context.change_component(&id, &key, &value);
    }

    /**
     * Retrieves components from the current context and sends them to the responder.
     */
    fn components(&self, message: &str, context: &dyn Context, options: &Options) {
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;

        if let Ok(ids) = serde_json::from_str::<Vec<String>>(message) {
            // TODO: return only the given ids
        }

        // TODO: paginate the responder calls for better performance on large sets
        let components = context.components();
        responder([enum_defaultSymbols.mergeComponents, components]);
    }

    /**
     * Merges components into the current context.
     */
    fn merge_components(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        context.merge_components(payload);
    }

    /**
     * Removes a component from the current context.
     */
    fn remove_component(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = &payload.id;
        let key = &payload.key;

        if id.is_empty() || key.is_empty() {
            return;
        }

        let id = if compress_strings_as_ints {
            extract_symbol(id, context, options)
        } else {
            id.to_owned()
        };

        let key = if compress_strings_as_ints {
            extract_symbol(key, context, options)
        } else {
            key.to_owned()
        };

        context.remove_component(&id, &key);
    }

    /**
     * Inserts a new component or updates an existing one in the current context.
     */
    fn upsert_component(&self, payload: &Payload, context: &dyn Context, options: &Options) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = &payload.id;
        let key = &payload.key;
        let value = &payload.value;

        if id.is_empty() || key.is_empty() {
            return;
        }

        let id = if compress_strings_as_ints {
            extract_symbol(id, context, options)
        } else {
            id.to_owned()
        };

        let key = if compress_strings_as_ints {
            extract_symbol(key, context, options)
        } else {
            key.to_owned()
        };

        let value = if compress_strings_as_ints {
            recursive_symbol_extraction(key, value, context, options)
        } else {
            value.to_owned()
        };

        context.upsert_component(&id, &key, &value);
    }
}

/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions struct.
 */
pub const ACTIONS: ComponentActions = ComponentActions {};
