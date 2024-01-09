type RunLoopProps = {
    updateFrequency: number,
    setImmediate: Function,
    events?: {
        on: Function,
        emit: Function,
        [key: string]: any,
    },
}

export function RunLoop(props: RunLoopProps = {
    updateFrequency: 1000 / 50,
    setImmediate: typeof setImmediate === 'function' ? setImmediate : setTimeout,
}) {
    const {
        updateFrequency,
        setImmediate,
        events,
    } = props;

    let lastFrameTime: number | null = null

    function nextFrame (f = nextCycle, state = getState(), start = Date.now(), now = Date.now()) {
        if (lastFrameTime === null) {
            lastFrameTime = now
        }
        const delta = now - lastFrameTime
        lastFrameTime = now
        return setImmediate(() => f(state, start, now - start, delta), 0)
    }

    let lastEmitDelta: number | null = null

    function nextCycle (state = getState(), start = Date.now(), timestamp = 0, delta = 0) {
        if (lastEmitDelta === null) {
            lastEmitDelta = 0
        }
        if (lastEmitDelta >= updateFrequency) {
            if (state.events) {
                state.events.emit('frame', timestamp, lastEmitDelta, delta, state)
            }
            lastEmitDelta = 0
        }
        lastEmitDelta += delta
        if (!state.stop) {
            state.pendingFrame = nextFrame(nextCycle, state, start, Date.now())
        }
        return state
    }

    let _state = { };
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

    return {
        nextFrame,
        nextCycle,
        getState,
        setState,
        state: stateRef,
    }
}