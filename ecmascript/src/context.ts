import { Changes } from './changes'
import { Emitter } from './emitter'
import { Options } from './options'
import { Ordered } from './ordered'
import { Pending } from './pending'
import { Symbols } from './symbols'
import { Storage, Components, Inputs } from './storage'
import { AsyncStorage } from './storage/async'
import { combineValues, now } from './utils'
import { InputPayload } from './actions/actor'
import { allActions } from './node'

/**
 * The ContextProps interface represents the properties of the context.
 *
 * @property {any} changes - The changes.
 * @property {any} events - The events.
 * @property {any} pending - The pending.
 * @property {any} store - The store.
 * @property {any} symbols - The symbols.
 * @property {any} order - The order.
 * @property {any} [key: string] - The key-value pairs.
 */
interface ContextProps {
    changes?: any;
    events?: any;
    pending?: any;
    store?: any;
    symbols?: any;
    order?: any;
    // [key: string]: any;
}

/**
 * The Context class provides methods for managing the context.
*
* @property {any} events - The events.
* @property {AsyncStorage | Storage} store - The store.
* @property {Ordered | null} order - The order.
* @property {Changes | null} changes - The changes.
* @property {Pending | null} pending - The pending.
*/
export class Context {
    declare events: any;
    declare store: AsyncStorage | Storage;
    declare order: Ordered | null;
    declare changes: Changes | null;
    declare pending: Pending | null;
    declare symbols: Symbols | null;

    /**
     * Ensures that the given context is an instance of the Context class.
     *
     * @param {Context | ContextProps} context - The context to ensure.
     * @param {Options | any} options - The options for ensuring the context.
     * @param {Storage} _Storage - The store.
     * @returns {Context} The context.
     */
    static ensure(context: Context | ContextProps, options: Options | any, _Storage = Storage): Context {
        if (context instanceof Context) {
            return context
        }

        return new Context(context, options, _Storage)
    }

    /**
     * Creates a new instance of the Context class.
     *
     * @param {Context | ContextProps} context - The context properties.
     * @param {Options | any} options - The context options.
     * @param {Storage} _Storage - The store.
     */
    constructor(context: Context | ContextProps = {}, options: Options | any, _Storage = Storage) {
        const {
            events = null,
            store = null,
            order = null,
            changes = null,
            symbols = null,
            pending = null,
            // ...otherProps
        } = context

        options = Options.ensure(options, options?.actions || allActions)

        const {
            isOrdered,
            isDiffed,
            isReadOnly,
            compressStringsAsInts,
            enableQuerying,
            enumDefaultSymbols,
            storeOptions,
            indexes,
            types,
        } = options

        if (isOrdered) {
            this.order = new Ordered(order)
        } else {
            this.order = null
        }

        if (isDiffed) {
            this.changes = new Changes(this, changes)
        } else {
            this.changes = null
        }

        if (compressStringsAsInts) {
            if (symbols) {
                this.symbols = new Symbols(symbols)
            } else {
                this.symbols = new Symbols()
                this.symbols.copyEnum(enumDefaultSymbols)
            }
        } else {
            this.symbols = null
        }

        if (isReadOnly) {
            this.pending = null
        } else {
            this.pending = pending || new Pending(isDiffed)
        }

        this.events = events
        this.store = store || new _Storage(undefined, {
            ...(storeOptions || {}),
            types,
            indexes: enableQuerying ? indexes : null,
        })

        // Object.assign(this, otherProps)
    }

    /**
     * Gets the actors from the store.
     *
     * @returns The actors from the store.
     */
    get actors() {
        const actors = this.getActors(null, Infinity)
        if (actors instanceof Emitter) {
            return actors
        }
        return (actors as any[])[0]
    }

    /**
     * Gets the actors from the store with the given query.
     *
     * @param {any} query - The query for getting the actors.
     * @param {number} pageSize - The page size for getting the actors.
     * @returns {Emitter<string[][]> | string[][]} The actors from the store.
     */
    getActors(query: any, pageSize: number): Emitter<string[][]> | string[][] {
        return this.store.getActors(query, pageSize)
    }

