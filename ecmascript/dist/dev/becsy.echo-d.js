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
/* harmony export */   BecsyStorage: () => (/* binding */ BecsyStorage),
/* harmony export */   defaultGetGroupedValue: () => (/* binding */ defaultGetGroupedValue),
/* harmony export */   defaultSetGroupedValue: () => (/* binding */ defaultSetGroupedValue)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../storage.js */ "./lib/storage.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils.js */ "./lib/utils.js");


const { 
// System,
// Type,
World } = await __webpack_require__.e(/*! import() */ "vendors-node_modules_deno_lastolivegames_becsy_0_15_5_node_modules_lastolivegames_becsy_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @lastolivegames/becsy/index.js */ "./node_modules/.deno/@lastolivegames+becsy@0.15.5/node_modules/@lastolivegames/becsy/index.js"));
function defaultGetGroupedValue(value, i, types, key) {
    const type = types[key];
    if (Array.isArray(type)) {
        return value.slice(i * type[1], (i + 1) * type[1]);
    }
    return value[i];
}
function defaultSetGroupedValue(value, _types, _key) {
    return value;
}
class BecsyStorage extends _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage {
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            components: new Map(),
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        let { 
        // types,
        // indexes,
        worldOptions } = options;
        worldOptions = worldOptions || { defs: [] };
        if (worldOptions && !worldOptions.defs) {
            worldOptions.defs = [];
        }
        // if (!((worldOptions as WorldOptions).defs as any[]).length) {
        //      for (let component of this.components.values()) {
        //         if (!component) {
        //             continue
        //         }
        //         if ((component as any) instanceof Map) {
        //             continue
        //         }
        //         (worldOptions as WorldOptions).defs.push(component)
        //     }
        // }
        this.worldOptions = worldOptions;
        this.world = storage?.world || World.create(this.worldOptions);
        this.eids = storage?.eids || new Map();
        // for (let key in this.types) {
        //     const type = this.types[key];
        //     if (typeof type[0] === 'string') {
        //         this.components.set(key, defineComponent(type[2]));
        //     } else switch (type) {
        //         case Boolean:
        //         case Number:
        //         case String:
        //             this.components.set(key, new Map());
        //             break;
        //     }
        // }
        /*
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
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const eid = this.actors.get(id) || this.entities.get(id);
        const Component = this.components.get(key);
        if (!eid || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.fetchComponent(id, key);
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue);
                }
                else {
                    index.entities.remove(id, prevValue);
                }
            }
        };
        if (Component instanceof Map) {
            const entity = Component.get(eid);
            if (entity) {
                Component.delete(eid);
            }
            updateIndexes();
        }
        else {
            // removeComponent(this.world, Component, eid);
            updateIndexes();
        }
    }
    destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    destroyId(list, id) {
        const eid = list.get(id);
        if (eid) {
            // removeEntity(this.world, eid);
            list.delete(id);
            return true;
        }
        return false;
    }
    fetchComponents(id) {
        const eid = this.actors.get(id) || this.entities.get(id);
        if (!eid) {
            return;
        }
        return eid;
    }
    fetchComponent(id, key) {
        const eid = this.actors.get(id) || this.entities.get(id);
        const Component = this.components.get(key);
        if (!eid || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(eid);
        }
        else {
            // const type = this.types[key];
            // const schema = type[3]
            // const Type = ArrayTypes.get(type[0])
            // const size = type[1]
            // const value = new Type(size)
            // let i = 0
            // for (let prop in schema) {
            //     // value[i] = Component[prop][eid]
            //     i++
            // }
            // return value
        }
    }
    getActors(query, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys());
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.paginate)(actors, pageSize);
    }
    getComponents(query, pageSize) {
        // const queryKeys = Object.keys(query);
        // const entities = this.world.with(...queryKeys);
        let ids;
        if (query !== null) {
            ids = query;
        }
        else {
            const actors = Array.from(this.actors.keys());
            const entities = Array.from(this.entities.keys());
            ids = actors.concat(entities);
        }
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.paginate)(ids, pageSize);
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                components[id] = this.actors.get(id) || this.entities.get(id);
            }
            return components;
        });
    }
    getEntities(query, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = Array.from(this.entities.keys());
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.paginate)(entities, pageSize);
    }
    getInputs(query, pageSize) {
        return super.getInputs(query, pageSize);
    }
    isActor(id) {
        return this.actors.has(id);
    }
    isEntity(id) {
        return this.entities.has(id);
    }
    setActors(actors) {
        return super.setActors(actors);
    }
    setComponents(components) {
        return super.setComponents(components);
    }
    setEntities(entities) {
        return super.setEntities(entities);
    }
    setInputs(inputs) {
        return super.setInputs(inputs);
    }
    storeActor(id) {
        return this.storeId(this.actors, id);
    }
    storeComponent(id, key, value) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key];
            // entity[key] = value
            const type = this.types[key];
            const schema = type[3];
            const component = {};
            let i = 0;
            for (let prop in schema) {
                component[prop] = value[i];
                i++;
            }
            this.world.addComponent(entity, key, component);
            // this.world.reindex(entity)
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.remove(id, prevValue);
                    index.actors.set(id, value);
                }
                else {
                    index.entities.remove(id, prevValue);
                    index.entities.set(id, value);
                }
            }
        }
    }
    storeEntity(id) {
        return this.storeId(this.entities, id);
    }
    storeId(list, id) {
        let entity = list.get(id);
        if (!entity) {
            console.log('GOT HERE BABY', this.world);
            entity = this.world.createEntity(
            // entity
            );
            list.set(id, entity);
            return true;
        }
        return false;
    }
    storeInput(id, input, tick = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.now)()) {
        return super.storeInput(id, input, tick);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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