// use std::any::Any;

use crate::context::Context;
use crate::options::Options;
use crate::symbols::extract_symbol;
// use crate::hash::HashMap;
// use crate::types::ActorPayload;
use crate::types::{
    // Action,
    Actions as ActionsObject,
    ActorsPayload,
    InputPayload,
};

/**
 * The ActorActions struct represents actions that can be performed on actors.
 * This struct encapsulates the logic for merging, spawning, removing, and handling input for actors.
 */
pub trait ActorActions<T> {
    //}

    // impl ActorActions {
    /**
     * Handles input for a specific actor in the current context.
     */
    fn actor_input(payload: &InputPayload, context: &Context<T>, options: &Options<T>) {
        let Options {
            compress_strings_as_ints,
            get_actor_id,
            ..
        } = options;

        let mut id = get_actor_id(&payload, &context);
        if id.is_none() || id.unwrap().is_empty() {
            return;
        }

        if *compress_strings_as_ints {
            id = extract_symbol(id.unwrap(), context, options);
            if id.unwrap().is_empty() {
                return;
            }
        }

        if payload.id.is_none() {
            payload.id = id;
        }

        let tick = 0;
        context.actor_input(&id, &payload, tick, &options);
    }

    /**
     * Retrieves actors from the current context and sends them to the responder.
     */
    fn actors(_payload: Option<()>, context: &Context<T>, options: &Options<T>) {
        let Options {
            responder,
            enum_default_symbols,
            ..
        } = options;

        let actors = context.actors;
        responder([enum_default_symbols.mergeActors, actors], None);
    }

    /**
     * Merges actors into the current context.
     */
    fn merge_actors(payload: &ActorsPayload, context: &Context<T>, options: &Options<T>) {
        context.merge_actors(&payload, &options);
    }

    /**
     * Removes an actor from the current context.
     */
    fn remove_actor(id: String, context: &Context<T>, options: &Options<T>) {
        let Options {
            compress_strings_as_ints,
            get_actor_id,
            ..
        } = options;

        let mut id = get_actor_id(&id, &context);
        if id.is_none() || id.unwrap().is_empty() {
            return;
        }

        if compress_strings_as_ints {
            id = extract_symbol(id.unwrap(), &context, &options);
            if id.unwrap().is_empty() {
                return;
            }
        }

        context.remove_actor(id.unwrap(), &options);
    }

    /**
     * Spawns a new actor in the current context.
     */
    fn spawn_actor(id: &String, context: &Context<T>, options: &Options<T>) {
        let Options {
            compress_strings_as_ints,
            get_actor_id,
            ..
        } = options;

        let mut id = get_actor_id(&id, &context);
        if id.is_none() || id.unwrap().is_empty() {
            return;
        }

        if compress_strings_as_ints {
            id = extract_symbol(id.unwrap(), context, options);
            if id.unwrap().is_empty() {
                return;
            }
        }

        context.spawn_actor(&id, &options);
    }
}

// pub struct Actions {}
// impl ActorActions for Actions {}
// pub const ACTIONS: ActorActions = ActorActions {};

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("actorInput"),
        Box::new(ActorActions::actor_input),
    );
    actions.insert(
        &String::from("actors"),
        Box::new(ActorActions::actors),
    );
    actions.insert(
        &String::from("mergeActors"),
        Box::new(ActorActions::merge_actors),
    );
    actions.insert(
        &String::from("removeActor"),
        Box::new(ActorActions::remove_actor),
    );
    actions.insert(
        &String::from("spawnActor"),
        Box::new(ActorActions::spawn_actor),
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
