export default function (echo, extras, { describe, it, expect, mock, spy }) {
    const xit = (n) => { console.log('skip:', n) };

    const EchoD = extras.echo.Handler;
    const echoExample = extras.echo.echoExample
    // console.log('extras.echo', extras.echo)

    describe('echo example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD', () => {
            const result = echoExample();
            expect(result.echo).toBeInstanceOf(EchoD);
        });

        // The function retrieves the world from the EchoD context store.
        it('should retrieve the world from the EchoD context store', () => {
            const result = echoExample();
            expect(result.world).toBeUndefined();
        });

        // The options parameter can be passed to the createEchoD function.
        xit('should pass the options parameter to the createEchoD function', () => {
            const options = { option1: 'value1', option2: 'value2' };
            const result = echoExample(options);
            expect(result.echo.options).toEqual(options);
        });

        // The Handler parameter can be passed to the createEchoD function.
        xit('should pass the Handler parameter to the createEchoD function', () => {
            class CustomHandler extends EchoD { }
            const result = echoExample({}, CustomHandler);
            expect(result.echo).toBeInstanceOf(CustomHandler);
        });

        // The actions parameter can be passed to the createEchoD function.
        xit('should pass the actions parameter to the createEchoD function', () => {
            const customActions = { action1: 'action1', action2: 'action2' };
            const result = echoExample({}, EchoD, customActions);
            expect(result.echo.actions).toEqual(customActions);
        });

        it('should be able to create an entity', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            const entities = echo.context.store.getEntities();
            expect(entities).toEqual([['entity1']]);
        });

        it('should be able to remove an entity', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.removeEntity('entity1');
            const entities = echo.context.store.getEntities();
            expect(entities).toEqual([]);
        });

        it('should be able to create multiple entities', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.createEntity('entity2');
            const entities = echo.context.store.getEntities();
            expect(entities).toEqual([['entity1', 'entity2']]);
        });

        it('should be able to create an actor', () => {
            const { echo } = echoExample();
            echo.createEntity('actor1');
            const entities = echo.context.store.getEntities();
            expect(entities).toEqual([['actor1']]);
        });

        it('should be able to remove an actor', () => {
            const { echo } = echoExample();
            echo.createEntity('actor1');
            echo.removeEntity('actor1');
            const actors = echo.context.store.getActors();
            expect(actors).toEqual([]);
        });

        it('should be able to create and actor with inputs', () => {
            const { echo } = echoExample({
                enableRollback: true
            });
            echo.createEntity('actor1');
            const now = performance.timeOrigin + performance.now();
            echo.actorInput('actor1', { type: 'jump' }, now);
            const inputs = echo.context.store.getInputs();
            expect(inputs).toEqual([{
                actor1: [ [ { type: 'jump' }, now ] ]
            }]);
        });

        it('should be able to create multiple actors', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.spawnActor('actor2');
            const actors = echo.context.store.getActors();
            expect(actors).toEqual([['actor1', 'actor2']]);
        });

        it('should be able to create an entity with components', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.upsertComponent('entity1', 'position', [0, 0, 0]);
            
            const entities = echo.context.store.getEntities();
            const components = echo.context.store.getComponents();
            expect(entities).toEqual([['entity1']]);
            expect(components).toEqual([{
                entity1: { position: [0, 0, 0] }
            }]);
        });

        it('should be able to create an actor with components', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.upsertComponent('actor1', 'position', [0, 0, 0]);
            
            const actors = echo.context.store.getActors();
            const components = echo.context.store.getComponents();
            expect(actors).toEqual([['actor1']]);
            expect(components).toEqual([{
                actor1: { position: [0, 0, 0] }
            }]);
        })

        it('should be able to create mixed entities and actors with components', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.spawnActor('actor2');
            echo.createEntity('entity1');
            echo.createEntity('entity2');
            echo.upsertComponent('actor1', 'position', [0, 0, 0]);
            echo.upsertComponent('actor2', 'position', [0, 0, 0]);
            echo.upsertComponent('entity1', 'position', [0, 0, 0]);
            echo.upsertComponent('entity2', 'position', [0, 0, 0]);
            
            const actors = echo.context.store.getActors();
            const entities = echo.context.store.getEntities();
            const components = echo.context.store.getComponents();
            expect(actors).toEqual([['actor1', 'actor2']]);
            expect(entities).toEqual([['entity1', 'entity2']]);
            expect(components).toEqual([{
                actor1: { position: [0, 0, 0] },
                actor2: { position: [0, 0, 0] },
                entity1: { position: [0, 0, 0] },
                entity2: { position: [0, 0, 0] }
            }]);
        })

        it('should be able to remove a component', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.upsertComponent('actor1', 'position', [0, 0, 0]);
            echo.removeComponent('actor1', 'position');
            
            const components = echo.context.store.getComponents();
            expect(components).toEqual([{
                actor1: {}
            }]);
        });

        const basicEchoOtherExchange = async (echo, other, { typed, rollback, changes, log } = {}) => {
            echo.spawnActor('actor1');

            const updateComponent = changes ? 'changeComponent' : 'upsertComponent';
            
            echo[updateComponent]('actor1', 'collider', 'box');
            echo[updateComponent]('actor1', 'hidden', false);
            echo[updateComponent]('actor1', 'position', typed ? new Float32Array([0, 0, 0]) : [0, 0, 0]);
            echo[updateComponent]('actor1', 'color', typed ? new Uint8Array([255, 0, 0, 255]) : [255, 0, 0, 255]);
            
            echo[updateComponent]('actor1', 'collider', 'box');
            echo[updateComponent]('actor1', 'hidden', true);
            echo[updateComponent](`actor1`, 'position', typed ? new Float32Array([1, 0, 0]) : [1, 0, 0]);
            echo[updateComponent]('actor1', 'color', typed ? new Uint8Array([0, 255, 0, 255]) : [0, 255, 0, 255]);
            
            const responder = (payload) => {
                if (log) {
                    console.log('payload', payload)
                }
                other.many(payload);
            }

            if (log) {
                console.log('updater')
            }
            let batch = await echo.updater({
                responder
            });
            if (log) {
                console.log('batch', batch)
            }
            
            const expectUpdatedView = (view, a, e, c, i) => {
                const actors = view.context.store.getActors();
                const entities = view.context.store.getEntities();
                const components = view.context.store.getComponents();
                const inputs = view.context.store.getInputs();
                expect(actors).toEqual(a);
                expect(entities).toEqual(e);
                expect(components).toEqual(c);
                expect(inputs).toEqual(i);
            }
            
            const expectUpdated = (a, e, c, i) => {
                expectUpdatedView(echo, a, e, c, i);
                expectUpdatedView(other, a, e, c, i);
            }

            expectUpdated(
                [['actor1']],
                [],
                [{ actor1: {
                    collider: 'box',
                    hidden: true,
                    position: typed ? new Float32Array([1, 0, 0]) : [1, 0, 0],
                    color: typed ? new Uint8Array([0, 255, 0, 255]) : [0, 255, 0, 255]
                } }],
                []
            )

            echo[updateComponent]('actor1', 'collider', 'box');
            echo[updateComponent]('actor1', 'hidden', false);
            echo[updateComponent]('actor1', 'position', typed ? new Float32Array([0, 0, 0]) : [0, 0, 0]);
            echo[updateComponent]('actor1', 'color', typed ? new Uint8Array([255, 0, 0, 255]) : [255, 0, 0, 255]);

            const tick = rollback ? performance.timeOrigin + performance.now() : 0;
            echo.actorInput('actor1', { type: 'jump' }, tick);
            
            if (log) {
                console.log('updater')
            }
            batch = null
            batch = await echo.updater({
                responder
            });
            if (log) {
                console.log('batch', batch)
            }

            expectUpdated(
                [['actor1']],
                [],
                [{ actor1: {
                    collider: 'box',
                    hidden: false,
                    position: typed ? new Float32Array([0, 0, 0]) : [0, 0, 0],
                    color: typed ? new Uint8Array([255, 0, 0, 255]) : [255, 0, 0, 255]
                } }],
                [{
                    actor1: [
                        rollback ? [ { type: 'jump' }, tick ] : { type: 'jump' }
                    ]
                }]
            )

            echo.removeComponent('actor1', 'collider');
            echo.removeComponent('actor1', 'hidden');
            echo.removeComponent('actor1', 'position');
            echo.removeComponent('actor1', 'color');
            echo.removeActor('actor1')

            echo.createEntity('entity1');
            echo.createEntity('entity2');
            
            if (log) {
                console.log('updater')
            }
            batch = null
            batch = await echo.updater({
                responder
            });
            if (log) {
                console.log('batch', batch)
            }

            expectUpdated(
                [],
                [['entity1', 'entity2']],
                [{ actor1: { } }], // TODO: should be empty
                [{ // TODO: should be empty
                    actor1: [
                        rollback ? [ { type: 'jump' }, tick ] : { type: 'jump' }
                    ]
                }],
            )
        }

        it('should be able to broadcast updates', async () => {
            const { echo } = echoExample();
            const { echo: other } = echoExample()
            
            await basicEchoOtherExchange(echo, other);
        });

        it('should be able to broadcast updates with enableRollback', async () => {
            const options = {
                enableRollback: true
            }

            const { echo } = echoExample(options);
            const { echo: other } = echoExample(options)
            
            await basicEchoOtherExchange(echo, other, {
                rollback: true,
                // log: true,
            });
        });

        it('should be able to broadcast updates with compressStringsAsInts', async () => {
            const options = {
                compressStringsAsInts: true
            }
            
            const { echo } = echoExample({
                ...options,
                isSymbolLeader: true,
            });
            
            const { echo: other } = echoExample(options)
            
            await basicEchoOtherExchange(echo, other);
        });

        it('should be able to broadcast updates with isGroupedComponents', async () => {
            const options = {
                isGroupedComponents: true
            }
            
            const { echo } = echoExample({
                ...options,
                isSymbolLeader: true,
            });

            const { echo: other } = echoExample(options)
            
            await basicEchoOtherExchange(echo, other, {
                typed: true,
                // log: true,
            });
        });

        it('should be able to broadcast updates with isOrdered', async () => {
            const options = {
                isOrdered: true
            }
            
            const { echo } = echoExample(options);
            const { echo: other } = echoExample(options)
            
            await basicEchoOtherExchange(echo, other);
        });

        it('should be able to broadcast updates with isDiffed', async () => {
            const options = {
                isDiffed: true
            }
            
            const { echo } = echoExample(options);
            const { echo: other } = echoExample(options)
            
            await basicEchoOtherExchange(echo, other, {
                // changes: true, // TODO: fix this
                // log: true,
            });
        });

        it('should be able to broadcast updates with all options enabled', async () => {
            const options = {
                // isDiffed: true, // TODO: fix this
                isOrdered: true,
                enableRollback: true,
                compressStringsAsInts: true,
                // isGroupedComponents: true, // TODO: fix this
            }
            
            const { echo } = echoExample({
                ...options,
                isSymbolLeader: true,
            });

            const { echo: other } = echoExample(options)
            
            await basicEchoOtherExchange(echo, other, {
                // changes: true,
                rollback: true,
                typed: true,
                // log: true,
            });
        });
    });
}