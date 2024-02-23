use serde_json::{Value, json};

// use crate::hash::HashMap;
use crate::string::str;
use crate::context::Context;
use crate::options::Options;
// use crate::storage::Storage;
use crate::symbols::{extract_symbol, recursive_symbol_extraction};
use crate::types::{
    Actions as ActionsObject,
    // ComponentPayload,
    // ComponentTarget,
    // ComponentsPayload
};

/**
 * The ComponentActions struct encapsulates the logic for merging, retrieving, and changing components.
 */
pub trait ComponentActions {
    //}

    // impl ComponentActions {
    /**
     * Changes a component in the current context.
     */
    fn change_component(payload: &Value, context: &Context, options: &Options) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = payload.get(0); // .unwrap(); // .as_str().unwrap();
        let key = payload.get(1); // .unwrap(); // .as_str().unwrap();
        let value = payload.get(2); // .unwrap();

        if id.is_none() || key.is_none() || value.is_none() {
            return;
        }

        let id = if compress_strings_as_ints {
            let id = key.unwrap().as_i64().unwrap() as u32;
            extract_symbol::<String>(id, &context, &options)
        } else {
            let id = id.unwrap().as_str().unwrap();
            str(id)
        };

        if id.is_empty() {
            return;
        }

        let key = if compress_strings_as_ints {
            let key = key.unwrap().as_i64().unwrap() as u32;
            extract_symbol::<String>(key, &context, &options)
        } else {
            let key = key.unwrap().as_str().unwrap();    
            str(key)
        };

        if key.is_empty() {
            return;
        }

        let value = if compress_strings_as_ints {
            recursive_symbol_extraction(key, value.unwrap(), &context, &options)
        } else {
            let value = *value.unwrap();
            Box::new(value)
        };

        let tick = 0; // TODO: payload[3]
        context.change_component(id, key, &value, tick, options);
    }

    /**
     * Retrieves components from the current context and sends them to the responder.
     */
    fn components(message: &Value, context: &Context, options: &Options) {
        let responder = options.responder;
        let enum_default_symbols = options.enum_default_symbols;

        // if let Ok(ids) = serde_json::from_str::<Vec<String>>(message) {
        //     // TODO: return only the given ids
        // }
        let symbols = context.symbols;
        let merge_components_symbol = symbols.find(str("mergeComponents")).unwrap();

        // TODO: paginate the responder calls for better performance on large sets
        let components = context.components();
        responder(&json!([merge_components_symbol, components]), None);
    }

    /**
     * Merges components into the current context.
     */
    fn merge_components(payload: &Value, context: &Context, options: &Options) {
        // let array = payload.as_array().unwrap();
        // let vec = array.iter().map(|v| str(v.as_str().unwrap())).collect::<Vec<&String>>();
        context.merge_components(payload, options);
    }

    /**
     * Removes a component from the current context.
     */
    fn remove_component(payload: &Value, context: &Context, options: &Options) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = payload.get(0); // .unwrap(); // .as_str().unwrap();
        let key = payload.get(1); // .unwrap(); // .as_str().unwrap();

        if id.is_none() || key.is_none() {
            return;
        }

        let id = if compress_strings_as_ints {
            let id = key.unwrap().as_i64().unwrap() as u32;
            extract_symbol::<String>(id, &context, &options)
        } else {
            let id = id.unwrap().as_str().unwrap();
            str(id)
        };

        if id.is_empty() {
            return;
        }

        let key = if compress_strings_as_ints {
            let key = key.unwrap().as_i64().unwrap() as u32;
            extract_symbol::<String>(key, &context, &options)
        } else {
            let key = key.unwrap().as_str().unwrap();    
            str(key)
        };

        if key.is_empty() {
            return;
        }

        context.remove_component(&id, &key, options);
    }

    /**
     * Inserts a new component or updates an existing one in the current context.
     */
    fn upsert_component(payload: &Value, context: &Context, options: &Options) {
        let compress_strings_as_ints = options.compress_strings_as_ints;

        let id = payload.get(0); // .unwrap(); // .as_str().unwrap();
        let key = payload.get(1); // .unwrap(); // .as_str().unwrap();
        let value = payload.get(2); // .unwrap();

        if id.is_none() || key.is_none() || value.is_none() {
            return;
        }

        let id = if compress_strings_as_ints {
            let id = key.unwrap().as_i64().unwrap() as u32;
            extract_symbol::<String>(id, &context, &options)
        } else {
            let id = id.unwrap().as_str().unwrap();
            str(id)
        };

        if id.is_empty() {
            return;
        }

        let key = if compress_strings_as_ints {
            let key = key.unwrap().as_i64().unwrap() as u32;
            extract_symbol::<String>(key, &context, &options)
        } else {
            let key = key.unwrap().as_str().unwrap();    
            str(key)
        };

        if key.is_empty() {
            return;
        }

        let value = if compress_strings_as_ints {
            recursive_symbol_extraction(key, value.unwrap(), &context, &options)
        } else {
            let value = *value.unwrap();
            Box::new(value)
        };

        let tick = 0;
        context.upsert_component(&id, &key, &value, tick, options);
    }
}

pub struct Actions {}

impl ComponentActions for Actions {}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        str("changeComponent"),
        Box::new(&(Actions::change_component as fn(&Value, &Context, &Options)))
    );
    actions.insert(
        str("components"),
        Box::new(&(Actions::components as fn(&Value, &Context, &Options)))
    );
    actions.insert(
        str("mergeComponents"),
        Box::new(&(Actions::merge_components as fn(&Value, &Context, &Options)))
    );
    actions.insert(
        str("removeComponent"),
        Box::new(&(Actions::remove_component as fn(&Value, &Context, &Options)))
    );
    actions.insert(
        str("upsertComponent"),
        Box::new(&(Actions::upsert_component as fn(&Value, &Context, &Options)))
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
