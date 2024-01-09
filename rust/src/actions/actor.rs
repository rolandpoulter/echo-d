use crate::options::{Options, OptionsExtended};
use crate::symbols::extract_symbol;
use crate::context::Context;

/**
 * The Payload struct represents the payload for an actor action.
 */
pub struct ActorPayload {
    pub id: any,
}

/**
 * The ActorActions struct represents actions that can be performed on actors.
 * This struct encapsulates the logic for merging, spawning, removing, and handling input for actors.
 */
pub trait ActorActions {
    /**
     * Handles input for a specific actor in the current context.
     */
    pub fn actor_input(&self, payload: Payload, context: Context, options: Options) {
        let Options { compress_strings_as_ints, get_actor_id, skip_pending } = options;

        let mut id = get_actor_id(payload.id, context);
        if id.is_none() || id.unwrap().is_empty() {
            return;
        }

        if compress_strings_as_ints {
            id = extract_symbol(id.unwrap(), context, options);
            if id.unwrap().is_empty() {
                return;
            }
        }

        if payload.id.is_none() {
            payload.id = id;
        }

        context.actor_input(id.unwrap(), payload, skip_pending);
    }

    /**
     * Retrieves actors from the current context and sends them to the responder.
     */
    pub fn actors(&self, _payload: any, context: Context, options: Options) {
        let OptionsExtended { responder, enum_default_symbols } = options;

        let actors = context.actors;
        responder([enum_default_symbols.mergeActors, actors]);
    }

    /**
     * Merges actors into the current context.
     */
    pub fn merge_actors(&self, payload: Payload, context: Context, options: Options) {
        context.merge_actors(payload, options);
    }

    /**
     * Removes an actor from the current context.
     */
    pub fn remove_actor(&self, id: any, context: Context, options: Options) {
        let Options { compress_strings_as_ints, get_actor_id, skip_pending } = options;

        let mut id = get_actor_id(id, context);
        if id.is_none() || id.unwrap().is_empty() {
            return;
        }

        if compress_strings_as_ints {
            id = extract_symbol(id.unwrap(), context, options);
            if id.unwrap().is_empty() {
                return;
            }
        }

        context.remove_actor(id.unwrap(), skip_pending);
    }

    /**
     * Spawns a new actor in the current context.
     */
    pub fn spawn_actor(&self, id: any, context: Context, options: Options) {
        let Options { compress_strings_as_ints, get_actor_id, skip_pending } = options;

        let mut id = get_actor_id(id, context);
        if id.is_none() || id.unwrap().is_empty() {
            return;
        }

        if compress_strings_as_ints {
            id = extract_symbol(id.unwrap(), context, options);
            if id.unwrap().is_empty() {
                return;
            }
        }

        context.spawn_actor(id.unwrap(), skip_pending);
    }
}

pub struct Actions {}

impl ActorActions for Actions {}

/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions struct.
 */
pub const ACTIONS: Actions = HashMap<&str, fn> {
    "actorInput": ActorActions::actor_input,
    "actors": ActorActions::actors,
    "mergeActors": ActorActions::merge_actors,
    "removeActor": ActorActions::remove_actor,
    "spawnActor": ActorActions::spawn_actor,
};