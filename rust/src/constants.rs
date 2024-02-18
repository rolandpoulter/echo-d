use serde_json::Value;

// use crate::hash::HashMap;
use crate::context::Context;
use crate::types::{
    DefaultOptions, EnumObject, IndexParams, Indexes, MaskObject, Payload, PayloadSize,
    PayloadSizeObject, PayloadSizes, SetOrVec, Type, Types, UpdateOptions, ValidKeys,
};
use crate::utils::{create_enum, union_sets};

// Define ACTIONS and COMMON_COMPONENTS arrays
const ACTIONS: Vec<&String> = [
    &String::from("actorInput"),
    &String::from("actors"),
    &String::from("addSymbol"),
    &String::from("batch"),
    &String::from("changeComponent"),
    &String::from("components"),
    &String::from("createEntity"),
    &String::from("entities"),
    &String::from("fetchSymbol"),
    &String::from("getSymbol"),
    &String::from("mergeActors"),
    &String::from("mergeComponents"),
    &String::from("mergeEntities"),
    &String::from("mergeSymbols"),
    &String::from("mergeSymbol"),
    &String::from("removeActor"),
    &String::from("removeComponent"),
    &String::from("removeEntity"),
    &String::from("spawnActor"),
    &String::from("symbol"),
    &String::from("symbols"),
    &String::from("upsertComponent"),
]
.iter()
.cloned()
.collect();

const COMMON_COMPONENTS: Vec<&String> = [
    &String::from("asset"),
    &String::from("collider"),
    &String::from("color"),
    &String::from("hidden"),
    &String::from("position"),
    &String::from("rotation"),
    &String::from("velocity"),
    &String::from("spin"),
]
.iter()
.cloned()
.collect();

const ACTIONS_AND_COMMON_COMPONENTS: [SetOrVec<&String>; 2] =
    [SetOrVec::Vec(ACTIONS), SetOrVec::Vec(COMMON_COMPONENTS)];

/**
 * A set of default symbols, which is the union of Actions and CommonComponents.
 */
pub const DEFAULT_SYMBOLS: Vec<&String> = union_sets::<String, 2>(ACTIONS_AND_COMMON_COMPONENTS);

/**
 * Padding for the enum.
 */
pub const PAD_ENUM: i16 = 0; // 10;

/**
 * An enum of action names.
 */
pub const ENUM_ACTIONS: EnumObject = create_enum(SetOrVec::Vec(ACTIONS), PAD_ENUM);

/**
 * An enum of common component names.
 */
pub const ENUM_COMMON_COMPONENTS: EnumObject = create_enum(
    SetOrVec::Vec(COMMON_COMPONENTS),
    ACTIONS.len() as i16 + PAD_ENUM,
);

/**
 * An enum of default symbols.
 */
pub const ENUM_DEFAULT_SYMBOLS: EnumObject = create_enum(SetOrVec::Vec(DEFAULT_SYMBOLS), PAD_ENUM);

/**
 * An object that maps action names to their payload sizes.
 */
pub const BATCH_ACTION_PAYLOAD_SIZES: PayloadSizes = [
    (
        &String::from("actorInput"),
        &PayloadSize::Object(&PayloadSizeObject {
            default: 1,
            rollback: Some(2),
            ordered: None,
        }),
    ),
    (
        &String::from("changeComponent"),
        &PayloadSize::Object(&PayloadSizeObject {
            default: 3,
            ordered: Some(4),
            rollback: None,
        }),
    ),
    (&String::from("mergeSymbols"), &PayloadSize::Number(2)),
    (&String::from("removeComponent"), &PayloadSize::Number(2)),
    (
        &String::from("upsertComponent"),
        &PayloadSize::Object(&PayloadSizeObject {
            default: 3,
            ordered: Some(4),
            rollback: None,
        }),
    ),
]
.iter()
.cloned()
.collect();

pub const DEFAULT_INDEXES: Indexes = [
    // ("asset", { _type: "sorted" }),
    // ("collider", { _type: "sorted" }),
    // ("color", { _type: "sorted" }),
    // ("hidden", { _type: "sorted" }),
    (
        &String::from("position"),
        &IndexParams {
            _type: &String::from("spatial"),
        },
    ),
]
.iter()
.cloned()
.collect();

