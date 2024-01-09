/******/ var __webpack_modules__ = ({

/***/ "./lib/actions/actor.js":
/*!******************************!*\
  !*** ./lib/actions/actor.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActorActions: () => (/* binding */ ActorActions),
/* harmony export */   ActorActionsFactory: () => (/* binding */ ActorActionsFactory),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options.js */ "./lib/options.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbols.js */ "./lib/symbols.js");


/**
 * Creates a new instance of the ActorActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the ActorActions class.
 * @returns {any} - A new class that extends the provided Parent class and the ActorActions class.
 */
const ActorActionsFactory = (Parent = Object) => class ActorActions extends Parent {
    /**
     * Handles input for a specific actor in the current context.
     *
     * @param {any[] | InputPayload} payload - The payload containing the actor's id and the input to be handled.
     * @param {Context} context - The current context in which the actor input is to be handled.
     * @param {Options | any} options - The options for handling the actor input. If an instance of Options is not provided, a new one will be created.
     */
    actorInput(payload, context, options) {
        options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { skipPending, getActorId, compressStringsAsInts } = options;
        let input;
        let tick = 0;
        if (Array.isArray(payload)) {
            input = payload[0];
            tick = payload[1];
        }
        else {
            input = payload;
        }
        let id = getActorId(input?.id, context);
        if (id === undefined || id === null || id === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (id === '') {
                return;
            }
        }
        if (!input?.id) {
            input.id = id;
        }
        context.actorInput(id, input, tick, skipPending);
    }
    /**
     * Retrieves actors from the current context and sends them to the responder.
     *
     * @param {any} payload - This parameter is not used in the function.
     * @param {Context} context - The current context from which the actors are retrieved.
     * @param {Options | any} options - The options for retrieving actors. If an instance of Options is not provided, a new one will be created.
     */
    actors(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { responder, isAuthority, isAsyncStorage, pageSize, enableQuerying, enumDefaultSymbols } = options;
        if (!isAuthority) {
            return;
        }
        const sendActors = (pages) => {
            // send pages to responder
            for (const page of pages) {
                responder([enumDefaultSymbols.mergeActors, page]);
            }
        };
        const ctxActors = context.getActors(enableQuerying ? payload : null, pageSize);
        if (isAsyncStorage) {
            ctxActors.emitTo(sendActors);
        }
        else {
            sendActors(ctxActors);
        }
    }
    /**
     * Merges actors into the current context.
     *
     * @param {any[]} payload - The payload containing the actors to be merged.
     * @param {Context} context - The current context in which the actors are to be merged.
     * @param {Options | any} options - The options for merging. If an instance of Options is not provided, a new one will be created.
     */
    mergeActors(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        context.mergeActors(payload, options);
    }
    /**
     * Removes an actor from the current context.
     *
     * @param {any} id - The identifier for the actor to be removed.
     * @param {Context} context - The current context from which the actor is to be removed.
     * @param {Options | any} options - The options for removing the actor. If an instance of Options is not provided, a new one will be created.
     */
    removeActor(id, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { skipPending, getActorId, compressStringsAsInts } = options;
        id = getActorId(id, context);
        if (id === undefined || id === null || id === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (id === '') {
                return;
            }
        }
        context.removeActor(id, skipPending);
    }
    /**
     * Spawns a new actor in the current context.
     *
     * @param {any} id - The identifier for the actor to be spawned.
     * @param {Context} context - The current context in which the actor is to be spawned.
     * @param {OptionsExtended | any} options - The options for spawning the actor. If an instance of Options is not provided, a new one will be created.
     */
    spawnActor(id, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { skipPending, getActorId, compressStringsAsInts } = options;
        id = getActorId(id, context);
        if (id === undefined || id === null || id === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (id === '') {
                return;
            }
        }
        context.spawnActor(id, skipPending);
    }
};
/**
 * Class representing actions that can be performed on actors.
 * This class encapsulates the logic for merging, spawning, removing, and handling input for actors.
 */
class ActorActions extends ActorActionsFactory() {
}
const __ActorActions__ = new ActorActions();
/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions class.
 */
const actions = {
    /**
     * Handles input for a specific actor in the current context.
     */
    actorInput: __ActorActions__.actorInput,
    /**
     * Retrieves actors from the current context.
     */
    actors: __ActorActions__.actors,
    /**
     * Merges actors into the current context.
     */
    mergeActors: __ActorActions__.mergeActors,
    /**
     * Removes an actor from the current context.
     */
    removeActor: __ActorActions__.removeActor,
    /**
     * Spawns a new actor in the current context.
     */
    spawnActor: __ActorActions__.spawnActor
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/actions/component.js":
/*!**********************************!*\
  !*** ./lib/actions/component.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentActions: () => (/* binding */ ComponentActions),
/* harmony export */   ComponentActionsFactory: () => (/* binding */ ComponentActionsFactory),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options.js */ "./lib/options.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbols.js */ "./lib/symbols.js");


/**
 * Creates a new instance of the ComponentActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the ComponentActions class.
 * @returns {any} - A new class that extends the provided Parent class and the ComponentActions class.
 */
const ComponentActionsFactory = (Parent = Object) => class ComponentActions extends Parent {
    /**
     * Changes a component in the current context.
     *
     * @param {any[]} payload - The payload containing the component's id, key, and the new value.
     * @param {Context} context - The current context in which the component is to be changed.
     * @param {Options | any} options - The options for changing the component. If an instance of Options is not provided, a new one will be created.
     */
    changeComponent(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { compressStringsAsInts, types, isOrdered } = options;
        let [id, key, value] = payload;
        let tick = isOrdered ? payload[3] : 0;
        if (id === undefined || id === null || id === '' ||
            key === undefined || key === null || key === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (!id) {
                return;
            }
            key = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(key, context, options);
            if (!key) {
                return;
            }
            const type = types[key];
            if (type && (type === String || type[0] === String)) {
                value = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.recursiveSymbolExtraction)(key, value, context, options);
                if (!value) {
                    return;
                }
            }
        }
        context.changeComponent(id, key, value, tick, options);
    }
    /**
     * Retrieves components from the current context and sends them to the responder.
     *
     * @param {any} payload - The payload containing the request for components.
     * @param {Context} context - The current context from which the components are retrieved.
     * @param {Options | any} options - The options for retrieving components. If an instance of Options is not provided, a new one will be created.
     */
    components(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { responder, isAuthority, isAsyncStorage, pageSize, enableQuerying, enumDefaultSymbols } = options;
        if (!isAuthority) {
            return;
        }
        const sendComponents = (pages) => {
            // return responder([enumDefaultSymbols.mergeComponents, components])
            // send pages to responder
            for (const page of pages) {
                responder([
                    enumDefaultSymbols.mergeComponents,
                    page
                ]);
            }
        };
        const ctxComponents = context.getComponents(enableQuerying ? payload : null, pageSize);
        if (isAsyncStorage) {
            ctxComponents.emitTo(sendComponents);
        }
        else {
            sendComponents(ctxComponents);
        }
    }
    /**
     * Merges components into the current context.
     *
     * @param {any[]} payload - The payload containing the components to be merged.
     * @param {Context} context - The current context in which the components are to be merged.
     * @param {Options | any} options - The options for merging. If an instance of Options is not provided, a new one will be created.
     */
    mergeComponents(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        context.mergeComponents(payload, options);
    }
    /**
     * Removes a component from the current context.
     *
     * @param {any[]} payload - The payload containing the component's id and key to be removed.
     * @param {Context} context - The current context from which the component is to be removed.
     * @param {Options | any} options - The options for removing the component. If an instance of Options is not provided, a new one will be created.
     */
    removeComponent(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { compressStringsAsInts } = options;
        let [id, key] = payload;
        if (id === undefined || id === null || id === '' ||
            key === undefined || key === null || key === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (!id) {
                return;
            }
            key = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(key, context, options);
            if (!key) {
                return;
            }
        }
        context.removeComponent(id, key, options);
    }
    /**
     * Inserts a new component or updates an existing one in the current context.
     *
     * @param {any[]} payload - The payload containing the component's id, key, and the new value.
     * @param {Context} context - The current context in which the component is to be upserted.
     * @param {OptionsExtended | any} options - The options for upserting the component. If an instance of Options is not provided, a new one will be created.
     */
    upsertComponent(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { compressStringsAsInts, types, isOrdered } = options;
        let [id, key, value] = payload;
        let tick = isOrdered ? payload[3] : 0;
        if (id === undefined || id === null || id === '' ||
            key === undefined || key === null || key === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (!id) {
                return;
            }
            key = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(key, context, options);
            if (!key) {
                return;
            }
            const type = types[key];
            if (type && (type === String || type[0] === String)) {
                value = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.recursiveSymbolExtraction)(key, value, context, options);
                if (!value) {
                    return;
                }
            }
        }
        context.upsertComponent(id, key, value, tick, options);
    }
};
/**
 * Class representing actions that can be performed on components.
 * This class encapsulates the logic for merging, retrieving, and changing components.
 */
class ComponentActions extends ComponentActionsFactory() {
}
const __ComponentActions__ = new ComponentActions();
/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions class.
 */
const actions = {
    /**
     * Changes a component in the current context.
     */
    changeComponent: __ComponentActions__.changeComponent,
    /**
     * Retrieves components from the current context.
     */
    components: __ComponentActions__.components,
    /**
     * Merges components into the current context.
     */
    mergeComponents: __ComponentActions__.mergeComponents,
    /**
     * Removes a component from the current context.
     */
    removeComponent: __ComponentActions__.removeComponent,
    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     */
    upsertComponent: __ComponentActions__.upsertComponent
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/actions/core.js":
/*!*****************************!*\
  !*** ./lib/actions/core.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoreActions: () => (/* binding */ CoreActions),
/* harmony export */   CoreActionsFactory: () => (/* binding */ CoreActionsFactory),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handler.js */ "./lib/handler.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../options.js */ "./lib/options.js");


/**
 * Creates a new instance of the CoreActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the CoreActions class.
 * @returns {any} - A new class that extends the provided Parent class and the CoreActions class.
 */
const CoreActionsFactory = (Parent = Object) => class CoreActions extends Parent {
    /**
     * Processes a batch of payloads in the current context.
     *
     * @param {any[]} payload - The array of payloads to be processed.
     * @param {Context} context - The current context in which the payloads are to be processed.
     * @param {Options | any} options - The options for processing the payloads. If an instance of Options is not provided, a new one will be created.
     */
    batch(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_1__.Options.ensure(options, this);
        (0,_handler_js__WEBPACK_IMPORTED_MODULE_0__.manyHandler)(payload, context, options);
    }
};
/**
 * The CoreActions class provides the core functionality for managing actions in your application.
 */
class CoreActions extends CoreActionsFactory() {
}
const __CoreActions__ = new CoreActions();
/**
 * An object that maps the names of actions to their corresponding methods in the CoreActions class.
 */
const actions = {
    /**
     * Processes a batch of payloads in the current context.
     */
    batch: __CoreActions__.batch
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/actions/entity.js":
/*!*******************************!*\
  !*** ./lib/actions/entity.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EntityActions: () => (/* binding */ EntityActions),
/* harmony export */   EntityActionsFactory: () => (/* binding */ EntityActionsFactory),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options.js */ "./lib/options.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbols.js */ "./lib/symbols.js");


/**
 * Creates a new instance of the EntityActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the EntityActions class.
 * @returns {any} - A new class that extends the provided Parent class and the EntityActions class.
 */
const EntityActionsFactory = (Parent = Object) => class EntityActions extends Parent {
    /**
     * Creates a new entity in the current context.
     *
     * @param {any} id - The identifier for the entity to be created.
     * @param {Context} context - The current context in which the entity is to be created.
     * @param {Options | any} options - The options for creating the entity. If an instance of Options is not provided, a new one will be created.
     */
    createEntity(id, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { skipPending, compressStringsAsInts } = options;
        if (id === undefined || id === null || id === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (id === '') {
                return;
            }
        }
        context.createEntity(id, skipPending);
    }
    /**
     * Retrieves entities from the current context.
     *
     * @param {any} payload - This parameter is not used in the method.
     * @param {Context} context - The current context from which the entities are retrieved.
     * @param {OptionsExtended | any} options - The options for retrieving entities. If an instance of Options is not provided, a new one will be created.
     */
    entities(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { responder, isAuthority, isAsyncStorage, pageSize, enableQuerying, enumDefaultSymbols } = options;
        if (!isAuthority) {
            return;
        }
        const sendEntities = (pages) => {
            for (const page of pages) {
                responder([enumDefaultSymbols.mergeEntities, page]);
            }
        };
        const ctxEntities = context.getEntities(enableQuerying ? payload : null, pageSize);
        if (isAsyncStorage) {
            ctxEntities.emitTo(sendEntities);
        }
        else {
            sendEntities(ctxEntities);
        }
    }
    /**
     * Merges entities into the current context.
     *
     * @param {any[]} payload - The payload containing the entities to be merged.
     * @param {Context} context - The current context in which the entities are to be merged.
     * @param {OptionsExtended | any} options - The options for merging. If an instance of Options is not provided, a new one will be created.
     */
    mergeEntities(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        context.mergeEntities(payload, options);
    }
    /**
     * Removes an entity from the current context.
     *
     * @param {any} id - The identifier for the entity to be removed.
     * @param {Context} context - The current context from which the entity is to be removed.
     * @param {OptionsExtended | any} options - The options for removing the entity. If an instance of Options is not provided, a new one will be created.
     */
    removeEntity(id, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { skipPending, compressStringsAsInts } = options;
        if (id === undefined || id === null || id === '') {
            return;
        }
        if (compressStringsAsInts) {
            id = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.extractSymbol)(id, context, options);
            if (id === '') {
                return;
            }
        }
        context.removeEntity(id, skipPending);
    }
};
/**
 * Class representing actions that can be performed on entities.
 * This class encapsulates the logic for creating, merging, and removing entities.
 */
class EntityActions extends EntityActionsFactory() {
}
const __EntityActions__ = new EntityActions();
/**
 * An object that maps the names of actions to their corresponding methods in the EntityActions class.
 */
const actions = {
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
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/actions/symbol.js":
/*!*******************************!*\
  !*** ./lib/actions/symbol.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SymbolActions: () => (/* binding */ SymbolActions),
/* harmony export */   SymbolActionsFactory: () => (/* binding */ SymbolActionsFactory),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options.js */ "./lib/options.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./lib/utils.js");


/**
 * Creates a new instance of the SymbolActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the SymbolActions class.
 * @returns {any} - A new class that extends the provided Parent class and the SymbolActions class.
 */
