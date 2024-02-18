// use crate::hash::HashMap;

use crate::actions::actor::ActorActions;
use crate::actions::component::ComponentActions;
use crate::actions::core::CoreActions;
use crate::actions::entity::EntityActions;
use crate::actions::symbol::SymbolActions;
use crate::types::Actions as ActionsObject;

// TODO: replace this with options.isAuthority

/**
 * The actions object combines all the actions from different modules.
 */
pub struct Actions {}

impl<T> ActorActions<T> for Actions {}

impl<T> ComponentActions<T> for Actions {}

impl<T> CoreActions<T> for Actions {}

impl<T> EntityActions<T> for Actions {}

impl<T> SymbolActions<T> for Actions {}

pub fn get_actions<T>() -> Actions {
    Actions::<T>::new()
}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("actorInput"),
        Box::new(Actions::actor_input),
    );
    actions.insert(
        &String::from("actors"),
        Box::new(Actions::actors),
    );
    actions.insert(
        &String::from("mergeActors"),
        Box::new(Actions::merge_actors),
    );
    actions.insert(
        &String::from("removeActor"),
        Box::new(Actions::remove_actor),
    );
    actions.insert(
        &String::from("spawnActor"),
        Box::new(Actions::spawn_actor),
    );

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

    actions.insert(
        &String::from("batch"),
        Box::new(CoreActions::batch)
    );

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

    actions.insert(
        &String::from("createEntity"),
        Box::new(SymbolActions::add_symbol),
    );
    actions.insert(
        &String::from("fetchSymbol"),
        Box::new(SymbolActions::fetch_symbol),
    );
    actions.insert(
        &String::from("getSymbol"),
        Box::new(SymbolActions::get_symbol),
    );
    actions.insert(
        &String::from("mergeSymbols"),
        Box::new(SymbolActions::merge_symbols),
    );
    actions.insert(
        &String::from("symbol"),
        Box::new(SymbolActions::symbol),
    );
    actions.insert(
        &String::from("symbols"),
        Box::new(SymbolActions::symbols),
    );

    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
