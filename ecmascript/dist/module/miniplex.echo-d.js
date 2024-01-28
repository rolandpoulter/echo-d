export const id = "miniplex";
export const ids = ["miniplex"];
export const modules = {

/***/ "./node_modules/.deno/@hmans+id@0.0.1/node_modules/@hmans/id/dist/hmans-id.esm.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.deno/@hmans+id@0.0.1/node_modules/@hmans/id/dist/hmans-id.esm.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
var entityToId = new WeakMap();
var nextId = 0;
var id = function id(object) {
  var id = entityToId.get(object);
  if (id !== undefined) return id;
  entityToId.set(object, nextId);
  return nextId++;
};




/***/ }),

/***/ "./node_modules/.deno/@hmans+queue@0.0.1/node_modules/@hmans/queue/dist/hmans-queue.esm.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/.deno/@hmans+queue@0.0.1/node_modules/@hmans/queue/dist/hmans-queue.esm.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createQueue: () => (/* binding */ createQueue)
/* harmony export */ });
function createQueue() {
  var queue = new Array();

  function add(fn) {
    queue.push(fn);
  }

  function clear() {
    queue.length = 0;
  }

  function flush() {
    queue.forEach(function (fn) {
      return fn();
    });
    clear();
  }

  add.clear = clear;
  add.flush = flush;
  return add;
}




/***/ }),

/***/ "./node_modules/.deno/@miniplex+bucket@2.0.0/node_modules/@miniplex/bucket/dist/miniplex-bucket.esm.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/.deno/@miniplex+bucket@2.0.0/node_modules/@miniplex/bucket/dist/miniplex-bucket.esm.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bucket: () => (/* binding */ Bucket)
/* harmony export */ });
/* harmony import */ var eventery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventery */ "./node_modules/.deno/eventery@0.0.4/node_modules/eventery/dist/eventery.cjs.dev.js");


function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var _Symbol$iterator;

/**
 * A class wrapping an array of entities of a specific type, providing
 * performance-optimized methods for adding, looking up and removing entities, and events
 * for when entities are added or removed.
 */
_Symbol$iterator = Symbol.iterator;
var Bucket = /*#__PURE__*/function () {
  function Bucket() {
    var _entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, Bucket);
    /* VERSIONING */
    _defineProperty(this, "_version", 0);
    /**
     * Fired when an entity has been added to the bucket.
     */
    _defineProperty(this, "onEntityAdded", new eventery__WEBPACK_IMPORTED_MODULE_0__.Event());
    /**
     * Fired when an entity is about to be removed from the bucket.
     */
    _defineProperty(this, "onEntityRemoved", new eventery__WEBPACK_IMPORTED_MODULE_0__.Event());
    /**
     * A map of entity positions, used for fast lookups.
     */
    _defineProperty(this, "entityPositions", new Map());
    this._entities = _entities;
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);

    /* Register all entity positions */
    for (var i = 0; i < _entities.length; i++) {
      this.entityPositions.set(_entities[i], i);
    }
  }
  _createClass(Bucket, [{
    key: "version",
    get:
    /**
     * The current version of the bucket. Increases every time an entity is
     * added or removed.
     */
    function get() {
      return this._version;
    }

    /**
     * An array of all entities within the bucket. Please note that for iterating
     * over the entities in this bucket, it is recommended that you use the
     * `for (const entity of bucket)` iterator form.
     */
  }, {
    key: "entities",
    get: function get() {
      return this._entities;
    }

    /* Custom iterator that iterates over all entities in reverse order. */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      var _this = this;
      var index = this._entities.length;
      var result = {
        value: undefined,
        done: false
      };
      return {
        next: function next() {
          result.value = _this._entities[--index];
          result.done = index < 0;
          return result;
        }
      };
    }
  }, {
    key: "size",
    get:
    /**
     * Returns the total size of the bucket, i.e. the number of entities it contains.
     */
    function get() {
      return this.entities.length;
    }

    /**
     * Returns the first entity in the bucket, or `undefined` if the bucket is empty.
     */
  }, {
    key: "first",
    get: function get() {
      return this.entities[0];
    }

    /**
     * Returns true if the bucket contains the given entity.
     *
     * @param entity The entity to check for.
     * @returns `true` if the specificed entity is in this bucket, `false` otherwise.
     */
  }, {
    key: "has",
    value: function has(entity) {
      return this.entityPositions.has(entity);
    }

    /**
     * Adds the given entity to the bucket. If the entity is already in the bucket, it is
     * not added again.
     *
     * @param entity The entity to add to the bucket.
     * @returns The entity passed into this function (regardless of whether it was added or not).
     */
  }, {
    key: "add",
    value: function add(entity) {
      if (entity && !this.has(entity)) {
        this.entities.push(entity);
        this.entityPositions.set(entity, this.entities.length - 1);

        /* Increase version */
        this._version++;

        /* Emit our own onEntityAdded event */
        this.onEntityAdded.emit(entity);
      }
      return entity;
    }

    /**
     * Removes the given entity from the bucket. If the entity is not in the bucket, nothing
     * happens.
     *
     * @param entity The entity to remove from the bucket.
     * @returns The entity passed into this function (regardless of whether it was removed or not).
     */
  }, {
    key: "remove",
    value: function remove(entity) {
      /* TODO: Return early if entity is not in bucket. */
      if (this.has(entity)) {
        /* Emit our own onEntityRemoved event. */
        this.onEntityRemoved.emit(entity);

        /* Get the entity's current position. */
        var index = this.entityPositions.get(entity);
        this.entityPositions["delete"](entity);

        /* Perform shuffle-pop if there is more than one entity. */
        var other = this.entities[this.entities.length - 1];
        if (other !== entity) {
          this.entities[index] = other;
          this.entityPositions.set(other, index);
        }

        /* Remove the entity from the entities array. */
        this.entities.pop();

        /* Bump version */
        this._version++;
      }
      return entity;
    }

    /**
     * Removes all entities from the bucket. Will cause the `onEntityRemoved` event to be
     * fired for each entity.
     */
  }, {
    key: "clear",
    value: function clear() {
      var _iterator = _createForOfIteratorHelper(this),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _entity = _step.value;
          this.remove(_entity);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return Bucket;
}();




/***/ }),

