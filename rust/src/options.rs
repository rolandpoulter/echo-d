use serde_json::Value;

use crate::node::ACTIONS as DEFAULT_ACTIONS;
use crate::types::{
    Actions,
    ActorPayload,
    BatchActionPayloadSizes,
    EnumDefaultSymbols,
    Indexes,
    Payload,
    StorageOptions,
    Types,
    UpdateOptions
};
use crate::constants::{
    DEFAULT_OPTIONS,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SYMBOLS,
    void_responder,
    default_get_actor_id,
    default_get_grouped_value,
    default_on_update,
    default_set_grouped_value
};
use crate::context::Context;

/**
 * The OptionsProps struct represents the properties for the Options struct.
 */
#[derive(Default)]
pub struct OptionsProps<'a, T> {
    pub actions: Option<&'a Actions<'a>>,
    pub batch_action_payload_sizes: Option<&'a BatchActionPayloadSizes<'a>>,
    pub compress_strings_as_ints: Option<bool>,
    pub default_symbols: Option<&'a Vec<&'a str>>,
    pub enum_default_symbols: Option<&'a EnumDefaultSymbols<'a>>,
    pub enable_querying: Option<bool>,
    pub enable_rollback: Option<bool>,
    pub get_actor_id: Option<&'a fn(p: &ActorPayload, c: &Context<T>)>,
    pub get_grouped_values: Option<&'a fn(v: &Value, i: i32, t: &Types, k: &String)>,
    pub indexes: Option<&'a Indexes<'a>>,
    pub is_authority: Option<bool>,
    pub is_async_storage: Option<bool>,
    pub is_component_relay: Option<bool>,
    pub is_diffed: Option<bool>,
    pub is_grouped_components: Option<bool>,
    pub is_ordered: Option<bool>,
    pub is_read_only: Option<bool>,
    pub is_symbol_leader: Option<bool>,
    pub is_symbol_relay: Option<bool>,
    pub on_update: Option<&'a fn()>,
    pub page_size: Option<i16>,
    pub responder: Option<&'a fn(data: &Payload, _type: Option<u8>)>,
    pub skip_pending: Option<bool>,
    pub types: Option<&'a Types<'a>>,
    pub set_grouped_value: Option<&'a fn(v: &Value, t: &Types, k: &String)>,
    pub store_options: Option<&'a StorageOptions<'a>>,
    pub update_options: Option<&'a UpdateOptions<'a>>,
    // pub world_options: Option<&WorldOptions>,
}

pub enum OptionsInput<'a, T> {
    Props(OptionsProps<'a, T>),
    Instance(Options<'a, T>),
}

/**
 * The Options struct represents the options for a node.
 */
pub struct Options<'a, T> {
    pub actions: &'a Actions<'a>,
    pub batch_action_payload_sizes: &'a BatchActionPayloadSizes<'a>,
    pub compress_strings_as_ints: bool,
    pub default_symbols: &'a Vec<String>,
    pub enum_default_symbols: &'a EnumDefaultSymbols<'a>,
    pub enable_querying: bool,
    pub enable_rollback: bool,
    pub get_actor_id: &'a fn(p: &ActorPayload, c: &Context<T>),
    pub get_grouped_values: &'a fn(v: &Value, i: i32, t: &Types, k: &String),
    pub indexes: &'a Indexes<'a>,
    pub is_authority: bool,
    pub is_async_storage: bool,
    pub is_component_relay: bool,
    pub is_diffed: bool,
    pub is_grouped_components: bool,
    pub is_ordered: bool,
    pub is_read_only: bool,
    pub is_symbol_leader: bool,
    pub is_symbol_relay: bool,
    pub on_update: &'a fn(),
    pub page_size: i16,
    pub responder: &'a fn(data: &Payload, _type: Option<u8>),
    pub skip_pending: bool,
    pub types: &'a Types<'a>,
    pub set_grouped_value: &'a fn(v: &Value, t: &Types, k: &String),
    pub store_options: &'a StorageOptions<'a>,
    pub update_options: &'a UpdateOptions<'a>,
}

