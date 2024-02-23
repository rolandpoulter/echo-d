use serde_json::Value;
// use std::any::Any;

use crate::constants::{
    default_get_actor_id,
    default_get_grouped_value,
    // default_on_update,
    default_set_grouped_value,
    void_responder,
    // PayloadWithId,
    DEFAULT_OPTIONS,
    DEFAULT_PAGE_SIZE,
    DEFAULT_STORAGE_OPTIONS,
    DEFAULT_SYMBOLS,
    DEFAULT_UPDATE_OPTIONS,
    ENUM_DEFAULT_SYMBOLS,
};
use crate::context::Context;
use crate::hash::HashMap;
use crate::node::ACTIONS as DEFAULT_ACTIONS;
use crate::types::{
    // ActorPayload,
    Actions,
    BatchActionPayloadSizes,
    EnumDefaultSymbols,
    IndexParams,
    Indexes,
    // Payload,
    PayloadSize,
    StorageOptions,
    Type,
    Types,
    UpdateOptions,
};

/**
 * The OptionsProps struct represents the properties for the Options struct.
 */
#[derive(Default, Clone)]
pub struct OptionsProps<'a> {
    pub actions: Option<Actions<'a>>,
    pub batch_action_payload_sizes: Option<BatchActionPayloadSizes<'a>>,
    pub compress_strings_as_ints: Option<bool>,
    pub default_symbols: Option<Vec<&'a String>>,
    pub enum_default_symbols: Option<EnumDefaultSymbols<'a>>,
    pub enable_querying: Option<bool>,
    pub enable_rollback: Option<bool>,
    // pub get_actor_id: Option<fn(&dyn PayloadWithId, &Context<'a>) -> Option<&'a String>>,
    pub get_actor_id: Option<fn(&Value, &Context<'a>) -> Option<&'a String>>,
    pub get_grouped_values: Option<fn(&Value, u32, &Types, &String) -> &'a Value>,
    pub indexes: Option<Indexes<'a>>,
    pub is_authority: Option<bool>,
    pub is_async_storage: Option<bool>,
    pub is_component_relay: Option<bool>,
    pub is_diffed: Option<bool>,
    pub is_grouped_components: Option<bool>,
    pub is_ordered: Option<bool>,
    pub is_read_only: Option<bool>,
    pub is_symbol_leader: Option<bool>,
    pub is_symbol_relay: Option<bool>,
    pub on_update: Option<fn()>,
    pub page_size: Option<i16>,
    pub responder: Option<fn(&Value, Option<u8>)>,
    pub skip_pending: Option<bool>,
    pub types: Option<Types<'a>>,
    pub set_grouped_value: Option<fn(&Value, &Types, &String) -> &'a Value>,
    pub store_options: Option<StorageOptions<'a>>,
    pub update_options: Option<UpdateOptions<'a>>,
    // pub world_options: Option<&WorldOptions>,
}

