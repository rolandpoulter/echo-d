use crate::options::Options;
use crate::context::Context;
use crate::handler::many_handler;

pub struct CoreActions {}

impl CoreActions {
    pub fn batch(&self, payload: Vec<Payload>, context: Context, options: Options) {
        many_handler(payload, context, options);
    }
}

pub struct Payload {
    // Define the properties of your payload here
}

pub const ACTIONS: CoreActions = CoreActions {};