pub const DEFAULT_TYPES: Types = [
    (&String::from("asset"), &Type::String(&String::from("str"))),
    (
        &String::from("collider"),
        &Type::String(&String::from("str")),
    ),
    (
        &String::from("color"),
        &Type::Tuple((&String::from("ui8"), 4)),
    ),
    (
        &String::from("hidden"),
        &Type::String(&String::from("bool")),
    ),
    (
        &String::from("position"),
        &Type::Tuple((&String::from("f32"), 3)),
    ),
    (
        &String::from("rotation"),
        &Type::Tuple((&String::from("f32"), 3)),
    ),
    (
        &String::from("velocity"),
        &Type::Tuple((&String::from("f32"), 3)),
    ),
    (
        &String::from("spin"),
        &Type::Tuple((&String::from("f32"), 3)),
    ),
    (
        &String::from("size"),
        &Type::Tuple((&String::from("f32"), 3)),
    ),
]
.iter()
.cloned()
.collect::<Types>();

pub const DEFAULT_PAGE_SIZE: i32 = 100;

/**
 * Default options for the application.
 */
pub const DEFAULT_OPTIONS: DefaultOptions = DefaultOptions {
    batch_action_payload_sizes: &BATCH_ACTION_PAYLOAD_SIZES,
    compress_strings_as_ints: true,
    enable_querying: !true,
    enable_rollback: !true,
    indexes: &DEFAULT_INDEXES,
    is_async_storage: false,
    is_authority: true,
    is_component_relay: true,
    is_diffed: false,
    is_grouped_components: !true,
    is_ordered: !true,
    is_read_only: false,
    is_symbol_leader: false,
    is_symbol_relay: false,
    page_size: DEFAULT_PAGE_SIZE as i16,
    skip_pending: false,
    types: &DEFAULT_TYPES,
};

/**
 * Default options for updates.
 */
pub const DEFAULT_UPDATE_OPTIONS: UpdateOptions = UpdateOptions {
    mask: None,
    _type: true,
    batched: true,
    batch_size: 100,
    valid_keys: &DEFAULT_VALID_KEYS,
};

/**
 * Default mask for updates.
 */
pub const DEFAULT_MASK_ALL: MaskObject = MaskObject {
    actors: true,
    components: true,
    entities: true,
    symbols: true,
    inputs: true,
};

/**
 * An object that maps keys to their validity.
 */
pub const DEFAULT_VALID_KEYS: ValidKeys = [
    (&String::from("asset"), true),
    (&String::from("collider"), true),
    (&String::from("color"), true),
    (&String::from("hidden"), true),
    (&String::from("position"), true),
    (&String::from("rotation"), true),
    (&String::from("velocity"), true),
    (&String::from("spin"), true),
    (&String::from("size"), true),
]
.iter()
.cloned()
.collect::<ValidKeys>();

/**
 * A responder fn that does nothing and returns nothing.
 */
pub fn void_responder() {}

pub fn default_on_update() {}

/**
 * The Payload trait represents a payload that can be sent to an action.
 */
pub trait PayloadWithId {
    fn get_id(&self) -> Option<&String> {
        if let Some(id) = self.get("id") {
            if let Some(id) = id.as_string() {
                return Some(id);
            }
        }
        None
    }
}

/**
 * A fn that retrieves the actor ID from a payload.
 *
 * @param {Payload} payload - The payload from which the actor ID is to be retrieved.
 * @param {any} _context - The current context. This parameter is not used.
 * @returns {string | undefined} The actor ID, or undefined if it cannot be found.
 */
pub fn default_get_actor_id<'a, T>(payload: &Payload, _context: &Context<T>) -> Option<&'a String> {
    payload.get_id()
}

/**
 * A fn that retrieves the grouped value from a payload.
 *
 * @param {any | any[]} value - The payload from which the grouped value is to be retrieved.
 * @param {number} i - The index of the payload.
 * @param {Object} types - An object containing the types.
 * @param {string} key - The key of the grouped value.
 * @returns {any} The value from the group.
 */
pub fn default_get_grouped_value<'a>(
    value: &Value,
    i: i32,
    types: &Types,
    key: &String,
) -> &'a Value {
    if let Some(type_arr) = types.get(&key) {
        if let Value::Array(arr) = type_arr {
            return &value[i * arr[1]..(i + 1) * arr[1]];
        }
    }
    &value[i]
}

/**
 * A fn that sets the grouped value in a payload.
 *
 * @param {any} value - The payload in which the grouped value is to be set.
 * @param {Object} _types - An object containing the types.
 * @param {string} _key - The key of the grouped value.
 * @returns {any} The value from the group.
 */
pub fn default_set_grouped_value<'a>(value: &Value, _types: &Types, _key: &String) -> &'a Value {
    return value;
}
