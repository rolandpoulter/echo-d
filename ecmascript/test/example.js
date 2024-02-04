import exampleBecsyTest from './examples/becsy.js';
import exampleBitECSTest from './examples/bitecs.js';
import exampleMiniplexTest from './examples/miniplex.js';
import exampleEchoTest from './examples/echo.js';

import exampleSyncTest from './examples/sync.js';

import exampleGameTest from './examples/game.js';
import exampleLoopTest from './examples/loop.js';
import exampleSystemsTest from './examples/systems.js';

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