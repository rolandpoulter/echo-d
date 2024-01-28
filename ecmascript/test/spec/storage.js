export default function storageSpec(echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('Storage', () => {
        const { Storage } = echo;

        // can create a new instance of Storage class with default values
        it('should create a new instance of Storage class with default values', () => {
            const storage = new Storage();
            expect(storage.actors).toEqual([]);
            expect(storage.entities).toEqual([]);
            expect(storage.components).toEqual({});
            expect(storage.inputs).toEqual({});
            expect(storage.indexes).toEqual({});
        });

        // can set actors, entities, components, and inputs to Storage instance
        it('should set actors, entities, components, and inputs to Storage instance', () => {
            const actors = ['actor1', 'actor2', 'actor3'];
            const entities = ['entity1', 'entity2', 'entity3'];
            const components = {
                actor1: {
                    component1: 'value1',
                    component2: 'value2'
                },
                actor2: {
                    component1: 'value3',
                    component2: 'value4'
                },
                actor3: {
                    component1: 'value5',
                    component2: 'value6'
                }
            };
            const inputs = {
                input1: [{ id: 'actor1', value: 'inputValue1' }],
                input2: [{ id: 'actor2', value: 'inputValue2' }],
                input3: [{ id: 'actor3', value: 'inputValue3' }]
            };

            const storage = new Storage({
                actors,
                entities,
                components,
                inputs
            });

            expect(storage.actors).toEqual(actors);
            expect(storage.entities).toEqual(entities);
            expect(storage.components).toEqual(components);
            expect(storage.inputs).toEqual(inputs);
        });

        // can fetch components from Storage instance
        it('should fetch components from Storage instance', () => {
            const components = {
                actor1: {
                    component1: 'value1',
                    component2: 'value2'
                },
                actor2: {
                    component1: 'value3',
                    component2: 'value4'
                },
                actor3: {
                    component1: 'value5',
                    component2: 'value6'
                }
            };

            const storage = new Storage({
                components
            });

            expect(storage.findComponent('actor1', 'component1')).toEqual('value1');
            expect(storage.findComponent('actor2', 'component2')).toEqual('value4');
            expect(storage.findComponent('actor3', 'component1')).toEqual('value5');
        });

        // gets the actors
        it('should get the actors', () => {
            const storage = new Storage();
            expect(storage.actors).toEqual([]);
            storage.setActors(['actor1', 'actor2']);
            expect(storage.actors).toEqual(['actor1', 'actor2']);
        });

        // can handle empty inputs when storing to Storage instance
        it('should handle empty inputs when storing to Storage instance', () => {
            const storage = new Storage();

            storage.storeInput('input1', {});
            expect(storage.inputs).toEqual({ input1: [{}] });

            storage.storeInput('input2', {}, 0);
            expect(storage.inputs).toEqual({ input1: [{}], input2: [{}] });
        });

        // can handle empty queries when fetching from Storage instance
        xit('should handle empty queries when fetching from Storage instance', () => {
            const storage = new Storage();

            expect(storage.getComponents()).toEqual([{}]);
            expect(storage.getActors()).toEqual([[]]);
            expect(storage.getEntities()).toEqual([[]]);
            expect(storage.getInputs()).toEqual([{}]);
        });
    });

}