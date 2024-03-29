import { now } from '../utils.js';
export function createRunLoop(props = {
    updateFrequency: 1000 / 50,
    setImmediate: typeof setImmediate === 'function' ? setImmediate : setTimeout,
    clearImmediate: typeof clearImmediate === 'function' ? clearImmediate : clearTimeout,
}) {
    const { updateFrequency, setImmediate, events, fn, } = props;
    let lastFrameTime = null;
    function nextCycle(nf = nextFrame, state = getState(), start = now(), n = now()) {
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
    function nextFrame(state = getState(), start = now(), timestamp = 0, delta = 0) {
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
            state.pendingFrame = nextCycle(nextFrame, state, start, now());
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
