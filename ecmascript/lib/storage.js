import { SortedIndex } from './indexes/sorted.js';
import { SpatialIndex } from './indexes/spatial.js';
import { ComponentsIndex } from './indexes/components.js';
import { ArrayTypes } from './types.js';
import { binarySearch } from './utils.js';
import { paginate } from './utils.js';
export * from './emitter.js';
/**
 * The Indexes interface represents a mapping from keys to any array.
 */
export const TypeMap = {
    sorted: SortedIndex,
    spatial: SpatialIndex,
};
/**
 * The Storage class represents a store with actors, entities, components, and inputs.
 *
 * @property {string[]} actors - The actors in the store.
 * @property {string[]} entities - The entities in the store.
 * @property {Components} components - The components in the store.
 * @property {Inputs} inputs - The inputs in the store.
 * @property {Inputs} inputs - The inputs in the store.
 */
export class Storage {
    // declare world?: any
    /**
     * Constructs a new Storage object.
     *
     * @param {StorageProps} store - The properties of the store.
     */
    constructor(store = {}, options = {}) {
        const { actors = [], entities = [], components = {}, inputs = {} } = store || {};
        const { types = {}, indexes = {},
        // worldOptions,
         } = options;
        this.actors = actors || [];
        this.entities = entities || [];
        this.components = components || {};
        this.inputs = inputs || {};
        this.types = types;
        this.typeCtors = {};
        for (let key in types) {
            let TypeCtor = types[key];
            if (Array.isArray(TypeCtor)) {
                TypeCtor = ArrayTypes.get(TypeCtor[0]);
            }
            else if (typeof TypeCtor === 'string') {
                TypeCtor = ArrayTypes.get(TypeCtor);
            }
            if (typeof TypeCtor === 'function') {
                if (TypeCtor) {
                    this.typeCtors[key] = TypeCtor;
                }
            }
        }
        this.componentsIndex = new ComponentsIndex();
        this.indexes = {};
        for (let key in indexes) {
            const { type } = indexes[key];
            const IndexCtor = TypeMap[type];
            if (IndexCtor) {
                this.indexes[key] = {
                    actors: new IndexCtor([], indexes[key]),
                    entities: new IndexCtor([], indexes[key]),
                };
            }
        }
    }
    /**
     * Removes an actor ID.
     *
     * @param {string} id - The ID of the actor to remove.
     * @returns {boolean} True if the actor ID was removed, false otherwise.
     */
    destroyActor(id) {
        const actors = this.actors;
        return this.destroyId(actors, id);
    }
    /**
     * Removes a component.
     *
     * @param {string} id - The ID of the component to remove.
     * @param {string} key - The key of the component to remove.
     */
    destroyComponent(id, key) {
        const prevValue = this.components[id][key];
        delete this.components[id][key];
        this.componentsIndex.remove(id, key);
        if (this.indexes[key]) {
            const index = this.indexes[key];
            if (this.isActor(id)) {
                index.actors.remove(id, prevValue);
            }
            else {
                index.entities.remove(id, prevValue);
            }
        }
    }
    /**
     * Removes an entity ID.
     *
     * @param {string} id - The ID of the entity to remove.
     * @returns {boolean} True if the entity ID was removed, false otherwise.
     */
    destroyEntity(id) {
        const entities = this.entities;
        return this.destroyId(entities, id);
    }
    /**
     * Removes an ID from a list if it exists.
     *
     * @param {string[]} list - The list to remove the ID from.
     * @param {string} id - The ID to remove.
     * @returns {boolean} True if the ID was removed, false otherwise.
     */
    destroyId(list, id) {
        const [index] = binarySearch(list, id);
        if (index !== -1) {
            list.splice(index, 1);
            return true;
        }
        return false;
    }
    /**
     * Fetches a components container for an entity.
     *
     * @param {string} id - The ID of the entity.
     * @returns {Components} The fetched components container.
     */
    fetchComponents(id) {
        return this.components[id];
    }
    /**
     * Fetches a component.
     *
     * @param {string} id - The ID of the component to fetch.
     * @param {string} key - The key of the component to fetch.
     * @returns {any} The fetched component.
     */
    fetchComponent(id, key) {
        this.components[id] = this.components[id] || {};
        return this.components[id][key];
    }
    /**
     * Gets the actors.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[][]} The actors.
     */
    getActors(query = null, pageSize = Infinity) {
        if (query !== null) {
            let results = {};
            for (let key of Object.keys(query)) {
                const index = this.indexes[key];
                if (index) {
                    const result = index.actors.query(query[key]);
                    result.forEach((id) => {
                        results[id] = true;
                    });
                }
            }
            const ids = Object.keys(results);
            return paginate(ids, pageSize);
        }
        return paginate(this.actors, pageSize);
    }
    /**
     * Gets the components.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {Components} The components.
     */
    getComponents(query = null, pageSize = Infinity) {
        let object = this.components;
        if (query !== null) {
            const results = {};
            for (let key of query) {
                results[key] = this.components[key];
            }
            object = results;
        }
        const ids = Object.keys(object);
        const pages = paginate(ids, pageSize);
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                components[id] = object[id];
            }
            return components;
        });
    }
    /**
     * Gets the entities.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[]} The entities.
     */
    getEntities(query = null, pageSize = Infinity) {
        if (query !== null) {
            let results = {};
            for (let key of Object.keys(query)) {
                const index = this.indexes[key];
                if (index) {
                    const result = index.entities.query(query[key]);
                    result.forEach((id) => {
                        results[id] = true;
                    });
                }
            }
            const ids = Object.keys(results);
            return paginate(ids, pageSize);
        }
        return paginate(this.entities, pageSize);
    }
    /**
     * Gets the inputs.
     *
     * @returns {Inputs} The inputs.
     */
    getInputs(query = null, pageSize = Infinity) {
        let object = this.inputs;
        if (query !== null) {
            const results = {};
            for (let key of query) {
                results[key] = this.inputs[key];
            }
            object = results;
        }
        const ids = Object.keys(object);
        const pages = paginate(ids, pageSize);
        return pages.map((page) => {
            const inputs = {};
            for (let id of page) {
                inputs[id] = object[id];
            }
            return inputs;
        });
    }
    /**
     * Checks if an ID is an actor.
     *
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an actor, false otherwise.
     */
    isActor(id) {
        const actors = this.actors;
        return actors.indexOf(id) !== -1;
    }
    /**
     * Checks if an ID is an entity.
     *
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an entity, false otherwise.
     */
    isEntity(id) {
        const entities = this.entities;
        return entities.indexOf(id) !== -1;
    }
    /**
     * Sets the actors.
     *
     * @param {string[]} actors - The actors to set.
     * @returns {string[]} The actors.
     */
    setActors(actors) {
        this.actors = actors;
        return actors;
    }
    /**
     * Sets the components.
     *
     * @param {Components} components - The components to set.
     * @returns {Components} The components.
     */
    setComponents(components) {
        this.components = components;
        return components;
    }
    /**
     * Sets the entities.
     *
     * @param {string[]} entities - The entities to set.
     * @returns {string[]} The entities.
     */
    setEntities(entities) {
        this.entities = entities;
        return entities;
    }
    /**
     * Sets the inputs.
     *
     * @param {Inputs} inputs - The inputs to set.
     * @returns {Inputs} The inputs.
     */
    setInputs(inputs) {
        this.inputs = inputs;
        return inputs;
    }
    /**
     * Stores an actor ID.
     *
     * @param {string} id - The ID of the actor to store.
     * @returns {boolean} True if the actor ID was stored, false otherwise.
     */
    storeActor(id) {
        const actors = this.actors;
        return this.storeId(actors, id);
    }
    /**
     * Stores a component.
     *
     * @param {string} id - The ID of the component to store.
     * @param {string} key - The key of the component to store.
     * @param {any} value - The value of the component to store.
     */
    storeComponent(id, key, value) {
        const prevValue = this.components[id][key];
        this.components[id][key] = value;
        this.componentsIndex.set(id, key);
        if (this.indexes[key]) {
            const index = this.indexes[key];
            if (this.isActor(id)) {
                index.actors.store(id, prevValue, value);
            }
            else {
                index.entities.store(id, prevValue, value);
            }
        }
    }
    /**
     * Stores an entity ID.
     *
     * @param {string} id - The ID of the entity to store.
     * @returns {boolean} True if the entity ID was stored, false otherwise.
     */
    storeEntity(id) {
        const entities = this.entities;
        return this.storeId(entities, id);
    }
    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param {string[]} list - The list to store the ID in.
     * @param {string} id - The ID to store.
     * @returns {boolean} True if the ID was stored, false otherwise.
     */
    storeId(list, id) {
        const [index, left] = binarySearch(list, id);
        if (index === -1) {
            list.splice(left, 0, id);
            return true;
        }
        return false;
    }
    /**
     * Stores an input.
     *
     * @param {string} id - The ID of the input to store.
     * @param {InputPayload} input - The payload of the input to store.
     * @returns {number} The new index of the stored input.
     */
    storeInput(id, input, tick = 0) {
        const inputs = this.inputs;
        inputs[id] = inputs[id] || [];
        const newindex = inputs[id].length;
        inputs[id].push(tick ? [input, tick] : input);
        return newindex;
    }
    /**
     * Queries the store for entities by component.
     *
     * @param {any} query - The query to use.
     * @returns {Set<any>} The entities.
     */
    queryComponents(query) {
        return this.componentsIndex.query(query);
    }
}
