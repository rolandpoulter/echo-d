use serde_json::Value;

// use crate::hash::HashMap;
use crate::string::str;
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

use crate::actions::actor::{
    ActorActions,
    // ACTIONS as ACTOR_ACTIONS
};
use crate::actions::component::{
    ComponentActions,
    // ACTIONS as COMPONENT_ACTIONS
};
use crate::actions::core::{
    CoreActions,
    // ACTIONS as CORE_ACTIONS
};
use crate::actions::entity::{
    EntityActions,
    // ACTIONS as ENTITY_ACTIONS
};
use crate::actions::symbol::{
    SymbolActions,
    // ACTIONS as SYMBOL_ACTIONS
};

// TODO: replace this with options.isAuthority

/**
 * The actions object combines all the actions from different modules.
 */
pub struct Actions {}

impl ActorActions for Actions {
    fn actors(_: &Value, c: &Context, o: &Options) {}
    // fn inputs() -> ! {}
}

impl ComponentActions for Actions {
    fn components(_: &Value, c: &Context, o: &Options) {}
}

impl CoreActions for Actions {}

impl EntityActions for Actions {
    fn entities(_: &Value, c: &Context, o: &Options) {}
}

impl SymbolActions for Actions {
    fn symbol(s: &Value, c: &Context, o: &Options) {}
    fn symbols(_: &Value, c: &Context, o: &Options) {}
}

pub fn get_actions() -> Actions {
    Actions {}
}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        str("actorInput"),
        Box::new(&(Actions::actor_input as fn(&Value, &Context, &Options))),
    );
    // actions.insert(
    //     str("actors"),
    //     Box::new(None),
    // );
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

    actions.insert(
        str("changeComponent"),
        Box::new(&(Actions::change_component as fn(&Value, &Context, &Options))),
    );
    // actions.insert(
    //     str("components"),
    //     Box::new(None),
    // );
    actions.insert(
        str("mergeComponents"),
        Box::new(&(Actions::merge_components as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("removeComponent"),
        Box::new(&(Actions::remove_component as fn(&Value, &Context, &Options))),
    );
    actions.insert(
        str("upsertComponent"),
        Box::new(&(Actions::upsert_component as fn(&Value, &Context, &Options))),
    );

    actions.insert(
        &String::from("batch"),
        Box::new(&(Actions::batch as fn(&Value, &Context, &Options))),
    );

    actions.insert(
        &String::from("createEntity"),
        Box::new(&(Actions::create_entity as fn(&Value, &Context, &Options))),
    );
    // actions.insert(
    //     &String::from("entities"),
    //     Box::new(None),
    // );
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
    // actions.insert(
    //     &String::from("symbol"),
    //     Box::new(None),
    // );
    // actions.insert(
    //     &String::from("symbols"),
    //     Box::new(None),
    // );

    &actions
}

/**
* An object that maps the names of actions to their corresponding methods in the ActorActions struct.
*/
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
