// export * from './becsy'
// export * from './bitecs'
// export * from './miniplex'
// export * from './echo'

export function setup(echo) {
    echo.spawnActor('actor1')
    echo.spawnActor('actor2')

    echo.createEntity('entity1')
    echo.createEntity('entity2')
}

export function cleanup(echo) {
    echo.removeComponent('actor1', 'color')
    echo.removeComponent('actor2', 'color')

    echo.removeComponent('entity1', 'color')
    echo.removeComponent('entity2', 'color')

    echo.removeComponent('actor1', 'position')
    echo.removeComponent('actor2', 'position')

    echo.removeComponent('entity1', 'position')
    echo.removeComponent('entity2', 'position')

    echo.removeActor('actor1')
    echo.removeActor('actor2')

    echo.removeEntity('entity1')
    echo.removeEntity('entity2')
}

export function colorize(echo) {
    echo.upsertComponent('actor1', 'color', [ 255, 0, 0, 255 ]) // red
    echo.upsertComponent('actor2', 'color', [ 0, 255, 0, 255 ]) // green

    echo.upsertComponent('entity1', 'color', [ 0, 0, 255, 255 ]) // blue
    echo.upsertComponent('entity2', 'color', [ 255, 255, 0, 255 ]) // yellow
}

export function position(echo) {
    echo.upsertComponent('actor1', 'position', [ 0, 0, 0 ]) // origin
    echo.upsertComponent('actor2', 'position', [ 1, 0, 0 ]) // right

    echo.upsertComponent('entity1', 'position', [ 0, 1, 0 ]) // up
    echo.upsertComponent('entity2', 'position', [ 1, 1, 0 ]) // up-right
}

export function move(echo) {
    echo.actorInput('actor1', { type: 'move', move: [0, 0, 1] }) // move input
    echo.actorInput('actor2', { type: 'move', move: [0, 0, 1] }) // move input
}

export function update(echo, ecsList, responder) {
    echo.updater({
        responder: (payload) => {
            for (const ecs of ecsList) {
                // many or one?
                ecs.many(payload)
                // ecs.one(payload)
            }
            if (responder) {
                responder(payload)
            }
        },
    })
}

export default function syncExample(echo, ecsList, options = {}) {
    const echo = this

    if (options.beforeSetup) {
        options.beforeSetup(echo, ecsList)
    }

    setup(echo)

    if (options.afterSetup) {
        options.afterSetup(echo, ecsList)
    }

    if (!options.skipColorize) {
        colorize(echo)
    }

    if (!options.skipPosition) {
        position(echo)
    }

    if (!options.skipMove) {
        move(echo)
    }

    if (options.beforeCleanup) {
        options.beforeUpdate(echo, ecsList)
    }

    update(echo, ecsList)

    if (options.afterUpdate) {
        options.afterUpdate(echo, ecsList)
    }

    if (!options.skipCleanup) {
        cleanup(echo)
    }
    
    return [echo].concat(ecsList)
}