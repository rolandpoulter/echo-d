export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const EchoD = extras.becsy.Handler;
    const echoExample = extras.becsy.becsyExample

    const cleanup = (echo) => {
        const store = echo.context.store
        store.cleanup()
    }
    
    describe('bescy example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD', async () => {
            const result = echoExample({});
            await cleanup(result.echo)
            expect(result.echo).toBeInstanceOf(EchoD);
        });

        // The function retrieves the world from the EchoD context store.
        it('should retrieve the world from the EchoD context store', async () => {
            const result = echoExample({});
            await cleanup(result.echo)
            expect(result.world).toBeDefined();
        });

        it('should be able to create an entity', async () => {
            const { echo } = echoExample({});
            await echo.createEntity('entity1');
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([['entity1']]);
        });

        it('should be able to remove an entity', async () => {
            const { echo } = echoExample({});
            await echo.createEntity('entity1');
            await echo.removeEntity('entity1');
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([]);
        });

        it('should be able to create multiple entities', async () => {
            const { echo } = echoExample({});
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
            const { echo } = echoExample({});
            await echo.createEntity('actor1');
            const entities = echo.context.store.getEntities();
            await cleanup(echo)
            expect(entities).toEqual([['actor1']]);
        });

        it('should be able to remove an actor', async () => {
            const { echo } = echoExample({});
            await echo.createEntity('actor1');
            await echo.removeEntity('actor1');
            const actors = echo.context.store.getActors();
            await cleanup(echo)
            expect(actors).toEqual([]);
        });

        it('should be able to create and actor with inputs', async () => {
            const { echo } = echoExample({
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
            const { echo } = echoExample({});
            await echo.spawnActor('actor1');
            await echo.spawnActor('actor2');
            const actors = echo.context.store.getActors();
            await cleanup(echo)
            expect(actors).toEqual([['actor1', 'actor2']]);
        });

        it('should be able to create an entity with components', async () => {
            const { echo } = echoExample({});
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
            const { echo } = echoExample({});
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
            const { echo } = echoExample({});
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
            const { echo } = echoExample({});
            await echo.spawnActor('actor1');
            await echo.upsertComponent('actor1', 'position', new Float32Array([0, 0, 0]));
            await echo.removeComponent('actor1', 'position');
            
            const components = echo.context.store.getComponents();
            await cleanup(echo)
            expect(components).toEqual([{
                actor1: {}
            }]);
        });
    });
}