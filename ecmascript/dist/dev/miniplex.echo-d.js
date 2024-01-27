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
return (Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] = Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] || []).push([["miniplex"],{

/***/ "./lib/extra/storage/miniplex.js":
/*!***************************************!*\
  !*** ./lib/extra/storage/miniplex.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MiniplexStorage: () => (/* binding */ MiniplexStorage),
/* harmony export */   defaultGetGroupedValue: () => (/* binding */ defaultGetGroupedValue),
/* harmony export */   defaultSetGroupedValue: () => (/* binding */ defaultSetGroupedValue)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../storage.js */ "./lib/storage.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils.js */ "./lib/utils.js");


const { World, } = await __webpack_require__.e(/*! import() */ "vendors-node_modules_deno_miniplex_2_0_0_node_modules_miniplex_dist_miniplex_cjs_js").then(__webpack_require__.t.bind(__webpack_require__, /*! miniplex/dist/miniplex.cjs.js */ "./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.js", 19));
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
class MiniplexStorage extends _storage_js__WEBPACK_IMPORTED_MODULE_0__.Storage {
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            // components: new Map(),
            components: null,
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        const { worldOptions = [], } = options;
        this.worldOptions = worldOptions;
        this.world = storage?.world || new World();
    }
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            const prevValue = entity[key];
            // delete entity[key]
            this.world.removeComponent(entity, key);
            // this.world.reindex(entity)
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
    }
    destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    destroyId(list, id) {
        const entity = list.get(id);
        if (entity) {
            this.world.remove(entity);
            list.delete(id);
            return true;
        }
        return false;
    }
    fetchComponents(id) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            return entity;
        }
    }
    fetchComponent(id, key) {
        const entity = this.actors.get(id) || this.entities.get(id);
        if (entity) {
            return entity[key];
        }
    }
    getActors(query = null, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = Array.from(this.actors.keys());
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.paginate)(actors, pageSize);
    }
    getComponents(query = null, pageSize) {
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
    getEntities(query = null, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = Array.from(this.entities.keys());
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.paginate)(entities, pageSize);
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
            this.world.addComponent(entity, key, value);
            // this.world.reindex(entity)
            this.componentsIndex.set(id, key);
            if (this.indexes[key]) {
                const index = this.indexes[key];
                if (this.isActor(id)) {
                    index.actors.store(id, value, prevValue);
                }
                else {
                    index.entities.store(id, value, prevValue);
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
            entity = {};
            list.set(id, entity);
            this.world.add(entity);
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
/******/ var __webpack_exports__ = (__webpack_exec__("./lib/extra/storage/miniplex.js"));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=miniplex.echo-d.js.map