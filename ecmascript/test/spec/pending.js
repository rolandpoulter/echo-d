export default function pendingSpec(echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('Pending', () => {
        const { Pending } = echo;

        // Constructs a new Pending object and resets its state.
        it('should construct a new Pending object and reset its state', () => {
            const pending = new Pending();
            expect(pending.created).toEqual({
                actors: {},
                components: {},
                entities: [],
                inputs: {}
            });
            expect(pending.removed).toEqual({
                actors: {},
                components: {},
                entities: []
            });
            expect(pending.updated).toEqual({
                components: {}
            });
            expect(pending.symbols).toEqual([]);
        });

        // Adds an actor input to the created inputs state.
        it('should add an actor input to the created inputs state', () => {
            const pending = new Pending();
            pending.actorInput('actor1', 0);
            expect(pending.created.inputs).toEqual({
                actor1: [0]
            });
        });

        // Changes a component in the specified pending state.
        it('should change a component in the specified pending state', () => {
            const pending = new Pending();
            pending.changeComponent('created', 'entity1', 'component1');
            expect(pending.created.components).toEqual({
                entity1: {
                    component1: true
                }
            });
        });

        // Adds an actor input to the created inputs state with a tick value.
        it('should add an actor input to the created inputs state with a tick value', () => {
            const pending = new Pending();
            pending.actorInput('actor1', 0);
            expect(pending.created.inputs).toEqual({
                actor1: [0]
            });
        });

        // Changes a component in the specified pending state with a non-existent entity ID.
        xit('should change a component in the specified pending state with a non-existent entity ID', () => {
            const pending = new Pending();
            pending.changeComponent('created', 'nonexistent', 'component1');
            expect(pending.created.components).toEqual({});
        });

        // Marks an entity as created in the created state with a non-string ID.
        it('should mark an entity as created in the created state with a non-string ID', () => {
            const pending = new Pending();
            pending.createEntity(123);
            expect(pending.created.entities).toEqual([123]);
        });

        // Marks an entity as created in the created state.
        it('should mark an entity as created in the created state', () => {
            const pending = new Pending();
            pending.createEntity('entity1');
            expect(pending.created.entities).toContain('entity1');
        });

        // Marks an actor as spawned in the created state.
        it('should mark an actor as spawned in the created state', () => {
            const pending = new Pending();
            pending.spawnActor('actor1');
            expect(pending.created.actors['actor1']).toBe(true);
        });

        // Adds an actor input to the created inputs state.
        it('should add an actor input to the created inputs state', () => {
            const pending = new Pending();
            pending.actorInput('actor1', 0);
            expect(pending.created.inputs['actor1']).toContain(0);
        });

        // Marks an entity as removed in the removed state.
        it('should mark an entity as removed in the removed state', () => {
            const pending = new Pending();
            pending.removeEntity('entity1');
            expect(pending.removed.entities).toContain('entity1');
        });

        // Marks an actor as removed in the removed state.
        it('should mark an actor as removed in the removed state', () => {
            const pending = new Pending();
            pending.removeActor('actor1');
            expect(pending.removed.actors['actor1']).toBe(true);
        });
    });
}