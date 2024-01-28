export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const EchoD = extras.bitecs.Handler;
    const echoExample = extras.bitecs.bitECSExample

    const cleanup = (echo) => {
        const store = echo.context.store;

        store.cleanup(true);

        // if (world !== undefined && world !== null) {
            // console.log('cleanup world:', world);
            // extras.bitecs.api.getAllEntities(world).forEach(entity => {
            //     extras.bitecs.api.getEntityComponents(world, entity).forEach(component => {
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
            const entities = echo.context.store.getEntities();
            cleanup(echo)
            expect(entities).toEqual([['entity1']]);
        });

        it('should be able to remove an entity', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.removeEntity('entity1');
            const entities = echo.context.store.getEntities();
            cleanup(echo)
            expect(entities).toEqual([]);
        });

        it('should be able to create multiple entities', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.createEntity('entity2');
            const entities = echo.context.store.getEntities();
            cleanup(echo)
            expect(entities).toEqual([['entity1', 'entity2']]);
        });

        it('should be able to create an actor', () => {
            const { echo } = echoExample();
            echo.createEntity('actor1');
            const entities = echo.context.store.getEntities();
            cleanup(echo)
            expect(entities).toEqual([['actor1']]);
        });

        it('should be able to remove an actor', () => {
            const { echo } = echoExample();
            echo.createEntity('actor1');
            echo.removeEntity('actor1');
            const actors = echo.context.store.getActors();
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
            const inputs = echo.context.store.getInputs();
            cleanup(echo)
            expect(inputs).toEqual([{
                actor1: [ [ { type: 'jump' }, now ] ]
            }]);
        });

        it('should be able to create multiple actors', () => {
            const { echo } = echoExample();
            echo.spawnActor('actor1');
            echo.spawnActor('actor2');
            const actors = echo.context.store.getActors();
            cleanup(echo)
            expect(actors).toEqual([['actor1', 'actor2']]);
        });

        it('should be able to create an entity with components', () => {
            const { echo } = echoExample();
            echo.createEntity('entity1');
            echo.upsertComponent('entity1', 'position', new Float32Array([0, 0, 0]));
            
            const entities = echo.context.store.getEntities();
            const components = echo.context.store.getComponents();
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
            
            const actors = echo.context.store.getActors();
            const components = echo.context.store.getComponents();
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
            
            const actors = echo.context.store.getActors();
            const entities = echo.context.store.getEntities();
            const components = echo.context.store.getComponents();
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
            
            const components = echo.context.store.getComponents();
            cleanup(echo)
            expect(components).toEqual([{
                actor1: {}
            }]);
        });
    });
}