const SymbolActionsFactory = (Parent = Object) => class SymbolActions extends Parent {
    /**
     * Adds a symbol to the current context.
     *
     * @param {any} symbol - The symbol to be added.
     * @param {Context} context - The current context to which the symbol is to be added.
     * @param {Options | any} options - The options for adding the symbol. If an instance of Options is not provided, a new one will be created.
     */
    addSymbol(symbol, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        return context.addSymbol(symbol, options);
    }
    /**
     * Fetches a symbol for the current context.
     *
     * @param {string | number} payload - The payload containing the symbol to be fetched.
     * @param {Context} context - The current context from which the symbol is to be fetched.
     * @param {Options | any} options - The options for fetching the symbol. If an instance of Options is not provided, a new one will be created.
     */
    fetchSymbol(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { responder, enumDefaultSymbols } = options;
        return context.fetchSymbol(payload, options, (symbolTuple) => {
            responder([enumDefaultSymbols.mergeSymbol, symbolTuple]);
        });
    }
    /**
     * Retrieves a symbol from the current context by its index.
     *
     * @param {number} index - The index of the symbol to be retrieved.
     * @param {Context} context - The current context from which the symbol is to be retrieved.
     * @param {Options | any} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    getSymbol(index, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        return context.getSymbol(index, options);
    }
    /**
     * Merges a symbol into the current context.
     *
     * @param {[string, number]} payload - The payload containing the symbol to be merged.
     * @param {Context} context - The current context into which the symbol is to be merged.
     * @param {Options | any} options - The options for merging the symbol. If an instance of Options is not provided, a new one will be created.
     */
    mergeSymbol(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        context.mergeSymbol(payload, options);
    }
    /**
     * Merges multiple symbols into the current context.
     *
     * @param {any[]} payload - The payload containing the symbols to be merged.
     * @param {Context} context - The current context into which the symbols are to be merged.
     * @param {Options | any} options - The options for merging the symbols. If an instance of Options is not provided, a new one will be created.
     */
    mergeSymbols(payload, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const [offset, symbols] = payload;
        if (payload && payload.length) {
            context.resetSymbols(offset, symbols, options);
        }
    }
    /**
     * Retrieves a symbol from the current context.
     *
     * @param {any} symbol - The symbol to be retrieved.
     * @param {Context} context - The current context from which the symbol is to be retrieved.
     * @param {Options | any} options - The options for retrieving the symbol. If an instance of Options is not provided, a new one will be created.
     */
    symbol(symbol, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { actions, responder, isAuthority, enumDefaultSymbols, compressStringsAsInts } = options;
        if (!isAuthority || !compressStringsAsInts) {
            return;
        }
        const enumSymbols = context.symbolsEnum ?? {};
        let index = Object.prototype.hasOwnProperty.call(enumSymbols, symbol) ? enumSymbols[symbol] : -1;
        if (index === -1) {
            index = actions.addSymbol(symbol, context, options);
        }
        if (index !== -1) {
            responder([enumDefaultSymbols.mergeSymbol, [symbol, index]]);
        }
    }
    /**
     * Retrieves all symbols from the current context.
     *
     * @param {any} _ - This parameter is not used.
     * @param {Context} context - The current context from which the symbols are to be retrieved.
     * @param {Options | any} options - The options for retrieving the symbols. If an instance of Options is not provided, a new one will be created.
     */
    symbols(_, context, options) {
        options = options = _options_js__WEBPACK_IMPORTED_MODULE_0__.Options.ensure(options, this);
        const { responder, isAuthority, pageSize, enumDefaultSymbols, compressStringsAsInts } = options;
        if (!isAuthority || !compressStringsAsInts) {
            return;
        }
        const symbols = context.symbolsList;
        if (symbols && symbols.length) {
            // responder([enumDefaultSymbols.mergeSymbols, 0, symbols])
            const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.paginate)(symbols, pageSize);
            let i = 0;
            // send pages to responder
            for (const page of pages) {
                responder([enumDefaultSymbols.mergeSymbols, i, page]);
                i += pageSize;
            }
        }
    }
};
/**
 * The SymbolActions class provides methods for managing symbols in a context.
 */
class SymbolActions extends SymbolActionsFactory() {
}
const __SymbolActions__ = new SymbolActions();
/**
 * An object that maps the names of actions to their corresponding methods in the SymbolActions class.
 */
const actions = {
    /**
     * Adds a symbol to the current context.
     */
    addSymbol: __SymbolActions__.addSymbol,
    /**
     * Fetches a symbol from the current context.
     */
    fetchSymbol: __SymbolActions__.fetchSymbol,
    /**
     * Retrieves a symbol from the current context by its index.
     */
    getSymbol: __SymbolActions__.getSymbol,
    /**
     * Merges a symbol into the current context.
     */
    mergeSymbol: __SymbolActions__.mergeSymbol,
    /**
     * Merges multiple symbols into the current context.
     */
    mergeSymbols: __SymbolActions__.mergeSymbols,
    /**
     * Retrieves a symbol from the current context.
     */
    symbol: __SymbolActions__.symbol,
    /**
     * Retrieves all symbols from the current context.
     */
    symbols: __SymbolActions__.symbols
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/changes.js":
/*!************************!*\
  !*** ./lib/changes.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Changes: () => (/* binding */ Changes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");

/**
 * The Changes class provides methods for managing changes in a context.
 *
 * @property {Context} context - The context in which changes are to be managed.
 * @property {Record<string, any>} diffs - The diffs of the changes.
 */
class Changes {
    context;
    diffs;
    /**
     * Creates a new instance of the Changes class.
     *
     * @param {Context} context - The context in which changes are to be managed.
     * @param {ChangesInput} changes - An optional initial set of changes.
     */
    constructor(context, changes) {
        this.context = context;
        this.diffs = changes?.diffs || {};
    }
    /**
     * Changes a component in the current context.
     *
     * @param {string} id - The ID of the component to be changed.
     * @param {string} key - The key of the property to be changed.
     * @param {any} newValue - The new value of the property.
     */
    changeComponent(id, key, newValue) {
        return this.upsertComponent(id, key, newValue);
    }
    /**
     * Retrieves the changes of a value.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the property.
     * @returns {Record<string, any>} The diffs.
     */
    getValue(id, key) {
        return this.diffs[id]?.[key];
    }
    /**
     * Resets the changes to a new set of changes or an empty object if no changes are provided.
     *
     * @param {ChangesInput} changes - The new set of changes.
     * @returns {Changes} The instance of the Changes class.
     */
    reset(changes) {
        this.diffs = changes?.diffs || {};
        return this;
    }
    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     *
     * @param {string} id - The ID of the component to be updated or inserted.
     * @param {string} key - The key of the property to be updated or inserted.
     * @param {any} newValue - The new value of the property.
     * @returns {any} The new value.
     */
    upsertComponent(id, key, newValue) {
        this.diffs[id] = this.diffs[id] || {};
        const context = this.context;
        const components = context.components;
        const currentScope = components[id];
        let diffObject = this.diffs[id];
        const recursiveDiff = (key, diff, scope, nextVal) => {
            if (!scope) {
                return [diff, nextVal];
            }
            const prevType = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.typeOf)(scope[key]);
            const nextType = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.typeOf)(nextVal);
            if (prevType !== nextType) {
                diff[key] = nextVal;
                diff = diff[key];
                return [diff, nextVal];
            }
            switch (nextType) {
                case 'bigint':
                case 'number': {
                    const v1 = scope[key];
                    const v2 = nextVal;
                    const d = v2 - v1;
                    scope[key] = v2;
                    diff[key] = d;
                    break;
                }
                case 'array':
                    diff = diff[key];
                    scope = scope[key];
                    for (let i = 0; i < nextVal.length; i += 1) {
                        recursiveDiff(i.toString(), diff, scope, nextVal[i]);
                    }
                    break;
                case 'object':
                    diff = diff[key];
                    scope = scope[key];
                    for (const k of Object.keys(nextVal)) {
                        recursiveDiff(k, diff, scope, nextVal[k]);
                    }
                    break;
                default:
                    diff[key] = nextVal;
            }
            diff = diff[key];
            nextVal = nextVal[key];
            return [diff, nextVal];
        };
        [diffObject, newValue] = recursiveDiff(key, diffObject, currentScope, newValue);
        return newValue;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Changes);


/***/ }),

/***/ "./lib/client.js":
/*!***********************!*\
  !*** ./lib/client.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientActions: () => (/* binding */ ClientActions),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node.js */ "./lib/node.js");

class ClientActions extends _node_js__WEBPACK_IMPORTED_MODULE_0__.NodeActions {
    /**
     * Disable actions that should not be handled on the client.
     */
    actors() { }
    /**
     * Disable actions that should not be handled on the client.
     */
    components() { }
    /**
     * Disable actions that should not be handled on the client.
     */
    entities() { }
    /**
     * Disable actions that should not be handled on the client.
     */
    symbol() { }
    /**
     * Disable actions that should not be handled on the client.
     */
    symbols() { }
}
/**
 * An object that maps the names of actions.
 */
const actions = {
    /**
     * The actions related to nodes, imported from the node module.
     */
    ..._node_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    /**
     * Disable actions that should not be handled on the client.
     */
    actors: null,
    /**
     * Disable actions that should not be handled on the client.
     */
    components: null,
    /**
     * Disable actions that should not be handled on the client.
     */
    entities: null,
    /**
     * Disable actions that should not be handled on the client.
     */
    symbol: null,
    /**
     * Disable actions that should not be handled on the client.
     */
    symbols: null
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/constants.js":
/*!**************************!*\
  !*** ./lib/constants.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Actions: () => (/* binding */ Actions),
/* harmony export */   CommonComponents: () => (/* binding */ CommonComponents),
/* harmony export */   DefaultSymbols: () => (/* binding */ DefaultSymbols),
/* harmony export */   batchActionPayloadSizes: () => (/* binding */ batchActionPayloadSizes),
/* harmony export */   defaultGetActorId: () => (/* binding */ defaultGetActorId),
/* harmony export */   defaultGetGroupedValue: () => (/* binding */ defaultGetGroupedValue),
/* harmony export */   defaultOptions: () => (/* binding */ defaultOptions),
/* harmony export */   defaultSetGroupedValue: () => (/* binding */ defaultSetGroupedValue),
/* harmony export */   defaultUpdateOptions: () => (/* binding */ defaultUpdateOptions),
/* harmony export */   defaultValidKeys: () => (/* binding */ defaultValidKeys),
/* harmony export */   enumActions: () => (/* binding */ enumActions),
/* harmony export */   enumCommonComponents: () => (/* binding */ enumCommonComponents),
/* harmony export */   enumDefaultSymbols: () => (/* binding */ enumDefaultSymbols),
/* harmony export */   padEnum: () => (/* binding */ padEnum),
/* harmony export */   voidResponder: () => (/* binding */ voidResponder)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");

/**
 * An array of action names.
 */
const Actions = [
    'actorInput',
    'actors',
    'addSymbol',
    'batch',
    'changeComponent',
    'components',
    'createEntity',
    'entities',
    'fetchSymbol',
    'getSymbol',
    'mergeActors',
    'mergeComponents',
    'mergeEntities',
    'mergeSymbols',
    'mergeSymbol',
    'removeActor',
    'removeComponent',
    'removeEntity',
    'spawnActor',
    'symbol',
    'symbols',
    // 'tick',
    // 'tock',
    'upsertComponent'
];
/**
 * An array of common component names.
 */
const CommonComponents = [
    'asset',
    'collider',
    'color',
    'hidden',
    'position',
    'rotation',
    'velocity',
    'spin'
];
/**
 * A set of default symbols, which is the union of Actions and CommonComponents.
 */
const DefaultSymbols = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.unionSetOrArray)(Actions, CommonComponents);
/**
 * Padding for the enum.
 */
const padEnum = 0; // 10;
/**
 * An enum of action names.
 */
const enumActions = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEnum)(Actions, padEnum);
/**
 * An enum of common component names.
 */
const enumCommonComponents = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEnum)(CommonComponents, Actions.length + padEnum);
/**
 * An enum of default symbols.
 */
const enumDefaultSymbols = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEnum)(DefaultSymbols, padEnum);
/**
 * An object that maps action names to their payload sizes.
 */
const batchActionPayloadSizes = {
    actorInput: { default: 1, rollback: 2 },
    changeComponent: { default: 3, ordered: 4 },
    mergeSymbols: 2,
    removeComponent: 2,
    upsertComponent: { default: 3, ordered: 4 }
};
/**
 * Default options for the application.
 */
const defaultOptions = {
    compressStringsAsInts: true,
    enableRollback: !true,
    enableQuerying: !true,
    isAuthority: true,
    isAsyncStorage: false,
    isComponentRelay: true,
    isDiffed: false,
    isGroupedComponents: !true,
    isOrdered: !true,
    isReadOnly: false,
    isSymbolLeader: false,
    isSymbolRelay: false,
    pageSize: 100,
    skipPending: false,
    indexes: {
        // asset: { type: 'sorted' },
        // collider: { type: 'sorted' },
        // color: { type: 'sorted' },
        // hidden: { type: 'sorted' },
        position: { type: 'spatial' },
    },
    types: {
        asset: 'str',
        collider: 'str',
        color: 'str',
        hidden: 'bool',
        position: ['f32', 3],
        rotation: ['f32', 3],
        velocity: ['f32', 3],
        spin: ['f32', 3],
    }
};
/**
 * Default options for updates.
 */
const defaultUpdateOptions = {
    mask: {
        actors: true,
        entities: true,
        components: true,
        inputs: true,
        symbols: true
    } && null,
    type: true,
    batched: true,
    batchSize: 100
};
/**
 * An object that maps keys to their validity.
 */
const defaultValidKeys = {
    collider: true,
    color: true,
    hidden: true,
    position: true,
    rotation: true,
    velocity: true,
    spin: true
};
/**
 * A responder function that does nothing and returns nothing.
 */
function voidResponder() { }
/**
 * A function that retrieves the actor ID from a payload.
 *
 * @param {string} id - The payload from which the actor ID is to be retrieved.
 * @param {any} _context - The current context. This parameter is not used.
 * @returns {string | undefined} The actor ID, or undefined if it cannot be found.
 */
function defaultGetActorId(id, _context) {
    return id;
}
/**
 * A function that retrieves the grouped value from a payload.
 *
 * @param {any | any[]} value - The payload from which the grouped value is to be retrieved.
 * @param {number} i - The index of the payload.
 * @param {Object} types - An object containing the types.
 * @param {string} key - The key of the grouped value.
 * @returns {any} The value from the group.
 */
function defaultGetGroupedValue(value, i, types, key) {
    const type = types[key];
    if (Array.isArray(type)) {
        return value.slice(i * type[1], (i + 1) * type[1]);
    }
    return value[i];
}
/**
 * A function that sets the grouped value in a payload.
 *
 * @param {any} value - The payload in which the grouped value is to be set.
 * @param {Object} _types - An object containing the types.
 * @param {string} _key - The key of the grouped value.
 * @returns {any} The value from the group.
 */
function defaultSetGroupedValue(value, _types, _key) {
    return value;
}


/***/ }),

/***/ "./lib/context.js":
/*!************************!*\
  !*** ./lib/context.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Context: () => (/* binding */ Context),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _changes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changes.js */ "./lib/changes.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options.js */ "./lib/options.js");
/* harmony import */ var _ordered_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ordered.js */ "./lib/ordered.js");
/* harmony import */ var _pending_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pending.js */ "./lib/pending.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./symbols.js */ "./lib/symbols.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storage.js */ "./lib/storage.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node.js */ "./lib/node.js");








