import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import createClient from '../../../ecmascript/examples/client.jsx';
// import EchoD from '../../../ecmascript/dist/module/lib.echo-d.js';

export function GameClient(props) {
    const {
        // echoD,
        // events,
        // context,
        view,
    } = useMemo(() => createClient({ Canvas, props }), [props]);
    return (
        view
    );
}

export default GameClient;