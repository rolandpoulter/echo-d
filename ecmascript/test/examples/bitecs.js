export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const EchoD = extras.bitecs.Handler;
    const echoExample = extras.bitecs.bitECSExample

    const cleanup = (echo) => {
        const store = echo.store;

        store.cleanup(true);

        // if (world !== undefined && world !== null) {
            // console.log('cleanup world:', world);
            // extras.bitecs.api.listAllEntities(world).forEach(entity => {
            //     extras.bitecs.api.listEntityComponents(world, entity).forEach(component => {
            //         extras.bitecs.api.removeComponent(world, component, entity, true);
            //     });
            //     extras.bitecs.api.removeEntity(world, entity);
            // });

            // extras.bitecs.api.resetWorld(world);
            // extras.bitecs.api.deleteWorld(world);

            // extras.bitecs.api.resetGlobals()
            
            // console.log('cleanup world done:', world)
        // }
    }
    
    describe('bitecs example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD', () => {
            const result = echoExample();
            cleanup(result.echo, result.world)
            expect(result.echo).toBeInstanceOf(EchoD);
        });

        // The function retrieves the world from the EchoD context store.
        it('should retrieve the world from the EchoD context store', () => {
            const result = echoExample();
            cleanup(result.echo, result.world)
            expect(result.world).toBeDefined();
        });

        it('should be able to create an entity', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            const entities = echo.store.listEntities();
            cleanup(echo)
            expect(entities).toEqual([['entity1']]);
        });

        it('should be able to remove an entity', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.removeEntity('entity1');
            const entities = echo.store.listEntities();
            cleanup(echo)
            expect(entities).toEqual([]);
        });

        it('should be able to create multiple entities', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.createEntity('entity2');
            const entities = echo.store.listEntities();
            cleanup(echo)
            expect(entities).toEqual([['entity1', 'entity2']]);
        });

        it('should be able to create an actor', () => {
            const { echo } = echoExample();
            echo.createEntity('actor1');
            const entities = echo.store.listEntities();
            cleanup(echo)
            expect(entities).toEqual([['actor1']]);
        });

        it('should be able to remove an actor', () => {
            const { echo } = echoExample();
            echo.createEntity('actor1');
            echo.removeEntity('actor1');
            const actors = echo.store.listActors();
            cleanup(echo)
            expect(actors).toEqual([]);
        });

        it('should be able to create and actor with inputs', () => {
            const { echo } = echoExample({
                enableRollback: true
            });
            echo.createEntity('actor1');
            const now = performance.timeOrigin + performance.now();
            echo.actorInput('actor1', { type: 'jump' }, now);
            const inputs = echo.store.listInputs();
            cleanup(echo)
            expect(inputs).toEqual([{
                actor1: [ [ { type: 'jump' }, now ] ]
            }]);
        });

        it('should be able to create multiple actors', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.spawnActor('actor2');
            const actors = echo.store.listActors();
            cleanup(echo)
            expect(actors).toEqual([['actor1', 'actor2']]);
        });

        it('should be able to create an entity with components', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.upsertComponent('entity1', 'position', new Float32Array([0, 0, 0]));
            
            const entities = echo.store.listEntities();
            const components = echo.store.listComponents();
            cleanup(echo)
            expect(entities).toEqual([['entity1']]);
            expect(components).toEqual([{
                entity1: { position: new Float32Array([0, 0, 0]) }
            }]);
        });

        it('should be able to create an actor with components', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            
            const actors = echo.store.listActors();
            const components = echo.store.listComponents();
            cleanup(echo)
            expect(actors).toEqual([['actor1']]);
            expect(components).toEqual([{
                actor1: { position: new Float32Array([0, 0, 0]) }
            }]);
        })

        it('should be able to create mixed entities and actors with components', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.spawnActor('actor2');
            echo.createEntity('entity1');
            echo.createEntity('entity2');
            echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            echo.upsertComponent('actor2', 'position', new Float32Array([0, 0, 0]));
            echo.upsertComponent('entity1', 'position', new Float32Array([0, 0, 0]));
            echo.upsertComponent('entity2', 'position', new Float32Array([0, 0, 0]));
            
            const actors = echo.store.listActors();
            const entities = echo.store.listEntities();
            const components = echo.store.listComponents();
            cleanup(echo)
            expect(actors).toEqual([['actor1', 'actor2']]);
            expect(entities).toEqual([['entity1', 'entity2']]);
            expect(components).toEqual([{
                actor1: { position: new Float32Array([0, 0, 0]) },
                actor2: { position: new Float32Array([0, 0, 0]) },
                entity1: { position: new Float32Array([0, 0, 0]) },
                entity2: { position: new Float32Array([0, 0, 0]) }
            }]);
        })

        it('should be able to remove a component', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            echo.removeComponent('actor1', 'position');
            
            const components = echo.store.listComponents();
            cleanup(echo)
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
                const actors = view.context.store.listActors();
                const entities = view.context.store.listEntities();
                const components = view.context.store.listComponents();
                const inputs = view.context.store.listInputs();
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
                [{ entity1: { }, entity2: { } }], // TODO: should be empty
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
            
            await basicEchoOtherExchange(echo, other, {
                typed: true,
                // log: true,
            });
        });
    });
}