pub enum OptionsInput<'a> {
    Props(OptionsProps<'a>),
    Instance(Options<'a>),
}

/**
 * The Options struct represents the options for a node.
 */
#[derive(Clone)]
pub struct Options<'a> {
    pub actions: Actions<'a>,
    pub batch_action_payload_sizes: BatchActionPayloadSizes<'a>,
    pub compress_strings_as_ints: bool,
    pub default_symbols: Vec<&'a String>,
    pub enum_default_symbols: EnumDefaultSymbols<'a>,
    pub enable_querying: bool,
    pub enable_rollback: bool,
    pub get_actor_id: fn(&Value, &Context<'a>) -> Option<&'a String>,
    pub get_grouped_values: fn(&Value, u32, &Types, &String) -> &'a Value,
    pub indexes: Indexes<'a>,
    pub is_authority: bool,
    pub is_async_storage: bool,
    pub is_component_relay: bool,
    pub is_diffed: bool,
    pub is_grouped_components: bool,
    pub is_ordered: bool,
    pub is_read_only: bool,
    pub is_symbol_leader: bool,
    pub is_symbol_relay: bool,
    pub on_update: Option<fn()>,
    pub page_size: i16,
    pub responder: fn(d: &Value, t: Option<u8>),
    pub skip_pending: bool,
    pub types: Types<'a>,
    pub set_grouped_value: fn(v: &Value, t: &Types, k: &String) -> &'a Value,
    pub store_options: StorageOptions<'a>,
    pub update_options: UpdateOptions<'a>,
}

impl<'a> Options<'a> {
    /**
     * Constructs a new Options object.
     *
     * @param {OptionsInput} options - The options for the node.
     * @param {Option<Actions>} actions_self - The context for the actions.
     */
    pub fn new(options: &OptionsInput, actions_self: Option<&Actions>) -> Self {
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
                    Some(actions) => *actions,
                    None => actions.unwrap_or_else(|| DEFAULT_ACTIONS.clone()),
                };

                let batch_action_payload_sizes = batch_action_payload_sizes
                    .unwrap_or_else(|| HashMap::<&String, PayloadSize>::new());
                let compress_strings_as_ints =
                    compress_strings_as_ints.unwrap_or(DEFAULT_OPTIONS.compress_strings_as_ints);
                let default_symbols = default_symbols.unwrap_or(DEFAULT_SYMBOLS.clone());
                let enable_querying = enable_querying.unwrap_or(DEFAULT_OPTIONS.enable_querying);
                let enable_rollback = enable_rollback.unwrap_or(DEFAULT_OPTIONS.enable_rollback);
                let enum_default_symbols =
                    enum_default_symbols.unwrap_or(ENUM_DEFAULT_SYMBOLS.clone());
                let get_actor_id = get_actor_id.unwrap_or(
                    default_get_actor_id
                        as fn(&Value, &Context<'a>) -> Option<&'a String>,
                );
                let get_grouped_values = get_grouped_values.unwrap_or(
                    default_get_grouped_value as fn(&Value, u32, &Types, &String) -> &'a Value,
                );
                let indexes = indexes.unwrap_or_else(|| HashMap::<&String, &IndexParams>::new());
                let is_async_storage = is_async_storage.unwrap_or(DEFAULT_OPTIONS.is_async_storage);
                let is_authority = is_authority.unwrap_or(DEFAULT_OPTIONS.is_authority);
                let is_component_relay =
                    is_component_relay.unwrap_or(DEFAULT_OPTIONS.is_component_relay);
                let is_diffed = is_diffed.unwrap_or(DEFAULT_OPTIONS.is_diffed);
                let is_grouped_components =
                    is_grouped_components.unwrap_or(DEFAULT_OPTIONS.is_grouped_components);
                let is_ordered = is_ordered.unwrap_or(DEFAULT_OPTIONS.is_ordered);
                let is_read_only = is_read_only.unwrap_or(DEFAULT_OPTIONS.is_read_only);
                let is_symbol_leader = is_symbol_leader.unwrap_or(DEFAULT_OPTIONS.is_symbol_leader);
                let is_symbol_relay = is_symbol_relay.unwrap_or(DEFAULT_OPTIONS.is_symbol_relay);
                let on_update = on_update; // .unwrap_or(default_on_update as fn());
                let page_size = page_size.unwrap_or(DEFAULT_PAGE_SIZE as i16);
                let responder = responder.unwrap_or(void_responder as fn(&Value, Option<u8>));
                let skip_pending = skip_pending.unwrap_or(DEFAULT_OPTIONS.skip_pending);
                let types = types.unwrap_or(HashMap::<&String, &Type>::new());
                let set_grouped_value = set_grouped_value.unwrap_or(
                    default_set_grouped_value as fn(&Value, &Types, &String) -> &'a Value,
                );
                let store_options = store_options.unwrap_or(DEFAULT_STORAGE_OPTIONS.clone());
                let update_options = update_options.unwrap_or(DEFAULT_UPDATE_OPTIONS.clone());

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
                    on_update: *on_update,
                    page_size,
                    responder,
                    skip_pending,
                    types,
                    set_grouped_value,
                    store_options,
                    update_options,
                }
            }
            OptionsInput::Instance(options) => {
                let Options {
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
                Options {
                    actions: *actions,
                    batch_action_payload_sizes: *batch_action_payload_sizes,
                    compress_strings_as_ints: *compress_strings_as_ints,
                    default_symbols: *default_symbols,
                    enum_default_symbols: *enum_default_symbols,
                    enable_querying: *enable_querying,
                    enable_rollback: *enable_rollback,
                    get_actor_id: *get_actor_id,
                    get_grouped_values: *get_grouped_values,
                    indexes: *indexes,
                    is_async_storage: *is_async_storage,
                    is_authority: *is_authority,
                    is_component_relay: *is_component_relay,
                    is_diffed: *is_diffed,
                    is_grouped_components: *is_grouped_components,
                    is_ordered: *is_ordered,
                    is_read_only: *is_read_only,
                    is_symbol_leader: *is_symbol_leader,
                    is_symbol_relay: *is_symbol_relay,
                    on_update: *on_update,
                    page_size: *page_size,
                    responder: *responder,
                    skip_pending: *skip_pending,
                    types: *types,
                    set_grouped_value: *set_grouped_value,
                    store_options: *store_options,
                    update_options: *update_options,
                }
            }
        }
    }

    pub fn ensure(options: &OptionsInput, actions_self: Option<&Actions>) -> Options<'a> {
        Options::new(options, actions_self)
    }

    pub fn clone(&self) -> Options {
        Options::new(&OptionsInput::Instance(self.clone()), Some(&self.actions))
    }

    pub fn extend(&self, options: &OptionsInput, actions_self: Option<&Actions>) -> Options {
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

                Options {
                    actions: *actions_self.unwrap_or(&actions.unwrap_or(self.actions)),
                    batch_action_payload_sizes: batch_action_payload_sizes
                        .unwrap_or(self.batch_action_payload_sizes),
                    compress_strings_as_ints: compress_strings_as_ints.unwrap(),
                    default_symbols: default_symbols.unwrap_or(self.default_symbols),
                    enum_default_symbols: enum_default_symbols.unwrap_or(self.enum_default_symbols),
                    enable_querying: enable_querying.unwrap_or(self.enable_querying),
                    enable_rollback: enable_rollback.unwrap_or(self.enable_rollback),
                    get_actor_id: get_actor_id.unwrap_or(self.get_actor_id),
                    get_grouped_values: get_grouped_values.unwrap_or(self.get_grouped_values),
                    indexes: indexes.unwrap_or(self.indexes),
                    is_async_storage: is_async_storage.unwrap_or(self.is_async_storage),
                    is_authority: is_authority.unwrap_or(self.is_authority),
                    is_component_relay: is_component_relay.unwrap_or(self.is_component_relay),
                    is_diffed: is_diffed.unwrap_or(self.is_diffed),
                    is_grouped_components: is_grouped_components
                        .unwrap_or(self.is_grouped_components),
                    is_ordered: is_ordered.unwrap_or(self.is_ordered),
                    is_read_only: is_read_only.unwrap_or(self.is_read_only),
                    is_symbol_leader: is_symbol_leader.unwrap_or(self.is_symbol_leader),
                    is_symbol_relay: is_symbol_relay.unwrap_or(self.is_symbol_relay),
                    on_update: *on_update, // .unwrap_or(self.on_update),
                    page_size: page_size.unwrap_or(self.page_size),
                    responder: responder.unwrap_or(self.responder),
                    skip_pending: skip_pending.unwrap_or(self.skip_pending),
                    types: types.unwrap_or(self.types),
                    set_grouped_value: set_grouped_value.unwrap_or(self.set_grouped_value),
                    store_options: store_options.unwrap_or(self.store_options),
                    update_options: update_options.unwrap_or(self.update_options),
                }
            }
            OptionsInput::Instance(options) => {
                let Options {
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
                let options_props = OptionsProps {
                    actions: Some(*actions),
                    batch_action_payload_sizes: Some(*batch_action_payload_sizes),
                    compress_strings_as_ints: Some(*compress_strings_as_ints),
                    default_symbols: Some(*default_symbols),
                    enum_default_symbols: Some(*enum_default_symbols),
                    enable_querying: Some(*enable_querying),
                    enable_rollback: Some(*enable_rollback),
                    get_actor_id: Some(*get_actor_id),
                    get_grouped_values: Some(*get_grouped_values),
                    indexes: Some(*indexes),
                    is_async_storage: Some(*is_async_storage),
                    is_authority: Some(*is_authority),
                    is_component_relay: Some(*is_component_relay),
                    is_diffed: Some(*is_diffed),
                    is_grouped_components: Some(*is_grouped_components),
                    is_ordered: Some(*is_ordered),
                    is_read_only: Some(*is_read_only),
                    is_symbol_leader: Some(*is_symbol_leader),
                    is_symbol_relay: Some(*is_symbol_relay),
                    on_update: *on_update, // Some(*on_update),
                    page_size: Some(*page_size),
                    responder: Some(*responder),
                    skip_pending: Some(*skip_pending),
                    types: Some(*types),
                    set_grouped_value: Some(*set_grouped_value),
                    store_options: Some(*store_options),
                    update_options: Some(*update_options),
                };
                self.extend(&OptionsInput::Props(options_props), actions_self)
            }
        }
    }
}
