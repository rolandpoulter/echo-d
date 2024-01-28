"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["echoD"] = factory();
	else
		root["echoD"] = factory();
})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this, () => {
return (Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] = Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] || []).push([["becsy"],{

/***/ "./lib/extra/storage/becsy.js":
/*!************************************!*\
  !*** ./lib/extra/storage/becsy.js ***!
  \************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BecsyStorage: () => (/* binding */ BecsyStorage)
/* harmony export */ });
/* harmony import */ var _storage_async_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../storage/async.js */ "./lib/storage/async.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../types.js */ "./lib/types.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils.js */ "./lib/utils.js");



const { 
// System,
// Type,
World } = await __webpack_require__.e(/*! import() */ "vendors-node_modules_deno_lastolivegames_becsy_0_15_5_node_modules_lastolivegames_becsy_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @lastolivegames/becsy/index.js */ "./node_modules/.deno/@lastolivegames+becsy@0.15.5/node_modules/@lastolivegames/becsy/index.js"));
/*
export function defaultGetGroupedValue (value: any | any[], i: number, types: Types, key: string): any {
    const type = types[key]
    if (Array.isArray(type)) {
        return value.slice(i * type[1], (i + 1) * type[1])
    }
    return value[i]
}

export function defaultSetGroupedValue (value: any, _types: Types, _key: string): any {
    return value;
}
*/
class BecsyStorage extends _storage_async_js__WEBPACK_IMPORTED_MODULE_0__.AsyncStorage {
    // declare eids: Map<string, any>;
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            components: new Map(),
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        const { 
        // types,
        // indexes,
        worldOptions = { defs: [] }, world = null, } = options;
        for (let key in this.types) {
            const type = this.types[key];
            if (typeof type[0] === 'string') {
                this.components.set(key, type[2]);
            }
            else
                switch (type) {
                    case Boolean:
                    case Number:
                    case String:
                        this.components.set(key, new Map());
                        break;
                }
        }
        if (worldOptions && !worldOptions.defs) {
            worldOptions.defs = [];
        }
        // if (!((worldOptions as WorldOptions).defs as any[]).length) {
        for (let component of this.components.values()) {
            if (!component) {
                continue;
            }
            if (component instanceof Map) {
                continue;
            }
            if (worldOptions.defs.indexOf(component) === -1) {
                worldOptions.defs.push(component);
            }
        }
        // }
        this.worldOptions = worldOptions;
        this.world = world || World.create(this.worldOptions);
        /*
        this.eids = storage?.eids || new Map();
        
        for (let key in this.actors) {
            this.eids.set(key, addEntity(this.world));
        }

        for (let key in this.entities) {
            this.eids.set(key, addEntity(this.world));
        }

        for (let key in this.components) {
            for (let id in this.components[key]) {
                addComponent(this.world, this.components[key][id], this.ids[id]);
            }
        }
        */
    }
    async cleanup() {
        const world = await this.world;
        try {
            world.__dispatcher.registry.releaseComponentTypes();
            await world.terminate();
        }
        catch (err) {
            // console.warn(err)
        }
    }
    derefEntity(id) {
        if (this.actors.has(id)) {
            return this.actors.get(id);
        }
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }
        return;
    }
    async destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    async destroyComponent(id, key) {
        const entity = this.derefEntity(id);
        const Component = this.components.get(key);
        if (entity === null || entity === undefined || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.findComponent(id, key);
            this.removeComponentsIndex(id, key, prevValue);
        };
        if (Component instanceof Map) {
            const entity = Component.get(id);
            if (entity) {
                Component.delete(id);
            }
            updateIndexes();
        }
        else {
            // removeComponent(this.world, Component, eid);
            updateIndexes();
        }
    }
    async destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    async destroyId(list, id) {
        const entity = list.get(id);
        if (entity) {
            entity.delete();
            list.delete(id);
            return true;
        }
        return false;
    }
    async findComponents(id) {
        const entity = this.derefEntity(id);
        if (entity === null || entity === undefined) {
            return;
        }
        return entity;
    }
    findComponent(id, key) {
        const _ = undefined;
        return this.findComponentProcess(id, key, _, _);
    }
    findComponentProcess(id, key, entity, Component) {
        entity = (entity === null || entity === undefined) ? this.derefEntity(id) : entity;
        Component = Component || this.components.get(key);
        if (entity === null || entity === undefined || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(id);
        }
        else {
            const type = this.types[key];
            const schema = type[3];
            const Type = _types_js__WEBPACK_IMPORTED_MODULE_1__.ArrayTypes.get(type[0]);
            const size = type[1];
            const value = new Type(size);
            const view = entity.has(Component) ? entity.read(Component) : undefined;
            let i = 0;
            if (view === null || view === undefined) {
                return value;
            }
            for (let prop in schema) {
                if (prop === '$val') {
                    value.set(view);
                    break;
                }
                value[i] = view[prop];
                i++;
            }
            return value;
        }
    }
    getActors(query = null, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys());
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.paginate)(actors, pageSize);
        return pages;
        // return new Emitter<string[][]>(pages, true)
    }
    getComponents(query = null, pageSize) {
        // const queryKeys = Object.keys(query);
        // const entities = this.world.with(...queryKeys);
        let ids;
        if (query !== null) {
            ids = query;
        }
        else {
            const actors = this.actors.keys();
            const entities = this.entities.keys();
            ids = [
                ...actors,
                ...entities
            ];
        }
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.paginate)(ids, pageSize);
        const _ = undefined;
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                const entity = this.derefEntity(id);
                if (entity === null || entity === undefined) {
                    continue;
                }
                const compList = this.componentsIndex.get(id);
                const component = {};
                for (let key of compList) {
                    component[key] = this.findComponentProcess(id, key, entity, _);
                }
                components[id] = component;
            }
            return components;
        });
        // return pages;
        // return new Emitter<Components[]>(pages, true)
    }
    getEntities(query = null, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = this.entities.keys();
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.paginate)(entities, pageSize);
        return pages;
        // return new Emitter<string[][]>(pages, true)
    }
    getInputs(query = null, pageSize) {
        return super.getInputs(query, pageSize);
    }
    isActor(id) {
        return this.actors.has(id);
    }
    isEntity(id) {
        return this.entities.has(id);
    }
    async setActors(actors) {
        return super.setActors(actors);
    }
    async setComponents(components) {
        return super.setComponents(components);
    }
    async setEntities(entities) {
        return super.setEntities(entities);
    }
    async setInputs(inputs) {
        return super.setInputs(inputs);
    }
    async storeActor(id) {
        return await this.storeId(this.actors, id);
    }
    async storeComponent(id, key, value) {
        const entity = this.derefEntity(id);
        if (entity !== null && entity !== undefined) {
            const Component = this.components.get(key);
            if (!Component) {
                return;
            }
            if (!entity.has(Component)) {
                entity.add(Component, {});
            }
            let prevValue = [];
            if (Component instanceof Map) {
                prevValue = Component.get(id);
                Component.set(id, value);
            }
            else {
                // entity[key] = value
                const type = this.types[key];
                const schema = type[3];
                const component = entity.write(Component);
                let i = 0;
                for (let prop in schema) {
                    if (prop === '$val') {
                        component.set(value);
                        break;
                    }
                    component[prop] = value[i];
                    i++;
                }
                // const world = await this.world;
                // world.addComponent(entity, key, component);
            }
            await this.updateComponentsIndex(id, key, prevValue, value);
        }
    }
    async storeEntity(id) {
        return await this.storeId(this.entities, id);
    }
    async storeId(list, id) {
        let entity = list.get(id);
        if (entity === null || entity === undefined) {
            const world = await this.world;
            const entity = world.__dispatcher.createEntity([] // (this.worldOptions.defaultComponents || this.worldOptions.defs)
            );
            const reference = entity.__registry.holdEntity(entity.__id);
            // const reference = entity.hold();
            list.set(id, reference);
            return true;
        }
        return false;
    }
    async storeInput(id, input, tick = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.now)()) {
        return super.storeInput(id, input, tick);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./lib/storage/async.js":
/*!******************************!*\
  !*** ./lib/storage/async.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncStorage: () => (/* binding */ AsyncStorage)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../storage.js */ "./lib/storage.js");

