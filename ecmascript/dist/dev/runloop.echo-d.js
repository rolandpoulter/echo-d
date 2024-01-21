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
return (Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] = Object(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this)["webpackChunkechoD"] || []).push([["runloop"],{

/***/ "./lib/extra/runloop.js":
/*!******************************!*\
  !*** ./lib/extra/runloop.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRunLoop: () => (/* binding */ createRunLoop)
/* harmony export */ });
function createRunLoop(props = {
    updateFrequency: 1000 / 50,
    setImmediate: typeof setImmediate === 'function' ? setImmediate : setTimeout,
    clearImmediate: typeof clearImmediate === 'function' ? clearImmediate : clearTimeout,
}) {
    const { updateFrequency, setImmediate, events, fn, } = props;
    let lastFrameTime = null;
    function nextCycle(nf = nextFrame, state = getState(), start = Date.now(), now = Date.now()) {
        if (lastFrameTime === null) {
            lastFrameTime = now;
        }
        const delta = now - lastFrameTime;
        lastFrameTime = now;
        state.start = start;
        return setImmediate(() => nf(state, start, now - start, delta), 0);
    }
    let lastEmitDelta = null;
    function nextFrame(state = getState(), start = Date.now(), timestamp = 0, delta = 0) {
        if (lastEmitDelta === null) {
            lastEmitDelta = 0;
        }
        if (lastEmitDelta >= updateFrequency) {
            if (fn) {
                fn(timestamp, lastEmitDelta, delta, state);
            }
            if (state.events?.emit) {
                state.events.emit('frame', timestamp, lastEmitDelta, delta, state);
            }
            lastEmitDelta = 0;
        }
        lastEmitDelta += delta;
        if (!state.stop) {
            state.pendingFrame = nextCycle(nextFrame, state, start, Date.now());
        }
        return state;
    }
    let _state = {};
    const stateRef = { current: _state };
    function getState(subscriber = (_events) => { }, state = _state) {
        state.events = state.events || events;
        subscriber(state.events);
        return state;
    }
    function setState(state) {
        _state = state;
        stateRef.current = _state;
    }
    function stop(state = _state) {
        state.stop = true;
        if (state.pendingFrame) {
            clearImmediate(state.pendingFrame);
        }
    }
    function start(state = _state, nc = nextCycle, nf = nextFrame) {
        state.stop = false;
        nc(nf, state);
    }
    return {
        nextFrame,
        nextCycle,
        getState,
        setState,
        events,
        stop,
        start,
        state: stateRef,
    };
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./lib/extra/runloop.js"));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=runloop.echo-d.js.map