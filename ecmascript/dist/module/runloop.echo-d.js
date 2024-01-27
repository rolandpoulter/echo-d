export const id = "runloop";
export const ids = ["runloop"];
export const modules = {

/***/ "./lib/extra/runloop.js":
/*!******************************!*\
  !*** ./lib/extra/runloop.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRunLoop: () => (/* binding */ createRunLoop)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./lib/utils.js");

function createRunLoop(props = {
    updateFrequency: 1000 / 50,
    setImmediate: typeof setImmediate === 'function' ? setImmediate : setTimeout,
    clearImmediate: typeof clearImmediate === 'function' ? clearImmediate : clearTimeout,
}) {
    const { updateFrequency, setImmediate, events, fn, } = props;
    let lastFrameTime = null;
    function nextCycle(nf = nextFrame, state = getState(), start = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)(), n = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)()) {
        if (lastFrameTime === null) {
            lastFrameTime = n;
        }
        const delta = n - lastFrameTime;
        lastFrameTime = n;
        state.start = start;
        if (typeof setImmediate === 'function') {
            return setImmediate(() => nf(state, start, n - start, delta), 0);
        }
    }
    let lastEmitDelta = null;
    function nextFrame(state = getState(), start = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)(), timestamp = 0, delta = 0) {
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
            state.pendingFrame = nextCycle(nextFrame, state, start, (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.now)());
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

};
;

// load runtime
import __webpack_require__ from "./lib.echo-d.js";
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
import * as __webpack_chunk_0__ from "./runloop.echo-d.js";
__webpack_require__.C(__webpack_chunk_0__);
var __webpack_exports__ = __webpack_exec__("./lib/extra/runloop.js");
var __webpack_exports__createRunLoop = __webpack_exports__.createRunLoop;
export { __webpack_exports__createRunLoop as createRunLoop };

//# sourceMappingURL=runloop.echo-d.js.map