/**
 * The Context class provides methods for managing the context.
*
* @property {any} events - The events.
* @property {Storage} store - The store.
* @property {Ordered | null} order - The order.
* @property {Changes | null} changes - The changes.
* @property {Pending | null} pending - The pending.
*/
class Context {
    /**
     * Ensures that the given context is an instance of the Context class.
     *
     * @param {Context | ContextProps} context - The context to ensure.
     * @param {Options | any} options - The options for ensuring the context.
     * @param {Storage} _Storage - The store.
     * @returns {Context} The context.
     */
    static ensure(context, options, _Storage = _storage_js__WEBPACK_IMPORTED_MODULE_5__.Storage) {
        if (context instanceof Context) {
            return context;
        }
        return new Context(context, options, _Storage);
    }
    /**
     * Creates a new instance of the Context class.
     *
     * @param {Context | ContextProps} context - The context properties.
     * @param {Options | any} options - The context options.
     * @param {Storage} _Storage - The store.
     */
    constructor(context = {}, options, _Storage = _storage_js__WEBPACK_IMPORTED_MODULE_5__.Storage) {
        const { events = null, store = null, order = null, changes = null, symbols = null, pending = null,
        // ...otherProps
         } = context;
        options = _options_js__WEBPACK_IMPORTED_MODULE_1__.Options.ensure(options, options?.actions || _node_js__WEBPACK_IMPORTED_MODULE_7__.allActions);
        const { isOrdered, isDiffed, isReadOnly, compressStringsAsInts, enableQuerying, enumDefaultSymbols, worldOptions, indexes, types, } = options;
        if (isOrdered) {
            this.order = new _ordered_js__WEBPACK_IMPORTED_MODULE_2__.Ordered(order);
        }
        else {
            this.order = null;
        }
        if (isDiffed) {
            this.changes = new _changes_js__WEBPACK_IMPORTED_MODULE_0__.Changes(this, changes);
        }
        else {
            this.changes = null;
        }
        if (compressStringsAsInts) {
            if (symbols) {
                this.symbols = new _symbols_js__WEBPACK_IMPORTED_MODULE_4__.Symbols(symbols);
            }
            else {
                this.symbols = new _symbols_js__WEBPACK_IMPORTED_MODULE_4__.Symbols();
                this.symbols.copyEnum(enumDefaultSymbols);
            }
        }
        else {
            this.symbols = null;
        }
        if (isReadOnly) {
            this.pending = null;
        }
        else {
            this.pending = pending || new _pending_js__WEBPACK_IMPORTED_MODULE_3__.Pending();
        }
        this.events = events;
        this.store = store || new _Storage(store, {
            types,
            indexes: enableQuerying ? indexes : null,
            worldOptions
        });
        // Object.assign(this, otherProps)
    }
    /**
     * Gets the actors from the store.
     *
     * @returns The actors from the store.
     */
    get actors() {
        return this.getActors(null, Infinity);
    }
    /**
     * Gets the actors from the store with the given query.
     *
     * @param {any} query - The query for getting the actors.
     * @param {number} pageSize - The page size for getting the actors.
     * @returns {Emitter<string[][]> | string[][]} The actors from the store.
     */
    getActors(query, pageSize) {
        return this.store.getActors(query, pageSize);
    }
    /**
     * Spawns an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to spawn.
     * @param {Options} options - The options for spawning the actor.
     */
    spawnActor(id, options) {
        const { skipPending, onUpdate } = options;
        const added = this.store.storeActor(id);
        if (added) {
            if (!skipPending && this.pending) {
                this.pending.spawnActor(id);
            }
            if (this.events) {
                this.events.emit('spawnActor', id);
            }
            if (onUpdate) {
                onUpdate();
            }
        }
    }
    /**
     * Removes an actor with the given id and options.
     *
     * @param {string} id - The id of the actor to remove.
     * @param {Options} options - The options for removing the actor.
     */
    removeActor(id, options) {
        const { skipPending, onUpdate } = options;
        const removed = this.store.destroyActor(id);
        if (removed) {
            if (!skipPending && this.pending) {
                this.pending.removeActor(id);
            }
            if (this.events) {
                this.events.emit('removeActor', id);
            }
            if (onUpdate) {
                onUpdate();
            }
        }
    }
    /**
     * Merges actors with the given payload and options.
     *
     * @param {any[]} payload - The payload of the actors to merge.
     * @param {Options} options - The options for merging the actors.
     */
    mergeActors(payload, options) {
        const { actions, onUpdate } = options;
        const nextOptions = options.extend({
            onUpdate: null
        });
        for (const id of payload) {
            actions.spawnActor(id, this, nextOptions);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Gets the entities from the store.
     *
     * @returns The entities from the store.
     */
    get entities() {
        return this.getEntities(null, Infinity);
    }
    /**
     * Gets the entities from the store with the given query.
     *
     * @param {any} query - The query for getting the entities.
     * @param {number} pageSize - The page size for getting the entities.
     * @returns {Emitter<string[][]> | string[][]} The entities from the store.
     */
    getEntities(query, pageSize) {
        return this.store.getEntities(query, pageSize);
    }
    /**
     * Creates an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to create.
     * @param {Options} options - The options for creating the entity.
     */
    createEntity(id, options) {
        const { skipPending, onUpdate } = options;
        const added = this.store.storeEntity(id);
        if (added) {
            if (!skipPending && this.pending) {
                this.pending.createEntity(id);
            }
            if (this.events) {
                this.events.emit('createEntity', id);
            }
            if (onUpdate) {
                onUpdate();
            }
        }
    }
    /**
     * Removes an entity with the given id and options.
     *
     * @param {string} id - The id of the entity to remove.
     * @param {Options} options - The options for removing the entity.
     */
    removeEntity(id, options) {
        const { skipPending, onUpdate } = options;
        const removed = this.store.destroyEntity(id);
        if (removed) {
            if (!skipPending && this.pending) {
                this.pending.removeEntity(id);
            }
            if (this.events) {
                this.events.emit('removeEntity', id);
            }
            if (onUpdate) {
                onUpdate();
            }
        }
    }
    /**
     * Merges entities with the given payload and options.
     *
     * @param {string[]} payload - The payload of the entities to merge.
     * @param {Options} options - The options for merging the entities.
     */
    mergeEntities(payload, options) {
        const { actions, onUpdate } = options;
        const nextOptions = options.extend({
            onUpdate: null
        });
        for (const id of payload) {
            actions.createEntity(id, this, nextOptions);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Gets the components from the store.
     *
     * @returns The components from the store.
     */
    get components() {
        return this.getComponents(null, Infinity);
    }
    /**
     * Gets the components from the store with the given query.
     *
     * @param {any} query - The query for getting the components.
     * @param {number} pageSize - The page size for getting the components.
     * @returns {Emitter<Components[]> | Components[]} The components from the store.
     */
    getComponents(query, pageSize) {
        return this.store.getComponents(query, pageSize);
    }
    /**
     * Changes a component with the given id, key, value, and options.
     *
     * @param {string | string[]} id - The id of the component to change.
     * @param {string} key - The key of the component to change.
     * @param {any | any[]} value - The value to change in the component.
     * @param {number} tick - The tick value for the component. Defaults to 0.
     * @param {Options} options - The options for changing the component.
     */
    changeComponent(id, key, value, tick = 0, options) {
        const { skipPending, isGroupedComponents, getGroupedValue, types, onUpdate } = options;
        if (Array.isArray(id)) {
            if (!isGroupedComponents) {
                throw new Error('Cannot change grouped components without isGroupedComponents option');
            }
            const noUpdateOptions = options.extend({ onUpdate: null });
            for (let i = 0; i < id.length; i++) {
                this.changeComponent(id[i], key, getGroupedValue(value, i, types, key), tick, noUpdateOptions);
            }
            if (onUpdate) {
                onUpdate();
            }
            return;
        }
        const currentValue = this.store.fetchComponent(id, key);
        const pendingType = typeof currentValue === 'undefined' ? 'created' : 'updated';
        if (this.order) {
            const isValidOrder = this.order.changeComponent(id, key, tick);
            if (!isValidOrder && !this.changes) {
                // return
            }
        }
        let nextValue;
        if (pendingType === 'created') {
            nextValue = value;
        }
        else {
            [/* combined */ , nextValue] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.combineValues)(currentValue, value);
        }
        if (this.changes) {
            this.changes.changeComponent(id, key, nextValue);
        }
        else {
            this.store.storeComponent(id, key, nextValue);
        }
        if (!skipPending && this.pending) {
            this.pending.changeComponent(pendingType, id, key);
        }
        if (this.events) {
            this.events.emit('changeComponent', id, key);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Upserts a component with the given id, key, value, and options.
     *
     * @param {string} id[] - The id of the component to upsert.
     * @param {string} key - The key of the component to upsert.
     * @param {any} value - The value to upsert in the component.
     * @param {number} tick - The tick value for the component. Defaults to 0.
     * @param {Options} options - The options for upserting the component.
     */
    upsertComponent(id, key, value, tick = 0, options) {
        const { skipPending, isGroupedComponents, getGroupedValue, types, onUpdate } = options;
        if (Array.isArray(id)) {
            if (!isGroupedComponents) {
                throw new Error('Cannot upsert grouped components without isGroupedComponents option');
            }
            const noUpdateOptions = options.extend({ onUpdate: null });
            for (let i = 0; i < id.length; i++) {
                this.upsertComponent(id[i], key, getGroupedValue(value, i, types, key), tick, noUpdateOptions);
            }
            if (onUpdate) {
                onUpdate();
            }
            return;
        }
        const currentValue = this.store.fetchComponent(id, key);
        const pendingType = typeof currentValue === 'undefined' ? 'created' : 'updated';
        if (currentValue !== value) {
            if (this.order) {
                const isValidOrder = this.order.upsertComponent(id, key, tick);
                if (!isValidOrder && !this.changes) {
                    return;
                }
            }
            if (this.changes) {
                this.changes.upsertComponent(id, key, value);
            }
            else {
                this.store.storeComponent(id, key, value);
            }
            if (!skipPending && this.pending) {
                this.pending.upsertComponent(pendingType, id, key);
            }
            if (this.events) {
                this.events.emit('upsertComponent', id, key);
            }
            if (onUpdate) {
                onUpdate();
            }
        }
    }
    /**
     * Removes a component with the given id, key, and options.
     *
     * @param {string} id - The id of the component to remove.
     * @param {string} key - The key of the component to remove.
     * @param {Options} options - The options for removing the component.
     */
    removeComponent(id, key, options) {
        const { skipPending, onUpdate } = options;
        const currentValue = this.store.fetchComponent(id, key);
        if (currentValue !== undefined) {
            this.store.destroyComponent(id, key);
            if (!skipPending && this.pending) {
                this.pending.removeComponent(id, key);
            }
            if (this.events) {
                this.events.emit('removeComponent', id, key);
            }
            if (onUpdate) {
                onUpdate();
            }
        }
    }
    /**
     * Merges components with the given payload and options.
     *
     * @param {any} payload - The payload of the components to merge.
     * @param {Options} options - The options for merging the components.
     */
    mergeComponents(payload, options) {
        const { actions, onUpdate, isComponentRelay } = options;
        const nextOptions = options.extend({
            skipPending: !isComponentRelay,
            onUpdate: null
        });
        for (const id of Object.keys(payload ?? {})) {
            for (const key of Object.keys(payload[id])) {
                const value = payload[id][key];
                const nextPayload = [id, key, value];
                actions.upsertComponent(nextPayload, this, nextOptions);
            }
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Gets the inputs from the store.
     *
     * @returns The inputs from the store.
     */
    get inputs() {
        return this.getInputs(null, Infinity);
    }
    /**
     * Gets the inputs from the store with the given query.
     *
     * @param {any} query - The query for getting the inputs.
     * @param {number} pageSize - The page size for getting the inputs.
     * @returns {Emitter<Inputs[]> | Inputs[]} The inputs from the store.
     */
    getInputs(query, pageSize) {
        return this.store.getInputs(query, pageSize);
    }
    /**
     * Handles actor input with the given id, payload, and options.
     *
     * @param {string} id - The id of the actor.
     * @param {InputPayload} input - The payload for the actor input.
     * @param {number} tick - The tick value for the actor input. Defaults to 0.
     * @param {Options} options - The options for handling the actor input.
     */
    actorInput(id, input, tick = 0, options) {
        const { skipPending, onUpdate } = options;
        const newindex = this.store.storeInput(id, input, tick);
        if (!skipPending && this.pending) {
            this.pending.actorInput(id, newindex, tick);
        }
        if (this.events) {
            this.events.emit('actorInput', id, input, newindex, tick);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Gets the list of symbols.
     *
     * @returns The list of symbols.
     */
    get symbolsList() {
        return this.symbols?.getSymbols();
    }
    /**
     * Gets the enum of symbols.
     *
     * @returns The enum of symbols.
     */
    get symbolsEnum() {
        return this.symbols?.getSymbolsEnum();
    }
    /**
     * Sets the symbols with the given symbols.
     *
     * @param {any} symbols - The symbols to set.
     */
    setSymbols(symbols) {
        this.symbols?.reset(symbols);
    }
    /**
     * Gets a symbol with the given index and options.
     *
     * @param {number} index - The index of the symbol to get.
     * @param {Options} options - The options for getting the symbol.
     * @returns The symbol.
     */
    getSymbol(index, options) {
        const { actions } = options;
        const symbol = this.symbols?.get(index);
        if (!symbol) {
            const symbolTuple = actions.fetchSymbol(symbol, this, options);
            return symbolTuple[0];
        }
        return symbol;
    }
    /**
     * Adds a symbol with the given symbol and options.
     *
     * @param {string} symbol - The symbol to add.
     * @param {Options} options - The options for adding the symbol.
     * @returns The index of the added symbol or null if the symbol could not be added.
     */
    addSymbol(symbol, options) {
        if (this.symbols === null) {
            return null;
        }
        const { actions, isSymbolLeader, skipPending, onUpdate } = options;
        const enumSymbols = this.symbolsEnum ?? {};
        let index = Object.prototype.hasOwnProperty.call(enumSymbols, symbol) ? enumSymbols[symbol] : -1;
        if (index === -1) {
            if (isSymbolLeader) {
                index = this.symbols.add(symbol) ?? -1;
                if (!skipPending && this.pending) {
                    this.pending.addSymbol([symbol, index]);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
            else if (actions.fetchSymbol) {
                const symbolTuple = actions.fetchSymbol(symbol, this, options);
                index = symbolTuple[1];
            }
        }
        if (index === -1) {
            return null;
        }
        return index;
    }
    /**
     * Fetches a symbol with the given payload, options, and match function.
     *
     * @param {string | number} payload - The payload for fetching the symbol.
     * @param {Options} options - The options for fetching the symbol.
     * @param {Function} onMatch - The function to call when a match is found.
     * @returns The fetched symbol tuple.
     */
    fetchSymbol(payload, options, onMatch) {
        if (this.symbols === null) {
            return null;
        }
        const { isSymbolLeader, skipPending, onUpdate } = options;
        const symbolTuple = this.symbols.fetch(payload);
        if (symbolTuple[0] && symbolTuple[1] !== -1) {
            if (onMatch) {
                onMatch(symbolTuple);
            }
        }
        else {
            if (isSymbolLeader) {
                const index = this.symbols.add(symbolTuple[0]);
                symbolTuple[1] = index;
                if (!skipPending && this.pending) {
                    this.pending.addSymbol(symbolTuple);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
        }
        return symbolTuple;
    }
    /**
     * Merges a symbol with the given payload and options.
     *
     * @param {[string, number]} payload - The payload for merging the symbol.
     * @param {Options} options - The options for merging the symbol.
     */
    mergeSymbol(payload, options) {
        if (this.symbols === null) {
            return null;
        }
        const { isSymbolLeader, isSymbolRelay, skipPending, onUpdate } = options;
        this.symbols.merge(payload);
        if ((isSymbolLeader || isSymbolRelay) && !skipPending && this.pending) {
            this.pending.addSymbol(payload);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Resets symbols with the given payload and options.
     *
     * @param {any[]} payload - The payload for resetting the symbols.
     * @param {Options} options - The options for resetting the symbols.
     */
    resetSymbols(offset = 0, symbols, options) {
        if (this.symbols === null) {
            return null;
        }
        const { isSymbolLeader, isSymbolRelay, skipPending, onUpdate } = options;
        this.symbols.reset(offset, symbols);
        if ((isSymbolLeader || isSymbolRelay) && !skipPending && this.pending) {
            this.pending.replaceSymbols(offset, symbols);
        }
        if (onUpdate) {
            onUpdate();
        }
    }
    /**
     * Resets the current frame state.
     */
    resetFrame() {
        if (this.pending) {
            this.pending.reset();
        }
        if (this.order) {
            this.order.reset();
        }
        if (this.changes) {
            this.changes.reset();
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Context);


/***/ }),

/***/ "./lib/emitter.js":
/*!************************!*\
  !*** ./lib/emitter.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Emitter: () => (/* binding */ Emitter)
/* harmony export */ });
/**
 * Emitter
 *
 * @template T
 * @class Emitter
 * @description An Emitter is a class that emits values to its handlers.
 * @property {Function[]} handlers - The handlers of the Emitter.
 * @method emitTo - Adds a handler to the Emitter and returns the handler.
 * @method emit - Emits a value to the handlers of the Emitter.
 * @example
 * const emitter = new Emitter()
 * const handler = emitter.emitTo((value) => {
 *  console.log(value)
 * })
 * emitter.emit('Hello, world!')
 * // => 'Hello, world!'
 */
class Emitter {
    handlers;
    /**
     * Constructs a new Emitter object.
     */
    constructor() {
        this.handlers = [];
    }
    /**
     * Adds a handler to the Emitter and returns the handler.
     *
     * @param {Function} handler - The handler to add to the Emitter.
     * @returns {Function} The handler.
     */
    emitTo(handler) {
        this.handlers.push(handler);
        return handler;
    }
    /**
     * Emits a value to the handlers of the Emitter.
     *
     * @param {T} value - The value to emit to the handlers of the Emitter.
     */
    emit(value) {
        for (const handler of this.handlers) {
            handler(value);
        }
    }
}


/***/ }),

/***/ "./lib/handler.js":
/*!************************!*\
  !*** ./lib/handler.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Handler: () => (/* binding */ Handler),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getActionHandler: () => (/* binding */ getActionHandler),
/* harmony export */   getSymbolAction: () => (/* binding */ getSymbolAction),
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   manyHandler: () => (/* binding */ manyHandler),
/* harmony export */   oneHandler: () => (/* binding */ oneHandler)
/* harmony export */ });
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context.js */ "./lib/context.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options.js */ "./lib/options.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ "./lib/storage.js");
/* harmony import */ var _updater_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updater.js */ "./lib/updater.js");




/**
 * Gets the symbol action.
 *
 * @param {string | number} action - The action.
 * @param {Record<number, string> | null} defaultSymbols - The default symbols.
 * @returns {number | string} The symbol action.
 */
function getSymbolAction(action, defaultSymbols) {
    if (defaultSymbols && typeof action === 'number' && defaultSymbols[action]) {
        action = defaultSymbols[action];
    }
    return action;
}
/**
 * Gets the action handler.
 *
 * @param {Context} context - The context.
 * @param {OptionsExtended | any} options - The options.
 */
function getActionHandler(context, options) {
    options = options instanceof _options_js__WEBPACK_IMPORTED_MODULE_1__.Options ? options : new _options_js__WEBPACK_IMPORTED_MODULE_1__.Options(options);
    const { actions, defaultSymbols } = options;
    return (action) => {
        action = getSymbolAction(action, defaultSymbols);
        const handler = (payload) => {
            if (actions[action]) {
                actions[action](payload, context, options);
            }
        };
        handler.action = action;
        return handler;
    };
}
/**
 * Handles a single message.
 *
 * @param {Message | any[]} message - The message to handle.
 * @param {Context} context - The context for the handler.
 * @param {OptionsExtended | any} options - The options for the handler.
*/
function oneHandler(message, context, options) {
    options = options instanceof _options_js__WEBPACK_IMPORTED_MODULE_1__.Options ? options : new _options_js__WEBPACK_IMPORTED_MODULE_1__.Options(options);
    const actionHandler = getActionHandler(context, options);
    if (Array.isArray(message)) {
        actionHandler(message[0])(message[1]);
    }
    else if (message) {
        actionHandler(message.action)(message.payload);
    }
}
const handler = manyHandler;
/**
 * Handles multiple messages.
 *
 * @param {Message | any[]} message - The messages to handle.
 * @param {Context} context - The context for the handler.
 * @param {OptionsExtended | any} options - The options for the handler.
 */
function manyHandler(message, context, options) {
    options = options instanceof _options_js__WEBPACK_IMPORTED_MODULE_1__.Options ? options : new _options_js__WEBPACK_IMPORTED_MODULE_1__.Options(options);
    const { batchActionPayloadSizes, isOrdered, enableRollback } = options;
    const actionHandler = getActionHandler(context, options);
    const iterator = (payload, handler, offset = 0) => {
        const action = handler.action;
        let payloadSize = batchActionPayloadSizes[action] || 1;
        if (payloadSize && typeof payloadSize === 'object') {
            if (payloadSize.ordered && isOrdered) {
                payloadSize = payloadSize.ordered;
            }
            else if (payloadSize.rollback && enableRollback) {
                payloadSize = payloadSize.rollback;
            }
            else {
                payloadSize = payloadSize.default;
            }
        }
        for (let i = offset; i < payload.length; i += payloadSize) {
            if (batchActionPayloadSizes === 1) {
                handler(payload[i], context, options);
            }
            else if (batchActionPayloadSizes) {
                handler(payload.slice(i, i + payloadSize), context, options);
            }
            else {
                // console.warn('BATCH MISMATCH')
            }
        }
    };
    if (Array.isArray(message)) {
        const handler = actionHandler(message[0]);
        iterator(message, handler, 1);
    }
    else if (message) {
        const handler = actionHandler(message.action);
        iterator(message.payload, handler);
    }
}
/**
 * The Handler class. It handles messages.
 */
class Handler {
    context;
    options;
    /**
     * Creates a new Handler instance.
     *
     * @param {Context | any} context - The context for the handler.
     * @param {Options | any} options - The options for the handler.
     * @param {Object} actions - The actions for the handler.
     * @param {Storage} _Storage - The storage for the handler.
     */
    constructor(context, options, actions, _Storage = _storage_js__WEBPACK_IMPORTED_MODULE_2__.Storage) {
        this.options = _options_js__WEBPACK_IMPORTED_MODULE_1__.Options.ensure(options, actions);
        this.context = _context_js__WEBPACK_IMPORTED_MODULE_0__.Context.ensure(context, options, _Storage);
    }
    /**
     * Handles a single message.
     *
     * @param {Message | any[]} message - The message to handle.
     */
    one(message, extendOptions) {
        return oneHandler(message, this.context, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Handles multiple messages.
     *
     * @param {Message | any[]} message - The messages to handle.
     */
    many(message, extendOptions) {
        return manyHandler(message, this.context, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Gets the action handler.
     */
    getActionHandler() {
        return getActionHandler(this.context, this.options);
    }
    /**
     * Gets the symbol action.
     *
     * @param {string | number} action - The action.
     */
    getSymbolAction(action) {
        return getSymbolAction(action, this.options.defaultSymbols);
    }
    /**
     * Updates other nodes in the network.
     *
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     * @param {number} tick - The tick for updating.
     */
    updater(extendOptions, tick = Date.now()) {
        return (0,_updater_js__WEBPACK_IMPORTED_MODULE_3__.updater)(this.context, extendOptions ? this.options.extend(extendOptions) : this.options, tick);
    }
    /**
     * Spawns an actor.
     *
     * @param {string} id - The ID of the actor to spawn.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    spawnActor(id, extendOptions) {
        return this.context.spawnActor(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Despawns an actor.
     *
     * @param {string} id - The ID of the actor to despawn.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    removeActor(id, extendOptions) {
        return this.context.removeActor(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Updates an actor with an input.
     *
     * @param {string} id - The ID of the actor to update.
     * @param {any} input - The input for updating.
     * @param {number} tick - The tick for updating.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    actorInput(id, input, tick = Date.now(), extendOptions) {
        return this.context.actorInput(id, input, tick, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Creates an entity.
     *
     * @param {string} id - The ID of the entity to create.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    createEntity(id, extendOptions) {
        return this.context.createEntity(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Removes an entity.
     *
     * @param {string} id - The ID of the entity to remove.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    removeEntity(id, extendOptions) {
        return this.context.removeEntity(id, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Sets a component to an entity.
     *
     * @param {string} id - The ID of the entity to add the component to.
     * @param {string} key - The key of the component to add.
     * @param {any} value - The value of the component to add.
     * @param {number} tick - The tick for updating.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    upsertComponent(id, key, value, tick = Date.now(), extendOptions) {
        return this.context.upsertComponent(id, key, value, tick, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Changes a component of an entity.
     *
     * @param {string} id - The ID of the entity to change the component of.
     * @param {string} key - The key of the component to change.
     * @param {any} value - The value of the component to change.
     * @param {number} tick - The tick for updating.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    changeComponent(id, key, value, tick = Date.now(), extendOptions) {
        return this.context.changeComponent(id, key, value, tick, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Removes a component from an entity.
     *
     * @param {string} id - The ID of the entity to remove the component from.
     * @param {string} key - The key of the component to remove.
     * @param {Options | any} extendOptions - Custom options to extend the options for the handler.
     */
    removeComponent(id, key, extendOptions) {
        return this.context.removeComponent(id, key, extendOptions ? this.options.extend(extendOptions) : this.options);
    }
    /**
     * Queries components.
     *
     * @param {any} query - The query for querying components.
     * @returns {Set<any>} The components queried.
     */
    queryComponents(query) {
        return this.context.store.queryComponents(query);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Handler);


/***/ }),

/***/ "./lib/indexes/components.js":
/*!***********************************!*\
  !*** ./lib/indexes/components.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentsIndex: () => (/* binding */ ComponentsIndex)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./lib/indexes/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./lib/utils.js");


/**
 * The Index class represents an index.
 */
class ComponentsIndex extends _index_js__WEBPACK_IMPORTED_MODULE_0__.Index {
    constructor(items = {}, _options = {}) {
        super(items);
    }
    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = {};
    }
    /**
     * The clone method clones the index.
     */
    clone() {
        return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Index(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {any} value - The value to get from the index.
     * @returns {any} The value from the index.
     */
    get(value) {
        return this.items[value];
    }
    /**
     * The has method checks if a value is in the index.
     *
     * @param {any} value - The value to check in the index.
     * @param {any} id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(value, id) {
        const ids = this.items[value];
        if (ids && ids.has(id)) {
            return true;
        }
        return false;
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {any} value - The value to remove from the index.
     * @param {any} id - The ID of the value to remove from the index.
     * @returns {any} The value removed from the index.
     */
    remove(value, id) {
        const ids = this.items[value];
        if (ids && ids.has(id)) {
            ids.delete(id);
            return true;
        }
    }
    /**
     * The set method sets a value to the index.
     *
     * @param {any} value - The value to set to the index.
     * @param {any} id - The ID to set to the index.
     * @returns {any} The value being set.
     */
    set(value, id) {
        this.items[value] = this.items[value] || new Set();
        if (this.items[value].has(id)) {
            return false;
        }
        this.items[value].add(id);
        return true;
    }
    /**
     * The union method creates an union of two indexes.
     *
     * @param {string} key - The key of the index.
     * @param {Index} other - The other index.
     * @returns {Index} The union of the indexes.
     */
    union(key, other) {
        return new ComponentsIndex({
            ...this.items,
            [key]: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.unionSets)(this.items[key], other.items[key])
        });
    }
    /**
     * The difference method creates a difference of two indexes.
     *
     * @param {string} key - The key of the index.
     * @param {Index} other - The other index.
     * @returns {Index} The difference of the indexes.
     */
    difference(key, other) {
        return new ComponentsIndex({
            ...this.items,
            [key]: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.differenceSets)(this.items[key], other.items[key])
        });
    }
    /**
     * The intersection method creates an intersection of two indexes.
     *
     * @param {string} key - The key of the index.
     * @param {Index} other - The other index.
     * @returns {Index} The intersection of the indexes.
     */
    intersection(key, other) {
        return new ComponentsIndex({
            ...this.items,
            [key]: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.intersectionSets)(this.items[key], other.items[key])
        });
    }
    /**
    * The query method queries the index.
    *
    * @param {any} query - The query to use.
    * @returns {any[]} The result of the query.
    */
    query(query) {
        const { with: with_, without,
        // where,
         } = query || {};
        let matches = new Set();
        if (with_) {
            for (const key of with_) {
                const ids = this.items[key];
                if (ids) {
                    matches = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.unionSets)(matches, ids);
                }
            }
        }
        if (without) {
            for (const key of without) {
                const ids = this.items[key];
                if (ids) {
                    matches = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.differenceSets)(matches, ids);
                }
            }
        }
        return matches;
    }
}


/***/ }),

/***/ "./lib/indexes/index.js":
/*!******************************!*\
  !*** ./lib/indexes/index.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Index: () => (/* binding */ Index)