impl<'a, T> Options<'a, T> {
    /**
     * Constructs a new Options object.
     *
     * @param {OptionsInput} options - The options for the node.
     * @param {Option<Actions>} action_this - The context for the actions.
     */
    pub fn new(options: &OptionsInput<T>, action_this: Option<&Actions>) -> Self {
        match options {
            OptionsInput::Props(options) => {
                let OptionsProps {
                    actions,
                    batch_action_payload_sizes,
                    compress_strings_as_ints,
                    default_symbols,
                    enum_default_symbols,
                    enable_querying,
                    enable_rollback,
                    get_actor_id,
                    get_grouped_values,
                    indexes,
                    is_authority,
                    is_async_storage,
                    is_component_relay,
                    is_diffed,
                    is_grouped_components,
                    is_ordered,
                    is_read_only,
                    is_symbol_leader,
                    is_symbol_relay,
                    on_update,
                    page_size,
                    responder,
                    skip_pending,
                    types,
                    set_grouped_value,
                    store_options,
                    update_options,
                } = options;
        
                let actions = match actions {
                    Some(actions) => actions,
                    None => actions.unwrap_or_else(|| DEFAULT_ACTIONS)
                };
                
                let batch_action_payload_sizes = batch_action_payload_sizes.unwrap_or_default();
                let compress_strings_as_ints = compress_strings_as_ints.unwrap_or(DEFAULT_OPTIONS.compress_strings_as_ints);
                let default_symbols = default_symbols.unwrap_or_else(|| DEFAULT_SYMBOLS.to_vec());
                let enable_querying = enable_querying.unwrap_or(DEFAULT_OPTIONS.enable_querying);
                let enable_rollback = enable_rollback.unwrap_or(DEFAULT_OPTIONS.enable_rollback);
                let enum_default_symbols = enum_default_symbols.unwrap_or_default();
                let get_actor_id = get_actor_id.unwrap_or_else(|| default_get_actor_id);
                let get_grouped_values = get_grouped_values.unwrap_or_else(|| default_get_grouped_value);
                let indexes = indexes.unwrap_or_default();
                let is_async_storage = is_async_storage.unwrap_or(DEFAULT_OPTIONS.is_async_storage);
                let is_authority = is_authority.unwrap_or(DEFAULT_OPTIONS.is_authority);
                let is_component_relay = is_component_relay.unwrap_or(DEFAULT_OPTIONS.is_component_relay);
                let is_diffed = is_diffed.unwrap_or(DEFAULT_OPTIONS.is_diffed);
                let is_grouped_components = is_grouped_components.unwrap_or(DEFAULT_OPTIONS.is_grouped_components);
                let is_ordered = is_ordered.unwrap_or(DEFAULT_OPTIONS.is_ordered);
                let is_read_only = is_read_only.unwrap_or(DEFAULT_OPTIONS.is_read_only);
                let is_symbol_leader = is_symbol_leader.unwrap_or(DEFAULT_OPTIONS.is_symbol_leader);
                let is_symbol_relay = is_symbol_relay.unwrap_or(DEFAULT_OPTIONS.is_symbol_relay);
                let on_update = on_update.unwrap_or_else(|| default_on_update);
                let page_size = page_size.unwrap_or(DEFAULT_PAGE_SIZE);
                let responder = responder.unwrap_or_else(|| void_responder);
                let skip_pending = skip_pending.unwrap_or(DEFAULT_OPTIONS.skip_pending);
                let types = types.unwrap_or_default();
                let set_grouped_value = set_grouped_value.unwrap_or_else(|| default_set_grouped_value);
                let store_options = store_options.unwrap_or_default();
                let update_options = update_options.unwrap_or_default();
        
                Options {
                    actions,
                    batch_action_payload_sizes,
                    compress_strings_as_ints,
                    default_symbols,
                    enum_default_symbols,
                    enable_querying,
                    enable_rollback,
                    get_actor_id,
                    get_grouped_values,
                    indexes,
                    is_async_storage,
                    is_authority,
                    is_component_relay,
                    is_diffed,
                    is_grouped_components,
                    is_ordered,
                    is_read_only,
                    is_symbol_leader,
                    is_symbol_relay,
                    on_update,
                    page_size,
                    responder,
                    skip_pending,
                    types,
                    set_grouped_value,
                    store_options,
                    update_options,
                }
            },
            OptionsInput::Instance(options) => {
                let options_props = options as OptionsProps;
                Options::new(&options_props, &action_this)
            },
        }
    }