    /**
     * Spawns an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to spawn.
     * @param {Options} options - The options for spawning the actor.
     */
    spawnActor(id: string, options: Options): Promise<boolean> | boolean {
        const { skipPending, isAsyncStorage, onUpdate } = options
        const addedOrPromise = this.store.storeActor(id)

        const completeActorInput = (added: boolean) => {
            if (!added) {
                return
            }

            if (!skipPending && this.pending) {
                this.pending.spawnActor(id)
            }

            if (this.events) {
                this.events.emit('spawnActor', id)
            }

            if (onUpdate) {
                onUpdate()
            }
        }

        if (isAsyncStorage && addedOrPromise instanceof Promise) {
            addedOrPromise.then(completeActorInput)
            return addedOrPromise as Promise<boolean>;
        }

        completeActorInput(addedOrPromise as boolean)
        return addedOrPromise as boolean;
    }

    /**
     * Removes an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to remove.
     * @param {Options} options - The options for removing the actor.
     */
    removeActor(id: string, options: Options): Promise<boolean> | boolean {
        const { skipPending, isAsyncStorage, onUpdate } = options
        const removedOrPromise = this.store.destroyActor(id)

        const completeRemoveActor = (removed: boolean) => {
            if (removed) {
                if (!skipPending && this.pending) {
                    this.pending.removeActor(id)
                }

                if (this.events) {
                    this.events.emit('removeActor', id)
                }

                if (onUpdate) {
                    onUpdate()
                }
            }
        }

        if (isAsyncStorage && removedOrPromise instanceof Promise) {
            removedOrPromise.then(completeRemoveActor)
            return removedOrPromise as Promise<boolean>;
        }

        completeRemoveActor(removedOrPromise as boolean)
        return removedOrPromise as boolean;
    }

    /**
     * Merges actors with the given payload and options.
     *
     * @param {any[]} payload - The payload of the actors to merge.
     * @param {Options} options - The options for merging the actors.
     */
    mergeActors(payload: any[], options: Options): Promise<any[]> | void {
        const { actions, isAsyncStorage, onUpdate } = options

        const nextOptions = options.extend({
            onUpdate: null
        })

        const promises: Promise<any>[] = []

        for (const id of payload) {
            const promise = actions.spawnActor(id, this, nextOptions)

            if (isAsyncStorage && promise instanceof Promise) {
                promises.push(promise)
            }
        }

        const completeMergeActors = () => {
            if (onUpdate) {
                onUpdate()
            }
        }

        if (isAsyncStorage && promises.length > 0) {
            const all = promises.length ? Promise.all(promises) : Promise.resolve([])
            all.then(completeMergeActors)
            return all
        }

        completeMergeActors()
    }

    /**
     * Gets the entities from the store.
     *
     * @returns The entities from the store.
     */
    get entities(): any {
        const entities = this.getEntities(null, Infinity)
        if (entities instanceof Emitter) {
            return entities
        }
        return (entities as any[])[0]
    }

    /**
     * Gets the entities from the store with the given query.
     *
     * @param {any} query - The query for getting the entities.
     * @param {number} pageSize - The page size for getting the entities.
     * @returns {Emitter<string[][]> | string[][]} The entities from the store.
     */
    getEntities(query: any, pageSize: number): Emitter<string[][]> | string[][] {
        return this.store.getEntities(query, pageSize)
    }

    /**
     * Creates an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to create.
     * @param {Options} options - The options for creating the entity.
     */
    createEntity(id: string, options: Options): Promise<boolean> | boolean {
        const { skipPending, isAsyncStorage, onUpdate } = options
        const added = this.store.storeEntity(id)

        const completeCreateEntity = (added: boolean) => {
            if (added) {
                if (!skipPending && this.pending) {
                    this.pending.createEntity(id)
                }

                if (this.events) {
                    this.events.emit('createEntity', id)
                }

                if (onUpdate) {
                    onUpdate()
                }
            }
        }

        if (isAsyncStorage && added instanceof Promise) {
            added.then(completeCreateEntity)
            return added as Promise<boolean>;
        }

        completeCreateEntity(added as boolean)
        return added as boolean;
    }