/* harmony export */ });
/**
 * The Index class represents an index.
 */
class Index {
    items;
    constructor(items = null, _options = {}) {
        this.items = items;
    }
    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = null;
    }
    /**
     * The clone method clones the index.
     */
    clone() {
        return new Index(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {any} _value - The value to get from the index.
     * @returns {any} The value from the index.
     */
    get(_value) { }
    /**
     * The has method checks if a value is in the index.
     *
     * @param {any} _value - The value to check in the index.
     * @param {any} _id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(_value, _id) {
        return false;
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {any} _value - The value to remove from the index.
     * @param {any} _id - The ID of the value to remove from the index.
     * @returns {any} The value removed from the index.
     */
    remove(_value, _id) { }
    /**
     * The set method sets a value to the index.
     *
     * @param {any} _value - The value to set to the index.
     * @param {any} _id - The ID to set to the index.
     * @returns {any} The value being set.
     */
    set(_value, _id) {
        return null;
    }
    /**
   * The store method stores a value to the index.
   *
   * @param {ID} id - The ID of the value to store.
   * @param {V} preValue - The previous value to store to the index.
   * @param {V} value - The value to store to the index.
   * @returns The value being stored.
   */
    store(id, preValue, value) {
        if (preValue) {
            this.remove(preValue, id);
        }
        return this.set(value, id);
    }
    /**
     * The query method queries the index.
     *
     * @param {any} _query - The query to use.
     * @returns {any[]} The result of the query.
     */
    query(_query) {
        return [];
    }
}


/***/ }),

/***/ "./lib/indexes/sorted.js":
/*!*******************************!*\
  !*** ./lib/indexes/sorted.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortedIndex: () => (/* binding */ SortedIndex)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./lib/indexes/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./lib/utils.js");


/**
 * binaryInsertID inserts an ID value into a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} value - The value to insert
 * @param {any} id - The ID of the value to insert
 * @returns {number[]} The index of the inserted value
 */
function binaryInsertID(items, value, id) {
    const low = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.binaryInsert)(items, value, (item) => item[0]);
    const item = items[low];
    const v = item[0];
    if (v === value) {
        const ids = item[1];
        const i = ids.indexOf(id);
        if (i === -1) {
            ids.push(id);
            return [low, ids.length - 1];
        }
        else {
            // return [low, i]
        }
    }
    else {
        const ids = [id];
        items.splice(low, 0, [value, ids]);
        return [low, 0];
    }
    return [-1, -1];
}
/**
 * binaryRemove removes a value from a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} value - The value to remove
 * @param {any} id - The ID of the value to remove
 * @returns {number[]} The index of the removed value
 */
