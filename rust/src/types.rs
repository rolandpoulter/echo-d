// use std::marker::PhantomData;
// use std::pin::Pin;
use std::marker::Send;

use std::any::Any;
use serde_json::{Value, Map};
use promises::Promise;

use crate::hash::{HashMap, HashSet};
// use crate::options::Options;
// use crate::context::Context;

pub type Action<'a> = &'a String;

#[derive(Clone)]
pub enum ActionInput<'a> {
    String(&'a String),
    Number(u16),
}

pub type Actions<'a> = HashMap<&'a String, Box<&'a dyn Any>>; // &'a dyn Fn()

pub type Actor<'a> = &'a String;

#[derive(Clone)]
pub enum ActorInput<'a> {
    String(Actor<'a>),
    Number(u32),
}

/**
 * The Payload struct represents the payload for an actor action.
 */
#[derive(Clone)]
pub struct ActorPayload<'a> {
    pub id: ActorInput<'a>,
}

#[derive(Clone)]
pub struct ActorsPayload {}

pub type BatchActionPayloadSizes<'a> = HashMap<&'a String, PayloadSize>;

/**
 * The Payload struct represents the payload for a component action.
 */
#[derive(Clone)]
pub struct ComponentPayload {
    pub id: String,
    pub key: String,
    pub value: String,
}

#[derive(Clone)]
pub struct ComponentTarget {
    pub id: String,
    pub key: String,
}

#[derive(Clone)]
pub struct ComponentsPayload {
    pub components: HashMap<String, ComponentPayload>,
}

/**
 * The Components struct represents a mapping from keys to any value.
 */
pub type Components<'a> = HashMap<&'a String, &'a Value>;

/**
 * The Component struct represents a component with dynamic properties.
 */
pub type Component<'a> = HashMap<&'a String, &'a Value>;

pub type ComponentMap = Map<String, Value>;

/**
 * Default options for the application.
 */
#[derive(Clone)]
pub struct DefaultOptions<'a> {
    pub batch_action_payload_sizes: BatchActionPayloadSizes<'a>,
    pub compress_strings_as_ints: bool,
    pub enable_querying: bool,
    pub enable_rollback: bool,
    pub indexes: Indexes<'a>,
    pub is_async_storage: bool,
    pub is_authority: bool,
    pub is_component_relay: bool,
    pub is_diffed: bool,
    pub is_grouped_components: bool,
    pub is_ordered: bool,
    pub is_read_only: bool,
    pub is_symbol_leader: bool,
    pub is_symbol_relay: bool,
    pub page_size: u16,
    pub skip_pending: bool,
    pub types: Types<'a>,
}

/**
 * Default options for updates.
 */
#[derive(Clone)]
pub struct UpdateOptions<'a> {
    pub mask: Option<MaskObject>,
    pub _type: bool,
    pub batched: bool,
    pub batch_size: u16,
    pub valid_keys: ValidKeys<'a>,
}

pub type Entity<'a> = &'a String;

/**
 * The Payload struct represents the payload for an entity action.
 */
pub struct EntityPayload {
    // Define the properties of your payload here
}

pub type EnumObject<'a, T = String, I = u32> = HashMap<T, I>;

pub type EnumDefaultSymbols<'a> = EnumObject<'a, &'a String>;

// #[derive(Clone)]
// pub enum ExtendOptions<'a> {
//     Object(Options<'a>),
//     Empty,
//     // Empty(PhantomData<&'a T>), // TODO: this should be for None/Empty
// }

#[derive(Clone)]
pub struct IndexParams<'a> {
    pub _type: &'a String,
}

pub type Indexes<'a> = HashMap<&'a String, &'a IndexParams<'a>>;

#[derive(Clone)]
pub struct InputPayload {
    pub id: String,
    pub key: String,
    pub value: String,
}

/**
 * The Inputs struct represents a mapping from keys to any array.
 */
pub type Inputs<'a> = HashMap<&'a String, &'a Vec<&'a Value>>;

#[derive(Clone)]
pub struct MaskObject {
    pub actors: bool,
    pub components: bool,
    pub entities: bool,
    pub symbols: bool,
    pub inputs: bool,
}

/**
 * The Message enum represents a message with an action and a payload.
 * It can be an array of values with the first value being considered the action, and the remaining the payload.
 * Or it can be an object with an action and a payload.
 */
#[derive(Clone)]
pub enum Message<'a> {
    Array(&'a Vec<&'a Value>),
    Object(&'a MessageObject<'a>),
}

/**
 * The Messages enum represents one or more messages with actions and a payloads.
 */
#[derive(Clone)]
pub enum Messages<'a> {
    Array(MessageArray<'a>),
    Object(&'a MessageObject<'a>),
}

/**
 * The MessageArray struct represents a list of messages
 */
#[derive(Clone)]
pub enum MessageArray<'a> {
    Tuple(&'a Vec<&'a Value>),
    Messages(&'a Vec<&'a Message<'a>>),
    // Message(MessageObject),
}

/**
 * The MessageObject struct represents a message with an action and a payload.
 */
#[derive(Clone)]
pub struct MessageObject<'a> {
    pub action: &'a String,
    pub payload: &'a Value,
}

/**
 * The Payload enum represents the payload of a message.
 */
// #[derive(Clone)]
// pub enum Payload<'a> {
//     Array(&'a Vec<&'a Value>),
//     Object(&'a Value),
// }

#[derive(Clone)]
pub enum PayloadSize {
    Number(i8),
    Object(PayloadSizeObject)
}

// pub enum PayloadSizeObjectType {
//     Rollback,
//     Ordered,
// }

#[derive(Clone)]
pub struct PayloadSizeObject {
    pub default: i8,
    pub rollback: Option<i8>,
    pub ordered: Option<i8>,
    // defined: bool,
    // value: i8,
    // kind: PayloadSizeObjectType, 
}

// pub type PayloadSizes<'a> = HashMap<&'a String, PayloadSize>;


pub enum PromiseOrValue<T: Send, E: Send> {
    Promise(Promise<T, E>),
    Value(T),
}

/**
 * A enum that can be either a Set or a Vec.
 */
#[derive(Clone)]
pub enum SetOrVec<T> {
    Set(HashSet<T>),
    Vec(Vec<T>)
}

/**
* The StorageOptions interface represents the options of a store.
*/
#[derive(Clone)]
pub struct StorageOptions<'a> {
    pub types: Option<&'a Types<'a>>,
    pub indexes: Option<&'a Indexes<'a>>,
    pub other: Option<HashMap<String, Value>>,
}

// pub type Symbols = HashMap<u32, &String>;
pub type Symbols<'a> = HashMap<&'a String, u32>;


/**
 * The Payload struct represents the payload for a symbol action.
 *
 * @property {usize} length - The length of the symbol.
 */
#[derive(Clone)]
pub struct SymbolPayload {
    pub length: usize,
}

#[derive(Clone)]
pub enum Type<'a> {
    String(&'a String),
    Tuple((&'a String, u8)),
}

pub type Types<'a> = HashMap<&'a String, &'a Type<'a>>;

pub type ValidKeys<'a> = HashMap<&'a String, bool>;

// #[derive(Clone)]
// pub enum ValueEnum {
//     String(String),
//     Number(f64),
// }

// TODO:
#[derive(Clone)]
pub struct Query {}