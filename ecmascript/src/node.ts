import actorActions, { ActorActionsFactory } from './actions/actor'
import componentActions, { ComponentActionsFactory } from './actions/component'
import coreActions, { CoreActionsFactory } from './actions/core'
import entityActions, { EntityActionsFactory } from './actions/entity'
import symbolActions, { SymbolActionsFactory } from './actions/symbol'

/**
 * A factory function that creates a new instance of the AllActions class that extends the provided Parent class
 * 
 * @param {any} Parent - The class to be extended by the AllActions class.
 * @returns {any} A new class that extends the provided Parent class and the CoreActions class.
 */
export function AllActionsFactory(Parent: any = Object): any {
    return ActorActionsFactory(
        ComponentActionsFactory(
            CoreActionsFactory(
                EntityActionsFactory(
                    SymbolActionsFactory(Parent)
                )
            )
        )
    )
}

/**
 * Combines all the actions from different modules into a single object.
 */
export const allActions = {
    ...actorActions,
    ...componentActions,
    ...coreActions,
    ...entityActions,
    ...symbolActions
}

/**
 * The NodeActions class provides methods for managing nodes in a context.
 */
export class NodeActions extends AllActionsFactory() { }

const __NodeActions__ = new NodeActions()

/**
 * The actions object combines all the actions from different modules.
 */
export const actions = {
    /**
     * Handles input for a specific actor in the current context.
     */
    actorInput: __NodeActions__.actorInput,

    /**
     * Retrieves actors from the current context.
     */
    actors: __NodeActions__.actors,

    /**
     * Merges actors into the current context.
     */
    mergeActors: __NodeActions__.mergeActors,

    /**
     * Removes an actor from the current context.
     */
    removeActor: __NodeActions__.removeActor,

    /**
     * Spawns a new actor in the current context.
     */
    spawnActor: __NodeActions__.spawnActor,

    /**
     * Changes a component in the current context.
     */
    changeComponent: __NodeActions__.changeComponent,

    /**
     * Retrieves components from the current context.
     */
    components: __NodeActions__.components,

    /**
     * Merges components into the current context.
     */
    mergeComponents: __NodeActions__.mergeComponents,

    /**
     * Removes a component from the current context.
     */
    removeComponent: __NodeActions__.removeComponent,

    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     */
    upsertComponent: __NodeActions__.upsertComponent,

    /**
     * Processes a batch of payloads in the current context.
     */
    batch: __NodeActions__.batch,

    /**
     * Creates a new entity in the current context.
     */
    createEntity: __NodeActions__.createEntity,

    /**
     * Retrieves entities from the current context.
     */
    entities: __NodeActions__.entities,

    /**
     * Merges entities into the current context.
     */
    mergeEntities: __NodeActions__.mergeEntities,

    /**
     * Removes an entity from the current context.
     */
    removeEntity: __NodeActions__.removeEntity,

    /**
     * Adds a symbol to the current context.
     */
    addSymbol: __NodeActions__.addSymbol,

    /**
     * Fetches a symbol from the current context.
     */
    fetchSymbol: __NodeActions__.fetchSymbol,

    /**
     * Retrieves a symbol from the current context by its index.
     */
    getSymbol: __NodeActions__.getSymbol,

    /**
     * Merges a symbol into the current context.
     */
    mergeSymbol: __NodeActions__.mergeSymbol,

    /**
     * Merges multiple symbols into the current context.
     */
    mergeSymbols: __NodeActions__.mergeSymbols,

    /**
     * Retrieves a symbol from the current context.
     */
    symbol: __NodeActions__.symbol,

    /**
     * Retrieves all symbols from the current context.
     */
    symbols: __NodeActions__.symbols,
}

export default actions