function binaryRemoveID(items, value, id) {
    const low = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.binaryInsert)(items, value, (item) => item[0]);
    const item = items[low];
    const v = item[0];
    if (v === value) {
        const ids = item[1];
        const i = ids.lastIndexOf(id);
        if (i !== -1) {
            ids.splice(i, 1);
            if (ids.length === 0) {
                items.splice(low, 1);
            }
            return [low, i];
        }
    }
    return [-1, -1];
}
/**
 * SortedIndex class represents a sorted index.
 */
class SortedIndex extends _index_js__WEBPACK_IMPORTED_MODULE_0__.Index {
    constructor(items = [], _options = {}) {
        super(items);
    }
    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = [];
    }
    /**
     * The clone method clones the index.
     */
    clone() {
        return new SortedIndex(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {V} value - The value to get from the index.
     * @returns {ID[]} The value from the index.
     */
    get(value) {
        const item = this.items.find((item) => item[0] === value);
        if (item) {
            return item[1];
        }
        return [];
    }
    /**
     * The has method checks if a value is in the index.
     *
     * @param {V} value - The value to check in the index.
     * @param {ID} id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(value, id) {
        const item = this.items.find((item) => item[0] === value);
        if (id === undefined) {
            return !!item;
        }
        if (item) {
            const ids = item[1];
            return ids.indexOf(id) !== -1;
        }
        return false;
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {T} value - The value to remove from the index.
     * @returns {number[]} The value removed from the index.
     */
    remove(value, id) {
        const indexes = binaryRemoveID(this.items, value, id);
        return indexes;
        // return indexes[0] === -1 || indexes[1] === -1 ? null : value 
    }
    /**
     * The set method sets a value to the index.
     *
     * @param {T} value - The value to set to the index.
     * @param {ID} id - The ID of the value to set to the index.
     * @returns {number[]} The index of the value being set.
     */
    set(value, id) {
        const indexes = binaryInsertID(this.items, value, id);
        return indexes;
    }
    /**
     * The query method queries the manager.
     *
     * @param {V} query - The query to use.
     * @returns {ID[]} The result of the query.
     */
    query(query) {
        // if (query && typeof query === 'object') {}
        return this.get(query);
    }
}


/***/ }),

/***/ "./lib/indexes/spatial.js":
/*!********************************!*\
  !*** ./lib/indexes/spatial.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SpatialIndex: () => (/* binding */ SpatialIndex)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./lib/indexes/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./lib/utils.js");


/**
 * The SpatialIndex class represents a spatial index.
 */
class SpatialIndex extends _index_js__WEBPACK_IMPORTED_MODULE_0__.Index {
    constructor(items = [], { cellSize = 5 } = {}) {
        super(items);
        this.cellSize = cellSize;
    }
    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = [];
    }
    /**
     * The clone method clones the index.
     */
    clone() {
        return new SpatialIndex(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {V} value - The value to get from the index.
     * @returns {ID[]} The value from the index.
     */
    get(value) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        if (ids) {
            return ids;
        }
        return [];
    }
    /**
     * The has method checks if a value is in the index.
     *
     * @param {V} value - The value to check in the index.
     * @param {ID} id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(value, id) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        if (id === undefined) {
            return !!ids;
        }
        if (ids) {
            return ids.indexOf(id) !== -1;
        }
        return false;
    }
    /**
     * The hash method hashes 2D or 3D value.
     * @param {number[]} value - The 2D or 3D value to hash.
     * @returns {number} The hash of the value.
     */
    hash(value) {
        if (value.length === 2) {
            return this.hash2d(value[0], value[1]);
        }
        return this.hash3d(value[0], value[1], value[2]);
    }
    /**
     * The hash2d method hashes a 2D value.
     * @param {number} x - The X value to hash.
     * @param {number} y - The Y value to hash.
     * @returns {number} The hash of the 3D value.
     */
    hash2d(x = 0, y = 0) {
        const ix = Math.floor((x + 1000) / this.cellSize), iy = Math.floor((y + 1000) / this.cellSize);
        return ((ix * 73856093) ^ (iy * 19349663)); // % 5000; // 5000 is size of hash table.
    }
    /**
     * The hash3d method hashes a 3D value.
     * @param {number} x - The X value to hash.
     * @param {number} y - The Y value to hash.
     * @param {number} z - The Z value to hash.
     * @returns {number} The hash of the 3D value.
     */
    hash3d(x = 0, y = 0, z = 0) {
        const ix = Math.floor((x + 1000) / this.cellSize), iy = Math.floor((y + 1000) / this.cellSize), iz = Math.floor((z + 1000) / this.cellSize);
        return ((ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791)); // % 5000; // 5000 is size of hash table.
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {T} value - The value to remove from the index.
     * @returns {number[]} The value removed from the index.
     */
    remove(value, id) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        const [index] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.binarySearch)(ids, id);
        if (index === -1) {
            ids.splice(index, 1);
        }
        if (ids.length === 0) {
            delete this.items[hash];
        }
        return [hash, index];
    }
    /**
     * The set method sets a value to the index.
     *
     * @param {T} value - The value to set to the index.
     * @param {ID} id - The ID of the value to set to the index.
     * @returns {number[]} The index of the value being set.
     */
    set(value, id) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        const [index, left] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.binarySearch)(ids, id);
        if (index === -1) {
            ids.splice(left, 0, id);
        }
        return [hash, index];
    }
    /**
     * The query method queries the manager.
     *
     * @param {V} query - The query to use.
     * @returns {ID[]} The result of the query.
     */
    query(query) {
        let results = [];
        const o = this.cellSize;
        const dims = query.length === 2 ? 2 : 3;
        if (dims === 2) {
            const [x, y] = query;
            for (let xx = -o * 2; xx < o * 2 + o; xx += o) {
                for (let yy = -o * 2; yy < o * 2 + o; yy += o) {
                    const ids = this.items[this.hash2d(x + xx, y + yy)];
                    if (ids !== undefined) {
                        results = results.concat(ids);
                    }
                }
            }
        }
        else {
            const [x, y, z] = query;
            for (let xx = -o * 2; xx < o * 2 + o; xx += o) {
                for (let yy = -o * 2; yy < o * 2 + o; yy += o) {
                    for (let zz = -o * 2; zz < o * 2 + o; zz += o) {
                        const ids = this.items[this.hash3d(x + xx, y + yy, z + zz)];
                        if (ids !== undefined) {
                            results = results.concat(ids);
                        }
                    }
                }
            }
        }
        return results;
    }
}


/***/ }),

/***/ "./lib/node.js":
/*!*********************!*\
  !*** ./lib/node.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AllActionsFactory: () => (/* binding */ AllActionsFactory),
/* harmony export */   NodeActions: () => (/* binding */ NodeActions),
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   allActions: () => (/* binding */ allActions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _actions_actor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions/actor.js */ "./lib/actions/actor.js");
/* harmony import */ var _actions_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions/component.js */ "./lib/actions/component.js");
/* harmony import */ var _actions_core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/core.js */ "./lib/actions/core.js");
/* harmony import */ var _actions_entity_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions/entity.js */ "./lib/actions/entity.js");
/* harmony import */ var _actions_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions/symbol.js */ "./lib/actions/symbol.js");





/**
 * A factory function that creates a new instance of the AllActions class that extends the provided Parent class
 *
 * @param {any} Parent - The class to be extended by the AllActions class.
 * @returns {any} A new class that extends the provided Parent class and the CoreActions class.
 */
function AllActionsFactory(Parent = Object) {
    return (0,_actions_actor_js__WEBPACK_IMPORTED_MODULE_0__.ActorActionsFactory)((0,_actions_component_js__WEBPACK_IMPORTED_MODULE_1__.ComponentActionsFactory)((0,_actions_core_js__WEBPACK_IMPORTED_MODULE_2__.CoreActionsFactory)((0,_actions_entity_js__WEBPACK_IMPORTED_MODULE_3__.EntityActionsFactory)((0,_actions_symbol_js__WEBPACK_IMPORTED_MODULE_4__.SymbolActionsFactory)(Parent)))));
}
/**
 * Combines all the actions from different modules into a single object.
 */
const allActions = {
    ..._actions_actor_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    ..._actions_component_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    ..._actions_core_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    ..._actions_entity_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    ..._actions_symbol_js__WEBPACK_IMPORTED_MODULE_4__["default"]
};
/**
 * The NodeActions class provides methods for managing nodes in a context.
 */
class NodeActions extends AllActionsFactory() {
}
const __NodeActions__ = new NodeActions();
/**
 * The actions object combines all the actions from different modules.
 */
const actions = {
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
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (actions);


/***/ }),

/***/ "./lib/options.js":
/*!************************!*\
  !*** ./lib/options.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Options: () => (/* binding */ Options),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node.js */ "./lib/node.js");
// import { Context } from './index.js';


/**
 * The Options class represents the options for a node.
 */
class Options {
    actions;
    batchActionPayloadSizes;
    compressStringsAsInts;
    defaultSymbols;
    enableRollback;
    enableQuerying;
    enumDefaultSymbols;
    getActorId;
    getGroupedValue;
    indexes;
    isAuthority;
    isAsyncStorage;
    isComponentRelay;
    isDiffed;
    isGroupedComponents;
    isOrdered;
    isReadOnly;
    isSymbolLeader;
    isSymbolRelay;
    onUpdate;
    pageSize;
    responder;
    skipPending;
    types;
    setGroupedValue;
    updateOptions;
    worldOptions;
    // [key: string]: any;
    /**
     * Ensures that the provided options are an instance of Options.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionsThis - The context for the actions.
     * @returns {Options} - An instance of Options.
     */
    static ensure(options = {}, actionsThis) {
        return options instanceof Options ? options : new Options(options, actionsThis);
    }
    /**
     * Constructs a new Options object.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionsThis - The context for the actions.
     */
    constructor(options = {}, actionsThis = null) {
        const { actions = actionsThis || _node_js__WEBPACK_IMPORTED_MODULE_1__.actions, batchActionPayloadSizes = _constants_js__WEBPACK_IMPORTED_MODULE_0__.batchActionPayloadSizes, compressStringsAsInts = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.compressStringsAsInts, defaultSymbols = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DefaultSymbols, enableRollback = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.enableRollback, enableQuerying = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.enableQuerying, enumDefaultSymbols = _constants_js__WEBPACK_IMPORTED_MODULE_0__.enumDefaultSymbols, getActorId = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultGetActorId, getGroupedValue = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultGetGroupedValue, indexes = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.indexes, isAuthority = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isAuthority, isAsyncStorage = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isAsyncStorage, isComponentRelay = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isComponentRelay, isDiffed = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isDiffed, isGroupedComponents = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isGroupedComponents, isOrdered = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isOrdered, isReadOnly = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isReadOnly, isSymbolLeader = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isSymbolLeader, isSymbolRelay = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.isSymbolRelay, onUpdate = null, pageSize = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.pageSize, responder = _constants_js__WEBPACK_IMPORTED_MODULE_0__.voidResponder, skipPending = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.skipPending, types = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions.types, setGroupedValue = _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultSetGroupedValue, updateOptions: overridenUpdateOptions = {}, worldOptions = null,
        // ...otherOptions
         } = options;
        const updateOptions = {
            ..._constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultUpdateOptions,
            ...overridenUpdateOptions
        };
        updateOptions.validkeys = !overridenUpdateOptions?.validkeys
            ? null
            : {
                ..._constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultValidKeys,
                ...(overridenUpdateOptions?.validkeys || {})
            };
        this.actions = actions;
        this.batchActionPayloadSizes = batchActionPayloadSizes;
        this.compressStringsAsInts = compressStringsAsInts;
        this.defaultSymbols = defaultSymbols;
        this.enableRollback = enableRollback;
        this.enableQuerying = enableQuerying;
        this.enumDefaultSymbols = enumDefaultSymbols;
        this.getActorId = getActorId;
        this.getGroupedValue = getGroupedValue;
        this.indexes = indexes;
        this.isAuthority = isAuthority;
        this.isAsyncStorage = isAsyncStorage;
        this.isComponentRelay = isComponentRelay;
        this.isDiffed = isDiffed;
        this.isGroupedComponents = isGroupedComponents;
        this.isOrdered = isOrdered;
        this.isReadOnly = isReadOnly;
        this.isSymbolLeader = isSymbolLeader;
        this.isSymbolRelay = isSymbolRelay;
        this.onUpdate = onUpdate;
        this.pageSize = pageSize;
        this.responder = responder;
        this.skipPending = skipPending;
        this.types = types;
        this.setGroupedValue = setGroupedValue;
        this.updateOptions = updateOptions;
        this.worldOptions = worldOptions;
        // Object.assign(this, otherOptions)
    }
    /**
     * Creates a new Options object from the current one.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionThis - The context for the actions.
     */
    clone() {
        return new Options({ ...this }, this.actions);
    }
    /**
     * Extends the current Options object.
     *
     * @param {Options | OptionsProps | Object} options - The options for the node.
     * @param {any} actionThis - The context for the actions.
     */
    extend(options, actionThis = this.actions) {
        return new Options({ ...this, ...options }, actionThis);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Options);


/***/ }),

/***/ "./lib/ordered.js":
/*!************************!*\
  !*** ./lib/ordered.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ordered: () => (/* binding */ Ordered),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The Ordered class represents a collection of tick values.
 *
 * @property {OrderedData} order - The collection of tick values.
 */
class Ordered {
    order;
    /**
     * Constructs a new Ordered object.
     *
     * @param {OrderedData} order - The initial tick values.
     */
    constructor(order = {}) {
        this.order = order;
    }
    /**
     * Changes the tick value of a component.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the component.
     * @param {number} tick - The new tick value.
     * @returns {boolean} Whether the operation was successful.
     */
    changeComponent(id, key, tick) {
        return this.upsertComponent(id, key, tick);
    }
    /**
     * Resets the tick values.
     *
     * @param {OrderedData} order - The new tick values.
     * @returns {Ordered} The Ordered object.
     */
    reset(order = {}) {
        this.order = order;
    }
    /**
     * Inserts or updates the tick value of a component.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the component.
     * @param {number} tick - The new tick value.
     * @returns {boolean} Whether the operation was successful.
     */
    upsertComponent(id, key, tick) {
        if (isNaN(tick)) {
            return false;
        }
        this.order[id] = this.order[id] || {};
        switch (typeof this.order[id][key]) {
            case 'number':
                if (isFinite(this.order[id][key]) && this.order[id][key] < tick) {
                    const threshold = 0;
                    if (tick > (Date.now() + threshold)) {
                        return false;
                    }
                    this.order[id][key] = tick;
                    return true;
                }
                return false;
            case 'undefined':
            default:
                this.order[id][key] = tick;
                return true;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ordered);


/***/ }),

/***/ "./lib/pending.js":
/*!************************!*\
  !*** ./lib/pending.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pending: () => (/* binding */ Pending),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * The Pending class represents a pending state with removed, updated, and created states.
 *
 * @property {RemovedState} removed - The removed state.
 * @property {UpdatedState} updated - The updated state.
 * @property {CreatedState} created - The created state.
 */
