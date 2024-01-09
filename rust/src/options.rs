use crate::hash::HashMap;
use crate::node::actions as default_actions;
use crate::constants::*;

/**
 * The OptionsProps struct represents the properties for the Options struct.
 */
#[derive(Default)]
pub struct OptionsProps {
    actions: Option<Actions>,
    add_symbol: Option<fn()>,
    batch_action_payload_sizes: Option<BatchActionPayloadSizes>,
    default_symbols: Option<Vec<String>>,
    enum_default_symbols: Option<EnumDefaultSymbols>,
    get_actor_id: Option<fn()>,
    get_symbol: Option<fn()>,
    responder: Option<fn()>,
    skip_pending: Option<bool>,
    compress_strings_as_ints: Option<bool>,
    is_symbol_leader: Option<bool>,
    is_symbol_relay: Option<bool>,
    is_component_relay: Option<bool>,
    is_ticked: Option<bool>,
    is_diffed: Option<bool>,
    is_rollback: Option<bool>,
    update_options: Option<UpdateOptions>,
}

/**
 * The Options struct represents the options for a node.
 */
pub struct Options {
    actions: Actions,
    add_symbol: fn(),
    batch_action_payload_sizes: BatchActionPayloadSizes,
    default_symbols: Vec<String>,
    enum_default_symbols: EnumDefaultSymbols,
    get_actor_id: fn(),
    get_symbol: fn(),
    responder: fn(),
    skip_pending: bool,
    compress_strings_as_ints: bool,
    is_symbol_leader: bool,
    is_symbol_relay: bool,
    is_component_relay: bool,
    is_ticked: bool,
    is_diffed: bool,
    is_rollback: bool,
    update_options: UpdateOptions,
}

impl Options {
    /**
     * Constructs a new Options object.
     *
     * @param {OptionsProps | Options} options - The options for the node.
     * @param {any} action_this - The context for the actions.
     */
    pub fn new(options: OptionsProps | Options, action_this: Option<fn()>) -> Self {
        let OptionsProps {
            actions,
            add_symbol,
            batch_action_payload_sizes,
            default_symbols,
            enum_default_symbols,
            get_actor_id,
            get_symbol,
            responder,
            skip_pending,
            compress_strings_as_ints,
            is_symbol_leader,
            is_symbol_relay,
            is_component_relay,
            is_ticked,
            is_diffed,
            is_rollback,
            update_options,
        } = options;

        let actions = actions.unwrap_or_else(|| action_this.unwrap_or_else(|| default_actions));
        let add_symbol = add_symbol.unwrap_or_else(|| actions.add_symbol);
        let batch_action_payload_sizes = batch_action_payload_sizes.unwrap_or_default();
        let default_symbols = default_symbols.unwrap_or_else(|| DEFAULT_SYMBOLS.to_vec());
        let enum_default_symbols = enum_default_symbols.unwrap_or_default();
        let get_actor_id = get_actor_id.unwrap_or_else(|| DEFAULT_GET_ACTOR_ID);
        let get_symbol = get_symbol.unwrap_or_else(|| actions.get_symbol);
        let responder = responder.unwrap_or_else(|| VOID_RESPONDER);
        let skip_pending = skip_pending.unwrap_or(DEFAULT_OPTIONS.skip_pending);
        let compress_strings_as_ints = compress_strings_as_ints.unwrap_or(DEFAULT_OPTIONS.compress_strings_as_ints);
        let is_symbol_leader = is_symbol_leader.unwrap_or(DEFAULT_OPTIONS.is_symbol_leader);
        let is_symbol_relay = is_symbol_relay.unwrap_or(DEFAULT_OPTIONS.is_symbol_relay);
        let is_component_relay = is_component_relay.unwrap_or(DEFAULT_OPTIONS.is_component_relay);
        let is_ticked = is_ticked.unwrap_or(DEFAULT_OPTIONS.is_ticked);
        let is_diffed = is_diffed.unwrap_or(DEFAULT_OPTIONS.is_diffed);
        let is_rollback = is_rollback.unwrap_or(DEFAULT_OPTIONS.is_rollback);
        let update_options = update_options.unwrap_or_default();

        Options {
            actions,
            add_symbol,
            batch_action_payload_sizes,
            default_symbols,
            enum_default_symbols,
            get_actor_id,
            get_symbol,
            responder,
            skip_pending,
            compress_strings_as_ints,
            is_symbol_leader,
            is_symbol_relay,
            is_component_relay,
            is_ticked,
            is_diffed,
            is_rollback,
            update_options,
        }
    }
}
