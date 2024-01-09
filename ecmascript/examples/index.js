import becsy from './becsy'
import bitecs from './bitecs'
import miniplex from './miniplex'

import echo from './echo'

echo.spawnActor('actor1')
echo.spawnActor('actor2')

echo.createEntity('entity1')
echo.createEntity('entity2')

echo.upsertComponent('actor1', 'color', [ 255, 0, 0, 255 ]) // red
echo.upsertComponent('actor2', 'color', [ 0, 255, 0, 255 ]) // green

echo.upsertComponent('entity1', 'color', [ 0, 0, 255, 255 ]) // blue
echo.upsertComponent('entity2', 'color', [ 255, 255, 0, 255 ]) // yellow

echo.upsertComponent('actor1', 'position', [ 0, 0, 0 ]) // origin
echo.upsertComponent('actor2', 'position', [ 1, 0, 0 ]) // right

echo.upsertComponent('entity1', 'position', [ 0, 1, 0 ]) // up
echo.upsertComponent('entity2', 'position', [ 1, 1, 0 ]) // up-right

echo.actorInput('actor1', { type: 'move', move: [0, 0, 1] }) // move input
echo.actorInput('actor2', { type: 'move', move: [0, 0, 1] }) // move input

echo.updater({
    responder: (payload) => {
        // many or one?
        becsy.one(payload)
        bitecs.one(payload)
        miniplex.one(payload)
    },
})

export {
    becsy,
    bitecs,
    miniplex,
    echo,
}

export default {
    becsy,
    bitecs,
    miniplex,
    echo,
}