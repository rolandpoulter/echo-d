import { Changes } from './changes.js';
import { Emitter } from './emitter.js';
import { Options } from './options.js';
import { Ordered } from './ordered.js';
import { Pending } from './pending.js';
import { Symbols } from './symbols.js';
import { Storage } from './storage.js';
import { combineValues, now } from './utils.js';
import { allActions } from './node.js';
/**
 * The Context class provides methods for managing the context.
*
* @property {any} events - The events.
* @property {StorageInterface} store - The store.
* @property {Ordered | null} order - The order.
* @property {Changes | null} changes - The changes.
* @property {Pending | null} pending - The pending.
*/
export class Context {
    /**
     * Ensures that the given context is an instance of the Context class.
     *
     * @param {Context | ContextProps} context - The context to ensure.
     * @param {Options | any} options - The options for ensuring the context.
     * @param {Storage} _Storage - The store.
     * @returns {Context} The context.
     */
    static ensure(context, options, _Storage = Storage) {
        if (context instanceof Context) {
            return context;
        }
        return new Context(context, options, _Storage);
    }
    /**
     * Creates a new instance of the Context class.
     *
     * @param {Context | ContextProps} context - The context properties.
     * @param {Options | any} options - The context options.
     * @param {Storage} _Storage - The store.
     */
    constructor(context = {}, options, _Storage = Storage) {
        const { events = null, store = null, order = null, changes = null, symbols = null, pending = null,
        // ...otherProps
         } = context;
        options = Options.ensure(options, options?.actions || allActions);
        const { isOrdered, isDiffed, isReadOnly, compressStringsAsInts, enableQuerying, enumDefaultSymbols, storeOptions, indexes, types, } = options;
        if (isOrdered) {
            this.order = new Ordered(order);
        }
        else {
            this.order = null;
        }
        if (compressStringsAsInts) {
            if (symbols) {
                this.symbols = new Symbols(symbols);
            }
            else {
                this.symbols = new Symbols();
                this.symbols.copyEnum(enumDefaultSymbols);
            }
        }
        else {
            this.symbols = null;
        }
        if (isReadOnly) {
            this.pending = null;
        }
        else {
            this.pending = pending || new Pending(isDiffed);
        }
        this.events = events;
        this.store = store || new _Storage(undefined, {
            ...(storeOptions || {}),
            types,
            indexes: enableQuerying ? indexes : null,
        });
        if (isDiffed) {
            this.changes = new Changes(this.store, changes);
        }
        else {
            this.changes = null;
        }
        // Object.assign(this, otherProps)
    }
    /**
     * Gets the actors from the store.
     *
     * @returns The actors from the store.
     */
    get actors() {
        const actors = this.getActors(null, Infinity);
        if (actors instanceof Emitter) {
            return actors;
        }
        return actors[0];
    }
    /**
     * Gets the actors from the store with the given query.
     *
     * @param {any} query - The query for getting the actors.
     * @param {number} pageSize - The page size for getting the actors.
     * @returns {Emitter<string[][]> | string[][]} The actors from the store.
     */
    getActors(query, pageSize) {
        return this.store.getActors(query, pageSize);
    }
    /**
     * Spawns an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to spawn.
     * @param {Options} options - The options for spawning the actor.
     */
    spawnActor(id, options) {
        const { skipPending, isAsyncStorage, onUpdate } = options;
        const addedOrPromise = this.store.storeActor(id);
        const completeSpawnActor = (added) => {
            if (!added) {
                return;
            }
            if (!skipPending && this.pending) {
                this.pending.spawnActor(id);
            }
            if (this.events) {
                this.events.emit('spawnActor', id);
            }
            if (onUpdate) {
                onUpdate();
            }
        };
        if (isAsyncStorage && addedOrPromise instanceof Promise) {
            addedOrPromise.then(completeSpawnActor);
            return addedOrPromise;
        }
        completeSpawnActor(addedOrPromise);
        return addedOrPromise;
    }
    /**
     * Removes an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to remove.
     * @param {Options} options - The options for removing the actor.
     */
    removeActor(id, options) {
        const { skipPending, isAsyncStorage, onUpdate } = options;
        const removedOrPromise = this.store.destroyActor(id);
        const completeRemoveActor = (removed) => {
            if (removed) {
                if (!skipPending && this.pending) {
                    this.pending.removeActor(id);
                }
                if (this.events) {
                    this.events.emit('removeActor', id);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
        };
        if (isAsyncStorage && removedOrPromise instanceof Promise) {
            removedOrPromise.then(completeRemoveActor);
            return removedOrPromise;
        }
        completeRemoveActor(removedOrPromise);
        return removedOrPromise;
    }
    /**
     * Merges actors with the given payload and options.
     *
     * @param {any[]} payload - The payload of the actors to merge.
     * @param {Options} options - The options for merging the actors.
     */
    mergeActors(payload, options) {
        const { actions, isAsyncStorage, onUpdate } = options;
        const nextOptions = options.extend({
            onUpdate: null
        });
        const promises = [];
        for (const id of payload) {
            const promise = actions.spawnActor(id, this, nextOptions);
            if (isAsyncStorage && promise instanceof Promise) {
                promises.push(promise);
            }
        }
        const completeMergeActors = () => {
            if (onUpdate) {
                onUpdate();
            }
        };
        if (isAsyncStorage && promises.length > 0) {
            const all = promises.length ? Promise.all(promises) : Promise.resolve([]);
            all.then(completeMergeActors);
            return all;
        }
        completeMergeActors();
    }
    /**
     * Gets the entities from the store.
     *
     * @returns The entities from the store.
     */
    get entities() {
        const entities = this.getEntities(null, Infinity);
        if (entities instanceof Emitter) {
            return entities;
        }
        return entities[0];
    }
    /**
     * Gets the entities from the store with the given query.
     *
     * @param {any} query - The query for getting the entities.
     * @param {number} pageSize - The page size for getting the entities.
     * @returns {Emitter<string[][]> | string[][]} The entities from the store.
     */
    getEntities(query, pageSize) {
        return this.store.getEntities(query, pageSize);
    }
    /**
     * Creates an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to create.
     * @param {Options} options - The options for creating the entity.
     */
    createEntity(id, options) {
        const { skipPending, isAsyncStorage, onUpdate } = options;
        const added = this.store.storeEntity(id);
        const completeCreateEntity = (added) => {
            if (added) {
                if (!skipPending && this.pending) {
                    this.pending.createEntity(id);
                }
                if (this.events) {
                    this.events.emit('createEntity', id);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
        };
        if (isAsyncStorage && added instanceof Promise) {
            added.then(completeCreateEntity);
            return added;
        }
        completeCreateEntity(added);
        return added;
    }
    /**
     * Removes an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to remove.
     * @param {Options} options - The options for removing the entity.
     */
    removeEntity(id, options) {
        const { skipPending, isAsyncStorage, onUpdate } = options;
        const removed = this.store.destroyEntity(id);
        const completeRemoveEntity = (removed) => {
            if (removed) {
                if (!skipPending && this.pending) {
                    this.pending.removeEntity(id);
                }
                if (this.events) {
                    this.events.emit('removeEntity', id);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
        };
        if (isAsyncStorage && removed instanceof Promise) {
            removed.then(completeRemoveEntity);
            return removed;
        }
        completeRemoveEntity(removed);
        return removed;
    }
    /**
     * Merges entities with the given payload and options.
     *
     * @param {string[]} payload - The payload of the entities to merge.
     * @param {Options} options - The options for merging the entities.
     */
    mergeEntities(payload, options) {
        const { actions, isAsyncStorage, onUpdate } = options;
        const nextOptions = options.extend({
            onUpdate: null
        });
        const promises = [];
        for (const id of payload) {
            const promise = actions.createEntity(id, this, nextOptions);
            if (isAsyncStorage && promise instanceof Promise) {
                promises.push(promise);
            }
        }
        const completeMergeEntities = () => {
            if (onUpdate) {
                onUpdate();
            }
        };
        if (isAsyncStorage && promises.length > 0) {
            const all = promises.length ? Promise.all(promises) : Promise.resolve([]);
            all.then(completeMergeEntities);
            return all;
        }
        completeMergeEntities();
    }
    /**
     * Gets the components from the store.
     *
     * @returns The components from the store.
     */
    get components() {
        const components = this.getComponents(null, Infinity);
        if (components instanceof Emitter) {
            return components;
        }
        return components[0];
    }
    /**
     * Gets the components from the store with the given query.
     *
     * @param {any} query - The query for getting the components.
     * @param {number} pageSize - The page size for getting the components.
     * @returns {Emitter<Components[]> | Components[]} The components from the store.
     */
    getComponents(query, pageSize) {
        return this.store.getComponents(query, pageSize);
    }
    /**
     * Changes a component with the given id, key, value, and options.
     *
     * @param {string | string[] | Uint32Array} id - The id of the component to change.
     * @param {string} key - The key of the component to change.
     * @param {any | any[]} value - The value to change in the component.
     * @param {number} tick - The tick value for the component. Defaults to 0.
     * @param {Options} options - The options for changing the component.
     */
    changeComponent(id, key, value, tick = 0, options) {
        const { actions, skipPending, isAsyncStorage, isGroupedComponents, getGroupedValue, types, onUpdate } = options;
        const completeChangeComponentUpdate = () => {
            if (onUpdate) {
                onUpdate();
            }
        };
        if (Array.isArray(id) || id instanceof Uint32Array) {
            if (!isGroupedComponents) {
                throw new Error('Cannot change grouped components without isGroupedComponents option');
            }
            const noUpdateOptions = options.extend({ onUpdate: null });
            const promises = [];
            for (let i = 0; i < id.length; i++) {
                const val = getGroupedValue(value, i, types, key);
                const promise = actions.changeComponent([id[i], key, val, tick], this, noUpdateOptions);
                if (isAsyncStorage && promise instanceof Promise) {
                    promises.push(promise);
                }
            }
            if (isAsyncStorage && promises.length > 0) {
                const all = promises.length ? Promise.all(promises) : Promise.resolve([]);
                all.then(completeChangeComponentUpdate);
                return all;
            }
            completeChangeComponentUpdate();
            return;
        }
        const currentValueOrPromise = this.store.findComponent(id, key);
        const completeChangeComponents = (currentValue) => {
            const pendingType = typeof currentValue === 'undefined' ? 'created' : 'updated';
            if (this.order) {
                const isValidOrder = this.order.changeComponent(id, key, tick);
                if (!isValidOrder && !this.changes) {
                    return;
                }
            }
            let nextValue;
            if (pendingType === 'created') {
                nextValue = value;
            }
            else {
                // nextValue = value
                [/* combined */ , nextValue] = combineValues(currentValue, value);
            }
            let promise = null;
            if (this.changes) {
                promise = this.changes.changeComponent(id, key, nextValue, value, isAsyncStorage);
            }
            else {
                promise = this.store.storeComponent(id, key, nextValue);
            }
            const completeChangeComponentStorage = () => {
                if (!skipPending && this.pending) {
                    this.pending.changeComponent(pendingType, id, key);
                }
                if (this.events) {
                    this.events.emit('changeComponent', id, key, value);
                }
                completeChangeComponentUpdate();
            };
            if (isAsyncStorage && promise instanceof Promise) {
                promise.then(completeChangeComponentStorage);
                return promise;
            }
            completeChangeComponentStorage();
        };
        if (isAsyncStorage && currentValueOrPromise instanceof Promise) {
            currentValueOrPromise.then(completeChangeComponents);
            return currentValueOrPromise;
        }
        completeChangeComponents(currentValueOrPromise);
        return currentValueOrPromise;
    }
    /**
     * Upserts a component with the given id, key, value, and options.
     *
     * @param {string | string[] | Uint32Array} id - The id of the component to upsert.
     * @param {string} key - The key of the component to upsert.
     * @param {any | any[]} value - The value to upsert in the component.
     * @param {number} tick - The tick value for the component. Defaults to 0.
     * @param {Options} options - The options for upserting the component.
     */
    upsertComponent(id, key, value, tick = 0, options) {
        const { actions, skipPending, isAsyncStorage, isGroupedComponents, getGroupedValue, types, onUpdate } = options;
        const completeUpsertComponentUpdate = () => {
            if (onUpdate) {
                onUpdate();
            }
        };
        if (Array.isArray(id) || id instanceof Uint32Array) {
            if (!isGroupedComponents) {
                throw new Error('Cannot upsert grouped components without isGroupedComponents option');
            }
            const noUpdateOptions = options.extend({ onUpdate: null });
            const promises = [];
            for (let i = 0; i < id.length; i++) {
                const val = getGroupedValue(value, i, types, key);
                const promise = actions.upsertComponent([id[i], key, val, tick], this, noUpdateOptions);
                if (isAsyncStorage && promise instanceof Promise) {
                    promises.push(promise);
                }
            }
            if (isAsyncStorage && promises.length > 0) {
                const all = promises.length ? Promise.all(promises) : Promise.resolve([]);
                all.then(completeUpsertComponentUpdate);
                return all;
            }
            completeUpsertComponentUpdate();
            return;
        }
        const currentValueOrPromise = this.store.findComponent(id, key);
        const completeUpsertComponent = (currentValue) => {
            if (currentValue !== value) {
                if (this.order) {
                    const isValidOrder = this.order.upsertComponent(id, key, tick);
                    if (!isValidOrder && !this.changes) {
                        return;
                    }
                }
                let promise = null;
                if (this.changes) {
                    promise = this.changes.upsertComponent(id, key, value, currentValue, isAsyncStorage);
                }
                else {
                    promise = this.store.storeComponent(id, key, value);
                }
                const completeUpsertComponentStorage = () => {
                    if (!skipPending && this.pending) {
                        const pendingType = typeof currentValue === 'undefined' ? 'created' : 'updated';
                        this.pending.upsertComponent(pendingType, id, key);
                    }
                    if (this.events) {
                        this.events.emit('upsertComponent', id, key, value);
                    }
                    completeUpsertComponentUpdate();
                };
                if (isAsyncStorage && promise instanceof Promise) {
                    promise.then(completeUpsertComponentStorage);
                    return promise;
                }
                completeUpsertComponentStorage();
            }
        };
        if (isAsyncStorage && currentValueOrPromise instanceof Promise) {
            currentValueOrPromise.then(completeUpsertComponent);
            return currentValueOrPromise;
        }
        completeUpsertComponent(currentValueOrPromise);
        return currentValueOrPromise;
    }
    /**
     * Removes a component with the given id, key, and options.
     *
     * @param {string} id - The id of the component to remove.
     * @param {string} key - The key of the component to remove.
     * @param {Options} options - The options for removing the component.
     */
    removeComponent(id, key, options) {
        const { skipPending, isAsyncStorage, onUpdate } = options;
        const currentValueOrPromise = this.store.findComponent(id, key);
        const completeRemoveComponent = (currentValue) => {
            if (currentValue !== undefined || currentValue !== null) {
                this.store.destroyComponent(id, key);
                if (!skipPending && this.pending) {
                    this.pending.removeComponent(id, key);
                }
                if (this.events) {
                    this.events.emit('removeComponent', id, key);
                }
                if (onUpdate) {
                    onUpdate();
                }
                return true;
            }
            return false;
        };
        if (isAsyncStorage && currentValueOrPromise instanceof Promise) {
            return new Promise((resolve, reject) => {
                currentValueOrPromise.then((currentValue) => {
                    resolve(completeRemoveComponent(currentValue));
                }, reject);
            });
        }
        return completeRemoveComponent(currentValueOrPromise);
    }
    /**
     * Merges components with the given payload and options.
     *
     * @param {any} payload - The payload of the components to merge.
     * @param {Options} options - The options for merging the components.
     */
    mergeComponents(payload, options) {
        const { actions, isAsyncStorage, isComponentRelay, onUpdate } = options;
        const nextOptions = options.extend({
            skipPending: !isComponentRelay,
            onUpdate: null
        });
        const promises = [];
        for (const id in (payload ?? {})) {
            for (const key in payload[id]) {
                const value = payload[id][key];
                const nextPayload = [id, key, value];
                const promise = actions.upsertComponent(nextPayload, this, nextOptions);
                if ( /* isAsyncStorage && */promise instanceof Promise) {
                    promises.push(promise);
                }
            }
        }
        const completeMergeComponents = () => {
            if (onUpdate) {
                onUpdate();
            }
        };
        if (isAsyncStorage && promises.length > 0) {
            const all = promises.length ? Promise.all(promises) : Promise.resolve([]);
            all.then(completeMergeComponents);
            return all;
        }
        completeMergeComponents();
    }
    /**
     * Gets the inputs from the store.
     *
     * @returns The inputs from the store.
     */
    get inputs() {
        const inputs = this.getInputs(null, Infinity);
        if (inputs instanceof Emitter) {
            return inputs;
        }
        return inputs[0];
    }
    /**
     * Gets the inputs from the store with the given query.
     *
     * @param {any} query - The query for getting the inputs.
     * @param {number} pageSize - The page size for getting the inputs.
     * @returns {Emitter<Inputs[]> | Inputs[]} The inputs from the store.
     */
    getInputs(query, pageSize) {
        return this.store.getInputs(query, pageSize);
    }
    /**
     * Handles actor input with the given id, payload, and options.
     *
     * @param {string} id - The id of the actor.
     * @param {InputPayload} input - The payload for the actor input.
     * @param {number} tick - The tick value for the actor input. Defaults to 0.
     * @param {Options} options - The options for handling the actor input.
     */
    actorInput(id, input, tick = 0, options) {
        const { skipPending, isAsyncStorage, enableRollback, onUpdate } = options;
        tick = enableRollback ? tick || now() : 0;
        const indexOrPromise = this.store.storeInput(id, input, tick);
        const completeActorInput = (index) => {
            if (!skipPending && this.pending) {
                this.pending.actorInput(id, index);
            }
            if (this.events) {
                this.events.emit('actorInput', id, input, index, tick);
            }
            if (onUpdate) {
                onUpdate();
            }
        };
        if (isAsyncStorage && indexOrPromise instanceof Promise) {
            indexOrPromise.then(completeActorInput);
            return indexOrPromise;
        }
        completeActorInput(indexOrPromise);
        return indexOrPromise;
    }
    /**
     * Gets the list of symbols.
     *
     * @returns The list of symbols.
     */
    get symbolsList() {
        return this.symbols?.getSymbols();
    }
    /**
     * Gets the enum of symbols.
     *
     * @returns The enum of symbols.
     */
    get symbolsEnum() {
        return this.symbols?.getSymbolsEnum();
    }
    /**
     * Sets the symbols with the given symbols.
     *
     * @param {any} symbols - The symbols to set.
     */
    setSymbols(symbols) {
        this.symbols?.reset(symbols);
    }
    /**
     * Gets a symbol with the given index and options.
     *
     * @param {number} index - The index of the symbol to get.
     * @param {Options} options - The options for getting the symbol.
     * @returns The symbol.
     */
    getSymbol(index, options) {
        const { actions } = options;
        const symbol = this.symbols?.get(index);
        if (!symbol) {
            const symbolTuple = actions.fetchSymbol(symbol, this, options);
            return symbolTuple[0];
        }
        return symbol;
    }
    /**
     * Adds a symbol with the given symbol and options.
     *
     * @param {string} symbol - The symbol to add.
     * @param {Options} options - The options for adding the symbol.
     * @returns The index of the added symbol or null if the symbol could not be added.
     */
    addSymbol(symbol, options) {
        if (this.symbols === null) {
            return null;
        }
        const { actions, isSymbolLeader, skipPending, onUpdate } = options;
        const enumSymbols = this.symbolsEnum ?? {};
        let index = Object.prototype.hasOwnProperty.call(enumSymbols, symbol) ? enumSymbols[symbol] : -1;
        if (index === -1) {
            if (isSymbolLeader) {
                index = this.symbols.add(symbol) ?? -1;
                if (!skipPending && this.pending) {
                    this.pending.addSymbol([symbol, index]);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
            else if (actions.fetchSymbol) {
                const symbolTuple = actions.fetchSymbol(symbol, this, options);
                index = symbolTuple[1];
            }
        }
        if (index === -1) {
            return null;
        }
        return index;
    }
    /**
     * Fetches a symbol with the given payload, options, and match function.
     *
     * @param {string | number} payload - The payload for fetching the symbol.
     * @param {Options} options - The options for fetching the symbol.
     * @param {Function} onMatch - The function to call when a match is found.
     * @returns The fetched symbol tuple.
     */
    fetchSymbol(payload, options, onMatch) {
        if (this.symbols === null) {
            return null;
        }
        const { isSymbolLeader, skipPending, onUpdate } = options;
        const symbolTuple = this.symbols.fetch(payload);
        if (symbolTuple[0] && symbolTuple[1] !== -1) {
            if (onMatch) {
                onMatch(symbolTuple);
            }
        }
        else {
            if (isSymbolLeader) {
                const index = this.symbols.add(symbolTuple[0]);
                symbolTuple[1] = index;
                if (!skipPending && this.pending) {
                    this.pending.addSymbol(symbolTuple);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
        }
        return symbolTuple;
    }
    /**
     * Merges a symbol with the given payload and options.
     *
     * @param {[string, number]} payload - The payload for merging the symbol.
     * @param {Options} options - The options for merging the symbol.
     */
    mergeSymbol(payload, options) {
        if (this.symbols === null) {
            return null;
        }
        const { isSymbolLeader, isSymbolRelay, skipPending, onUpdate } = options;
        this.symbols.merge(payload);
        if ((isSymbolLeader || isSymbolRelay) && !skipPending && this.pending) {
            this.pending.addSymbol(payload);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Resets symbols with the given payload and options.
     *
     * @param {any[]} payload - The payload for resetting the symbols.
     * @param {Options} options - The options for resetting the symbols.
     */
    resetSymbols(offset = 0, symbols, options) {
        if (this.symbols === null) {
            return null;
        }
        const { isSymbolLeader, isSymbolRelay, skipPending, onUpdate } = options;
        this.symbols.reset(offset, symbols);
        if ((isSymbolLeader || isSymbolRelay) && !skipPending && this.pending) {
            this.pending.replaceSymbols(offset, symbols);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Resets the current frame state.
     */
    resetFrame() {
        if (this.pending) {
            this.pending.reset();
        }
        if (this.order) {
            this.order.reset();
        }
        if (this.changes) {
            this.changes.reset();
        }
    }
}
export default Context;
