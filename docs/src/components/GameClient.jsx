import React, {
    useMemo,
    useRef,
    useState,
    useEffect,
} from 'react';
import { Canvas } from '@react-three/fiber';
import createClient from '../../../ecmascript/examples/client.jsx';
// import EchoD from '../../../ecmascript/dist/module/lib.echo-d.js';

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
            <b>{name}:</b>
            <div className="json">
                {JSON.stringify(data)}
            </div>
        </div>
    )
}

export function GameClient(props) {
    const {
        echoD,
        events,
        context,
        view,
    } = useMemo(() => createClient({ Canvas, props }), []);
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
                });
                setComponents(componentList);
            }
            setLog((prevLog) => {
                return ([
                    <Log key={`log${keyRef.current++}`} name={name} data={data} />
                ]).concat(prevLog)
            });
        }
        METHODS.forEach((name) => {
            logger.current[name] = appendLog(name);
            events.on(name, logger.current[name]);
        });
        clear.current = ({ code }) => {
            if (code === 'Escape') {
                setLog([]);
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
            <hr />
            <div className="logs" {...props} >
                {log}
            </div>
        </>
    )
}

export default GameClient;