import { decode, encode } from 'msgpack';
import { onInit } from './transport/init.js';

export function createWebSocket( url ) {
    url = url || 'ws://localhost:8080';
    const ws = new WebSocket( url );
    ws.on( 'error' , console.error );
    return ws;
}

function listenToHost( echoD, ctx, ws ) {
    ctx = ctx || { id: null };
    ws = ws || createWebSocket( );
    ctx.ws = ws;
    ws.on( 'message', ( data ) => {
        data = decode( data );
        if ( data[ 0 ] === 'init' ) {
            ctx.id = onInit( echoD, sendToHost );
        } else echoD.many( data )
    } );
    return ctx;
}

export function sendToHost ( message, ws ) {
    const data = encode( message );
    ws.send( data );
}