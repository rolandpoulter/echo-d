use crate::utils::{union_sets, create_enum};
use crate::hash::HashMap;
use crate::context::Context;

// Define ACTIONS and COMMON_COMPONENTS arrays
const ACTIONS: [&str; 22] = [
    "actorInput",
    "actors",
    "addSymbol",
    "batch",
    "changeComponent",
    "components",
    "createEntity",
    "entities",
    "fetchSymbol",
    "getSymbol",
    "mergeActors",
    "mergeComponents",
    "mergeEntities",
    "mergeSymbols",
    "mergeSymbol",
    "removeActor",
    "removeComponent",
    "removeEntity",
    "spawnActor",
    "symbol",
    "symbols",
    "upsertComponent",
];

const COMMON_COMPONENTS: [&str; 7] = [
    "collider",
    "color",
    "hidden",
    "position",
    "rotation",
    "velocity",
    "spin",
];

/**
 * A set of default symbols, which is the union of Actions and CommonComponents.
 */
pub const DEFAULT_SYMBOLS: [String; ACTIONS.len() + COMMON_COMPONENTS.len()] = union_sets(&ACTIONS, &COMMON_COMPONENTS);

/**
 * Default options for the application.
 */
pub struct DefaultOptions {
    skip_pending: bool,
    compress_strings_as_ints: bool,
    is_symbol_leader: bool,
    is_symbol_relay: bool,
    is_component_relay: bool,
    is_ticked: bool,
    is_diffed: bool,
    is_rollback: bool, // TODO: support ggpo rollback for inputs
}

/**
 * Default options for updates.
 */
pub struct DefaultUpdateOptions {
    mask: Option<MaskType>,
    type: bool,
    batched: bool,
    batch_size: usize,
}

/**
 * Padding for the enum.
 */
pub const PAD_ENUM: usize = 0; // 10;

/**
 * An enum of action names.
 */
pub const ENUM_ACTIONS: HashMap<&str, usize> = create_enum(&ACTIONS, PAD_ENUM);

/**
 * An enum of common component names.
 */
pub const ENUM_COMMON_COMPONENTS: HashMap<&str, usize> = create_enum(&COMMON_COMPONENTS, ACTIONS.len() + PAD_ENUM);

/**
 * An enum of default symbols.
 */
pub const ENUM_DEFAULT_SYMBOLS: HashMap<&str, usize> = create_enum(&DEFAULT_SYMBOLS, PAD_ENUM);

/**
 * An object that maps action names to their payload sizes.
 */
pub const BATCH_ACTION_PAYLOAD_SIZES: HashMap<&str, usize> = [
    ("changeComponent", 3),
    ("removeComponent", 2),
    ("upsertComponent", 3),
].iter().cloned().collect();

/**
 * An object that maps keys to their validity.
 */
pub const DEFAULT_VALID_KEYS: HashMap<&str, bool> = [
    ("collider", true),
    ("color", true),
    ("hidden", true),
    ("position", true),
    ("rotation", true),
    ("velocity", true),
    ("spin", true),
].iter().cloned().collect();

/**
 * A responder function that does nothing and returns nothing.
 */
pub fn void_responder() {}

/**
 * The Payload trait represents a payload that can be sent to an action.
 */
pub trait Payload {
    fn get_id(&self) -> Option<&str>;
}

/**
 * A function that retrieves the actor ID from a payload.
 *
 * @param {Payload} payload - The payload from which the actor ID is to be retrieved.
 * @param {any} _context - The current context. This parameter is not used.
 * @returns {string | undefined} The actor ID, or undefined if it cannot be found.
 */
pub fn default_get_actor_id(payload: &dyn Payload, _context: &dyn Context) -> Option<&str> {
    payload.get_id()
}

