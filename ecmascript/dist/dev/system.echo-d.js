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
return (Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] = Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] || []).push([["system"],{

/***/ "./lib/extra/system.js":
/*!*****************************!*\
  !*** ./lib/extra/system.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   System: () => (/* binding */ System),
/* harmony export */   SystemHandler: () => (/* binding */ SystemHandler),
/* harmony export */   executeSystems: () => (/* binding */ executeSystems)
/* harmony export */ });
/* harmony import */ var _handler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handler.js */ "./lib/handler.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage.js */ "./lib/storage.js");


class System {
    static query(handler, query) {
        return handler.queryComponents(query);
    }
    constructor(handler, components, exclude = new Set()) {
        this.handler = handler;
        this.exclude = exclude;
        this.components = components;
    }
    query() {
        this.entities = System.query(this.handler, { with: this.components, without: this.exclude });
        return this.entities;
    }
    execute(fn) {
        const entities = this.query();
        const handler = this.handler;
        for (const entity of entities) {
            fn(handler, entity);
        }
    }
}
function executeSystems(systems, fn) {
    for (const system of systems) {
        system.execute(fn);
    }
}
class SystemHandler extends _handler_js__WEBPACK_IMPORTED_MODULE_0__.Handler {
    constructor(context, options, actions, _Storage = _storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage) {
        super(context, options, actions, _Storage);
        this.systems = [];
    }
    createSystem(components, exclude = new Set(), _System = System) {
        const system = new _System(this, components, exclude);
        this.systems.push(system);
        return system;
    }
    removeSystem(system) {
        const index = this.systems.indexOf(system);
        if (index !== -1) {
            this.systems.splice(index, 1);
        }
    }
    executeSystems(fn) {
        executeSystems(this.systems, fn);
    }
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./lib/extra/system.js"));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=system.echo-d.js.map