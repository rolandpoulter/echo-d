use crate::context::Context;
use crate::options::Options;

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
trait EntityActions {
    /**
     * Creates a new entity in the current context.
     */
    fn create_entity(&self, id: &str, context: &Context, options: &Options) {
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

        (context.create_entity)(id, options.skip_pending);
    }

    /**
     * Retrieves entities from the current context.
     */
    fn entities(&self, _: &str, context: &Context, options: &Options) {
        let Options { responder, enum_default_symbols, .. } = options;

        // TODO: allow a queryies by compnent values using defined indexes, for example lookup actors by position

        // TODO: paginate large sets of actors

        let entities = &context.entities;
        (responder)(&[enum_default_symbols.merge_entities, entities]);
    }

    /**
     * Merges entities into the current context.
     */
    fn merge_entities(&self, payload: &Payload, context: &Context, options: &Options) {
        (context.merge_entities)(payload, options);
    }

    /**
     * Removes an entity from the current context.
     */
    fn remove_entity(&self, id: &str, context: &Context, options: &Options) {
        let Options { compress_strings_as_ints, skip_pending, .. } = options;

        if id.is_empty() {
            return;
        }

        if *compress_strings_as_ints {
            id = extract_symbol(id, context, options);
            if id.is_empty() {
                return;
            }
        }

        (context.remove_entity)(id, skip_pending);
    }
}

/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions struct.
 */
struct Actions;

impl EntityActions for Actions {}

/*
fn main() {
    // Usage example
    let actions = Actions;
    let context = Context {
        create_entity: |id, skip_pending| {
            // TODO: Implement create_entity function
        },
        entities: vec![],
        merge_entities: |payload| {
            // TODO: Implement merge_entities function
        },
        remove_entity: |id, skip_pending| {
            // TODO: Implement remove_entity function
        },
    };
    let options = OptionsExtended {
        compress_strings_as_ints: true,
        enum_default_symbols: (),
        responder: |actions| {
            // TODO: Implement responder function
        },
        skip_pending: false,
    };

    actions.create_entity("entity_id", &context, &options);
    actions.entities("", &context, &options);
    actions.merge_entities(&Payload {}, &context, &options);
    actions.remove_entity("entity_id", &context, &options);
}
*/