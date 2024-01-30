export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const EchoD = extras.becsy.Handler;
    const echoExample = extras.echo.echoExample
    const becsyExample = extras.becsy.becsyExample

    const cleanup = (echo) => {
        const store = echo.context.store
        if (store.cleanup) {
            store.cleanup()
        }
    }
    
    describe('bescy example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD', async () => {
            const result = becsyExample({});
            await cleanup(result.echo)
            expect(result.echo).toBeInstanceOf(EchoD);
        });

        // The function retrieves the world from the EchoD context store.
        it('should retrieve the world from the EchoD context store', async () => {
            const result = becsyExample({});
            await cleanup(result.echo)
            expect(result.world).toBeDefined();
        });

        it('should be able to create an entity', async () => {
            const { echo } = becsyExample({});
            await echo.createEntity('entity1');
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([['entity1']]);
        });

        it('should be able to remove an entity', async () => {
            const { echo } = becsyExample({});
            await echo.createEntity('entity1');
            await echo.removeEntity('entity1');
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([]);
        });

        it('should be able to create multiple entities', async () => {
            const { echo } = becsyExample({});
            await echo.createEntity('entity1');
            await echo.createEntity('entity2');
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 100)
            })
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([['entity1', 'entity2']]);
        });

        it('should be able to create an actor', async () => {
            const { echo } = becsyExample({});
            await echo.createEntity('actor1');
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([['actor1']]);
        });

        it('should be able to remove an actor', async () => {
            const { echo } = becsyExample({});
            await echo.createEntity('actor1');
            await echo.removeEntity('actor1');
            const actors = echo.context.store.getActors();
            await cleanup(echo)
            expect(actors).toEqual([]);
        });

        it('should be able to create and actor with inputs', async () => {
            const { echo } = becsyExample({
                isAsyncStorage: true,
                enableRollback: true
            });
            await echo.createEntity('actor1');
            const now = performance.timeOrigin + performance.now();
            await echo.actorInput('actor1', { type: 'jump' }, now);
            const inputs = echo.context.store.getInputs();
            await cleanup(echo)
            expect(inputs).toEqual([{
                actor1: [ [ { type: 'jump' }, now ] ]
            }]);
        });

        it('should be able to create multiple actors', async () => {
            const { echo } = becsyExample({});
            await echo.spawnActor('actor1');
            await echo.spawnActor('actor2');
            const actors = echo.context.store.getActors();
            await cleanup(echo)
            expect(actors).toEqual([['actor1', 'actor2']]);
        });

        it('should be able to create an entity with components', async () => {
            const { echo } = becsyExample({});
            await echo.createEntity('entity1');
            await echo.upsertComponent('entity1', 'position', new Float32Array([0, 0, 0]));
            
            const entities = echo.context.store.getEntities();
            const components = echo.context.store.getComponents();
            await cleanup(echo)
            expect(entities).toEqual([['entity1']]);
            expect(components).toEqual([{
                entity1: { position: new Float32Array([0, 0, 0]) }
            }]);
        });

        it('should be able to create an actor with components', async () => {
            const { echo } = becsyExample({});
            await echo.spawnActor('actor1');
            await echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            
            const actors = echo.context.store.getActors();
            const components = echo.context.store.getComponents();
            await cleanup(echo)
            expect(actors).toEqual([['actor1']]);
            expect(components).toEqual([{
                actor1: { position: new Float32Array([0, 0, 0]) }
            }]);
        })

        it('should be able to create mixed entities and actors with components', async () => {
            const { echo } = becsyExample({});
            await echo.spawnActor('actor1');
            await echo.spawnActor('actor2');
            await echo.createEntity('entity1');
            await echo.createEntity('entity2');
            await echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            await echo.upsertComponent('actor2', 'position', new Float32Array([0, 0, 0]));
            await echo.upsertComponent('entity1', 'position', new Float32Array([0, 0, 0]));
            await echo.upsertComponent('entity2', 'position', new Float32Array([0, 0, 0]));
            
            const actors = echo.context.store.getActors();
            const entities = echo.context.store.getEntities();
            const components = echo.context.store.getComponents();
            await cleanup(echo)
            expect(actors).toEqual([['actor1', 'actor2']]);
            expect(entities).toEqual([['entity1', 'entity2']]);
            expect(components).toEqual([{
                actor1: { position: new Float32Array([0, 0, 0]) },
                actor2: { position: new Float32Array([0, 0, 0]) },
                entity1: { position: new Float32Array([0, 0, 0]) },
                entity2: { position: new Float32Array([0, 0, 0]) }
            }]);
        })

        it('should be able to remove a component', async () => {
            const { echo } = becsyExample({});
            await echo.spawnActor('actor1');
            await echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            await echo.removeComponent('actor1', 'position');
            
            const components = echo.context.store.getComponents();
            await cleanup(echo)
            expect(components).toEqual([{
                actor1: {}
            }]);
        });

        const basicEchoOtherExchange = async (echo, other, { typed, rollback, changes, log } = {}) => {
            await echo.spawnActor('actor1');

            const updateComponent = changes ? 'changeComponent' : 'upsertComponent';
            
            await echo[updateComponent]('actor1', 'collider', 'box');
            await echo[updateComponent]('actor1', 'hidden', false);
            await echo[updateComponent]('actor1', 'position', typed ? new Float32Array([0, 0, 0]) : [0, 0, 0]);
            await echo[updateComponent]('actor1', 'color', typed ? new Uint8Array([255, 0, 0, 255]) : [255, 0, 0, 255]);
            
            await echo[updateComponent]('actor1', 'collider', 'box');
            await echo[updateComponent]('actor1', 'hidden', true);
            await echo[updateComponent](`actor1`, 'position', typed ? new Float32Array([1, 0, 0]) : [1, 0, 0]);
            await echo[updateComponent]('actor1', 'color', typed ? new Uint8Array([0, 255, 0, 255]) : [0, 255, 0, 255]);
            
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
                if (a !== null) {
                    expect(actors).toEqual(a);
                }
                if (e !== null) {
                    expect(entities).toEqual(e);
                }
                if (c !== null) {
                    expect(components).toEqual(c);
                }
                if (i !== null) {
                    expect(inputs).toEqual(i);
                }
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

            await echo[updateComponent]('actor1', 'collider', 'box');
            await echo[updateComponent]('actor1', 'hidden', false);
            await echo[updateComponent]('actor1', 'position', typed ? new Float32Array([0, 0, 0]) : [0, 0, 0]);
            await echo[updateComponent]('actor1', 'color', typed ? new Uint8Array([255, 0, 0, 255]) : [255, 0, 0, 255]);

            const tick = rollback ? performance.timeOrigin + performance.now() : 0;
            await echo.actorInput('actor1', { type: 'jump' }, tick);
            
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

            await echo.removeComponent('actor1', 'collider');
            await echo.removeComponent('actor1', 'hidden');
            await echo.removeComponent('actor1', 'position');
            await echo.removeComponent('actor1', 'color');
            await echo.removeActor('actor1')

            await echo.createEntity('entity1');
            await echo.createEntity('entity2');
            
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
                null, // [{ entity1: { }, entity2: { } }], // TODO: should be empty
                [{ // TODO: should be empty
                    actor1: [
                        rollback ? [ { type: 'jump' }, tick ] : { type: 'jump' }
                    ]
                }],
            )

            await cleanup(echo)
            await cleanup(other)
        }

        it('should be able to recieve updates', async () => {
            const { echo } = echoExample();
            const { echo: other } = becsyExample()
            
            await basicEchoOtherExchange(echo, other, {
                typed: true,
                // log: true,
            });
        });

        it('should be able to broadcast updates', async () => {
            const { echo } = becsyExample();
            const { echo: other } = echoExample()
            
            await basicEchoOtherExchange(echo, other, {
                typed: true,
                // log: true,
            });
        });
    });
}