export const id = "bitecs";
export const ids = ["bitecs"];
export const modules = {

/***/ "./lib/extra/storage/bitecs.js":
/*!*************************************!*\
  !*** ./lib/extra/storage/bitecs.js ***!
  \*************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BitECSStorage: () => (/* binding */ BitECSStorage),
/* harmony export */   defaultGetGroupedValue: () => (/* binding */ defaultGetGroupedValue),
/* harmony export */   defaultSetGroupedValue: () => (/* binding */ defaultSetGroupedValue)
/* harmony export */ });
/* harmony import */ var bitecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bitecs */ "./node_modules/.deno/bitecs@0.3.40/node_modules/bitecs/dist/index.mjs");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../storage.js */ "./lib/storage.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../types.js */ "./lib/types.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils.js */ "./lib/utils.js");




// interface WorldOptions {
//     defs: any[];
//     [key: string]: any;
// }
const { createWorld, 
// Types,
defineComponent, removeComponent, removeEntity, 
// defineQuery,
entityExists, addEntity, addComponent, getEntityComponents,
// pipe,
 } = await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! bitecs */ "./node_modules/.deno/bitecs@0.3.40/node_modules/bitecs/dist/index.mjs"));
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
class BitECSStorage extends _storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage {
    constructor(storage, options) {
        super({
            ...(storage || {}),
            actors: new Map(),
            components: new Map(),
            entities: new Map(),
            // inputs: new Map(),
            inputs: null,
        }, options);
        for (let key in this.types) {
            const type = this.types[key];
            if (typeof type[0] === 'string') {
                this.components.set(key, type[2] || defineComponent(type[3], type[4]));
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
        let { 
        // types,
        // indexes,
        worldOptions, } = options;
        /*
        worldOptions = worldOptions || { defs: [] }

        if (worldOptions && !(worldOptions as WorldOptions).defs) {
            (worldOptions as WorldOptions).defs = []
        }

        if (!((worldOptions as WorldOptions).defs as any[]).length) {
             for (let component of this.components.values()) {
                if (!component) {
                    continue
                }
                if ((component as any) instanceof Map) {
                    continue
                }
                (worldOptions as WorldOptions).defs.push(component)
            }
        }
        */
        this.worldOptions = worldOptions;
        this.world = storage?.world || createWorld(); // worldOptions);
        this.eids = storage?.eids || new Map();
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
        const eid = this.getEID(id);
        const Component = this.components.get(key);
        if ((eid === undefined || eid === null) || !Component) {
            return;
        }
        const updateIndexes = () => {
            const prevValue = this.fetchComponentProcess(id, key, Component, eid);
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
            if (Component.has(eid)) {
                Component.delete(eid);
            }
            updateIndexes();
        }
        else {
            if (entityExists(this.world, eid)) {
                if ((0,bitecs__WEBPACK_IMPORTED_MODULE_0__.hasComponent)(this.world, Component, eid)) {
                    removeComponent(this.world, Component, eid);
                }
            }
            updateIndexes();
        }
    }
    destroyEntity(id) {
        return this.destroyId(this.entities, id);
    }
    destroyId(list, id) {
        const eid = list.get(id);
        if (eid !== null && eid !== undefined) {
            if (entityExists(this.world, eid)) {
                removeEntity(this.world, eid);
            }
            if (list.has(id)) {
                list.delete(id);
            }
            return true;
        }
        return false;
    }
    fetchComponents(id) {
        const eid = this.getEID(id);
        if (eid !== null && eid !== undefined) {
            return;
        }
        return eid;
    }
    fetchComponent(id, key) {
        return this.fetchComponentProcess(id, key, undefined, undefined);
    }
    fetchComponentProcess(id, key, Component, eid) {
        eid = (eid === undefined || eid === null) ? this.getEID(id) : eid;
        Component = Component || this.components.get(key);
        if ((eid !== null && eid !== undefined) || !Component) {
            return;
        }
        if (Component instanceof Map) {
            return Component.get(eid);
        }
        else {
            const type = this.types[key];
            const schema = type[3];
            const Type = _types_js__WEBPACK_IMPORTED_MODULE_2__.ArrayTypes.get(type[0]);
            const size = type[1];
            const value = new Type(size);
            let i = 0;
            for (let prop in schema) {
                value[i] = Component[prop][eid];
                i++;
            }
            return value;
        }
    }
    getActors(query = null, pageSize) {
        if (query !== null) {
            return super.getActors(query, pageSize);
        }
        const actors = this.actors.keys();
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.paginate)(actors, pageSize);
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
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.paginate)(ids, pageSize);
        const compEntries = this.components.entries();
        const compLookup = new Map();
        for (let [key, value] of compEntries) {
            compLookup.set(value, key);
        }
        return pages.map((page) => {
            const components = {};
            for (let id of page) {
                const eid = this.getEID(id);
                if (eid === undefined || eid === null) {
                    continue;
                }
                const entity = {};
                const compList = getEntityComponents(this.world, eid);
                compList.forEach((Component) => {
                    const key = compLookup.get(Component);
                    if (!key) {
                        return;
                    }
                    // TODO: fix this
                    // const val = this.fetchComponentProcess(id, key, Component, eid)
                    let val;
                    if (Component instanceof Map) {
                        val = Component.get(eid);
                    }
                    else {
                        const type = this.types[key];
                        const schema = type[3];
                        const Type = _types_js__WEBPACK_IMPORTED_MODULE_2__.ArrayTypes.get(type[0]);
                        const size = type[1];
                        const value = new Type(size);
                        let i = 0;
                        for (let prop in schema) {
                            value[i] = Component[prop][eid];
                            i++;
                        }
                        val = value;
                    }
                    entity[key] = val;
                });
                components[id] = entity;
            }
            return components;
        });
    }
    getEntities(query = null, pageSize) {
        if (query !== null) {
            return super.getEntities(query, pageSize);
        }
        const entities = this.entities.keys();
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.paginate)(entities, pageSize);
    }
    getInputs(query = null, pageSize) {
        return super.getInputs(query, pageSize);
    }
    getEID(id) {
        if (this.actors.has(id)) {
            return this.actors.get(id);
        }
        if (this.entities.has(id)) {
            return this.entities.get(id);
        }
        return;
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
        let entity = this.getEID(id);
        if (entity !== null && entity !== undefined) {
            if (!entityExists(this.world, entity)) {
                entity = addEntity(this.world);
                if (this.isActor(id)) {
                    // this.actors.delete(id);
                    this.actors.set(id, entity);
                }
                else {
                    // this.entities.delete(id);
                    this.entities.set(id, entity);
                }
            }
            const Component = this.components.get(key);
            if (!Component) {
                return;
            }
            if (!(0,bitecs__WEBPACK_IMPORTED_MODULE_0__.hasComponent)(this.world, Component, entity)) {
                addComponent(this.world, Component, entity);
            }
            let prevValue = []; // TODO: fix this
            if (Component instanceof Map) {
                prevValue = Component.get(entity);
                Component.set(entity, value);
            }
            else {
                const type = this.types[key];
                const schema = type[3];
                let i = 0;
                for (let prop in schema) {
                    prevValue[i] = Component[prop][entity];
                    Component[prop][entity] = value[i];
                    i++;
                }
            }
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
        if (entity == null && entity == undefined) {
            entity = addEntity(this.world);
            list.set(id, entity);
            return true;
        }
        else if (!entityExists(this.world, entity)) {
            // list.delete(id);
            entity = addEntity(this.world);
            list.set(id, entity);
            return true;
        }
        return false;
    }
    storeInput(id, input, tick = 0) {
        return super.storeInput(id, input, tick);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./node_modules/.deno/bitecs@0.3.40/node_modules/bitecs/dist/index.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/.deno/bitecs@0.3.40/node_modules/bitecs/dist/index.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Changed: () => (/* binding */ Changed),
/* harmony export */   DESERIALIZE_MODE: () => (/* binding */ DESERIALIZE_MODE),
/* harmony export */   Not: () => (/* binding */ Not),
/* harmony export */   Types: () => (/* binding */ Types),
/* harmony export */   addComponent: () => (/* binding */ addComponent),
/* harmony export */   addEntity: () => (/* binding */ addEntity),
/* harmony export */   commitRemovals: () => (/* binding */ commitRemovals),
/* harmony export */   createWorld: () => (/* binding */ createWorld),
/* harmony export */   defineComponent: () => (/* binding */ defineComponent),
/* harmony export */   defineDeserializer: () => (/* binding */ defineDeserializer),
/* harmony export */   defineQuery: () => (/* binding */ defineQuery),
/* harmony export */   defineSerializer: () => (/* binding */ defineSerializer),
/* harmony export */   defineSystem: () => (/* binding */ defineSystem),
/* harmony export */   deleteWorld: () => (/* binding */ deleteWorld),
/* harmony export */   enableManualEntityRecycling: () => (/* binding */ enableManualEntityRecycling),
/* harmony export */   enterQuery: () => (/* binding */ enterQuery),
/* harmony export */   entityExists: () => (/* binding */ entityExists),
/* harmony export */   exitQuery: () => (/* binding */ exitQuery),
/* harmony export */   flushRemovedEntities: () => (/* binding */ flushRemovedEntities),
/* harmony export */   getAllEntities: () => (/* binding */ getAllEntities),
/* harmony export */   getEntityComponents: () => (/* binding */ getEntityComponents),
/* harmony export */   getWorldComponents: () => (/* binding */ getWorldComponents),
/* harmony export */   hasComponent: () => (/* binding */ hasComponent),
/* harmony export */   parentArray: () => (/* binding */ parentArray),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   registerComponent: () => (/* binding */ registerComponent),
/* harmony export */   registerComponents: () => (/* binding */ registerComponents),
/* harmony export */   removeComponent: () => (/* binding */ removeComponent),
/* harmony export */   removeEntity: () => (/* binding */ removeEntity),
/* harmony export */   removeQuery: () => (/* binding */ removeQuery),
/* harmony export */   resetChangedQuery: () => (/* binding */ resetChangedQuery),
/* harmony export */   resetGlobals: () => (/* binding */ resetGlobals),
/* harmony export */   resetWorld: () => (/* binding */ resetWorld),
/* harmony export */   setDefaultSize: () => (/* binding */ setDefaultSize),
/* harmony export */   setRemovedRecycleThreshold: () => (/* binding */ setRemovedRecycleThreshold)
/* harmony export */ });
// src/Constants.js
var TYPES_ENUM = {
  i8: "i8",
  ui8: "ui8",
  ui8c: "ui8c",
  i16: "i16",
  ui16: "ui16",
  i32: "i32",
  ui32: "ui32",
  f32: "f32",
  f64: "f64",
  eid: "eid"
};
var TYPES_NAMES = {
  i8: "Int8",
  ui8: "Uint8",
  ui8c: "Uint8Clamped",
  i16: "Int16",
  ui16: "Uint16",
  i32: "Int32",
  ui32: "Uint32",
  eid: "Uint32",
  f32: "Float32",
  f64: "Float64"
};
var TYPES = {
  i8: Int8Array,
  ui8: Uint8Array,
  ui8c: Uint8ClampedArray,
  i16: Int16Array,
  ui16: Uint16Array,
  i32: Int32Array,
  ui32: Uint32Array,
  f32: Float32Array,
  f64: Float64Array,
  eid: Uint32Array
};
var UNSIGNED_MAX = {
  uint8: 2 ** 8,
  uint16: 2 ** 16,
  uint32: 2 ** 32
};