const StoragePrototype = _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage.prototype;
/**
 * The AsyncStorage class represents an asynchronous store with actors, entities, components, and inputs.
 *
 * @property {string[]} actors - The actors in the store.
 * @property {string[]} entities - The entities in the store.
 * @property {Components} components - The components in the store.
 * @property {Inputs} inputs - The inputs in the store.
 * @property {Inputs} inputs - The inputs in the store.
 */
class AsyncStorage {
    /**
     * Constructs a new AsyncStorage object.
     *
     * @param {StorageProps} storage - The properties of the store.
     */
    constructor(storage = {}, options = {}) {
        (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.createStorageProps)(this, storage, options);
    }
    /**
     * Removes an actor ID asynchronously.
     *
     * @param {string} id - The ID of the actor to remove.
     * @returns {Promise<boolean>} A Promise that resolves with true if the actor ID was removed, false otherwise.
     */
    async destroyActor(id) {
        return StoragePrototype.destroyActor.call(this, id);
    }
    /**
     * Removes a component asynchronously.
     *
     * @param {string} id - The ID of the component to remove.
     * @param {string} key - The key of the component to remove.
     */
    async destroyComponent(id, key) {
        return StoragePrototype.destroyComponent.call(this, id, key);
    }
    /**
     * Removes an entity ID asynchronously.
     *
     * @param {string} id - The ID of the entity to remove.
     * @returns {Promise<boolean>} A Promise that resolves with true if the entity ID was removed, false otherwise.
     */
    async destroyEntity(id) {
        return StoragePrototype.destroyEntity.call(this, id);
    }
    /**
     * Removes an ID from a list if it exists asynchronously.
     *
     * @param {string[]} list - The list to remove the ID from.
     * @param {string} id - The ID to remove.
     * @returns {Promise<boolean>} A Promise that resolves with true if the ID was removed, false otherwise.
     */
    async destroyId(list, id) {
        return StoragePrototype.destroyId.call(this, list, id);
    }
    /**
     * Fetches a components container for an entity.
     *
     * @param {string} id - The ID of the entity.
     * @returns {Components} The fetched components container.
     */
    async findComponents(id) {
        return StoragePrototype.findComponents.call(this, id);
    }
    /**
     * Fetches a component.
     *
     * @param {string} id - The ID of the component to fetch.
     * @param {string} key - The key of the component to fetch.
     * @returns {any} The fetched component.
     */
    async findComponent(id, key) {
        return StoragePrototype.findComponent.call(this, id, key);
    }
    /**
     * Fetches an actors inputs
     *
     * @param {string} id - The ID of the actor.
     * @returns {InputPayload} The fetched inputs.
     */
    async findInputs(id) {
        return StoragePrototype.findInputs.call(this, id);
    }
    /**
     * Fetches an actors input
     *
     * @param {string} id - The ID of the actor.
     * @param {number} index - The index of the input.
     * @returns {InputPayload} The fetched inputs.
     */
    async findInput(id, index) {
        return StoragePrototype.findInput.call(this, id, index);
    }
    /**
     * Gets the actors.
     *
     * @param {any} query - The query to use.
     * @param {number} pageSize - The page size to use.
     * @returns {string[][]} The actors.
     */
    getActors(query = null, pageSize = Infinity) {
        const pages = StoragePrototype.getActors.call(this, query, pageSize);
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
    getComponents(query = null, pageSize = Infinity) {
        const pages = StoragePrototype.getComponents.call(this, query, pageSize);
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
    getEntities(query = null, pageSize = Infinity) {
        const pages = StoragePrototype.getEntities.call(this, query, pageSize);
        return pages;
        // const emitter = new Emitter<string[][]>(pages as string[][], true); 
        // return emitter;
    }
    /**
     * Gets the inputs.
     *
     * @returns {Inputs} The inputs.
     */
    getInputs(query = null, pageSize = Infinity) {
        const pages = StoragePrototype.getInputs.call(this, query, pageSize);
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
    isActor(id) {
        return StoragePrototype.isActor.call(this, id);
    }
    /**
     * Checks if an ID is an entity.
     *
     * @param {string} id - The ID to check.
     * @returns {boolean} True if the ID is an entity, false otherwise.
     */
    isEntity(id) {
        return StoragePrototype.isEntity.call(this, id);
    }
    /**
     * Sets the actors.
     *
     * @param {string[]} actors - The actors to set.
     * @returns {string[]} The actors.
     */
    async setActors(actors) {
        return StoragePrototype.setActors.call(this, actors);
    }
    /**
     * Sets the components.
     *
     * @param {Components} components - The components to set.
     * @returns {Components} The components.
     */
    async setComponents(components) {
        return StoragePrototype.setComponents.call(this, components);
    }
    /**
     * Sets the entities.
     *
     * @param {string[]} entities - The entities to set.
     * @returns {string[]} The entities.
     */
    async setEntities(entities) {
        return StoragePrototype.setEntities.call(this, entities);
    }
    /**
     * Sets the inputs.
     *
     * @param {Inputs} inputs - The inputs to set.
     * @returns {Inputs} The inputs.
     */
    async setInputs(inputs) {
        return StoragePrototype.setInputs.call(this, inputs);
    }
    /**
     * Stores an actor ID.
     *
     * @param {string} id - The ID of the actor to store.
     * @returns {boolean} True if the actor ID was stored, false otherwise.
     */
    async storeActor(id) {
        return StoragePrototype.storeActor.call(this, id);
    }
    /**
     * Stores a component.
     *
     * @param {string} id - The ID of the component to store.
     * @param {string} key - The key of the component to store.
     * @param {any} value - The value of the component to store.
     */
    async storeComponent(id, key, value) {
        return StoragePrototype.storeComponent.call(this, id, key, value);
    }
    /**
     * Stores an entity ID.
     *
     * @param {string} id - The ID of the entity to store.
     * @returns {boolean} True if the entity ID was stored, false otherwise.
     */
    async storeEntity(id) {
        return StoragePrototype.storeEntity.call(this, id);
    }
    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param {string[]} list - The list to store the ID in.
     * @param {string} id - The ID to store.
     * @returns {boolean} True if the ID was stored, false otherwise.
     */
    async storeId(list, id) {
        return StoragePrototype.storeId.call(this, list, id);
    }
    /**
     * Stores an input.
     *
     * @param {string} id - The ID of the input to store.
     * @param {InputPayload} input - The payload of the input to store.
     * @returns {number} The new index of the stored input.
     */
    async storeInput(id, input, tick = 0) {
        return StoragePrototype.storeInput.call(this, id, input, tick);
    }
    /**
     * Queries the store for entities by component.
     *
     * @param {any} query - The query to use.
     * @returns {Set<any>} The entities.
     */
    queryComponents(query) {
        return StoragePrototype.queryComponents.call(this, query);
    }
    /**
   * Removes a component from the components index.
   *
   * @param {string} id - The ID of the component to remove.
   * @param {string} key - The key of the component to remove.
   * @param {any} prevValue - The previous value of the component.
   * @returns {void}
   */
    removeComponentsIndex(id, key, prevValue) {
        StoragePrototype.removeComponentsIndex.call(this, id, key, prevValue);
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
    updateComponentsIndex(id, key, prevValue, value) {
        StoragePrototype.updateComponentsIndex.call(this, id, key, prevValue, value);
    }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./lib/extra/storage/becsy.js"));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=becsy.echo-d.js.map