    /**
     * Removes an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to remove.
     * @param {Options} options - The options for removing the entity.
     */
    removeEntity(id: string, options: Options): Promise<boolean> | boolean {
        const { skipPending, isAsyncStorage, onUpdate } = options
        const removed = this.store.destroyEntity(id)

        const completeRemoveEntity = (removed: boolean) => {
            if (removed) {
                if (!skipPending && this.pending) {
                    this.pending.removeEntity(id)
                }

                if (this.events) {
                    this.events.emit('removeEntity', id)
                }

                if (onUpdate) {
                    onUpdate()
                }
            }
        }

        if (isAsyncStorage && removed instanceof Promise) {
            removed.then(completeRemoveEntity)
            return removed as Promise<boolean>;
        }

        completeRemoveEntity(removed as boolean)
        return removed as boolean;
    }

    /**
     * Merges entities with the given payload and options.
     *
     * @param {string[]} payload - The payload of the entities to merge.
     * @param {Options} options - The options for merging the entities.
     */
    mergeEntities(payload: string[], options: Options): Promise<any[]> | void {
        const { actions, isAsyncStorage, onUpdate } = options

        const nextOptions = options.extend({
            onUpdate: null
        })

        const promises: Promise<any>[] = [];

        for (const id of payload) {
            const promise = actions.createEntity(id, this, nextOptions)
            if (isAsyncStorage && promise instanceof Promise) {
                promises.push(promise)
            }
        }

        const completeMergeEntities = () => {
            if (onUpdate) {
                onUpdate()
            }
        }

        if (isAsyncStorage && promises.length > 0) {
            const all = promises.length ? Promise.all(promises) : Promise.resolve([])
            all.then(completeMergeEntities)
            return all
        }

        completeMergeEntities()
    }

    /**
     * Gets the components from the store.
     *
     * @returns The components from the store.
     */
    get components(): any {
        const components = this.getComponents(null, Infinity)
        if (components instanceof Emitter) {
            return components
        }
        return (components as any[])[0]
    }