/***/ "./node_modules/.deno/eventery@0.0.4/node_modules/eventery/dist/eventery.cjs.dev.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.deno/eventery@0.0.4/node_modules/eventery/dist/eventery.cjs.dev.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({ value: true }));

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Event = /*#__PURE__*/function () {
  function Event() {
    _classCallCheck(this, Event);
    _defineProperty(this, "subscribers", new Set());
  }
  _createClass(Event, [{
    key: "onSubscribe",
    get:
    /**
     * Event that is emitted when a new subscription is added.
     */
    function get() {
      if (!this._onSubscribe) this._onSubscribe = new Event();
      return this._onSubscribe;
    }

    /**
     * Event that is emitted when a subscription is removed.
     */
  }, {
    key: "onUnsubscribe",
    get: function get() {
      if (!this._onUnsubscribe) this._onUnsubscribe = new Event();
      return this._onUnsubscribe;
    }

    /**
     * Subscribes a callback to the event.
     *
     * @param callback The callback to subscribe to the event.
     */
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      var _this$_onSubscribe,
        _this = this;
      this.subscribers.add(callback);
      (_this$_onSubscribe = this._onSubscribe) === null || _this$_onSubscribe === void 0 ? void 0 : _this$_onSubscribe.emit(callback);

      /* Return a function that will unsubscribe the callback */
      return function () {
        return _this.unsubscribe(callback);
      };
    }

    /**
     * Unsubscribes a callback from the event.
     *
     * @param callback The callback to unsubscribe from the event.
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe(callback) {
      var _this$_onUnsubscribe;
      this.subscribers["delete"](callback);
      (_this$_onUnsubscribe = this._onUnsubscribe) === null || _this$_onUnsubscribe === void 0 ? void 0 : _this$_onUnsubscribe.emit(callback);
    }

    /**
     * Clears all existing subscriptions.
     */
  }, {
    key: "clear",
    value: function clear() {
      if (this._onUnsubscribe) {
        var _iterator = _createForOfIteratorHelper(this.subscribers),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _callback = _step.value;
            this._onUnsubscribe.emit(_callback);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      this.subscribers.clear();
    }

    /**
     * Emit the event. This will invoke all stored listeners, passing the
     * given payload to each of them.
     *
     * @param args Arguments to pass to the listeners.
     */
  }, {
    key: "emit",
    value: function emit() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this.subscribers.forEach(function (callback) {
        return callback.apply(void 0, args);
      });
    }

    /**
     * Emit the event. This will invoke all stored listeners, passing the
     * given payload to each of them. This method supports asynchronous
     * listeners and returns a promise that resolves when all listeners
     * have completed their work.
     *
     * @param args Arguments to pass to the listeners.
     * @returns A promise that resolves when all listeners have been invoked.
     */
  }, {
    key: "emitAsync",
    value: function emitAsync() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return Promise.all(_toConsumableArray(this.subscribers).map(function (listener) {
        return listener.apply(void 0, args);
      }));
    }
  }]);
  return Event;
}();

