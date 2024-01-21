import { EventEmitter } from 'node:events'

import { createRunLoop } from '../lib/extra/runloop.js'

export function loopExample(fn, events) {
    events = events || new EventEmitter()

    function loop(timestamp, lastEmitDelta, delta, state) {
        console.log('loop', timestamp, lastEmitDelta, delta, state)
        if (fn) fn(timestamp, lastEmitDelta, delta, state)
    }

    const runLoop = createRunLoop({
        events,
        updateFrequency: 1000 / 20, // 20 fps
        // setImmediate: requestAnimationFrame,
        // clearImmediate: cancelAnimationFrame,
        fn: loop,
    })

    events.on('frame', (timestamp, lastEmitDelta, delta, state) => {
        console.log('frame', timestamp, lastEmitDelta, delta, state)
    })

    runLoop.start()
    // runLoop.stop()
    
    return runLoop
}

export default loopExample()