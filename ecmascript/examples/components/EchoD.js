import { useEffect, useState } from 'react';

export function EchoD ({ events: localEvents = events } ) {
    const [ views, setViews ] = useState( [ ] );
    useEffect( () => {
        localEvents.on( 'render', setViews );
        return () => localEvents.off( 'render', setViews );
    }, [ localEvents ] );
    return views;
}