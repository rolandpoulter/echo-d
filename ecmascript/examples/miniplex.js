// import { World } from 'miniplex'
import { getWorld } from './echo.js';
import {
    MiniplexStorage,
    defaultGetGroupedValue,
    defaultSetGroupedValue,
} from '../lib/extra/storage/miniplex.js'
import EchoD, {
    // Context as EchoDContext,
    // Options as EchoDOptions,
    Node as EchoDNode
// } from '../dist/module/echo-d'
} from '../lib/index.js'

/*
type Entity = {
    position: { x: number; y: number }
    velocity?: { x: number; y: number }
    health?: {
        current: number
        max: number
    }
    poisoned?: true
}
*/

/* Create a world with entities of that type */
// const world = new World/*<Entity>*/()

// const echoDOptions = new EchoDOptions({}, EchoDNode.actions)
// const echoDContext = new EchoDContext({}, options, MiniplexStorage)

export const createMiniplexEchoD = (options, Handler = EchoD, actions = EchoDNode.actions) => new Handler(
    // echoDOptions,
    {},
    // echoDContext,
    {
        getGroupedValue: defaultGetGroupedValue,
        setGroupedValue: defaultSetGroupedValue,
        ...(options || {}),
    },
    actions,
    MiniplexStorage
)

export const Handler = EchoD

export function miniplexExample() {
    const echo = createMiniplexEchoD()
    const world = getWorld(echo)
    return { echo, world }
}

export default miniplexExample()