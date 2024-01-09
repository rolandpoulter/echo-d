use crate::options::Options;
use crate::context::Context;
use crate::symbols::{ensure_symbol_index, recursive_symbol_indexes_ensured};
use crate::pending::{Pending, Created, Updated, Removed, UpdateOptions, Mask, ExtendedOptions, EnumDefaultSymbols};

/**
 * The updater function updates the context based on the provided options.
 *
 * @param {Context} context - The current context.
 * @param {ExtendedOptions | any} options - The options for updating the context.
 */
fn updater(context: Context, options: ExtendedOptions) {
    let options = if let Options::ExtendedOptions(opt) = options {
        opt
    } else {
        Options::new(options)
    };

    let Options {
        responder,
        enumDefaultSymbols,
        compressStringsAsInts,
        updateOptions,
    } = options;

    let OptionsUpdate {
        batched,
        batchSize,
        mask,
        type,
        validkeys,
    } = updateOptions;

    if !context.pending {
        return;
    }

    let mut batch: Vec<Vec<String | i32>> = Vec::new();
    let mut batchBlock: Vec<any> = Vec::new();

    let ContextPending {
        created = {},
        removed = {},
        symbols = [],
        updated = {},
    } = context.pending;

    fn mergeBatch(action: String | i32) {
        if batched && !batchBlock.is_empty() {
            batch.push(vec![action].append(&mut batchBlock));
            batchBlock.clear();
        }
    }

    fn queueMessage(action: String | i32, payload: any) {
        if batched {
            batchBlock.extend(payload);

            if batchBlock.len() >= batchSize {
                mergeBatch(action);
            }
        } else {
            if compressStringsAsInts {
                action = ensureSymbolIndex(action, context, options);
            }
            responder([action, payload], type);
        }
    }

    fn ensureSymbol(symbol: String | i32) -> String | i32 {
        if compressStringsAsInts {
            symbol = ensureSymbolIndex(symbol, context, options);
        }
        symbol
    }

    if !mask || !mask.entities {
        for key in created.entities.unwrap_or_default() {
            let nkey = ensureSymbol(key);

            queueMessage(enumDefaultSymbols.createEntity, nkey);
        }

        mergeBatch(enumDefaultSymbols.createEntity);
        created.entities = Vec::new();
    }

    if !mask || !mask.actors {
        for id in created.actors.unwrap_or_default() {
            let nid = ensureSymbol(id);

            queueMessage(enumDefaultSymbols.spawnActor, nid);
        }

        mergeBatch(enumDefaultSymbols.spawnActor);
        created.actors = Vec::new();
    }

    if !mask || !mask.entities {
        for key in removed.entities.unwrap_or_default() {
            let nkey = ensureSymbol(key);

            queueMessage(enumDefaultSymbols.removeEntity, nkey);
        }

        mergeBatch(enumDefaultSymbols.removeEntity);
        removed.entities = Vec::new();
    }

    if !mask || !mask.actors {
        for id in removed.actors.unwrap_or_default() {
            let nid = ensureSymbol(id);

            queueMessage(enumDefaultSymbols.removeActor, nid);
        }

        mergeBatch(enumDefaultSymbols.removeActor);
        removed.actors = Vec::new();
    }

    if !mask || !mask.components {
        for (id, components) in removed.components.unwrap_or_default() {
            let nid = ensureSymbol(id);

            for (key, _) in components {
                if validkeys && !validkeys[key] {
                    break;
                }

                let nkey = ensureSymbol(key);

                let payload = [nid, nkey];

                queueMessage(enumDefaultSymbols.removeComponent, payload);
            }
        }

        mergeBatch(enumDefaultSymbols.removeComponent);
        removed.components = HashMap::new();
    }

    if !mask || !mask.components {
        let components = context.components;

        for (id, _) in created.components.unwrap_or_default() {
            if !components || !components[id] {
                break;
            }

            for (key, value) in components[id] {
                if validkeys && !validkeys[key] {
                    break;
                }

                let nid = ensureSymbol(id);
                let nkey = ensureSymbol(key);

                let payload = [nid, nkey, value];

                queueMessage(enumDefaultSymbols.upsertComponent, payload);
            }
        }

        mergeBatch(enumDefaultSymbols.upsertComponent);
        created.components = HashMap::new();
    }

    if !mask || !mask.components {
        let components = context.components;

        for (id, updatedComponents) in updated.components.unwrap_or_default() {
            if !components || !components[id] {
                break;
            }

            for (key, _) in updatedComponents[id] {
                if validkeys && !validkeys[key] {
                    break;
                }

                let value = components[id][key];

                if compressStringsAsInts {
                    value = recursiveSymbolIndexesEnsured(key, value, context, options);
                }

                let nid = ensureSymbol(id);
                let nkey = ensureSymbol(key);

                let payload = [nid, nkey, value];

                queueMessage(enumDefaultSymbols.upsertComponent, payload);
            }
        }

        mergeBatch(enumDefaultSymbols.upsertComponent);
        updated.components = HashMap::new();
    }

    if !mask || !mask.inputs {
        for (id, createdInputs) in created.inputs.unwrap_or_default() {
            for index in createdInputs.unwrap_or_default() {
                let payload = createdInputs[index];

                let input = payload;

                queueMessage(enumDefaultSymbols.actorInput, input);
            }
        }

        mergeBatch(enumDefaultSymbols.actorInput);
        created.inputs = HashMap::new();
    }

    if !mask || !mask.symbols {
        for symbolOp in symbols {
            if batched {
                batchBlock.push(symbolOp);
            } else {
                let message = [enumDefaultSymbols.mergeSymbol, symbolOp];
                responder(message, type);
            }

            if batchBlock.len() >= batchSize && !batchBlock.is_empty() {
                batch.insert(0, [enumDefaultSymbols.mergeSymbol].append(&mut batchBlock));
                batchBlock.clear();
            }
        }

        if batched && !batchBlock.is_empty() {
            batch.insert(0, [enumDefaultSymbols.mergeSymbol].append(&mut batchBlock));
            batchBlock.clear();
        }

        context.pending.symbols = Vec::new();
    }

    if batched && !batch.is_empty() {
        for batchSlice in batch {
            if let Some(batchSlice) = batchSlice {
                responder([enumDefaultSymbols.batch, batchSlice]);
            }
        }
    }
}
