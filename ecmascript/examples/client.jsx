import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { createRoot } from 'react-dom/client';

import EchoD from '../lib/index.js';

import { events } from './common/events.js';
import { listenToHost, sendToHost } from './client/transport.js';
import { listenToControls } from './client/controls.js';
import { updateRender } from './client/update.jsx';
import { Render } from './components/Render.jsx';

export function createClient({ props, Canvas }) {
    let renderTimer = null
    function onUpdate (message) {
        if ( renderTimer !== null ) { clearTimeout( renderTimer ); }
        // const update = () => updateRender( echoD, events )
        // renderTimer = setTimeout(update, 1000 / 30 );
    }
    
    const echoOptions = {
        compressStringsAsInts: true,
        types: { position: [ 'f32', 3 ] },
        updateOptions: {
            mask: { entity: true, component: true },
            validkeys: { }
        },
        onUpdate
    };
    const echoD = new EchoD( { events }, echoOptions );
    
    const ctx = { id: null };
    listenToHost( echoD, ctx );
    
    listenToControls( echoD, ctx, sendToHost );
    
    return {
        echoD,
        events,
        context: ctx,
        view: (
            <Render {...props} Canvas={ Canvas } events={ events } />
            )
        };
    }
    
    export default createClient;