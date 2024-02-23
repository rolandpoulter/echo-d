use serde_json::{Value, json};

// use crate::hash::HashMap;
use crate::string::str;
use crate::context::Context;
use crate::options::Options;
// use crate::storage::Storage;
use crate::symbols::extract_symbol;
use crate::types::{
    Actions as ActionsObject,
    // EntityPayload,
};

/**
 * Struct representing actions that can be performed on entities.
 * This struct encapsulates the logic for creating, merging, and removing entities.
 */
pub trait EntityActions {//}

// impl EntityActions {
    /**
     * Creates a new entity in the current context.
     */
    fn create_entity(id: &Value, context: &Context, options: &Options) {
        let Options { compress_strings_as_ints, .. } = options;

        if id.is_null() {
            return;
        }

        if *compress_strings_as_ints {
            // TODO: Implement extract_symbol function
            let id = extract_symbol::<String>(id.as_i64().unwrap() as u32, context, options);
            if id.is_empty() {
                return;
            }
            // let id = Value::String(*id);
            context.create_entity(id, options);
        } else {
            context.create_entity(&id.as_str().unwrap().to_string(), options);
        }
    }

    /**
     * Retrieves entities from the current context.
     */
    fn entities(_: &Value, context: &Context, options: &Options) {
        let Options { responder, enum_default_symbols, .. } = options;

        // TODO: allow a queryies by compnent values using defined indexes, for example lookup actors by position

        // TODO: paginate large sets of actors

        let symbols = context.symbols;
        let merge_entities_symbol = symbols.find(str("mergeEntities")).unwrap();

        let entities = &context.get_entities(None, None);
        (responder)(&json!([merge_entities_symbol, entities]), None);
    }

    /**
     * Merges entities into the current context.
     */
    fn merge_entities(payload: &Value, context: &Context, options: &Options) {
        let array = payload.as_array().unwrap();
        let vec = array.iter().map(|v| str(v.as_str().unwrap())).collect::<Vec<&String>>();
        context.merge_entities(&vec, options);
    }

    /**
     * Removes an entity from the current context.
     */
    fn remove_entity(id: &Value, context: &Context, options: &Options) {
        let Options { compress_strings_as_ints, .. } = options;

        if id.is_null() {
            return;
        }

        if *compress_strings_as_ints {
            let id = extract_symbol::<String>(id.as_i64().unwrap() as u32, context, options);
            if id.is_empty() {
                return;
            }
            context.remove_entity(id, options);
        } else {
            context.remove_entity(&id.as_str().unwrap().to_string(), options);
        }
    }
}

struct Actions;

impl EntityActions for Actions {}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("createEntity"),
        Box::new(&(Actions::create_entity as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("entities"),
        Box::new(&(Actions::entities as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("mergeEntities"),
        Box::new(&(Actions::merge_entities as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("removeEntity"),
        Box::new(&(Actions::remove_entity as fn(&Value, &Context, &Options))),
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
