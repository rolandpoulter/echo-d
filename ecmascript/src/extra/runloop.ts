type RunLoopProps = {
    updateFrequency: number,
    setImmediate: Function,
    clearImmediate: Function,
    events?: {
        on: Function,
        emit: Function,
        [key: string]: any,
    },
    fn?: Function,
}

export function createRunLoop(props: RunLoopProps = {
    updateFrequency: 1000 / 50,
    setImmediate: typeof setImmediate === 'function' ? setImmediate : setTimeout,
    clearImmediate: typeof clearImmediate === 'function' ? clearImmediate : clearTimeout,
}) {
    const {
        updateFrequency,
        setImmediate,
        events,
        fn,
    } = props;

    let lastFrameTime: number | null = null

    function nextCycle (nf = nextFrame, state = getState(), start = Date.now(), now = Date.now()) {
        if (lastFrameTime === null) {
            lastFrameTime = now
        }
        const delta = now - lastFrameTime
        lastFrameTime = now
        state.start = start
        return setImmediate(() => nf(state, start, now - start, delta), 0)
    }

    let lastEmitDelta: number | null = null

    function nextFrame (state = getState(), start = Date.now(), timestamp = 0, delta = 0) {
        if (lastEmitDelta === null) {
            lastEmitDelta = 0
        }
        if (lastEmitDelta >= updateFrequency) {
            if (fn) {
                fn(timestamp, lastEmitDelta, delta, state)
            }
            if (state.events?.emit) {
                state.events.emit('frame', timestamp, lastEmitDelta, delta, state)
            }
            lastEmitDelta = 0
        }
        lastEmitDelta += delta
        if (!state.stop) {
            state.pendingFrame = nextCycle(nextFrame, state, start, Date.now())
        }
        return state
    }

    let _state: { [key: string]: any } = { };
    const stateRef = { current: _state };

    function getState (subscriber = (_events: any) => {}, state: any = _state) {
        state.events = state.events || events;
        subscriber(state.events)
        return state
    }

    function setState (state: any) {
        _state = state
        stateRef.current = _state
    }

    function stop (state: any = _state) {
        state.stop = true
        if (state.pendingFrame) {
            clearImmediate(state.pendingFrame)
        }
    }

    function start (state: any = _state, nc = nextCycle, nf = nextFrame) {
        state.stop = false
        nc(nf, state)
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
    }
}