exports.Event = Event;


/***/ }),

/***/ "./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.dev.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.dev.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({ value: true }));

var bucket = __webpack_require__(/*! @miniplex/bucket */ "./node_modules/.deno/@miniplex+bucket@2.0.0/node_modules/@miniplex/bucket/dist/miniplex-bucket.esm.js");
var id = __webpack_require__(/*! @hmans/id */ "./node_modules/.deno/@hmans+id@0.0.1/node_modules/@hmans/id/dist/hmans-id.esm.js");
var queue$1 = __webpack_require__(/*! @hmans/queue */ "./node_modules/.deno/@hmans+queue@0.0.1/node_modules/@hmans/queue/dist/hmans-queue.esm.js");

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

var _Symbol$iterator;

/**
 * A utility type that marks the specified properties as required.
 */

/**
 * A utility type that removes all optional properties.
 */

/* Utility types */

/* Query configuration */

var World = /*#__PURE__*/function (_ref) {
  _inherits(World, _ref);
  var _super = _createSuper(World);
  function World() {
    var _this;
    var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, World);
    _this = _super.call(this, entities);

    /* When entities are added, reindex them immediately */
    /* QUERIES */
    _defineProperty(_assertThisInitialized(_this), "queries", new Set());
    /* IDs */
    _defineProperty(_assertThisInitialized(_this), "entityToId", new Map());
    _defineProperty(_assertThisInitialized(_this), "idToEntity", new Map());
    _defineProperty(_assertThisInitialized(_this), "nextId", 0);
    _this.onEntityAdded.subscribe(function (entity) {
      _this.reindex(entity);
    });

    /* When entities are removed, remove them from all known queries, and delete
    their IDs */
    _this.onEntityRemoved.subscribe(function (entity) {
      _this.queries.forEach(function (query) {
        return query.remove(entity);
      });
      if (_this.entityToId.has(entity)) {
        var _id = _this.entityToId.get(entity);
        _this.idToEntity["delete"](_id);
        _this.entityToId["delete"](entity);
      }
    });
    return _this;
  }
  _createClass(World, [{
    key: "update",
    value: function (_update) {
      function update(_x, _x2, _x3) {
        return _update.apply(this, arguments);
      }
      update.toString = function () {
        return _update.toString();
      };
      return update;
    }(function (entity, update, value) {
      /* Apply the update */
      if (typeof update === "function") {
        var partial = update(entity);
        partial && Object.assign(entity, partial);
      } else if (typeof update === "string") {
        entity[update] = value;
      } else if (update) {
        Object.assign(entity, update);
      }

      /* If this world knows about the entity, reindex it. */
      this.reindex(entity);
      return entity;
    }

    /**
     * Adds a component to an entity. If the entity already has the component, the
     * existing component will not be overwritten.
     *
     * After the component was added, the entity will be reindexed, causing it to be
     * added to or removed from any queries depending on their criteria.
     *
     * @param entity The entity to modify.
     * @param component The name of the component to add.
     * @param value The value of the component to add.
     */)
  }, {
    key: "addComponent",
    value: function addComponent(entity, component, value) {
      /* Return early if the entity already has the component. */
      if (entity[component] !== undefined) return;

      /* Set the component */
      entity[component] = value;

      /* Trigger a reindexing */
      this.reindex(entity);
    }

    /**
     * Removes a component from an entity. If the entity does not have the component,
     * this function does nothing.
     *
     * After the component was removed, the entity will be reindexed, causing it to be
     * added to or removed from any queries depending on their criteria.
     *
     * @param entity The entity to modify.
     * @param component The name of the component to remove.
     */
  }, {
    key: "removeComponent",
    value: function removeComponent(entity, component) {
      /* Return early if the entity doesn't even have the component. */
      if (entity[component] === undefined) return;

      /* If this world knows about the entity, notify any derived buckets about the change. */
      if (this.has(entity)) {
        var future = _objectSpread2({}, entity);
        delete future[component];
        this.reindex(entity, future);
      }

      /* Remove the component. */
      delete entity[component];
    }
  }, {
    key: "query",
    value:
    /**
     * Creates (or reuses) a query that matches the given configuration.
     *
     * @param config The query configuration.
     * @returns A query that matches the given configuration.
     */
    function query(config) {
      var normalizedConfig = normalizeQueryConfiguration(config);
      var key = configKey(normalizedConfig);

      /* Use existing query if we can find one */
      var _iterator = _createForOfIteratorHelper(this.queries),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _query = _step.value;
          if (_query.key === key) {
            return _query;
          }
        }

        /* Otherwise, create new query */
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var query = new Query(this, normalizedConfig);
      this.queries.add(query);
      return query;
    }

    /**
     * Creates (or reuses) a query that holds entities that have all of the specified
     * components.
     *
     * @param components One or more component names to query for.
     * @returns A query that holds entities that have all of the given components.
     */
  }, {
    key: "with",
    value: function _with() {
      for (var _len = arguments.length, components = new Array(_len), _key = 0; _key < _len; _key++) {
        components[_key] = arguments[_key];
      }
      return this.query({
        "with": components,
        without: [],
        predicates: []
      });
    }

    /**
     * Creates (or reuses) a query that holds entities that do not have any of the
     * specified components.
     *
     * @param components One or more component names to query for.
     * @returns A query that holds entities that do not have any of the given components.
     */
  }, {
    key: "without",
    value: function without() {
      for (var _len2 = arguments.length, components = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        components[_key2] = arguments[_key2];
      }
      return this.query({
        "with": [],
        without: components,
        predicates: []
      });
    }

    /**
     * Creates (or reuses) a query that holds entities that match the given predicate.
     * Please note that as soon as you are building queries that use predicates, you
     * will need to explicitly reindex entities when their properties change.
     *
     * @param predicate The predicate that entities must match.
     * @returns A query that holds entities that match the given predicate.
     */
  }, {
    key: "where",
    value: function where(predicate) {
      return this.query({
        "with": [],
        without: [],
        predicates: [predicate]
      });
    }

    /**
     * Reindexes the specified entity. This will iteratere over all registered queries
     * and ask them to reevaluate the entity.
     *
     * If the `future` parameter is specified,
     * it will be used in the evaluation instead of the entity itself. This is useful
     * if you are about to perform a destructive change on the entity (like removing
     * a component), but want emitted events to still have access to the unmodified entity
     * before the change.
     *
     * @param entity The entity to reindex.
     * @param future The entity that the entity will become in the future.
     */
  }, {
    key: "reindex",
    value: function reindex(entity) {
      var future = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : entity;
      /* Return early if this world doesn't know about the entity. */
      if (!this.has(entity)) return;

      /* Notify all queries about the change. */
      var _iterator2 = _createForOfIteratorHelper(this.queries),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var query = _step2.value;
          query.evaluate(entity, future);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "id",
    value:
    /**
     * Generate and return a numerical identifier for the given entity. The ID can later
     * be used to retrieve the entity again through the `entity(id)` method.
     *
     * @param entity The entity to get the ID for.
     * @returns An ID for the entity, or undefined if the entity is not in the world.
     */
    function id(entity) {
      /* We only ever want to generate IDs for entities that are actually in the world. */
      if (!this.has(entity)) return undefined;

      /* Lazily generate an ID. */
      if (!this.entityToId.has(entity)) {
        var _id2 = this.nextId++;
        this.entityToId.set(entity, _id2);
        this.idToEntity.set(_id2, entity);
      }
      return this.entityToId.get(entity);
    }

    /**
     * Given an entity ID that was previously generated through the `id(entity)` function,
     * returns the entity matching that ID, or undefined if no such entity exists.
     *
     * @param id The ID of the entity to retrieve.
     * @returns The entity with the given ID, or undefined if no such entity exists.
     */
  }, {
    key: "entity",
    value: function entity(id) {
      return this.idToEntity.get(id);
    }
  }]);
  return World;
}(bucket.Bucket);
_Symbol$iterator = Symbol.iterator;
var Query = /*#__PURE__*/function (_Bucket) {
  _inherits(Query, _Bucket);
  var _super2 = _createSuper(Query);
  function Query(world, config) {
    var _this2;
    _classCallCheck(this, Query);
    _this2 = _super2.call(this);
    _defineProperty(_assertThisInitialized(_this2), "_isConnected", false);
    _this2.world = world;
    _this2.config = config;
    _this2.key = configKey(config);

    /* Automatically connect this query if event listeners are added to our
    onEntityAdded or onEntityRemoved events. */
    _this2.onEntityAdded.onSubscribe.subscribe(function () {
      return _this2.connect();
    });
    _this2.onEntityRemoved.onSubscribe.subscribe(function () {
      return _this2.connect();
    });
    return _this2;
  }

  /**
   * An array containing all entities that match this query. For iteration, it
   * is recommended to use the `for (const entity of query) {}` syntax instead.
   */
  _createClass(Query, [{
    key: "isConnected",
    get:
    /**
     * True if this query is connected to the world, and will automatically
     * re-evaluate when entities are added or removed.
     */
    function get() {
      return this._isConnected;
    }

    /**
     * A unique, string-based key for this query, based on its configuration.
     */
  }, {
    key: "entities",
    get: function get() {
      if (!this._isConnected) this.connect();
      return _get(_getPrototypeOf(Query.prototype), "entities", this);
    }
  }, {
    key: _Symbol$iterator,
    value: function value() {
      if (!this._isConnected) this.connect();
      return _get(_getPrototypeOf(Query.prototype), Symbol.iterator, this).call(this);
    }

    /**
     * Connects this query to the world. While connected, it will automatically
     * re-evaluate when entities are added or removed, and store those that match
     * its query configuration.
     *
     * @returns The query object.
     */
  }, {
    key: "connect",
    value: function connect() {
      if (!this._isConnected) {
        this._isConnected = true;

        /* Evaluate all entities in the world */
        var _iterator3 = _createForOfIteratorHelper(this.world),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _entity = _step3.value;
            this.evaluate(_entity);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return this;
    }

    /**
     * Disconnects this query from the world. This essentially stops the query from
     * automatically receiving entities.
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._isConnected = false;
      return this;
    }

    /**
     * Returns a new query that extends this query and also matches entities that
     * have all of the components specified.
     *
     * @param components The components that entities must have.
     * @returns A new query representing the extended query configuration.
     */
  }, {
    key: "with",
    value: function _with() {
      for (var _len3 = arguments.length, components = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        components[_key3] = arguments[_key3];
      }
      return this.world.query(_objectSpread2(_objectSpread2({}, this.config), {}, {
        "with": [].concat(_toConsumableArray(this.config["with"]), components)
      }));
    }

    /**
     * Returns a new query that extends this query and also matches entities that
     * have none of the components specified.
     *
     * @param components The components that entities must not have.
     * @returns A new query representing the extended query configuration.
     */
  }, {
    key: "without",
    value: function without() {
      for (var _len4 = arguments.length, components = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        components[_key4] = arguments[_key4];
      }
      return this.world.query(_objectSpread2(_objectSpread2({}, this.config), {}, {
        without: [].concat(_toConsumableArray(this.config.without), components)
      }));
    }

    /**
     * Returns a new query that extends this query and also matches entities that
     * match the given predicate.
     *
     * @param predicate The predicate that entities must match.
     * @returns A new query representing the extended query configuration.
     */
  }, {
    key: "where",
    value: function where(predicate) {
      return this.world.query(_objectSpread2(_objectSpread2({}, this.config), {}, {
        predicates: [].concat(_toConsumableArray(this.config.predicates), [predicate])
      }));
    }

    /**
     * Checks the given entity against this query's configuration, and returns
     * true if the entity matches the query, false otherwise.
     *
     * @param entity The entity to check.
     * @returns True if the entity matches this query, false otherwise.
     */
  }, {
    key: "want",
    value: function want(entity) {
      return this.config["with"].every(function (component) {
        return entity[component] !== undefined;
      }) && this.config.without.every(function (component) {
        return entity[component] === undefined;
      }) && this.config.predicates.every(function (predicate) {
        return predicate(entity);
      });
    }

    /**
     * Evaluate the given entity against this query's configuration, and add or
     * remove it from the query if necessary.
     *
     * If `future` is specified, the entity will be evaluated against that entity
     * instead. This is useful for checking if an entity will match the query
     * after some potentially destructive change has been made to it, before
     * actually applying that change to the entity itself.
     *
     * @param entity The entity to evaluate.
     * @param future The entity to evaluate against. If not specified, the entity will be evaluated against itself.
     */
  }, {
    key: "evaluate",
    value: function evaluate(entity) {
      var future = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : entity;
      if (!this.isConnected) return;
      var wanted = this.want(future);
      var has = this.has(entity);
      if (wanted && !has) {
        this.add(entity);
      } else if (!wanted && has) {
        this.remove(entity);
      }
    }
  }]);
  return Query;
}(bucket.Bucket);
var normalizeComponents = function normalizeComponents(components) {
  return _toConsumableArray(new Set(components.sort().filter(function (c) {
    return !!c && c !== "";
  })));
};
function normalizePredicates(predicates) {
  return _toConsumableArray(new Set(predicates));
}
function normalizeQueryConfiguration(config) {
  return {
    "with": normalizeComponents(config["with"]),
    without: normalizeComponents(config.without),
    predicates: normalizePredicates(config.predicates)
  };
}
function configKey(config) {
  return "".concat(config["with"].join(","), ":").concat(config.without.join(","), ":").concat(config.predicates.map(function (p) {
    return id.id(p);
  }).join(","));
}

/**
 * A simple queue (powered by [@hmans/queue](https://github.com/hmans/things/tree/main/packages/hmans-queue))
 * that can be used to schedule work to be done later. This is mostly provided as a convenience
 * to make upgrading from Miniplex 1.0 (which had queuing functionality built-in) a little easier,
 * and it will be deprecated in a future version.
 */
var queue = queue$1.createQueue();

Object.defineProperty(exports, "Bucket", ({
  enumerable: true,
  get: function () { return bucket.Bucket; }
}));
exports.Query = Query;
exports.World = World;
exports.queue = queue;


/***/ }),

