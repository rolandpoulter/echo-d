use serde_json::Value;

// use crate::hash::HashMap;
use crate::string::str;
use crate::actions::actor::ActorActions;
use crate::actions::component::ComponentActions;
use crate::actions::core::CoreActions;
use crate::actions::entity::EntityActions;
use crate::actions::symbol::SymbolActions;
use crate::context::Context;
use crate::options::Options;
// use crate::storage::Storage;
use crate::types::{
    Actions as ActionsObject,
    // ActorsPayload,
    // ComponentsPayload,
    // ComponentPayload,
    // ComponentTarget,
    // EntityPayload,
    // InputPayload,
    // SymbolPayload,
};

// TODO: replace this with options.isAuthority

/**
 * The actions object combines all the actions from different modules.
 */
pub struct Actions {}

impl ActorActions for Actions {}

impl ComponentActions for Actions {}

impl CoreActions for Actions {}

impl EntityActions for Actions {}

impl SymbolActions for Actions {}

pub fn get_actions() -> Actions {
    Actions {}
}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        str("actorInput"),
        Box::new(&(Actions::actor_input as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("actors"),
        Box::new(&(Actions::actors as fn(&Value, &Context, &Options)))
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
        Box::new(&(Actions::spawn_actor as fn(&Value, &Context, &Options)))
    );

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

    actions.insert(
        &String::from("batch"),
        Box::new(&(Actions::batch as fn(&Value, &Context, &Options)))
    );

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

    actions.insert(
        &String::from("createEntity"),
        Box::new(&(Actions::add_symbol as fn(&Value, &Context, &Options) -> Option<u32>)),
    );
    actions.insert(
        &String::from("fetchSymbol"),
        Box::new(&(Actions::fetch_symbol as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("getSymbol"),
        Box::new(&(Actions::get_symbol as fn(&Value, &Context, &Options) -> Option<&'a String>)),
    );
    actions.insert(
        &String::from("mergeSymbols"),
        Box::new(&(Actions::merge_symbols as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("symbol"),
        Box::new(&(Actions::symbol as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        &String::from("symbols"),
        Box::new(&(Actions::symbols as fn(&Value, &Context, &Options))),
    );

    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
