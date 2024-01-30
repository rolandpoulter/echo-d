// export * from './becsy'
// export * from './bitecs'
// export * from './miniplex'
// export * from './echo'

export function setup(echo) {
    return [
        echo.spawnActor('actor1'),
        echo.spawnActor('actor2'),

        echo.createEntity('entity1'),
        echo.createEntity('entity2'),
    ]
}

export function cleanup(echo) {
    return [
        echo.removeComponent('actor1', 'color'),
        echo.removeComponent('actor2', 'color'),

        echo.removeComponent('entity1', 'color'),
        echo.removeComponent('entity2', 'color'),

        echo.removeComponent('actor1', 'position'),
        echo.removeComponent('actor2', 'position'),

        echo.removeComponent('entity1', 'position'),
        echo.removeComponent('entity2', 'position'),

        echo.removeActor('actor1'),
        echo.removeActor('actor2'),

        echo.removeEntity('entity1'),
        echo.removeEntity('entity2'),
    ]
}

export function colorize(echo) {
    return [
        echo.upsertComponent('actor1', 'color', new Uint8Array([ 255, 0, 0, 255 ])), // red
        echo.upsertComponent('actor2', 'color', new Uint8Array([ 0, 255, 0, 255 ])), // green

        echo.upsertComponent('entity1', 'color', new Uint8Array([ 0, 0, 255, 255 ])), // blue
        echo.upsertComponent('entity2', 'color', new Uint8Array([ 255, 255, 0, 255 ])), // yellow
    ]
}

export function position(echo) {
    return [
        echo.upsertComponent('actor1', 'position', new Float32Array([ 0, 0, 0 ])), // origin
        echo.upsertComponent('actor2', 'position', new Float32Array([ 1, 0, 0 ])), // right

        echo.upsertComponent('entity1', 'position', new Float32Array([ 0, 1, 0 ])), // up
        echo.upsertComponent('entity2', 'position', new Float32Array([ 1, 1, 0 ])), // up-right
    ]
}

export function move(echo) {
    return [
        echo.actorInput('actor1', { type: 'move', move: [0, 0, 1] }), // move input
        echo.actorInput('actor2', { type: 'move', move: [0, 0, 1] }), // move input
    ]
}

export function update(echo, ecsList, responder) {
    return echo.updater({
        responder: (payload) => {
            for (const ecs of ecsList) {
                // many or one?
                ecs.many(payload)
                // ecs.one(payload)
            }
            if (responder) {
                responder(payload)
            }
            // return new Promise((resolve) => {
            //     setTimeout(resolve, 50)
            // })
        },
    })
}

export function possiblePromises(list) {
    return Promise.all(list.map((item) => {
        if (item instanceof Promise) {
            return item
        }
        return Promise.resolve(item)
    }))
}

export async function syncExample(echo, ecsList, options = {}) {
    // const echo = this

    if (options.beforeSetup) {
        await options.beforeSetup(echo, ecsList)
    }

    await possiblePromises(setup(echo))

    if (options.afterSetup) {
        await options.afterSetup(echo, ecsList)
    }


    if (options.beforeColorize) {
        await options.beforeColorize(echo, ecsList)
    }

    if (!options.skipColorize) {
        await possiblePromises(colorize(echo))
    }

    if (options.afterColorize) {
        await options.afterColorize(echo, ecsList)
    }

    
    if (options.beforePosition) {
        await options.beforePosition(echo, ecsList)
    }

    if (!options.skipPosition) {
        await possiblePromises(position(echo))
    }

    if (options.afterPosition) {
        await options.afterPosition(echo, ecsList)
    }

    
    if (options.beforeMove) {
        await options.beforeMove(echo, ecsList)
    }

    if (!options.skipMove) {
        await possiblePromises(move(echo))
    }

    if (options.afterMove) {
        await options.afterMove(echo, ecsList)
    }

    
    if (options.beforeUpdate) {
        await options.beforeUpdate(echo, ecsList)
    }

    await update(echo, ecsList)

    if (options.afterUpdate) {
        await options.afterUpdate(echo, ecsList)
    }

    
    if (options.beforeCleanup) {
        await options.beforeUpdate(echo, ecsList)
    }

    if (!options.skipCleanup) {
        await cleanup(echo)
    }

    if (options.afterCleanup) {
        await options.afterCleanup(echo, ecsList)
    }
    
    await update(echo, ecsList)
    
    return {
        echo,
        ecsList,
    }
}

export default syncExample