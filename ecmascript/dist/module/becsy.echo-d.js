export const id = "becsy";
export const ids = ["becsy"];
export const modules = {

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
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../storage.js */ "./lib/storage.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils.js */ "./lib/utils.js");


const { 
// System,
// Type,
World } = await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @lastolivegames/becsy */ "./node_modules/@lastolivegames/becsy/index.js"));
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
        const { 
        // types,
        // indexes,
        worldOptions } = options;
        this.world = storage?.world || World.create(worldOptions);
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
        const entity = list.get(id);
        if (!entity) {
            list.set(id, entity);
            this.world.add(entity);
            return true;
        }
        return false;
    }
    storeInput(id, input, tick = Date.now()) {
        return super.storeInput(id, input, tick);
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./node_modules/@lastolivegames/becsy/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@lastolivegames/becsy/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanceledError: () => (/* binding */ CanceledError),
/* harmony export */   Query: () => (/* binding */ Query),
/* harmony export */   System: () => (/* binding */ System),
/* harmony export */   Type: () => (/* binding */ Type),
/* harmony export */   World: () => (/* binding */ World),
/* harmony export */   co: () => (/* binding */ co),
/* harmony export */   component: () => (/* binding */ component),
/* harmony export */   field: () => (/* binding */ field),
/* harmony export */   system: () => (/* binding */ system)
/* harmony export */ });
const ENTITY_ID_BITS = 22;
const COMPONENT_ID_BITS = 9;
const FIELD_SEQ_BITS = 7;
const MAX_NUM_ENTITIES = 2 ** ENTITY_ID_BITS;
const ENTITY_ID_MASK = MAX_NUM_ENTITIES - 1;
const MAX_NUM_COMPONENTS = 2 ** COMPONENT_ID_BITS;
const COMPONENT_ID_MASK = MAX_NUM_COMPONENTS - 1;
const MAX_NUM_FIELDS = 2 ** FIELD_SEQ_BITS;
const FIELD_SEQ_MASK = MAX_NUM_FIELDS - 1;
// TODO: enforce max length of ref structs/arrays

