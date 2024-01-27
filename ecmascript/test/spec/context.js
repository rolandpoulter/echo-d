export default function contextSpec(echo, { describe, it, expect, mock, spy }) {
    const xit = (n) => { console.log('skip:', n) };

    describe('Context', () => {
        const { Context, Options, Storage } = echo;

        const noPending = {
            created: { actors: {}, components: {}, entities: [], inputs: {} },
            removed: { actors: {}, components: {}, entities: [] },
            updated: { components: {} },
            symbols: [],
            isDiffed: false
        };

        // The 'ensure' static method returns an instance of 'Context' if the provided context is already an instance of 'Context'.
        it('should return the same instance of Context if the provided context is already an instance of Context', () => {
            // Arrange
            const existingContext = new Context();

            // Act
            const result = Context.ensure(existingContext, {});

            // Assert
            expect(result).toBe(existingContext);
        });

        // The 'ensure' static method handles cases where the context is not an instance of 'Context'.
        it('should create a new instance of Context if the provided context is not an instance of Context', () => {
            // Arrange
            const contextProps = {};

            // Act
            const result = Context.ensure(contextProps, {});

            // Assert
            expect(result).toBeInstanceOf(Context);
        });

        // The 'getActors' method returns the actors from the store based on the provided query and pageSize.
        xit('should return the actors from the store based on the provided query and pageSize', () => {
            // Arrange
            const context = new Context();
            context.store.getActors = mock().mockReturnValue('actors');

            // Act
            const result = context.getActors('query', 10);

            // Assert
            expect(result).toBe('actors');
            expect(context.store.getActors).toHaveBeenCalledWith('query', 10);
        });

        // The constructor handles cases where the context and options are not provided.
        xit('should handle cases where the context and options are not provided', () => {
            // Arrange
            const context = new Context();

            // Assert
            expect(context.events).toBeNull();
            expect(context.store).toBeInstanceOf(Storage);
            expect(context.order).toBeNull();
            expect(context.changes).toBeNull();
            expect(context.pending).toBeInstanceOf(Pending);
            expect(context.symbols).toBeNull();
        });

        // can create a new instance of Context class with default options
        it('should create a new instance of Context class with default options', () => {
            const context = new Context({}, new Options({}), Storage);
            const store = context.store;
            expect(context).toBeInstanceOf(Context);
            expect(context.events).toBeNull();
            expect(store).toBeInstanceOf(Storage);
            // expect(context.ordered).toBeNull();
            // expect(context.changes).toBeNull();
            expect(context.pending).toEqual(noPending);
        });

        // The constructor initializes the 'events', 'store', 'order', 'changes', 'pending', and 'symbols' properties based on the provided context and options.
        xit('should initialize properties based on provided context and options', () => {
            // Arrange
            const context = new Context({
                events: 'events',
                store: 'store',
                order: 'order',
                changes: 'changes',
                pending: 'pending',
                symbols: 'symbols'
            }, {
                isOrdered: true,
                isDiffed: true,
                isReadOnly: false,
                compressStringsAsInts: true,
                enableQuerying: true,
                enumDefaultSymbols: {},
                indexes: []
            });

            // Assert
            expect(context.events).toBe('events');
            expect(context.store).toBe('store');
            expect(context.order).toBe('order');
            expect(context.changes).toBe('changes');
            expect(context.pending).toBe('pending');
            expect(context.symbols).toBe('symbols');
        });

        // The 'getActors' method handles cases where the query and pageSize are not provided.
        xit('should return all actors from the store when query and pageSize are not provided', () => {
            // Arrange
            const context = new Context();
            context.store.getActors = mock().mockReturnValue('actors');

            // Act
            const result = context.getActors(null, Infinity);

            // Assert
            expect(result).toBe('actors');
            expect(context.store.getActors).toHaveBeenCalledWith(null, Infinity);
        });

        // can spawn a new actor and store it in the store
        it('should spawn a new actor and store it in the store', () => {
            const context = new Context();
            const id = 'actor1';
            const options = new Options({ skipPending: false });
            context.spawnActor(id, options);
            expect(context.store.actors).toContain(id);
        });

        // can remove an existing actor from the store
        it('should remove an existing actor from the store', () => {
            const context = new Context();
            const id = 'actor1';
            const options = new Options({ skipPending: false });
            context.spawnActor(id, options);
            context.removeActor(id, options);
            expect(context.store.actors).not.toContain(id);
        });

        // can handle empty options when creating a new instance of Context class
        it('should handle empty options when creating a new instance of Context class', () => {
            const context = new Context({});
            expect(context).toBeInstanceOf(Context);
            expect(context.events).toBeNull();
            expect(context.store).toBeInstanceOf(Storage);
            // expect(context.ordered).toBeNull();
            expect(context.changes).toBeNull();
            expect(context.pending).toEqual(noPending);
        });

        // can handle null or undefined events, store, ordered, or changes when creating a new instance of Context class
        it('should handle null or undefined events, store, ordered, or changes when creating a new instance of Context class', () => {
            const context = new Context({ events: null, store: null, ordered: null, changes: null });
            expect(context).toBeInstanceOf(Context);
            expect(context.events).toBeNull();
            expect(context.store).toBeInstanceOf(Storage);
            // expect(context.ordered).toBeNull();
            expect(context.changes).toBeNull();
            expect(context.pending).toEqual(noPending);
        });

        // can handle empty options when spawning a new actor
        it('should handle empty options when spawning a new actor', () => {
            const context = new Context();
            const id = 'actor1';
            const options = new Options({});
            context.spawnActor(id, options);
            expect(context.store.actors).toContain(id);
        });

        // can create a new entity and store it in the store
        it('should create a new entity and store it in the store', () => {
            const emit = mock();
            const context = new Context({ events: { emit } });
            const entityId = 'entity1';
            const options = new Options({ skipPending: false, onUpdate: mock() });

            context.createEntity(entityId, options);

            expect(context.store.entities).toContain(entityId);
            expect(context.pending.created.entities).toContain(entityId);
            expect(emit).toHaveBeenCalledWith('createEntity', entityId);
            expect(options.onUpdate).toHaveBeenCalled();
        });

        // can remove an existing entity from the store
        it('should remove an existing entity from the store', () => {
            const emit = mock();
            const context = new Context({ events: { emit } });
            const entityId = 'entity1';
            const options = new Options({ skipPending: false, onUpdate: mock() });
            context.createEntity(entityId, options);

            context.removeEntity(entityId, options);

            expect(context.store.entities).not.toContain(entityId);
            expect(context.pending.removed.entities).toContain(entityId);
            expect(emit).toHaveBeenCalledWith('removeEntity', entityId);
            expect(options.onUpdate).toHaveBeenCalled();
        });

        // can change an existing component's value and store it in the store
        it('should change an existing component\'s value and store it in the store', () => {
            const emit = mock();
            const context = new Context({ events: { emit } });
            const entityId = 'entity1';
            const componentKey = 'position';
            const componentValue = { x: 0, y: 0 };
            const options = new Options({ skipPending: false, onUpdate: mock() });
            context.createEntity(entityId, options);

            context.changeComponent(entityId, componentKey, componentValue, 0, options);

            expect(context.store.fetchComponent(entityId, componentKey)).toEqual(componentValue);
            expect(context.pending.created.components[entityId][componentKey]).toBeTruthy();
            expect(emit).toHaveBeenCalledWith('changeComponent', entityId, componentKey);
            expect(options.onUpdate).toHaveBeenCalled();
        });

        // can store actor input in the store
        it('should store actor input in the store when called', () => {
            const context = new Context();
            const id = '1';
            const payload = { x: 10, y: 20 };
            const options = new Options({});

            context.actorInput(id, payload, 0, options);

            expect(context.store.inputs[id]).toEqual([payload]);
        });

        // can handle empty options when removing an existing actor
        it('should remove an existing actor and handle empty options when called', () => {
            const context = new Context();
            const id = '1';

            context.spawnActor(id, new Options({}));
            context.removeActor(id, new Options({}));

            expect(context.store.actors).toEqual([]);
        });

        // can handle empty options when creating a new entity
        it('should handle empty options when creating a new entity', () => {
            const context = new Context();
            const id = '1';

            expect(() => {
                context.createEntity(id, new Options({}));
            }).not.toThrow();
        });

        // can handle empty options when removing an existing entity
        it('should handle empty options when removing an existing entity', () => {
            const context = new Context();
            const id = '1';
            const options = new Options({});

            expect(() => {
                context.removeEntity(id, options);
            }).not.toThrow();
        });

        // can upsert a new component's value and store it in the store
        it('should upsert a new component\'s value and store it in the store', () => {
            const context = new Context();
            const id = '1';
            const key = 'name';
            const value = 'John';

            context.upsertComponent(id, key, value, 0, new Options({}));

            expect(context.store.fetchComponent(id, key)).toEqual(value);
        });

        // can remove an existing component's value from the store
        it('should remove an existing component\'s value from the store', () => {
            const context = new Context();
            const id = '1';
            const key = 'name';
            const value = 'John';

            context.upsertComponent(id, key, value, 0, new Options({}));
            context.removeComponent(id, key, new Options({}));

            expect(context.store.fetchComponent(id, key)).toBeUndefined();
        });

        // can handle empty options when changing an existing component's value
        it('should handle empty options when changing an existing component\'s value', () => {
            const context = new Context();
            const id = '1';
            const key = 'name';
            const value = 'John';

            context.upsertComponent(id, key, value, 0, new Options({}));

            expect(context.store.fetchComponent(id, key)).toEqual(value);
        });

        // can handle empty options when upserting a new component's value
        it('should handle empty options when upserting a new component\'s value', () => {
            const context = new Context();
            const id = '1';
            const key = 'name';
            const value = 'John';
            const options = new Options({});

            context.upsertComponent(id, key, value, 0, options);

            expect(context.store.fetchComponent(id, key)).toBe(value);
            expect(context.pending).toEqual({
                created: {
                    actors: {},
                    components: {
                        '1': {
                            name: true
                        }
                    },
                    entities: [],
                    inputs: {}
                },
                removed: { actors: {}, components: {}, entities: [] },
                updated: { components: {} },
                symbols: [],
                isDiffed: false
            });
        });

        // can handle empty options when removing an existing component's value
        it('should handle empty options when removing an existing component\'s value', () => {
            const context = new Context();
            const id = '1';
            const key = 'name';
            const value = 'John';
            const options = new Options({});

            context.store.fetchComponent(id, key);
            context.store.storeComponent(id, key, value);
            context.removeComponent(id, key, options);

            expect(context.store.fetchComponent(id, key)).toBeUndefined();
            expect(context.pending).toEqual({
                created: { actors: {}, components: {}, entities: [], inputs: {} },
                removed: {
                    actors: {},
                    components: {
                        '1': {
                            name: true
                        }
                    },
                    entities: []
                },
                updated: { components: {} },
                symbols: [],
                isDiffed: false
            });
        });

        // can merge a list of actors and store them in the store
        it('should merge a list of actors and store them in the store', () => {
            const context = new Context();
            const actors = ['1', '2', '3'];
            const spawnActor = mock((id, context, options) => context.spawnActor(id, options));
            const options = new Options({
                actions: {
                    spawnActor
                }
            });

            context.mergeActors(actors, options);

            expect(spawnActor).toHaveBeenCalled();
            expect(context.store.actors).toEqual(actors);
            expect(context.pending).toEqual({
                created: {
                    actors: {
                        '1': true,
                        '2': true,
                        '3': true
                    },
                    components: {},
                    entities: [],
                    inputs: {}
                },
                removed: { actors: {}, components: {}, entities: [] },
                updated: { components: {} },
                symbols: [],
                isDiffed: false
            });
        });

        // can merge a dictionary of components and store them in the store
        it('should merge components and store them in the store', () => {
            const context = new Context();
            const payload = {
                id1: {
                    key1: 'value1',
                    key2: 'value2'
                },
                id2: {
                    key3: 'value3',
                    key4: 'value4'
                }
            };
            const upsertComponent = mock((payload, context, options) => {
                context.upsertComponent(payload[0], payload[1], payload[2], 0, options);
            });
            context.mergeComponents(payload, new Options({
                actions: {
                    upsertComponent
                }
            }));
            expect(upsertComponent).toHaveBeenCalled();
            expect(context.store.components).toEqual(payload);
            expect(context.pending).toEqual({
                created: {
                    actors: {},
                    components: {
                        id1: {
                            key1: true,
                            key2: true
                        },
                        id2: {
                            key3: true,
                            key4: true
                        }
                    },
                    entities: [],
                    inputs: {}
                },
                removed: { actors: {}, components: {}, entities: [] },
                updated: { components: {} },
                symbols: [],
                isDiffed: false
            });
        });
    });
};

