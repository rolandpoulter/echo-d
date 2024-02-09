import { Context } from './context.js';
import { Options } from './options.js';
import { Storage } from './storage.js';
import { updater } from './updater.js';
import { now } from './utils.js';
/**
 * Gets the symbol action.
 *
 * @param {string | number} action - The action.
 * @param {Record<number, string> | null} defaultSymbols - The default symbols.
 * @returns {string} The symbol action.
 */
export function getSymbolAction(action, defaultSymbols) {
    if (defaultSymbols && typeof action === 'number' && defaultSymbols[action]) {
        return defaultSymbols[action];
    }
    if (action === null || action === undefined) {
        return '';
    }
    return action.toString();
}
/**
 * Gets the action handler.
 *
 * @param {string | number} action - The action.
 * @param {OptionsExtended | any} options - The options.
 * @returns {[Function, string]} The action handler and the symbol action.
 */
export function getActionHandler(action, options) {
    options = options instanceof Options ? options : new Options(options);
    const { actions, defaultSymbols } = options;
    const symbol = getSymbolAction(action, defaultSymbols) || '';
    const handler = actions[symbol] || null;
    return [handler, symbol];
}
/**
 * Handles a single message.
 *
 * @param {Message | any[]} message - The message to handle.
 * @param {Context} context - The context for the handler.
 * @param {OptionsExtended | any} options - The options for the handler.
*/
export function oneHandler(message, context, options) {
    options = options instanceof Options ? options : new Options(options);
    if (Array.isArray(message)) {
        const [handler] = getActionHandler(message[0], options);
        if (handler) {
            handler(message[1], context, options);
        }
    }
    else if (message) {
        const [handler] = getActionHandler(message.action, options);
        if (handler) {
            handler(message.payload, context, options);
        }
    }
}
export const handler = manyHandler;
/**
 * Handles multiple messages.
 *
 * @param {Message | any[]} message - The messages to handle.
 * @param {Context} context - The context for the handler.
 * @param {OptionsExtended | any} options - The options for the handler.
 */
export function manyHandler(message, context, options) {
    options = options instanceof Options ? options : new Options(options);
    const { batchActionPayloadSizes, isOrdered, enableRollback } = options;
    const iterator = (payload, handler, payloadSize, offset = 0) => {
        if (payload.length && payload.length === offset && payloadSize === offset) {
            handler(undefined, context, options);
        }
        else
            for (let i = offset; i < payload.length; i += payloadSize) {
                // Call the handler function with the payload
                if (payloadSize === 1) {
                    handler(payload[i], context, options);
                }
                else if (batchActionPayloadSizes) {
                    handler(payload.slice(i, i + payloadSize), context, options);
                }
                else {
                    // console.warn('BATCH MISMATCH')
                }
            }
    };
    const getPayloadSize = (symbol) => {
        // Use the action from the handler Function
        let payloadSize = batchActionPayloadSizes[symbol] || 1;
        if (payloadSize && typeof payloadSize === 'object') {
            if (payloadSize.ordered && isOrdered) {
                payloadSize = payloadSize.ordered;
            }
            else if (payloadSize.rollback && enableRollback) {
                payloadSize = payloadSize.rollback;
            }
            else {
                payloadSize = payloadSize.default;
            }
        }
        return payloadSize;
    };
    if (Array.isArray(message)) {
        if (typeof message[0] === 'object') {
            for (let i = 0; i < message.length; i++) {
                manyHandler(message[i], context, options);
            }
        }
        else {
            const [handler, symbol] = getActionHandler(message[0], options);
            if (handler) {
                const payloadSize = getPayloadSize(symbol);
                iterator(message, handler, payloadSize, 1);
            }
        }
    }
    else if (message) {
        const [handler, symbol] = getActionHandler(message.action, options);
        if (handler) {
            const payloadSize = getPayloadSize(symbol);
            iterator(message.payload, handler, payloadSize, 0);
        }
    }
}
/**
 * The Handler class. It handles messages.
 */
export class Handler {
    context;
    options;
    /**
     * Creates a new Handler instance.
     *
     * @param {Context | any} context - The context for the handler.
     * @param {Options | any} options - The options for the handler.
     * @param {Object} actions - The actions for the handler.
     * @param {Storage} _Storage - The storage for the handler.
     */
    constructor(context, options, actions, _Storage = Storage) {
        this.options = Options.ensure(options, actions);
        this.context = Context.ensure(context, options, _Storage);
    }
    /**
     * Gets the store from the context.
     */
    get store() {
        return this.context.store;
    }
    /**
     * Handles a single message.
     *
     * @param {Message | any[]} message - The message to handle.
     */
    one(message, extendOptions) {
        return oneHandler(message, this.context, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Handles multiple messages.
     *
     * @param {Message | any[]} message - The messages to handle.
     */
    many(message, extendOptions) {
        return manyHandler(message, this.context, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Gets the action handler.
     */
    getActionHandler(action) {
        return getActionHandler(action, this.options);
    }
    /**
     * Gets the symbol action.
     *
     * @param {string | number} action - The action.
     */
    getSymbolAction(action) {
        return getSymbolAction(action, this.options.defaultSymbols);
    }
    /**
     * Updates other nodes in the network.
     *
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     * @param {number} tick - The tick for updating.
     * @returns {Promise<any[]>} A promise that resolves with updated batch of messages.
     */
    updater(extendOptions, tick = now()) {
        return updater(this.context, extendOptions ? this.options.extend(extendOptions) : this.options, tick);
    }
    /**
     * Spawns an actor.
     *
     * @param {string} id - The ID of the actor to spawn.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    spawnActor(id, extendOptions) {
        return this.context.spawnActor(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Despawns an actor.
     *
     * @param {string} id - The ID of the actor to despawn.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    removeActor(id, extendOptions) {
        return this.context.removeActor(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Updates an actor with an input.
     *
     * @param {string} id - The ID of the actor to update.
     * @param {any} input - The input for updating.
     * @param {number} tick - The tick for updating.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    actorInput(id, input, tick = now(), extendOptions) {
        return this.context.actorInput(id, input, tick, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Creates an entity.
     *
     * @param {string} id - The ID of the entity to create.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    createEntity(id, extendOptions) {
        return this.context.createEntity(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Removes an entity.
     *
     * @param {string} id - The ID of the entity to remove.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    removeEntity(id, extendOptions) {
        return this.context.removeEntity(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Sets a component to an entity.
     *
     * @param {string} id - The ID of the entity to add the component to.
     * @param {string} key - The key of the component to add.
     * @param {any} value - The value of the component to add.
     * @param {number} tick - The tick for updating.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    upsertComponent(id, key, value, tick = now(), extendOptions) {
        return this.context.upsertComponent(id, key, value, tick, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Changes a component of an entity.
     *
     * @param {string} id - The ID of the entity to change the component of.
     * @param {string} key - The key of the component to change.
     * @param {any} value - The value of the component to change.
     * @param {number} tick - The tick for updating.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    changeComponent(id, key, value, tick = now(), extendOptions) {
        return this.context.changeComponent(id, key, value, tick, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Removes a component from an entity.
     *
     * @param {string} id - The ID of the entity to remove the component from.
     * @param {string} key - The key of the component to remove.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    removeComponent(id, key, extendOptions) {
        return this.context.removeComponent(id, key, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Queries components.
     *
     * @param {any} query - The query for querying components.
     * @returns {Set<any>} The components queried.
     */
    queryComponents(query) {
        return this.store.queryComponents(query);
    }
}
export default Handler;