    /**
     * Gets the components from the store with the given query.
     *
     * @param {any} query - The query for getting the components.
     * @param {number} pageSize - The page size for getting the components.
     * @returns {Emitter<Components[]> | Components[]} The components from the store.
     */
    getComponents(query: any, pageSize: number): Emitter<Components[]> | Components[] {
        return this.store.getComponents(query, pageSize)
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
    changeComponent(id: string | string[] | Uint32Array, key: string, value: any | any[], tick: number = 0, options: Options): Promise<any> | any {
        const { actions, skipPending, isAsyncStorage, isGroupedComponents, getGroupedValue, types, onUpdate } = options

        const completeChangeComponentUpdate = () => {
            if (onUpdate) {
                onUpdate()
            }
        }

        if (Array.isArray(id) || id instanceof Uint32Array) {
            if (!isGroupedComponents) {
                throw new Error('Cannot change grouped components without isGroupedComponents option')
            }

            const noUpdateOptions = options.extend({ onUpdate: null })
            const promises: Promise<any>[] = []

            for (let i = 0; i < id.length; i++) {
                const val = getGroupedValue(value, i, types, key);
                const promise = actions.changeComponent(
                    [id[i], key, val, tick],
                    this,
                    noUpdateOptions
                )

                if (isAsyncStorage && promise instanceof Promise) {
                    promises.push(promise)
                }
            }

            if (isAsyncStorage && promises.length > 0) {
                const all = promises.length ? Promise.all(promises) : Promise.resolve([])
                all.then(completeChangeComponentUpdate)
                return all
            }

            completeChangeComponentUpdate()
            return
        }

        const currentValueOrPromise = this.store.findComponent(id, key)

        const completeChangeComponents = (currentValue: any) => {
            const pendingType = typeof currentValue === 'undefined' ? 'created' : 'updated'

            if (this.order) {
                const isValidOrder = this.order.changeComponent(id, key, tick)
                if (!isValidOrder && !this.changes) {
                    return
                }
            }

            let nextValue
            if (pendingType === 'created') {
                nextValue = value
            } else {
                // nextValue = value
                [/* combined */, nextValue] = combineValues(currentValue, value)
            }

            let promise = null;
            if (this.changes) {
                promise = this.changes.changeComponent(id, key, nextValue, value, isAsyncStorage)
            } else {
                promise = this.store.storeComponent(id, key, nextValue)
            }

            const completeChangeComponentStorage = () => {
                if (!skipPending && this.pending) {
                    this.pending.changeComponent(pendingType, id, key)
                }

                if (this.events) {
                    this.events.emit('changeComponent', id, key)
                }

                completeChangeComponentUpdate()
            }

            if (isAsyncStorage && promise instanceof Promise) {
                promise.then(completeChangeComponentStorage)
                return promise as Promise<any>;
            }

            completeChangeComponentStorage()
        }

        if (isAsyncStorage && currentValueOrPromise instanceof Promise) {
            currentValueOrPromise.then(completeChangeComponents)
            return currentValueOrPromise as Promise<any>;
        }

        completeChangeComponents(currentValueOrPromise as any)
        return currentValueOrPromise as any
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
    upsertComponent(id: string | string[] | Uint32Array, key: string, value: any | any[], tick: number = 0, options: Options): Promise<any> | any {
        const { actions, skipPending, isAsyncStorage, isGroupedComponents, getGroupedValue, types, onUpdate } = options

        const completeUpsertComponentUpdate = () => {
            if (onUpdate) {
                onUpdate()
            }
        }

        if (Array.isArray(id) || id instanceof Uint32Array) {
            if (!isGroupedComponents) {
                throw new Error('Cannot upsert grouped components without isGroupedComponents option')
            }

            const noUpdateOptions = options.extend({ onUpdate: null })
            const promises: Promise<any>[] = []

            for (let i = 0; i < id.length; i++) {
                const val = getGroupedValue(value, i, types, key)
                const promise = actions.upsertComponent(
                    [id[i], key, val, tick],
                    this,
                    noUpdateOptions
                )

                if (isAsyncStorage && promise instanceof Promise) {
                    promises.push(promise)
                }
            }

            if (isAsyncStorage && promises.length > 0) {
                const all = promises.length ? Promise.all(promises) : Promise.resolve([])
                all.then(completeUpsertComponentUpdate)
                return all
            }

            completeUpsertComponentUpdate()
            return
        }

        const currentValueOrPromise = this.store.findComponent(id, key)

        const completeUpsertComponent = (currentValue: any) => {
            if (currentValue !== value) {
                if (this.order) {
                    const isValidOrder = this.order.upsertComponent(id, key, tick)
                    if (!isValidOrder && !this.changes) {
                        return
                    }
                }

                let promise = null
                if (this.changes) {
                    promise = this.changes.upsertComponent(id, key, value, currentValue, isAsyncStorage)
                } else {
                    promise = this.store.storeComponent(id, key, value)
                }

                const completeUpsertComponentStorage = () => {

                    if (!skipPending && this.pending) {
                        const pendingType = typeof currentValue === 'undefined' ? 'created' : 'updated'

                        this.pending.upsertComponent(pendingType, id, key)
                    }

                    if (this.events) {
                        this.events.emit('upsertComponent', id, key)
                    }

                    completeUpsertComponentUpdate()
                }

                if (isAsyncStorage && promise instanceof Promise) {
                    promise.then(completeUpsertComponentStorage)
                    return promise as Promise<any>;
                }

                completeUpsertComponentStorage()
            }
        }

        if (isAsyncStorage && currentValueOrPromise instanceof Promise) {
            currentValueOrPromise.then(completeUpsertComponent)
            return currentValueOrPromise as Promise<any>;
        }

        completeUpsertComponent(currentValueOrPromise as any)
        return currentValueOrPromise as any
    }

    /**
     * Removes a component with the given id, key, and options.
     *
     * @param {string} id - The id of the component to remove.
     * @param {string} key - The key of the component to remove.
     * @param {Options} options - The options for removing the component.
     */
    removeComponent(id: string, key: string, options: Options): Promise<boolean> | boolean {
        const { skipPending, isAsyncStorage, onUpdate } = options

        const currentValueOrPromise = this.store.findComponent(id, key)

        const completeRemoveComponent = (currentValue: any): boolean => {
            if (currentValue !== undefined || currentValue !== null) {
                this.store.destroyComponent(id, key)

                if (!skipPending && this.pending) {
                    this.pending.removeComponent(id, key)
                }

                if (this.events) {
                    this.events.emit('removeComponent', id, key)
                }

                if (onUpdate) {
                    onUpdate()
                }

                return true
            }

            return false
        }

        if (isAsyncStorage && currentValueOrPromise instanceof Promise) {
            return new Promise((resolve, reject) => {
                currentValueOrPromise.then((currentValue) => {
                    resolve(completeRemoveComponent(currentValue))
                }, reject)
            });
        }

        return completeRemoveComponent(currentValueOrPromise as any)
    }

    /**
     * Merges components with the given payload and options.
     *
     * @param {any} payload - The payload of the components to merge.
     * @param {Options} options - The options for merging the components.
     */
    mergeComponents(payload: any, options: Options): Promise<any[]> | void {
        const { actions, isAsyncStorage, isComponentRelay, onUpdate } = options

        const nextOptions = options.extend({
            skipPending: !isComponentRelay,
            onUpdate: null
        })

        const promises: Promise<any>[] = [];

        for (const id in (payload ?? {})) {
            for (const key in payload[id]) {
                const value = payload[id][key]
                const nextPayload = [id, key, value]

                const promise = actions.upsertComponent(nextPayload, this, nextOptions)
                if (/* isAsyncStorage && */ promise instanceof Promise) {
                    promises.push(promise)
                }
            }
        }

        const completeMergeComponents = () => {
            if (onUpdate) {
                onUpdate()
            }
        }

        if (isAsyncStorage && promises.length > 0) {
            const all = promises.length ? Promise.all(promises) : Promise.resolve([])
            all.then(completeMergeComponents)
            return all
        }

        completeMergeComponents()
    }

    /**
     * Gets the inputs from the store.
     *
     * @returns The inputs from the store.
     */
    get inputs() {
        const inputs = this.getInputs(null, Infinity)
        if (inputs instanceof Emitter) {
            return inputs
        }
        return (inputs as any[])[0]
    }

    /**
     * Gets the inputs from the store with the given query.
     *
     * @param {any} query - The query for getting the inputs.
     * @param {number} pageSize - The page size for getting the inputs.
     * @returns {Emitter<Inputs[]> | Inputs[]} The inputs from the store.
     */
    getInputs(query: any, pageSize: number): Emitter<Inputs[]> | Inputs[] {
        return this.store.getInputs(query, pageSize)
    }

    /**
     * Handles actor input with the given id, payload, and options.
     *
     * @param {string} id - The id of the actor.
     * @param {InputPayload} input - The payload for the actor input.
     * @param {number} tick - The tick value for the actor input. Defaults to 0.
     * @param {Options} options - The options for handling the actor input.
     */
    actorInput(id: string, input: InputPayload, tick: number = 0, options: Options): Promise<number> | number {
        const { skipPending, isAsyncStorage, enableRollback, onUpdate } = options

        tick = enableRollback ? tick || now() : 0;

        const indexOrPromise = this.store.storeInput(id, input, tick)

        const completeActorInput = (index: number) => {
            if (!skipPending && this.pending) {
                this.pending.actorInput(id, index)
            }

            if (this.events) {
                this.events.emit('actorInput', id, input, index, tick)
            }

            if (onUpdate) {
                onUpdate()
            }
        }

        if (isAsyncStorage && indexOrPromise instanceof Promise) {
            indexOrPromise.then(completeActorInput)
            return indexOrPromise as Promise<number>;
        }

        completeActorInput(indexOrPromise as number)
        return indexOrPromise as number;
    }

    /**
     * Gets the list of symbols.
     *
     * @returns The list of symbols.
     */
    get symbolsList() {
        return this.symbols?.getSymbols()
    }

    /**
     * Gets the enum of symbols.
     *
     * @returns The enum of symbols.
     */
    get symbolsEnum() {
        return this.symbols?.getSymbolsEnum()
    }

    /**
     * Sets the symbols with the given symbols.
     *
     * @param {any} symbols - The symbols to set.
     */
    setSymbols(symbols: any) {
        this.symbols?.reset(symbols)
    }

    /**
     * Gets a symbol with the given index and options.
     *
     * @param {number} index - The index of the symbol to get.
     * @param {Options} options - The options for getting the symbol.
     * @returns The symbol.
     */
    getSymbol(index: number, options: Options) {
        const { actions } = options
        const symbol = this.symbols?.get(index)

        if (!symbol) {
            const symbolTuple = actions.fetchSymbol(symbol, this, options)
            return symbolTuple[0]
        }

        return symbol
    }

    /**
     * Adds a symbol with the given symbol and options.
     *
     * @param {string} symbol - The symbol to add.
     * @param {Options} options - The options for adding the symbol.
     * @returns The index of the added symbol or null if the symbol could not be added.
     */
    addSymbol(symbol: string, options: Options) {
        if (this.symbols === null) {
            return null
        }

        const { actions, isSymbolLeader, skipPending, onUpdate } = options
        const enumSymbols = this.symbolsEnum ?? {}

        let index = Object.prototype.hasOwnProperty.call(enumSymbols, symbol) ? enumSymbols[symbol] : -1

        if (index === -1) {
            if (isSymbolLeader) {
                index = this.symbols.add(symbol) ?? -1

                if (!skipPending && this.pending) {
                    this.pending.addSymbol([symbol, index])
                }

                if (onUpdate) {
                    onUpdate()
                }
            } else if (actions.fetchSymbol) {
                const symbolTuple = actions.fetchSymbol(symbol, this, options)
                index = symbolTuple[1]
            }
        }

        if (index === -1) {
            return null
        }

        return index
    }

    /**
     * Fetches a symbol with the given payload, options, and match function.
     *
     * @param {string | number} payload - The payload for fetching the symbol.
     * @param {Options} options - The options for fetching the symbol.
     * @param {Function} onMatch - The function to call when a match is found.
     * @returns The fetched symbol tuple.
     */
    fetchSymbol(payload: string | number, options: Options, onMatch: Function) {
        if (this.symbols === null) {
            return null
        }

        const { isSymbolLeader, skipPending, onUpdate } = options

        const symbolTuple = this.symbols.fetch(payload)

        if (symbolTuple[0] && symbolTuple[1] !== -1) {
            if (onMatch) { onMatch(symbolTuple) }
        } else {
            if (isSymbolLeader) {
                const index = this.symbols.add(symbolTuple[0])
                symbolTuple[1] = index as number

                if (!skipPending && this.pending) {
                    this.pending.addSymbol(symbolTuple)
                }

                if (onUpdate) {
                    onUpdate()
                }
            }
        }

        return symbolTuple
    }

    /**
     * Merges a symbol with the given payload and options.
     *
     * @param {[string, number]} payload - The payload for merging the symbol.
     * @param {Options} options - The options for merging the symbol.
     */
    mergeSymbol(payload: [string, number], options: Options) {
        if (this.symbols === null) {
            return null
        }

        const { isSymbolLeader, isSymbolRelay, skipPending, onUpdate } = options

        this.symbols.merge(payload)

        if ((isSymbolLeader || isSymbolRelay) && !skipPending && this.pending) {
            this.pending.addSymbol(payload)
        }

        if (onUpdate) {
            onUpdate()
        }
    }

    /**
     * Resets symbols with the given payload and options.
     *
     * @param {any[]} payload - The payload for resetting the symbols.
     * @param {Options} options - The options for resetting the symbols.
     */
    resetSymbols(offset: number = 0, symbols: any[], options: Options) {
        if (this.symbols === null) {
            return null
        }

        const { isSymbolLeader, isSymbolRelay, skipPending, onUpdate } = options

        this.symbols.reset(offset, symbols)

        if ((isSymbolLeader || isSymbolRelay) && !skipPending && this.pending) {
            this.pending.replaceSymbols(offset, symbols)
        }

        if (onUpdate) {
            onUpdate()
        }
    }

    /**
     * Resets the current frame state.
     */
    resetFrame(): void {
        if (this.pending) {
            this.pending.reset()
        }
        if (this.order) {
            this.order.reset()
        }
        if (this.changes) {
            this.changes.reset()
        }
    }
}

export default Context
