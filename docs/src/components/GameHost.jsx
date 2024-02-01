import React, { useMemo } from 'react'
import createHost from '../../../ecmascript/examples/host.js'
// import EchoD from '../../../ecmascript/dist/module/lib.echo-d.js'

export function GameHost(props) {
    const {
        events,
        context,
    } = useMemo(createHost, []);
    return (
        <div {...props} >
            host ok!
        </div>
    )
}

export default GameHost
