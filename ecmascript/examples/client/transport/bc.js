import { onInit } from '../init.js';

const bcGameClients = new BroadcastChannel( 'game-clients' );
const bcGameHost = new BroadcastChannel( 'game-host' );

export function listenToHost ( echoD, ctx ) {
    // console.log( 'listening to host', ctx )
    if ( !ctx.id ) {
        // console.log( 'init' );
        ctx.id = onInit( echoD, sendToHost );
        echoD.updater( { responder: sendToHost } )
    }
    bcGameClients.onmessage = ( { data } ) => {
        // console.log( 'client message', data );
        if ( !ctx.id && data[ 0 ] === 'init' ) {
            // console.log( 'init' );
            ctx.id = onInit( echoD, sendToHost );
            echoD.updater( { responder: sendToHost } )
        } else {
            // console.log( 'client message', data );
            echoD.many( data );
        }
    };
}

export function sendToHost ( message ) {
    // debugger;
    // console.log( 'sending to host', message );
    bcGameHost.postMessage( message );
}