// use crate::hash::HashMap;
use crate::context::Context;
use crate::options::Options;
use crate::types::Actions as ActionsObject;

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

impl<T> ActorActions<T> for Actions {
  fn actors(_: Option<()>, c: &Context<T>, o: &Options<T>) {}
  // fn inputs() -> ! {}
}

impl<T> ComponentActions<T> for Actions {
  fn components(_: &String, c: &Context<T>, o: &Options<T>) {}
}

impl<T> CoreActions<T> for Actions {}

impl<T> EntityActions<T> for Actions {
  fn entities(_: &String, c: &Context<T>, o: &Options<T>) {}
}

impl<T> SymbolActions<T> for Actions {
  fn symbol(s: &String, c: &Context<T>, o: &Options<T>) {}
  fn symbols(_: &String, c: &Context<T>, o: &Options<T>) {}
}

pub fn get_actions<T>() -> Actions {
    Actions::<T>::new()
}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
  actions.insert(
      &String::from("actorInput"),
      Box::new(Actions::actor_input),
  );
  // actions.insert(
  //     &String::from("actors"),
  //     None,
  // );
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

  // actions.insert(
  //     &String::from("components"),
  //     None
  // );
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
  // actions.insert(
  //     &String::from("entities"),
  //     None
  // );
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
  // actions.insert(
  //     &String::from("symbol"),
  //     None
  // );
  // actions.insert(
  //     &String::from("symbols"),
  //     None
  // );

  &actions
}

/**
* An object that maps the names of actions to their corresponding methods in the ActorActions struct.
*/
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
