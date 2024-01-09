import {
    createWorld,
    Types,
    defineComponent,
    defineQuery,
    addEntity,
    addComponent,
    pipe,
} from 'bitecs'
import { BitECSStorage } from '../lib/extra/storage/bitecs.js'
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

export const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }
export const RGBA = { r: Types.ui8, g: Types.ui8, b: Types.ui8, a: Types.ui8 }

// const EntityState = { hidden: Types.ui8 }
// const EntityInfo = {
//     asset: String,
//     collider: String,
// }

export const Color = defineComponent(RGBA) 
export const Position = defineComponent(Vector3)
export const Rotation = defineComponent(Vector3)
export const Velocity = defineComponent(Vector3)
export const Spin = defineComponent(Vector3)

export const echoD = new EchoD(
    // context,
    {},
    // options,
    {
        types: {
            asset: String,
            collider: String,
            hidden: Boolean,
            color: ['ui8', 4, Color, RGBA],
            position: ['f32', 3, Position, Vector3],
            rotation: ['f32', 3, Rotation, Vector3],
            velocity: ['f32', 3, Velocity, Vector3],
            spin: ['f32', 3, Spin, Vector3],
        },
    },
    EchoDNode.actions,
    BitECSStorage
)

export const world = echoD.context.store.world

export default echoD