export const events = { evo: { },
    off( ev, cb ) {
        if ( Array.isArray( this.evo[ ev ] ) ) {
            const index = this.evo[ ev ].indexOf( cb );
            if ( index !== -1 )
                this.evo[ ev ].splice( index, 1 );
        }
    },
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