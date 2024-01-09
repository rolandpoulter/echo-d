use crate::actions::actor::{Actions as ActorActions}
use crate::actions::component::{Actions as ComponentActions}
use crate::actions::core::{Actions as CoreActions}
use crate::actions::entity::{Actions as EntityActions}
use crate::actions::symbol::{Actions as SymbolActions}

// TODO: replace this with options.isAuthority

/**
 * The actions object combines all the actions from different modules.
 */
pub struct Actions {}

impl ActorActions for Actions;

impl ComponentActions for Actions;

impl CoreActions for Actions;

impl EntityActions for Actions;

impl SymbolActions for Actions;

pub fn get_actions() -> Actions {
    Actions::new()
}