class Pending {
    /**
     * Constructs a new Pending object and resets its state.
     */
    constructor() {
        this.created = {
            actors: {},
            components: {},
            entities: [],
            inputs: {}
        };
        this.removed = {
            actors: {},
            components: {},
            entities: []
        };
        this.updated = {
            components: {}
        };
        this.symbols = [];
    }
    /**
     * Adds an actor input to the created inputs state.
     *
     * @param {string} id - The ID of the actor.
     * @param {number} newindex - The index of the new input.
     * @param {number} tick - The tick of the new input.
     */
    actorInput(id, newindex, tick = 0) {
        this.created.inputs[id] = this.created.inputs[id] || [];
        this.created.inputs[id].push(tick ? [newindex, tick] : newindex);
    }
    /**
     * Changes a component in the specified pending state.
     *
     * @param {string} pendingType - The type of the pending state (removed, updated, or created).
     * @param {string} id - The ID of the entity.
     * @param {string} key - The key of the component.
     */
    changeComponent(pendingType, id, key) {
        return this.upsertComponent(pendingType, id, key);
    }
    /**
     * Marks an entity as created in the created state.
     *
     * @param {string} id - The ID of the entity to create.
     */
    createEntity(id) {
        this.created.entities.push(id);
    }
    /**
     * Marks an actor as removed in the removed state.
     *
     * @param {string} id - The ID of the actor to remove.
     */
    removeActor(id) {
        this.removed.actors[id] = true;
    }
    /**
     * Marks a component as removed in the removed state.
     *
     * @param {string} id - The ID of the entity.
     * @param {string} key - The key of the component to remove.
     */
    removeComponent(id, key) {
        this.removed.components[id] = this.removed.components[id] || {};
        this.removed.components[id][key] = true;
    }
    /**
     * Marks an entity as removed in the removed state.
     *
     * @param {string} id - The ID of the entity to remove.
     */
    removeEntity(id) {
        this.removed.entities.push(id);
    }
    /**
     * Resets the state of the Pending object.
     */
    reset() {
        this.constructor();
    }
    /**
     * Marks an actor as spawned in the created state.
     *
     * @param {string} id - The ID of the actor to spawn.
     */
    spawnActor(id) {
        this.created.actors[id] = true;
    }
    /**
     * Inserts or updates a component in the specified pending state.
     *
     * @param {string} pendingType - The type of the pending state (created or updated).
     * @param {string} id - The ID of the entity.
     * @param {string} key - The key of the component.
     */
    upsertComponent(pendingType, id, key) {
        const pending = pendingType === 'created' ? this.created : this.updated;
        if (pending) {
            pending.components[id] = pending.components[id] || {};
            pending.components[id][key] = true;
        }
    }
    /**
     * Adds a symbol tuple to the symbols array.
     *
     * @param {any} symbolTuple - The symbol tuple to add.
     */
    addSymbol(symbolTuple) {
        this.symbols.push(symbolTuple);
    }
    /**
     * Replaces the symbols array with a new array of symbol tuples.
     *
     * @param {any[]} symbols - The new array of symbols.
     */
    replaceSymbols(offset, symbols) {
        if (offset > 0) {
            const { length } = symbols;
            const { symbols: _symbols } = this;
            for (let i = 0; i < length; i++) {
                const value = symbols[i];
                const index = i + offset;
                _symbols[index] = [value, index];
            }
        }
        else {
            this.symbols = symbols.map((v, i) => [v, i]);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pending);


/***/ }),

/***/ "./lib/storage.js":
/*!************************!*\
  !*** ./lib/storage.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Emitter: () => (/* reexport safe */ _emitter_js__WEBPACK_IMPORTED_MODULE_5__.Emitter),
/* harmony export */   Storage: () => (/* binding */ Storage),
/* harmony export */   TypeMap: () => (/* binding */ TypeMap)
/* harmony export */ });
/* harmony import */ var _indexes_sorted_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexes/sorted.js */ "./lib/indexes/sorted.js");
/* harmony import */ var _indexes_spatial_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexes/spatial.js */ "./lib/indexes/spatial.js");
/* harmony import */ var _indexes_components_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indexes/components.js */ "./lib/indexes/components.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types.js */ "./lib/types.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _emitter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./emitter.js */ "./lib/emitter.js");







/**
 * The Indexes interface represents a mapping from keys to any array.
 */
const TypeMap = {
    sorted: _indexes_sorted_js__WEBPACK_IMPORTED_MODULE_0__.SortedIndex,
    spatial: _indexes_spatial_js__WEBPACK_IMPORTED_MODULE_1__.SpatialIndex,
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
class Storage {
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
                TypeCtor = _types_js__WEBPACK_IMPORTED_MODULE_3__.ArrayTypes.get(TypeCtor[0]);
            }
            else if (typeof TypeCtor === 'string') {
                TypeCtor = _types_js__WEBPACK_IMPORTED_MODULE_3__.ArrayTypes.get(TypeCtor);
            }
            if (typeof TypeCtor === 'function') {
                if (TypeCtor) {
                    this.typeCtors[key] = TypeCtor;
                }
            }
        }
        this.componentsIndex = new _indexes_components_js__WEBPACK_IMPORTED_MODULE_2__.ComponentsIndex();
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
        const [index] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.binarySearch)(list, id);
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
            return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.paginate)(ids, pageSize);
        }
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.paginate)(this.actors, pageSize);
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
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.paginate)(ids, pageSize);
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
            return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.paginate)(ids, pageSize);
        }
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.paginate)(this.entities, pageSize);
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
        const pages = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.paginate)(ids, pageSize);
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
        const [index, left] = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.binarySearch)(list, id);
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


/***/ }),

/***/ "./lib/symbols.js":
/*!************************!*\
  !*** ./lib/symbols.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Symbols: () => (/* binding */ Symbols),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   ensureSymbolIndex: () => (/* binding */ ensureSymbolIndex),
/* harmony export */   extractSymbol: () => (/* binding */ extractSymbol),
/* harmony export */   recursiveSymbolExtraction: () => (/* binding */ recursiveSymbolExtraction),
/* harmony export */   recursiveSymbolIndexesEnsured: () => (/* binding */ recursiveSymbolIndexesEnsured)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");

/**
 * The Symbols class represents a collection of symbols.
 */
class Symbols {
    _list;
    _enum;
    /**
     * Constructs a new Symbols object.
     *
     * @param {object} object - An object containing an optional list of symbols.
     */
    constructor(object = {}) {
        const { _list: symbols = [] } = object;
        this._list = symbols;
        this._enum = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEnum)(symbols);
    }
    /**
     * Adds a symbol to the Symbols object.
     *
     * @param {string} symbol - The symbol to be added.
     * @returns {number | null} The index of the added symbol, or null if the symbol is not valid.
     */
    add(symbol) {
        if (symbol) {
            if (Object.prototype.hasOwnProperty.call(this._enum, symbol)) {
                return this._enum[symbol];
            }
            else {
                const end = this._list.length;
                this._list[end] = symbol;
                this._enum[symbol] = end;
                return end;
            }
        }
        return null;
    }
    /**
     * Copies an enum into the Symbols object.
     *
     * @param {Enum} enumObj - The enum to be copied.
     */
    copyEnum(enumObj = {}) {
        for (const symbolTuple of Object.entries(enumObj)) {
            this.merge(symbolTuple);
        }
    }
    /**
     * Fetches a symbol and its index based on a payload.
     *
     * @param {number | string} payload - The payload, which can be either a symbol or an index.
     * @returns {[string, number]} A tuple containing the symbol and its index.
     */
    fetch(payload) {
        let index;
        let symbol;
        switch (typeof payload) {
            case 'number':
                index = payload;
                symbol = this._list[index] || '';
                break;
            case 'string':
                symbol = payload;
                index = Object.prototype.hasOwnProperty.call(this._enum, symbol) ? this._enum[symbol] : -1;
                break;
        }
        return [symbol, index];
    }
    /**
     * Finds the index of a symbol.
     *
     * @param {string} symbol - The symbol to be found.
     * @returns {number | undefined} The index of the symbol, or undefined if the symbol is not found.
     */
    find(symbol) {
        return this._enum[symbol];
    }
    /**
     * Gets the symbol at a specific index.
     *
     * @param {number} index - The index of the symbol.
     * @returns {string | undefined} The symbol at the specified index, or undefined if there is no symbol at that index.
     */
    get(index) {
        return this._list[index];
    }
    /**
     * Returns the list of symbols.
     *
     * @returns {string[]} The list of symbols.
     */
    getSymbols() {
        return this._list;
    }
    /**
     * Returns the enum of symbols.
     *
     * @returns {Enum} The enum of symbols.
     */
    getSymbolsEnum() {
        return this._enum;
    }
    /**
     * Merges a symbol tuple into the Symbols object.
     *
     * @param {[string, number]} symbolTuple - The symbol tuple to be merged.
     */
    merge(symbolTuple) {
        const [symbol, index] = symbolTuple;
        this._list[index] = symbol;
        this._enum[symbol] = index;
    }
    /**
     * Resets the Symbols object with a new array of symbols.
     *
     * @param {string[]} symbolsArray - The new array of symbols.
     */
    reset(offset, symbolsArray = []) {
        if (offset > 0) {
            const { length } = symbolsArray;
            const { _list } = this;
            const { _enum } = this;
            for (let i = 0; i < length; i++) {
                const symbol = symbolsArray[i];
                const index = i + offset;
                _list[index] = symbol;
                _enum[symbol] = index;
            }
        }
        else {
            this._list = symbolsArray;
            this._enum = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEnum)(symbolsArray);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Symbols);
/**
 * Extracts a symbol from a given index.
 *
 * @param {number | string} index - The index or symbol to be extracted.
 * @param {any} context - The context in which the symbol is to be extracted.
 * @param {any} options - The options for extracting the symbol.
 * @returns {string | number} The extracted symbol.
 */
function extractSymbol(index, context, options) {
    if (typeof index === 'number') {
        const { actions } = options;
        const { getSymbol } = actions;
        const symbol = getSymbol(index, context, options);
        if (!symbol) {
            return '';
        }
        index = symbol;
    }
    return index;
}
/**
 * Ensures that a symbol is indexed.
 *
 * @param {number | string} symbol - The symbol to be indexed.
 * @param {any} context - The context in which the symbol is to be indexed.
 * @param {any} options - The options for indexing the symbol.
 * @returns {number | string} The indexed symbol.
 */
function ensureSymbolIndex(symbol, context, options) {
    if (typeof symbol === 'string') {
        const { actions } = options;
        const { addSymbol } = actions;
        const index = addSymbol(symbol, context, options);
        if (typeof index === 'number') {
            return index;
        }
    }
    return symbol;
}
/**
 * Recursively extracts symbols from a given value.
 *
 * @param {string} key - The key associated with the value.
 * @param {any} value - The value from which symbols are to be extracted.
 * @param {any} context - The context in which the symbols are to be extracted.
 * @param {any} options - The options for extracting symbols.
 * @returns {any} The value with extracted symbols.
 */
function recursiveSymbolExtraction(key, value, context, options) {
    if (key.charAt(0) === '$') {
        const { actions } = options;
        const { getSymbol } = actions;
        const recursiveFix = (value) => {
            if (Array.isArray(value)) {
                value = value.map(recursiveFix);
            }
            else {
                switch (typeof value) {
                    case 'number': {
                        const symbol = getSymbol(value, context, options);
                        if (symbol) {
                            value = symbol;
                        }
                        break;
                    }
                    case 'object':
                        for (const key of Object.keys(value)) {
                            value[key] = recursiveFix(value[key]);
                        }
                        break;
                }
                return value;
            }
        };
        return recursiveFix(value);
    }
    return value;
}
/**
 * Recursively ensures that symbols in a given value are indexed.
 *
 * @param {string} key - The key associated with the value.
 * @param {any} value - The value in which symbols are to be indexed.
 * @param {any} context - The context in which the symbols are to be indexed.
 * @param {any} options - The options for indexing symbols.
 * @returns {any} The value with indexed symbols.
 */
function recursiveSymbolIndexesEnsured(key, value, context, options) {
    if (key.charAt(0) === '$') {
        const { actions } = options;
        const { addSymbol } = actions;
        const recursiveFix = (value) => {
            if (Array.isArray(value)) {
                value = value.map(recursiveFix);
            }
            else {
                switch (typeof value) {
                    case 'string': {
                        const symbol = addSymbol(value, context, options);
                        if (typeof symbol === 'number') {
                            value = symbol;
                        }
                        break;
                    }
                    case 'object':
                        for (const key of Object.keys(value)) {
                            value[key] = recursiveFix(value[key]);
                        }
                        break;
                }
                return value;
            }
        };
        return recursiveFix(value);
    }
    return value;
}


/***/ }),

/***/ "./lib/types.js":
/*!**********************!*\
  !*** ./lib/types.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ArrayTypes: () => (/* binding */ ArrayTypes)
/* harmony export */ });
const ArrayTypes = new Map([
    // ['eid', Uint32Array],
    // ['sid', Uint32Array],
    // ['sym', String],
    ['i8', Int8Array],
    ['ui8', Uint8Array],
    ['ui8c', Uint8ClampedArray],
    ['i16', Int16Array],
    ['ui16', Uint16Array],
    ['i32', Int32Array],
    ['ui32', Uint32Array],
    ['f32', Float32Array],
    ['f64', Float64Array],
    // ['str', String],
    // ['num', Number],
    // ['bool', Boolean],
    // ['map', Map],
    // ['set', Set],
    // ['arr', Array],
]);


/***/ }),

/***/ "./lib/updater.js":
/*!************************!*\
  !*** ./lib/updater.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   updater: () => (/* binding */ updater)
/* harmony export */ });
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options.js */ "./lib/options.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbols.js */ "./lib/symbols.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types.js */ "./lib/types.js");



/**
 * The updater function updates the context based on the provided options.
 *
 * @param {Context} context - The current context.
 * @param {Options | any} options - The options for updating the context.
 * @param {number} tick - The current tick.
 */
