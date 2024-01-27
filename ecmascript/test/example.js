import exampleBecsyTest from './example/becsy.js';
import exampleBitECSTest from './example/bitecs.js';
import exampleMiniplexTest from './example/miniplex.js';
import exampleEchoTest from './example/echo.js';

import exampleSyncTest from './example/sync.js';

import exampleGameTest from './example/game.js';
import exampleLoopTest from './example/loop.js';
import exampleSystemsTest from './example/systems.js';

import * as becsy from '../examples/becsy.js';
import * as bitecs from '../examples/bitecs.js';
import * as miniplex from '../examples/miniplex.js';
import * as _echo from '../examples/echo.js';
import * as sync from '../examples/sync.js';
import * as game from '../examples/game.js';
import * as loop from '../examples/loop.js';
import * as systems from '../examples/systems.js';

export default function example(echo, testOptions) {
    const extras = {
        becsy,
        bitecs,
        miniplex,
        echo: _echo,
        sync,
        game,
        loop,
        systems
    };
    testOptions.describe('example', () => {
        exampleBecsyTest(echo, extras, testOptions);
        exampleBitECSTest(echo, extras, testOptions);
        exampleMiniplexTest(echo, extras, testOptions);
        exampleEchoTest(echo, extras, testOptions);

        exampleSyncTest(echo, extras, testOptions);

        exampleGameTest(echo, extras, testOptions);
        exampleLoopTest(echo, extras, testOptions);
        exampleSystemsTest(echo, extras, testOptions);
    });
}