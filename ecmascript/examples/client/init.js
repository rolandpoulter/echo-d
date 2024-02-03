import { nanoid } from 'nanoid';
export function onInit ( echoD, sendToHost ) {
    sendToHost( [ 'symbols' ] );
    sendToHost( [ 'actors' ] );
    sendToHost( [ 'entities' ] );
    sendToHost( [ 'components' ] );
    const id = nanoid( );
    echoD.spawnActor( id );
    // console.log('CLIENT ID', id)
    return id;
}