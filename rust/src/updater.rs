// use futures::executor::block_on;
// use futures::stream::FuturesUnordered;
// use futures::{Future, StreamExt};
use promises::Promise;
use serde_json::{Value, json};
use std::error::Error;

use crate::string::str;
use crate::context::Context;
use crate::hash::HashMap;
use crate::options::Options;
use crate::pending::{
    // self,
    CreatedState, RemovedState, SymbolsState, UpdatedState
};
use crate::symbols::{ensure_symbol_index, recursive_symbol_indexes_ensured};
use crate::types::{
    UpdateOptions,
    // ValueEnum,
    // Mask,
    // ExtendedOptions,
    // EnumDefaultSymbols
};

type BatchBlock<'a> = Value;
// type BatchBlock<'a> = Vec<&'a Value>;

/**
 * The updater function updates the context based on the provided options.
 *
 * @param {Context} context - The current context.
 * @param {ExtendedOptions | any} options - The options for updating the context.
 */
pub fn updater<'a>(
    context: &Context<'a>,
    options: &Options<'a>,
    tick: i32,
) -> Promise<Vec<&'a Value>, Box<dyn Error + Send>> {
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

    if pending.is_none() {
        return Promise::resolve(Vec::new());
    }

    let mut pending = pending.unwrap();

    let mut created: CreatedState = pending.created;
    let mut removed: RemovedState = pending.removed;
    let _symbols: SymbolsState = *pending.symbols;
    let mut updated: UpdatedState = pending.updated;

    let mut batch: Vec<Value> = Vec::new();
    let mut batch_block: Vec<BatchBlock> = Vec::new();

    let mut merge_batch = |action: Value| {
        if *batched && !batch_block.is_empty() {
            let mut vec = vec![action];
            vec.append(&mut batch_block);
            batch.push(Value::Array(vec));
            batch_block.clear();
        }
    };

    let mut queue_message = |action: Value, payload: Value| {
        if *batched {
            batch_block.extend(*payload.as_array().unwrap());

            if batch_block.len() as u16 >= *batch_size {
                merge_batch(action);
            }
        } else {
            let action = if *compress_strings_as_ints {
                let result = ensure_symbol_index(str(action.as_str().unwrap()) , context, options);
                Value::Number(result.unwrap().into())
            } else {
                action
            };
            responder(&json!([action, payload]), Some((if *_type { 1 } else { 0 }) as u8));
        }
    };

    let ensure_symbol = |symbol: Value| -> Value {
        if *compress_strings_as_ints {
            let symbol = ensure_symbol_index(str(symbol.as_str().unwrap()), context, options);
            // let symbol = symbol
            Value::Number(symbol.unwrap().into())
        } else {
            symbol
        }
    };

    if mask.is_none() || !mask.unwrap().entities {
        let action = Value::Number(symbols.find(str("createEntity")).unwrap().into());

        for key in created.entities {
            let nkey = ensure_symbol(Value::String(*key));

            queue_message(action, nkey);
        }

        merge_batch(action);
        created.entities = &mut Vec::new();
    }

    if mask.is_none() || !mask.unwrap().actors {
        let action = Value::Number(symbols.find(str("spawnActor")).unwrap().into());

        for id in created.actors {
            let nid = ensure_symbol(Value::String(*id.0));
            queue_message(action, nid);
        }

        merge_batch(action);
        created.actors = &mut HashMap::new();
    }

    if mask.is_none() || !mask.unwrap().entities {
        let action = Value::Number(symbols.find(str("removeEntity")).unwrap().into());

        for key in removed.entities {
            let nkey = ensure_symbol(Value::String(*key));

            queue_message(action, nkey);
        }

        merge_batch(action);
        removed.entities = &mut Vec::new();
    }

    if !mask.is_none() || !mask.unwrap().actors {
        let action = Value::Number(symbols.find(str("removeActor")).unwrap().into());

        for id in removed.actors {
            let nid = ensure_symbol(Value::String(*id.0));

            queue_message(action, nid);
        }

        merge_batch(action);
        removed.actors = &mut HashMap::new();
    }

    if mask.is_none() || !mask.unwrap().components {
        let action = Value::Number(symbols.find(str("removeComponent")).unwrap().into());

        for (id, components) in removed.components {
            let nid = ensure_symbol(Value::String(*id));

            for (key, _) in components {
                if valid_keys.is_empty() || *valid_keys.get(&key).unwrap_or(&false) {
                    break;
                }

                let nkey = ensure_symbol(Value::String(*key));

                let payload = [nid, nkey];

                queue_message(action, Value::Array(payload.to_vec()));
            }
        }

        merge_batch(action);
        removed.components = &mut HashMap::new();
    }

    if mask.is_none() || !mask.unwrap().components {
        let components = context.components();
        let action = Value::Number(symbols.find(str("upsertComponent")).unwrap().into());

        for (id, _) in created.components {
            if components.is_empty() || components[&id].is_null() {
                break;
            }

            for (key, value) in components[&id].as_object().unwrap() {
                if valid_keys.is_empty() || *valid_keys.get(str(key)).unwrap_or(&false) {
                    break;
                }

                let nid = ensure_symbol(Value::String(*id));
                let nkey = ensure_symbol(Value::String(*str(key)));

                let payload = [nid, nkey, *value];

                queue_message(action, Value::Array(payload.to_vec()));
            }
        }

        merge_batch(action);
        created.components = &mut HashMap::new();
    }

    if mask.is_none() || !mask.unwrap().components {
        let components = context.components();

        let action = Value::Number(symbols.find(&str("upsertComponent")).unwrap().into());

        for (id, updated_components) in updated.components {
            if components.is_empty() || components[&id].is_null() {
                break;
            }

            for (key, _) in updated_components {
                if valid_keys.is_empty() || !valid_keys[key] {
                    break;
                }

                let mut value = components[&id][key];

                if *compress_strings_as_ints {
                    // value = value.unwrap_or_default();
                    value = *recursive_symbol_indexes_ensured(&key, &value, &context, &options);
                }

                let nid = ensure_symbol(Value::String(*id));
                let nkey = ensure_symbol(Value::String(*str(key)));

                let payload = [nid, nkey, value];

                queue_message(action, Value::Array(payload.to_vec()));
            }
        }

        merge_batch(action);
        updated.components = &mut HashMap::new();
    }

    if mask.is_none() || !mask.unwrap().inputs {
        let action = Value::Number(symbols.find(str("actorInput")).unwrap().into());

        for (id, createdInputs) in created.inputs {
            for index in createdInputs {
                let payload = createdInputs[*index as usize];

                let input = payload;

                queue_message(action, Value::Number(input.into()));
            }
        }

        merge_batch(action);
        created.inputs = &mut HashMap::new();
    }

    if mask.is_none() || !mask.unwrap().symbols {
        let action = Value::Number(symbols.find(str("mergeSymbol")).unwrap().into());

        for symbol_op in _symbols {
            if *batched {
                batch_block.push(json!([symbol_op.0, symbol_op.1]));
            } else {
                let message = json!([action, symbol_op]);
                responder(&message, Some((if *_type { 1 } else { 0 }) as u8));
            }

            if batch_block.len() as u16 >= *batch_size && !batch_block.is_empty() {
                let mut vec = vec![action];
                vec.append(&mut batch_block);
                batch.insert(0, Value::Array(vec));
                batch_block.clear();
            }
        }

        if *batched && !batch_block.is_empty() {
            let mut vec = vec![action];
            vec.append(&mut batch_block);
            batch.insert(0, Value::Array(vec));
            batch_block.clear();
        }

        pending.symbols = &mut Vec::new();
    }

    if *batched && !batch.is_empty() {
        let action = Value::Number(symbols.find(str("batch")).unwrap().into());

        for batch_slice in batch {
            // if let Some(batch_slice) = batch_slice {
            responder(&json!([action, batch_slice]), Some((if *_type { 1 } else { 0 }) as u8));
            // }
        }
        
    }

    // TODO: return the batch promise
    Promise::resolve(Vec::new())
}