/***/ "./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (false) {} else {
  module.exports = __webpack_require__(/*! ./miniplex.cjs.dev.js */ "./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.dev.js");
}


/***/ }),

/***/ "./lib/extra/storage/miniplex.js":
/*!***************************************!*\
  !*** ./lib/extra/storage/miniplex.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MiniplexStorage: () => (/* binding */ MiniplexStorage)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../storage.js */ "./lib/storage.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils.js */ "./lib/utils.js");


const { World, } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! miniplex/dist/miniplex.cjs.js */ "./node_modules/.deno/miniplex@2.0.0/node_modules/miniplex/dist/miniplex.cjs.js", 19));
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
        const { worldOptions = [], world = null, } = options;
        this.worldOptions = worldOptions;
        this.world = world || new World();
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
    destroyActor(id) {
        return this.destroyId(this.actors, id);
    }
    destroyComponent(id, key) {
        const entity = this.derefEntity(id);
        if (entity) {
            const prevValue = entity[key];
            // delete entity[key]
            this.world.removeComponent(entity, key);
            // this.world.reindex(entity)
            this.removeComponentsIndex(id, key, prevValue);
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
    findComponents(id) {
        const entity = this.derefEntity(id);
        if (entity) {
            return entity;
        }
    }
    findComponent(id, key) {
        const entity = this.derefEntity(id);
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
                components[id] = this.derefEntity(id);
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
        const entity = this.derefEntity(id);
        if (entity) {
            const prevValue = entity[key];
            this.world.addComponent(entity, key, value);
            // this.world.reindex(entity)
            this.updateComponentsIndex(id, key, prevValue, value);
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

};
;

// load runtime
import __webpack_require__ from "./lib.echo-d.js";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
import * as __webpack_chunk_0__ from "./miniplex.echo-d.js";
__webpack_require__.C(__webpack_chunk_0__);
var __webpack_exports__ = __webpack_exec__("./lib/extra/storage/miniplex.js");
__webpack_exports__ = await __webpack_exports__;
var __webpack_exports__MiniplexStorage = __webpack_exports__.MiniplexStorage;
export { __webpack_exports__MiniplexStorage as MiniplexStorage };

//# sourceMappingURL=miniplex.echo-d.js.map