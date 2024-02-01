export function listenToControls ( echoD, ctx, sendToHost ) {
    document.addEventListener( 'keydown', ( { code } ) => {
        if ( !ctx.id ) { return; }
        const move = { x: 0, y: 0, z: 0 }
        const step = 0.1;
        switch (code) {
        case 'KeyW': case 'ArrowUp':
            move.y =  step; break;
        case 'KeyS': case 'ArrowDown':
            move.y = -step; break;
        case 'KeyA': case 'ArrowLeft':
            move.x = -step; break;
        case 'KeyD': case 'ArrowRight':
            move.x =  step; break;
        case 'KeyQ':
            move.z =  step; break;
        case 'KeyE':
            move.z = -step; break;
        }
        echoD.actorInput( ctx.id, move );
        echoD.updater({
            responder: sendToHost,
            updateOptions:  { mask: {
                actors: true,
                entities: true,
                components: true,
                symbols: true
            } }
        } );
    } );
}