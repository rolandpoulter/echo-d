import EchoD from '../lib/index.js';

import { events } from './common/events.js';
import {
    listenToClients,
    broadcastClients
} from './host/transport.js';

// console.log('Host EchoD', EchoD);

export function createHost ( ) {
    // debugger;
    // console.log('createHost');
    const echoOptions =  {
        compressStringsAsInts: true,
        isAuthority: true,
        isSymbolLeader: true,
        types: { position: [ 'f32', 3 ] },
        responder: ( message ) => {
            // console.log('responder', message);
            broadcastClients( message )
        },
        updateOptions: {
            mask: { inputs: true },
            validkeys: { position: true }
        }
    };
    const echoD = new EchoD( { events }, echoOptions );

    listenToClients( echoD );

    events.on('actorInput', ( id, input, index, tick ) => {
        const position = echoD.store.findComponent( id, 'position' ) || [ 0, 0, 0 ];
        echoD.upsertComponent( id, 'position', new Float32Array( [
            position[ 0 ] + ( input.x || 0 ),
            position[ 1 ] + ( input.y || 0 ),
            position[ 2 ] + ( input.z || 0 ),
        ] ) );
    } );

    function gameNetworkUpdate ( ) {
        echoD.updater( { /* responder: broadcastClients */ } );
    }

    function gameLoop ( ) {
        // gamePhysicsOrOther();
        gameNetworkUpdate( );
    }

    let gameInterval = null;
    function gameStart ( ) {
        gameInterval = setInterval( gameLoop, 1000 / 30 );
    }
    function gameStop ( ) { clearInterval( gameInterval ); }

    gameStart( );

    // console.log('createHost', echoD, events, gameStart, gameStop)

    return {
        echoD,
        events,
        gameStop,
        gameStart,
    };
}

export default createHost;