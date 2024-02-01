import { WebSocketServer } from 'ws';
import { decode, encode } from 'msgpack';

const clients = [ ];

function messageHandler ( echoD, data ) {
    data = decode( data );
    echoD.many( data );
};

function closeHandler ( conn ) {
    const index = clients.indexOf( conn );
    if (index !== -1) { clients.splice( index, 1 ); }
}

export function createWebSocketServer ( echoD, wssOptions ) {
    return new WebSocketServer( wssOptions );
}

export function listenToClients( echoD, wss ) {
    wss = wss || createWebSocketServer( { port: 8080, host: 'localhost' } );
    wss.on( 'connection', ( conn ) => {
        clients.push( conn );
        conn.on( 'close', () => closeHandler( conn ) );
        conn.on( 'message',  ( data ) => messageHandler( echoD, data ) );
        conn.send( encode( [ 'init' ] ) );
    });

}

export function broadcastClients ( message ) {
    const data = encode( message );
    clients.forEach( ( client ) => client.send( data ) );
}