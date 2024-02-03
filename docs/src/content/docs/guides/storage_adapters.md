---
title: Storage Adapters
description: A guide to Echo-D storage adapters
---

**Echo-D** supports custom storage adapters.

## [bitECS](https://github.com/NateTheGreatt/bitECS)

```js
// echo-d.js
import {
    Types,
    defineComponent,
    setDefaultSize,
} from 'bitecs'

import {
    BitECSStorage,
} from '../lib/extra/storage/bitecs.js'

setDefaultSize(1000)

export const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 }

export const Position = defineComponent(Vector3)

// ...

const echoD = new EchoD({}, {
    types: {
        position: ['f32', 3, Position, Vector3, 10], // 10 vec3 per block
    },
}, null, BitECSStorage);

const world = echoD.store.world;
```

## [Becsy](https://github.com/LastOliveGames/becsy)

```js
// echo-d.js
import {
    Type,
} from '@lastolivegames/becsy/index.js';

import {
    BecsyStorage,
} from '../lib/extra/storage/becsy.js';

export class Position {
    static schema = {
        x: Type.float32,
        y: Type.float32,
        z: Type.float32
    };
}

// ...

const echoD = new EchoD({}, {
    isAsyncStorage: true,
    types: {
        position: ['f32', 3, Position, Position.schema],
    },
    storeOptions: {
        worldOptions: {
            defs: [Position]
        },
    }
}, null, BecsyStorage);

const world = echoD.store.world;
```

## [Miniplex](https://github.com/hmans/miniplex)

```js
// echo-d.js
import {
    MiniplexStorage,
} from '../lib/extra/storage/miniplex.js'

// ...

const echoD = new EchoD({}, {}, null, MiniplexStorage);
```

## [Bevy](https://bevyengine.org/)

##### (coming soon)
