// use serde_json::Value;

use crate::hash::HashMap;
use crate::options::Options;
use crate::context::Context;
use crate::symbols::{
    ensure_symbol_index,
    recursive_symbol_indexes_ensured
};
use crate::pending::{
    // Pending,
    SymbolsState,
    CreatedState,
    RemovedState,
    UpdatedState
};
use crate::types::{
    UpdateOptions,
    ValueEnum,
    // Mask,
    // ExtendedOptions,
    // EnumDefaultSymbols
};

type BatchBlock = Vec<ValueEnum>;

/**
 * The updater function updates the context based on the provided options.
 *
 * @param {Context} context - The current context.
 * @param {ExtendedOptions | any} options - The options for updating the context.
 */
pub fn updater<T>(context: &Context<T>, options: &Options<T>, tick: i32) {
    let options = if let Options::ExtendedOptions(opt) = options {
        opt
    } else {
        &Options::new(&options, &context)
    };

    let Context {
        pending,
        symbols,
        ..
    } = context;

    let Options {
        responder,
        // enum_default_symbols,
        compress_strings_as_ints,
        update_options,
        ..
    } = options;

    let UpdateOptions {
        batched,
        batch_size,
        mask,
        _type,
        valid_keys,
    } = update_options;

    if pending.is_none() || pending.is_empty() {
        return;
    }

    let created: CreatedState = pending.created;
    let removed: RemovedState = pending.removed;
    let symbols: SymbolsState = pending.symbols;
    let updated: UpdatedState = pending.updated;

    let mut batch: Vec<Vec<ValueEnum>> = Vec::new();
    let mut batch_block: Vec<BatchBlock> = Vec::new();

    
    let merge_batch = |action: ValueEnum| {
        if batched && !batch_block.is_empty() {
            batch.push(vec![action].append(&mut batch_block));
            batch_block.clear();
        }
    };

    let queue_message = |action: ValueEnum, payload: ValueEnum| {
        if batched {
            batch_block.extend(payload);

            if batch_block.len() >= batch_size {
                merge_batch(action);
            }
        } else {
            if compress_strings_as_ints {
                action = ensure_symbol_index(action, context, options);
            }
            responder([action, payload], _type);
        }
    };

    let ensure_symbol = |symbol: ValueEnum| -> ValueEnum {
        if compress_strings_as_ints {
            symbol = ensure_symbol_index(symbol, context, options);
        }
        symbol
    };

    if !mask || !mask.entities {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("createEntity"))
            ).1
        );

        for key in created.entities.unwrap_or_default() {
            let nkey = ensure_symbol(key);

            queue_message(action, nkey);
        }

        merge_batch(action);
        created.entities = Vec::new();
    }

    if !mask || !mask.actors {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("spawnActor"))
            ).1
        );
        
        for id in created.actors.unwrap_or_default() {
            let nid = ensure_symbol(id);
            queue_message(action, nid);
        }

        merge_batch(action);
        created.actors = Vec::new();
    }

    if !mask || !mask.entities {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("removeEntity"))
            ).1
        );

        for key in removed.entities.unwrap_or_default() {
            let nkey = ensure_symbol(key);

            queue_message(action, nkey);
        }

        merge_batch(action);
        removed.entities = Vec::new();
    }

    if !mask || !mask.actors {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("removeActor"))
            ).1
        );

        for id in removed.actors.unwrap_or_default() {
            let nid = ensure_symbol(id);

            queue_message(action, nid);
        }

        merge_batch(action);
        removed.actors = Vec::new();
    }

    if !mask || !mask.components {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("removeComponent"))
            ).1
        );

        for (id, components) in removed.components.unwrap_or_default() {
            let nid = ensure_symbol(id);

            for (key, _) in components {
                if valid_keys && !valid_keys[key] {
                    break;
                }

                let nkey = ensure_symbol(key);

                let payload = [nid, nkey];

                queue_message(action, payload);
            }
        }

        merge_batch(action);
        removed.components = HashMap::new();
    }

    if !mask || !mask.components {
        let components = context.components;
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("upsertComponent"))
            ).1
        );

        for (id, _) in created.components.unwrap_or_default() {
            if !components || !components[id] {
                break;
            }

            for (key, value) in components[id] {
                if valid_keys && !valid_keys[key] {
                    break;
                }

                let nid = ensure_symbol(id);
                let nkey = ensure_symbol(key);

                let payload = [nid, nkey, value];

                queue_message(action, payload);
            }
        }

        merge_batch(action);
        created.components = HashMap::new();
    }

    if !mask || !mask.components {
        let components = context.components;
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("upsertComponent"))
            ).1
        );

        for (id, updatedComponents) in updated.components.unwrap_or_default() {
            if !components || !components[id] {
                break;
            }

            for (key, _) in updatedComponents[id] {
                if valid_keys && !valid_keys[key] {
                    break;
                }

                let value = components[id][key];

                if compress_strings_as_ints {
                    // value = value.unwrap_or_default();
                    value = &recursive_symbol_indexes_ensured(&key, &value, &context, &options);
                }

                let nid = ensure_symbol(id);
                let nkey = ensure_symbol(key);

                let payload = [nid, nkey, value];

                queue_message(action, payload);
            }
        }

        merge_batch(action);
        updated.components = HashMap::new();
    }

    if !mask || !mask.inputs {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("actorInput"))
            ).1
        );

        for (id, createdInputs) in created.inputs.unwrap_or_default() {
            for index in createdInputs.unwrap_or_default() {
                let payload = createdInputs[index];

                let input = payload;

                queue_message(action, input);
            }
        }

        merge_batch(action);
        created.inputs = HashMap::new();
    }

    if !mask || !mask.symbols {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("mergeSymbol"))
            ).1
        );

        for symbolOp in symbols {
            if batched {
                batch_block.push(symbolOp);
            } else {
                let message = [action, symbolOp];
                responder(message, _type);
            }

            if batch_block.len() >= batch_size && !batch_block.is_empty() {
                batch.insert(0, [action].append(&mut batch_block));
                batch_block.clear();
            }
        }

        if batched && !batch_block.is_empty() {
            batch.insert(0, [action].append(&mut batch_block));
            batch_block.clear();
        }

        context.pending.symbols = Vec::new();
    }

    if batched && !batch.is_empty() {
        let action = ValueEnum::Number(
            symbols.get(
                symbols.get(String::from("batch"))
            ).1
        );

        for batchSlice in batch {
            if let Some(batchSlice) = batchSlice {
                responder([action, batchSlice], _type);
            }
        }
    }
}
