use serde_json::Value;

// use crate::hash::HashMap;
use crate::options::Options;
use crate::context::Context;
use crate::storage::Storage;
use crate::handler::many_handler;
use crate::types::{
    Actions as ActionsObject,
    // Message,
    // Messages,
    // MessageArray,
    // Payload,
};

pub struct Payload {
    // Define the properties of your payload here
}

pub trait CoreActions {//}

// impl CoreActions {
    fn batch(payload: &Value, context: &Context, options: &Options) {
        // let messages = Messages::Array(
        //     MessageArray::Tuple(payload)
        // );
        many_handler(payload, &context, &options);
    }
}

pub struct Actions {}

impl CoreActions for Actions {}

fn setup_actions<'a, T>(actions: &mut ActionsObject) -> &'a ActionsObject<'a> {
    actions.insert(
        &String::from("batch"),
        Box::new(&(Actions::batch as fn(&Value, &Context, &Options)))
    );
    &actions
}

/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions struct.
 */
pub const ACTIONS: &ActionsObject = setup_actions::<Storage>(&mut ActionsObject::new());
