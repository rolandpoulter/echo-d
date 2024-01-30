import { InputPayload } from './actions/actor';
import { Index } from './indexes/index'
import { SortedIndex } from './indexes/sorted'
import { SpatialIndex } from './indexes/spatial'
import { ComponentsIndex } from './indexes/components'
import { BasicTypes, ArrayTypes } from './types'
import { binarySearch } from './utils'
import { paginate } from './utils'
import { Emitter } from './emitter';

/**
 * The Components interface represents a mapping from keys to any value.
 */
export interface Components {
    [key: string]: {
        [key: string]: any;
    };
}

/**
* The Types interface represents a mapping from keys to any array.
*/
export interface Types {
    [key: string]: any[];
}

/**
* The Inputs interface represents a mapping from keys to any array.
*/
export interface Inputs {
    [key: string]: any[];
}

/**
* The StorageOptions interface represents the options of a store.
*/
export interface StorageOptions {
    types?: Types,
    indexes?: { [key: string]: any }
    // worldOptions?: Object,
    [key: string]: any
}

/**
* The StorageProps interface represents the properties of a store.
*/
export interface StorageProps {
    actors?: any,
    entities?: any,
    components?: any,
    inputs?: any
    // world?: any,
    [key: string]: any
}

/**
* The StorageInterface interface represents the interface of a store.
*/
export interface StorageInterface {
    actors: Map<string, any> | string[];
    entities: Map<string, any> | string[];
    components: Map<string, any> | Components;

    inputs: Inputs;

    types: { [key: string]: any }
    typeCtors: { [key: string]: Function }

    componentsIndex: ComponentsIndex<string, string>
    indexes: {
        [key: string]: {
            actors: Index<any, any>,
            entities: Index<any, any>
        }
    }

    // constructor(storage: any, options: any): void;

    destroyActor(id: string): Promise<boolean> | boolean;
    destroyComponent(id: string, key: string): Promise<void> | void;
    destroyEntity(id: string): Promise<boolean> | boolean;
    destroyId(list: Map<string, number> | any, id: string): Promise<boolean> | boolean;

    findComponents(id: string): Promise<Components> | Components;
    findComponent(id: string, key: string): Promise<any> | any;

    findInputs(id: string): Promise<Inputs> | Inputs;
    findInput(id: string, index: number): Promise<InputPayload> | InputPayload;

    getActors(query: any, pageSize: number): Emitter<string[][]> | string[][];
    getComponents(query: any, pageSize: number): Emitter<Components[]> | Components[];
    getEntities(query: any, pageSize: number): Emitter<string[][]> | string[][];

    getInputs(query: any, pageSize: number): Emitter<Inputs[]> | Inputs[];

    isActor(id: string): boolean;
    isEntity(id: string): boolean;

    setActors(actors: string[]): Promise<string[]> | string[];
    setComponents(components: Components): Promise<Components> | Components;
    setEntities(entities: any): Promise<string[]> | string[];

    setInputs(inputs: any): Promise<Inputs> | Inputs;

    storeActor(id: string): Promise<boolean> | boolean;
    storeComponent(id: string, key: string, value: any): Promise<void> | void;
    storeEntity(id: string): Promise<boolean> | boolean;
    storeId(list: Map<string, string> | any, id: string): Promise<boolean> | boolean;

    storeInput(id: string, input: any, tick: number): Promise<number> | number;
}

// export {
//   StorageInterface,
//   StorageOptions,
//   StorageProps,
//   Components,
//   Types,
//   Inputs
// }

/**
 * The Indexes interface represents a mapping from keys to any array.
 */
export const IndexMap: any = {
    sorted: SortedIndex,
    spatial: SpatialIndex,
}

export function createStorageProps(props: any = {}, storage: StorageProps = {}, options: StorageOptions = {}) {
    const {
        actors = [],
        entities = [],
        components = {},
        inputs = {}
    } = storage || {}

    const {
        types = {},
        indexes = {},
        // worldOptions,
    } = options;

    props.actors = actors || []
    props.entities = entities || []
    props.components = components || {}
    props.inputs = inputs || {}

    props.types = types;
    props.typeCtors = {};
    for (let key in types) {
        let TypeCtor = types[key];
        if (Array.isArray(TypeCtor)) {
            TypeCtor = BasicTypes.get(TypeCtor[0]) || ArrayTypes.get(TypeCtor[0])
        } else if (typeof TypeCtor === 'string') {
            TypeCtor = BasicTypes.get(TypeCtor) || ArrayTypes.get(TypeCtor)
        }
        if (typeof TypeCtor === 'function') {
            if (TypeCtor) {
                props.typeCtors[key] = TypeCtor
            }
        }
    }

    props.componentsIndex = new ComponentsIndex()

    props.indexes = {}
    for (let key in indexes) {
        const { type } = indexes[key]
        const IndexCtor = IndexMap[type]
        if (IndexCtor) {
            props.indexes[key] = {
                actors: new IndexCtor([], indexes[key]),
                entities: new IndexCtor([], indexes[key]),
            }
        }
    }

    return props;
}

