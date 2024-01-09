// import { World } from 'miniplex'
import { MiniplexStorage } from '../lib/extra/storage/miniplex.js'
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

export const echoD = new EchoD(
    // echoDOptions,
    {},
    // echoDContext,
    {},
    EchoDNode.actions,
    MiniplexStorage
)

export const world = echoD.context.store.world

export default echoD
