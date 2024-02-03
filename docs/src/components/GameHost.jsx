import React, { useMemo, useEffect, useState, useRef } from 'react'
import createHost from '../../../ecmascript/examples/host.js'
// import EchoD from '../../../ecmascript/dist/module/lib.echo-d.js'

const METHODS = [
    'actorInput', 'spawnActor', 'removeActor', 'actors', 'mergeActors',
    'createEntity', 'removeEntity', 'entities', 'mergeEntities',
    'changeComponent', 'removeComponent', 'upsertComponent', 'components', 'mergeComponents',
    'symbols', 'mergeSymbols',
];

export function Log(props) {
    const { name, data } = props;
    return (
        <div className="log">
            <b>{name}:</b> {JSON.stringify(data)}
        </div>
    )
}

export function GameHost(props) {
    // debugger;
    // console.log('GAME HOST', props)
    const {
        echoD,
        events,
        context,
    } = useMemo(() => createHost(), []);
    // console.log('GOT HERE 321', events, context)
    const [actors, setActors] = useState(0);
    const [components, setComponents] = useState(null);
    const [log, setLog] = useState([]);
    const logger = useRef({})
    const clear = useRef();
    const keyRef = useRef(0);
    useEffect(() => {
        const appendLog = (name) => (...data) => {
            const actors = echoD.store.getActors();
            if (actors[0]) {
                setActors(actors[0].length);
            }
            const components = echoD.store.getComponents();
            // console.log(components);
            if (components[0]) {
                const componentList = [];
                Object.keys(components[0]).forEach((key) => {
                    componentList.push(
                        <div key={key} className="component">
                            <b>{key}</b>:
                            <div className="json">
                                {JSON.stringify(components[0][key])}
                            </div>
                        </div>
                    );
                    // console.log(key, components[key]);
                });
                setComponents(componentList);
            }
            setLog((prevLog) => {
                // console.log('APPEND LOG', name, data)
                // debugger;
                return ([
                    <Log key={`log${keyRef.current++}`} name={name} data={data} />
                ]).concat(prevLog)
            });
        }
        METHODS.forEach((name) => {
            logger.current[name] = appendLog(name);
            // console.log('adding listener', name);
            events.on(name, logger.current[name]);
        });
        clear.current = ({ code }) => {
            if (code === 'Escape') {
                setLog([]);
                // setComponents(null);
            }
        };
        window.document.addEventListener('keydown', clear.current)
        return () => {
            METHODS.forEach((name) => {
                events.off(name, logger.current[name]);
            });
            window.document.removeEventListener('keydown', clear.current);
        }
    }, [ events, setLog ]);
    return (
        <>
            <div className="actors">
                Actors: #{actors}
            </div>
            <div className="components">
                {components}
            </div>
            <hr/>
            <div className="logs" {...props} >
                {log}
            </div>
        </>
    )
}

export default GameHost
