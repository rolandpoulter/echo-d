import * as bitecs from 'bitecs'
import { getWorld } from './echo.js';
import {
    BitECSStorage,
} from '../lib/extra/storage/bitecs.js'
import EchoD, {
    // Context as EchoDContext,
    // Options as EchoDOptions,
    Node as EchoDNode
// } from '../dist/module/echo-d'
} from '../lib/index.js'

// 'asset',
// 'collider',
// 'color',
// 'hidden',
// 'position',
// 'rotation',
// 'velocity',
// 'spin'

export const api = bitecs;

const {
    // createWorld,
    Types,
    defineComponent,
    setDefaultSize,
    // defineQuery,
    // addEntity,
    // addComponent,
    // pipe,
} = bitecs

export const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }
export const RGBA = { r: Types.ui8, g: Types.ui8, b: Types.ui8, a: Types.ui8 }

// const EntityState = { hidden: Types.ui8 }
// const EntityInfo = {
//     asset: String,
//     collider: String,
// }

setDefaultSize(1000)

export const Color = null && defineComponent(RGBA) 
export const Position = null && defineComponent(Vector3)
export const Rotation = null && defineComponent(Vector3)
export const Velocity = null && defineComponent(Vector3)
export const Spin = null && defineComponent(Vector3)

export const createBitECSEchoD = (options = {}, Handler = EchoD, actions = EchoDNode.actions) => new Handler(
    // context,
    {},
    // options,
    {
        ...(options || {}),
        types: {
            asset: String,
            collider: String,
            hidden: Boolean,
            color: ['ui8', 4, Color, RGBA, 10],
            position: ['f32', 3, Position, Vector3, 10],
            rotation: ['f32', 3, Rotation, Vector3, 10],
            velocity: ['f32', 3, Velocity, Vector3, 10],
            spin: ['f32', 3, Spin, Vector3, 10],
            ...(options && options.types || {}),
        },
    },
    actions,
    BitECSStorage
)

export const Handler = EchoD

export function bitECSExample(options) {
    const echo = createBitECSEchoD(options)
    const world = getWorld(echo)
    return { echo, world }
}

export default bitECSExample