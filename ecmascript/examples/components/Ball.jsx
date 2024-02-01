import React, { forwardRef } from 'react';

export const Ball = forwardRef( function Ball ( props, ref ) {
    const {
        children,
        position = [ 0, 0, 0 ],
        size = [ 0.5 ],
        color = 0xff4444
    } = props;
    return (
        <mesh
            ref={ ref }
            position={ position }
        >
            <sphereGeometry args={ size } />
            <meshStandardMaterial color={ color } />
            { children }
        </mesh>
    );
} );