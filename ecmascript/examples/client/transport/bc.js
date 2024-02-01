import { onInit } from './transport/init.js';

const bcGameClients = new BroadcastChannel( 'game-clients' );
const bcGameHost = new BroadcastChannel( 'game-host' );

export function listenToHost ( echoD, ctx ) {
    bcGameClients.onmessage = ( { data } ) => {
        if ( !ctx.id && data[ 0 ] === 'init' ) {
            ctx.id = onInit( echoD, sendToHost );
        } else { echoD.many( data ); }
    };
}

export function sendToHost ( message ) {
    bcGameHost.postMessage( message );
}