async function updater(context, options, tick = Date.now()) {
    options = options instanceof _options_js__WEBPACK_IMPORTED_MODULE_0__.Options ? options : new _options_js__WEBPACK_IMPORTED_MODULE_0__.Options(options);
    const { responder, enumDefaultSymbols, compressStringsAsInts, enableRollback, isOrdered, isDiffed, isGroupedComponents, types, setGroupedValue, updateOptions } = options;
    const { batched, batchSize, mask, type, validkeys } = updateOptions;
    if (!context.pending) {
        return;
    }
    /**
     * An array of arrays, where each sub-array represents a batch of updates.
     */
    const batch = [];
    /**
     * An array representing the current batch of updates.
     */
    let batchBlock = [];
    const { created = {}, removed = {}, symbols = [], updated = {} } = context.pending;
    /**
     * Merges the current batch block into the batch array.
     *
     * @param {string | number} action - The action associated with the current batch block.
     */
    const mergeBatch = (action) => {
        if (batched && batchBlock.length) {
            batch.push([action, ...batchBlock]);
            batchBlock = [];
        }
    };
    /**
     * Queues a message for later processing.
     *
     * @param {string | number} action - The action associated with the message.
     * @param {any} payload - The payload of the message.
     */
    const queueMessage = (action, payload) => {
        if (batched) {
            // batchBlock.push(payload)
            batchBlock = batchBlock.concat(payload);
            if (batchBlock.length >= batchSize) {
                mergeBatch(action);
            }
        }
        else {
            if (compressStringsAsInts) {
                action = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.ensureSymbolIndex)(action, context, options);
            }
            responder([action, payload], type);
        }
    };
    /**
     * Ensures that a symbol is indexed if the `compressStringsAsInts` option is enabled.
     *
     * @param {string | number} symbol - The symbol to be indexed.
     * @returns {string | number} The indexed symbol, or the original symbol if `compressStringsAsInts` is not enabled.
     */
    const ensureSymbol = (symbol) => {
        if (compressStringsAsInts) {
            symbol = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.ensureSymbolIndex)(symbol, context, options);
        }
        return symbol;
    };
    const upsertComponents = async (pendingComponents = {}) => {
        const store = context.store;
        const groups = isGroupedComponents ? {} : null;
        for (const id of Object.keys(pendingComponents)) {
            const components = store.fetchComponents(id);
            if (!components) {
                break;
            }
            const updatedComponents = pendingComponents ? pendingComponents[id] : {};
            for (const key of Object.keys(updatedComponents[id] ?? {})) {
                if (validkeys && !validkeys[key]) {
                    break;
                }
                let group = null;
                if (groups) {
                    group = groups[key] = groups[key] ?? {
                        key,
                        ids: [],
                        values: [],
                        ticks: []
                    };
                }
                let value;
                if (isDiffed && context.changes) {
                    value = context.changes.getValue(id, key);
                }
                else {
                    // TODO: support async fetchComponent
                    value = store.fetchComponent(id, key);
                    if (value instanceof Promise) {
                        value = await value;
                    }
                }
                if (compressStringsAsInts) {
                    value = (0,_symbols_js__WEBPACK_IMPORTED_MODULE_1__.recursiveSymbolIndexesEnsured)(key, value, context, options);
                }
                const nid = ensureSymbol(id);
                const nkey = ensureSymbol(key);
                if (groups) {
                    group.ids.push(nid);
                    group.values.push(setGroupedValue(value, types, key));
                    if (isOrdered) {
                        group.ticks.push(isDiffed ? -tick : tick);
                    }
                    continue;
                }
                const payload = [nid, nkey, value];
                if (isOrdered) {
                    payload.push(isDiffed ? -tick : tick);
                }
                if (isDiffed) {
                    queueMessage(enumDefaultSymbols.changeComponent, payload);
                }
                else {
                    queueMessage(enumDefaultSymbols.upsertComponent, payload);
                }
            }
            // delete pendingComponents[id];
        }
        if (groups) {
            for (const key of Object.keys(groups)) {
                const group = groups[key];
                const bufferIds = compressStringsAsInts ? new Uint32Array(group.ids) : group.ids;
                const type = types[key] ?? null;
                const Type = type ? _types_js__WEBPACK_IMPORTED_MODULE_2__.ArrayTypes.get(Array.isArray(type) ? type[0] : type) : null;
                const bufferValues = Type ? new Type(group.values) : group.values;
                let i = 0;
                const size = bufferIds.length;
                for (; i < size; i += batchSize) {
                    const payload = [
                        bufferIds.slice(i, i + batchSize),
                        group.key,
                        bufferValues.slice(i, i + batchSize)
                    ];
                    if (isOrdered) {
                        const bufferTicks = new Uint32Array(group.ticks.slice(i, i + batchSize));
                        payload.push(bufferTicks);
                    }
                    if (isDiffed) {
                        queueMessage(enumDefaultSymbols.changeComponent, payload);
                    }
                    else {
                        queueMessage(enumDefaultSymbols.upsertComponent, payload);
                    }
                }
            }
        }
        mergeBatch(isDiffed ? enumDefaultSymbols.changeComponent : enumDefaultSymbols.upsertComponent);
    };
    /**
     * If the `mask` object does not exist or does not have an `entities` property,
     * this code block ensures that each entity in the `created.entities` array is indexed,
     * queues a message to create each entity, merges the batch of messages, and then clears the `created.entities` array.
     */
    if (!mask || !mask.entities) {
        for (const key of created.entities ?? []) {
            const nkey = ensureSymbol(key);
            queueMessage(enumDefaultSymbols.createEntity, nkey);
        }
        mergeBatch(enumDefaultSymbols.createEntity);
        created.entities = [];
    }
    /**
     * If the `mask` object does not exist or does not have an `actors` property,
     * this code block ensures that each actor in the `created.actors` array is indexed,
     * queues a message to spawn each actor, merges the batch of messages, and then clears the `created.actors` array.
     */
    if (!mask || !mask.actors) {
        for (const id of Object.keys(created.actors ?? {})) {
            const nid = ensureSymbol(id);
            queueMessage(enumDefaultSymbols.spawnActor, nid);
        }
        mergeBatch(enumDefaultSymbols.spawnActor);
        created.actors = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `removed.components` object is indexed,
     * queues a message to remove each component, merges the batch of messages, and then clears the `removed.components` object.
     */
    if (!mask || !mask.entities) {
        for (const key of removed.entities ?? []) {
            const nkey = ensureSymbol(key);
            queueMessage(enumDefaultSymbols.removeEntity, nkey);
        }
        mergeBatch(enumDefaultSymbols.removeEntity);
        removed.entities = [];
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `removed.components` object is indexed,
     * queues a message to remove each component, merges the batch of messages, and then clears the `removed.components` object.
     */
    if (!mask || !mask.actors) {
        for (const id of Object.keys(removed.actors ?? {})) {
            const nid = ensureSymbol(id);
            queueMessage(enumDefaultSymbols.removeActor, nid);
        }
        mergeBatch(enumDefaultSymbols.removeActor);
        removed.actors = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `removed.components` object is indexed,
     * queues a message to remove each component, merges the batch of messages, and then clears the `removed.components` object.
     */
    if (!mask || !mask.components) {
        for (const id of Object.keys(removed.components ?? {})) {
            const components = removed?.components ? removed.components[id] : null;
            if (!components) {
                break;
            }
            const nid = ensureSymbol(id);
            for (const key of Object.keys(components)) {
                if (validkeys && !validkeys[key]) {
                    break;
                }
                const nkey = ensureSymbol(key);
                const payload = [nid, nkey];
                queueMessage(enumDefaultSymbols.removeComponent, payload);
            }
            // delete removed.components[key]
        }
        mergeBatch(enumDefaultSymbols.removeComponent);
        removed.components = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `created.components` object is indexed,
     * queues a message to create each component, merges the batch of messages, and then clears the `created.components` object.
     */
    if (!mask || !mask.components) {
        const promise = upsertComponents(created.components);
        created.components = {};
        await promise;
    }
    /**
     * If the `mask` object does not exist or does not have a `components` property,
     * this code block ensures that each component in the `updated.components` object is indexed,
     * queues a message to update each component, merges the batch of messages, and then clears the `updated.components` object.
     */
    if (!mask || !mask.components) {
        const promise = upsertComponents(updated.components);
        updated.components = {};
        await promise;
    }
    /**
     * If the `mask` object does not exist or does not have an `inputs` property,
     * this code block ensures that each input in the `created.inputs` object is indexed,
     * queues a message to create each input, merges the batch of messages, and then clears the `created.inputs` object.
     */
    if (!mask || !mask.inputs) {
        for (const id of Object.keys(created.inputs ?? {})) {
            // const nid = ensureSymbol(id)
            const createdInputs = created?.inputs ? created.inputs[id] : [];
            for (const index of (createdInputs ?? [])) {
                const payload = createdInputs ? createdInputs[index] : null;
                const input = payload;
                // const input = { ...payload, id };
                queueMessage(enumDefaultSymbols.actorInput, enableRollback ? [input, tick] : input);
            }
            // delete created.inputs[id];
        }
        mergeBatch(enumDefaultSymbols.actorInput);
        created.inputs = {};
    }
    /**
     * If the `mask` object does not exist or does not have a `symbols` property,
     * this code block ensures that each symbol in the `symbols` array is indexed,
     * queues a message to add each symbol, merges the batch of messages, and then clears the `symbols` array.
     */
    if (!mask || !mask.symbols) {
        for (const symbolOp of symbols) {
            if (batched) {
                batchBlock.push(symbolOp);
            }
            else {
                const message = [enumDefaultSymbols.mergeSymbol, symbolOp];
                responder(message, type);
            }
            if (batchBlock.length >= batchSize && batchBlock.length) {
                batch.unshift([enumDefaultSymbols.mergeSymbol].concat(batchBlock));
                batchBlock = [];
            }
        }
        if (batched && batchBlock.length) {
            batch.unshift([enumDefaultSymbols.mergeSymbol].concat(batchBlock));
            batchBlock = [];
        }
        context.pending.symbols = [];
    }
    /**
     * If the `mask` object does not exist or does not have a `symbols` property,
     * this code block ensures that each symbol in the `symbols` array is indexed,
     * queues a message to add each symbol, merges the batch of messages, and then clears the `symbols` array.
     */
    if (batched && batch.length) {
        for (let i = 0; i < batch.length; i += 1) {
            const batchSlice = batch[i];
            if (batchSlice) {
                responder([enumDefaultSymbols.batch, batchSlice]);
                // if (batchSlice.length > 1) {
                //   responder([enumDefaultSymbols.batch].concat(batchSlice))
                // } else {
                //   responder(batchSlice)
                // }
            }
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updater);


/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   binaryInsert: () => (/* binding */ binaryInsert),
/* harmony export */   binarySearch: () => (/* binding */ binarySearch),
/* harmony export */   combineValues: () => (/* binding */ combineValues),
/* harmony export */   createEnum: () => (/* binding */ createEnum),
/* harmony export */   differenceSets: () => (/* binding */ differenceSets),
/* harmony export */   intersectionSets: () => (/* binding */ intersectionSets),
/* harmony export */   messageTuple: () => (/* binding */ messageTuple),
/* harmony export */   paginate: () => (/* binding */ paginate),
/* harmony export */   recursiveCombination: () => (/* binding */ recursiveCombination),
/* harmony export */   typeOf: () => (/* binding */ typeOf),
/* harmony export */   unionSetOrArray: () => (/* binding */ unionSetOrArray),
/* harmony export */   unionSets: () => (/* binding */ unionSets)
/* harmony export */ });
/**
 * Creates a union of multiple sets or arrays.
 *
 * @param {...Array<SetOrArray<any>>} sets - The sets or arrays to be united.
 * @returns {Array<string>} The union of the sets or arrays.
 */
function unionSetOrArray(...sets) {
    const union = {};
    for (const set of sets) {
        if (set) {
            for (const v of set) {
                union[v] = true;
            }
        }
    }
    return Object.keys(union);
}
/**
 * Creates an union of two sets.
 *
 * @param {SetExperimental} setA - The first set.
 * @param {SetExperimental} setB - The second set.
 * @returns {Set<any>} The union of the sets.
 */
function unionSets(setA, setB) {
    if (typeof setA.union === 'function') {
        return setA.union(setA);
    }
    const union = new Set();
    for (const v of setA)
        union.add(v);
    for (const v of setB)
        union.add(v);
    return union;
}
/**
 * Creates an difference of the two sets.
 *
 * @param {SetExperimental} setA - The first set.
 * @param {SetExperimental} setB - The second set.
 * @returns {Set<any>} The difference of the sets.
 */
function differenceSets(setA, setB) {
    if (typeof setA.difference === 'function') {
        return setA.difference(setA);
    }
    const difference = new Set();
    for (const v of setA)
        if (!setB.has(v))
            difference.add(v);
    return difference;
}
/**
 * Creates an intersection of the two sets.
 *
 * @param {SetExperimental} setA - The first set.
 * @param {SetExperimental} setB - The second set.
 * @returns {Set<any>} The intersection of the sets.
 */
function intersectionSets(setA, setB) {
    if (typeof setA.intersection === 'function') {
        return setA.intersection(setA);
    }
    const intersection = new Set();
    for (const v of setA)
        if (setB.has(v))
            intersection.add(v);
    return intersection;
}
/**
 * binaryInsert finds the index of where a value should be inserted into a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} value - The value to insert
 * @param {Function} getValue - The function to get the value from the item
 * @returns {number} The index of where the value should be inserted
 */
function binaryInsert(items, value, getValue = (v) => v) {
    let low = 0;
    let high = items.length;
    while (low < high) {
        const mid = (low + high) >>> 1;
        const item = items[mid];
        const v = getValue(item);
        if (v < value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
/**
 * binarySearch finds the index of a value in a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} target - The value to find
 * @param {Function} getValue - The function to get the value from the item
 * @returns {number[]} The index of the value
 */
function binarySearch(items, target, getValue = (v) => v) {
    let left = 0;
    let right = items.length - 1;
    while (left <= right) {
        const mid = (left + right) >>> 1;
        const item = items[mid];
        const v = getValue(item);
        if (v === target) {
            return [mid, left];
        }
        else if (v < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return [-1, left];
}
/**
 * Creates an enum from a set or an array.
 *
 * @param {SetOrArray<any>} set - The set or array from which the enum is to be created.
 * @param {number} offset - The starting value of the enum.
 * @returns {Record<string, number>} The created enum.
 */
function createEnum(set, offset = 0) {
    const _enum = {};
    let i = offset;
    if (set) {
        for (const v of set) {
            _enum[v] = i++;
        }
    }
    return _enum;
}
/**
 * Creates a tuple from a message.
 *
 * @param {{ action?: any, payload?: any }} message - The message from which the tuple is to be created.
 * @returns {Array<any>} The created tuple.
 */
function messageTuple(message) {
    return [message?.action, message?.payload];
}
/**
 * Split an array into pages
 *
 * @param {any[]} array - The array to be split into pages.
 * @param {number} pageSize - The size of each page.
 * @returns {any[][]} The array of pages.
 */
function paginate(array, pageSize) {
    const pages = [];
    let page = [];
    let i = 0;
    for (const v of array) {
        if (i >= pageSize) {
            pages.push(page);
            page = [];
            i = 0;
        }
        page.push(v);
        i++;
    }
    return pages;
}
/**
 * Determines the type of a value.
 *
 * @param {any} v - The value whose type is to be determined.
 * @returns {string} The type of the value.
 */
function typeOf(v) {
    const t = typeof v;
    if (t === 'object') {
        if (!v) {
            return 'null';
        }
        else if (Array.isArray(v)) {
            return 'array';
        }
    }
    return t;
}
/**
 * Combines two values.
 *
 * @param {any} objA - The first value.
 * @param {any} objB - The second value.
 * @returns {[boolean, any]} A tuple where the first element is a boolean indicating whether the values were combined, and the second element is the combined value.
 */
function combineValues(objA, objB) {
    return recursiveCombination(objA, objB);
}
/**
 * Recursively combines two objects or arrays and returns the result.
 * If the combination is successful, it returns a tuple with a boolean indicating success and the combined object/array.
 * If the combination fails, it returns a tuple with a boolean indicating failure and the second object/array.
 * @param objA - The first object/array to combine.
 * @param objB - The second object/array to combine.
 * @returns A tuple with a boolean indicating success/failure and the combined object/array.
 */
function recursiveCombination(objA, objB) {
    const typeA = typeOf(objA);
    const typeB = typeOf(objB);
    switch (typeB) {
        case 'bigint':
        case 'number': {
            if (typeA !== 'number' && typeA !== 'bigint') {
                return [false, objB];
            }
            return [true, objA + objB];
        }
        case 'array': {
            if (typeA !== 'array') {
                return [false, objB];
            }
            const newArr = [];
            let combined = true;
            for (let i = 0; i < objB.length; i += 1) {
                const [c, value] = recursiveCombination(objA[i], objB[i]);
                newArr[i] = value;
                if (c === false) {
                    combined = false;
                }
            }
            return [combined, newArr];
        }
        case 'object': {
            if (typeA !== 'object') {
                return [false, objB];
            }
            const newObj = {};
            let combined = true;
            for (const k of Object.keys(objB)) {
                const [c, value] = recursiveCombination(objA[k], objB[k]);
                if (c === false) {
                    combined = false;
                }
                newObj[k] = value;
            }
            return [combined, newObj];
        }
        default:
            return [false, objB];
    }
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && !queue.d) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__webpack_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = 1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/create fake namespace object */
/******/ (() => {
/******/ 	var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 	var leafPrototypes;
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 16: return value when it's Promise-like
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = this(value);
/******/ 		if(mode & 8) return value;
/******/ 		if(typeof value === 'object' && value) {
/******/ 			if((mode & 4) && value.__esModule) return value;
/******/ 			if((mode & 16) && typeof value.then === 'function') return value;
/******/ 		}
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		var def = {};
/******/ 		leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 		for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 			Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 		}
/******/ 		def['default'] = () => (value);
/******/ 		__webpack_require__.d(ns, def);
/******/ 		return ns;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Actions: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.Actions),
/* harmony export */   Actor: () => (/* reexport module object */ _actions_actor_js__WEBPACK_IMPORTED_MODULE_18__),
/* harmony export */   ArrayTypes: () => (/* reexport safe */ _types_js__WEBPACK_IMPORTED_MODULE_13__.ArrayTypes),
/* harmony export */   Changes: () => (/* reexport safe */ _changes_js__WEBPACK_IMPORTED_MODULE_4__.Changes),
/* harmony export */   Client: () => (/* reexport module object */ _client_js__WEBPACK_IMPORTED_MODULE_17__),
/* harmony export */   CommonComponents: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.CommonComponents),
/* harmony export */   Component: () => (/* reexport module object */ _actions_component_js__WEBPACK_IMPORTED_MODULE_19__),
/* harmony export */   Context: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_5__.Context),
/* harmony export */   Core: () => (/* reexport module object */ _actions_core_js__WEBPACK_IMPORTED_MODULE_20__),
/* harmony export */   DefaultSymbols: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.DefaultSymbols),
/* harmony export */   Emitter: () => (/* reexport safe */ _emitter_js__WEBPACK_IMPORTED_MODULE_6__.Emitter),
/* harmony export */   Entitity: () => (/* reexport module object */ _actions_entity_js__WEBPACK_IMPORTED_MODULE_21__),
/* harmony export */   Handler: () => (/* reexport safe */ _handler_js__WEBPACK_IMPORTED_MODULE_7__.Handler),
/* harmony export */   Index: () => (/* reexport safe */ _indexes_index_js__WEBPACK_IMPORTED_MODULE_1__.Index),
/* harmony export */   Node: () => (/* reexport module object */ _node_js__WEBPACK_IMPORTED_MODULE_16__),
/* harmony export */   Options: () => (/* reexport safe */ _options_js__WEBPACK_IMPORTED_MODULE_8__.Options),
/* harmony export */   Ordered: () => (/* reexport safe */ _ordered_js__WEBPACK_IMPORTED_MODULE_9__.Ordered),
/* harmony export */   Pending: () => (/* reexport safe */ _pending_js__WEBPACK_IMPORTED_MODULE_10__.Pending),
/* harmony export */   SortedIndex: () => (/* reexport safe */ _indexes_sorted_js__WEBPACK_IMPORTED_MODULE_2__.SortedIndex),
/* harmony export */   SpatialIndex: () => (/* reexport safe */ _indexes_spatial_js__WEBPACK_IMPORTED_MODULE_3__.SpatialIndex),
/* harmony export */   Storage: () => (/* reexport safe */ _storage_js__WEBPACK_IMPORTED_MODULE_11__.Storage),
/* harmony export */   Symbol: () => (/* reexport module object */ _actions_symbol_js__WEBPACK_IMPORTED_MODULE_22__),
/* harmony export */   Symbols: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_12__.Symbols),
/* harmony export */   TypeMap: () => (/* reexport safe */ _storage_js__WEBPACK_IMPORTED_MODULE_11__.TypeMap),
/* harmony export */   batchActionPayloadSizes: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.batchActionPayloadSizes),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultGetActorId: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultGetActorId),
/* harmony export */   defaultGetGroupedValue: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultGetGroupedValue),
/* harmony export */   defaultOptions: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultOptions),
/* harmony export */   defaultSetGroupedValue: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultSetGroupedValue),
/* harmony export */   defaultUpdateOptions: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultUpdateOptions),
/* harmony export */   defaultValidKeys: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.defaultValidKeys),
/* harmony export */   ensureSymbolIndex: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_12__.ensureSymbolIndex),
/* harmony export */   enumActions: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.enumActions),
/* harmony export */   enumCommonComponents: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.enumCommonComponents),
/* harmony export */   enumDefaultSymbols: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.enumDefaultSymbols),
/* harmony export */   extractSymbol: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_12__.extractSymbol),
/* harmony export */   getActionHandler: () => (/* reexport safe */ _handler_js__WEBPACK_IMPORTED_MODULE_7__.getActionHandler),
/* harmony export */   getSymbolAction: () => (/* reexport safe */ _handler_js__WEBPACK_IMPORTED_MODULE_7__.getSymbolAction),
/* harmony export */   handler: () => (/* reexport safe */ _handler_js__WEBPACK_IMPORTED_MODULE_7__.handler),
/* harmony export */   manyHandler: () => (/* reexport safe */ _handler_js__WEBPACK_IMPORTED_MODULE_7__.manyHandler),
/* harmony export */   oneHandler: () => (/* reexport safe */ _handler_js__WEBPACK_IMPORTED_MODULE_7__.oneHandler),
/* harmony export */   padEnum: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.padEnum),
/* harmony export */   recursiveSymbolExtraction: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_12__.recursiveSymbolExtraction),
/* harmony export */   recursiveSymbolIndexesEnsured: () => (/* reexport safe */ _symbols_js__WEBPACK_IMPORTED_MODULE_12__.recursiveSymbolIndexesEnsured),
/* harmony export */   updater: () => (/* reexport safe */ _updater_js__WEBPACK_IMPORTED_MODULE_14__.updater),
/* harmony export */   utils: () => (/* reexport module object */ _utils_js__WEBPACK_IMPORTED_MODULE_15__),
/* harmony export */   voidResponder: () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.voidResponder)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _indexes_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexes/index.js */ "./lib/indexes/index.js");
/* harmony import */ var _indexes_sorted_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indexes/sorted.js */ "./lib/indexes/sorted.js");
/* harmony import */ var _indexes_spatial_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexes/spatial.js */ "./lib/indexes/spatial.js");
/* harmony import */ var _changes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./changes.js */ "./lib/changes.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context.js */ "./lib/context.js");
/* harmony import */ var _emitter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./emitter.js */ "./lib/emitter.js");
/* harmony import */ var _handler_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handler.js */ "./lib/handler.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./options.js */ "./lib/options.js");
/* harmony import */ var _ordered_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ordered.js */ "./lib/ordered.js");
/* harmony import */ var _pending_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pending.js */ "./lib/pending.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./storage.js */ "./lib/storage.js");
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./symbols.js */ "./lib/symbols.js");
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./types.js */ "./lib/types.js");
/* harmony import */ var _updater_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./updater.js */ "./lib/updater.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node.js */ "./lib/node.js");
/* harmony import */ var _client_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./client.js */ "./lib/client.js");
/* harmony import */ var _actions_actor_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./actions/actor.js */ "./lib/actions/actor.js");
/* harmony import */ var _actions_component_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./actions/component.js */ "./lib/actions/component.js");
/* harmony import */ var _actions_core_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./actions/core.js */ "./lib/actions/core.js");
/* harmony import */ var _actions_entity_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./actions/entity.js */ "./lib/actions/entity.js");
/* harmony import */ var _actions_symbol_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./actions/symbol.js */ "./lib/actions/symbol.js");
/**
 * Exports all the constants.
 */

