// use crate::hash::HashMap;
use crate::options::Options;
use crate::context::Context;
use crate::handler::many_handler;
use crate::types::{
    Actions as ActionsObject,
    // Payload,
};

pub struct Payload {
    // Define the properties of your payload here
}

pub trait CoreActions<T> {//}

// impl CoreActions {
    fn batch(payload: &Vec<&Payload>, context: &Context<T>, options: &Options<T>) {
        many_handler::<T>(&payload, &context, &options);
    }
}

fn setup_actions<'a>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("batch"),
        Box::new(CoreActions::batch)
    );
}

/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions(&mut ActionsObject::new());
