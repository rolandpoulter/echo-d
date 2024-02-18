use crate::context::Context;
// use crate::hash::HashMap;
use crate::options::Options;
use crate::symbols::{extract_symbol, recursive_symbol_extraction};
use crate::types::{
    Actions as ActionsObject,
    ComponentPayload,
    ComponentTarget,
    ComponentsPayload
};

/**
 * The ComponentActions struct encapsulates the logic for merging, retrieving, and changing components.
 */
pub trait ComponentActions<T> {
    //}

    // impl ComponentActions {
    /**
     * Changes a component in the current context.
     */
    fn change_component(payload: &ComponentPayload, context: &Context<T>, options: &Options<T>) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = &payload.id;
        let key = &payload.key;
        let value = &payload.value;

        if id.is_empty() || key.is_empty() {
            return;
        }

        let id = if compress_strings_as_ints {
            extract_symbol(&id, &context, &options)
        } else {
            id
        };

        let key = if compress_strings_as_ints {
            extract_symbol(&key, &context, &options)
        } else {
            key
        };

        let value = if compress_strings_as_ints {
            recursive_symbol_extraction(&key, &value, &context, &options)
        } else {
            value
        };

        let tick = 0;
        context.change_component(*id, *key, *value, tick, *options);
    }

    /**
     * Retrieves components from the current context and sends them to the responder.
     */
    fn components(message: &String, context: &Context<T>, options: &Options<T>) {
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;

        if let Ok(ids) = serde_json::from_str::<Vec<String>>(message) {
            // TODO: return only the given ids
        }

        // TODO: paginate the responder calls for better performance on large sets
        let components = context.components();
        responder([enum_default_symbols.mergeComponents, components], None);
    }

    /**
     * Merges components into the current context.
     */
    fn merge_components(payload: &ComponentsPayload, context: &Context<T>, options: &Options<T>) {
        context.merge_components(payload, options);
    }

    /**
     * Removes a component from the current context.
     */
    fn remove_component(payload: &ComponentTarget, context: &Context<T>, options: &Options<T>) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = &payload.id;
        let key = &payload.key;

        if id.is_empty() || key.is_empty() {
            return;
        }

        let id = if compress_strings_as_ints {
            extract_symbol(id, context, options)
        } else {
            id
        };

        let key = if compress_strings_as_ints {
            extract_symbol(key, context, options)
        } else {
            key
        };

        context.remove_component(&id, &key, &options);
    }

    /**
     * Inserts a new component or updates an existing one in the current context.
     */
    fn upsert_component(payload: &ComponentPayload, context: &Context<T>, options: &Options<T>) {
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
            id
        };

        let key = if compress_strings_as_ints {
            extract_symbol(key, context, options)
        } else {
            key
        };

        let value = if compress_strings_as_ints {
            recursive_symbol_extraction(key, value, context, options)
        } else {
            value
        };

        let tick = 0;
        context.upsert_component(&id, &key, &value, tick, &options);
    }
}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("components"),
        Box::new(ComponentActions::components)
    );
    actions.insert(
        &String::from("changeComponent"),
        Box::new(ComponentActions::change_component)
    );
    actions.insert(
        &String::from("mergeComponents"),
        Box::new(ComponentActions::merge_components)
    );
    actions.insert(
        &String::from("removeComponent"),
        Box::new(ComponentActions::remove_component)
    );
    actions.insert(
        &String::from("upsertComponent"),
        Box::new(ComponentActions::upsert_component)
    );
}

/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
