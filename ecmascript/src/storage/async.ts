import { InputPayload } from '../actions/actor'
import { Index } from '../indexes/index'
import { ComponentsIndex } from '../indexes/components'

import { Emitter } from '../emitter'

import {
    createStorageProps,
    Storage,
    StorageInterface,
    StorageOptions,
    StorageProps,
    Components,
    Inputs,
} from '../storage'

const StoragePrototype = Storage.prototype

/**
 * The AsyncStorage class represents an asynchronous store with actors, entities, components, and inputs.
 *
 * @property {string[]} actors - The actors in the store.
 * @property {string[]} entities - The entities in the store.
 * @property {Components} components - The components in the store.
 * @property {Inputs} inputs - The inputs in the store.
 * @property {Inputs} inputs - The inputs in the store.
 */
export class AsyncStorage implements StorageInterface {
    declare actors: string[];
    declare entities: string[];
    declare components: Components;

    declare inputs: Inputs;

    declare types: { [key: string]: any }
    declare typeCtors: { [key: string]: Function }

    declare componentsIndex: ComponentsIndex<string, string>
    declare indexes: { [key: string]: { actors: Index<any, any>, entities: Index<any, any> } }

    declare world?: any

    /**
     * Constructs a new AsyncStorage object.
     *
     * @param {StorageProps} storage - The properties of the store.
     */
    constructor(storage: Storage | StorageProps = {}, options: StorageOptions = {}) {
        createStorageProps(this, storage, options)
    }

    /**
     * Removes an actor ID asynchronously.
     *
     * @param {string} id - The ID of the actor to remove.
     * @returns {Promise<boolean>} A Promise that resolves with true if the actor ID was removed, false otherwise.
     */
    async destroyActor(id: string): Promise<boolean> {
        return StoragePrototype.destroyActor.call(this, id)
    }

    /**
     * Removes a component asynchronously.
     *
     * @param {string} id - The ID of the component to remove.
     * @param {string} key - The key of the component to remove.
     */
    async destroyComponent(id: string, key: string): Promise<void> {
        return StoragePrototype.destroyComponent.call(this, id, key)
    }

    /**
     * Removes an entity ID asynchronously.
     *
     * @param {string} id - The ID of the entity to remove.
     * @returns {Promise<boolean>} A Promise that resolves with true if the entity ID was removed, false otherwise.
     */
    async destroyEntity(id: string): Promise<boolean> {
        return StoragePrototype.destroyEntity.call(this, id)
    }

    /**
     * Removes an ID from a list if it exists asynchronously.
     *
     * @param {string[]} list - The list to remove the ID from.
     * @param {string} id - The ID to remove.
     * @returns {Promise<boolean>} A Promise that resolves with true if the ID was removed, false otherwise.
     */
    async destroyId(list: string[], id: string): Promise<boolean> {
        return StoragePrototype.destroyId.call(this, list, id)
    }

    /**
     * Fetches a components container for an entity.
     *
     * @param {string} id - The ID of the entity.
     * @returns {Components} The fetched components container.
     */
    async findComponents(id: string): Promise<Components> {
        return StoragePrototype.findComponents.call(this, id)
    }

    /**
     * Fetches a component.
     *
     * @param {string} id - The ID of the component to fetch.
     * @param {string} key - The key of the component to fetch.
     * @returns {any} The fetched component.
     */
    async findComponent(id: string, key: string): Promise<any> {
        return StoragePrototype.findComponent.call(this, id, key)
    }

    /**
     * Fetches an actors inputs
     * 
     * @param {string} id - The ID of the actor.
     * @returns {InputPayload} The fetched inputs.
     */
    async findInputs(id: string): Promise<InputPayload> {
        return StoragePrototype.findInputs.call(this, id)
    }

    /**
     * Fetches an actors input
     * 
     * @param {string} id - The ID of the actor.
     * @param {number} index - The index of the input.
     * @returns {InputPayload} The fetched inputs.
     */
    async findInput(id: string, index: number): Promise<InputPayload> {
        return StoragePrototype.findInput.call(this, id, index)
    }

    /**
     * Gets the actors.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[][]} The actors.
     */
    getActors(query: any = null, pageSize: number = Infinity): Emitter<string[][]> | string[][] {
        const pages = StoragePrototype.getActors.call(this, query, pageSize)
        return pages;
        // const emitter = new Emitter<string[][]>(pages as string[][], true); 
        // return emitter;
    }

    /**
     * Gets the components.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {Components} The components.
     */
    getComponents(query: any = null, pageSize: number = Infinity): Emitter<Components[]> | Components[] {
        const pages = StoragePrototype.getComponents.call(this, query, pageSize)
        return pages;
        // const emitter = new Emitter<Components[]>(pages as Components[], true); 
        // return emitter;
    }

