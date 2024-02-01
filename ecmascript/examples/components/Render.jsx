import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EchoD } from '.../client/client/EchoD.jsxx';

export function Render ( props ) {
    const {
        children,
        events
    } = props;
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
            <EchoD events={ events } />
            {children}
        </Canvas>
    )
}