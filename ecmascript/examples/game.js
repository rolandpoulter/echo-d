import { EventEmitter } from 'node:events';

import { getWorld } from './echo.js';

import * as Systems from './systems.js';
import * as Loop from './loop.js';

export function gameExample(
    responder = (payload) => {
        // Broadcast to all peers or clients
    }
) {
    const events = new EventEmitter()

    events.on('frame', (timestamp, lastEmitDelta, delta, state) => {
        console.log('frame', timestamp, lastEmitDelta, delta, state)
    })

    events.on('actorInput', (id, inputs, newindex, tick) => {
        console.log('actorInput', id, inputs, newindex, tick)
    })

    const echo = Systems.createSystemsEchoD()
    
    echo.context.events = events

    Systems.createSystems(echo)

    function executeAndUpdate (timestamp, lastEmitDelta, delta, state) {
        Systems.executeAllSystems(echo)

        echo.updater({
            responder,
        })
    }
    
    const loop = Loop.loopExample(executeAndUpdate, events)

    // loop.start()

    return {
        events,
        world: getWorld(echo),
        store: echo.context.store,
        echo,
        loop,
    }
}