// Index Classes
/**
 * Exports all the indexes-related functions and classes.
 */

/**
 * Exports all the indexes-related functions and classes.
 */

/**
 * Exports all the indexes-related functions and classes.
 */

// Main Classes
/**
 * Exports all the actions-related functions and classes.
 */

/**
 * Exports all the context-related functions and classes.
*/

/**
 * Exports all the actions-related functions and classes.
 */

/**
 * Exports all the handler-related functions and classes.
 */

/**
 * Exports all the options-related functions and classes.
 */

/**
 * Exports all the actions-related functions and classes.
 */

/**
 * Exports all the pending-related functions and classes.
 */

/**
 * Exports all the store-related functions and classes.
 */

/**
 * Exports all the symbols-related functions and classes.
 */

/**
 * Exports all the types-related functions and classes.
 */

// Utils
/**
 * Exports all the updater-related functions and classes.
 */

/**
 * Exports all the utility functions.
 */

// Node Actions
/**
 * Exports all the node-related functions and classes.
 */

/**
 * Exports all the client-related functions and classes.
 */

// Action Modules
/**
 * Exports all the actions-related functions and classes.
 */

/**
 * Exports all the component-related functions and classes.
 */

/**
 * Exports all the core-related functions and classes.
 */

/**
 * Exports all the entity-related functions and classes.
 */

/**
 * Exports all the entity-related functions and classes.
 */

// default export is the Handler class

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_handler_js__WEBPACK_IMPORTED_MODULE_7__["default"]);

})();

var __webpack_exports__Actions = __webpack_exports__.Actions;
var __webpack_exports__Actor = __webpack_exports__.Actor;
var __webpack_exports__ArrayTypes = __webpack_exports__.ArrayTypes;
var __webpack_exports__Changes = __webpack_exports__.Changes;
var __webpack_exports__Client = __webpack_exports__.Client;
var __webpack_exports__CommonComponents = __webpack_exports__.CommonComponents;
var __webpack_exports__Component = __webpack_exports__.Component;
var __webpack_exports__Context = __webpack_exports__.Context;
var __webpack_exports__Core = __webpack_exports__.Core;
var __webpack_exports__DefaultSymbols = __webpack_exports__.DefaultSymbols;
var __webpack_exports__Emitter = __webpack_exports__.Emitter;
var __webpack_exports__Entitity = __webpack_exports__.Entitity;
var __webpack_exports__Handler = __webpack_exports__.Handler;
var __webpack_exports__Index = __webpack_exports__.Index;
var __webpack_exports__Node = __webpack_exports__.Node;
var __webpack_exports__Options = __webpack_exports__.Options;
var __webpack_exports__Ordered = __webpack_exports__.Ordered;
var __webpack_exports__Pending = __webpack_exports__.Pending;
var __webpack_exports__SortedIndex = __webpack_exports__.SortedIndex;
var __webpack_exports__SpatialIndex = __webpack_exports__.SpatialIndex;
var __webpack_exports__Storage = __webpack_exports__.Storage;
var __webpack_exports__Symbol = __webpack_exports__.Symbol;
var __webpack_exports__Symbols = __webpack_exports__.Symbols;
var __webpack_exports__TypeMap = __webpack_exports__.TypeMap;
var __webpack_exports__batchActionPayloadSizes = __webpack_exports__.batchActionPayloadSizes;
var __webpack_exports__default = __webpack_exports__["default"];
var __webpack_exports__defaultGetActorId = __webpack_exports__.defaultGetActorId;
var __webpack_exports__defaultGetGroupedValue = __webpack_exports__.defaultGetGroupedValue;
var __webpack_exports__defaultOptions = __webpack_exports__.defaultOptions;
var __webpack_exports__defaultSetGroupedValue = __webpack_exports__.defaultSetGroupedValue;
var __webpack_exports__defaultUpdateOptions = __webpack_exports__.defaultUpdateOptions;
var __webpack_exports__defaultValidKeys = __webpack_exports__.defaultValidKeys;
var __webpack_exports__ensureSymbolIndex = __webpack_exports__.ensureSymbolIndex;
var __webpack_exports__enumActions = __webpack_exports__.enumActions;
var __webpack_exports__enumCommonComponents = __webpack_exports__.enumCommonComponents;
var __webpack_exports__enumDefaultSymbols = __webpack_exports__.enumDefaultSymbols;
var __webpack_exports__extractSymbol = __webpack_exports__.extractSymbol;
var __webpack_exports__getActionHandler = __webpack_exports__.getActionHandler;
var __webpack_exports__getSymbolAction = __webpack_exports__.getSymbolAction;
var __webpack_exports__handler = __webpack_exports__.handler;
var __webpack_exports__manyHandler = __webpack_exports__.manyHandler;
var __webpack_exports__oneHandler = __webpack_exports__.oneHandler;
var __webpack_exports__padEnum = __webpack_exports__.padEnum;
var __webpack_exports__recursiveSymbolExtraction = __webpack_exports__.recursiveSymbolExtraction;
var __webpack_exports__recursiveSymbolIndexesEnsured = __webpack_exports__.recursiveSymbolIndexesEnsured;
var __webpack_exports__updater = __webpack_exports__.updater;
var __webpack_exports__utils = __webpack_exports__.utils;
var __webpack_exports__voidResponder = __webpack_exports__.voidResponder;
export { __webpack_exports__Actions as Actions, __webpack_exports__Actor as Actor, __webpack_exports__ArrayTypes as ArrayTypes, __webpack_exports__Changes as Changes, __webpack_exports__Client as Client, __webpack_exports__CommonComponents as CommonComponents, __webpack_exports__Component as Component, __webpack_exports__Context as Context, __webpack_exports__Core as Core, __webpack_exports__DefaultSymbols as DefaultSymbols, __webpack_exports__Emitter as Emitter, __webpack_exports__Entitity as Entitity, __webpack_exports__Handler as Handler, __webpack_exports__Index as Index, __webpack_exports__Node as Node, __webpack_exports__Options as Options, __webpack_exports__Ordered as Ordered, __webpack_exports__Pending as Pending, __webpack_exports__SortedIndex as SortedIndex, __webpack_exports__SpatialIndex as SpatialIndex, __webpack_exports__Storage as Storage, __webpack_exports__Symbol as Symbol, __webpack_exports__Symbols as Symbols, __webpack_exports__TypeMap as TypeMap, __webpack_exports__batchActionPayloadSizes as batchActionPayloadSizes, __webpack_exports__default as default, __webpack_exports__defaultGetActorId as defaultGetActorId, __webpack_exports__defaultGetGroupedValue as defaultGetGroupedValue, __webpack_exports__defaultOptions as defaultOptions, __webpack_exports__defaultSetGroupedValue as defaultSetGroupedValue, __webpack_exports__defaultUpdateOptions as defaultUpdateOptions, __webpack_exports__defaultValidKeys as defaultValidKeys, __webpack_exports__ensureSymbolIndex as ensureSymbolIndex, __webpack_exports__enumActions as enumActions, __webpack_exports__enumCommonComponents as enumCommonComponents, __webpack_exports__enumDefaultSymbols as enumDefaultSymbols, __webpack_exports__extractSymbol as extractSymbol, __webpack_exports__getActionHandler as getActionHandler, __webpack_exports__getSymbolAction as getSymbolAction, __webpack_exports__handler as handler, __webpack_exports__manyHandler as manyHandler, __webpack_exports__oneHandler as oneHandler, __webpack_exports__padEnum as padEnum, __webpack_exports__recursiveSymbolExtraction as recursiveSymbolExtraction, __webpack_exports__recursiveSymbolIndexesEnsured as recursiveSymbolIndexesEnsured, __webpack_exports__updater as updater, __webpack_exports__utils as utils, __webpack_exports__voidResponder as voidResponder };

//# sourceMappingURL=lib.echo-d.js.map