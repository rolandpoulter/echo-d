// use std::marker::PhantomData;
// use std::pin::Pin;
use std::marker::Send;

// use std::any::Any;
use serde_json::Value;
use promises::Promise;

use crate::hash::{HashMap, HashSet};
use crate::options::Options;

pub enum Action<'a> {
    String(&'a String),
    Number(i32),
}

pub type Actions<'a> = HashMap<&'a String, Box<&'a fn()>>; // dyn Any

pub type Actor<'a> = &'a String;

/**
 * The Payload struct represents the payload for an actor action.
 */
pub struct ActorPayload {
    pub id: String,
}

pub struct ActorsPayload {}

pub type BatchActionPayloadSizes<'a> = HashMap<&'a String, &'a Vec<&'a PayloadSize<'a>>>;

/**
 * The Payload struct represents the payload for a component action.
 */
pub struct ComponentPayload {
    pub id: String,
    pub key: String,
    pub value: String,
}

pub struct ComponentTarget {
    pub id: String,
    pub key: String,
}

pub struct ComponentsPayload {
    pub components: HashMap<String, ComponentPayload>,
}

/**
 * The Components struct represents a mapping from keys to any value.
 */
pub type Components<'a> = HashMap<&'a String, &'a HashMap<&'a String, &'a Value>>;

/**
 * Default options for the application.
 */
pub struct DefaultOptions<'a> {
    pub batch_action_payload_sizes: &'a PayloadSizes<'a>,
    pub compress_strings_as_ints: bool,
    pub enable_querying: bool,
    pub enable_rollback: bool,
    pub indexes: &'a Indexes<'a>,
    pub is_async_storage: bool,
    pub is_authority: bool,
    pub is_component_relay: bool,
    pub is_diffed: bool,
    pub is_grouped_components: bool,
    pub is_ordered: bool,
    pub is_read_only: bool,
    pub is_symbol_leader: bool,
    pub is_symbol_relay: bool,
    pub page_size: i16,
    pub skip_pending: bool,
    pub types: &'a Types<'a>,
}

/**
 * Default options for updates.
 */
pub struct UpdateOptions<'a> {
    pub mask: Option<&'a MaskObject>,
    pub _type: bool,
    pub batched: bool,
    pub batch_size: i32,
    pub valid_keys: &'a ValidKeys<'a>,
}

pub type Entity<'a> = &'a String;

pub type EnumObject<'a> = HashMap<&'a String, i32>;

pub type EnumDefaultSymbols<'a> = EnumObject<'a>;

pub enum ExtendOptions<'a, T> {
    Object(Options<'a, T>),
    Empty,
    // Empty(PhantomData<&'a T>), // TODO: this should be for None/Empty
}

pub struct IndexParams<'a> {
    pub _type: &'a String,
}

pub type Indexes<'a> = HashMap<&'a String, &'a IndexParams<'a>>;

pub struct InputPayload {
    pub id: String,
    pub key: String,
    pub value: String,
}

/**
 * The Inputs struct represents a mapping from keys to any array.
 */
pub type Inputs<'a> = HashMap<&'a String, &'a Vec<&'a Value>>;

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
pub enum Message<'a> {
    Array(&'a Vec<&'a Value>),
    Object(&'a MessageObject<'a>),
}

/**
 * The Messages enum represents one or more messages with actions and a payloads.
 */
pub enum Messages<'a> {
    Array(MessageArray<'a>),
    Object(&'a MessageObject<'a>),
}

/**
 * The MessageArray struct represents a list of messages
 */
pub enum MessageArray<'a> {
    Tuple(&'a Vec<&'a Value>),
    Messages(&'a Vec<&'a Message<'a>>),
    // Message(MessageObject),
}

/**
 * The MessageObject struct represents a message with an action and a payload.
 */
pub struct MessageObject<'a> {
    pub action: &'a String,
    pub payload: Payload<'a>,
}

/**
 * The Payload enum represents the payload of a message.
 */
pub enum Payload<'a> {
    Array(&'a Vec<&'a Value>),
    Object(&'a Value),
}

pub enum PayloadSize<'a> {
    Number(i8),
    Object(&'a PayloadSizeObject)
}

// pub enum PayloadSizeObjectType {
//     Rollback,
//     Ordered,
// }

pub struct PayloadSizeObject {
    pub default: i8,
    pub rollback: Option<i8>,
    pub ordered: Option<i8>,
    // defined: bool,
    // value: i8,
    // kind: PayloadSizeObjectType, 
}

pub type PayloadSizes<'a> = HashMap<&'a String, &'a PayloadSize<'a>>;


pub enum PromiseOrValue<T: Send, E: Send> {
    Promise(Promise<T, E>),
    Value(T),
}

/**
 * A enum that can be either a Set or a Vec.
 */
pub enum SetOrVec<T> {
    Set(HashSet<T>),
    Vec(Vec<T>)
}

/**
* The StorageOptions interface represents the options of a store.
*/
pub struct StorageOptions<'a> {
    pub types: Option<&'a Types<'a>>,
    pub indexes: Option<&'a Indexes<'a>>,
    pub other: Option<HashMap<String, Value>>,
}

// pub type Symbols = HashMap<u32, &String>;
pub type Symbols<'a> = HashMap<&'a String, i32>;

#[derive(Clone)]
pub enum Type<'a> {
    String(&'a String),
    Tuple((&'a String, i8)),
}

pub type Types<'a> = HashMap<&'a String, &'a Type<'a>>;

pub type ValidKeys<'a> = HashMap<&'a String, bool>;

pub enum ValueEnum {
    String(String),
    Number(i32),
}

// CHAOS SECTION BELOW

/**
 * The Component struct represents a component with dynamic properties.
 */
pub struct Component {
    pub properties: HashMap<String, serde_json::Value>,
}

/**
 * The Components struct represents a collection of components.
 *
 * id: The component identified by id.
 */
pub struct Components_ {
    pub components: HashMap<String, Component>,
}

// TODO:
pub struct Query {}