// src/Storage.js
var roundToMultiple = (mul) => (x) => Math.ceil(x / mul) * mul;
var roundToMultiple4 = roundToMultiple(4);
var $storeRef = Symbol("storeRef");
var $storeSize = Symbol("storeSize");
var $storeMaps = Symbol("storeMaps");
var $storeFlattened = Symbol("storeFlattened");
var $storeBase = Symbol("storeBase");
var $storeType = Symbol("storeType");
var $storeArrayElementCounts = Symbol("storeArrayElementCounts");
var $storeSubarrays = Symbol("storeSubarrays");
var $subarrayCursors = Symbol("subarrayCursors");
var $subarray = Symbol("subarray");
var $subarrayFrom = Symbol("subarrayFrom");
var $subarrayTo = Symbol("subarrayTo");
var $parentArray = Symbol("parentArray");
var $tagStore = Symbol("tagStore");
var $queryShadow = Symbol("queryShadow");
var $serializeShadow = Symbol("serializeShadow");
var $indexType = Symbol("indexType");
var $indexBytes = Symbol("indexBytes");
var $isEidType = Symbol("isEidType");
var stores = {};
var resize = (ta, size) => {
  const newBuffer = new ArrayBuffer(size * ta.BYTES_PER_ELEMENT);
  const newTa = new ta.constructor(newBuffer);
  newTa.set(ta, 0);
  return newTa;
};
var createShadow = (store, key) => {
  if (!ArrayBuffer.isView(store)) {
    const shadowStore = store[$parentArray].slice(0);
    store[key] = store.map((_, eid) => {
      const { length } = store[eid];
      const start = length * eid;
      const end = start + length;
      return shadowStore.subarray(start, end);
    });
  } else {
    store[key] = store.slice(0);
  }
};
var resetStoreFor = (store, eid) => {
  if (store[$storeFlattened]) {
    store[$storeFlattened].forEach((ta) => {
      if (ArrayBuffer.isView(ta))
        ta[eid] = 0;
      else
        ta[eid].fill(0);
    });
  }
};
var createTypeStore = (type, length) => {
  const totalBytes = length * TYPES[type].BYTES_PER_ELEMENT;
  const buffer = new ArrayBuffer(totalBytes);
  const store = new TYPES[type](buffer);
  store[$isEidType] = type === TYPES_ENUM.eid;
  return store;
};
var parentArray = (store) => store[$parentArray];
var createArrayStore = (metadata, type, length) => {
  const storeSize = metadata[$storeSize];
  const store = Array(storeSize).fill(0);
  store[$storeType] = type;
  store[$isEidType] = type === TYPES_ENUM.eid;
  const cursors = metadata[$subarrayCursors];
  const indexType = length <= UNSIGNED_MAX.uint8 ? TYPES_ENUM.ui8 : length <= UNSIGNED_MAX.uint16 ? TYPES_ENUM.ui16 : TYPES_ENUM.ui32;
  if (!length)
    throw new Error("bitECS - Must define component array length");
  if (!TYPES[type])
    throw new Error(`bitECS - Invalid component array property type ${type}`);
  if (!metadata[$storeSubarrays][type]) {
    const arrayElementCount = metadata[$storeArrayElementCounts][type];
    const array = new TYPES[type](roundToMultiple4(arrayElementCount * storeSize));
    array[$indexType] = TYPES_NAMES[indexType];
    array[$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    metadata[$storeSubarrays][type] = array;
  }
  const start = cursors[type];
  const end = start + storeSize * length;
  cursors[type] = end;
  store[$parentArray] = metadata[$storeSubarrays][type].subarray(start, end);
  for (let eid = 0; eid < storeSize; eid++) {
    const start2 = length * eid;
    const end2 = start2 + length;
    store[eid] = store[$parentArray].subarray(start2, end2);
    store[eid][$indexType] = TYPES_NAMES[indexType];
    store[eid][$indexBytes] = TYPES[indexType].BYTES_PER_ELEMENT;
    store[eid][$subarray] = true;
  }
  return store;
};
var isArrayType = (x) => Array.isArray(x) && typeof x[0] === "string" && typeof x[1] === "number";
var createStore = (schema, size) => {
  const $store = Symbol("store");
  if (!schema || !Object.keys(schema).length) {
    stores[$store] = {
      [$storeSize]: size,
      [$tagStore]: true,
      [$storeBase]: () => stores[$store]
    };
    return stores[$store];
  }
  schema = JSON.parse(JSON.stringify(schema));
  const arrayElementCounts = {};
  const collectArrayElementCounts = (s) => {
    const keys = Object.keys(s);
    for (const k of keys) {
      if (isArrayType(s[k])) {
        if (!arrayElementCounts[s[k][0]])
          arrayElementCounts[s[k][0]] = 0;
        arrayElementCounts[s[k][0]] += s[k][1];
      } else if (s[k] instanceof Object) {
        collectArrayElementCounts(s[k]);
      }
    }
  };
  collectArrayElementCounts(schema);
  const metadata = {
    [$storeSize]: size,
    [$storeMaps]: {},
    [$storeSubarrays]: {},
    [$storeRef]: $store,
    [$subarrayCursors]: Object.keys(TYPES).reduce((a, type) => ({ ...a, [type]: 0 }), {}),
    [$storeFlattened]: [],
    [$storeArrayElementCounts]: arrayElementCounts
  };
  if (schema instanceof Object && Object.keys(schema).length) {
    const recursiveTransform = (a, k) => {
      if (typeof a[k] === "string") {
        a[k] = createTypeStore(a[k], size);
        a[k][$storeBase] = () => stores[$store];
        metadata[$storeFlattened].push(a[k]);
      } else if (isArrayType(a[k])) {
        const [type, length] = a[k];
        a[k] = createArrayStore(metadata, type, length);
        a[k][$storeBase] = () => stores[$store];
        metadata[$storeFlattened].push(a[k]);
      } else if (a[k] instanceof Object) {
        a[k] = Object.keys(a[k]).reduce(recursiveTransform, a[k]);
      }
      return a;
    };
    stores[$store] = Object.assign(Object.keys(schema).reduce(recursiveTransform, schema), metadata);
    stores[$store][$storeBase] = () => stores[$store];
    return stores[$store];
  }
};

// src/Util.js
var SparseSet = () => {
  const dense = [];
  const sparse = [];
  dense.sort = function(comparator) {
    const result = Array.prototype.sort.call(this, comparator);
    for (let i = 0; i < dense.length; i++) {
      sparse[dense[i]] = i;
    }
    return result;
  };
  const has = (val) => dense[sparse[val]] === val;
  const add = (val) => {
    if (has(val))
      return;
    sparse[val] = dense.push(val) - 1;
  };
  const remove = (val) => {
    if (!has(val))
      return;
    const index = sparse[val];
    const swapped = dense.pop();
    if (swapped !== val) {
      dense[index] = swapped;
      sparse[swapped] = index;
    }
  };
  const reset = () => {
    dense.length = 0;
    sparse.length = 0;
  };
  return {
    add,
    remove,
    has,
    sparse,
    dense,
    reset
  };
};

// src/Serialize.js
var DESERIALIZE_MODE = {
  REPLACE: 0,
  APPEND: 1,
  MAP: 2
};
var resized = false;
var setSerializationResized = (v) => {
  resized = v;
};
var concat = (a, v) => a.concat(v);
var not = (fn) => (v) => !fn(v);
var storeFlattened = (c) => c[$storeFlattened];
var isFullComponent = storeFlattened;
var isProperty = not(isFullComponent);
var isModifier = (c) => typeof c === "function" && c[$modifier];
var isNotModifier = not(isModifier);
var isChangedModifier = (c) => isModifier(c) && c()[1] === "changed";
var isWorld = (w) => Object.getOwnPropertySymbols(w).includes($componentMap);
var fromModifierToComponent = (c) => c()[0];
var canonicalize = (target) => {
  if (isWorld(target))
    return [[], /* @__PURE__ */ new Map()];
  const fullComponentProps = target.filter(isNotModifier).filter(isFullComponent).map(storeFlattened).reduce(concat, []);
  const changedComponentProps = target.filter(isChangedModifier).map(fromModifierToComponent).filter(isFullComponent).map(storeFlattened).reduce(concat, []);
  const props = target.filter(isNotModifier).filter(isProperty);
  const changedProps = target.filter(isChangedModifier).map(fromModifierToComponent).filter(isProperty);
  const componentProps = [...fullComponentProps, ...props, ...changedComponentProps, ...changedProps];
  const allChangedProps = [...changedComponentProps, ...changedProps].reduce((map, prop) => {
    const $ = Symbol();
    createShadow(prop, $);
    map.set(prop, $);
    return map;
  }, /* @__PURE__ */ new Map());
  return [componentProps, allChangedProps];
};
var defineSerializer = (target, maxBytes = 2e7) => {
  const worldSerializer = isWorld(target);
  let [componentProps, changedProps] = canonicalize(target);
  const buffer = new ArrayBuffer(maxBytes);
  const view = new DataView(buffer);
  const entityComponentCache = /* @__PURE__ */ new Map();
  return (ents) => {
    if (resized) {
      [componentProps, changedProps] = canonicalize(target);
      resized = false;
    }
    if (worldSerializer) {
      componentProps = [];
      target[$componentMap].forEach((c, component) => {
        if (component[$storeFlattened])
          componentProps.push(...component[$storeFlattened]);
        else
          componentProps.push(component);
      });
    }
    let world;
    if (Object.getOwnPropertySymbols(ents).includes($componentMap)) {
      world = ents;
      ents = ents[$entityArray];
    } else {
      world = eidToWorld.get(ents[0]);
    }
    let where = 0;
    if (!ents.length)
      return buffer.slice(0, where);
    const cache = /* @__PURE__ */ new Map();
    for (let pid = 0; pid < componentProps.length; pid++) {
      const prop = componentProps[pid];
      const component = prop[$storeBase]();
      const $diff = changedProps.get(prop);
      const shadow = $diff ? prop[$diff] : null;
      if (!cache.has(component))
        cache.set(component, /* @__PURE__ */ new Map());
      view.setUint8(where, pid);
      where += 1;
      const countWhere = where;
      where += 4;
      let writeCount = 0;
      for (let i = 0; i < ents.length; i++) {
        const eid = ents[i];
        let componentCache = entityComponentCache.get(eid);
        if (!componentCache)
          componentCache = entityComponentCache.set(eid, /* @__PURE__ */ new Set()).get(eid);
        componentCache.add(eid);
        const newlyAddedComponent = shadow && cache.get(component).get(eid) || !componentCache.has(component) && hasComponent(world, component, eid);
        cache.get(component).set(eid, newlyAddedComponent);
        if (newlyAddedComponent) {
          componentCache.add(component);
        } else if (!hasComponent(world, component, eid)) {
          componentCache.delete(component);
          continue;
        }
        const rewindWhere = where;
        view.setUint32(where, eid);
        where += 4;
        if (prop[$tagStore]) {
          writeCount++;
          continue;
        }
        if (ArrayBuffer.isView(prop[eid])) {
          const type = prop[eid].constructor.name.replace("Array", "");
          const indexType = prop[eid][$indexType];
          const indexBytes = prop[eid][$indexBytes];
          const countWhere2 = where;
          where += indexBytes;
          let arrayWriteCount = 0;
          for (let i2 = 0; i2 < prop[eid].length; i2++) {
            if (shadow) {
              const changed = shadow[eid][i2] !== prop[eid][i2];
              shadow[eid][i2] = prop[eid][i2];
              if (!changed && !newlyAddedComponent) {
                continue;
              }
            }
            view[`set${indexType}`](where, i2);
            where += indexBytes;
            const value = prop[eid][i2];
            view[`set${type}`](where, value);
            where += prop[eid].BYTES_PER_ELEMENT;
            arrayWriteCount++;
          }
          if (arrayWriteCount > 0) {
            view[`set${indexType}`](countWhere2, arrayWriteCount);
            writeCount++;
          } else {
            where = rewindWhere;
            continue;
          }
        } else {
          if (shadow) {
            const changed = shadow[eid] !== prop[eid];
            shadow[eid] = prop[eid];
            if (!changed && !newlyAddedComponent) {
              where = rewindWhere;
              continue;
            }
          }
          const type = prop.constructor.name.replace("Array", "");
          view[`set${type}`](where, prop[eid]);
          where += prop.BYTES_PER_ELEMENT;
          writeCount++;
        }
      }
      if (writeCount > 0) {
        view.setUint32(countWhere, writeCount);
      } else {
        where -= 5;
      }
    }
    return buffer.slice(0, where);
  };
};
var newEntities = /* @__PURE__ */ new Map();
var defineDeserializer = (target) => {
  const isWorld2 = Object.getOwnPropertySymbols(target).includes($componentMap);
  let [componentProps] = canonicalize(target);
  const deserializedEntities = /* @__PURE__ */ new Set();
  return (world, packet, mode = 0) => {
    newEntities.clear();
    if (resized) {
      [componentProps] = canonicalize(target);
      resized = false;
    }
    if (isWorld2) {
      componentProps = [];
      target[$componentMap].forEach((c, component) => {
        if (component[$storeFlattened])
          componentProps.push(...component[$storeFlattened]);
        else
          componentProps.push(component);
      });
    }
    const localEntities = world[$localEntities];
    const localEntityLookup = world[$localEntityLookup];
    const view = new DataView(packet);
    let where = 0;
    while (where < packet.byteLength) {
      const pid = view.getUint8(where);
      where += 1;
      const entityCount = view.getUint32(where);
      where += 4;
      const prop = componentProps[pid];
      for (let i = 0; i < entityCount; i++) {
        let eid = view.getUint32(where);
        where += 4;
        if (mode === DESERIALIZE_MODE.MAP) {
          if (localEntities.has(eid)) {
            eid = localEntities.get(eid);
          } else if (newEntities.has(eid)) {
            eid = newEntities.get(eid);
          } else {
            const newEid = addEntity(world);
            localEntities.set(eid, newEid);
            localEntityLookup.set(newEid, eid);
            newEntities.set(eid, newEid);
            eid = newEid;
          }
        }
        if (mode === DESERIALIZE_MODE.APPEND || mode === DESERIALIZE_MODE.REPLACE && !world[$entitySparseSet].has(eid)) {
          const newEid = newEntities.get(eid) || addEntity(world);
          newEntities.set(eid, newEid);
          eid = newEid;
        }
        const component = prop[$storeBase]();
        if (!hasComponent(world, component, eid)) {
          addComponent(world, component, eid);
        }
        deserializedEntities.add(eid);
        if (component[$tagStore]) {
          continue;
        }
        if (ArrayBuffer.isView(prop[eid])) {
          const array = prop[eid];
          const count = view[`get${array[$indexType]}`](where);
          where += array[$indexBytes];
          for (let i2 = 0; i2 < count; i2++) {
            const index = view[`get${array[$indexType]}`](where);
            where += array[$indexBytes];
            const value = view[`get${array.constructor.name.replace("Array", "")}`](where);
            where += array.BYTES_PER_ELEMENT;
            if (prop[$isEidType]) {
              let localEid;
              if (localEntities.has(value)) {
                localEid = localEntities.get(value);
              } else if (newEntities.has(value)) {
                localEid = newEntities.get(value);
              } else {
                const newEid = addEntity(world);
                localEntities.set(value, newEid);
                localEntityLookup.set(newEid, value);
                newEntities.set(value, newEid);
                localEid = newEid;
              }
              prop[eid][index] = localEid;
            } else
              prop[eid][index] = value;
          }
        } else {
          const value = view[`get${prop.constructor.name.replace("Array", "")}`](where);
          where += prop.BYTES_PER_ELEMENT;
          if (prop[$isEidType]) {
            let localEid;
            if (localEntities.has(value)) {
              localEid = localEntities.get(value);
            } else if (newEntities.has(value)) {
              localEid = newEntities.get(value);
            } else {
              const newEid = addEntity(world);
              localEntities.set(value, newEid);
              localEntityLookup.set(newEid, value);
              newEntities.set(value, newEid);
              localEid = newEid;
            }
            prop[eid] = localEid;
          } else
            prop[eid] = value;
        }
      }
    }
    const ents = Array.from(deserializedEntities);
    deserializedEntities.clear();
    return ents;
  };
};

// src/Entity.js
var $entityMasks = Symbol("entityMasks");
var $entityComponents = Symbol("entityComponents");
var $entitySparseSet = Symbol("entitySparseSet");
var $entityArray = Symbol("entityArray");
var $entityIndices = Symbol("entityIndices");
var $removedEntities = Symbol("removedEntities");
var defaultSize = 1e5;
var globalEntityCursor = 0;
var globalSize = defaultSize;
var getGlobalSize = () => globalSize;
var removed = [];
var recycled = [];
var defaultRemovedReuseThreshold = 0.01;
var removedReuseThreshold = defaultRemovedReuseThreshold;
var resetGlobals = () => {
  globalSize = defaultSize;
  globalEntityCursor = 0;
  removedReuseThreshold = defaultRemovedReuseThreshold;
  removed.length = 0;
  recycled.length = 0;
};
var setDefaultSize = (newSize) => {
  const oldSize = globalSize;
  defaultSize = newSize;
  resetGlobals();
  globalSize = newSize;
  resizeWorlds(newSize);
  setSerializationResized(true);
};
var setRemovedRecycleThreshold = (newThreshold) => {
  removedReuseThreshold = newThreshold;
};
var getEntityCursor = () => globalEntityCursor;
var eidToWorld = /* @__PURE__ */ new Map();
var flushRemovedEntities = (world) => {
  if (!world[$manualEntityRecycling]) {
    throw new Error("bitECS - cannot flush removed entities, enable feature with the enableManualEntityRecycling function");
  }
  removed.push(...recycled);
  recycled.length = 0;
};
var addEntity = (world) => {
  const eid = world[$manualEntityRecycling] ? removed.length ? removed.shift() : globalEntityCursor++ : removed.length > Math.round(globalSize * removedReuseThreshold) ? removed.shift() : globalEntityCursor++;
  if (eid > world[$size])
    throw new Error("bitECS - max entities reached");
  world[$entitySparseSet].add(eid);
  eidToWorld.set(eid, world);
  world[$notQueries].forEach((q) => {
    const match = queryCheckEntity(world, q, eid);
    if (match)
      queryAddEntity(q, eid);
  });
  world[$entityComponents].set(eid, /* @__PURE__ */ new Set());
  return eid;
};
var removeEntity = (world, eid) => {
  if (!world[$entitySparseSet].has(eid))
    return;
  world[$queries].forEach((q) => {
    queryRemoveEntity(world, q, eid);
  });
  if (world[$manualEntityRecycling])
    recycled.push(eid);
  else
    removed.push(eid);
  world[$entitySparseSet].remove(eid);
  world[$entityComponents].delete(eid);
  world[$localEntities].delete(world[$localEntityLookup].get(eid));
  world[$localEntityLookup].delete(eid);
  for (let i = 0; i < world[$entityMasks].length; i++)
    world[$entityMasks][i][eid] = 0;
};
var getEntityComponents = (world, eid) => {
  if (eid === void 0)
    throw new Error("bitECS - entity is undefined.");
  if (!world[$entitySparseSet].has(eid))
    throw new Error("bitECS - entity does not exist in the world.");
  return Array.from(world[$entityComponents].get(eid));
};
var entityExists = (world, eid) => world[$entitySparseSet].has(eid);

// src/Query.js
var $modifier = Symbol("$modifier");
function modifier(c, mod) {
  const inner = () => [c, mod];
  inner[$modifier] = true;
  return inner;
}
var Not = (c) => modifier(c, "not");
var Changed = (c) => modifier(c, "changed");
function Any(...comps) {
  return function QueryAny() {
    return comps;
  };
}
function All(...comps) {
  return function QueryAll() {
    return comps;
  };
}
function None(...comps) {
  return function QueryNone() {
    return comps;
  };
}
var $queries = Symbol("queries");
var $notQueries = Symbol("notQueries");
var $queryAny = Symbol("queryAny");
var $queryAll = Symbol("queryAll");
var $queryNone = Symbol("queryNone");
var $queryMap = Symbol("queryMap");
var $dirtyQueries = Symbol("$dirtyQueries");
var $queryComponents = Symbol("queryComponents");
var $enterQuery = Symbol("enterQuery");
var $exitQuery = Symbol("exitQuery");
var empty = Object.freeze([]);
var enterQuery = (query) => (world) => {
  if (!world[$queryMap].has(query))
    registerQuery(world, query);
  const q = world[$queryMap].get(query);
  if (q.entered.dense.length === 0) {
    return empty;
  } else {
    const results = q.entered.dense.slice();
    q.entered.reset();
    return results;
  }
};
var exitQuery = (query) => (world) => {
  if (!world[$queryMap].has(query))
    registerQuery(world, query);
  const q = world[$queryMap].get(query);
  if (q.exited.dense.length === 0) {
    return empty;
  } else {
    const results = q.exited.dense.slice();
    q.exited.reset();
    return results;
  }
};
var registerQuery = (world, query) => {
  const components2 = [];
  const notComponents = [];
  const changedComponents = [];
  query[$queryComponents].forEach((c) => {
    if (typeof c === "function" && c[$modifier]) {
      const [comp, mod] = c();
      if (!world[$componentMap].has(comp))
        registerComponent(world, comp);
      if (mod === "not") {
        notComponents.push(comp);
      }
      if (mod === "changed") {
        changedComponents.push(comp);
        components2.push(comp);
      }
    } else {
      if (!world[$componentMap].has(c))
        registerComponent(world, c);
      components2.push(c);
    }
  });
  const mapComponents = (c) => world[$componentMap].get(c);
  const allComponents = components2.concat(notComponents).map(mapComponents);
  const sparseSet = SparseSet();
  const archetypes = [];
  const changed = [];
  const toRemove = SparseSet();
  const entered = SparseSet();
  const exited = SparseSet();
  const generations = allComponents.map((c) => c.generationId).reduce((a, v) => {
    if (a.includes(v))
      return a;
    a.push(v);
    return a;
  }, []);
  const reduceBitflags = (a, c) => {
    if (!a[c.generationId])
      a[c.generationId] = 0;
    a[c.generationId] |= c.bitflag;
    return a;
  };
  const masks = components2.map(mapComponents).reduce(reduceBitflags, {});
  const notMasks = notComponents.map(mapComponents).reduce(reduceBitflags, {});
  const hasMasks = allComponents.reduce(reduceBitflags, {});
  const flatProps = components2.filter((c) => !c[$tagStore]).map((c) => Object.getOwnPropertySymbols(c).includes($storeFlattened) ? c[$storeFlattened] : [c]).reduce((a, v) => a.concat(v), []);
  const shadows = [];
  const q = Object.assign(sparseSet, {
    archetypes,
    changed,
    components: components2,
    notComponents,
    changedComponents,
    allComponents,
    masks,
    notMasks,
    hasMasks,
    generations,
    flatProps,
    toRemove,
    entered,
    exited,
    shadows
  });
  world[$queryMap].set(query, q);
  world[$queries].add(q);
  allComponents.forEach((c) => {
    c.queries.add(q);
  });
  if (notComponents.length)
    world[$notQueries].add(q);
  for (let eid = 0; eid < getEntityCursor(); eid++) {
    if (!world[$entitySparseSet].has(eid))
      continue;
    const match = queryCheckEntity(world, q, eid);
    if (match)
      queryAddEntity(q, eid);
  }
};
var generateShadow = (q, pid) => {
  const $ = Symbol();
  const prop = q.flatProps[pid];
  createShadow(prop, $);
  q.shadows[pid] = prop[$];
  return prop[$];
};
var diff = (q, clearDiff) => {
  if (clearDiff)
    q.changed = [];
  const { flatProps, shadows } = q;
  for (let i = 0; i < q.dense.length; i++) {
    const eid = q.dense[i];
    let dirty = false;
    for (let pid = 0; pid < flatProps.length; pid++) {
      const prop = flatProps[pid];
      const shadow = shadows[pid] || generateShadow(q, pid);
      if (ArrayBuffer.isView(prop[eid])) {
        for (let i2 = 0; i2 < prop[eid].length; i2++) {
          if (prop[eid][i2] !== shadow[eid][i2]) {
            dirty = true;
            break;
          }
        }
        shadow[eid].set(prop[eid]);
      } else {
        if (prop[eid] !== shadow[eid]) {
          dirty = true;
          shadow[eid] = prop[eid];
        }
      }
    }
    if (dirty)
      q.changed.push(eid);
  }
  return q.changed;
};
var flatten = (a, v) => a.concat(v);
var aggregateComponentsFor = (mod) => (x) => x.filter((f) => f.name === mod().constructor.name).reduce(flatten);
var getAnyComponents = aggregateComponentsFor(Any);
var getAllComponents = aggregateComponentsFor(All);
var getNoneComponents = aggregateComponentsFor(None);
var defineQuery = (...args) => {
  let components2;
  let any, all, none;
  if (Array.isArray(args[0])) {
    components2 = args[0];
  } else {
  }
  if (components2 === void 0 || components2[$componentMap] !== void 0) {
    return (world) => world ? world[$entityArray] : components2[$entityArray];
  }
  const query = function(world, clearDiff = true) {
    if (!world[$queryMap].has(query))
      registerQuery(world, query);
    const q = world[$queryMap].get(query);
    commitRemovals(world);
    if (q.changedComponents.length)
      return diff(q, clearDiff);
    return q.dense;
  };
  query[$queryComponents] = components2;
  query[$queryAny] = any;
  query[$queryAll] = all;
  query[$queryNone] = none;
  return query;
};
var queryCheckEntity = (world, q, eid) => {
  const { masks, notMasks, generations } = q;
  let or = 0;
  for (let i = 0; i < generations.length; i++) {
    const generationId = generations[i];
    const qMask = masks[generationId];
    const qNotMask = notMasks[generationId];
    const eMask = world[$entityMasks][generationId][eid];
    if (qNotMask && (eMask & qNotMask) !== 0) {
      return false;
    }
    if (qMask && (eMask & qMask) !== qMask) {
      return false;
    }
  }
  return true;
};
var queryAddEntity = (q, eid) => {
  q.toRemove.remove(eid);
  q.entered.add(eid);
  q.add(eid);
};
var queryCommitRemovals = (q) => {
  for (let i = q.toRemove.dense.length - 1; i >= 0; i--) {
    const eid = q.toRemove.dense[i];
    q.toRemove.remove(eid);
    q.remove(eid);
  }
};
var commitRemovals = (world) => {
  if (!world[$dirtyQueries].size)
    return;
  world[$dirtyQueries].forEach(queryCommitRemovals);
  world[$dirtyQueries].clear();
};
var queryRemoveEntity = (world, q, eid) => {
  if (!q.has(eid) || q.toRemove.has(eid))
    return;
  q.toRemove.add(eid);
  world[$dirtyQueries].add(q);
  q.exited.add(eid);
};
var resetChangedQuery = (world, query) => {
  const q = world[$queryMap].get(query);
  q.changed = [];
};
var removeQuery = (world, query) => {
  const q = world[$queryMap].get(query);
  world[$queries].delete(q);
  world[$queryMap].delete(query);
};

// src/Component.js
var $componentMap = Symbol("componentMap");
var components = [];
var defineComponent = (schema, size) => {
  const component = createStore(schema, size || getGlobalSize());
  if (schema && Object.keys(schema).length)
    components.push(component);
  return component;
};
var incrementBitflag = (world) => {
  world[$bitflag] *= 2;
  if (world[$bitflag] >= 2 ** 31) {
    world[$bitflag] = 1;
    world[$entityMasks].push(new Uint32Array(world[$size]));
  }
};
var registerComponent = (world, component) => {
  if (!component)
    throw new Error(`bitECS - Cannot register null or undefined component`);
  const queries = /* @__PURE__ */ new Set();
  const notQueries = /* @__PURE__ */ new Set();
  const changedQueries = /* @__PURE__ */ new Set();
  world[$queries].forEach((q) => {
    if (q.allComponents.includes(component)) {
      queries.add(q);
    }
  });
  world[$componentMap].set(component, {
    generationId: world[$entityMasks].length - 1,
    bitflag: world[$bitflag],
    store: component,
    queries,
    notQueries,
    changedQueries
  });
  incrementBitflag(world);
};
var registerComponents = (world, components2) => {
  components2.forEach((c) => registerComponent(world, c));
};
var hasComponent = (world, component, eid) => {
  const registeredComponent = world[$componentMap].get(component);
  if (!registeredComponent)
    return false;
  const { generationId, bitflag } = registeredComponent;
  const mask = world[$entityMasks][generationId][eid];
  return (mask & bitflag) === bitflag;
};
var addComponent = (world, component, eid, reset = false) => {
  if (eid === void 0)
    throw new Error("bitECS - entity is undefined.");
  if (!world[$entitySparseSet].has(eid))
    throw new Error("bitECS - entity does not exist in the world.");
  if (!world[$componentMap].has(component))
    registerComponent(world, component);
  if (hasComponent(world, component, eid))
    return;
  const c = world[$componentMap].get(component);
  const { generationId, bitflag, queries, notQueries } = c;
  world[$entityMasks][generationId][eid] |= bitflag;
  queries.forEach((q) => {
    q.toRemove.remove(eid);
    const match = queryCheckEntity(world, q, eid);
    if (match) {
      q.exited.remove(eid);
      queryAddEntity(q, eid);
    }
    if (!match) {
      q.entered.remove(eid);
      queryRemoveEntity(world, q, eid);
    }
  });
  world[$entityComponents].get(eid).add(component);
  if (reset)
    resetStoreFor(component, eid);
};
var removeComponent = (world, component, eid, reset = true) => {
  if (eid === void 0)
    throw new Error("bitECS - entity is undefined.");
  if (!world[$entitySparseSet].has(eid))
    throw new Error("bitECS - entity does not exist in the world.");
  if (!hasComponent(world, component, eid))
    return;
  const c = world[$componentMap].get(component);
  const { generationId, bitflag, queries } = c;
  world[$entityMasks][generationId][eid] &= ~bitflag;
  queries.forEach((q) => {
    q.toRemove.remove(eid);
    const match = queryCheckEntity(world, q, eid);
    if (match) {
      q.exited.remove(eid);
      queryAddEntity(q, eid);
    }
    if (!match) {
      q.entered.remove(eid);
      queryRemoveEntity(world, q, eid);
    }
  });
  world[$entityComponents].get(eid).delete(component);
  if (reset)
    resetStoreFor(component, eid);
};

// src/World.js
var $size = Symbol("size");
var $resizeThreshold = Symbol("resizeThreshold");
var $bitflag = Symbol("bitflag");
var $archetypes = Symbol("archetypes");
var $localEntities = Symbol("localEntities");
var $localEntityLookup = Symbol("localEntityLookup");
var $manualEntityRecycling = Symbol("manualEntityRecycling");
var worlds = [];
var resizeWorlds = (size) => {
  worlds.forEach((world) => {
    world[$size] = size;
    for (let i = 0; i < world[$entityMasks].length; i++) {
      const masks = world[$entityMasks][i];
      world[$entityMasks][i] = resize(masks, size);
    }
    world[$resizeThreshold] = world[$size] - world[$size] / 5;
  });
};
var createWorld = (...args) => {
  const world = typeof args[0] === "object" ? args[0] : {};
  const size = typeof args[0] === "number" ? args[0] : typeof args[1] === "number" ? args[1] : getGlobalSize();
  resetWorld(world, size);
  worlds.push(world);
  return world;
};
var enableManualEntityRecycling = (world) => {
  world[$manualEntityRecycling] = true;
};
var resetWorld = (world, size = getGlobalSize()) => {
  world[$size] = size;
  if (world[$entityArray])
    world[$entityArray].forEach((eid) => removeEntity(world, eid));
  world[$entityMasks] = [new Uint32Array(size)];
  world[$entityComponents] = /* @__PURE__ */ new Map();
  world[$archetypes] = [];
  world[$entitySparseSet] = SparseSet();
  world[$entityArray] = world[$entitySparseSet].dense;
  world[$bitflag] = 1;
  world[$componentMap] = /* @__PURE__ */ new Map();
  world[$queryMap] = /* @__PURE__ */ new Map();
  world[$queries] = /* @__PURE__ */ new Set();
  world[$notQueries] = /* @__PURE__ */ new Set();
  world[$dirtyQueries] = /* @__PURE__ */ new Set();
  world[$localEntities] = /* @__PURE__ */ new Map();
  world[$localEntityLookup] = /* @__PURE__ */ new Map();
  world[$manualEntityRecycling] = false;
  return world;
};
var deleteWorld = (world) => {
  Object.getOwnPropertySymbols(world).forEach(($) => {
    delete world[$];
  });
  Object.keys(world).forEach((key) => {
    delete world[key];
  });
  worlds.splice(worlds.indexOf(world), 1);
};
var getWorldComponents = (world) => Array.from(world[$componentMap].keys());
var getAllEntities = (world) => world[$entitySparseSet].dense.slice(0);

// src/System.js
var defineSystem = (update) => (world, ...args) => {
  update(world, ...args);
  return world;
};

// src/index.js
var pipe = (...fns) => (input) => {
  let tmp = input;
  for (let i = 0; i < fns.length; i++) {
    const fn = fns[i];
    tmp = fn(tmp);
  }
  return tmp;
};
var Types = TYPES_ENUM;

//# sourceMappingURL=index.mjs.map


/***/ })

};
;

// load runtime
import __webpack_require__ from "./lib.echo-d.js";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
import * as __webpack_chunk_0__ from "./bitecs.echo-d.js";
__webpack_require__.C(__webpack_chunk_0__);
var __webpack_exports__ = __webpack_exec__("./lib/extra/storage/bitecs.js");
__webpack_exports__ = await __webpack_exports__;
var __webpack_exports__BitECSStorage = __webpack_exports__.BitECSStorage;
var __webpack_exports__defaultGetGroupedValue = __webpack_exports__.defaultGetGroupedValue;
var __webpack_exports__defaultSetGroupedValue = __webpack_exports__.defaultSetGroupedValue;
export { __webpack_exports__BitECSStorage as BitECSStorage, __webpack_exports__defaultGetGroupedValue as defaultGetGroupedValue, __webpack_exports__defaultSetGroupedValue as defaultSetGroupedValue };

//# sourceMappingURL=bitecs.echo-d.js.map