import { nanoid } from 'nanoid';
export function onInit ( echoD, sendToHost ) {
    sendToHost( [ 'symbols' ] );
    sendToHost( [ 'actors' ] );
    sendToHost( [ 'entities' ] );
    sendToHost( [ 'components' ] );
    const id = nanoid( );
    echoD.spawnActor( id );
    echoD.updater( );
    return id;
}