/**
 * The Storage class represents a store with actors, entities, components, and inputs.
 *
 * @property {string[]} actors - The actors in the store.
 * @property {string[]} entities - The entities in the store.
 * @property {Components} components - The components in the store.
 * @property {Inputs} inputs - The inputs in the store.
 * @property {Types} types - The types in the store.
 * @property {any} typeCtors - The type constructors in the store
 * @property {ComponentsIndex} componentsIndex - The components index in the store.
 * @property {Indexes} indexes - The indexes in the store.
 */
export class Storage implements StorageInterface {
    declare actors: string[];
    declare entities: string[];
    declare components: Components;

    declare inputs: Inputs;

    declare types: { [key: string]: any }
    declare typeCtors: { [key: string]: Function }

    declare componentsIndex: ComponentsIndex<string, string>
    declare indexes: { [key: string]: { actors: Index<any, any>, entities: Index<any, any> } }

    // declare world?: any

    /**
     * Constructs a new Storage object.
     *
     * @param {StorageProps} storage - The properties of the store.
     */
    constructor(storage: Storage | StorageProps = {}, options: StorageOptions = {}) {
        createStorageProps(this, storage, options)
    }

    /**
     * Removes an actor ID.
     *
     * @param {string} id - The ID of the actor to remove.
     * @returns {boolean} True if the actor ID was removed, false otherwise.
     */
    destroyActor(id: string): boolean {
        const actors = this.actors
        return this.destroyId(actors, id)
    }

    /**
     * Removes a component.
     *
     * @param {string} id - The ID of the component to remove.
     * @param {string} key - The key of the component to remove.
     */
    destroyComponent(id: string, key: string): void {
        const prevValue = this.components[id][key]
        delete this.components[id][key]
        this.removeComponentsIndex(id, key, prevValue)
    }

    /**
     * Removes an entity ID.
     *
     * @param {string} id - The ID of the entity to remove.
     * @returns {boolean} True if the entity ID was removed, false otherwise.
     */
    destroyEntity(id: string): boolean {
        const entities = this.entities
        return this.destroyId(entities, id)
    }

    /**
     * Removes an ID from a list if it exists.
     *
     * @param {string[]} list - The list to remove the ID from.
     * @param {string} id - The ID to remove.
     * @returns {boolean} True if the ID was removed, false otherwise.
     */
    destroyId(list: string[], id: string): boolean {
        const [index] = binarySearch(list, id)
        if (index !== -1) {
            list.splice(index, 1)
            return true
        }
        return false
    }

    /**
     * Fetches a components container for an entity.
     *
     * @param {string} id - The ID of the entity.
     * @returns {Components} The fetched components container.
     */
    findComponents(id: string): Components {
        this.components[id] = this.components[id] || {}
        return this.components[id]
    }

    /**
     * Fetches a component.
     *
     * @param {string} id - The ID of the component to fetch.
     * @param {string} key - The key of the component to fetch.
     * @returns {any} The fetched component.
     */
    findComponent(id: string, key: string): any {
        this.components[id] = this.components[id] || {}
        return this.components[id][key]
    }

    /**
     * Fetches an actors inputs
     * 
     * @param {string} id - The ID of the actor.
     * @returns {InputPayload} The fetched inputs.
     */
    findInputs(id: string): InputPayload {
        return this.inputs[id]
    }

    /**
     * Fetches an actors input
     * 
     * @param {string} id - The ID of the actor.
     * @param {number} index - The index of the input.
     * @returns {InputPayload} The fetched inputs.
     */
    findInput(id: string, index: number): InputPayload {
        this.inputs[id] = this.inputs[id] || []
        const input = this.inputs[id][index]
        if (Array.isArray(input)) {
            return [{ ...input[0], id }, input[1]]
        }
        return { ...input, id }
    }

    /**
     * Gets the actors.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[][]} The actors.
     */
    getActors(query: any = null, pageSize: number = Infinity): string[][] {
        if (query !== null) {
            let results: any = {}
            for (let key in query) {
                const index = this.indexes[key]
                if (index) {
                    const result = index.actors.query(query[key])
                    result.forEach((id: string) => {
                        results[id] = true
                    })
                }
            }
            const ids = Object.keys(results)
            return paginate(ids, pageSize)
        }
        return paginate(this.actors, pageSize)
    }

    /**
     * Gets the components.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {Components} The components.
     */
    getComponents(query: any = null, pageSize: number = Infinity): Components[] {
        let object: Components = this.components
        if (query !== null) {
            const results: Components = {}
            for (let key of query) {
                results[key] = this.components[key]
            }
            object = results
        }
        const ids = Object.keys(object)
        const pages = paginate(ids, pageSize)
        return pages.map((page) => {
            const components: Components = {}
            for (let id of page) {
                components[id] = object[id]
            }
            return components
        })
    }

