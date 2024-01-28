export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const EchoD = extras.miniplex.Handler;
    const echoExample = extras.miniplex.miniplexExample
    
    describe('miniplex example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD', () => {
            const result = echoExample();
            expect(result.echo).toBeInstanceOf(EchoD);
        });

        // The function retrieves the world from the EchoD context store.
        it('should retrieve the world from the EchoD context store', () => {
            const result = echoExample();
            expect(result.world).toBeDefined();
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
    });
}