import React from 'react';
// import { Canvas } from '@react-three/fiber';
import { EchoD } from './EchoD.js';

export function Render ( props ) {
    const {
        Canvas,
        children,
        events
    } = props;
    const views = EchoD({ events });
    return (
        <Canvas>
            <ambientLight intensity={ Math.PI / 2 } />
            <spotLight
                position={ [ 10, 10, 10 ] }
                angle={ 0.15 }
                penumbra={ 1 }
                decay={ 0 }
                intensity={ Math.PI }
            />
            <pointLight
                position={ [ -10, -10, -10 ] }
                decay={ 0 }
                intensity={ Math.PI }
            />
            {views}
            {children}
        </Canvas>
    )
}