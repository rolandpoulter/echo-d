use crate::context::Context;
use crate::options::Options;
use crate::symbols::extract_symbol;
// use crate::hash::HashMap;
use crate::types::{
    Actions as ActionsObject,
    // Payload,
};

/**
 * The Payload struct represents the payload for an entity action.
 */
struct Payload {
    // Define the properties of your payload here
}

/**
 * Struct representing actions that can be performed on entities.
 * This struct encapsulates the logic for creating, merging, and removing entities.
 */
pub trait EntityActions<T> {//}

// impl EntityActions {
    /**
     * Creates a new entity in the current context.
     */
    fn create_entity(id: &String, context: &Context<T>, options: &Options<T>) {
        let Options { compress_strings_as_ints, .. } = options;

        if id.is_empty() {
            return;
        }

        if *compress_strings_as_ints {
            // TODO: Implement extract_symbol function
            // id = extract_symbol(id, context, options);
            if id.is_empty() {
                return;
            }
        }

        context.create_entity(&id, &options);
    }

    /**
     * Retrieves entities from the current context.
     */
    fn entities(_: &String, context: &Context<T>, options: &Options<T>) {
        let Options { responder, enum_default_symbols, .. } = options;

        // TODO: allow a queryies by compnent values using defined indexes, for example lookup actors by position

        // TODO: paginate large sets of actors

        let entities = &context.entities;
        (responder)(&[enum_default_symbols.merge_entities, entities], None);
    }

    /**
     * Merges entities into the current context.
     */
    fn merge_entities(payload: &Payload, context: &Context<T>, options: &Options<T>) {
        context.merge_entities(&payload, &options);
    }

    /**
     * Removes an entity from the current context.
     */
    fn remove_entity(id: &String, context: &Context<T>, options: &Options<T>) {
        let Options { compress_strings_as_ints, .. } = options;

        if id.is_empty() {
            return;
        }

        if *compress_strings_as_ints {
            id = extract_symbol(&id, &context, &options);
            if id.is_empty() {
                return;
            }
        }

        context.remove_entity(&id, &options);
    }
}

// struct Actions;
// impl EntityActions for Actions {}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("createEntity"),
        Box::new(EntityActions::create_entity),
    );
    actions.insert(
        &String::from("entities"),
        Box::new(EntityActions::entities),
    );
    actions.insert(
        &String::from("mergeEntities"),
        Box::new(EntityActions::merge_entities),
    );
    actions.insert(
        &String::from("removeEntity"),
        Box::new(EntityActions::remove_entity),
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