    pub fn ensure(options: &OptionsInput<T>, action_this: Option<&Actions>) -> Options<'a, T> {
        Options::new(options, action_this)
    }

    pub fn clone(&self) -> Options<T> {
        Options::new(self, &self.actions)
    }

    pub fn extend(&self, options: &OptionsInput<T>, action_this: Option<&Actions>) -> Options<T> {
        match options {
            OptionsInput::Props(options) => {
                let OptionsProps {
                    actions,
                    batch_action_payload_sizes,
                    compress_strings_as_ints,
                    default_symbols,
                    enum_default_symbols,
                    enable_querying,
                    enable_rollback,
                    get_actor_id,
                    get_grouped_values,
                    indexes,
                    is_authority,
                    is_async_storage,
                    is_component_relay,
                    is_diffed,
                    is_grouped_components,
                    is_ordered,
                    is_read_only,
                    is_symbol_leader,
                    is_symbol_relay,
                    on_update,
                    page_size,
                    responder,
                    skip_pending,
                    types,
                    set_grouped_value,
                    store_options,
                    update_options,
                } = options;
        
                // TODO: Implement the rest of the extend function
                // let actions = actions.unwrap_or_else(|| action_this.unwrap_or_else(|| default_actions));
                // let add_symbol = add_symbol.unwrap_or_else(|| actions.add_symbol);
                // let batch_action_payload_sizes = batch_action_payload_sizes.unwrap_or_default();
                // let default_symbols = default_symbols.unwrap_or_else(|| DEFAULT_SYMBOLS.to_vec());
                // let enum_default_symbols = enum_default_symbols.unwrap_or_default();
                // let get_actor_id = get_actor_id.unwrap_or_else(|| DEFAULT_GET_ACTOR_ID);
                // let get_symbol = get_symbol.unwrap_or_else(|| actions.get_symbol);
                // let responder = responder.unwrap_or_else(|| VOID_RESPONDER);
                // let skip_pending = skip_pending.unwrap_or(DEFAULT_OPTIONS.skip_pending);
                // let compress_strings_as_ints = compress_strings_as_ints.unwrap_or(DEFAULT_OPTIONS.compress_strings_as_ints);
                // let is_symbol_leader = is_symbol_leader.unwrap_or(DEFAULT_OPTIONS.is_symbol_leader);
                // let is_symbol_relay = is_symbol_relay.unwrap_or(DEFAULT_OPTIONS.is_symbol_relay);
                // let is_component_relay = is_component_relay.unwrap_or(DEFAULT_OPTIONS.is_component_relay);
                // let is_ticked = is_ticked.unwrap_or(DEFAULT_OPTIONS.is_ticked);
                // let is_diffed = is_diffed.unwrap_or(DEFAULT_OPTIONS.is_diffed);
                // let is_rollback = is_rollback.unwrap_or(DEFAULT_OPTIONS.is_rollback);
                // let update_options = update_options.unwrap_or_default();
        
                Options {
                    actions,
                    batch_action_payload_sizes,
                    compress_strings_as_ints,
                    default_symbols,
                    enum_default_symbols,
                    enable_querying,
                    enable_rollback,
                    get_actor_id,
                    get_grouped_values,
                    indexes,
                    is_async_storage,
                    is_authority,
                    is_component_relay,
                    is_diffed,
                    is_grouped_components,
                    is_ordered,
                    is_read_only,
                    is_symbol_leader,
                    is_symbol_relay,
                    on_update,
                    page_size,
                    responder,
                    skip_pending,
                    types,
                    set_grouped_value,
                    store_options,
                    update_options,
                }
            },
            OptionsInput::Instance(options) => {
                let options_props = options as OptionsProps;
                self.extend(options_props, action_this)
            }
        }
    }
}
