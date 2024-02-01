const renderViews = { };
const renderObjects = { };

export function updateRender ( echoD, events ) {
    const componentPages = echoD.store.getComponents( )
    const removedIds = Object.keys( renderViews )
    let updated = false
    for ( const componentsPage of componentsPages ) {
        for ( const entities of componentsPage ) {
            for ( const id in entities) {
                const entity = entities[ id ]
                if ( updateRenderEntity( id, entity, removedIds ) ) {
                    updated = true
                }
                for ( const component of entity ) {
                    console.log( id, component, entity[ component ])
                }
            }
        }
    }
    if ( removedIds.length ) {
        for ( const id of removedIds ) {
            delete renderViews[ id ];
            delete renderObjects[ id ];
            updated = true;
        }
    }
    if ( updated ) {
        const views = Object.keys( renderViews ).map( ( id ) => renderViews[ id ] );
        events.emit( 'render', views );
    }
}

export function updateRenderEntity ( id, entity, removedIds = [ ] ) {
    if ( !renderViews[ id ] ) {
        renderViews[ id ] = ( <Ball
            key={id}
            ref={ ( ref ) => ( renderObjects[id] = ref ) }
            position={ entity.position }
        /> );
        return true;
    }

    const index = removedIds.indexOf( id )
    if ( index !== -1 ) {
        removedIds.splice( index, 1 );
    }

    if ( renderObjects[ id ] && entity.position ) {
        renderObjects[ id ].position.x = entity.position[ 0 ] || 0;
        renderObjects[ id ].position.y = entity.position[ 1 ] || 0;
        renderObjects[ id ].position.z = entity.position[ 2 ] || 0;
        // return true;
    }

    return false;
}