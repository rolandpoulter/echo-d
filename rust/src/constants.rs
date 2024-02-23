use serde_json::Value;
// use std::any::Any;

// use crate::hash::HashMap;
use crate::context::Context;
use crate::string::str;
use crate::types::{
    // InputPayload,
    // Payload,
    // InputPayload,
    BatchActionPayloadSizes, DefaultOptions, EnumObject, IndexParams, Indexes, MaskObject, PayloadSize, PayloadSizeObject, SetOrVec, StorageOptions, Type, Types, UpdateOptions, ValidKeys
};
use crate::utils::{create_enum, union_sets};

// Define ACTIONS and COMMON_COMPONENTS arrays
const ACTIONS: Vec<&String> = [
    str("actorInput"),
    str("actors"),
    str("addSymbol"),
    str("batch"),
    str("changeComponent"),
    str("components"),
    str("createEntity"),
    str("entities"),
    str("fetchSymbol"),
    str("getSymbol"),
    str("mergeActors"),
    str("mergeComponents"),
    str("mergeEntities"),
    str("mergeSymbols"),
    str("mergeSymbol"),
    str("removeActor"),
    str("removeComponent"),
    str("removeEntity"),
    str("spawnActor"),
    str("symbol"),
    str("symbols"),
    str("upsertComponent"),
]
.iter()
.cloned()
.collect();

const COMMON_COMPONENTS: Vec<&String> = [
    str("asset"),
    str("collider"),
    str("color"),
    str("hidden"),
    str("position"),
    str("rotation"),
    str("velocity"),
    str("spin"),
]
.iter()
.cloned()
.collect();

const ACTIONS_AND_COMMON_COMPONENTS: [SetOrVec<&String>; 2] = [
    SetOrVec::<&String>::Vec(ACTIONS),
    SetOrVec::<&String>::Vec(COMMON_COMPONENTS),
];

/**
 * A set of default symbols, which is the union of Actions and CommonComponents.
 */
pub const DEFAULT_SYMBOLS: Vec<&String> = union_sets::<String, 2>(ACTIONS_AND_COMMON_COMPONENTS);

/**
 * Padding for the enum.
 */
pub const PAD_ENUM: u16 = 0; // 10;

/**
 * An enum of action names.
 */
pub const ENUM_ACTIONS: EnumObject = create_enum(SetOrVec::<&String>::Vec(ACTIONS), PAD_ENUM);

/**
 * An enum of common component names.
 */
pub const ENUM_COMMON_COMPONENTS: EnumObject = create_enum::<String>(
    SetOrVec::<&String>::Vec(COMMON_COMPONENTS),
    ACTIONS.len() as u16 + PAD_ENUM,
);

/**
 * An enum of default symbols.
 */
pub const ENUM_DEFAULT_SYMBOLS: EnumObject =
    create_enum(SetOrVec::<&String>::Vec(DEFAULT_SYMBOLS), PAD_ENUM);

/**
 * An object that maps action names to their payload sizes.
 */
pub const BATCH_ACTION_PAYLOAD_SIZES: BatchActionPayloadSizes = [
    (
        str("actorInput"),
        PayloadSize::Object(PayloadSizeObject {
            default: 1,
            rollback: Some(2),
            ordered: None,
        }),
    ),
    (
        str("changeComponent"),
        PayloadSize::Object(PayloadSizeObject {
            default: 3,
            ordered: Some(4),
            rollback: None,
        }),
    ),
    (str("mergeSymbols"), PayloadSize::Number(2)),
    (str("removeComponent"), PayloadSize::Number(2)),
    (
        str("upsertComponent"),
        PayloadSize::Object(PayloadSizeObject {
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
        str("position"),
        &IndexParams {
            _type: str("spatial"),
        },
    ),
]
.iter()
.cloned()
.collect();

pub const DEFAULT_TYPES: Types = [
    (str("asset"), &Type::String(str("str"))),
    (
        str("collider"),
        &Type::String(str("str")),
    ),
    (
        str("color"),
        &Type::Tuple((str("ui8"), 4)),
    ),
    (
        str("hidden"),
        &Type::String(str("bool")),
    ),
    (
        str("position"),
        &Type::Tuple((str("f32"), 3)),
    ),
    (
        str("rotation"),
        &Type::Tuple((str("f32"), 3)),
    ),
    (
        str("velocity"),
        &Type::Tuple((str("f32"), 3)),
    ),
    (
        str("spin"),
        &Type::Tuple((str("f32"), 3)),
    ),
    (
        str("size"),
        &Type::Tuple((str("f32"), 3)),
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
    batch_action_payload_sizes: BATCH_ACTION_PAYLOAD_SIZES,
    compress_strings_as_ints: true,
    enable_querying: !true,
    enable_rollback: !true,
    indexes: DEFAULT_INDEXES,
    is_async_storage: false,
    is_authority: true,
    is_component_relay: true,
    is_diffed: false,
    is_grouped_components: !true,
    is_ordered: !true,
    is_read_only: false,
    is_symbol_leader: false,
    is_symbol_relay: false,
    page_size: DEFAULT_PAGE_SIZE as u16,
    skip_pending: false,
    types: DEFAULT_TYPES,
};

/**
 * Default options for updates.
 */
pub const DEFAULT_UPDATE_OPTIONS: UpdateOptions = UpdateOptions {
    mask: None,
    _type: true,
    batched: true,
    batch_size: 100,
    valid_keys: DEFAULT_VALID_KEYS,
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
    (str("asset"), true),
    (str("collider"), true),
    (str("color"), true),
    (str("hidden"), true),
    (str("position"), true),
    (str("rotation"), true),
    (str("velocity"), true),
    (str("spin"), true),
    (str("size"), true),
]
.iter()
.cloned()
.collect::<ValidKeys>();

pub const DEFAULT_STORAGE_OPTIONS: StorageOptions = StorageOptions {
    indexes: None,
    types: None,
    other: None,
};

/**
 * A responder fn that does nothing and returns nothing.
 */
pub fn void_responder(_data: &Value, _type: Option<u8>) {}

pub fn default_on_update() {}

/**
 * The Payload trait represents a payload that can be sent to an action.
 */
// pub trait PayloadWithId {
//     fn get_id<'a>(&self) -> Option<&'a String>;
// }

// impl PayloadWithId for InputPayload {
//     fn get_id<'a>(&self) -> Option<&'a String> {
//         Some(&self.id)
//     }
// }

/**
 * A fn that retrieves the actor ID from a payload.
 *
 * @param {InputPayload} payload - The payload from which the actor ID is to be retrieved.
 * @param {any} _context - The current context. This parameter is not used.
 * @returns {string | undefined} The actor ID, or undefined if it cannot be found.
 */
pub fn default_get_actor_id<'a>(
    // payload: &dyn PayloadWithId,
    payload: &Value,
    _context: &Context,
) -> Option<&'a String> {
    // payload.get_id()
    if let Some(id) = payload.get("id") {
        if let Some(id) = id.as_str() {
            return Some(str(id));
        }
    }
    None
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
pub fn default_get_grouped_value<'a>(value: &Value, i: u32, types: &Types, key: &String) -> &'a Value {
    // TODO:
    // if let Some(type_arr) = types.get(&key) {
    //     if let Value::Array(arr) = *type_arr {
    //         return &value[i * arr[1]..(i + 1) * arr[1]];
    //     }
    // }
    // &value[i]
    &value
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
    &value
}
