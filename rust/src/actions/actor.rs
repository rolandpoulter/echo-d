use serde_json::{Value, json};
use crate::context::Context;
use crate::options::Options;
use crate::string::str;
use crate::symbols::extract_symbol;
// use crate::hash::HashMap;
// use crate::types::ActorPayload;
use crate::types::{
    // Action,
    Actions as ActionsObject,
    // ActorsPayload,
    // InputPayload,
};

/**
 * The ActorActions struct represents actions that can be performed on actors.
 * This struct encapsulates the logic for merging, spawning, removing, and handling input for actors.
 */
pub trait ActorActions {
    /**
     * Handles input for a specific actor in the current context.
     */
    fn actor_input(payload: &Value, context: &Context, options: &Options) {
        let Options {
            compress_strings_as_ints,
            get_actor_id,
            ..
        } = options;

        let id = payload.get("id");
        if id.is_none() {
            return;
        }

        let id = if *compress_strings_as_ints {
            let id = extract_symbol::<String>(id.unwrap().as_i64().unwrap() as u32, context, options);
            if id.is_empty() {
                None
            } else {
                Some(&Value::String(*id))
            }
        } else {
            id
        };
        
        if id.is_none() {
            return;
        }
        
        let id = id.unwrap();

        if id.is_null() || id.as_str().unwrap().is_empty() {
            return;
        }

        if payload.get("id").is_none() {
            payload.as_object_mut().unwrap().insert(*str("id"), *id);
        }
        
        let id = get_actor_id(id, &context).unwrap();
        let tick = 0;
        context.actor_input(id, &payload, tick, &options);
    }

    /**
     * Retrieves actors from the current context and sends them to the responder.
     */
    fn actors(_payload: &Value, context: &Context, options: &Options) {
        let Options {
            responder,
            enum_default_symbols,
            ..
        } = options;

        let symbols = context.symbols;
        let merge_actors_symbol = symbols.find(str("mergeActors")).unwrap();

        let actors = context.get_actors(None, None);
        responder(
            &json!([merge_actors_symbol, actors]),
            None
        );
    }

    /**
     * Merges actors into the current context.
     */
    fn merge_actors(payload: &Value, context: &Context, options: &Options) {
        let array = payload.as_array().unwrap();
        let vec = array.iter().map(|v| str(v.as_str().unwrap())).collect::<Vec<&String>>();
        context.merge_actors(&vec, &options);
    }

    /**
     * Removes an actor from the current context.
     */
    fn remove_actor(id: &Value, context: &Context, options: &Options) {
        let Options {
            compress_strings_as_ints,
            get_actor_id,
            ..
        } = options;

        let id = if *compress_strings_as_ints {
            let id = extract_symbol::<String>(id.as_i64().unwrap() as u32, context, options);
            if id.is_empty() {
                None
            } else {
                Some(&Value::String(*id))
            }
        } else {
            Some(id)
        };
        
        if id.is_none() {
            return;
        }

        let id = id.unwrap();

        if id.is_null() || id.as_str().unwrap().is_empty() {
            return;
        }
        
        let id = get_actor_id(&id, &context).unwrap();
        context.remove_actor(id, &options);
    }

    /**
     * Spawns a new actor in the current context.
     */
    fn spawn_actor(id: &Value, context: &Context, options: &Options) {
        let Options {
            compress_strings_as_ints,
            get_actor_id,
            ..
        } = options;

        let id = if *compress_strings_as_ints {
            let id = extract_symbol::<String>(id.as_i64().unwrap() as u32, context, options);
            if id.is_empty() {
                None
            } else {
                Some(&Value::String(*id))
            }
        } else {
            Some(id)
        };
        
        if id.is_none() {
            return;
        }

        let id = id.unwrap();

        if id.is_null() || id.as_str().unwrap().is_empty() {
            return;
        }

        let id = get_actor_id(&id, &context).unwrap();
        context.spawn_actor(id, &options);
    }
}

pub struct Actions {}

impl ActorActions for Actions {}

// pub const ACTIONS: ActorActions = ActorActions {};

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        str("actorInput"),
        Box::new(&(Actions::actor_input as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("actors"),
        Box::new(&(Actions::actors as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("mergeActors"),
        Box::new(&(Actions::merge_actors as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("removeActor"),
        Box::new(&(Actions::remove_actor as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("spawnActor"),
        Box::new(&(Actions::spawn_actor as fn(&Value, &Context, &Options))),
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
