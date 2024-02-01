export const events = { evo: { },
    on( ev, cb ) {
        if ( Array.isArray( this.evo[ ev ] ) )
            this.evo[ ev ].push( cb );
        else this.evo[ ev ] = [ cb ];
    },
    emit( ev, ...data ) {
        if ( Array.isArray( this.evo[ ev ] ) )
            for ( const cb of this.evo[ ev ] )
                cb.call( this, ...data );
    }
};