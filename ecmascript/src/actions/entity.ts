import { Context } from '../context'
import { Emitter } from '../emitter'
import { Options } from '../options'
import { extractSymbol } from '../symbols'

/**
 * Creates a new instance of the EntityActions class that extends the provided Parent class
 * 
 * @param {any} Parent - The class to be extended by the EntityActions class. 
 * @returns {any} - A new class that extends the provided Parent class and the EntityActions class.
 */
export const EntityActionsFactory = (Parent: any = Object): any => class EntityActions extends Parent {
    /**
     * Creates a new entity in the current context.
     *
     * @param {any} id - The identifier for the entity to be created.
     * @param {Context} context - The current context in which the entity is to be created.
     * @param {Options | any} options - The options for creating the entity. If an instance of Options is not provided, a new one will be created.
     */
    createEntity(id: any, context: Context, options: Options | any): Promise<boolean> | boolean {  
        options = options = Options.ensure(options, this)
        const { compressStringsAsInts } = options

        if (id === undefined || id === null || id === '') { return false; }

        if (compressStringsAsInts) {
            id = extractSymbol(id, context, options)
            if (id === '') { return false; }
        }

        return context.createEntity(id, options)
    }

    /**
     * Retrieves entities from the current context.
     *
     * @param {any} payload - This parameter is not used in the method.
     * @param {Context} context - The current context from which the entities are retrieved.
     * @param {OptionsExtended | any} options - The options for retrieving entities. If an instance of Options is not provided, a new one will be created.
     */
    entities(payload: any, context: Context, options: Options | any) {
        options = options = Options.ensure(options, this)
        const { responder, isAuthority, isAsyncStorage, pageSize, enableQuerying, enumDefaultSymbols } = options

        if (!isAuthority) { return }

        const sendEntities = (pages: string[][]) => {
            for (const page of pages) {
                responder([enumDefaultSymbols.mergeEntities, page])
            }
        }

        const ctxEntities = context.getEntities(enableQuerying ? payload : null, pageSize)

        if (isAsyncStorage) {
            (ctxEntities as Emitter<string[][]>).emitTo(sendEntities, true)
        } else {
            sendEntities(ctxEntities as string[][])
        }
    }

    /**
     * Merges entities into the current context.
     *
     * @param {any[]} payload - The payload containing the entities to be merged.
     * @param {Context} context - The current context in which the entities are to be merged.
     * @param {OptionsExtended | any} options - The options for merging. If an instance of Options is not provided, a new one will be created.
     */
    mergeEntities(payload: any[], context: Context, options: Options | any) {
        options = options = Options.ensure(options, this)

        context.mergeEntities(payload, options)
    }

    /**
     * Removes an entity from the current context.
     *
     * @param {any} id - The identifier for the entity to be removed.
     * @param {Context} context - The current context from which the entity is to be removed.
     * @param {OptionsExtended | any} options - The options for removing the entity. If an instance of Options is not provided, a new one will be created.
     */
    removeEntity(id: any, context: Context, options: Options | any) {
        options = options = Options.ensure(options, this)
        const { compressStringsAsInts } = options

        if (id === undefined || id === null || id === '') { return }

        if (compressStringsAsInts) {
            id = extractSymbol(id, context, options)
            if (id === '') { return }
        }

        context.removeEntity(id, options)
    }
}

/**
 * Class representing actions that can be performed on entities.
 * This class encapsulates the logic for creating, merging, and removing entities.
 */
export class EntityActions extends EntityActionsFactory() { }

const __EntityActions__ = new EntityActions()

/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions class.
 */
export const actions = {
    /**
     * Creates a new entity in the current context.
     */
    createEntity: __EntityActions__.createEntity,

    /**
     * Retrieves entities from the current context.
     */
    entities: __EntityActions__.entities,

    /**
     * Merges entities into the current context.
     */
    mergeEntities: __EntityActions__.mergeEntities,

    /**
     * Removes an entity from the current context.
     */
    removeEntity: __EntityActions__.removeEntity
}

export default actions