class InternalError extends Error {
    constructor(message) {
        super(`Internal error: ${message}. Please report a bug!`);
    }
}
class CheckError extends Error {
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();
function throwNotWritable(binding) {
    throw new CheckError(`Component is not writable; ` +
        `use entity.write(${binding.type.name}) to acquire a writable version`);
}
function checkInvalid(component, binding) {
    if (component.__invalid) {
        throw new CheckError(`Component instance for ${binding.type.name} is no longer valid, as you already bound it ` +
            `to another entity`);
    }
}
class Type {
    defaultValue;
    shared;
    constructor(defaultValue, shared = true) {
        this.defaultValue = defaultValue;
        this.shared = shared;
    }
    get internallyIndexed() { return false; }
    /* eslint-disable lines-between-class-members */
    static boolean;
    static uint8;
    static int8;
    static uint16;
    static int16;
    static uint32;
    static int32;
    static float32;
    static float64;
    static vector;
    static staticString;
    static dynamicString;
    static object;
    static weakObject;
    // TODO: add autoremove/autodelete when nulled out
    static ref;
    static backrefs;
}
class BooleanType extends Type {
    constructor() { super(false); }
    defineElastic(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        let data;
        field.updateBuffer = () => {
            binding.dispatcher.buffers.register(bufferKey, binding.capacity, Uint8Array, (newData) => { data = newData; });
        };
        field.updateBuffer();
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return Boolean(data[binding.writableIndex]);
            },
            set(value) {
                checkInvalid(this, binding);
                data[binding.writableIndex] = value ? 1 : 0;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return Boolean(data[binding.readonlyIndex]);
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        const data = binding.dispatcher.buffers.register(bufferKey, binding.capacity, Uint8Array);
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return Boolean(data[binding.writableIndex]);
            },
            set(value) {
                checkInvalid(this, binding);
                data[binding.writableIndex] = value ? 1 : 0;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return Boolean(data[binding.readonlyIndex]);
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
class NumberType extends Type {
    NumberArray;
    constructor(NumberArray) {
        super(0);
        this.NumberArray = NumberArray;
    }
    defineElastic(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        let data;
        field.updateBuffer = () => {
            binding.dispatcher.buffers.register(bufferKey, binding.capacity, this.NumberArray, (newData) => { data = newData; });
        };
        field.updateBuffer();
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.writableIndex];
            },
            set(value) {
                checkInvalid(this, binding);
                data[binding.writableIndex] = value;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.readonlyIndex];
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        const data = binding.dispatcher.buffers.register(bufferKey, binding.capacity, this.NumberArray);
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.writableIndex];
            },
            set(value) {
                checkInvalid(this, binding);
                data[binding.writableIndex] = value;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.readonlyIndex];
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
class VectorType extends Type {
    type;
    Class;
    stride;
    elementNames;
    constructor(type, elements, Class) {
        super(new Array(typeof elements === 'number' ? elements : elements.length).fill(0));
        this.type = type;
        this.Class = Class;
        if (typeof elements === 'number') {
            this.stride = elements;
        }
        else {
            this.stride = elements.length;
            this.elementNames = elements;
        }
    }
    get internallyIndexed() { return true; }
    defineElastic(binding, field) {
        const stride = this.stride;
        const elementNames = this.elementNames;
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        let data;
        field.updateBuffer = () => {
            binding.dispatcher.buffers.register(bufferKey, binding.capacity * stride, this.type.NumberArray, (newData) => { data = newData; });
        };
        field.updateBuffer();
        const masterWritableAccessor = this.Class ? new this.Class() : {};
        const masterReadonlyAccessor = this.Class ? new this.Class() : {};
        Object.defineProperty(masterWritableAccessor, 'length', { value: stride });
        Object.defineProperty(masterReadonlyAccessor, 'length', { value: stride });
        {
            Object.defineProperty(masterWritableAccessor, '__becsyComponent', { value: undefined, writable: true });
            Object.defineProperty(masterReadonlyAccessor, '__becsyComponent', { value: undefined, writable: true });
        }
        let writableAccessor = Object.create(masterWritableAccessor);
        Object.seal(writableAccessor);
        let readonlyAccessor = Object.create(masterReadonlyAccessor);
        Object.seal(readonlyAccessor);
        /* eslint-disable no-loop-func */
        for (let i = 0; i < this.stride; i++) {
            Object.defineProperty(masterWritableAccessor, `${i}`, {
                enumerable: true,
                get() {
                    checkInvalid(this.__becsyComponent, binding);
                    return data[binding.writableIndex * stride + i];
                },
                set(value) {
                    checkInvalid(this.__becsyComponent, binding);
                    data[binding.writableIndex * stride + i] = value;
                }
            });
            Object.defineProperty(masterReadonlyAccessor, `${i}`, {
                enumerable: true,
                get() {
                    checkInvalid(this.__becsyComponent, binding);
                    return data[binding.readonlyIndex * stride + i];
                },
                set(value) {
                    throwNotWritable(binding);
                }
            });
            if (this.elementNames?.[i]) {
                Object.defineProperty(masterWritableAccessor, this.elementNames[i], {
                    enumerable: true,
                    get() {
                        checkInvalid(this.__becsyComponent, binding);
                        return data[binding.writableIndex * stride + i];
                    },
                    set(value) {
                        checkInvalid(this.__becsyComponent, binding);
                        data[binding.writableIndex * stride + i] = value;
                    }
                });
                Object.defineProperty(masterReadonlyAccessor, this.elementNames[i], {
                    enumerable: true,
                    get() {
                        checkInvalid(this.__becsyComponent, binding);
                        return data[binding.readonlyIndex * stride + i];
                    },
                    set(value) {
                        throwNotWritable(binding);
                    }
                });
            }
        }
        /* eslint-enable no-loop-func */
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                {
                    checkInvalid(this, binding);
                    writableAccessor = Object.create(masterWritableAccessor);
                    writableAccessor.__becsyComponent = this;
                    Object.seal(writableAccessor);
                }
                return writableAccessor;
            },
            set(value) {
                checkInvalid(this, binding);
                if (value.length) {
                    if (value.length !== stride) {
                        throw new CheckError(`Value of length ${value.length} doesn't match vector of length ${stride}`);
                    }
                    for (let i = 0; i < stride; i++)
                        data[binding.writableIndex * stride + i] = value[i];
                }
                else {
                    if (!elementNames) {
                        throw new CheckError(`Value assigned to ${binding.type.name}.${field.name} must be an array`);
                    }
                    for (let i = 0; i < stride; i++) {
                        if (typeof value[elementNames[i]] !== 'number') {
                            throw new CheckError(`Value assigned to ${binding.type.name}.${field.name} is missing element ` +
                                `"${elementNames[i]}`);
                        }
                        data[binding.writableIndex * stride + i] = value[elementNames[i]];
                    }
                }
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                {
                    checkInvalid(this, binding);
                    readonlyAccessor = Object.create(masterReadonlyAccessor);
                    readonlyAccessor.__becsyComponent = this;
                    Object.seal(readonlyAccessor);
                }
                return readonlyAccessor;
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const stride = this.stride;
        const elementNames = this.elementNames;
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        const data = binding.dispatcher.buffers.register(bufferKey, binding.capacity * stride, this.type.NumberArray);
        const masterWritableAccessor = this.Class ? new this.Class() : {};
        const masterReadonlyAccessor = this.Class ? new this.Class() : {};
        Object.defineProperty(masterWritableAccessor, 'length', { value: stride });
        Object.defineProperty(masterReadonlyAccessor, 'length', { value: stride });
        {
            Object.defineProperty(masterWritableAccessor, '__becsyComponent', { value: undefined, writable: true });
            Object.defineProperty(masterReadonlyAccessor, '__becsyComponent', { value: undefined, writable: true });
        }
        let writableAccessor = Object.create(masterWritableAccessor);
        Object.seal(writableAccessor);
        let readonlyAccessor = Object.create(masterReadonlyAccessor);
        Object.seal(readonlyAccessor);
        for (let i = 0; i < this.stride; i++) {
            Object.defineProperty(masterWritableAccessor, `${i}`, {
                enumerable: true,
                get() {
                    checkInvalid(this.__becsyComponent, binding);
                    return data[binding.writableIndex * stride + i];
                },
                set(value) {
                    checkInvalid(this.__becsyComponent, binding);
                    data[binding.writableIndex * stride + i] = value;
                }
            });
            Object.defineProperty(masterReadonlyAccessor, `${i}`, {
                enumerable: true,
                get() {
                    checkInvalid(this.__becsyComponent, binding);
                    return data[binding.readonlyIndex * stride + i];
                },
                set(value) {
                    throwNotWritable(binding);
                }
            });
            if (this.elementNames?.[i]) {
                Object.defineProperty(masterWritableAccessor, this.elementNames[i], {
                    enumerable: true,
                    get() {
                        checkInvalid(this.__becsyComponent, binding);
                        return data[binding.writableIndex * stride + i];
                    },
                    set(value) {
                        checkInvalid(this.__becsyComponent, binding);
                        data[binding.writableIndex * stride + i] = value;
                    }
                });
                Object.defineProperty(masterReadonlyAccessor, this.elementNames[i], {
                    enumerable: true,
                    get() {
                        checkInvalid(this.__becsyComponent, binding);
                        return data[binding.readonlyIndex * stride + i];
                    },
                    set(value) {
                        throwNotWritable(binding);
                    }
                });
            }
        }
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                {
                    checkInvalid(this, binding);
                    writableAccessor = Object.create(masterWritableAccessor);
                    writableAccessor.__becsyComponent = this;
                    Object.seal(writableAccessor);
                }
                return writableAccessor;
            },
            set(value) {
                checkInvalid(this, binding);
                if (value.length) {
                    if (value.length !== stride) {
                        throw new CheckError(`Value of length ${value.length} doesn't match vector of length ${stride}`);
                    }
                    for (let i = 0; i < stride; i++)
                        data[binding.writableIndex * stride + i] = value[i];
                }
                else {
                    if (!elementNames) {
                        throw new CheckError(`Value assigned to ${binding.type.name}.${field.name} must be an array`);
                    }
                    for (let i = 0; i < stride; i++) {
                        if (typeof value[elementNames[i]] !== 'number') {
                            throw new CheckError(`Value assigned to ${binding.type.name}.${field.name} is missing element ` +
                                `"${elementNames[i]}`);
                        }
                        data[binding.writableIndex * stride + i] = value[elementNames[i]];
                    }
                }
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                {
                    checkInvalid(this, binding);
                    readonlyAccessor = Object.create(masterReadonlyAccessor);
                    readonlyAccessor.__becsyComponent = this;
                    Object.seal(readonlyAccessor);
                }
                return readonlyAccessor;
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
class StaticStringType extends Type {
    choices;
    choicesIndex = new Map();
    TypedArray;
    constructor(choices) {
        super(choices[0]);
        this.choices = choices;
        {
            if (!choices?.length)
                throw new CheckError('No choices specified for Type.staticString');
        }
        if (choices.length < 1 << 8)
            this.TypedArray = Uint8Array;
        else if (choices.length < 1 << 16)
            this.TypedArray = Uint16Array;
        else
            this.TypedArray = Uint32Array;
        for (let i = 0; i < choices.length; i++)
            this.choicesIndex.set(choices[i], i);
    }
    defineElastic(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        let data;
        const choices = this.choices, choicesIndex = this.choicesIndex;
        field.updateBuffer = () => {
            binding.dispatcher.buffers.register(bufferKey, binding.capacity, this.TypedArray, (newData) => { data = newData; });
        };
        field.updateBuffer();
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const index = data[binding.writableIndex];
                const result = choices[index];
                {
                    if (result === undefined)
                        throw new CheckError(`Invalid static string index: ${index}`);
                }
                return result;
            },
            set(value) {
                checkInvalid(this, binding);
                const index = choicesIndex.get(value);
                {
                    if (index === undefined)
                        throw new CheckError(`Static string not in set: "${value}"`);
                }
                data[binding.writableIndex] = index;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const index = data[binding.readonlyIndex];
                const result = choices[index];
                {
                    if (result === undefined)
                        throw new CheckError(`Invalid static string index: ${index}`);
                }
                return result;
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        const choices = this.choices, choicesIndex = this.choicesIndex;
        const data = binding.dispatcher.buffers.register(bufferKey, binding.capacity, this.TypedArray);
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const index = data[binding.writableIndex];
                const result = choices[index];
                {
                    if (result === undefined)
                        throw new CheckError(`Invalid static string index: ${index}`);
                }
                return result;
            },
            set(value) {
                checkInvalid(this, binding);
                const index = choicesIndex.get(value);
                {
                    if (index === undefined)
                        throw new CheckError(`Static string not in set: "${value}"`);
                }
                data[binding.writableIndex] = index;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const index = data[binding.readonlyIndex];
                const result = choices[index];
                {
                    if (result === undefined)
                        throw new CheckError(`Invalid static string index: ${index}`);
                }
                return result;
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
class DynamicStringType extends Type {
    maxUtf8Length;
    lengthsStride;
    bytesStride;
    constructor(maxUtf8Length) {
        super('');
        this.maxUtf8Length = maxUtf8Length + (maxUtf8Length % 2);
        this.bytesStride = this.maxUtf8Length + 2; // account for length field
        this.lengthsStride = this.bytesStride / 2;
    }
    defineElastic(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        let lengths;
        let bytes;
        const maxUtf8Length = this.maxUtf8Length;
        const lengthsStride = this.lengthsStride, bytesStride = this.bytesStride;
        field.updateBuffer = () => {
            const size = binding.capacity * (this.maxUtf8Length + Uint16Array.BYTES_PER_ELEMENT);
            binding.dispatcher.buffers.register(bufferKey, size, Uint8Array, (newData) => {
                bytes = newData;
                lengths = new Uint16Array(bytes.buffer);
            });
        };
        field.updateBuffer();
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const length = lengths[binding.writableIndex * lengthsStride];
                return decoder.decode(new Uint8Array(bytes.buffer, binding.writableIndex * bytesStride + 2, length));
            },
            set(value) {
                checkInvalid(this, binding);
                const encodedString = encoder.encode(value);
                {
                    if (encodedString.byteLength > maxUtf8Length) {
                        throw new CheckError(`Dynamic string length > ${maxUtf8Length} after encoding: ${value}`);
                    }
                }
                lengths[binding.writableIndex * lengthsStride] = encodedString.byteLength;
                bytes.set(encodedString, binding.writableIndex * bytesStride + 2);
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const length = lengths[binding.readonlyIndex * lengthsStride];
                return decoder.decode(new Uint8Array(bytes.buffer, binding.readonlyIndex * bytesStride + 2, length));
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        const maxUtf8Length = this.maxUtf8Length;
        const lengthsStride = this.lengthsStride, bytesStride = this.bytesStride;
        const size = binding.capacity * (this.maxUtf8Length + Uint16Array.BYTES_PER_ELEMENT);
        const bytes = binding.dispatcher.buffers.register(bufferKey, size, Uint8Array);
        const lengths = new Uint16Array(bytes.buffer);
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const length = lengths[binding.writableIndex * lengthsStride];
                return decoder.decode(new Uint8Array(bytes.buffer, binding.writableIndex * bytesStride + 2, length));
            },
            set(value) {
                checkInvalid(this, binding);
                const encodedString = encoder.encode(value);
                {
                    if (encodedString.byteLength > maxUtf8Length) {
                        throw new CheckError(`Dynamic string length > ${maxUtf8Length} after encoding: ${value}`);
                    }
                }
                lengths[binding.writableIndex * lengthsStride] = encodedString.byteLength;
                bytes.set(encodedString, binding.writableIndex * bytesStride + 2);
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const length = lengths[binding.readonlyIndex * lengthsStride];
                return decoder.decode(new Uint8Array(bytes.buffer, binding.readonlyIndex * bytesStride + 2, length));
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
const STALE_REF_BIT = 2 ** 31;
class RefType extends Type {
    constructor() {
        super(undefined);
    }
    defineElastic(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        let data;
        const indexer = binding.dispatcher.indexer;
        const registry = binding.dispatcher.registry;
        const pool = registry.pool;
        indexer.registerSelector();
        field.updateBuffer = () => {
            binding.dispatcher.buffers.register(bufferKey, binding.capacity, Int32Array, (newData) => { data = newData; }, -1);
        };
        field.updateBuffer();
        field.clearRef = (final, targetId, internalIndex) => {
            if (internalIndex)
                throw new InternalError('Ref fields have no internal index');
            if (data[binding.writableIndex] === -1)
                return;
            const stale = (data[binding.writableIndex] & STALE_REF_BIT) !== 0;
            if (stale && !final)
                return;
            if (!stale && final)
                throw new InternalError('Wrong ref stale state');
            const id = (data[binding.writableIndex] & ENTITY_ID_MASK);
            const targetIdGiven = targetId !== undefined;
            if (targetIdGiven && id !== targetId)
                return;
            if (final) {
                data[binding.writableIndex] = -1;
            }
            else {
                data[binding.writableIndex] |= STALE_REF_BIT;
            }
            indexer.trackRefChange(binding.writableEntityId, binding.type, field.seq, undefined, id, -1, !final, final);
        };
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const id = data[binding.writableIndex];
                if (id === -1 || (id & STALE_REF_BIT) && !registry.includeRecentlyDeleted)
                    return;
                return pool.borrowTemporarily((id & ENTITY_ID_MASK));
            },
            set(value) {
                checkInvalid(this, binding);
                if (value && !registry.hasShape(value.__id, registry.Alive, false)) {
                    throw new CheckError('Referencing a deleted entity is not allowed');
                }
                let oldId = data[binding.writableIndex];
                if (oldId !== -1)
                    oldId = (oldId & ENTITY_ID_MASK);
                const stale = oldId !== -1 && !!(data[binding.writableIndex] & STALE_REF_BIT);
                const newId = (value?.__id ?? -1);
                if (oldId === newId && !stale)
                    return;
                data[binding.writableIndex] = newId;
                indexer.trackRefChange(binding.writableEntityId, binding.type, field.seq, undefined, oldId, newId, !stale, true);
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const id = data[binding.readonlyIndex];
                if (id === -1 || (id & STALE_REF_BIT) && !registry.includeRecentlyDeleted)
                    return;
                return pool.borrowTemporarily((id & ENTITY_ID_MASK));
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const bufferKey = `component.${binding.type.id}.field.${field.seq}`;
        const data = binding.dispatcher.buffers.register(bufferKey, binding.capacity, Int32Array, undefined, -1);
        const indexer = binding.dispatcher.indexer;
        const registry = binding.dispatcher.registry;
        const pool = registry.pool;
        indexer.registerSelector();
        field.clearRef = (final, targetId, internalIndex) => {
            if (internalIndex)
                throw new InternalError('Ref fields have no internal index');
            if (data[binding.writableIndex] === -1)
                return;
            const stale = (data[binding.writableIndex] & STALE_REF_BIT) !== 0;
            if (stale && !final)
                return;
            if (!stale && final)
                throw new InternalError('Wrong ref stale state');
            const id = (data[binding.writableIndex] & ENTITY_ID_MASK);
            const targetIdGiven = targetId !== undefined;
            if (targetIdGiven && id !== targetId)
                return;
            if (final) {
                data[binding.writableIndex] = -1;
            }
            else {
                data[binding.writableIndex] |= STALE_REF_BIT;
            }
            indexer.trackRefChange(binding.writableEntityId, binding.type, field.seq, undefined, id, -1, !final, final);
        };
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const id = data[binding.writableIndex];
                if (id === -1 || (id & STALE_REF_BIT) && !registry.includeRecentlyDeleted)
                    return;
                return pool.borrowTemporarily((id & ENTITY_ID_MASK));
            },
            set(value) {
                checkInvalid(this, binding);
                if (value && !registry.hasShape(value.__id, registry.Alive, false)) {
                    throw new CheckError('Referencing a deleted entity is not allowed');
                }
                let oldId = data[binding.writableIndex];
                if (oldId !== -1)
                    oldId = (oldId & ENTITY_ID_MASK);
                const stale = oldId !== -1 && !!(data[binding.writableIndex] & STALE_REF_BIT);
                const newId = (value?.__id ?? -1);
                if (oldId === newId && !stale)
                    return;
                data[binding.writableIndex] = newId;
                indexer.trackRefChange(binding.writableEntityId, binding.type, field.seq, undefined, oldId, newId, !stale, true);
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const id = data[binding.readonlyIndex];
                if (id === -1 || (id & STALE_REF_BIT) && !registry.includeRecentlyDeleted)
                    return;
                return pool.borrowTemporarily((id & ENTITY_ID_MASK));
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
const EMPTY_ARRAY = [];
class BackrefsType extends Type {
    type;
    fieldName;
    trackDeletedBackrefs;
    constructor(type, fieldName, trackDeletedBackrefs) {
        super(EMPTY_ARRAY);
        this.type = type;
        this.fieldName = fieldName;
        this.trackDeletedBackrefs = trackDeletedBackrefs;
    }
    // TODO: build benchmarks for backrefs and see if storing pointers to the trackers' entities
    // arrays for direct access performs significantly better than looking them up in the indexer's
    // Map each time.
    defineElastic(binding, field) {
        field.updateBuffer = () => { };
        const refField = this.fieldName ?
            this.type?.__binding.fields.find(aField => aField.name === this.fieldName) : undefined;
        {
            if (this.fieldName && !refField) {
                throw new CheckError(`Backrefs field ${binding.type.name}.${field.name} refers to ` +
                    `an unknown field ${this.type.name}.${this.fieldName}`);
            }
            if (refField && refField.type !== Type.ref) {
                throw new CheckError(`Backrefs field ${binding.type.name}.${field.name} refers to ` +
                    `a field ${this.type.name}.${this.fieldName} that is not a ref`);
            }
            if (this.fieldName && !this.type) {
                throw new CheckError(`Backrefs selector has field but no component in ${binding.type.name}.${field.name}`);
            }
            if (this.type && !this.fieldName && !this.type.__binding.refFields.length) {
                throw new CheckError(`Backrefs field ${binding.type.name}.${field.name} refers to ` +
                    `component ${this.type.name} that has no ref fields`);
            }
        }
        const trackDeletedBackrefs = this.trackDeletedBackrefs;
        const indexer = binding.dispatcher.indexer;
        indexer.registerSelector(); // make sure global selector always registered first
        const selectorId = indexer.registerSelector(binding.type, this.type, refField?.seq, this.trackDeletedBackrefs);
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                if (!trackDeletedBackrefs && binding.dispatcher.registry.includeRecentlyDeleted) {
                    throw new CheckError(`Backrefs field ${binding.type.name}.${field.name} not configured to track recently ` +
                        `deleted refs`);
                }
                return indexer.getBackrefs(binding.writableEntityId, selectorId);
            },
            set(value) {
                checkInvalid(this, binding);
                if (value !== EMPTY_ARRAY) {
                    throw new CheckError('Backrefs properties are computed automatically, you cannot set them');
                }
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                if (!trackDeletedBackrefs && binding.dispatcher.registry.includeRecentlyDeleted) {
                    throw new CheckError(`Backrefs field ${binding.type.name}.${field.name} not configured to track recently ` +
                        `deleted refs`);
                }
                return indexer.getBackrefs(binding.readonlyEntityId, selectorId);
            },
            set(value) {
                checkInvalid(this, binding);
                if (value !== EMPTY_ARRAY) {
                    throw new CheckError('Backrefs properties are computed automatically, you cannot set them');
                }
            }
        });
    }
    defineFixed(binding, field) {
        this.defineElastic(binding, field);
    }
}
class ObjectType extends Type {
    constructor() { super(undefined, false); }
    defineElastic(binding, field) {
        const data = [];
        field.updateBuffer = () => { };
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.writableIndex];
            },
            set(value) {
                checkInvalid(this, binding);
                data[binding.writableIndex] = value;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.readonlyIndex];
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        const data = new Array(binding.capacity);
        field.updateBuffer = () => { };
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.writableIndex];
            },
            set(value) {
                checkInvalid(this, binding);
                data[binding.writableIndex] = value;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                return data[binding.readonlyIndex];
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
}
class WeakObjectType extends Type {
    finalizers;
    constructor() { super(undefined, false); }
    defineElastic(binding, field) {
        const data = [];
        field.updateBuffer = () => { };
        const finalizers = this.initFinalizers(binding);
        Object.defineProperty(binding.writableMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const value = data[binding.writableIndex];
                if (value === null || value === undefined)
                    return value;
                return value.deref();
            },
            set(value) {
                checkInvalid(this, binding);
                if (value !== null && value !== undefined) {
                    const weakRef = new WeakRef(value);
                    finalizers?.register(value, {
                        type: binding.type, data, weakRef, id: binding.writableEntityId,
                        index: binding.writableIndex
                    });
                    value = weakRef;
                }
                data[binding.writableIndex] = value;
            }
        });
        Object.defineProperty(binding.readonlyMaster, field.name, {
            enumerable: true, configurable: true,
            get() {
                checkInvalid(this, binding);
                const value = data[binding.readonlyIndex];
                if (value === null || value === undefined)
                    return value;
                return value.deref();
            },
            set(value) {
                throwNotWritable(binding);
            }
        });
    }
    defineFixed(binding, field) {
        this.defineElastic(binding, field);
    }
    initFinalizers(binding) {
        if (!binding.trackedWrites)
            return;
        if (this.finalizers)
            return this.finalizers;
        const dispatcher = binding.dispatcher;
        if (!dispatcher.writeLog || typeof FinalizationRegistry === 'undefined')
            return;
        this.finalizers = new FinalizationRegistry(({ type, data, weakRef, id, index }) => {
            if (data[index] === weakRef)
                dispatcher.registry.trackWrite(id, type);
        });
        return this.finalizers;
    }
}
// The fields below are replicated in the @field decorator, keep them in sync.
Type.boolean = new BooleanType();
Type.uint8 = new NumberType(Uint8Array);
Type.int8 = new NumberType(Int8Array);
Type.uint16 = new NumberType(Uint16Array);
Type.int16 = new NumberType(Int16Array);
Type.uint32 = new NumberType(Uint32Array);
Type.int32 = new NumberType(Int32Array);
Type.float32 = new NumberType(Float32Array);
Type.float64 = new NumberType(Float64Array);
Type.vector = (type, elements, Class) => new VectorType(type, elements, Class);
Type.staticString = (choices) => new StaticStringType(choices);
Type.dynamicString = (maxUtf8Length) => new DynamicStringType(maxUtf8Length);
Type.ref = new RefType();
Type.backrefs = (type, fieldName, trackDeletedBackrefs = false) => new BackrefsType(type, fieldName, trackDeletedBackrefs);
Type.object = new ObjectType();
Type.weakObject = new WeakObjectType();

class Binding {
    type;
    fields;
    dispatcher;
    capacity;
    storage;
    elastic;
    constructor(type, fields, shapeSpec, dispatcher, capacity, storage, elastic) {
        this.type = type;
        this.fields = fields;
        this.dispatcher = dispatcher;
        this.capacity = capacity;
        this.storage = storage;
        this.elastic = elastic;
        this.readonlyMaster = this.readonlyInstance = new type(); // eslint-disable-line new-cap
        this.writableMaster = this.writableInstance = new type(); // eslint-disable-line new-cap
        {
            this.readonlyInstance = Object.create(this.readonlyMaster);
            this.readonlyInstance.__invalid = !this.elastic && this.capacity > 1;
            this.writableInstance = Object.create(this.writableMaster);
            this.writableInstance.__invalid = !this.elastic && this.capacity > 1;
        }
        this.shapeOffset = shapeSpec.offset;
        this.shapeMask = shapeSpec.mask;
        this.shapeValue = shapeSpec.value;
        this.refFields = fields.filter(field => field.type === Type.ref);
        this.trackedWrites = false;
        this.writableEntityId = 0;
        this.writableIndex = 0;
        this.readonlyEntityId = 0;
        this.readonlyIndex = 0;
        // eslint-disable-next-line no-new-func
        this.initDefault = new Function('component', fields
            .filter(field => field.default !== EMPTY_ARRAY)
            .map(field => `component.${field.name} = ${JSON.stringify(field.default)};`)
            .join('\n'));
        let backrefFieldInits = [];
        {
            backrefFieldInits = fields
                .filter(field => field.default === EMPTY_ARRAY)
                .map(field => `
          if (${JSON.stringify(field.name)} in values) {
            component.${field.name} = values.${field.name};
          }
        `);
        }
        // eslint-disable-next-line no-new-func
        this.init = new Function('component', 'values', fields
            .filter(field => field.default !== EMPTY_ARRAY)
            .map(field => `
          component.${field.name} = values.${field.name} === undefined ?
            ${JSON.stringify(field.default)} : values.${field.name};
        `)
            .concat(backrefFieldInits)
            .join('\n'));
    }
    resetWritableInstance(entityId, index) {
        if (index === -1) {
            throw new InternalError(`Attempt to bind unacquired entity ${entityId} to ${this.type.name}`);
        }
        this.writableEntityId = entityId;
        this.writableIndex = index;
        if (this.elastic || this.capacity > 1) {
            this.writableInstance.__invalid = true;
            this.writableInstance = Object.create(this.writableMaster);
        }
        return this.writableInstance;
    }
    resetReadonlyInstance(entityId, index) {
        if (index === -1) {
            throw new InternalError(`Attempt to bind unacquired entity ${entityId} to ${this.type.name}`);
        }
        this.readonlyEntityId = entityId;
        this.readonlyIndex = index;
        if (this.elastic || this.capacity > 1) {
            this.readonlyInstance.__invalid = true;
            this.readonlyInstance = Object.create(this.readonlyMaster);
        }
        return this.readonlyInstance;
    }
}
function checkTypeDefined(type) {
    if (!type.__binding) {
        throw new CheckError(`Component ${type.name} not defined; add to world defs`);
    }
}
class PackedStorage {
    maxEntities;
    binding;
    fields;
    constructor(maxEntities, binding, fields) {
        this.maxEntities = maxEntities;
        this.binding = binding;
        this.fields = fields;
        this.growSpares();
        this.growCapacity();
    }
    acquireIndex(id) {
        let index = this.index[id];
        if (index === -1) {
            if (this.spares[3] > 0) {
                index = this.spares[--this.spares[3] + 4];
            }
            else {
                if (this.spares[1] === this.spares[2]) {
                    if (!this.binding.elastic) {
                        throw new CheckError(`Storage exhausted for component ${this.binding.type.name}; ` +
                            `raise its capacity above ${this.binding.capacity}`);
                    }
                    if (this.binding.capacity === this.maxEntities) {
                        throw new InternalError(`Trying to grow storage index for component ${this.binding.type.name} beyond ` +
                            `maxEntities`);
                    }
                    this.binding.capacity = Math.min(this.maxEntities, this.binding.capacity * 2);
                    this.growCapacity();
                }
                index = this.spares[1]++;
            }
            this.index[id] = index;
        }
        return index;
    }
    releaseIndex(id) {
        if (this.index[id] === -1) {
            throw new InternalError(`Index for entity ${id} in component ${this.binding.type.name} not allocated`);
        }
        if (this.spares[3] === this.spares.length - 4)
            this.growSpares();
        this.spares[this.spares[3]++ + 4] = this.index[id];
        this.index[id] = -1;
    }
    growCapacity() {
        const capacity = this.binding.capacity;
        this.binding.dispatcher.stats.forComponent(this.binding.type).capacity = capacity;
        const ArrayType = this.ArrayType;
        const elementSizeChanged = ArrayType.BYTES_PER_ELEMENT !== this.spares?.[0];
        if (!this.index || elementSizeChanged) {
            this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.index`, this.maxEntities, ArrayType, (index) => { this.index = index; }, -1);
        }
        if (elementSizeChanged) {
            this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.spares`, this.spares.length, ArrayType, this.updateSpares.bind(this));
        }
        else {
            this.spares[2] = capacity;
        }
        if (this.binding.elastic)
            for (const field of this.fields)
                field.updateBuffer();
    }
    growSpares() {
        const maxSpares = this.spares ? Math.min(this.maxEntities, (this.spares.length - 4) * 2) : 8;
        this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.spares`, 4 + maxSpares, this.ArrayType, this.updateSpares.bind(this));
    }
    updateSpares(spares) {
        spares[2] = this.binding.capacity = Math.max(this.binding.capacity, spares[2]);
        spares[0] = this.ArrayType.BYTES_PER_ELEMENT;
        this.spares = spares;
    }
    get ArrayType() {
        const capacity = Math.max(this.spares?.[2] ?? 0, this.binding.capacity);
        return capacity < (1 << 7) ? Int8Array : capacity < (1 << 15) ? Int16Array : Int32Array;
    }
}
class CompactStorage {
    maxEntities;
    binding;
    fields;
    constructor(maxEntities, binding, fields) {
        this.maxEntities = maxEntities;
        this.binding = binding;
        this.fields = fields;
        this.growCapacity();
    }
    findIndex(id) {
        for (let i = 0; i < this.index.length; i++) {
            if (this.index[i] === id)
                return i;
        }
        return -1;
    }
    acquireIndex(id) {
        let firstEmpty;
        for (let i = 0; i < this.index.length; i++) {
            if (this.index[i] === id)
                return i;
            if (firstEmpty === undefined && this.index[i] === -1)
                firstEmpty = i;
        }
        if (firstEmpty === undefined) {
            if (!this.binding.elastic) {
                throw new CheckError(`Storage exhausted for component ${this.binding.type.name}; ` +
                    `raise its capacity above ${this.binding.capacity}`);
            }
            if (this.binding.capacity === this.maxEntities) {
                throw new InternalError(`Trying to grow storage index for component ${this.binding.type.name} beyond ` +
                    `maxEntities`);
            }
            firstEmpty = this.index.length;
            this.binding.capacity = Math.min(this.maxEntities, this.binding.capacity * 2);
            this.growCapacity();
        }
        this.index[firstEmpty] = id;
        return firstEmpty;
    }
    releaseIndex(id) {
        for (let i = 0; i < this.index.length; i++) {
            if (this.index[i] === id) {
                this.index[i] = -1;
                return;
            }
        }
        throw new InternalError(`Index for entity ${id} in component ${this.binding.type.name} not allocated`);
    }
    growCapacity() {
        const capacity = this.binding.capacity;
        this.binding.dispatcher.stats.forComponent(this.binding.type).capacity = capacity;
        this.binding.dispatcher.buffers.register(`component.${this.binding.type.id}.storage.index`, capacity, Int32Array, this.updateIndex.bind(this), -1);
        if (this.binding.elastic)
            for (const field of this.fields)
                field.updateBuffer();
    }
    updateIndex(index) {
        this.index = index;
        this.binding.capacity = this.index.length;
    }
}
function initComponent(type, id, values) {
    {
        checkTypeDefined(type);
        if (values !== undefined) {
            for (const key in values) {
                if (!type.schema?.[key]) {
                    throw new CheckError(`Property ${key} not defined for component ${type.name}`);
                }
            }
        }
    }
    const component = type.__allocate(id);
    if (values) {
        type.__binding.init(component, values);
    }
    else {
        type.__binding.initDefault(component);
    }
}
function gatherFields(type) {
    const schema = type.schema;
    const fields = [];
    if (schema) {
        let seq = 0;
        for (const name in schema) {
            let entry = schema[name];
            if (entry instanceof Type || typeof entry === 'function')
                entry = { type: entry };
            if (typeof entry.type === 'function')
                entry.type = entry.type();
            if (!('default' in entry))
                entry.default = entry.type.defaultValue;
            fields.push({ name, seq: seq++, type: entry.type, default: entry.default });
        }
        if (seq > MAX_NUM_FIELDS) {
            throw new CheckError(`Component ${type.name} declares too many fields`);
        }
    }
    return fields;
}
function assimilateComponentType(typeId, type, shapeSpec, dispatcher) {
    const fields = gatherFields(type);
    // For tag components, force sparse storage since we don't actually need to allocate anything.
    const storage = fields.length ? (type.options?.storage ?? dispatcher.defaultComponentStorage) : 'sparse';
    const capacity = storage === 'sparse' ?
        dispatcher.maxEntities : Math.min(dispatcher.maxEntities, type.options?.capacity ?? 0);
    const initialCapacity = type.options?.initialCapacity ?? 8;
    {
        if (typeof type.options?.capacity !== 'undefined') {
            if (storage === 'sparse') {
                throw new CheckError(`Component type ${type.name} cannot combine custom capacity with sparse storage`);
            }
            if (type.options.capacity <= 0) {
                throw new CheckError(`Component type ${type.name} capacity option must be great than zero: got ${capacity}`);
            }
            if (typeof type.options.initialCapacity !== 'undefined') {
                throw new CheckError(`Component type ${type.name} cannot have both capacity and initialCapacity options`);
            }
        }
        if (type.options?.restrictedToMainThread && fields.every(field => field.type.shared)) {
            throw new CheckError(`Component type ${type.name} is restrictedToMainThread but has no thread-exclusive fields`);
        }
        if ((typeof process === 'undefined' || "development" !== 'test') && type.__bind) {
            throw new CheckError(`Component type ${type.name} is already in use in another world`);
        }
    }
    type.id = typeId;
    const binding = new Binding(type, fields, shapeSpec, dispatcher, capacity || initialCapacity, storage, !capacity);
    type.__binding = binding;
}
function defineAndAllocateComponentType(type) {
    const binding = type.__binding;
    for (const field of binding.fields) {
        if (binding.elastic) {
            field.type.defineElastic(binding, field);
        }
        else {
            field.type.defineFixed(binding, field);
        }
    }
    switch (binding.storage) {
        case 'sparse':
            // Inline the trivial storage manager for performance.
            binding.dispatcher.stats.forComponent(type).capacity = binding.capacity; // fixed
            type.__bind = (id, writable) => {
                return writable ?
                    binding.resetWritableInstance(id, id) :
                    binding.resetReadonlyInstance(id, id);
            };
            type.__allocate = (id) => {
                return binding.resetWritableInstance(id, id);
            };
            break;
        case 'packed': {
            const storageManager = new PackedStorage(binding.dispatcher.maxEntities, binding, binding.fields);
            type.__bind = (id, writable) => {
                return writable ?
                    binding.resetWritableInstance(id, storageManager.index[id]) :
                    binding.resetReadonlyInstance(id, storageManager.index[id]);
            };
            type.__allocate = (id) => {
                return binding.resetWritableInstance(id, storageManager.acquireIndex(id));
            };
            type.__free = (id) => {
                storageManager.releaseIndex(id);
            };
            break;
        }
        case 'compact': {
            const storageManager = new CompactStorage(binding.dispatcher.maxEntities, binding, binding.fields);
            type.__bind = (id, writable) => {
                return writable ?
                    binding.resetWritableInstance(id, storageManager.findIndex(id)) :
                    binding.resetReadonlyInstance(id, storageManager.findIndex(id));
            };
            type.__allocate = (id) => {
                return binding.resetWritableInstance(id, storageManager.acquireIndex(id));
            };
            type.__free = (id) => {
                storageManager.releaseIndex(id);
            };
            break;
        }
        default:
            throw new CheckError(`Invalid storage type "${binding.storage}`);
    }
}
function dissimilateComponentType(type) {
    delete type.id;
    delete type.__binding;
    delete type.__bind;
    delete type.__allocate;
    delete type.__free;
}
function declareSingleton(type) {
    if (!type.options)
        type.options = {};
    {
        if (type.options.storage && type.options.storage !== 'compact') {
            throw new CheckError(`Component ${type.name} ${type.options.storage} storage is incompatible with singletons`);
        }
        if (type.options.capacity && type.options.capacity !== 1) {
            throw new CheckError(`Component ${type.name} capacity of ${type.options.capacity} ` +
                `is incompatible with singletons`);
        }
        if (type.options.initialCapacity) {
            throw new CheckError(`Component ${type.name} initial capacity of ${type.options.initialCapacity} ` +
                `is incompatible with singletons`);
        }
    }
    type.options.storage = 'compact';
    type.options.capacity = 1;
}

/**
 * An entity represents a collection of distinct components with a unique identity.
 *
 * You can obtain entities from queries in your system.  You must not keep references to entities
 * thus obtained, as they may be pointed to another entity at any time between system executions.
 * Instead, call {@link Entity.hold} to obtain a long-lived version of the object.
 */
class EntityImpl {
    __registry;
    constructor(__registry) {
        this.__registry = __registry;
        this.__id = undefined;
        this.__sortKey = undefined;
        {
            this.__valid = true;
        }
    }
    /**
     * Returns whether the entity is alive, i.e. has not been deleted.  Turning on
     * `accessRecentlyDeletedData` doesn't affect the return value.
     */
    get alive() {
        this.__checkValid();
        return this.__registry.hasShape(this.__id, this.__registry.Alive, false);
    }
    /**
     * Returns the entity's ordinal number, as determined by the order of entity creation.  Entities
     * created in systems running concurrently may have overlapping ordinals.
     */
    get ordinal() {
        return this.__registry.entityOrdinals[this.__id];
    }
    /**
     * Adds a component to the entity.  If the entity already possesses a component of this type the
     * call will fail.
     * @param type The type of component to add.
     * @param values An optional object with field values to initialize the new component.
     */
    add(type, values) {
        {
            this.__checkValid();
            this.__checkMask(type, 'write');
            if (!this.__registry.hasShape(this.__id, this.__registry.Alive, false)) {
                throw new CheckError('Entity has been deleted');
            }
            if (this.__registry.hasShape(this.__id, type, false)) {
                throw new CheckError(`Entity already has a ${type.name} component`);
            }
        }
        this.__registry.setShape(this.__id, type);
        this.__registry.dispatcher.stats.forComponent(type).numEntities += 1;
        initComponent(type, this.__id, values);
    }
    /**
     * Adds a list of components to the entity.  If entity already possesses a component of any of
     * the given types, the call will fail.
     * @param args A list of component types to add, optionally interleaved wth objects that specify
     *  fields values for initializing the immediately preceding component.
     */
    addAll(...args) {
        this.__checkValid();
        {
            const enums = new Set();
            for (const arg of args) {
                if (typeof arg === 'function' && arg.enum) {
                    if (enums.has(arg.enum)) {
                        throw new CheckError(`Can't add multiple components from the same enum`);
                    }
                    enums.add(arg.enum);
                }
            }
        }
        for (let i = 0; i < args.length; i++) {
            const type = args[i];
            {
                if (typeof type !== 'function') {
                    throw new CheckError(`Bad arguments to addAll: expected component type, got: ${type}`);
                }
            }
            let value = args[i + 1];
            if (typeof value === 'function')
                value = undefined;
            else
                i++;
            this.add(type, value);
        }
    }
    /**
     * Remove a component from the entity.  If the entity doesn't possess a component of this type
     * the call will fail.
     * @param type The type of component to remove.
     */
    remove(type) {
        {
            this.__checkValid();
            this.__checkMask(type, 'write');
            if (typeof type === 'function')
                this.__checkHas(type, false);
        }
        if (typeof type !== 'function') {
            const currentType = this.__registry.getEnumShape(this.__id, type, false);
            if (!currentType) {
                throw new CheckError(`Entity doesn't have any components from ${type.name} enumeration`);
            }
            type = currentType;
        }
        this.__registry.clearShape(this.__id, type);
    }
    /**
     * Remove a list of components from the entity.  If the entity doesn't possess a component of any
     * of the given types, the call will fail.
     * @param types A list of component types to remove.
     */
    removeAll(...types) {
        for (const type of types)
            this.remove(type);
    }
    /**
     * Returns whether the entity currently contains a component of the given type.  If a system is
     * running in `accessRecentlyDeletedData` mode, this will also return true for recently removed
     * components.
     *
     * @param type The type of component to check for.
     * @returns Whether the entity has a component of the given type.
     */
    has(type) {
        {
            this.__checkValid();
            this.__checkMask(type, 'check');
        }
        if (typeof type === 'function')
            return this.__registry.hasShape(this.__id, type, true);
        return !!this.__registry.getEnumShape(this.__id, type, true);
    }
    // TODO: see if precomputing the masks and using Registry.match gets better performance on the
    // following has* methods.
    /**
     * Returns whether the entity currently contains a component of any of the given types.  If a
     * system is running in `accessRecentlyDeletedData` mode, this will also consider recently removed
     * components.
     * @param types A list of component types to check for.
     * @returns Whether the entity has a component of at least one of the given types.
     */
    hasSomeOf(...types) {
        this.__checkValid();
        for (const type of types)
            if (this.has(type))
                return true;
        return false;
    }
    /**
     * Returns whether the entity currently contains a component of every one of the given types.  If
     * a system is running in `accessRecentlyDeletedData` mode, this will also consider recently
     * removed components.
     * @param types A list of component types to check for.
     * @returns Whether the entity has a component of every one of the given types.
     */
    hasAllOf(...types) {
        this.__checkValid();
        for (const type of types)
            if (!this.has(type))
                return false;
        return true;
    }
    /**
     * Returns whether the entity currently contains a component of any type other than the given
     * ones.  If a system is running in `accessRecentlyDeletedData` mode, this will also consider
     * recently removed components.
     * @param types A list of component types to exclude from the check.
     * @returns Whether the entity has a component of a type not given.
     */
    hasAnyOtherThan(...types) {
        this.__checkValid();
        const typeSet = new Set(types);
        for (const type of this.__registry.types) {
            this.__checkMask(type, 'check');
            if (!(typeSet.has(type) || type.enum && typeSet.has(type.enum)) &&
                this.__registry.hasShape(this.__id, type, true))
                return true;
        }
        return false;
    }
    /**
     * Counts the number of components of the given types the entity currently contains. If a system
     * is running in `accessRecentlyDeletedData` mode, this will also consider recently removed
     * components.
     * @param types A list of component types to count.
     * @returns The number of components present from among the given types.
     */
    countHas(...types) {
        this.__checkValid();
        let count = 0;
        for (const type of types)
            if (this.has(type))
                count += 1;
        return count;
    }
    /**
     * Returns the type from the given enumeration currently contained by the entity, if any.  If a
     * system is running in `accessRecentlyDeletedData` mode, this will also consider recently removed
     * components.
     * @param enumeration The enumeration of the desired types.
     * @returns A type from the enumeration if contained by the entity, or `undefined` if none.
     */
    hasWhich(enumeration) {
        this.__checkValid();
        this.__checkMask(enumeration, 'check');
        return this.__registry.getEnumShape(this.__id, enumeration, true);
    }
    /**
     * Obtains a component of the entity that will not allow writing to its fields.  If a component of
     * the given type is not part of this entity this method will fail, unless a system is running in
     * `accessRecentlyDeletedData` mode and the component was only recently removed.
     *
     * The component returned must be used immediately; you must not retain a reference to it beyond
     * the local scope.  Any subsequent request to read the same component type on any entity will
     * invalidate the object.
     * @param type The type of component to obtain.
     * @returns The component of the given type that is part of the entity, ready for reading.
     */
    read(type) {
        {
            this.__checkValid();
            this.__checkMask(type, 'read');
            this.__checkHas(type, true);
        }
        return type.__bind(this.__id, false);
    }
    /**
     * Obtains a component of the entity that will allow writing to its fields, and mark the component
     * as having been written to (for `changed` queries).  If a component of the given type is not
     * part of this entity this method will fail, unless a system is running in
     * `accessRecentlyDeletedData` mode and the component was only recently removed.
     *
     * The component returned must be used immediately; you must not retain a reference to it beyond
     * the local scope.  Any subsequent request to write the same component type on any entity will
     * invalidate the object.
     * @param type The type of component to obtain.
     * @returns The component of the given type that is part of the entity, ready for reading and
     *  writing.
     */
    write(type) {
        {
            this.__checkValid();
            this.__checkMask(type, 'write');
            this.__checkHas(type, true);
        }
        if (type.__binding.trackedWrites)
            this.__registry.trackWrite(this.__id, type);
        return type.__bind(this.__id, true);
    }
    /**
     * Deletes this entity and removes all its components.
     */
    delete() {
        this.__checkValid();
        const Alive = this.__registry.Alive;
        if (!this.__registry.hasShape(this.__id, Alive, false)) {
            throw new CheckError('Entity already deleted');
        }
        for (const type of this.__registry.types) {
            if (this.__registry.hasShape(this.__id, type, false)) {
                if (type !== Alive)
                    this.__checkMask(type, 'write');
                this.__registry.clearShape(this.__id, type);
            }
        }
        this.__registry.dispatcher.indexer.clearAllRefs(this.__id, false);
    }
    /**
     * Creates a long-lived version of this entity object, that you can safely keep for as long as the
     * entity exists.  Once the entity is deleted (and swept up after the end of the next frame) all
     * further calls on the object will fail.
     * @returns A long-lived version of this entity object.
     */
    hold() {
        this.__checkValid();
        return this.__registry.holdEntity(this.__id);
    }
    /**
     * Returns whether this entity and another one are in fact the same entity.  This can be useful
     * for comparing held entities to transient query ones.
     * @param other The other entity to match against.
     * @returns Whether this entity and the other one are the same.
     */
    isSame(other) {
        this.__checkValid();
        return this.__id === other.__id;
    }
    __checkMask(type, kind) {
        checkMask(type, this.__registry.executingSystem, kind);
    }
    __checkHas(type, allowRecentlyDeleted) {
        if (!this.__registry.hasShape(this.__id, type, allowRecentlyDeleted)) {
            throw new CheckError(`Entity doesn't have a ${type.name} component`);
        }
    }
    __checkValid() {
        if (!this.__valid)
            throw new CheckError('Entity handle no longer valid');
    }
}
function checkMask(type, system, kind) {
    checkTypeDefined(type);
    const mask = system?.accessMasks[kind];
    if (!mask)
        return;
    // Inline isMaskFlagSet for performance.
    const binding = type.__binding;
    if (((mask[binding.shapeOffset] ?? 0) & binding.shapeMask) === 0) {
        throw new CheckError(`System ${system.name} didn't mark component ${type.name} as ${kind}able`);
    }
}
function isMaskFlagSet(mask, type) {
    const binding = type.__binding;
    return ((mask[binding.shapeOffset] ?? 0) & binding.shapeMask) !== 0;
}
function extendMaskAndSetFlag(mask, type, useValues = false) {
    checkTypeDefined(type);
    const flagOffset = type.__binding.shapeOffset;
    if (flagOffset >= mask.length) {
        const oldLength = mask.length;
        mask.length = flagOffset + 1;
        mask.fill(0, oldLength, flagOffset);
    }
    mask[flagOffset] |=
        useValues ? type.__binding.shapeValue : type.__binding.shapeMask;
}

const HEADER_LENGTH$1 = 2;
const EMPTY_TUPLE = [];
/**
 * A circular log of u32 numbers with smart pointers into it.  When the log wraps around it
 * increments a generation counter so you can tell if your pointer got lapped and is now invalid.
 */
class Log {
    maxEntries;
    configParamName;
    options;
    /* layout: [index, generation, ...entries] */
    data;
    /* layout: [length, generation, ...entries] */
    corral;
    /* layout: [length, unused, ...entries] */
    staging;
    typeCounters;
    constructor(maxEntries, configParamName, buffers, options = {
        localProcessingAllowed: false, sortedByComponentType: false, numComponentTypes: 0
    }) {
        this.maxEntries = maxEntries;
        this.configParamName = configParamName;
        this.options = options;
        buffers.register(`log.${configParamName}.buffer`, maxEntries + HEADER_LENGTH$1, Uint32Array, (data) => { this.data = data; });
        buffers.register(`log.${configParamName}.corral`, maxEntries + HEADER_LENGTH$1, Uint32Array, (corral) => { this.corral = corral; });
        if (options.sortedByComponentType) {
            if (options.numComponentTypes === undefined) {
                throw new InternalError(`numComponentTypes required when ${this.configParamName} is sortedByComponentType`);
            }
            buffers.register(`log.${configParamName}.staging`, maxEntries + HEADER_LENGTH$1, Uint32Array, (staging) => { this.staging = staging; });
            this.typeCounters = new Uint32Array(this.options.numComponentTypes);
        }
    }
    push(value, type) {
        const corralLength = this.corral[0];
        if (corralLength >= this.maxEntries)
            this.throwCapacityExceeded();
        if (corralLength && this.corral[corralLength] === value)
            return;
        this.corral[corralLength + HEADER_LENGTH$1] = value;
        this.corral[0] += 1;
        if (!!type !== !!this.options.sortedByComponentType) {
            throw new InternalError(`Pushing value ${type ? 'with' : 'without'} type to log ${this.configParamName} ` +
                `${this.options.sortedByComponentType ? '' : 'not '}sorted by component type`);
        }
        if (type)
            this.typeCounters[type.id] += 1;
    }
    commit(pointer) {
        if (!pointer && this.options.localProcessingAllowed) {
            throw new InternalError(`Cannot use blind commit when local processing is allowed in log ${this.configParamName}`);
        }
        if (!this.corral[0])
            return true;
        if (pointer && !(pointer.generation === this.data[1] && pointer.index === this.data[0] &&
            pointer.corralGeneration === this.corral[1] && pointer.corralIndex === this.corral[0]))
            return false;
        this.copyToData(this.staging ? this.sortCorral() : this.corral);
        this.corral[0] = 0;
        this.corral[1] += 1;
        if (pointer) {
            pointer.index = this.data[0];
            pointer.generation = this.data[1];
        }
        return true;
    }
    sortCorral() {
        let offset = HEADER_LENGTH$1, soleTypeId = -1, soleTypeCount = 0, numNonZeroTypes = 0;
        for (let typeId = 0; typeId < this.typeCounters.length; typeId++) {
            const count = this.typeCounters[typeId];
            if (!count)
                continue;
            numNonZeroTypes += 1;
            if (soleTypeId === -1) {
                soleTypeId = typeId;
                soleTypeCount = count;
            }
            else if (soleTypeId >= 0) {
                soleTypeId = -2;
            }
            if (count === 1) {
                this.typeCounters[typeId] = offset;
                offset += 1;
            }
            else {
                this.typeCounters[typeId] = offset + 1;
                this.staging[offset] = count | (typeId << ENTITY_ID_BITS) | 2 ** 31;
                offset += count + 1;
            }
        }
        if (soleTypeId >= 0) {
            if (soleTypeCount > 1) {
                if (this.corral[0] === this.maxEntries)
                    this.throwCapacityExceeded();
                this.corral[this.corral[0] + HEADER_LENGTH$1] = this.corral[HEADER_LENGTH$1];
                this.corral[HEADER_LENGTH$1] = this.corral[0] | (soleTypeId << ENTITY_ID_BITS) | 2 ** 31;
                this.corral[0] += 1;
            }
            this.typeCounters.fill(0);
            return this.corral;
        }
        if (this.corral[0] + numNonZeroTypes > this.maxEntries)
            this.throwCapacityExceeded();
        const corralAndHeaderLength = this.corral[0] + HEADER_LENGTH$1;
        for (let i = HEADER_LENGTH$1; i < corralAndHeaderLength; i++) {
            const value = this.corral[i];
            const typeId = value >>> ENTITY_ID_BITS;
            this.staging[this.typeCounters[typeId]++] = value;
        }
        this.staging[0] = offset - HEADER_LENGTH$1;
        this.typeCounters.fill(0);
        return this.staging;
    }
    copyToData(source) {
        let index = this.data[0];
        const length = source[0];
        const firstSegmentLength = Math.min(length, this.maxEntries - index);
        this.data.set(source.subarray(HEADER_LENGTH$1, firstSegmentLength + HEADER_LENGTH$1), index + HEADER_LENGTH$1);
        if (firstSegmentLength < length) {
            this.data.set(source.subarray(firstSegmentLength + HEADER_LENGTH$1, length + HEADER_LENGTH$1), HEADER_LENGTH$1);
        }
        index += length;
        while (index >= this.maxEntries) {
            index -= this.maxEntries;
            this.data[1] += 1;
        }
        this.data[0] = index;
    }
    createPointer(pointer) {
        if (!pointer) {
            return {
                index: this.data[0], generation: this.data[1],
                corralIndex: this.corral[0], corralGeneration: this.corral[1]
            };
        }
        pointer.index = this.data[0];
        pointer.generation = this.data[1];
        pointer.corralIndex = this.corral[0];
        pointer.corralGeneration = this.corral[1];
        return pointer;
    }
    copyPointer(pointer) {
        return {
            index: pointer.index, generation: pointer.generation,
            corralIndex: pointer.corralIndex, corralGeneration: pointer.corralGeneration
        };
    }
    hasUpdatesSince(pointer) {
        this.checkPointer(pointer);
        return !(pointer.index === this.data[0] && pointer.generation === this.data[1] &&
            (pointer.corralGeneration === this.corral[1] ?
                pointer.corralIndex === this.corral[0] : this.corral[0] === 0));
    }
    processSince(startPointer, endPointer) {
        this.checkPointers(startPointer, endPointer);
        let result = EMPTY_TUPLE;
        const endIndex = endPointer?.index ?? this.data[0];
        const endGeneration = endPointer?.generation ?? this.data[1];
        if (startPointer.generation === endGeneration) {
            if (startPointer.index < endIndex) {
                result = [
                    this.data, startPointer.index + HEADER_LENGTH$1, endIndex + HEADER_LENGTH$1, false
                ];
                startPointer.index = endIndex;
            }
            else {
                const corralLength = this.corral[0];
                const corralGeneration = this.corral[1];
                const corralHasNewEntries = startPointer.corralGeneration === corralGeneration ?
                    startPointer.corralIndex < corralLength : corralLength;
                if (corralHasNewEntries) {
                    result = [
                        this.corral, startPointer.corralIndex + HEADER_LENGTH$1,
                        corralLength + HEADER_LENGTH$1, true
                    ];
                    startPointer.corralIndex = corralLength;
                    startPointer.corralGeneration = corralGeneration;
                }
            }
        }
        else {
            result = [this.data, startPointer.index + HEADER_LENGTH$1, this.data.length, false];
            startPointer.index = 0;
            startPointer.generation = endGeneration;
        }
        return result;
    }
    processAndCommitSince(startPointer) {
        const result = this.processSince(startPointer);
        if (result[0])
            return result;
        if (this.commit(startPointer))
            return EMPTY_TUPLE;
        return this.processSince(startPointer);
    }
    countSince(startPointer, endPointer) {
        this.checkPointers(startPointer, endPointer);
        if (this.corral[0]) {
            throw new InternalError(`Should commit log ${this.configParamName} before counting`);
        }
        const startIndex = startPointer.index;
        const startGeneration = startPointer.generation;
        const endIndex = endPointer?.index ?? this.data[0];
        const endGeneration = endPointer?.generation ?? this.data[1];
        startPointer.index = endIndex;
        startPointer.generation = endGeneration;
        if (startIndex === endIndex && startGeneration === endGeneration)
            return 0;
        if (startIndex < endIndex)
            return endIndex - startIndex;
        return this.maxEntries - (startIndex - endIndex);
    }
    checkPointers(startPointer, endPointer) {
        this.checkPointer(startPointer);
        if (endPointer) {
            this.checkPointer(endPointer);
            {
                if (startPointer.index > endPointer.index &&
                    startPointer.generation >= endPointer.generation) {
                    throw new InternalError(`Start pointer exceeds end pointer in log ${this.configParamName}`);
                }
            }
        }
    }
    checkPointer(pointer) {
        const index = this.data[0];
        let generation = pointer.generation;
        if (pointer.index === index) {
            if (generation + 1 < this.data[1])
                this.throwCapacityExceeded();
        }
        else {
            if (pointer.index > index)
                generation += 1;
            if (generation !== this.data[1])
                this.throwCapacityExceeded();
        }
        {
            if (pointer.corralGeneration > this.corral[1]) {
                throw new InternalError(`Pointer corral generation older than corral in log ${this.configParamName}`);
            }
            if (pointer.corralGeneration === this.corral[1] && pointer.corralIndex > this.corral[0]) {
                throw new InternalError(`Pointer past end of corral area in log ${this.configParamName}`);
            }
        }
    }
    throwCapacityExceeded() {
        throw new CheckError(`Log capacity exceeded, please raise ${this.configParamName} above ${this.maxEntries}`);
    }
}

/**
 * A fixed but arbitrary size bitset.
 */
class Bitset {
    size;
    bytes;
    constructor(size) {
        this.size = size;
        this.bytes = new Uint32Array(Math.ceil(size / 32));
    }
    get(index) {
        {
            if (index < 0 || index >= this.size) {
                throw new InternalError(`Bit index out of bounds: ${index}`);
            }
        }
        return (this.bytes[index >>> 5] & (1 << (index & 31))) !== 0;
    }
    set(index) {
        {
            if (index < 0 || index >= this.size) {
                throw new InternalError(`Bit index out of bounds: ${index}`);
            }
        }
        this.bytes[index >>> 5] |= (1 << (index & 31));
    }
    unset(index) {
        {
            if (index < 0 || index >= this.size) {
                throw new InternalError(`Bit index out of bounds: ${index}`);
            }
        }
        this.bytes[index >>> 5] &= ~(1 << (index & 31));
    }
    clear() {
        this.bytes.fill(0);
    }
}

class ArrayEntityList {
    pool;
    orderBy;
    entities = [];
    maxOrderKey = -Infinity;
    sorted = true;
    constructor(pool, orderBy) {
        this.pool = pool;
        this.orderBy = orderBy;
    }
    add(id) {
        const entity = this.pool.borrowTemporarily(id);
        if (this.orderBy) {
            const orderKey = this.orderBy(entity);
            if (orderKey >= this.maxOrderKey) {
                this.maxOrderKey = orderKey;
            }
            else {
                this.sorted = false;
            }
        }
        this.entities.push(entity);
    }
    clear() {
        if (this.entities.length)
            this.entities.length = 0;
        this.maxOrderKey = -Infinity;
        this.sorted = true;
    }
    sort() {
        if (this.sorted)
            return;
        const orderBy = this.orderBy;
        for (const entity of this.entities)
            entity.__sortKey = orderBy(entity);
        this.entities.sort((a, b) => {
            return a.__sortKey < b.__sortKey ? -1 : a.__sortKey > b.__sortKey ? +1 : 0;
        });
        this.sorted = true;
    }
}
class PackedArrayEntityList {
    pool;
    orderBy;
    entities = [];
    lookupTable;
    maxOrderKey = -Infinity;
    sorted = true;
    constructor(pool, orderBy, maxEntities) {
        this.pool = pool;
        this.orderBy = orderBy;
        this.lookupTable = new Int32Array(maxEntities);
        this.lookupTable.fill(-1);
    }
    add(id) {
        const entity = this.pool.borrow(id);
        if (this.orderBy) {
            const orderKey = this.orderBy(entity);
            if (orderKey >= this.maxOrderKey) {
                this.maxOrderKey = orderKey;
            }
            else {
                this.sorted = false;
            }
        }
        const index = this.entities.push(entity) - 1;
        this.lookupTable[id] = index;
    }
    remove(id) {
        const index = this.lookupTable[id];
        if (index < 0)
            throw new InternalError('Entity not in list');
        this.pool.return(id);
        this.lookupTable[id] = -1;
        const entity = this.entities.pop();
        if (index < this.entities.length) {
            this.entities[index] = entity;
            this.lookupTable[entity.__id] = index;
            if (this.orderBy)
                this.sorted = false;
        }
    }
    has(id) {
        return this.lookupTable[id] >= 0;
    }
    clear() {
        for (const entity of this.entities)
            this.pool.return(entity.__id);
        this.entities = [];
        this.lookupTable.fill(-1);
        this.maxOrderKey = -Infinity;
        this.sorted = true;
    }
    sort() {
        if (this.sorted)
            return;
        const orderBy = this.orderBy;
        for (const entity of this.entities)
            entity.__sortKey = orderBy(entity);
        this.entities.sort((a, b) => {
            return a.__sortKey < b.__sortKey ? -1 : a.__sortKey > b.__sortKey ? +1 : 0;
        });
        for (let i = 0; i < this.entities.length; i++) {
            this.lookupTable[this.entities[i].__id] = i;
        }
        this.sorted = true;
    }
}

var QueryFlavor;
(function (QueryFlavor) {
    QueryFlavor[QueryFlavor["current"] = 1] = "current";
    QueryFlavor[QueryFlavor["added"] = 2] = "added";
    QueryFlavor[QueryFlavor["removed"] = 4] = "removed";
    QueryFlavor[QueryFlavor["changed"] = 8] = "changed";
    QueryFlavor[QueryFlavor["addedOrChanged"] = 16] = "addedOrChanged";
    QueryFlavor[QueryFlavor["changedOrRemoved"] = 32] = "changedOrRemoved";
    QueryFlavor[QueryFlavor["addedChangedOrRemoved"] = 64] = "addedChangedOrRemoved";
})(QueryFlavor || (QueryFlavor = {}));
const transientFlavorsMask = QueryFlavor.added | QueryFlavor.removed | QueryFlavor.changed | QueryFlavor.addedOrChanged |
    QueryFlavor.changedOrRemoved | QueryFlavor.addedChangedOrRemoved;
const changedFlavorsMask = QueryFlavor.changed | QueryFlavor.addedOrChanged | QueryFlavor.changedOrRemoved |
    QueryFlavor.addedChangedOrRemoved;
const shapeFlavorsMask = QueryFlavor.added | QueryFlavor.removed | QueryFlavor.addedOrChanged |
    QueryFlavor.changedOrRemoved | QueryFlavor.addedChangedOrRemoved;
class QueryBox {
    system;
    results = {};
    flavors = 0;
    withMask;
    withValues;
    withAnyRecords;
    withoutMask;
    withoutEnumTypes;
    trackWritesMask;
    orderBy;
    hasTransientResults;
    hasChangedResults;
    hasShapeResults;
    hasMatchTracking;
    currentEntities;
    processedEntities;
    changedEntities;
    constructor(query, system) {
        this.system = system;
        query.__results = this.results;
        query.__systemName = system.name;
    }
    complete() {
        const dispatcher = this.system.dispatcher;
        this.hasTransientResults = Boolean(this.flavors & transientFlavorsMask);
        this.hasChangedResults = Boolean(this.flavors & changedFlavorsMask);
        this.hasShapeResults = Boolean(this.flavors & shapeFlavorsMask);
        this.hasMatchTracking = Boolean(this.withAnyRecords?.some(record => record.lastMatches));
        {
            if (this.withMask && this.withoutMask) {
                const minLength = Math.min(this.withMask.length, this.withoutMask.length);
                for (let i = 0; i < minLength; i++) {
                    if ((this.withMask[i] & this.withoutMask[i]) !== 0) {
                        throw new CheckError('Query must not list a component type in both `with` and `without` clauses');
                    }
                }
            }
            if (this.withAnyRecords && this.withoutMask) {
                for (const { mask } of this.withAnyRecords) {
                    const minLength = Math.min(mask.length, this.withoutMask.length);
                    for (let i = 0; i < minLength; i++) {
                        if ((mask[i] & this.withoutMask[i]) !== 0) {
                            throw new CheckError('Query must not list a component type in both `withAny` and `without` clauses');
                        }
                    }
                }
            }
            const hasTrackers = !!this.trackWritesMask || this.withAnyRecords?.some(item => item.lastMatches);
            if (this.hasChangedResults && !hasTrackers) {
                throw new CheckError(`Query for changed entities must track at least one component`);
            }
            if (!this.hasChangedResults && hasTrackers) {
                throw new CheckError('You can only track components if you have a query for changed entities');
            }
        }
        if (this.flavors & QueryFlavor.current) {
            this.results.current =
                new PackedArrayEntityList(dispatcher.registry.pool, this.orderBy, dispatcher.maxEntities);
        }
        else {
            this.currentEntities = new Bitset(dispatcher.maxEntities);
        }
        this.processedEntities = new Bitset(dispatcher.maxEntities);
        if (this.hasTransientResults)
            this.allocateTransientResultLists();
        if (this.flavors)
            this.system.shapeQueries.push(this);
        if (this.hasChangedResults) {
            this.changedEntities = new Bitset(dispatcher.maxEntities);
            this.system.writeQueries.push(this);
        }
    }
    allocateTransientResultLists() {
        if (this.flavors & QueryFlavor.added)
            this.allocateResult('added');
        if (this.flavors & QueryFlavor.removed)
            this.allocateResult('removed');
        if (this.flavors & QueryFlavor.changed)
            this.allocateResult('changed');
        if (this.flavors & QueryFlavor.addedOrChanged)
            this.allocateResult('addedOrChanged');
        if (this.flavors & QueryFlavor.changedOrRemoved)
            this.allocateResult('changedOrRemoved');
        if (this.flavors & QueryFlavor.addedChangedOrRemoved) {
            this.allocateResult('addedChangedOrRemoved');
        }
    }
    allocateResult(name) {
        const dispatcher = this.system.dispatcher;
        this.results[name] = new ArrayEntityList(dispatcher.registry.pool, this.orderBy);
    }
    clearTransientResults() {
        if (!this.hasTransientResults)
            return;
        this.results.added?.clear();
        this.results.removed?.clear();
        this.results.changed?.clear();
        this.results.addedOrChanged?.clear();
        this.results.changedOrRemoved?.clear();
        this.results.addedChangedOrRemoved?.clear();
        this.changedEntities?.clear();
    }
    clearAllResults() {
        this.clearTransientResults();
        this.results.current?.clear();
    }
    clearProcessedEntities() {
        this.processedEntities.clear();
    }
    handleShapeUpdate(id) {
        if (this.processedEntities.get(id))
            return;
        this.processedEntities.set(id);
        const registry = this.system.dispatcher.registry;
        const oldMatch = this.results.current?.has(id) ?? this.currentEntities.get(id);
        const newMatch = registry.matchShape(id, this.withMask, this.withValues, this.withAnyRecords, this.withoutMask, this.withoutEnumTypes);
        if (newMatch && !oldMatch) {
            this.currentEntities?.set(id);
            this.changedEntities?.set(id);
            this.results.current?.add(id);
            this.results.added?.add(id);
            this.results.addedOrChanged?.add(id);
            this.results.addedChangedOrRemoved?.add(id);
        }
        else if (!newMatch && oldMatch) {
            this.currentEntities?.unset(id);
            this.changedEntities?.set(id);
            this.results.current?.remove(id);
            this.results.removed?.add(id);
            this.results.changedOrRemoved?.add(id);
            this.results.addedChangedOrRemoved?.add(id);
        }
        else if (newMatch && oldMatch && this.hasMatchTracking) {
            for (const record of this.withAnyRecords) {
                if (record.changed) {
                    this.changedEntities.set(id);
                    this.results.changed?.add(id);
                    this.results.addedOrChanged?.add(id);
                    this.results.changedOrRemoved?.add(id);
                    this.results.addedChangedOrRemoved?.add(id);
                    break;
                }
            }
        }
    }
    handleWrite(id, componentFlagOffset, componentFlagMask) {
        if (!this.changedEntities.get(id) &&
            (this.hasShapeResults ?
                (this.results.current?.has(id) ?? this.currentEntities.get(id)) :
                this.system.dispatcher.registry.matchShape(id, this.withMask, this.withValues, this.withAnyRecords, this.withoutMask, this.withoutEnumTypes)) &&
            (this.trackWritesMask[componentFlagOffset] ?? 0) & componentFlagMask) {
            this.changedEntities.set(id);
            this.results.changed?.add(id);
            this.results.addedOrChanged?.add(id);
            this.results.changedOrRemoved?.add(id);
            this.results.addedChangedOrRemoved?.add(id);
        }
    }
    sort() {
        this.results.current?.sort();
        this.results.added?.sort();
        this.results.removed?.sort();
        this.results.changed?.sort();
        this.results.addedOrChanged?.sort();
        this.results.changedOrRemoved?.sort();
        this.results.addedChangedOrRemoved?.sort();
    }
}
/**
 * A fluent DSL for specifying a family of queries over the world's entities.
 *
 * Each query has a number of aspects:
 * 1. What components an entity must (`with`) and must not (`without`) have to be selected.
 * 2. Whether to return all `current` entities that satisfy the query, only various deltas from the
 *    last frame (`added`, `removed`, `changed`, etc.).  It's permitted and encouraged to declare
 *    multiple such variants on a single query if needed.  For the delta queries, each entity will
 *    be compared against the query's value in the previous frame, so an entity that changes state
 *    and changes back again between system executions will not be selected.
 * 3. Which component types the query will read and write.  This doesn't affect the results of the
 *    query but is used to order and deconflict systems.
 */
class QueryBuilder {
    __callback;
    __userQuery;
    __query;
    __system;
    __lastTypes;
    __lastWasWithAny;
    constructor(__callback, __userQuery) {
        this.__callback = __callback;
        this.__userQuery = __userQuery;
    }
    __build(system) {
        try {
            this.__system = system;
            this.__query = new QueryBox(this.__userQuery, system);
            this.__callback(this);
            if (!this.__query.withMask && this.__query.flavors) {
                this.set('withMask', [this.__system.dispatcher.registry.Alive]);
            }
            this.__query.complete();
        }
        catch (e) {
            e.message = `Failed to build query in system ${system.name}: ${e.message}`;
            throw e;
        }
    }
    // TODO: support partitioned queries in stateless systems
    /**
     * A noop connector to make a query definition read better.
     */
    get and() {
        return this;
    }
    /**
     * A noop connector to make a query definition read better.
     */
    get but() {
        return this;
    }
    /**
     * A noop connector to make a query definition read better.
     */
    get also() {
        return this;
    }
    /**
     * Requests the maintenance of a list of all entities that currently satisfy the query.  This is
     * the most common use of queries.
     */
    get current() {
        this.__query.flavors |= QueryFlavor.current;
        return this;
    }
    /**
     * Requests that a list of all entities that newly satisfy the query be made available each frame.
     */
    get added() {
        this.__query.flavors |= QueryFlavor.added;
        return this;
    }
    /**
     * Requests that a list of all entities that no longer satisfy the query be made available each
     * frame.
     */
    get removed() {
        this.__query.flavors |= QueryFlavor.removed;
        return this;
    }
    /**
     * Requests that a list of all entities that were recently written to and satisfy the query be
     * made available each frame.  You must additionally specify which components the write detection
     * should be sensitive to using `trackWrites`.
     */
    get changed() {
        this.__query.flavors |= QueryFlavor.changed;
        return this;
    }
    /**
     * A combination of the `added` and `changed` query types, with the advantage that an entity that
     * satisfies both will only appear once.
     */
    get addedOrChanged() {
        this.__query.flavors |= QueryFlavor.addedOrChanged;
        return this;
    }
    /**
     * A combination of the `changed` and `removed` query types, with the advantage that an entity
     * that satisfies both will only appear once.
     */
    get changedOrRemoved() {
        this.__query.flavors |= QueryFlavor.changedOrRemoved;
        return this;
    }
    /**
     * A combination of the `added`, `changed`, and `removed` query types, with the advantage that an
     * entity that satisfies multiple ones will only appear once.
     */
    get addedChangedOrRemoved() {
        this.__query.flavors |= QueryFlavor.addedChangedOrRemoved;
        return this;
    }
    /**
     * Order query results in ascending order of the given function's output for each entity.
     * @example
     *   q.added.orderBy(entity => entity.ordinal)
     * @param transformer A function that transforms an entity to a number for sorting.
     */
    orderBy(transformer) {
        this.__query.orderBy = transformer;
        return this;
    }
    /**
     * Constrains the query to entities that possess components of all the given types.  All given
     * types are also marked as `read`.
     *
     * All `with` clauses are combined into a single `O(1)` check.
     *
     * You cannot pass in enums since by definition it's impossible for an entity to possess more than
     * one component from an enum.  See {@link QueryBuilder.withAny} instead.
     * @param types The types of components required to match the query.
     */
    with(...types) {
        this.set(this.__system.accessMasks.read, types);
        this.set('withMask');
        return this;
    }
    /**
     * Constrains the query to entities that possess a component of at least one of the given types.
     * All given types are also marked as `read`.
     *
     * Unlike `with`, `withAny` clauses are not combined; each is evaluated as a separate check, which
     * may affect performance.
     *
     * You cannot pass in enum component types, only whole enums.
     * @param types
     */
    withAny(...types) {
        for (const type of types) {
            if (typeof type === 'function' && type.enum) {
                throw new CheckError(`Cannot use enum types in a withAny clause: ${type.name}`);
            }
        }
        this.set(this.__system.accessMasks.read, types);
        if (!this.__query.withAnyRecords)
            this.__query.withAnyRecords = [];
        const mask = [];
        this.__query.withAnyRecords.push({ mask, lastMatches: undefined, changed: false });
        this.set(mask);
        return this;
    }
    /**
     * Constrains the query to entities that don't possess components of any of the given types.  All
     * given types are also marked as `read`.
     *
     * While you can pass in enum component types, evaluating such queries is inefficient (`O(n)` in
     * the number of enum types passed).  Passing in whole enums is fine, though (the query stays
     * `O(1)`).
     * @param types The types of components that must not be present to match the query.
     */
    without(...types) {
        this.set(this.__system.accessMasks.read, types);
        this.set('withoutMask');
        return this;
    }
    /**
     * Mentions some component types for follow-up modifiers.
     * @param types The types of components for follow-up modifiers, but that don't constrain the
     * query.
     */
    using(...types) {
        this.__lastTypes = types;
        return this;
    }
    /**
     * Makes all component types in the world available for follow-up modifiers.  This can be modified
     * with a `.write` as usual, and may be useful in "sweeper" systems that want to be able to, e.g.,
     * delete any entity without having to worry what it might hold refs to or what components might
     * have backrefs pointing to it.
     */
    get usingAll() {
        // All types except Alive, which is always at index 0.
        this.__lastTypes = this.__system.dispatcher.registry.types.slice(1);
        return this;
    }
    /**
     * Marks writes to the most recently mentioned component types as trackable for `changed` query
     * flavors.  An entity will be considered changed if any system called `write` on one of those
     * components since the last frame.
     */
    get trackWrites() {
        this.set('trackWritesMask');
        for (const type of this.__lastTypes) {
            if (typeof type === 'function') {
                type.__binding.trackedWrites = true;
            }
            else {
                for (const enumType of type.__types)
                    enumType.__binding.trackedWrites = true;
            }
        }
        return this;
    }
    /**
     * Marks changes in the matching set of the immediately preceding `withAny` component types as
     * trackable for `changed` query flavors.  An entity will be considered changed if it matched the
     * query in the last frame and still matches it in the current frame, but satisfied the `withAny`
     * constraint with a different set of components.
     *
     * This tracking is particularly useful for detecting changing enum states, but can be applied to
     * any set of components.
     */
    get trackMatches() {
        if (!this.__lastWasWithAny) {
            throw new Error('You can only apply trackMatches to a withAny clause');
        }
        this.__query.withAnyRecords[this.__query.withAnyRecords.length - 1].lastMatches = [];
        return this;
    }
    /**
     * Marks the most recently mentioned component types as read by the system.  This declaration
     * is enforced: you will only be able to read components of types thus declared.
     */
    get read() {
        this.set(this.__system.accessMasks.read);
        return this;
    }
    /**
     * Marks the most recently mentioned component types as created (and only created!) by the system.
     * This means that the component types will only be used in `createEntity` calls; they cannot be
     * otherwise read, checked for (`has` methods), or written.  It can run concurrently with other
     * `create` entitlements but counts as a `write` for purposes of system ordering.
     */
    get create() {
        this.set(this.__system.accessMasks.create);
        return this;
    }
    /**
     * Marks the most recently mentioned component types as indirectly updated by the system.  This
     * covers automatic change propagation to non-writable fields such as updates of `backrefs`
     * properties; however, it doesn't cover automatic clearing of refs to a deleted entity.  It can
     * run concurrently with other `read` and `update` entitlements but counts as a `write` for
     * purposes of system ordering.
     */
    get update() {
        this.set(this.__system.accessMasks.update);
        return this;
    }
    /**
     * Marks the most recently mentioned component types as read, written, created and/or updated by
     * the system.  This declaration is enforced: you will only be able to read and write to component
     * of types thus declared. You should try to declare the minimum writable set that your system
     * will need to improve ordering and concurrency.
     */
    get write() {
        this.set(this.__system.accessMasks.write);
        this.set(this.__system.accessMasks.read);
        this.set(this.__system.accessMasks.create);
        this.set(this.__system.accessMasks.update);
        return this;
    }
    set(mask, types) {
        if (!mask)
            return;
        if (types) {
            for (const type of types)
                checkTypeDefined(type);
        }
        if (!types)
            types = this.__lastTypes;
        if (!types)
            throw new InternalError('No component type to apply query modifier to');
        this.__lastTypes = types;
        if (typeof mask === 'string') {
            if (!this.__query[mask])
                this.__query[mask] = [];
            mask = this.__query[mask];
        }
        this.__lastWasWithAny = this.__query.withAnyRecords?.some(item => item.mask === mask) ?? false;
        const readMask = mask === this.__system.accessMasks.read;
        const updateMask = mask === this.__system.accessMasks.update;
        const createMask = mask === this.__system.accessMasks.create;
        const writeMask = mask === this.__system.accessMasks.write;
        const withMask = mask === this.__query.withMask;
        const withoutMask = mask === this.__query.withoutMask;
        const shapeMask = mask === this.__query.withMask || mask === this.__query.withoutMask || this.__lastWasWithAny;
        const trackMask = mask === this.__query.trackWritesMask;
        const map = readMask ? this.__system.dispatcher.planner.readers :
            writeMask || createMask || updateMask ? this.__system.dispatcher.planner.writers :
                undefined;
        for (const type of types) {
            {
                if (!isMaskFlagSet(this.__system.accessMasks.write, type) && (readMask && isMaskFlagSet(this.__system.accessMasks.create, type) ||
                    createMask && isMaskFlagSet(this.__system.accessMasks.read, type))) {
                    throw new CheckError(`Cannot combine create and read entitlements for component type ${type.name}; ` +
                        `just use a write entitlement instead`);
                }
            }
            if (withoutMask && typeof type === 'function' && type.enum) {
                this.__query.withoutEnumTypes = this.__query.withoutEnumTypes ?? [];
                this.__query.withoutEnumTypes.push(type);
            }
            else {
                extendMaskAndSetFlag(mask, type);
                if (withMask) {
                    if (!this.__query.withValues)
                        this.__query.withValues = [];
                    extendMaskAndSetFlag(this.__query.withValues, type, true);
                }
            }
            if (readMask)
                extendMaskAndSetFlag(this.__system.accessMasks.check, type);
            if (typeof type === 'function') {
                if (map)
                    map.get(type).add(this.__system);
                if (shapeMask)
                    this.categorize(this.__system.shapeQueriesByComponent, type);
                if (trackMask)
                    this.categorize(this.__system.writeQueriesByComponent, type);
            }
            else {
                for (const enumType of type.__types) {
                    if (map)
                        map.get(enumType).add(this.__system);
                    if (shapeMask)
                        this.categorize(this.__system.shapeQueriesByComponent, enumType);
                    if (trackMask)
                        this.categorize(this.__system.writeQueriesByComponent, enumType);
                }
            }
        }
    }
    categorize(index, type) {
        const id = type.id;
        if (!index[id])
            index[id] = [];
        if (!index[id].includes(this.__query))
            index[id].push(this.__query);
    }
}
class Query {
    __results;
    __systemName;
    // TODO: add an API for freezing/thawing a query
    /**
     * A list of all entities that match this query as of the beginning of the system's current (or
     * last) execution.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get current() {
        this.__checkList('current');
        return this.__results.current.entities;
    }
    /**
     * A list of all entities that newly started matching this query between the system's current (or
     * last) and previous executions.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get added() {
        this.__checkList('added');
        return this.__results.added.entities;
    }
    /**
     * A list of all entities that newly stopped matching this query between the system's current (or
     * last) and previous executions.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get removed() {
        this.__checkList('removed');
        return this.__results.removed.entities;
    }
    /**
     * A list of all entities that match this query as of the beginning of of the system's current (or
     * last) execution, and that had tracked components written to between the system's current (or
     * last) and previous executions.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get changed() {
        this.__checkList('changed');
        return this.__results.changed.entities;
    }
    /**
     * A list that combines `added` and `changed`, but without duplicate entities.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get addedOrChanged() {
        this.__checkList('addedOrChanged');
        return this.__results.addedOrChanged.entities;
    }
    /**
     * A list that combines `changed` and `removed`, but without duplicate entities.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get changedOrRemoved() {
        this.__checkList('changedOrRemoved');
        return this.__results.changedOrRemoved.entities;
    }
    /**
     * A list that combines `added`, `changed`, and `removed`, but without duplicate entities.
     *
     * You must not keep a reference to these entities beyond the local scope of a system's execution.
     * To obtain an object for long-term use please see {@link Entity.hold}.
     */
    get addedChangedOrRemoved() {
        this.__checkList('addedChangedOrRemoved');
        return this.__results.addedChangedOrRemoved.entities;
    }
    __checkList(flavor) {
        const list = this.__results[flavor];
        if (!list) {
            throw new CheckError(`Query '${flavor}' not configured, please add .${flavor} to your query definition in ` +
                `system ${this.__systemName}`);
        }
    }
}

const now = typeof window !== 'undefined' && typeof window.performance !== 'undefined' ?
    performance.now.bind(performance) : Date.now.bind(Date);
// TODO: support replicated systems
// TODO: support continuously executed systems
/**
 * A fluent DSL for specifying a system's scheduling constraints.
 *
 * Any given pair of systems will be ordered by the first of the following rules that matches:
 * 1. A system was explicitly placed `before` or `after` another.
 * 2. A system was explicitly left unordered with respect to another using `inAnyOrderWith`.
 * 3. A system was implicitly placed before or after another system based on the components the
 *    other system reads or writes, using `beforeReadersOf`, `afterReadersOf`, `beforeWritersOf` or
 *    `afterWritersOf`.
 * 4. A system was explicitly left unordered with respect to another using `inAnyOrderWithReadersOf`
 *    or `inAnyOrderWithWritersOf`.
 * 5. A system was implicitly placed after another because it reads a component that the other
 *    system writes.
 *
 * If there are multiple constraints at the same priority level they will conflict and create a
 * cycle.  If there are any cycles in the order graph (whether due to explicit conflicts or implicit
 * circular dependencies), world creation will fail with an informative error and you'll need to
 * break the cycles by adding scheduling constraints to the systems involved.
 */
class ScheduleBuilder {
    __callback;
    __schedule;
    __systems;
    __dispatcher;
    constructor(__callback, __schedule) {
        this.__callback = __callback;
        this.__schedule = __schedule;
    }
    __build(systems, name) {
        try {
            this.__systems = systems;
            this.__dispatcher = systems[0].dispatcher;
            this.__callback(this);
        }
        catch (e) {
            e.message = `Failed to build schedule in ${name}: ${e.message}`;
            throw e;
        }
    }
    /**
     * Returns a group that includes all the world's systems.
     */
    get allSystems() {
        return this.__dispatcher.defaultGroup;
    }
    /**
     * Forces this system to only execute on the main thread.  This is needed for systems that
     * interact with APIs only available in the main thread such as the DOM.
     * @returns The builder for chaining calls.
     */
    get onMainThread() {
        this.__checkNoLaneAssigned();
        this.__dispatcher.planner.mainLane?.add(...this.__systems);
        return this;
    }
    /**
     * Executes this system consistently on a single thread.  This is the default behavior to
     * accommodate systems with internal state.
     * @returns The builder for chaining calls.
     */
    get onOneThread() {
        this.__checkNoLaneAssigned();
        this.__dispatcher.planner.createLane().add(...this.__systems);
        return this;
    }
    /**
     * Replicates this system among multiple threads and execute it on any one of them, possibly a
     * different one each time.  This allows Becsy to better utilize available CPUs but requires the
     * system to be stateless (except for queries and attached systems).  Note that `prepare` and
     * `initialize` will be called on each replicated instance of the system!
     * @returns The builder for chaining calls.
     */
    get onManyThreads() {
        this.__checkNoLaneAssigned();
        this.__dispatcher.planner.replicatedLane?.add(...this.__systems);
        for (const system of this.__systems)
            system.stateless = true;
        return this;
    }
    __checkNoLaneAssigned() {
        if (this.__systems.some(system => system.lane)) {
            throw new CheckError(`Threading semantics already specified`);
        }
    }
    /**
     * Schedules this system before all the given ones (highest priority).  Any systems present in
     * both the receiver and the target are skipped.
     * @param systemTypes The systems or groups that this one should precede.
     * @returns The builder for chaining calls.
     */
    before(...systemTypes) {
        const thisSet = new Set(this.__systems);
        for (const type of systemTypes) {
            for (const other of this.__dispatcher.getSystems(type)) {
                if (thisSet.has(other))
                    continue;
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.addEdge(system, other, 5);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system after all the given ones (highest priority).  Any systems present in
     * both the receiver and the target are skipped.
     * @param systemTypes The systems or groups that this one should follow.
     * @returns The builder for chaining calls.
     */
    after(...systemTypes) {
        const thisSet = new Set(this.__systems);
        for (const type of systemTypes) {
            for (const other of this.__dispatcher.getSystems(type)) {
                if (thisSet.has(other))
                    continue;
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.addEdge(other, system, 5);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system in any order relative to the given ones (high priority).
     * @param systemTypes The systems or groups whose order doesn't matter relative to this one.
     * @returns The builder for chaining calls.
     */
    inAnyOrderWith(...systemTypes) {
        for (const type of systemTypes) {
            for (const other of this.__dispatcher.getSystems(type)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.denyEdge(system, other, 4);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system before all other systems that declared a read dependency on the given
     * component types (medium priority).
     * @param componentTypes The component types whose readers this system should precede.
     * @returns The builder for chaining calls.
     */
    beforeReadersOf(...componentTypes) {
        for (const componentType of componentTypes) {
            for (const other of this.__dispatcher.planner.readers.get(componentType)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.addEdge(system, other, 3);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system after all other systems that declared a read dependency on the given
     * component types (medium priority).
     * @param componentTypes The component types whose readers this system should follow.
     * @returns The builder for chaining calls.
     */
    afterReadersOf(...componentTypes) {
        for (const componentType of componentTypes) {
            for (const other of this.__dispatcher.planner.readers.get(componentType)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.addEdge(other, system, 3);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system before all other systems that declared a write dependency on the given
     * component types (medium priority).
     * @param componentTypes The component types whose writers this system should precede.
     * @returns The builder for chaining calls.
     */
    beforeWritersOf(...componentTypes) {
        for (const componentType of componentTypes) {
            for (const other of this.__dispatcher.planner.writers.get(componentType)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.addEdge(system, other, 3);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system after all other systems that declared a write dependency on the given
     * component types (medium priority).
     * @param componentTypes The component types whose writers this system should follow.
     * @returns The builder for chaining calls.
     */
    afterWritersOf(...componentTypes) {
        for (const componentType of componentTypes) {
            for (const other of this.__dispatcher.planner.writers.get(componentType)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.addEdge(other, system, 3);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system in any order relative to systems that declared a read dependency on the
     * given component types (low priority).
     * @param componentTypes The component types whose readers' order doesn't matter relative to this
     *  one.
     * @returns The builder for chaining calls.
     */
    inAnyOrderWithReadersOf(...componentTypes) {
        for (const componentType of componentTypes) {
            for (const other of this.__dispatcher.planner.readers.get(componentType)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.denyEdge(other, system, 2);
                }
            }
        }
        return this;
    }
    /**
     * Schedules this system in any order relative to systems that declared a write dependency on the
     * given component types (low priority).
     * @param componentTypes The component types whose writers' order doesn't matter relative to this
     *  one.
     * @returns The builder for chaining calls.
     */
    inAnyOrderWithWritersOf(...componentTypes) {
        for (const componentType of componentTypes) {
            for (const other of this.__dispatcher.planner.writers.get(componentType)) {
                for (const system of this.__systems) {
                    this.__dispatcher.planner.graph.denyEdge(other, system, 2);
                }
            }
        }
        return this;
    }
}
/**
 * A placeholder object returned from {@link System.schedule} with no public API.
 */
class Schedule {
}
class SystemGroupImpl {
    __contents;
    __plan;
    __executed = false;
    __systems;
    __scheduleBuilder;
    constructor(__contents) {
        this.__contents = __contents;
    }
    __collectSystems(dispatcher) {
        if (!this.__systems) {
            this.__systems = [];
            for (const item of this.__contents) {
                if (item instanceof Function && item.__system) {
                    this.__systems.push(dispatcher.systemsByClass.get(item));
                }
                else if (item instanceof SystemGroupImpl) {
                    this.__systems.push(...item.__collectSystems(dispatcher));
                }
            }
        }
        return this.__systems;
    }
    __buildSchedule() {
        this.__scheduleBuilder?.__build(this.__systems, `a group`);
        this.__scheduleBuilder = null;
    }
    /**
     * Creates scheduling constraints for all systems in the group; this works exactly as if the
     * call was made individually to every {@link System.schedule}.  Can be called at most once.
     * @param buildCallback A function that constrains the schedule using a small DSL.  See
     * {@link ScheduleBuilder} for the API.
     * @returns This group for chaining calls.
     */
    schedule(buildCallback) {
        if (this.__scheduleBuilder === null) {
            throw new CheckError(`Attempt to define group schedule after world initialized`);
        }
        if (this.__scheduleBuilder) {
            throw new CheckError(`Attempt to define multiple schedules in a group`);
        }
        this.__scheduleBuilder = new ScheduleBuilder(buildCallback, new Schedule());
        return this;
    }
}
class FrameImpl {
    dispatcher;
    groups;
    executing;
    time = now() / 1000;
    delta;
    constructor(dispatcher, groups) {
        this.dispatcher = dispatcher;
        this.groups = groups;
        if (groups.length === 0) {
            throw new CheckError('At least one system group needed');
        }
        for (const group of groups) {
            if (!dispatcher.systemGroups.includes(group)) {
                throw new CheckError('Some groups in the frame are not parts of the world defs');
            }
        }
    }
    /**
     * Indicates that execution of a frame has begun and locks in the default `time` and `delta`.
     * Must be called once at the beginning of each frame, prior to any calls to `execute`.  Must be
     * bookended by a call to `end`.
     *
     * You cannot call `begin` while any other executors are running.
     */
    async begin() {
        if (this.executing)
            throw new CheckError('Frame already executing');
        this.executing = true;
        const lastTime = this.dispatcher.lastTime ?? this.time;
        this.time = now() / 1000;
        this.delta = this.time - lastTime;
        this.dispatcher.startFrame(this.time);
    }
    /**
     * Indicates that execution of a frame has completed.  Must be called once at the end of each
     * frame, after any calls to `execute`.
     */
    async end() {
        if (!this.executing)
            throw new CheckError('Frame not executing');
        this.executing = false;
        allExecuted: {
            for (const group of this.groups)
                if (!group.__executed)
                    break allExecuted;
            for (const group of this.groups)
                group.__executed = false;
            this.dispatcher.completeCycle();
        }
        await this.dispatcher.completeFrame();
    }
    /**
     * Executes a group of systems.  If your world is single-threaded then execution is synchronous
     * and you can ignore the returned promise.
     *
     * You cannot execute individual systems, unless you create a singleton group to hold them.
     *
     * @param group The group of systems to execute.  Must be a member of the group list passed in
     * when this executor was created.
     *
     * @param time The time of this frame's execution.  This will be set on every system's `time`
     * property and defaults to the time when `begin` was called.  It's not used internally so you can
     * pass in any numeric value that's expected by your systems.
     *
     * @param delta The duration since the last frame's execution.  This will be set on every system's
     * `delta` property and default to the duration since any previous frame's `begin` was called.
     * It's not used internally so you can pass in any numeric value that's expected by your systems.
     */
    execute(group, time, delta) {
        if (!this.groups.includes(group)) {
            throw new CheckError('Group not included in this frame');
        }
        if (!this.executing)
            throw new CheckError('Frame not executing');
        return group.__plan.execute(time ?? this.time, delta ?? this.delta);
    }
}

/**
 * An exception thrown by coroutines when they've been canceled. You should normally rethrow it
 * from any catch blocks, and it will be caught and ignored at the top coroutine nesting level.
 */
class CanceledError extends Error {
    canceled = true;
    constructor() {
        super('Canceled');
    }
}
let currentCoroutine;
class CoroutineImpl {
    __generator;
    __fn;
    __supervisor;
    __cancellers = [];
    __blocker;
    __scope;
    __done = false;
    __awaited = false;
    __error;
    __value;
    __firstRun = true;
    constructor(__generator, __fn, __supervisor) {
        this.__generator = __generator;
        this.__fn = __fn;
        this.__supervisor = __supervisor;
    }
    __checkCancelation() {
        if (this.__done)
            return;
        for (const canceller of this.__cancellers) {
            if (canceller()) {
                this.cancel();
                break;
            }
        }
    }
    __step() {
        currentCoroutine = this; // eslint-disable-line @typescript-eslint/no-this-alias
        try {
            if (!this.__done && (this.__blocker?.isReady() ?? true)) {
                try {
                    let next;
                    if (this.__blocker?.error) {
                        next = this.__generator.throw(this.__blocker.error);
                    }
                    else if (this.__firstRun) {
                        try {
                            next = this.__generator.next(this.__blocker?.value);
                        }
                        finally {
                            this.__firstRun = false;
                            this.__supervisor.cancelMatching(this, this.__scope, this.__fn);
                        }
                    }
                    else {
                        next = this.__generator.next(this.__blocker?.value);
                    }
                    if (next.done) {
                        this.__done = true;
                        this.__value = next.value;
                        this.__blocker = undefined;
                    }
                    else {
                        this.__blocker = next.value;
                        this.__blocker?.markAwaited?.();
                    }
                }
                catch (e) {
                    this.__done = true;
                    if (!this.__error)
                        this.__error = e;
                    this.__blocker = undefined;
                }
            }
            if (this.__error && !(this.__awaited || this.__error instanceof CanceledError)) {
                throw this.__error;
            }
        }
        finally {
            currentCoroutine = undefined;
        }
    }
    // Waitable methods
    isReady() {
        return this.__done;
    }
    get value() {
        return this.__value;
    }
    get error() {
        return this.__error;
    }
    markAwaited() {
        this.__awaited = true;
    }
    // CurrentCoroutine methods
    waitForFrames(frames) {
        if (frames <= 0)
            throw new CheckError('Number of frames to wait for must be >0');
        return {
            isReady() { return --frames <= 0; }
        };
    }
    waitForSeconds(seconds) {
        const system = this.__supervisor.system;
        const targetTime = system.time + seconds;
        return {
            isReady() { return system.time >= targetTime; }
        };
    }
    waitUntil(condition) {
        return { isReady: condition };
    }
    // Coroutine methods
    cancel() {
        if (this.__blocker?.cancel) {
            this.__blocker.cancel();
        }
        else {
            this.__error = new CanceledError();
            this.__done = true;
        }
        return this;
    }
    cancelIf(condition) {
        this.__cancellers.push(condition);
        return this;
    }
    scope(entity) {
        if (this.__scope)
            throw new CheckError('Scope already set for this coroutine');
        if (this.__cancellers.length) {
            throw new CheckError('Scope must be set before any cancelation conditions');
        }
        this.__scope = entity;
        this.cancelIf(() => !entity.alive);
        return this;
    }
    cancelIfComponentMissing(type) {
        if (!this.__scope)
            throw new CheckError('Required scope not set for this coroutine');
        this.cancelIf(() => !this.__scope?.has(type));
        return this;
    }
    cancelIfCoroutineStarted(coroutineFn) {
        this.__supervisor.registerCancelIfStarted(this, this.__scope, coroutineFn === coDecorator.self ? this.__fn : coroutineFn);
        return this;
    }
    // We need to stub out all the Generator methods because we're overloading the type.  They must
    // not be called by the user, however.
    return(value) {
        throw new CheckError('Generator methods not available for coroutines');
    }
    throw(e) {
        throw new CheckError('Generator methods not available for coroutines');
    }
    next(...args) {
        throw new CheckError('Generator methods not available for coroutines');
    }
    [Symbol.iterator]() {
        throw new CheckError('Generator methods not available for coroutines');
    }
}
function coDecorator(target, name, descriptor) {
    const coroutine = descriptor.value;
    return {
        value(...args) {
            return this.start(coroutine, ...args);
        },
    };
}
coDecorator.waitForFrames = function (frames) {
    checkCurrentCoroutine();
    return currentCoroutine.waitForFrames(frames);
};
coDecorator.waitForSeconds = function (seconds) {
    checkCurrentCoroutine();
    return currentCoroutine.waitForSeconds(seconds);
};
coDecorator.waitUntil = function (condition) {
    checkCurrentCoroutine();
    return currentCoroutine.waitUntil(condition);
};
coDecorator.cancel = function () {
    checkCurrentCoroutine();
    currentCoroutine.cancel();
};
coDecorator.cancelIf = function (condition) {
    checkCurrentCoroutine();
    return currentCoroutine.cancelIf(condition);
};
coDecorator.scope = function (entity) {
    checkCurrentCoroutine();
    return currentCoroutine.scope(entity);
};
coDecorator.cancelIfComponentMissing = function (type) {
    checkCurrentCoroutine();
    return currentCoroutine.cancelIfComponentMissing(type);
};
coDecorator.cancelIfCoroutineStarted = function (coroutineFn) {
    checkCurrentCoroutine();
    return currentCoroutine.cancelIfCoroutineStarted(coroutineFn);
};
coDecorator.self = function* () { yield; };
function checkCurrentCoroutine() {
    if (!currentCoroutine)
        throw new CheckError('Cannot call co methods outside coroutine context');
}
/**
 * This object can be used in two ways:
 * 1. As a decorator, to wrap coroutine methods in a call to {@link System.start} so you can invoke
 * them directly.
 * 2. As a handle to the currently executing coroutine, so you can invoke coroutine control methods
 * from within the coroutine's code.
 */
const co = coDecorator;
class Supervisor {
    system;
    coroutines = [];
    mutuallyExclusiveCoroutines = new Map();
    constructor(system) {
        this.system = system;
    }
    start(coroutineFn, ...args) {
        const coroutine = new CoroutineImpl(coroutineFn.apply(this.system, args), coroutineFn, this);
        this.coroutines.push(coroutine);
        return coroutine;
    }
    execute() {
        // Execute in reverse order, so that the most recently started coroutines execute first.  That
        // way, if coroutine A started coroutine B and is waiting for it to complete, it will resume in
        // the same frame as B finishes rather than having to wait for another go-around. At the same
        // time, if new coroutines are started while we're processing, keep iterating to execute the
        // extra ones within the same frame.
        let processedLength = 0;
        while (processedLength < this.coroutines.length) {
            const endIndex = processedLength;
            processedLength = this.coroutines.length;
            for (let i = processedLength - 1; i >= endIndex; i--) {
                this.system.accessRecentlyDeletedData(false);
                this.coroutines[i].__checkCancelation();
            }
            for (let i = processedLength - 1; i >= endIndex; i--) {
                this.system.accessRecentlyDeletedData(false);
                const coroutine = this.coroutines[i];
                coroutine.__step();
                if (coroutine.isReady()) {
                    this.coroutines.splice(i, 1);
                    processedLength -= 1;
                }
            }
        }
    }
    registerCancelIfStarted(targetCoroutine, scope, coroutineFn) {
        const key = (scope?.__id ?? '') + (coroutineFn?.name ?? '');
        if (!this.mutuallyExclusiveCoroutines.has(key))
            this.mutuallyExclusiveCoroutines.set(key, []);
        this.mutuallyExclusiveCoroutines.get(key)?.push(targetCoroutine);
    }
    cancelMatching(startingCoroutine, scope, coroutineFn) {
        this.cancelMatchingKey(startingCoroutine, '');
        this.cancelMatchingKey(startingCoroutine, coroutineFn.name);
        if (scope) {
            this.cancelMatchingKey(startingCoroutine, '' + scope.__id);
            this.cancelMatchingKey(startingCoroutine, '' + scope.__id + coroutineFn.name);
        }
    }
    cancelMatchingKey(requestingCoroutine, key) {
        const coroutines = this.mutuallyExclusiveCoroutines.get(key);
        if (coroutines) {
            let hasRequesting = false;
            for (const coroutine of coroutines) {
                if (coroutine === requestingCoroutine) {
                    hasRequesting = true;
                }
                else {
                    coroutine.cancel();
                }
            }
            coroutines.length = 0;
            if (hasRequesting)
                coroutines.push(requestingCoroutine);
        }
    }
}

var RunState;
(function (RunState) {
    RunState[RunState["RUNNING"] = 0] = "RUNNING";
    RunState[RunState["STOPPED"] = 1] = "STOPPED";
})(RunState || (RunState = {}));
class SingletonPlaceholder {
    access;
    type;
    initialValues;
    constructor(access, type, initialValues) {
        this.access = access;
        this.type = type;
        this.initialValues = initialValues;
    }
}
class AttachPlaceholder {
    type;
    constructor(type) {
        this.type = type;
    }
}
// TODO: support HMR for systems
/**
 * An encapsulated piece of functionality for your app that executes every frame, typically by
 * iterating over some components returned by a query.
 *
 * You should subclass and implement {@link System.execute} at a minimum, but take a look at the
 * other methods as well.
 */
class System {
    static __system = true;
    /**
     * Create a group of systems that can be scheduled collectively, or used in
     * {@link World.createCustomExecutor} to execute a subset of all the system in a frame. The group
     * needs to be included in the world's defs, which will also automatically include all its member
     * systems.
     * @param systemTypes System classes to include in the group, each optionally followed by an
     *  object to initialize the system's properties.  A system can be a member of more than one
     *  group.
     * @returns A group of the given systems.
     */
    static group(...systemTypes) {
        return new SystemGroupImpl(systemTypes);
    }
    __queryBuilders = [];
    __scheduleBuilder;
    __attachPlaceholders = [];
    __singletonPlaceholders = [];
    __supervisor = new Supervisor(this);
    __dispatcher;
    /**
     * A numeric ID, unique for systems within a world, that you can use for your own purposes.  Don't
     * change it!
     */
    id;
    /**
     * The time that execution of the current frame was started. See {@link World.execute} for
     * details.
     * @typedef {}
     */
    time;
    /**
     * The duration between the execution times of the current and previous frames.  See
     * {@link World.execute} for details.
     */
    delta;
    /**
     * This system's name, as used in error messages and stats reports.
     */
    get name() { return this.constructor.name; }
    // TODO: add an API for making immediate queries
    /**
     * Creates a persistent query for this system.  Can only be called from the constructor, typically
     * by initializing an instance property.
     *
     * Each query is automatically updated each frame immediately before the system executes.
     * @example
     * entities = this.query(q => q.all.with(ComponentFoo).write);
     * execute() {
     *   for (const entity of this.entities) {
     *     entity.write(ComponentFoo).bar += 1;
     *   }
     * }
     * @param buildCallback A function that builds the actual query using a small DSL.  See
     * {@link QueryBuilder} for the API.
     * @returns A live query that you can reference from the `execute` method.  It's also OK to read
     * a query from other attached systems, but note that it will only be updated prior to its host
     * system's execution.
     */
    query(buildCallback) {
        const query = new Query();
        const builder = new QueryBuilder(buildCallback, query);
        if (!this.__queryBuilders) {
            throw new CheckError(`Attempt to create a new query after world initialized in system ${this.name}`);
        }
        this.__queryBuilders.push(builder);
        return query;
    }
    /**
     * Creates scheduling constraints for this system that will help determine its assignment to a
     * thread and the order of execution.  Can be called at most once, and only from the constructor,
     * typically by initializing an instance property.
     * @example
     * sked = this.schedule(s => s.beforeWritesTo(ComponentFoo).after(SystemBar));
     * @param buildCallback A function that constrains the schedule using a small DSL.  See
     * {@link ScheduleBuilder} for the API.
     * @returns A schedule placeholder object with no public API.
     */
    schedule(buildCallback) {
        if (this.__scheduleBuilder === null) {
            throw new CheckError(`Attempt to define schedule after world initialized in system ${this.name}`);
        }
        if (this.__scheduleBuilder) {
            throw new CheckError(`Attempt to define multiple schedules in system ${this.name}`);
        }
        const schedule = new Schedule();
        this.__scheduleBuilder = new ScheduleBuilder(buildCallback, schedule);
        return schedule;
    }
    /**
     * Creates a reference to another system in the world, that you can then use in your `initialize`
     * or `execute` methods.  Be careful not to abuse this feature as it will force all systems that
     * reference each other to be located in the same thread when using multithreading, possibly
     * limiting performance.  Can only be called from the constructor, typically by initializing an
     * instance property.
     * @example
     * foo = this.attach(SystemFoo);
     * @param systemType The type of the system to reference.
     * @returns The unique instance of the system of the given type that exists in the world.
     */
    attach(systemType) {
        if (!this.__attachPlaceholders) {
            throw new CheckError(`Attempt to attach a system after world initialized in system ${this.name}`);
        }
        const placeholder = new AttachPlaceholder(systemType);
        this.__attachPlaceholders.push(placeholder);
        return placeholder;
    }
    /**
     * Creates a new entity.  It works just like {@link World.createEntity} but returns the newly
     * created entity.  You *must not* retain a direct reference to the entity past the end of the
     * `execute` method.
     * @param initialComponents The types of the components to add to the new entity, optionally
     * interleaved with their initial properties.
     * @returns The newly created entity.
     */
    createEntity(...initialComponents) {
        return this.__dispatcher.createEntity(initialComponents);
    }
    /**
     * Enables or disables access to recently deleted data.  When turned on, you'll be able to read
     * components that were removed since the system's last execution, as well as references and
     * back references to entities deleted in the same time frame.
     * @param toggle Whether to turn access to recently deleted data on or off.
     */
    accessRecentlyDeletedData(toggle = true) {
        this.__dispatcher.registry.includeRecentlyDeleted = toggle;
    }
    /**
     * Starts running a coroutine.  The coroutine will execute after each time this system does and
     * run until its next `yield` expression.  You can start coroutines anytime: from within
     * `initialize` or `execute`, from within a coroutine, or even from an event handler between
     * frames.  Coroutines started from within `execute` will begin running in the same frame.  The
     * execution order of coroutines within a system is unspecified and you should not depend on it.
     *
     * If you're using the {@link co} decorator you don't need call this method manually, it'll be
     * handled for you.
     *
     * Inside the coroutine, you can call methods on {@link co} to control the execution of the
     * coroutine.  You can `yield` on the result of the various `co.wait` methods, and also `yield`
     * directly on the result of starting another coroutine to wait for its returned value.
     *
     * @param generator The generator returned by a coroutine method.
     * @param coroutineFn The coroutine being started, to be used with
     *    {@link Coroutine.cancelIfCoroutineStarted}.
     * @returns A coroutine handle that you can use to control it.
     */
    start(coroutineFn, ...args) {
        // TODO: disable coroutines if system is stateless
        return this.__supervisor.start(coroutineFn, ...args);
    }
    /**
     * Prepares any data or other structures needed by the system; to be implemented in a subclass and
     * invoked automatically precisely once when the world is created.  This method is not allowed to
     * create entities or access components.  Instead, it should set any needed data on the system's
     * properties to be used in `initialize`, which will be called afterwards.
     */
    async prepare() { } // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Initializes the system; to be implemented in a subclass and invoked automatically precisely
     * once when the world is created and after the system has been prepared.  This method is allowed
     * to access the components as declared in the system's queries.
     */
    initialize() { } // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Executes the system's function; to be implemented in a subclass and invoked automatically at
     * regular intervals.
     */
    execute() { } // eslint-disable-line @typescript-eslint/no-empty-function
    /**
     * Finalizes the system; to be implemented in a subclass and invoked automatically precisely
     * once when the world is terminated.  This method is allowed to access the components as declared
     * in the system's queries.
     */
    finalize() { } // eslint-disable-line @typescript-eslint/no-empty-function
}
Object.defineProperty(System.prototype, 'singleton', {
    get() {
        const self = this; // eslint-disable-line @typescript-eslint/no-this-alias
        const singleton = {
            read(type) {
                if (!self.__singletonPlaceholders) {
                    throw new CheckError(`Attempt to declare a singleton after world initialized in system ${self.name}`);
                }
                declareSingleton(type);
                self.query(q => q.using(type).read);
                const placeholder = new SingletonPlaceholder('read', type);
                self.__singletonPlaceholders.push(placeholder);
                return placeholder;
            },
            write(type, initialValues) {
                if (!self.__singletonPlaceholders) {
                    throw new CheckError(`Attempt to declare a singleton after world initialized in system ${self.name}`);
                }
                declareSingleton(type);
                self.query(q => q.using(type).write);
                const placeholder = new SingletonPlaceholder('write', type, initialValues);
                self.__singletonPlaceholders.push(placeholder);
                return placeholder;
            }
        };
        Object.defineProperty(this, 'singleton', { value: singleton, configurable: true });
        return singleton;
    }
});
class SystemBox {
    system;
    dispatcher;
    get id() { return this.system.id; }
    get name() { return this.system.name; }
    toString() { return this.name; }
    constructor(system, dispatcher) {
        this.system = system;
        this.dispatcher = dispatcher;
        system.__dispatcher = dispatcher;
        this.accessMasks = { read: [], update: [], create: [], write: [], check: [] };
        this.shapeQueries = [];
        this.shapeQueriesByComponent = [];
        this.writeQueries = [];
        this.writeQueriesByComponent = [];
        this.state = RunState.RUNNING;
        this.propsAssigned = false;
        this.stateless = false;
        this.weight = 1;
        this.shapeLogPointer = dispatcher.shapeLog.createPointer();
        this.stats = dispatcher.stats.forSystem(system.constructor);
        this.attachedSystems = this.system.__attachPlaceholders.map(placeholder => this.dispatcher.systemsByClass.get(placeholder.type));
        this.singletonComponentDefs = this.system.__singletonPlaceholders.flatMap(placeholder => {
            return placeholder.initialValues ?
                [placeholder.type, placeholder.initialValues] : [placeholder.type];
        });
        this.singletonStandingWrites = this.system.__singletonPlaceholders
            .filter(placeholder => placeholder.access === 'write')
            .map(placeholder => placeholder.type);
    }
    assignProps(props) {
        if (this.propsAssigned) {
            throw new CheckError(`System ${this.name} has multiple props assigned in world defs`);
        }
        Object.assign(this.system, props);
        this.propsAssigned = true;
    }
    buildQueries() {
        for (const builder of this.system.__queryBuilders)
            builder.__build(this);
        this.system.__queryBuilders = null;
        this.hasNegativeQueries = !!this.shapeQueriesByComponent[this.dispatcher.registry.Alive.id];
        this.hasWriteQueries = !!this.writeQueries.length;
        this.hasTransientQueries = this.shapeQueries.some(query => query.hasTransientResults);
    }
    buildSchedule() {
        const staticScheduler = this.system.constructor.__staticScheduler;
        if (staticScheduler)
            this.system.schedule(staticScheduler);
        this.system.__scheduleBuilder?.__build([this], `system ${this.name}`);
        this.system.__scheduleBuilder = null;
    }
    finishConstructing() {
        this.writeLogPointer = this.dispatcher.writeLog?.createPointer();
        this.singletonStandingWrites =
            this.singletonStandingWrites.filter(type => type.__binding.trackedWrites);
    }
    replacePlaceholders() {
        const openSystem = this.system;
        for (const prop in this.system) {
            const value = openSystem[prop];
            if (value instanceof AttachPlaceholder) {
                const targetSystemType = value.type;
                const targetSystem = this.dispatcher.systemsByClass.get(targetSystemType);
                if (!targetSystem) {
                    throw new CheckError(`Attached system ${targetSystemType.name} not defined in this world`);
                }
                openSystem[prop] = targetSystem.system;
            }
            else if (value instanceof SingletonPlaceholder) {
                openSystem[prop] = this.dispatcher.singleton[value.access](value.type);
            }
        }
        this.system.__attachPlaceholders = null;
        this.system.__singletonPlaceholders = null;
        if (this.dispatcher.singleton) {
            Object.defineProperty(this.system, 'singleton', { value: this.dispatcher.singleton });
        }
    }
    prepare() {
        return this.system.prepare();
    }
    initialize() {
        this.dispatcher.registry.executingSystem = this;
        this.system.initialize();
        this.trackStandingWrites();
    }
    finalize() {
        this.dispatcher.registry.executingSystem = this;
        this.system.finalize();
        this.trackStandingWrites();
    }
    execute(time, delta) {
        if (this.state !== RunState.RUNNING)
            return;
        this.dispatcher.registry.executingSystem = this;
        this.system.time = time;
        this.system.delta = delta;
        let time1, time2, time3, time4;
        time1 = now();
        this.runQueries();
        time2 = now();
        this.system.execute();
        time3 = now();
        this.system.__supervisor.execute();
        this.trackStandingWrites();
        time4 = now();
        {
            this.stats.lastQueryUpdateDuration = time2 - time1;
            this.stats.lastExecutionDuration = time3 - time2;
            this.stats.lastCoroutinesDuration = time4 - time3;
        }
    }
    trackStandingWrites() {
        const singleton = this.dispatcher.singleton;
        for (const type of this.singletonStandingWrites) {
            this.dispatcher.registry.trackWrite(singleton.__id, type);
        }
    }
    runQueries() {
        const ranQueriesLastFrame = this.ranQueriesLastFrame;
        this.ranQueriesLastFrame = false;
        const shapesChanged = this.dispatcher.shapeLog.hasUpdatesSince(this.shapeLogPointer);
        const writesMade = this.hasWriteQueries &&
            this.dispatcher.writeLog.hasUpdatesSince(this.writeLogPointer);
        if (shapesChanged || writesMade || this.hasTransientQueries && ranQueriesLastFrame) {
            if (this.hasTransientQueries) {
                // Every write query is a shape query too.
                for (const query of this.shapeQueries)
                    query.clearTransientResults();
            }
            if (shapesChanged || writesMade) {
                this.ranQueriesLastFrame = true;
                if (shapesChanged)
                    this.__updateShapeQueries();
                if (writesMade)
                    this.__updateWriteQueries();
                for (const query of this.shapeQueries)
                    query.sort();
            }
        }
    }
    __updateShapeQueries() {
        const shapeLog = this.dispatcher.shapeLog;
        if (!this.shapeQueries.length) {
            shapeLog.createPointer(this.shapeLogPointer);
            return;
        }
        for (const query of this.shapeQueries)
            query.clearProcessedEntities();
        let queries, runLength = 0;
        let log, startIndex, endIndex;
        while (true) {
            [log, startIndex, endIndex] = shapeLog.processSince(this.shapeLogPointer);
            if (!log)
                break;
            if (runLength && !queries) {
                startIndex += runLength;
                runLength = 0;
            }
            for (let i = startIndex; i < endIndex; i++) {
                const entry = log[i];
                const entityId = (entry & ENTITY_ID_MASK);
                if (!queries) {
                    const typeId = (entry >>> ENTITY_ID_BITS) & COMPONENT_ID_MASK;
                    const runHeader = entry & 2 ** 31;
                    queries = this.shapeQueriesByComponent[typeId];
                    if (runHeader) {
                        runLength = entityId;
                        if (!queries) {
                            const skip = Math.min(runLength, endIndex - i);
                            i += skip;
                            runLength -= skip;
                        }
                        continue;
                    }
                    if (!queries)
                        continue;
                    runLength = 1;
                }
                if (entry & 2 ** 31) {
                    throw new InternalError('Trying to process run header as entry in shape log');
                }
                for (let j = 0; j < queries.length; j++)
                    queries[j].handleShapeUpdate(entityId);
                if (--runLength === 0)
                    queries = undefined;
            }
        }
    }
    __updateWriteQueries() {
        const writeLog = this.dispatcher.writeLog;
        if (!this.writeQueries.length) {
            writeLog.createPointer(this.writeLogPointer);
            return;
        }
        let queries, runLength = 0;
        let componentFlagOffset, componentFlagMask;
        let log, startIndex, endIndex;
        while (true) {
            [log, startIndex, endIndex] = writeLog.processSince(this.writeLogPointer);
            if (!log)
                break;
            if (runLength && !queries) {
                startIndex += runLength;
                runLength = 0;
            }
            for (let i = startIndex; i < endIndex; i++) {
                const entry = log[i];
                const entityId = (entry & ENTITY_ID_MASK);
                if (!queries) {
                    const typeId = (entry >>> ENTITY_ID_BITS) & COMPONENT_ID_MASK;
                    const runHeader = entry & 2 ** 31;
                    // Manually recompute flag offset and mask instead of looking up component type.
                    componentFlagOffset = typeId >> 5;
                    componentFlagMask = 1 << (typeId & 31);
                    queries = this.writeQueriesByComponent[typeId];
                    if (runHeader) {
                        runLength = entityId;
                        if (!queries) {
                            const skip = Math.min(runLength, endIndex - i);
                            i += skip;
                            runLength -= skip;
                        }
                        continue;
                    }
                    if (!queries)
                        continue;
                    runLength = 1;
                }
                if (entry & 2 ** 31) {
                    throw new InternalError('Trying to process run header as entry in write log');
                }
                for (let j = 0; j < queries.length; j++) {
                    queries[j].handleWrite(entityId, componentFlagOffset, componentFlagMask);
                }
                if (--runLength === 0)
                    queries = undefined;
            }
        }
    }
    stop() {
        if (this.state === RunState.STOPPED)
            return;
        this.state = RunState.STOPPED;
        for (const query of this.shapeQueries)
            query.clearAllResults();
    }
    restart() {
        if (this.state === RunState.STOPPED) {
            const registry = this.dispatcher.registry;
            const Alive = registry.Alive;
            for (const query of this.shapeQueries)
                query.clearProcessedEntities();
            for (let id = 0; id < this.dispatcher.maxEntities; id++) {
                if (registry.hasShape(id, Alive, false)) {
                    for (const query of this.shapeQueries)
                        query.handleShapeUpdate(id);
                }
            }
            for (const query of this.shapeQueries) {
                query.clearTransientResults();
                query.sort();
            }
            this.dispatcher.shapeLog.createPointer(this.shapeLogPointer);
            this.dispatcher.writeLog?.createPointer(this.writeLogPointer);
        }
        this.state = RunState.RUNNING;
    }
}

class ComponentEnum {
    name;
    __types;
    __binding;
    constructor(name, types) {
        this.name = name;
        this.__types = Array.from(new Set(types));
    }
}

const HEADER_LENGTH = 2;
class UnsharedPool {
    maxItems;
    configParamName;
    // layout: length, mark, ...uints
    data;
    constructor(maxItems, configParamName) {
        this.maxItems = maxItems;
        this.configParamName = configParamName;
        this.data = new Uint32Array(new ArrayBuffer((maxItems + HEADER_LENGTH) * Uint32Array.BYTES_PER_ELEMENT));
    }
    get length() {
        return this.data[0];
    }
    take() {
        const length = --this.data[0];
        if (length < 0) {
            throw new RangeError(`Pool capacity exceeded, please raise ${this.configParamName} above ${this.maxItems}`);
        }
        return this.data[length + HEADER_LENGTH];
    }
    return(id) {
        if (this.length >= this.maxItems) {
            throw new InternalError('Internal error, returned entity ID exceeded pool capacity');
        }
        this.data[this.length + HEADER_LENGTH] = id;
        this.data[0] += 1;
    }
    mark() {
        this.data[1] = this.data[0];
    }
    peekSinceMark(index) {
        const i = this.data[1] + index;
        if (i < this.data[0])
            return this.data[i + HEADER_LENGTH];
    }
    refill(source) {
        if (!source.length)
            return;
        const length = this.length;
        const newLength = length + source.length;
        if (newLength > this.maxItems) {
            throw new InternalError('Internal error, returned entity ID exceeded pool capacity');
        }
        this.data.set(source, length + HEADER_LENGTH);
        this.data[0] = newLength;
    }
    fillWithDescendingIntegers(first) {
        const lowerBound = this.length + HEADER_LENGTH;
        for (let i = this.data.length - 1; i >= lowerBound; i--) {
            this.data[i] = first++;
        }
        this.data[0] = this.data.length - HEADER_LENGTH;
    }
}
/**
 * A shared pool of u32's that uses atomic operations to deconflict concurrent callers of `take`.
 * The `return` method is not threadsafe.
 */
class SharedAtomicPool {
    maxItems;
    configParamName;
    // layout: length, mark, ...uints
    data;
    constructor(maxItems, configParamName, buffers) {
        this.maxItems = maxItems;
        this.configParamName = configParamName;
        buffers.register(`pool.${configParamName}`, maxItems + HEADER_LENGTH, Uint32Array, (data) => { this.data = data; });
    }
    get length() {
        return this.data[0];
    }
    take() {
        const length = Atomics.sub(this.data, 0, 1);
        if (length < 0) {
            throw new RangeError(`Pool capacity exceeded, please raise ${this.configParamName} above ${this.maxItems}`);
        }
        return this.data[length + HEADER_LENGTH];
    }
    return(id) {
        if (this.length >= this.maxItems) {
            throw new InternalError('Internal error, returned entity ID exceeded pool capacity');
        }
        this.data[this.length + HEADER_LENGTH] = id;
        this.data[0] += 1;
    }
    mark() {
        this.data[1] = this.data[0];
    }
    peekSinceMark(index) {
        const i = this.data[1] + index;
        if (i < this.data[0])
            return this.data[i + HEADER_LENGTH];
    }
    refill(source) {
        if (!source.length)
            return;
        const length = this.length;
        const newLength = length + source.length;
        if (newLength > this.maxItems) {
            throw new InternalError('Internal error, returned entity ID exceeded pool capacity');
        }
        this.data.set(source, length + HEADER_LENGTH);
        this.data[0] = newLength;
    }
    fillWithDescendingIntegers(first) {
        const lowerBound = this.length + HEADER_LENGTH;
        for (let i = this.data.length - 1; i >= lowerBound; i--) {
            this.data[i] = first++;
        }
        this.data[0] = this.data.length - HEADER_LENGTH;
    }
}

class UnsharedShapeArray {
    stride;
    array;
    constructor(bufferKey, numBits, maxEntities, buffers) {
        this.stride = Math.ceil(numBits / 32);
        buffers.register(bufferKey, maxEntities * this.stride, Uint32Array, shapes => { this.array = shapes; });
    }
    syncThreads() {
        // no-op
    }
    set(entityId, type) {
        const binding = type.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        const value = binding.shapeValue;
        this.array[index] &= ~mask;
        this.array[index] |= value;
    }
    unset(entityId, type) {
        const binding = type.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        this.array[index] &= ~mask;
    }
    isSet(entityId, type) {
        const binding = type.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        const value = binding.shapeValue;
        return (this.array[index] & mask) === value;
    }
    get(entityId, enumeration) {
        const binding = enumeration.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        return (this.array[index] & mask) >>> binding.shapeShift;
    }
    clear() {
        this.array.fill(0);
    }
    match(entityId, positiveMask, positiveValues) {
        if (positiveMask.length !== positiveValues.length) {
            throw new InternalError(`Mismatched mask and value lengths: ${positiveMask.length} vs ${positiveValues.length}`);
        }
        const array = this.array;
        const index = entityId * this.stride;
        for (let i = 0; i < positiveMask.length; i++) {
            if ((array[index + i] & positiveMask[i]) !== positiveValues[i])
                return false;
        }
        return true;
    }
    matchNot(entityId, negativeMask) {
        const array = this.array;
        const index = entityId * this.stride;
        for (let i = 0; i < negativeMask.length; i++) {
            if ((array[index + i] & negativeMask[i]) !== 0)
                return false;
        }
        return true;
    }
    matchAny(entityId, trackingMask) {
        trackingMask.changed = false;
        const mask = trackingMask.mask;
        const lastMatch = trackingMask.lastMatches[entityId] = trackingMask.lastMatches[entityId] || [];
        const array = this.array;
        const index = entityId * this.stride;
        let ok = false;
        for (let i = 0; i < mask.length; i++) {
            const masked = array[index + i] & mask[i];
            if (masked !== 0)
                ok = true;
            if (masked !== lastMatch[i])
                trackingMask.changed = true;
            lastMatch[i] = masked;
        }
        if (!ok)
            delete trackingMask.lastMatches[entityId];
        return ok;
    }
}
class AtomicSharedShapeArray {
    stride;
    array;
    constructor(bufferKey, numBits, maxEntities, buffers) {
        this.stride = Math.ceil(numBits / 32);
        buffers.register(bufferKey, maxEntities * this.stride, Uint32Array, shapes => { this.array = shapes; });
    }
    syncThreads() {
        // We assume that any atomic operation will force a write barrier on the whole array.
        Atomics.load(this.array, 0);
    }
    set(entityId, type) {
        const binding = type.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        const value = binding.shapeValue;
        if (mask !== value)
            Atomics.and(this.array, index, ~mask);
        Atomics.or(this.array, index, value);
    }
    unset(entityId, type) {
        const binding = type.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        Atomics.and(this.array, index, ~mask);
    }
    isSet(entityId, type) {
        const binding = type.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        const value = binding.shapeValue;
        // Entity liveness flag can be written at any time from any thread, so do atomic check.
        if (type.id === 0)
            return (Atomics.load(this.array, index) & mask) === value;
        return (this.array[index] & mask) === value;
    }
    get(entityId, enumeration) {
        const binding = enumeration.__binding;
        const index = entityId * this.stride + binding.shapeOffset;
        const mask = binding.shapeMask;
        return (this.array[index] & mask) >>> binding.shapeShift;
    }
    clear() {
        this.array.fill(0);
    }
    match(entityId, positiveMask, positiveValues) {
        if (positiveMask.length !== positiveValues.length) {
            throw new InternalError(`Mismatched mask and value lengths: ${positiveMask.length} vs ${positiveValues.length}`);
        }
        const array = this.array;
        const index = entityId * this.stride;
        for (let i = 0; i < positiveMask.length; i++) {
            if ((array[index + i] & positiveMask[i]) !== positiveValues[i])
                return false;
        }
        return true;
    }
    matchNot(entityId, negativeMask) {
        const array = this.array;
        const index = entityId * this.stride;
        for (let i = 0; i < negativeMask.length; i++) {
            if ((array[index + i] & negativeMask[i]) !== 0)
                return false;
        }
        return true;
    }
    matchAny(entityId, trackingMask) {
        trackingMask.changed = false;
        const mask = trackingMask.mask;
        const lastMatch = trackingMask.lastMatches[entityId] = trackingMask.lastMatches[entityId] || [];
        const array = this.array;
        const index = entityId * this.stride;
        for (let i = 0; i < mask.length; i++) {
            const masked = array[index + i] & mask[i];
            if (masked === 0) {
                delete trackingMask.lastMatches[entityId];
                return false;
            }
            if (masked !== lastMatch[i])
                trackingMask.changed = true;
            lastMatch[i] = masked;
        }
        return true;
    }
}

const SYSTEM_ERROR_TYPES = [
    EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError,
    CheckError, InternalError
];
class EntityPool {
    registry;
    borrowed; // indexed by id
    borrowCounts; // indexed by id
    spares = [];
    temporarilyBorrowedIds = [];
    constructor(registry, maxEntities) {
        this.registry = registry;
        this.borrowed = Array.from({ length: maxEntities });
        this.borrowCounts = new Int32Array(maxEntities);
    }
    borrow(id) {
        this.borrowCounts[id] += 1;
        let entity = this.borrowed[id];
        if (!entity) {
            entity = this.borrowed[id] = this.spares.pop() ?? new EntityImpl(this.registry);
            entity.__id = id;
        }
        return entity;
    }
    borrowTemporarily(id) {
        const entity = this.borrow(id);
        this.temporarilyBorrowedIds.push(id);
        return entity;
    }
    returnTemporaryBorrows() {
        for (const id of this.temporarilyBorrowedIds)
            this.return(id);
        this.temporarilyBorrowedIds.length = 0;
    }
    return(id) {
        {
            if (!this.borrowCounts[id]) {
                throw new InternalError('Returning entity with no borrows');
            }
        }
        if (--this.borrowCounts[id] <= 0) {
            const entity = this.borrowed[id];
            this.borrowed[id] = undefined;
            {
                entity.__valid = false;
                return;
            }
        }
    }
}
class Registry {
    types;
    enums;
    dispatcher;
    allocationItems;
    numShapeBits = 0;
    shapes;
    staleShapes;
    removedShapes;
    entityIdPool;
    pool;
    heldEntities;
    validators;
    reshapedEntityIds = [];
    validateSystem;
    executingSystem;
    includeRecentlyDeleted = false;
    hasNegativeQueries = false;
    nextEntityOrdinal = 0;
    entityOrdinals;
    removalLog;
    prevRemovalPointer;
    oldRemovalPointer;
    Alive = class Alive {
        static __internal = true;
    };
    constructor(maxEntities, maxLimboComponents, types, enums, dispatcher) {
        this.types = types;
        this.enums = enums;
        this.dispatcher = dispatcher;
        this.allocationItems = this.prepareComponentTypesAndEnums();
        for (const item of this.allocationItems)
            this.numShapeBits += item.size;
        const ShapeArrayClass = dispatcher.threaded ? AtomicSharedShapeArray : UnsharedShapeArray;
        this.shapes = new ShapeArrayClass('registry.shapes', this.numShapeBits, maxEntities, dispatcher.buffers);
        this.staleShapes = new ShapeArrayClass('registry.staleShapes', this.numShapeBits, maxEntities, dispatcher.buffers);
        this.removedShapes = new ShapeArrayClass('registry.removedShapes', this.numShapeBits, maxEntities, dispatcher.buffers);
        this.entityIdPool = dispatcher.threaded ?
            new SharedAtomicPool(maxEntities, 'maxEntities', dispatcher.buffers) :
            new UnsharedPool(maxEntities, 'maxEntities');
        this.entityOrdinals = dispatcher.buffers.register('registry.entityOrdinals', maxEntities, Uint32Array, array => { this.entityOrdinals = array; });
        this.entityIdPool.fillWithDescendingIntegers(0);
        this.pool = new EntityPool(this, maxEntities);
        this.heldEntities = [];
        this.validators = [];
        this.removalLog = new Log(maxLimboComponents, 'maxLimboComponents', dispatcher.buffers);
        this.prevRemovalPointer = this.removalLog.createPointer();
        this.oldRemovalPointer = this.removalLog.createPointer();
    }
    initializeComponentTypes() {
        // Two-phase init, so components can have dependencies on each other's fields.
        let bitIndex = 0, typeId = 0;
        while (this.allocationItems.length) {
            const shift = bitIndex % 32;
            const item = this.removeBiggestNoLargerThan(32 - shift);
            if (!item) {
                bitIndex += 32 - shift;
                continue;
            }
            const shapeSpec = {
                offset: bitIndex >>> 5, mask: ((1 << item.size) - 1) << shift, value: 1 << shift
            };
            bitIndex += item.size;
            if (item.typeOrEnum instanceof ComponentEnum) {
                const enumeration = item.typeOrEnum;
                enumeration.__binding = {
                    shapeOffset: shapeSpec.offset, shapeMask: shapeSpec.mask, shapeShift: shift
                };
                for (const type of enumeration.__types) {
                    assimilateComponentType(typeId++, type, shapeSpec, this.dispatcher);
                    if (type.validate)
                        this.validators.push(type);
                    shapeSpec.value += 1 << shift;
                }
            }
            else {
                const type = item.typeOrEnum;
                assimilateComponentType(typeId++, type, shapeSpec, this.dispatcher);
                if (type.validate)
                    this.validators.push(type);
            }
        }
        for (const type of this.types)
            defineAndAllocateComponentType(type);
        {
            const aliveBinding = this.Alive.__binding;
            if (!(aliveBinding.shapeOffset === 0 && aliveBinding.shapeMask === 1 &&
                aliveBinding.shapeValue === 1)) {
                throw new InternalError('Alive component was not assigned first available shape mask');
            }
        }
    }
    prepareComponentTypesAndEnums() {
        const pool = [];
        const enumTypes = new Set();
        const typeNames = new Set();
        let anonymousTypeCounter = 0;
        for (const type of this.types) {
            if (!type.name) {
                Object.defineProperty(type, 'name', { value: `Anonymous_${anonymousTypeCounter++}` });
            }
            if (!type.__internal) {
                if (typeNames.has(type.name)) {
                    throw new CheckError(`Multiple component types named ${type.name}; names must be unique`);
                }
                typeNames.add(type.name);
            }
            if (type.enum) {
                if (!this.enums.includes(type.enum)) {
                    throw new CheckError(`Component type ${type.name} references an enum that's not in the world's defs`);
                }
                if (!type.enum.__types.includes(type))
                    type.enum.__types.push(type);
            }
            this.dispatcher.stats.forComponent(type);
        }
        for (const enumeration of this.enums) {
            if (enumeration.__types.length > 2 ** 31) {
                throw new CheckError(`Too many types in enum: ${enumeration.__types.length}`);
            }
            pool.push({
                // +1 for the implicit null value of every enum
                typeOrEnum: enumeration, size: Math.ceil(Math.log2(enumeration.__types.length + 1))
            });
            for (const type of enumeration.__types) {
                if (enumTypes.has(type)) {
                    throw new CheckError(`Component type ${type.name} is a member of more than one enum`);
                }
                type.enum = enumeration;
                enumTypes.add(type);
            }
        }
        for (const type of this.types) {
            if (!enumTypes.has(type))
                pool.push({ typeOrEnum: type, size: 1 });
        }
        pool.sort((a, b) => b.size - a.size);
        // Ensure that Alive will always be the first type allocated.
        this.types.unshift(this.Alive);
        pool.unshift({ typeOrEnum: this.Alive, size: 1 });
        return pool;
    }
    removeBiggestNoLargerThan(maxSize) {
        const k = this.allocationItems.findIndex(item => item.size <= maxSize);
        if (k === -1)
            return;
        return this.allocationItems.splice(k, 1)[0];
    }
    releaseComponentTypes() {
        for (const type of this.types)
            dissimilateComponentType(type);
        for (const enumeration of this.enums)
            delete enumeration.__binding;
    }
    createEntity(initialComponents) {
        const id = this.entityIdPool.take();
        this.entityOrdinals[id] = this.nextEntityOrdinal++;
        this.setShape(id, this.Alive);
        const entity = this.pool.borrowTemporarily(id);
        this.createComponents(id, initialComponents);
        this.dispatcher.stats.numEntities += 1;
        return entity;
    }
    // Everything is copied over from Entity and inlined here to keep performance from cratering.
    // Just calling checkMask with 'create' kills it...
    createComponents(id, initialComponents) {
        for (let i = 0; i < initialComponents.length; i++) {
            const type = initialComponents[i];
            {
                if (typeof type !== 'function') {
                    throw new CheckError(`Bad arguments to createEntity: expected component type, got: ${type}`);
                }
                checkTypeDefined(type);
                const mask = this.executingSystem?.accessMasks.create;
                if (mask) {
                    const binding = type.__binding;
                    if (((mask[binding.shapeOffset] ?? 0) & binding.shapeMask) === 0) {
                        throw new CheckError(`System ${this.executingSystem?.name} didn't mark component ${type.name} ` +
                            `as createable`);
                    }
                }
                if (type.enum) {
                    if (this.getEnumShape(id, type.enum, false)) {
                        throw new CheckError(`Can't add multiple components from the same enum when creating entity: ` +
                            type.name);
                    }
                }
                else if (this.hasShape(id, type, false)) {
                    throw new CheckError(`Duplicate ${type.name} component when creating entity`);
                }
            }
            let value = initialComponents[i + 1];
            if (typeof value === 'function')
                value = undefined;
            else
                i++;
            this.setShape(id, type);
            this.dispatcher.stats.forComponent(type).numEntities += 1;
            initComponent(type, id, value);
        }
    }
    flush() {
        const lastExecutingSystem = this.executingSystem;
        this.includeRecentlyDeleted = false;
        this.validateShapes(lastExecutingSystem);
        this.executingSystem = undefined;
        this.pool.returnTemporaryBorrows();
        this.removalLog.commit();
    }
    completeCycle() {
        this.processRemovalLog();
        this.invalidateDeletedHeldEntities();
    }
    validateShapes(system) {
        this.executingSystem = this.validateSystem;
        for (const entityId of this.reshapedEntityIds) {
            for (const componentType of this.validators) {
                try {
                    componentType.validate(this.pool.borrowTemporarily(entityId));
                }
                catch (e) {
                    if (!SYSTEM_ERROR_TYPES.includes(e.constructor)) {
                        const systemSuffix = system ? ` after system ${system.name} executed` : '';
                        const componentNames = this.types
                            .filter(type => type !== this.Alive && this.hasShape(entityId, type, false))
                            .map(type => type.name)
                            .join(', ') || 'none';
                        e.message =
                            `An entity failed to satisfy ${componentType.name}.validate${systemSuffix}: ` +
                                `${e.message} (components: ${componentNames})`;
                    }
                    throw e;
                }
            }
        }
        this.reshapedEntityIds.length = 0;
    }
    processRemovalLog() {
        const indexer = this.dispatcher.indexer;
        this.removalLog.commit();
        this.entityIdPool.mark();
        let numDeletedEntities = 0;
        let log, startIndex, endIndex;
        {
            this.dispatcher.stats.maxLimboComponents =
                this.removalLog.countSince(this.removalLog.copyPointer(this.oldRemovalPointer));
        }
        while (true) {
            [log, startIndex, endIndex] =
                this.removalLog.processSince(this.oldRemovalPointer, this.prevRemovalPointer);
            if (!log)
                break;
            for (let i = startIndex; i < endIndex; i++) {
                const entry = log[i];
                const entityId = (entry & ENTITY_ID_MASK);
                const componentId = (entry >>> ENTITY_ID_BITS) & COMPONENT_ID_MASK;
                const type = this.types[componentId];
                if (!this.shapes.isSet(entityId, type) && !this.removedShapes.isSet(entityId, type)) {
                    this.staleShapes.unset(entityId, type);
                    if (type === this.Alive) {
                        indexer.clearAllRefs(entityId, true);
                        this.entityIdPool.return(entityId);
                        numDeletedEntities += 1;
                    }
                    else {
                        this.clearRefs(entityId, type, true);
                    }
                    type.__free?.(entityId);
                    this.removedShapes.set(entityId, type);
                }
            }
        }
        this.dispatcher.stats.numEntities -= numDeletedEntities;
        this.removedShapes.clear();
        this.removalLog.createPointer(this.prevRemovalPointer);
    }
    invalidateDeletedHeldEntities() {
        let index = 0;
        let entityId;
        while ((entityId = this.entityIdPool.peekSinceMark(index++)) !== undefined) {
            const entity = this.heldEntities[entityId];
            if (entity) {
                entity.__valid = false;
                delete this.heldEntities[entityId];
            }
        }
    }
    holdEntity(id) {
        let entity;
        entity = this.heldEntities[id];
        if (!entity) {
            entity = new EntityImpl(this);
            entity.__id = id;
            this.heldEntities[id] = entity;
        }
        return entity;
    }
    hasShape(id, type, allowRecentlyDeleted) {
        if (this.shapes.isSet(id, type))
            return true;
        if (allowRecentlyDeleted && this.includeRecentlyDeleted &&
            this.staleShapes.isSet(id, type))
            return true;
        return false;
    }
    getEnumShape(id, enumeration, allowRecentlyDeleted) {
        let index = this.shapes.get(id, enumeration);
        if (index === 0 && allowRecentlyDeleted && this.includeRecentlyDeleted) {
            index = this.staleShapes.get(id, enumeration);
        }
        if (index > 0)
            return enumeration.__types[index - 1];
    }
    setShape(id, type) {
        if (type.enum) {
            const oldType = this.getEnumShape(id, type.enum, false);
            if (oldType)
                this.clearShape(id, oldType);
        }
        this.shapes.set(id, type);
        this.staleShapes.set(id, type);
        this.reshapedEntityIds.push(id);
        if (type !== this.Alive || this.hasNegativeQueries) {
            this.dispatcher.shapeLog.push(id | (type.id << ENTITY_ID_BITS), type);
        }
    }
    clearShape(id, type) {
        this.clearRefs(id, type, false);
        this.shapes.unset(id, type);
        this.removedShapes.set(id, type);
        this.reshapedEntityIds.push(id);
        const logEntry = id | (type.id << ENTITY_ID_BITS);
        this.removalLog.push(logEntry);
        if (type !== this.Alive || this.hasNegativeQueries) {
            this.dispatcher.shapeLog.push(logEntry, type);
        }
        this.dispatcher.stats.forComponent(type).numEntities -= 1;
    }
    trackWrite(id, type) {
        this.dispatcher.writeLog.push(id | (type.id << ENTITY_ID_BITS), type);
    }
    clearRefs(id, type, final) {
        const hasRefs = !!type.__binding.refFields.length;
        if (hasRefs) {
            type.__bind(id, true);
            for (const field of type.__binding.refFields)
                field.clearRef(final);
        }
    }
    matchShape(id, positiveMask, positiveValues, trackingMasks, negativeMask, negativeTypes) {
        if (positiveMask && positiveValues && !this.shapes.match(id, positiveMask, positiveValues)) {
            return false;
        }
        if (negativeMask && !this.shapes.matchNot(id, negativeMask))
            return false;
        if (negativeTypes) {
            for (const type of negativeTypes)
                if (this.shapes.isSet(id, type))
                    return false;
        }
        if (trackingMasks) {
            for (const trackingMask of trackingMasks) {
                if (trackingMask.lastMatches) {
                    if (!this.shapes.matchAny(id, trackingMask))
                        return false;
                }
                else if (this.shapes.matchNot(id, trackingMask.mask)) {
                    return false;
                }
            }
        }
        return true;
    }
}

const ALPHA = 0.05;
function computeMovingAverage(average, value) {
    return value * ALPHA + average * (1 - ALPHA);
}
class ComponentStats {
    type;
    _numEntities = 0;
    maxEntities = 0;
    capacity = 0;
    constructor(type) {
        this.type = type;
    }
    get numEntities() {
        return this._numEntities;
    }
    set numEntities(value) {
        this._numEntities = value;
        if (value > this.maxEntities)
            this.maxEntities = value;
    }
    toString() {
        /* eslint-disable max-len */
        return `${this.numEntities.toLocaleString()} of ${this.maxEntities.toLocaleString()} peak (capacity ${this.capacity.toLocaleString()})`;
        /* eslint-enable max-len */
    }
}
class SystemStats {
    type;
    worker; // -1 means replicated to all workers
    _lastQueryUpdateDuration = 0;
    averageQueryUpdateDuration = 0;
    _lastExecutionDuration = 0;
    averageExecutionDuration = 0;
    _lastCoroutinesDuration = 0;
    averageCoroutinesDuration = 0;
    constructor(type) {
        this.type = type;
    }
    get lastQueryUpdateDuration() {
        return this._lastQueryUpdateDuration;
    }
    set lastQueryUpdateDuration(value) {
        this._lastQueryUpdateDuration = value;
        this.averageQueryUpdateDuration = computeMovingAverage(this.averageQueryUpdateDuration, value);
    }
    get lastExecutionDuration() {
        return this._lastExecutionDuration;
    }
    set lastExecutionDuration(value) {
        this._lastExecutionDuration = value;
        this.averageExecutionDuration = computeMovingAverage(this.averageExecutionDuration, value);
    }
    get lastCoroutinesDuration() {
        return this._lastCoroutinesDuration;
    }
    set lastCoroutinesDuration(value) {
        this._lastCoroutinesDuration = value;
        this.averageCoroutinesDuration = computeMovingAverage(this.averageCoroutinesDuration, value);
    }
}
class Stats {
    frames = 0;
    _numEntities = 0;
    _maxEntities = 0;
    _maxLimboComponents = 0;
    _maxRefChangesPerFrame = 0;
    _maxShapeChangesPerFrame = 0;
    _maxWritesPerFrame = 0;
    components = Object.create(null);
    systems = Object.create(null);
    get maxEntities() {
        return this._maxEntities;
    }
    get numEntities() {
        return this._numEntities;
    }
    set numEntities(value) {
        this._numEntities = value;
        if (value > this._maxEntities)
            this._maxEntities = value;
    }
    get maxLimboComponents() {
        return this._maxLimboComponents;
    }
    set maxLimboComponents(value) {
        if (value > this._maxLimboComponents)
            this._maxLimboComponents = value;
    }
    get maxRefChangesPerFrame() {
        return this._maxRefChangesPerFrame;
    }
    set maxRefChangesPerFrame(value) {
        if (value > this._maxRefChangesPerFrame)
            this._maxRefChangesPerFrame = value;
    }
    get maxShapeChangesPerFrame() {
        return this._maxShapeChangesPerFrame;
    }
    set maxShapeChangesPerFrame(value) {
        if (value > this._maxShapeChangesPerFrame)
            this._maxShapeChangesPerFrame = value;
    }
    get maxWritesPerFrame() {
        return this._maxWritesPerFrame;
    }
    set maxWritesPerFrame(value) {
        if (value > this._maxWritesPerFrame)
            this._maxWritesPerFrame = value;
    }
    forComponent(type) {
        const componentStats = this.components[type.name] ?? new ComponentStats(type);
        if (!type.__internal)
            this.components[type.name] = componentStats;
        return componentStats;
    }
    forSystem(type) {
        const systemStats = this.systems[type.name] ?? new SystemStats(type);
        if (!type.__internal)
            this.systems[type.name] = systemStats;
        return systemStats;
    }
    toString() {
        /* eslint-disable max-len */
        return `World stats:
  frames: ${this.frames.toLocaleString()}
  entities: ${this.numEntities.toLocaleString()} of ${this.maxEntities.toLocaleString()} max
  refs: ${this.maxRefChangesPerFrame.toLocaleString()} ref changes/frame max
  logs: ${this.maxShapeChangesPerFrame.toLocaleString()} shape changes/frame max, ${this.maxWritesPerFrame.toLocaleString()} writes/frame max
  components: (${this.maxLimboComponents.toLocaleString()} limbo max)\n` +
            Object.keys(this.components).map(name => {
                const compStats = this.components[name];
                return `    ${name}: ${compStats.numEntities} (max ${compStats.maxEntities})`;
            }).join('\n');
        /* eslint-enable max-len */
    }
}

var Action;
(function (Action) {
    Action[Action["REFERENCE"] = 0] = "REFERENCE";
    Action[Action["UNREFERENCE"] = 1073741824] = "UNREFERENCE";
    Action[Action["RELEASE"] = 2147483648] = "RELEASE";
    Action[Action["UNREFERENCE_AND_RELEASE"] = -1073741824] = "UNREFERENCE_AND_RELEASE";
})(Action || (Action = {}));
const ACTION_MASK = Action.UNREFERENCE_AND_RELEASE;
class Tracker {
    targetEntityId;
    selector;
    trackStale;
    dispatcher;
    entities = [];
    tags;
    entityIndex;
    clearing = false;
    registry;
    constructor(targetEntityId, selector, trackStale, dispatcher) {
        this.targetEntityId = targetEntityId;
        this.selector = selector;
        this.trackStale = trackStale;
        this.dispatcher = dispatcher;
        const binding = selector.sourceType?.__binding;
        const precise = selector.matchType && (selector.matchSeq && !binding.fields[selector.sourceSeq].type.internallyIndexed ||
            binding.refFields.length === 1 && !binding.refFields[0].type.internallyIndexed);
        if (!precise)
            this.tags = [];
        this.registry = dispatcher.registry;
    }
    clearAllRefs(final) {
        if (!this.tags)
            throw new InternalError('Unreferencing an untagged tracker');
        this.clearing = true;
        for (let i = 0; i < this.entities.length; i++) {
            const entityId = this.entities[i].__id;
            const set = this.tags[i];
            if (typeof set === 'number') {
                this.clearRef(entityId, set, final);
            }
            else {
                for (const tag of set)
                    this.clearRef(entityId, tag, final);
            }
        }
        this.entities = [];
        if (this.tags)
            this.tags = [];
        this.entityIndex = undefined;
        this.clearing = false;
    }
    clearRef(sourceId, tag, final) {
        const sourceTypeId = tag & COMPONENT_ID_MASK;
        const sourceSeq = (tag >>> COMPONENT_ID_BITS) & FIELD_SEQ_MASK;
        const internalIndex = tag >>> (COMPONENT_ID_BITS + FIELD_SEQ_BITS);
        const sourceType = this.registry.types[sourceTypeId];
        checkMask(sourceType, this.registry.executingSystem, 'write');
        sourceType.__bind(sourceId, true);
        sourceType.__binding.fields[sourceSeq].clearRef(final, this.targetEntityId, internalIndex);
    }
    trackReference(entityId, typeId, fieldSeq, internalIndex, trackChanges) {
        if (this.clearing) {
            throw new InternalError('Cannot track a new reference while clearing tracker');
        }
        if (trackChanges)
            this.checkUpdateMask();
        let index = this.getEntityIndex(entityId);
        if (index === undefined)
            index = this.addEntity(entityId, trackChanges);
        this.addTag(index, this.makeTag(typeId, fieldSeq, internalIndex));
    }
    trackUnreference(entityId, typeId, fieldSeq, internalIndex, trackChanges) {
        if (this.clearing)
            return;
        if (trackChanges)
            this.checkUpdateMask();
        const index = this.getEntityIndex(entityId);
        if (index === undefined)
            throw new InternalError('Entity backref not tracked');
        const empty = this.removeTag(index, this.makeTag(typeId, fieldSeq, internalIndex));
        if (empty)
            this.removeEntity(index, entityId, trackChanges);
    }
    getEntityIndex(entityId) {
        if (this.entityIndex)
            return this.entityIndex[entityId];
        const k = this.entities.findIndex(entity => entity.__id === entityId);
        if (k >= 0)
            return k;
    }
    indexEntities() {
        if (this.entityIndex)
            throw new InternalError('Entities already indexed');
        this.entityIndex = new Array(this.dispatcher.maxEntities);
        for (let i = 0; i < this.entities.length; i++) {
            this.entityIndex[this.entities[i].__id] = i;
        }
    }
    addTag(index, tag) {
        if (!this.tags)
            return;
        const set = this.tags[index];
        if (set === undefined) {
            this.tags[index] = tag;
        }
        else if (typeof set === 'number') {
            if (set === tag)
                throw new InternalError(`Ref ${tag} already tracked (single)`);
            this.tags[index] = [set, tag];
        }
        else if (Array.isArray(set)) {
            if (set.includes(tag))
                throw new InternalError(`Ref ${tag} already tracked (array)`);
            if (set.length >= 1000) {
                const actualSet = this.tags[index] = new Set(set);
                actualSet.add(tag);
            }
            else {
                set.push(tag);
            }
        }
        else {
            if (set.has(tag))
                throw new InternalError(`Ref ${tag} already tracked (set)`);
            set.add(tag);
        }
    }
    removeTag(index, tag) {
        if (!this.tags)
            return true; // precise mode
        const set = this.tags[index];
        if (set === undefined)
            throw new InternalError(`Ref ${tag} not tracked (none)`);
        if (typeof set === 'number') {
            if (set !== tag)
                throw new InternalError(`Ref ${tag} not tracked (single ${set})`);
            delete this.tags[index];
            return true;
        }
        if (Array.isArray(set)) {
            const k = set.indexOf(tag);
            if (k === -1)
                throw new InternalError(`Ref ${tag} not tracked (array ${set})`);
            set.splice(k, 1);
            return !this.tags.length;
        }
        if (!set.has(tag)) {
            throw new InternalError(`Ref ${tag} not tracked (set ${new Array(...set)})`);
        }
        set.delete(tag);
        return !set.size;
    }
    makeTag(typeId, fieldSeq, internalIndex) {
        return typeId | (fieldSeq << COMPONENT_ID_BITS) |
            (internalIndex === undefined ? 0 : (internalIndex << (COMPONENT_ID_BITS + FIELD_SEQ_BITS)));
    }
    addEntity(entityId, trackChanges) {
        const index = this.entities.length;
        this.entities.push(this.registry.pool.borrow(entityId));
        if (this.entityIndex) {
            this.entityIndex[entityId] = index;
        }
        else if (index > 100) {
            this.indexEntities();
        }
        if (trackChanges)
            this.trackBackrefsChange();
        return index;
    }
    removeEntity(index, entityId, trackChanges) {
        this.registry.pool.return(entityId);
        const lastEntity = this.entities.pop();
        if (this.entityIndex)
            delete this.entityIndex[entityId];
        if (this.entities.length > index) {
            this.entities[index] = lastEntity;
            if (this.entityIndex)
                this.entityIndex[lastEntity.__id] = index;
        }
        if (this.tags) {
            const lastTag = this.tags.pop();
            if (this.tags.length > index)
                this.tags[index] = lastTag;
        }
        if (trackChanges)
            this.trackBackrefsChange();
    }
    trackBackrefsChange() {
        for (const targetType of this.selector.targetTypes) {
            if (targetType.__binding.trackedWrites) {
                this.registry.trackWrite(this.targetEntityId, targetType);
            }
        }
    }
    checkUpdateMask() {
        const system = this.registry.executingSystem;
        for (const targetType of this.selector.targetTypes) {
            if (this.registry.hasShape(this.targetEntityId, targetType, this.trackStale)) {
                checkMask(targetType, system, 'update');
            }
        }
    }
}
class RefIndexer {
    dispatcher;
    maxRefChangesPerFrame;
    refLog;
    refLogPointer;
    refLogStatsPointer;
    selectorIdsBySourceKey = new Map();
    selectors = [];
    trackers = new Map();
    registry;
    constructor(dispatcher, maxRefChangesPerFrame) {
        this.dispatcher = dispatcher;
        this.maxRefChangesPerFrame = maxRefChangesPerFrame;
        this.registry = dispatcher.registry;
    }
    completeCycle() {
        this.flush(); // to handle ref changes coming from registry.processEndOfFrame()
        this.dispatcher.stats.maxRefChangesPerFrame =
            this.refLog?.countSince(this.refLogStatsPointer) ?? 0;
    }
    registerSelector(targetType, sourceType, sourceFieldSeq, trackStale = false) {
        if (targetType)
            checkTypeDefined(targetType);
        if (sourceType)
            checkTypeDefined(sourceType);
        if (!this.refLog) {
            this.refLog = new Log(this.maxRefChangesPerFrame, 'maxRefChangesPerFrame', this.dispatcher.buffers, { localProcessingAllowed: true });
            this.refLogPointer = this.refLog.createPointer();
            this.refLogStatsPointer = this.refLog.createPointer();
        }
        const selectorSourceKey = sourceType ?
            (sourceFieldSeq === undefined ?
                -2 - sourceType.id : sourceType.id | (sourceFieldSeq << COMPONENT_ID_BITS)) : -1;
        let selectorId = this.selectorIdsBySourceKey.get(selectorSourceKey);
        if (selectorId === undefined) {
            // Always track stale refs on the global selector.
            if (!this.selectors.length)
                trackStale = true;
            const selector = {
                id: this.selectors.length, targetTypes: targetType ? [targetType] : [], sourceType,
                matchType: !!sourceType, matchSeq: sourceFieldSeq !== undefined,
                sourceTypeId: sourceType?.id, sourceSeq: sourceFieldSeq, trackStale
            };
            this.selectors.push(selector);
            selectorId = selector.id;
            this.selectorIdsBySourceKey.set(selectorSourceKey, selectorId);
            if (selectorId > MAX_NUM_COMPONENTS) {
                throw new CheckError(`Too many distinct backrefs selectors`);
            }
        }
        else {
            const selector = this.selectors[selectorId];
            selector.trackStale = selector.trackStale || trackStale;
            if (targetType)
                selector.targetTypes.push(targetType);
        }
        return selectorId;
    }
    getBackrefs(entityId, selectorId = 0) {
        const selector = this.selectors[selectorId];
        return this.getOrCreateTracker(selector, entityId, this.registry.includeRecentlyDeleted).entities;
    }
    trackRefChange(sourceId, sourceType, sourceSeq, sourceInternalIndex, oldTargetId, newTargetId, unreference, release) {
        if (!this.refLog)
            throw new InternalError(`Trying to trackRefChange without a refLog`);
        if (oldTargetId === newTargetId && unreference) {
            throw new InternalError('No-op call to trackRefChange');
        }
        if (oldTargetId !== -1) {
            const action = (unreference ? Action.UNREFERENCE : 0) | (release ? Action.RELEASE : 0);
            if (!action) {
                throw new InternalError('Called trackRefChange with neither unreference nor release');
            }
            this.pushRefLogEntry(sourceId, sourceType, sourceSeq, sourceInternalIndex, oldTargetId, action);
        }
        if (newTargetId !== -1) {
            this.pushRefLogEntry(sourceId, sourceType, sourceSeq, sourceInternalIndex, newTargetId, Action.REFERENCE);
        }
    }
    clearAllRefs(targetId, final) {
        if (!this.selectors.length)
            return;
        this.getTracker(this.selectors[0], targetId, final)?.clearAllRefs(final);
    }
    pushRefLogEntry(sourceId, sourceType, sourceSeq, sourceInternalIndex, targetId, action) {
        const internallyIndexed = typeof sourceInternalIndex !== 'undefined';
        {
            if (internallyIndexed && !sourceType.__binding.fields[sourceSeq].type.internallyIndexed) {
                throw new InternalError('Inconsistent internally indexed flag');
            }
        }
        this.refLog.push(sourceId | (sourceType.id << ENTITY_ID_BITS));
        this.refLog.push(targetId | (sourceSeq << ENTITY_ID_BITS) | action | (internallyIndexed ? 2 ** 29 : 0));
        if (internallyIndexed)
            this.refLog.push(sourceInternalIndex);
        this.processEntry(sourceId, sourceType.id, sourceSeq, sourceInternalIndex, targetId, action, true);
    }
    getOrCreateTracker(selector, targetId, stale) {
        let tracker = this.getTracker(selector, targetId, stale);
        if (tracker)
            return tracker;
        if (stale && !selector.trackStale) {
            throw new InternalError('Selector not configured for stale tracking');
        }
        let staleTracker;
        tracker = new Tracker(targetId, selector, false, this.dispatcher);
        this.trackers.set(targetId | (selector.id << ENTITY_ID_BITS), tracker);
        if (selector.trackStale) {
            staleTracker = new Tracker(targetId, selector, true, this.dispatcher);
            this.trackers.set(targetId | (selector.id << ENTITY_ID_BITS) | 2 ** 31, staleTracker);
        }
        return stale ? staleTracker : tracker;
    }
    getTracker(selector, targetId, stale) {
        return this.trackers.get(targetId | (selector.id << ENTITY_ID_BITS) | (stale ? 2 ** 31 : 0));
    }
    flush() {
        if (!this.refLog)
            return;
        while (true) {
            const [log, startIndex, endIndex, local] = this.refLog.processAndCommitSince(this.refLogPointer);
            if (!log)
                break;
            if (local)
                continue;
            for (let i = startIndex; i < endIndex; i += 2) {
                const entryPart1 = log[i], entryPart2 = log[i + 1];
                const sourceId = (entryPart1 & ENTITY_ID_MASK);
                const sourceTypeId = entryPart1 >>> ENTITY_ID_BITS;
                const targetId = (entryPart2 & ENTITY_ID_MASK);
                const sourceSeq = (entryPart2 >>> ENTITY_ID_BITS) & (MAX_NUM_FIELDS - 1);
                const action = entryPart2 & ACTION_MASK;
                const internallyIndexed = (entryPart2 & 2 ** 29) !== 0;
                const internalIndex = internallyIndexed ? log[i + 2] : undefined;
                if (internallyIndexed)
                    i += 1;
                this.processEntry(sourceId, sourceTypeId, sourceSeq, internalIndex, targetId, action, false);
            }
        }
    }
    processEntry(sourceId, sourceTypeId, sourceSeq, sourceInternalIndex, targetId, action, local) {
        for (let j = 0; j < this.selectors.length; j++) {
            const selector = this.selectors[j];
            if ((!selector.matchType || selector.sourceTypeId === sourceTypeId) &&
                (!selector.matchSeq || selector.sourceSeq === sourceSeq)) {
                if (action === Action.REFERENCE || action & Action.UNREFERENCE) {
                    const tracker = this.getOrCreateTracker(selector, targetId, false);
                    if (action === Action.REFERENCE) {
                        tracker.trackReference(sourceId, sourceTypeId, sourceSeq, sourceInternalIndex, local);
                    }
                    else {
                        tracker.trackUnreference(sourceId, sourceTypeId, sourceSeq, sourceInternalIndex, local);
                    }
                }
                if (selector.trackStale && (action === Action.REFERENCE || action & Action.RELEASE)) {
                    const tracker = this.getOrCreateTracker(selector, targetId, true);
                    if (action === Action.REFERENCE) {
                        tracker.trackReference(sourceId, sourceTypeId, sourceSeq, sourceInternalIndex, local);
                    }
                    else {
                        tracker.trackUnreference(sourceId, sourceTypeId, sourceSeq, sourceInternalIndex, local);
                    }
                }
            }
        }
    }
}

class Item {
    buffer;
    array;
    update;
}
const arrayTypeToKind = new Map([
    [Uint8Array, 'u8'], [Int8Array, 'i8'], [Uint16Array, 'u16'], [Int16Array, 'i16'],
    [Uint32Array, 'u32'], [Int32Array, 'i32'], [Float32Array, 'f32'], [Float64Array, 'f64']
]);
const arrayKindToType = new Map([
    ['u8', Uint8Array], ['i8', Int8Array], ['u16', Uint16Array], ['i16', Int16Array],
    ['u32', Uint32Array], ['i32', Int32Array], ['f32', Float32Array], ['f64', Float64Array]
]);
class Buffers {
    threaded;
    items = new Map();
    changes;
    constructor(threaded) {
        this.threaded = threaded;
    }
    register(key, length, ArrayType, update, filler) {
        const size = length * ArrayType.BYTES_PER_ELEMENT;
        let item = this.items.get(key);
        const needBiggerBuffer = !item || item.buffer.byteLength < size;
        const needNewArray = needBiggerBuffer || item.array.constructor !== ArrayType;
        if (!item || needBiggerBuffer || needNewArray) {
            const newItem = new Item();
            newItem.buffer = needBiggerBuffer ?
                (this.threaded ? new SharedArrayBuffer(size) : new ArrayBuffer(size)) : item.buffer;
            newItem.array = new ArrayType(newItem.buffer);
            if (item) {
                newItem.array.set(item.array);
                if (filler !== undefined && newItem.array.length > item.array.length) {
                    newItem.array.fill(filler, item.array.length);
                }
            }
            else if (filler !== undefined) {
                newItem.array.fill(filler);
            }
            item = newItem;
            this.items.set(key, item);
            if (this.threaded) {
                if (!this.changes)
                    this.changes = new Map();
                this.changes.set(key, {
                    buffer: item.buffer, arrayKind: arrayTypeToKind.get(ArrayType)
                });
            }
            update?.(item.array);
        }
        item.update = update;
        return item.array;
    }
    makePatch() {
        if (!this.changes)
            return;
        const patch = this.changes;
        this.changes = undefined;
        return patch;
    }
    applyPatch(patch) {
        for (const [key, patchItem] of patch.entries()) {
            const item = new Item();
            item.update = this.items.get(key)?.update;
            item.buffer = patchItem.buffer;
            const ArrayType = arrayKindToType.get(patchItem.arrayKind);
            item.array = new ArrayType(item.buffer);
            this.items.set(key, item);
            item.update?.(item.array);
        }
    }
}

function addFieldSchema(options, target, name) {
    if (!target.constructor.schema)
        target.constructor.schema = {};
    target.constructor.schema[name] = options;
}
function field(practicalOptions) {
    return function (target, name) {
        const options = 'type' in practicalOptions ? practicalOptions : { type: practicalOptions };
        addFieldSchema(options, target, name);
    };
}
function makeVectorDecorator(type) {
    const fn = addFieldSchema.bind(null, { type });
    fn.vector =
        (elements, Class) => (target, name) => {
            addFieldSchema({ type: Type.vector(type, elements, Class) }, target, name);
        };
    return fn;
}
function backrefs(...args) {
    if (typeof args[0] === 'function' || args[0] === undefined) {
        return addFieldSchema.bind(null, { type: Type.backrefs(...args) });
    }
    addFieldSchema({ type: Type.backrefs }, args[0], args[1]);
}
field.boolean = addFieldSchema.bind(null, { type: Type.boolean });
field.uint8 = makeVectorDecorator(Type.uint8);
field.int8 = makeVectorDecorator(Type.int8);
field.uint16 = makeVectorDecorator(Type.uint16);
field.int16 = makeVectorDecorator(Type.int16);
field.uint32 = makeVectorDecorator(Type.uint32);
field.int32 = makeVectorDecorator(Type.int32);
field.float32 = makeVectorDecorator(Type.float32);
field.float64 = makeVectorDecorator(Type.float64);
field.staticString = function (choices) {
    return addFieldSchema.bind(null, { type: Type.staticString(choices) });
};
field.dynamicString = function (maxUtf8Length) {
    return addFieldSchema.bind(null, { type: Type.dynamicString(maxUtf8Length) });
};
field.ref = addFieldSchema.bind(null, { type: Type.ref });
field.backrefs = backrefs;
field.object = addFieldSchema.bind(null, { type: Type.object });
field.weakObject = addFieldSchema.bind(null, { type: Type.weakObject });
const componentTypes = [];
function component(arg, options) {
    if (typeof arg === 'function') {
        componentTypes.push(arg);
    }
    else if (arg instanceof ComponentEnum) {
        return (componentClass) => {
            if (!arg.__types.includes(componentClass))
                arg.__types.push(componentClass);
            componentTypes.push(arg); // duplicates will be removed by Dispatcher
            if (options)
                componentClass.options = options;
        };
    }
    else {
        return (componentClass) => {
            componentClass.options = arg;
            componentTypes.push(componentClass);
        };
    }
}
const systemTypes = [];
function system(arg, scheduler) {
    if (typeof arg === 'function' && !arg.__system) {
        scheduler = arg;
        arg = undefined;
    }
    if (typeof arg === 'function') {
        systemTypes.push(arg);
    }
    else {
        if (arg && !systemTypes.includes(arg))
            systemTypes.push(arg);
        return (systemClass) => {
            if (arg)
                arg.__contents.push(systemClass);
            if (scheduler)
                systemClass.__staticScheduler = scheduler;
            systemTypes.push(systemClass);
        };
    }
}

/**
 * A directed graph with weighted edges and a few extra constraints:
 * 1. Loop edges on a single vertex are not allowed, nor are multiple edges from A to B.
 * 2. An edge from A to B with a higher weight will override an edge from B to A.
 * 3. A "denial" edge from A to B will similarly override lower-weight edges, but not count as an
 *    edge itself.  We store these with negative weights.
 */
class Graph {
    vertices;
    numVertices;
    edges;
    paths;
    vertexIndexMap = new Map();
    sealed = false;
    sortedVertices;
    dependencyCounts;
    traversalCounts;
    numTraversedVertices;
    constructor(vertices) {
        this.vertices = vertices;
        this.numVertices = vertices.length;
        for (let i = 0; i < vertices.length; i++) {
            this.vertexIndexMap.set(vertices[i], i);
        }
        this.edges = new Array(this.numVertices ** 2).fill(0);
        this.dependencyCounts = new Array(this.numVertices);
        this.traversalCounts = new Array(this.numVertices);
    }
    get topologicallySortedVertices() {
        if (!this.sealed)
            throw new InternalError('Graph not yet sealed');
        if (!this.sortedVertices)
            this.sortedVertices = this.sortTopologically();
        return this.sortedVertices;
    }
    getEdgeIndex(source, target) {
        const sourceId = this.vertexIndexMap.get(source);
        const targetId = this.vertexIndexMap.get(target);
        if (sourceId === undefined)
            throw new InternalError(`Unknown vertex: ${source}`);
        if (targetId === undefined)
            throw new InternalError(`Unknown vertex: ${target}`);
        return sourceId * this.numVertices + targetId;
    }
    setEdge(source, target, weight) {
        if (this.sealed)
            throw new InternalError('Graph already sealed');
        if (source === target)
            return;
        const sourceToTarget = this.getEdgeIndex(source, target);
        const targetToSource = this.getEdgeIndex(target, source);
        const absWeight = Math.abs(weight);
        if (absWeight < Math.abs(this.edges[sourceToTarget]) ||
            absWeight < Math.abs(this.edges[targetToSource]))
            return;
        this.edges[sourceToTarget] = weight;
        if (absWeight > Math.abs(this.edges[targetToSource]))
            this.edges[targetToSource] = 0;
    }
    addEdge(source, target, weight) {
        if (weight <= 0)
            throw new InternalError(`Edge has non-positive weight: ${weight}`);
        this.setEdge(source, target, weight);
    }
    denyEdge(source, target, weight) {
        if (weight <= 0)
            throw new InternalError(`Edge has non-positive weight: ${weight}`);
        this.setEdge(source, target, -weight);
    }
    hasEdge(source, target) {
        return this.edges[this.getEdgeIndex(source, target)] > 0;
    }
    hasPath(source, target) {
        if (!this.sealed)
            throw new InternalError('Graph not yet sealed');
        return this.paths[this.getEdgeIndex(source, target)] > 0;
    }
    hasEdgeBetweenIds(sourceId, targetId) {
        if (sourceId > this.numVertices) {
            throw new InternalError(`Vertex id out of range: ${sourceId} > ${this.numVertices}`);
        }
        if (targetId > this.numVertices) {
            throw new InternalError(`Vertex id out of range: ${targetId} > ${this.numVertices}`);
        }
        return this.edges[sourceId * this.numVertices + targetId] > 0;
    }
    seal() {
        if (this.sealed)
            throw new InternalError('Graph already sealed');
        this.sealed = true;
        this.derivePaths();
        this.checkForCycles();
        this.simplify();
        this.countDependencies();
    }
    checkForCycles() {
        const cycles = this.findCycles();
        if (cycles.length) {
            cycles.sort((x, y) => x.length - y.length);
            throw new CheckError('Precedence cycles detected for the following systems, ' +
                'please resolve by adjusting their schedules: ' +
                cycles.map(cycle => cycle.map(u => u.toString()).join('—')).join(', '));
        }
    }
    findCycles() {
        // This implements Johnson's cycle finding algorithm from
        // https://www.cs.tufts.edu/comp/150GA/homeworks/hw1/Johnson%2075.PDF
        const blocked = new Array(this.numVertices).fill(false), b = [];
        const stack = [], cycles = [];
        let s, vertices;
        for (let i = 0; i < this.numVertices; i++)
            b[i] = new Set();
        const unblock = (u) => {
            blocked[u] = false;
            for (const w of b[u]) {
                b[u].delete(w);
                if (blocked[w])
                    unblock(w);
            }
        };
        const circuit = (v) => {
            let f = false;
            stack.push(v);
            blocked[v] = true;
            for (let w = 0; w < this.numVertices; w++) {
                if (!vertices.has(w) || !this.hasEdgeBetweenIds(v, w))
                    continue;
                if (w === s) {
                    cycles.push(stack.map(u => this.vertices[u]));
                    f = true;
                }
                else if (!blocked[w] && circuit(w)) {
                    f = true;
                }
            }
            if (f) {
                unblock(v);
            }
            else {
                for (let w = 0; w < this.numVertices; w++) {
                    if (!vertices.has(w) || !this.hasEdgeBetweenIds(v, w))
                        continue;
                    b[w].add(v);
                }
            }
            stack.pop();
            return f;
        };
        for (s = 0; s < this.numVertices; s++) {
            const componentVertices = this.findLeastStronglyConnectedComponent(s);
            s = componentVertices[0];
            for (const v of componentVertices) {
                blocked[v] = false;
                b[v].clear();
            }
            vertices = new Set(componentVertices);
            circuit(s);
        }
        return cycles;
    }
    findLeastStronglyConnectedComponent(minId) {
        // Implements the path-based strong component algorithm on the subgraph consisting of vertices
        // minId through numVertices - 1.
        // https://en.wikipedia.org/wiki/Path-based_strong_component_algorithm
        let leastComponent;
        const preorder = [], s = [], p = [];
        const assigned = [];
        let counter = 0;
        const search = (v) => {
            preorder[v] = ++counter;
            s.push(v);
            p.push(v);
            for (let w = minId; w < this.numVertices; w++) {
                if (!this.hasEdgeBetweenIds(v, w))
                    continue;
                if (preorder[w]) {
                    if (!assigned[w]) {
                        while (p.length && preorder[p[p.length - 1]] > preorder[w])
                            p.pop();
                    }
                }
                else {
                    search(w);
                }
            }
            if (p[p.length - 1] === v) {
                const component = [];
                while (true) {
                    const w = s.pop();
                    component.push(w);
                    assigned[w] = true;
                    if (w === v)
                        break;
                }
                p.pop();
                component.sort((a, b) => a - b);
                if (!leastComponent || component[0] < leastComponent[0])
                    leastComponent = component;
            }
        };
        for (let i = minId; i < this.numVertices; i++) {
            if (!preorder[i])
                search(i);
        }
        return leastComponent;
    }
    induceSubgraph(subvertices) {
        const subgraph = new Graph(subvertices);
        for (const vertex of subvertices) {
            if (!this.vertexIndexMap.has(vertex)) {
                throw new InternalError(`Vertex not in graph: ${vertex}`);
            }
            for (const target of subvertices) {
                const edgeIndex = this.getEdgeIndex(vertex, target);
                const weight = this.edges[edgeIndex];
                if (weight > 0) {
                    subgraph.addEdge(vertex, target, weight);
                }
                else if (weight < 0) {
                    subgraph.denyEdge(vertex, target, -weight);
                }
            }
        }
        if (this.sealed)
            subgraph.seal();
        return subgraph;
    }
    sortTopologically() {
        const edgeCounts = new Array(this.numVertices).fill(0);
        for (let i = 0; i < this.numVertices; i++) {
            for (let j = 0; j < this.numVertices; j++) {
                if (this.hasEdgeBetweenIds(i, j))
                    edgeCounts[j] += 1;
            }
        }
        const vertices = [];
        let changed;
        while (vertices.length < this.numVertices) {
            changed = false;
            for (let i = 0; i < edgeCounts.length; i++) {
                if (edgeCounts[i] === 0) {
                    changed = true;
                    edgeCounts[i] = -1;
                    vertices.push(this.vertices[i]);
                    for (let j = 0; j < this.numVertices; j++) {
                        if (this.hasEdgeBetweenIds(i, j))
                            edgeCounts[j] -= 1;
                    }
                }
            }
            if (!changed) {
                throw new InternalError('Graph has a cycle, topological sort not possible');
            }
        }
        return vertices;
    }
    derivePaths() {
        const n = this.numVertices;
        // Remove denial edges, no longer needed
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i] < 0)
                this.edges[i] = 0;
        }
        // console.log(this.printMatrix(this.edges));
        // Derive path matrix using a variant of the Floyd-Warshall algorithm
        const paths = this.edges.slice();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j)
                    continue;
                for (let k = 0; k < n; k++) {
                    if (k === i || k === j)
                        continue;
                    const weight1 = paths[i * n + k];
                    const weight2 = paths[k * n + j];
                    if (weight1 && weight2) {
                        const weight = Math.min(weight1, weight2);
                        if (paths[i * n + j] < weight && paths[j * n + i] < weight) {
                            paths[i * n + j] = weight;
                            paths[j * n + i] = 0;
                        }
                    }
                }
            }
        }
        this.paths = paths;
        // console.log(this.printMatrix(paths));
        // Overwrite edge weights with stronger paths.
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (this.edges[i * n + j])
                    this.edges[i * n + j] = paths[i * n + j];
            }
        }
    }
    simplify() {
        const n = this.numVertices;
        const paths = this.paths;
        // Perform a transitive reduction
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (!this.edges[i * n + j])
                    continue;
                for (let k = 0; k < n; k++) {
                    if (k === i || k === j)
                        continue;
                    if (paths[i * n + k] && paths[k * n + j])
                        this.edges[i * n + j] = 0;
                }
            }
        }
        // console.log(this.printMatrix(this.edges));
    }
    countDependencies() {
        for (let i = 0; i < this.numVertices; i++) {
            let count = 0;
            for (let j = 0; j < this.numVertices; j++) {
                if (this.edges[j * this.numVertices + i])
                    count += 1;
            }
            this.dependencyCounts[i] = count;
        }
    }
    /**
     * Traverses vertices of the graph based on dependency order.  When called without an argument it
     * initializes (or re-initializes) the traversal and returns vertices with no dependencies.  When
     * called with an argument, it marks that vertex as done and returns the vertices whose
     * dependencies are all satisfied (if any).
     * @param completedVertex The vertex to mark done; if missing, initializes the traversal instead.
     * @returns The list of vertices whose dependencies have all been satisfied, or `undefined` if
     *    this was the last vertex and the traversal is done.
     */
    traverse(completedVertex) {
        if (!this.sealed)
            throw new InternalError('Graph not yet sealed');
        const traversedVertices = [];
        if (completedVertex) {
            this.numTraversedVertices += 1;
            const sourceId = this.vertexIndexMap.get(completedVertex);
            if (sourceId === undefined) {
                throw new InternalError(`Unknown vertex: ${completedVertex}`);
            }
            for (let i = 0; i < this.numVertices; i++) {
                if (this.edges[sourceId * this.numVertices + i]) {
                    if (--this.traversalCounts[i] === 0) {
                        traversedVertices.push(this.vertices[i]);
                    }
                }
            }
        }
        else {
            this.numTraversedVertices = 0;
            for (let i = 0; i < this.numVertices; i++) {
                const count = this.traversalCounts[i] = this.dependencyCounts[i];
                if (count === 0) {
                    traversedVertices.push(this.vertices[i]);
                }
            }
        }
        if (this.numTraversedVertices === this.numVertices)
            return;
        return traversedVertices;
    }
    printMatrix(matrix) {
        const n = this.numVertices;
        const lines = [];
        for (let i = 0; i < n; i++) {
            const line = [];
            for (let j = 0; j < n; j++)
                line.push(matrix[i * n + j]);
            lines.push(line.join(' '));
        }
        return lines.join('\n');
    }
}

class Plan {
    planner;
    group;
    graph;
    constructor(planner, group) {
        this.planner = planner;
        this.group = group;
        this.graph = planner.graph.induceSubgraph(group.__systems);
    }
}
class SimplePlan extends Plan {
    planner;
    group;
    systems;
    constructor(planner, group) {
        super(planner, group);
        this.planner = planner;
        this.group = group;
        this.systems = this.graph.topologicallySortedVertices;
        if (this.systems.length > 1 && (typeof process === 'undefined' || "development" === 'development')) {
            console.log('System execution order:');
            for (const system of this.systems)
                console.log(' ', system.name);
        }
    }
    execute(time, delta) {
        const dispatcher = this.planner.dispatcher;
        const systems = this.systems;
        this.group.__executed = true;
        for (let i = 0; i < systems.length; i++) {
            const system = systems[i];
            system.execute(time, delta);
            dispatcher.flush();
        }
        return Promise.resolve();
    }
    async initialize() {
        const dispatcher = this.planner.dispatcher;
        this.group.__executed = true;
        return new Promise((resolve, reject) => {
            let rejected = false;
            const initSystem = async (system) => {
                try {
                    await system.prepare();
                    if (rejected)
                        return;
                    system.initialize();
                    dispatcher.flush();
                    const systems = this.graph.traverse(system);
                    if (!systems)
                        return resolve();
                    for (let i = 0; i < systems.length; i++)
                        initSystem(systems[i]);
                }
                catch (e) {
                    rejected = true;
                    reject(e);
                }
            };
            const systems = this.graph.traverse();
            if (!systems)
                return resolve();
            for (let i = 0; i < systems.length; i++)
                initSystem(systems[i]);
        });
    }
    async finalize() {
        const dispatcher = this.planner.dispatcher;
        this.group.__executed = true;
        return new Promise((resolve, reject) => {
            const finalizeSystem = (system) => {
                try {
                    system.finalize();
                    dispatcher.flush();
                    const systems = this.graph.traverse(system);
                    if (!systems)
                        return resolve();
                    for (let i = 0; i < systems.length; i++)
                        finalizeSystem(systems[i]);
                }
                catch (e) {
                    reject(e);
                }
            };
            const systems = this.graph.traverse();
            if (!systems)
                return resolve();
            for (let i = 0; i < systems.length; i++)
                finalizeSystem(systems[i]);
        });
    }
}
class ThreadedPlan extends Plan {
    execute(time, delta) {
        return Promise.resolve();
    }
    initialize() {
        return Promise.resolve();
    }
    finalize() {
        return Promise.resolve();
    }
}
class Lane {
    id;
    systems = [];
    constructor(id) {
        this.id = id;
    }
    add(...systems) {
        for (const system of systems)
            system.lane = this;
        this.systems.push(...systems);
    }
    merge(other) {
        if (this === other)
            return this;
        if (this.id === -1 || (other.id !== -1 && other.id < this.id))
            return other.merge(this);
        this.add(...other.systems);
        other.systems.length = 0;
        return this;
    }
}
class Planner {
    dispatcher;
    systems;
    groups;
    graph;
    readers = new Map();
    writers = new Map();
    lanes = [];
    replicatedLane;
    laneCount = 0;
    constructor(dispatcher, systems, groups) {
        this.dispatcher = dispatcher;
        this.systems = systems;
        this.groups = groups;
        this.graph = new Graph(systems);
        for (const componentType of dispatcher.registry.types) {
            this.readers.set(componentType, new Set());
            this.writers.set(componentType, new Set());
        }
        if (dispatcher.threaded) {
            this.createLane();
            // special lane id, and don't keep this in the lanes array
            this.replicatedLane = new Lane(-1);
        }
    }
    get mainLane() {
        return this.lanes[0];
    }
    createLane() {
        const lane = new Lane(this.laneCount++);
        this.lanes.push(lane);
        return lane;
    }
    organize() {
        for (const group of this.groups)
            group.__collectSystems(this.dispatcher);
        for (const system of this.systems)
            system.buildQueries();
        for (const system of this.systems)
            system.buildSchedule();
        for (const group of this.groups)
            group.__buildSchedule();
        this.addComponentEntitlementDependencies();
        this.graph.seal();
        if (this.dispatcher.threaded)
            this.assignSystemsToLanes();
        for (const system of this.systems)
            system.stats.worker = system.lane?.id ?? 0;
        delete this.readers;
        delete this.writers;
        for (const group of this.groups) {
            group.__plan =
                this.dispatcher.threaded ? new ThreadedPlan(this, group) : new SimplePlan(this, group);
        }
    }
    addComponentEntitlementDependencies() {
        for (const [componentType, systems] of this.readers.entries()) {
            for (const reader of systems) {
                for (const writer of this.writers.get(componentType)) {
                    this.graph.addEdge(writer, reader, 1);
                }
            }
        }
    }
    assignSystemsToLanes() {
        this.initSystemLanes();
        this.mergeAccessorsOfUnsharedComponentTypes();
        this.mergeAttachedSystems();
        this.pruneEmptyLanes();
        this.reduceLanes(this.dispatcher.threads + 1);
        this.pruneEmptyLanes();
    }
    initSystemLanes() {
        for (const system of this.systems) {
            if (!system.lane)
                this.createLane().add(system);
        }
    }
    mergeAccessorsOfUnsharedComponentTypes() {
        for (const componentType of this.dispatcher.registry.types) {
            if (componentType.__binding.fields.every(field => field.type.shared))
                continue;
            const readers = this.readers.get(componentType);
            const writers = this.writers.get(componentType);
            if (!readers && !writers)
                continue;
            let lane = componentType.options?.restrictedToMainThread ? this.mainLane : this.createLane();
            readers?.forEach(system => {
                lane = lane.merge(system.lane);
            });
            writers?.forEach(system => {
                lane = lane.merge(system.lane);
            });
        }
    }
    mergeAttachedSystems() {
        for (const system of this.systems) {
            for (const attachedSystem of system.attachedSystems) {
                if (!attachedSystem)
                    continue;
                system.lane.merge(attachedSystem.lane);
            }
        }
    }
    reduceLanes(maxNumLanes) {
        if (this.lanes.length <= maxNumLanes)
            return;
        let pairs = [];
        for (let i = 1; i < this.lanes.length - 1; i++) { // don't merge into lane 0 unless necessary
            const laneA = this.lanes[i];
            for (let j = i + 1; j < this.lanes.length; j++) {
                const laneB = this.lanes[j];
                pairs.push({ laneA, laneB, independence: this.computeIndependence(laneA, laneB) });
            }
        }
        let numLanes = this.lanes.length;
        while (numLanes > maxNumLanes) {
            pairs.sort((pair1, pair2) => pair2.independence - pair1.independence);
            const tangledPair = pairs.pop();
            const combinedLane = tangledPair.laneA.merge(tangledPair.laneB);
            const discardedLane = combinedLane === tangledPair.laneA ? tangledPair.laneB : tangledPair.laneA;
            numLanes -= 1;
            if (numLanes > maxNumLanes) {
                pairs = pairs.filter(pair => {
                    if (pair.laneA === discardedLane || pair.laneB === discardedLane)
                        return false;
                    if (pair.laneA === combinedLane || pair.laneB === combinedLane) {
                        pair.independence = this.computeIndependence(pair.laneA, pair.laneB);
                    }
                    return true;
                });
            }
        }
    }
    computeIndependence(laneA, laneB) {
        return Math.min(this.computeIndependentWeight(laneA, laneB), this.computeIndependentWeight(laneB, laneA));
    }
    computeIndependentWeight(lane, otherLane) {
        let independentWeight = 0;
        for (const system of lane.systems) {
            let otherWeight = 0;
            for (const otherSystem of otherLane.systems) {
                if (!this.graph.hasPath(system, otherSystem) && !this.graph.hasPath(otherSystem, system)) {
                    otherWeight += otherSystem.weight;
                }
            }
            independentWeight += Math.min(system.weight, otherWeight);
        }
        return independentWeight;
    }
    pruneEmptyLanes() {
        this.lanes = this.lanes.filter(lane => lane.id === 0 || lane.systems.length);
        // Never prune the main thread lane.
        for (let i = 1; i < this.lanes.length; i++) {
            this.lanes[i].id = i;
        }
    }
}

class Build extends System {
    static __internal = true;
    __callback;
    start(coroutineFn, ...args) {
        throw new CheckError('The build system cannot run coroutines');
    }
    execute() {
        this.__callback(this);
    }
}
class Validate extends System {
    static __internal = true;
}
var State;
(function (State) {
    State[State["init"] = 0] = "init";
    State[State["setup"] = 1] = "setup";
    State[State["run"] = 2] = "run";
    State[State["finish"] = 3] = "finish";
    State[State["done"] = 4] = "done";
})(State || (State = {}));
class Dispatcher {
    maxEntities;
    defaultComponentStorage;
    registry;
    systems;
    systemsByClass = new Map();
    systemGroups;
    default;
    lastTime;
    executing;
    executingSyncFrame;
    state = State.init;
    shapeLog;
    writeLog;
    shapeLogFramePointer;
    writeLogFramePointer;
    stats;
    indexer;
    planner;
    threads;
    buffers;
    singleton;
    buildSystem;
    deferredControls = new Map();
    constructor({ defs, threads = 1, maxEntities = 10000, maxLimboComponents = Math.ceil(maxEntities / 5), maxShapeChangesPerFrame = maxEntities * 2, maxWritesPerFrame = maxEntities * 4, maxRefChangesPerFrame = maxEntities, defaultComponentStorage = 'packed' }) {
        if (threads < 1)
            throw new CheckError('Minimum of one thread');
        if (threads > 1)
            throw new CheckError('Multithreading not yet implemented');
        if (maxEntities > MAX_NUM_ENTITIES) {
            throw new CheckError(`maxEntities too high, the limit is ${MAX_NUM_ENTITIES}`);
        }
        const { componentTypes: componentTypes$1, componentEnums, systemTypes: systemTypes$1, systemGroups } = this.splitDefs([defs ?? [], componentTypes, systemTypes]);
        if (componentTypes$1.length > MAX_NUM_COMPONENTS) {
            throw new CheckError(`Too many component types, the limit is ${MAX_NUM_COMPONENTS}`);
        }
        this.stats = new Stats();
        this.threads = threads;
        this.buffers = new Buffers(threads > 1);
        this.maxEntities = maxEntities;
        this.defaultComponentStorage = defaultComponentStorage;
        this.registry =
            new Registry(maxEntities, maxLimboComponents, componentTypes$1, componentEnums, this);
        this.indexer = new RefIndexer(this, maxRefChangesPerFrame);
        this.shapeLog = new Log(maxShapeChangesPerFrame, 'maxShapeChangesPerFrame', this.buffers, { sortedByComponentType: true, numComponentTypes: this.registry.types.length });
        this.shapeLogFramePointer = this.shapeLog.createPointer();
        this.systemGroups = systemGroups;
        this.systems = this.createSystems(systemTypes$1);
        this.createBuildSystem();
        this.registry.initializeComponentTypes();
        this.registry.validateSystem = this.createValidateSystem(componentTypes$1);
        this.singleton = this.createSingletons();
        for (const box of this.systems)
            box.replacePlaceholders();
        this.planner = new Planner(this, this.systems, this.systemGroups);
        this.planner.organize();
        this.registry.hasNegativeQueries = this.systems.some(system => system.hasNegativeQueries);
        if (this.systems.some(system => system.hasWriteQueries)) {
            this.writeLog = new Log(maxWritesPerFrame, 'maxWritesPerFrame', this.buffers, { sortedByComponentType: true, numComponentTypes: this.registry.types.length });
            this.writeLogFramePointer = this.writeLog.createPointer();
        }
        for (const box of this.systems)
            box.finishConstructing();
        this.state = State.setup;
    }
    get threaded() { return this.threads > 1; }
    get defaultGroup() { return this.default.group; }
    createSystems(systemTypes) {
        const systems = [];
        const systemClasses = [];
        const typeNames = new Set();
        let anonymousTypeCounter = 0;
        for (let i = 0; i < systemTypes.length; i++) {
            const SystemClass = systemTypes[i];
            let box = this.systemsByClass.get(SystemClass);
            if (!box) {
                if (!SystemClass.name) {
                    Object.defineProperty(SystemClass, 'name', { value: `Anonymous_${anonymousTypeCounter++}` });
                }
                if (!SystemClass.__internal) {
                    if (typeNames.has(SystemClass.name)) {
                        throw new CheckError(`Multiple component types named ${SystemClass.name}; names must be unique`);
                    }
                    typeNames.add(SystemClass.name);
                }
                this.stats.forSystem(SystemClass);
                systemClasses.push(SystemClass);
                const system = new SystemClass();
                system.id = (i + 2); // 0 and 1 are reserved for internal systems
                box = new SystemBox(system, this);
                systems.push(box);
                this.systemsByClass.set(SystemClass, box);
            }
            const props = systemTypes[i + 1];
            if (props && typeof props !== 'function') {
                box.assignProps(props);
                i++;
            }
        }
        this.default = this.createSingleGroupFrame(systemClasses);
        return systems;
    }
    createBuildSystem() {
        this.buildSystem = new Build();
        this.buildSystem.id = 0;
        const box = new SystemBox(this.buildSystem, this);
        box.accessMasks.read = undefined;
        box.accessMasks.update = undefined;
        box.accessMasks.create = undefined;
        box.accessMasks.write = undefined;
        box.accessMasks.check = undefined;
        this.systems.push(box);
        this.systemsByClass.set(Build, box);
    }
    createValidateSystem(componentTypes) {
        const system = new Validate();
        system.id = 1;
        const box = new SystemBox(system, this);
        for (const type of componentTypes)
            extendMaskAndSetFlag(box.accessMasks.check, type);
        this.systems.push(box);
        this.systemsByClass.set(Validate, box);
        return box;
    }
    createSingleGroupFrame(systemTypes) {
        const group = new SystemGroupImpl(systemTypes);
        this.systemGroups.push(group);
        const frame = new FrameImpl(this, [group]);
        return { group, frame };
    }
    createSingletons() {
        const types = new Set();
        const singletonComponentDefs = this.systems.flatMap(box => {
            return box.singletonComponentDefs.filter((item, i) => {
                let accepted = true;
                if (typeof item === 'function') {
                    accepted = i < box.singletonComponentDefs.length - 1 &&
                        typeof box.singletonComponentDefs[i + 1] !== 'function';
                    if (accepted)
                        types.add(item);
                }
                return accepted;
            });
        }).concat(this.systems.flatMap(box => {
            return box.singletonComponentDefs.filter(item => {
                if (typeof item === 'function' && !types.has(item)) {
                    types.add(item);
                    return true;
                }
                return false;
            });
        }));
        if (!singletonComponentDefs.length)
            return;
        this.executing = true;
        const singleton = this.createEntity(singletonComponentDefs).hold();
        this.executing = false;
        this.flush();
        return singleton;
    }
    splitDefs(defs) {
        const componentTypes = [];
        const componentTypesSet = new Set();
        const componentEnums = new Set();
        const systemTypes = [];
        const systemGroups = [];
        let lastDefWasSystem = false;
        for (const def of defs.flat(Infinity)) {
            if (def instanceof SystemGroupImpl) {
                systemGroups.push(def);
                const { componentTypes: nestedComponentTypes, systemTypes: nestedSystemTypes, systemGroups: nestedSystemGroups } = this.splitDefs(def.__contents);
                for (const type of nestedComponentTypes)
                    addUniqueComponentType(type);
                systemTypes.push(...nestedSystemTypes);
                systemGroups.push(...nestedSystemGroups);
            }
            else if (typeof def === 'function') {
                lastDefWasSystem = !!def.__system;
                if (lastDefWasSystem) {
                    systemTypes.push(def);
                }
                else {
                    addUniqueComponentType(def);
                }
            }
            else if (def instanceof ComponentEnum) {
                componentEnums.add(def);
                for (const type of def.__types)
                    addUniqueComponentType(type);
            }
            else {
                {
                    if (!lastDefWasSystem)
                        throw new CheckError('Unexpected value in world defs: ' + def);
                }
                systemTypes.push(def);
                lastDefWasSystem = false;
            }
        }
        return { componentTypes, componentEnums: Array.from(componentEnums), systemTypes, systemGroups };
        function addUniqueComponentType(type) {
            if (type.enum && !componentEnums.has(type.enum)) {
                componentEnums.add(type.enum);
                for (const enumType of type.enum.__types)
                    addUniqueComponentType(enumType);
            }
            else if (!componentTypesSet.has(type)) {
                componentTypes.push(type);
                componentTypesSet.add(type);
            }
        }
    }
    getSystems(designator) {
        if (designator instanceof SystemGroupImpl)
            return designator.__systems;
        const system = this.systemsByClass.get(designator);
        if (!system)
            throw new CheckError(`System ${designator.name} not registered in world`);
        return [system];
    }
    async initialize() {
        await this.default.frame.begin();
        this.state = State.setup;
        await this.default.group.__plan.initialize();
        await this.default.frame.end();
        this.stats.frames -= 1;
    }
    async finalize() {
        await this.default.frame.begin();
        this.state = State.done;
        await this.default.group.__plan.finalize();
        await this.default.frame.end();
        this.stats.frames -= 1;
        this.registry.releaseComponentTypes();
    }
    async execute(time, delta) {
        await this.default.frame.begin();
        await this.default.frame.execute(this.default.group, time, delta);
        await this.default.frame.end();
    }
    executeFunction(fn) {
        // This inlines the code for Frame begin/execute/end to make it synchronous.
        this.startFrame(this.lastTime);
        this.executingSyncFrame = true;
        this.buildSystem.__callback = fn;
        this.systemsByClass.get(Build).execute(this.lastTime, 0);
        this.flush();
        this.completeCycle();
        this.completeFrame(); // async only if termination pending, but it's forbidden in this context
        this.executingSyncFrame = false;
        // This is not really a frame, so back out the count.
        this.stats.frames -= 1;
    }
    completeCycle() {
        this.registry.completeCycle(); // may update writeLog
        this.indexer.completeCycle();
        this.writeLog?.commit();
    }
    startFrame(time) {
        if (this.executing)
            throw new CheckError('Another frame already executing');
        this.executing = true;
        {
            if (this.state !== State.setup && this.state !== State.run && this.state !== State.finish) {
                throw new CheckError('World terminated');
            }
        }
        this.state = State.run;
        this.lastTime = time;
    }
    completeFrame() {
        if (!this.executing)
            throw new InternalError('No frame executing');
        this.executing = false;
        this.gatherFrameStats();
        this.processDeferredControls();
        if (this.state === State.finish)
            return this.finalize();
        return Promise.resolve();
    }
    gatherFrameStats() {
        this.stats.frames += 1;
        this.stats.maxShapeChangesPerFrame = this.shapeLog.countSince(this.shapeLogFramePointer);
        this.stats.maxWritesPerFrame = this.writeLog?.countSince(this.writeLogFramePointer) ?? 0;
    }
    flush() {
        this.indexer.flush(); // may update writeLog
        this.registry.flush();
        this.shapeLog.commit();
        this.writeLog?.commit();
    }
    async terminate() {
        {
            if (this.state !== State.setup && this.state !== State.run) {
                throw new CheckError('World terminated');
            }
            if (this.executingSyncFrame) {
                throw new CheckError('Cannot terminate world from within build callback');
            }
        }
        this.state = State.finish;
        if (!this.executing)
            await this.finalize();
    }
    createEntity(initialComponents) {
        const entity = this.registry.createEntity(initialComponents);
        if (!this.executing)
            this.flush();
        return entity;
    }
    control(options) {
        this.checkControlOverlap(options);
        this.deferRequestedRunState(options.stop, RunState.STOPPED);
        this.deferRequestedRunState(options.restart, RunState.RUNNING);
        if (!this.executing)
            this.processDeferredControls();
    }
    deferRequestedRunState(defs, state) {
        for (const def of this.splitDefs(defs).systemTypes) {
            if (!def.__system)
                continue;
            const system = this.systemsByClass.get(def);
            if (!system)
                throw new CheckError(`System ${def.name} not defined for this world`);
            this.deferredControls.set(system, state);
        }
    }
    checkControlOverlap(options) {
        const stopSet = new Set();
        for (const def of this.splitDefs(options.stop).systemTypes) {
            if (def.__system)
                stopSet.add(def);
        }
        for (const def of this.splitDefs(options.restart).systemTypes) {
            if (!def.__system)
                continue;
            if (stopSet.has(def)) {
                throw new CheckError(`Request to both stop and restart system ${def.name}`);
            }
        }
    }
    processDeferredControls() {
        if (!this.deferredControls.size)
            return;
        for (const [system, state] of this.deferredControls.entries()) {
            switch (state) {
                case RunState.STOPPED:
                    system.stop();
                    break;
                case RunState.RUNNING:
                    system.restart();
                    break;
            }
        }
        this.deferredControls.clear();
    }
}

const MAGIC_COOKIE = {};
/**
 * A container for entities, components, and systems, and the sole entry point to all functionality.
 * Normally you'll create just one world for your game or app.
 */
class World {
    __dispatcher;
    /**
     * Creates a world that contains entities, components and systems.  All systems will be
     * instantiated and initialized before the returned promise resolves.
     *
     * You cannot add more component or system types once the world has been created. You can create
     * multiple worlds but they will not share entities, and must not share component types.  (They
     * can share system types, but each will have its own instances of them.)
     *
     * @param options The options with which to initialize the world.
     *
     * @returns A promise of a new world to do with as you please.
     */
    static async create(options = {}) {
        const world = new World(options, MAGIC_COOKIE);
        await world.__dispatcher.initialize();
        return world;
    }
    static defineEnum(name, ...componentTypes) {
        if (typeof name === 'function') {
            componentTypes.unshift(name);
            name = '';
        }
        name = name || '<anonymous>';
        return new ComponentEnum(name, componentTypes);
    }
    /**
     * This is a private constructor, please use the World.create() method instead.
     */
    constructor(options, magicCookie) {
        {
            if (magicCookie !== MAGIC_COOKIE) {
                throw new CheckError(`Don't call World constructor directly; use World.create instead`);
            }
        }
        this.__dispatcher = new Dispatcher(options);
    }
    /**
     * Executes a function that creates and updates entities.  The function gets executed in the
     * context of a no-op system so it can access all its convenience methods.  You can only invoke
     * this method when the world is not executing, e.g. during initial setup or between frames.
     *
     * @param callback The function to execute.  It receives a system as the sole argument, which it
     * can use to create new entities.  You can retain references to these entities within the
     * function but you must be careful not to let them leak out, as the entity objects are merely
     * handles that will be reassigned without warning.  (The entities themselves will persist, of
     * course.)
     */
    build(callback) {
        {
            if (this.__dispatcher.state !== State.setup &&
                (typeof process === 'undefined' || "development" !== 'test')) {
                throw new CheckError('This method cannot be called after the world has started executing');
            }
        }
        this.__dispatcher.executeFunction(callback);
    }
    /**
     * Creates a new entity and add it to the world.  The entity is not returned -- if you need that,
     * use `build` instead.
     *
     * @param initialComponents The types of the components to add to the new entity, optionally
     * interleaved with their initial properties.
     */
    createEntity(...initialComponents) {
        {
            if (this.__dispatcher.state !== State.setup &&
                (typeof process === 'undefined' || "development" !== 'test')) {
                throw new CheckError('This method cannot be called after the world has started executing');
            }
        }
        this.__dispatcher.createEntity(initialComponents);
    }
    /**
     * Executes all the systems defined during the world's creation.  The systems will be executed as
     * ordered by their constraints, *not* in the order they were defined.  See
     * {@link System.schedule} for details.
     *
     * @param time The time of this frame's execution.  This will be set on every system's `time`
     * property and defaults to the time when `execute` was called.  It's not used internally so you
     * can pass in any numeric value that's expected by your systems.
     *
     * @param delta The duration since the last frame's execution.  This will be set on every system's
     * `delta` property and default to the duration since the previous call to `execute`. It's not
     * used internally so you can pass in any numeric value that's expected by your systems.
     */
    execute(time, delta) {
        return this.__dispatcher.execute(time, delta);
    }
    /**
     * Controls the running state of systems by stopping or restarting them.  Stopped systems won't
     * update their queries and generally won't consume resources.  Restarting a system is a
     * potentially expensive operation so you should only use this facility for major state changes,
     * e.g. between scenes.  Restarted systems will not backfill any reactive queries with events that
     * happened while they were stopped.
     *
     * You can call this method at any time but the control instructions will only be applied between
     * frames.
     *
     * @param options The control instructions.
     */
    control(options) {
        this.__dispatcher.control(options);
    }
    /**
     * Creates an executor that allows you to run a subset of all defined systems in a frame, or run
     * some of them multiple times.  You can switch which executor you use between frames or even
     * interleave running becsy's default execution strategy with your own executors.  However, if
     * there are systems that won't be running for a while (because they're not in any of your
     * executor's groups) you must still stop them explicitly or you'll run out of reserved buffer
     * space.
     *
     * Creating an executor is a potentially expensive operation so you should create them all up
     * front for the various combinations of system groups you might want to run.
     *
     * @param groups All the possible groups of systems that this executor might want to run.  The
     * groups must be a subset of the world's defined groups.  Every group must be executed regularly
     * at least once every few frames, otherwise you'll likely overflow reserved buffer space.  (This
     * is true even if the groups overlap, as execution is tracked at a group level, not for
     * individual systems.)
     *
     * @returns A frame executor that lets you manually run system groups within a frame.
     */
    createCustomExecutor(...groups) {
        return new FrameImpl(this.__dispatcher, groups);
    }
    /**
     * Terminates this world once the current frame (if any) completes.  All workers will be
     * terminated and no further executions will be allowed.
     */
    async terminate() {
        await this.__dispatcher.terminate();
    }
    get stats() {
        return this.__dispatcher.stats;
    }
    /**
     * Returns whether this world is alive and capable of execution (true), or has been terminated
     * (false).
     */
    get alive() {
        return this.__dispatcher.state !== State.done;
    }
}


//# sourceMappingURL=index.js.map


/***/ })

};
;

// load runtime
import __webpack_require__ from "./lib.echo-d.js";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
import * as __webpack_chunk_0__ from "./becsy.echo-d.js";
__webpack_require__.C(__webpack_chunk_0__);
var __webpack_exports__ = __webpack_exec__("./lib/extra/storage/becsy.js");
__webpack_exports__ = await __webpack_exports__;
var __webpack_exports__BecsyStorage = __webpack_exports__.BecsyStorage;
export { __webpack_exports__BecsyStorage as BecsyStorage };

//# sourceMappingURL=becsy.echo-d.js.map