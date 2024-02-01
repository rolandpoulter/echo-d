const bcGameHost = new BroadcastChannel( 'game-host' );
const bcGameClients = new BroadcastChannel( 'game-clients' );

export function listenToClients ( echoD ) {
    bcGameHost.onmessage = ( { data } ) => echoD.many( data );
}

export function broadcastClients ( message ) {
    bcGameClients.postMessage( message );
}