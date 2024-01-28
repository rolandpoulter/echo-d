import { Options } from './options.js';
import { ensureSymbolIndex, recursiveSymbolIndexesEnsured } from './symbols.js';
import { ArrayTypes } from './types.js';
import { now, concatTypedArray } from './utils.js';
/**
 * The updater function updates the context based on the provided options.
 *
 * @param {Context} context - The current context.
 * @param {Options | any} options - The options for updating the context.
 * @param {number} tick - The current tick.
 * @returns {Promise<any[]>} A promise that resolves to an array of arrays, where each sub-array represents a batch of updates. This is only relevant if the `batched` option is enabled.
 */
export async function updater(context, options, tick = now()) {
    options = options instanceof Options ? options : new Options(options);
    const { responder, enumDefaultSymbols, compressStringsAsInts, enableRollback, isOrdered, isDiffed, isGroupedComponents, isAsyncStorage, types, setGroupedValue, updateOptions } = options;
    const { batched, batchSize, mask, type, validKeys } = updateOptions;
    if (!context.pending) {
        return [];
    }
    /**
     * An array of arrays, where each sub-array represents a batch of updates.
    */
    const batch = [];
    /**
     * An array representing the current batch of updates.
    */
    let batchBlock = [];
    const { created = {}, removed = {}, symbols = [], updated = {} } = context.pending;
    const store = context.store;
    /**
     * Merges the current batch block into the batch array.
     *
     * @param {string | number} action - The action associated with the current batch block.
     */
    const mergeBatch = (action) => {
        if (batched && batchBlock.length) {
            batch.push([action, ...batchBlock]);
            batchBlock = [];
        }
    };
    /**
     * Queues a message for later processing.
     *
     * @param {string | number} action - The action associated with the message.
     * @param {any} payload - The payload of the message.
     */
    const queueMessage = (action, payload) => {
        if (batched) {
            // batchBlock.push(payload)
            batchBlock = batchBlock.concat(payload);
            if (batchBlock.length >= batchSize) {
                mergeBatch(action);
            }
        }
        else {
            if (compressStringsAsInts) {
                action = ensureSymbolIndex(action, context, options);
            }
            responder([action, payload], type);
        }
    };
    /**
     * Ensures that a symbol is indexed if the `compressStringsAsInts` option is enabled.
     *
     * @param {string | number} symbol - The symbol to be indexed.
     * @returns {string | number} The indexed symbol, or the original symbol if `compressStringsAsInts` is not enabled.
     */
    const ensureSymbol = (symbol) => {
        if (compressStringsAsInts) {
            symbol = ensureSymbolIndex(symbol, context, options);
        }
        return symbol;
    };
    const upsertComponents = async (pendingComponents = {}, state) => {
        const groups = isGroupedComponents ? {} : null;
        for (const id in (pendingComponents ?? {})) {
            const components = isAsyncStorage ? await store.findComponents(id) : store.findComponents(id);
            if (!components) {
                break;
            }
            const updatedComponents = pendingComponents ? pendingComponents[id] : {};
            for (const key in (updatedComponents ?? {})) {
                if (validKeys && !validKeys[key]) {
                    break;
                }
                const type = types[key] ?? null;
                const Type = type ? ArrayTypes.get(Array.isArray(type) ? type[0] : type) : null;
                let group = null;
                if (groups) {
                    group = groups[key] = groups[key] ?? {
                        key,
                        ids: compressStringsAsInts ? new Uint32Array(0) : [],
                        intIds: true,
                        values: Type ? new Type(0) : [],
                        ticks: new Uint32Array(0),
                    };
                }
                let value = isAsyncStorage ? await store.findComponent(id, key) : store.findComponent(id, key);
                if (isDiffed && context.changes && (state === 'updated' || !true)) {
                    value = context.changes.getValue(id, key, value);
                }
                if (compressStringsAsInts) {
                    value = recursiveSymbolIndexesEnsured(key, value, context, options);
                }
                const nid = ensureSymbol(id);
                const nkey = ensureSymbol(key);
                if (groups) {
                    group.ids = compressStringsAsInts
                        ? concatTypedArray(group.ids, [nid])
                        : group.ids.concat([id]);
                    if (nid === id) {
                        group.intIds = false;
                    }
                    group.values = Type
                        ? concatTypedArray(group.values, setGroupedValue(value, types, key))
                        : group.values.concat(setGroupedValue(value, types, key));
                    if (isOrdered) {
                        group.ticks = concatTypedArray(group.ticks, [isDiffed ? -tick : tick]);
                    }
                    continue;
                }
                const payload = [nid, nkey, value];
                if (isOrdered) {
                    payload.push(isDiffed ? -tick : tick);
                }
                if (isDiffed) {
                    queueMessage(enumDefaultSymbols.changeComponent, payload);
                }
                else {
                    queueMessage(enumDefaultSymbols.upsertComponent, payload);
                }
            }
            // delete pendingComponents[id];
        }
        if (groups) {
            for (const key in groups) {
                const group = groups[key];
                const bufferIds = compressStringsAsInts && group.intIds ? new Uint32Array(group.ids) : group.ids;
                const type = types[key] ?? null;
                const Type = type ? ArrayTypes.get(Array.isArray(type) ? type[0] : type) : null;
                const bufferValues = Type ? new Type(group.values) : group.values;
                let i = 0;
                const size = bufferIds.length;
                for (; i < size; i += batchSize) {
                    const payload = [
                        bufferIds.slice(i, i + batchSize),
                        group.key,
                        bufferValues.slice(i, i + batchSize)
                    ];
                    if (isOrdered) {
                        const bufferTicks = new Uint32Array(group.ticks.slice(i, i + batchSize));
                        payload.push(bufferTicks);
                    }
                    if (isDiffed) {
                        queueMessage(enumDefaultSymbols.changeComponent, payload);
                    }
                    else {
                        queueMessage(enumDefaultSymbols.upsertComponent, payload);
                    }
                }
            }
        }
        mergeBatch(isDiffed ? enumDefaultSymbols.changeComponent : enumDefaultSymbols.upsertComponent);
    };
    /**
     * If the `mask` object does not exist or does not have an `entities` property,
     * this code block ensures that each entity in the `created.entities` array is indexed,
     * queues a message to create each entity, merges the batch of messages, and then clears the `created.entities` array.
     */
    if (!mask || !mask.entities) {
        for (const key of created.entities ?? []) {
            const nkey = ensureSymbol(key);
            queueMessage(enumDefaultSymbols.createEntity, nkey);
        }
        mergeBatch(enumDefaultSymbols.createEntity);
        created.entities = [];
    }
    /**
     * If the `mask` object does not exist or does not have an `actors` property,
     * this code block ensures that each actor in the `created.actors` array is indexed,
     * queues a message to spawn each actor, merges the batch of messages, and then clears the `created.actors` array.
     */
    if (!mask || !mask.actors) {
        for (const id in (created.actors ?? {})) {
            const nid = ensureSymbol(id);
            queueMessage(enumDefaultSymbols.spawnActor, nid);
        }
        mergeBatch(enumDefaultSymbols.spawnActor);
        created.actors = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `removed.components` object is indexed,
     * queues a message to remove each component, merges the batch of messages, and then clears the `removed.components` object.
     */
    if (!mask || !mask.entities) {
        for (const key of removed.entities ?? []) {
            const nkey = ensureSymbol(key);
            queueMessage(enumDefaultSymbols.removeEntity, nkey);
        }
        mergeBatch(enumDefaultSymbols.removeEntity);
        removed.entities = [];
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `removed.components` object is indexed,
     * queues a message to remove each component, merges the batch of messages, and then clears the `removed.components` object.
     */
    if (!mask || !mask.actors) {
        for (const id in (removed.actors ?? {})) {
            const nid = ensureSymbol(id);
            queueMessage(enumDefaultSymbols.removeActor, nid);
        }
        mergeBatch(enumDefaultSymbols.removeActor);
        removed.actors = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `removed.components` object is indexed,
     * queues a message to remove each component, merges the batch of messages, and then clears the `removed.components` object.
     */
    if (!mask || !mask.components) {
        for (const id in (removed.components ?? {})) {
            const components = removed?.components ? removed.components[id] : null;
            if (!components) {
                break;
            }
            const nid = ensureSymbol(id);
            for (const key in components) {
                if (validKeys && !validKeys[key]) {
                    break;
                }
                const nkey = ensureSymbol(key);
                const payload = [nid, nkey];
                queueMessage(enumDefaultSymbols.removeComponent, payload);
            }
            // delete removed.components[key]
        }
        mergeBatch(enumDefaultSymbols.removeComponent);
        removed.components = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `created.components` object is indexed,
     * queues a message to create each component, merges the batch of messages, and then clears the `created.components` object.
     */
    if (!mask || !mask.components) {
        const promise = upsertComponents(created.components, 'created');
        created.components = {};
        await promise;
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `updated.components` object is indexed,
     * queues a message to update each component, merges the batch of messages, and then clears the `updated.components` object.
     */
    if (!mask || !mask.components) {
        const promise = upsertComponents(updated.components, 'updated');
        updated.components = {};
        await promise;
    }
    /**
     * If the `mask` object does not exist or does not have an `inputs` property,
     * this code block ensures that each input in the `created.inputs` object is indexed,
     * queues a message to create each input, merges the batch of messages, and then clears the `created.inputs` object.
     */
    if (!mask || !mask.inputs) {
        for (const id in (created.inputs ?? {})) {
            // const nid = ensureSymbol(id)
            const createdInputs = created?.inputs ? (created.inputs[id] ?? []) : [];
            for (let i = 0; i < createdInputs.length; i += 1) {
                const index = createdInputs[i];
                const payload = isAsyncStorage ? await store.findInput(id, index) : store.findInput(id, index);
                const isTuple = Array.isArray(payload);
                const input = isTuple ? payload[0] : payload;
                const tick_ = isTuple ? payload[1] : tick;
                queueMessage(enumDefaultSymbols.actorInput, isTuple || enableRollback ? [input, tick_] : input);
            }
            // delete created.inputs[id];
        }
        mergeBatch(enumDefaultSymbols.actorInput);
        created.inputs = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `symbols` property,
     * this code block ensures that each symbol in the `symbols` array is indexed,
     * queues a message to add each symbol, merges the batch of messages, and then clears the `symbols` array.
     */
    if (!mask || !mask.symbols) {
        for (const symbolOp of symbols) {
            if (batched) {
                batchBlock.push(symbolOp);
            }
            else {
                const message = [enumDefaultSymbols.mergeSymbol, symbolOp];
                await responder(message, type);
            }
            if (batchBlock.length >= batchSize && batchBlock.length) {
                batch.unshift([enumDefaultSymbols.mergeSymbol].concat(batchBlock));
                batchBlock = [];
            }
        }
        if (batched && batchBlock.length) {
            batch.unshift([enumDefaultSymbols.mergeSymbol].concat(batchBlock));
            batchBlock = [];
        }
        context.pending.symbols = [];
    }
    /**
     * If the `mask` object does not exist or does not have a `symbols` property,
     * this code block ensures that each symbol in the `symbols` array is indexed,
     * queues a message to add each symbol, merges the batch of messages, and then clears the `symbols` array.
     */
    if (batched && batch.length) {
        for (let i = 0; i < batch.length; i += 1) {
            const batchSlice = batch[i];
            if (batchSlice) {
                await responder([enumDefaultSymbols.batch, batchSlice]);
                // if (batchSlice.length > 1) {
                //   responder([enumDefaultSymbols.batch].concat(batchSlice))
                // } else {
                //   responder(batchSlice)
                // }
            }
        }
    }
    return batch;
}
export default updater;