    /**
     * Gets the entities.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[]} The entities.
     */
    getEntities(query: any = null, pageSize: number = Infinity): string[][] {
        if (query !== null) {
            let results: any = {}
            for (let key in query) {
                const index = this.indexes[key]
                if (index) {
                    const result = index.entities.query(query[key])
                    result.forEach((id: string) => {
                        results[id] = true
                    })
                }
            }
            const ids = Object.keys(results)
            return paginate(ids, pageSize)
        }
        return paginate(this.entities, pageSize)
    }

    /**
     * Gets the inputs.
     *
     * @returns {Inputs} The inputs.
     */
    getInputs(query: any = null, pageSize: number = Infinity): Inputs[] {
        let object: Inputs = this.inputs
        if (query !== null) {
            const results: Inputs = {}
            for (let key of query) {
                results[key] = this.inputs[key]
            }
            object = results
        }
        const ids = Object.keys(object)
        const pages = paginate(ids, pageSize)
        return pages.map((page) => {
            const inputs: Inputs = {}
            for (let id of page) {
                inputs[id] = object[id]
            }
            return inputs
        })
    }

    /**
     * Checks if an ID is an actor.
     * 
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an actor, false otherwise.
     */
    isActor(id: string): boolean {
        const actors = this.actors
        return actors.indexOf(id) !== -1
    }

    /**
     * Checks if an ID is an entity.
     * 
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an entity, false otherwise.
     */
    isEntity(id: string): boolean {
        const entities = this.entities
        return entities.indexOf(id) !== -1
    }

    /**
     * Sets the actors.
     *
     * @param {string[]} actors - The actors to set.
     * @returns {string[]} The actors.
     */
    setActors(actors: string[]): string[] {
        this.actors = actors
        return actors
    }

    /**
     * Sets the components.
     *
     * @param {Components} components - The components to set.
     * @returns {Components} The components.
     */
    setComponents(components: Components): Components {
        this.components = components
        return components
    }

    /**
     * Sets the entities.
     *
     * @param {string[]} entities - The entities to set.
     * @returns {string[]} The entities.
     */
    setEntities(entities: string[]): string[] {
        this.entities = entities
        return entities
    }

    /**
     * Sets the inputs.
     *
     * @param {Inputs} inputs - The inputs to set.
     * @returns {Inputs} The inputs.
     */
    setInputs(inputs: Inputs): Inputs {
        this.inputs = inputs
        return inputs
    }

    /**
     * Stores an actor ID.
     *
     * @param {string} id - The ID of the actor to store.
     * @returns {boolean} True if the actor ID was stored, false otherwise.
     */
    storeActor(id: string): boolean {
        const actors = this.actors
        return this.storeId(actors, id)
    }

    /**
     * Stores a component.
     *
     * @param {string} id - The ID of the component to store.
     * @param {string} key - The key of the component to store.
     * @param {any} value - The value of the component to store.
     */
    storeComponent(id: string, key: string, value: any): void {
        const prevValue = this.components[id][key]
        this.components[id][key] = value;
        this.updateComponentsIndex(id, key, prevValue, value)
    }

    /**
     * Stores an entity ID.
     *
     * @param {string} id - The ID of the entity to store.
     * @returns {boolean} True if the entity ID was stored, false otherwise.
     */
    storeEntity(id: string): boolean {
        const entities = this.entities
        return this.storeId(entities, id)
    }

    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param {string[]} list - The list to store the ID in.
     * @param {string} id - The ID to store.
     * @returns {boolean} True if the ID was stored, false otherwise.
     */
    storeId(list: string[], id: string): boolean {
        const [index, left] = binarySearch(list, id)
        if (index === -1) {
            list.splice(left, 0, id)
            return true
        }
        return false
    }

    /**
     * Stores an input.
     *
     * @param {string} id - The ID of the input to store.
     * @param {InputPayload} input - The payload of the input to store.
     * @returns {number} The new index of the stored input.
     */
    storeInput(id: string, input: InputPayload, tick: number = 0): number {
        const inputs = this.inputs

        inputs[id] = inputs[id] || []

        const index = inputs[id].length

        if (input.id === id) {
            delete input.id
        }

        inputs[id].push(tick ? [input, tick] : input)

        return index
    }

    /**
     * Queries the store for entities by component.
     * 
     * @param {any} query - The query to use.
     * @returns {Set<any>} The entities.
     */
    queryComponents(query: any): Set<any> {
        return this.componentsIndex.query(query)
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
        this.componentsIndex.remove(id, key)
        if (this.indexes[key]) {
            const index = this.indexes[key]
            if (this.isActor(id)) {
                index.actors.remove(id, prevValue)
            } else {
                index.entities.remove(id, prevValue)
            }
        }
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
        this.componentsIndex.set(id, key)
        if (this.indexes[key]) {
            const index = this.indexes[key]
            if (this.isActor(id)) {
                index.actors.store(id, prevValue, value)
            } else {
                index.entities.store(id, prevValue, value)
            }
        }
    }
}

export default Storage