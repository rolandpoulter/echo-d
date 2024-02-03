const bcGameHost = new BroadcastChannel( 'game-host' );
const bcGameClients = new BroadcastChannel( 'game-clients' );

export function listenToClients ( echoD ) {
    // console.log( 'listening to clients' );
    bcGameHost.onmessage = ( { data } ) => {
        // console.log( 'host message', data );
        // debugger;
        echoD.many( data );
    };
}

export function broadcastClients ( message ) {
    // debugger;
    // console.log( 'broadcasting', message )
    bcGameClients.postMessage( message );
}