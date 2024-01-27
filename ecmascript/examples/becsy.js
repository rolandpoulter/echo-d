import {
    System,
    Type,
    World
} from '@lastolivegames/becsy/index.js';
import { getWorld } from './echo.js';
import {
    BecsyStorage,
    defaultGetGroupedValue,
    defaultSetGroupedValue,
} from '../lib/extra/storage/becsy.js'
import EchoD, {
    // Context as EchoDContext,
    // Options as EchoDOptions,
    Node as EchoDNode
// } from '../dist/module/echo-d'
} from '../lib/index.js'

export class Color {
    // Color is a four unsigned bytes vector, and we define it as a separate component type.
    static schema = {
        r: Type.uint8,
        g: Type.uint8,
        b: Type.uint8,
        a: Type.uint8
    };
}

export class Position {
    // Each property needs a low level backing field type, as Becsy uses raw array buffers to share
    // data between workers (threads) rather than using objects to represent components.  You declare
    // these in a static schema property.
    static schema = {
        x: Type.float32,
        y: Type.float32,
        z: Type.float32
    };
}

export class Velocity {
    // Velocity is also a two floats vector just like Position, but we nonetheless define it as a
    // separate component type.  Since an entity can have at most one instance of any given component
    // type this will allow an entity to have both a Velocity and a Position.  We could reuse property
    // names but prefer not to, as it will make code clearer later on.
    static schema = {
        vx: Type.float32,
        vy: Type.float32,
        vz: Type.float32
    };
}

export class Rotation {
    // Rotation is a three floats vector, and we define it as a separate component type.
    static schema = {
        rx: Type.float32,
        ry: Type.float32,
        rz: Type.float32
    };
}

export class Spin {
    // Spin is a three floats vector, and we define it as a separate component type.
    static schema = {
        sx: Type.float32,
        sy: Type.float32,
        sz: Type.float32
    };
}

export const createBecsyEchoD = (options = {}, Handler = EchoD, actions = EchoDNode.actions) => new Handler(
    // context,
    {},
    // options,
    {
        getGroupedValue: defaultGetGroupedValue,
        setGroupedValue: defaultSetGroupedValue,
        ...(options || {}),
        types: {
            asset: String,
            collider: String,
            hidden: Boolean,
            color: ['ui8', 4, Color, Color.schema],
            position: ['f32', 3, Position, Position.schema],
            rotation: ['f32', 3, Rotation, Rotation.schema],
            velocity: ['f32', 3, Velocity, Velocity.schema],
            spin: ['f32', 3, Spin, Spin.schema],
            ...(options && options.types || {}),
        },
    },
    actions,
    BecsyStorage
)

export function bescyExample() {
    const echo = createBecsyEchoD()
    const world = getWorld(echo)
    return { echo, world }
}

export default bescyExample()