    /**
     * Gets the entities.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[]} The entities.
     */
    getEntities(query: any = null, pageSize: number = Infinity): Emitter<string[][]> | string[][] {
        const pages = StoragePrototype.getEntities.call(this, query, pageSize)
        return pages;
        // const emitter = new Emitter<string[][]>(pages as string[][], true); 
        // return emitter;
    }

    /**
     * Gets the inputs.
     *
     * @returns {Inputs} The inputs.
     */
    getInputs(query: any = null, pageSize: number = Infinity): Emitter<Inputs[]> | Inputs[] {
        const pages = StoragePrototype.getInputs.call(this, query, pageSize)
        return pages;
        // const emitter = new Emitter<Inputs[]>(pages as Inputs[], true); 
        // return emitter;
    }

    /**
     * Checks if an ID is an actor.
     * 
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an actor, false otherwise.
     */
    isActor(id: string): boolean {
        return StoragePrototype.isActor.call(this, id)
    }

    /**
     * Checks if an ID is an entity.
     * 
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an entity, false otherwise.
     */
    isEntity(id: string): boolean {
        return StoragePrototype.isEntity.call(this, id)
    }

    /**
     * Sets the actors.
     *
     * @param {string[]} actors - The actors to set.
     * @returns {string[]} The actors.
     */
    async setActors(actors: string[]): Promise<string[]> {
        return StoragePrototype.setActors.call(this, actors)
    }

    /**
     * Sets the components.
     *
     * @param {Components} components - The components to set.
     * @returns {Components} The components.
     */
    async setComponents(components: Components): Promise<Components> {
        return StoragePrototype.setComponents.call(this, components)
    }

    /**
     * Sets the entities.
     *
     * @param {string[]} entities - The entities to set.
     * @returns {string[]} The entities.
     */
    async setEntities(entities: string[]): Promise<string[]> {
        return StoragePrototype.setEntities.call(this, entities)
    }

    /**
     * Sets the inputs.
     *
     * @param {Inputs} inputs - The inputs to set.
     * @returns {Inputs} The inputs.
     */
    async setInputs(inputs: Inputs): Promise<Inputs> {
        return StoragePrototype.setInputs.call(this, inputs)
    }

    /**
     * Stores an actor ID.
     *
     * @param {string} id - The ID of the actor to store.
     * @returns {boolean} True if the actor ID was stored, false otherwise.
     */
    async storeActor(id: string): Promise<boolean> {
        return StoragePrototype.storeActor.call(this, id)
    }

    /**
     * Stores a component.
     *
     * @param {string} id - The ID of the component to store.
     * @param {string} key - The key of the component to store.
     * @param {any} value - The value of the component to store.
     */
    async storeComponent(id: string, key: string, value: any): Promise<void> {
        return StoragePrototype.storeComponent.call(this, id, key, value)
    }

    /**
     * Stores an entity ID.
     *
     * @param {string} id - The ID of the entity to store.
     * @returns {boolean} True if the entity ID was stored, false otherwise.
     */
    async storeEntity(id: string): Promise<boolean> {
        return StoragePrototype.storeEntity.call(this, id)
    }

    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param {string[]} list - The list to store the ID in.
     * @param {string} id - The ID to store.
     * @returns {boolean} True if the ID was stored, false otherwise.
     */
    async storeId(list: string[], id: string): Promise<boolean> {
        return StoragePrototype.storeId.call(this, list, id)
    }

    /**
     * Stores an input.
     *
     * @param {string} id - The ID of the input to store.
     * @param {InputPayload} input - The payload of the input to store.
     * @returns {number} The new index of the stored input.
     */
    async storeInput(id: string, input: InputPayload, tick: number = 0): Promise<number> {
        return StoragePrototype.storeInput.call(this, id, input, tick)
    }

    /**
     * Queries the store for entities by component.
     * 
     * @param {any} query - The query to use.
     * @returns {Set<any>} The entities.
     */
    queryComponents(query: any): Set<any> {
        return StoragePrototype.queryComponents.call(this, query)
    }

    /**
   * Removes a component from the components index.
   * 
   * @param {string} id - The ID of the component to remove.
   * @param {string} key - The key of the component to remove.
   * @param {any} prevValue - The previous value of the component.
   * @returns {void}
   */
    removeComponentsIndex(id: string, key: string, prevValue: any) {
        StoragePrototype.removeComponentsIndex.call(this, id, key, prevValue)
    }

    /**
     * Updates a component in the components index.
     * 
     * @param {string} id - The ID of the component to update.
     * @param {string} key - The key of the component to update.
     * @param {any} prevValue - The previous value of the component.
     * @param {any} value - The new value of the component.
     * @returns {void}
     */
    updateComponentsIndex(id: string, key: string, prevValue: any, value: any) {
        StoragePrototype.updateComponentsIndex.call(this, id, key, prevValue, value)
    }
}
