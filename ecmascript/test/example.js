import exampleBecsyTest from './example/becsy.js';
import exampleBitECSTest from './example/bitecs.js';
import exampleMiniplexTest from './example/miniplex.js';
import exampleEchoTest from './example/echo.js';

import exampleSyncTest from './example/sync.js';

import exampleGameTest from './example/game.js';
import exampleLoopTest from './example/loop.js';
import exampleSystemsTest from './example/systems.js';

export default function example(echo, testOptions) {
    describe('example', () => {
        exampleBecsyTest(echo, testOptions);
        exampleBitECSTest(echo, testOptions);
        exampleMiniplexTest(echo, testOptions);
        exampleEchoTest(echo, testOptions);

        exampleSyncTest(echo, testOptions);

        exampleGameTest(echo, testOptions);
        exampleLoopTest(echo, testOptions);
        exampleSystemsTest(echo, testOptions);
    });
}