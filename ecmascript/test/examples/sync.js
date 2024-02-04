export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const syncExample = extras.sync.syncExample

    const echoExample = extras.echo.echoExample
    const becsyExample = extras.becsy.becsyExample
    const bitecsExample = extras.bitecs.bitECSExample
    const miniplexExample = extras.miniplex.miniplexExample

    const expectUpdatedView = (view, a, e, c, i) => {
        const actors = view.context.store.getActors();
        const entities = view.context.store.getEntities();
        const components = view.context.store.getComponents();
        const inputs = view.context.store.getInputs();
        if (a !== null)  {
            expect(actors).toEqual(a);
        }
        if (e !== null)  {
            expect(entities).toEqual(e);
        }
        if (c !== null)  {
            expect(components).toEqual(c);
        }
        if (i !== null)  {
            expect(inputs).toEqual(i);
        }
    }

    describe('sync example', () => {
        it('should be tested', async () => {
            const options = {}
            const becsy = becsyExample(options).echo;
            const bitecs = bitecsExample(options).echo;
            const miniplex = miniplexExample(options).echo;
            const echo = echoExample(options).echo;
            
            const ecsList = [
                becsy,
                bitecs,
                miniplex,
            ]

            const expectUpdated = (a, e, c, i) => {
                expectUpdatedView(echo, a, e, c, i)
                expectUpdatedView(becsy, a, e, c, i)
                expectUpdatedView(bitecs, a, e, c, i)
                expectUpdatedView(miniplex, a, e, c, i)
            }

            await syncExample(echo, ecsList, {
                afterSetup: async (echo, ecsList) => {
                    expectUpdatedView(
                        echo,
                        [['actor1', 'actor2']],
                        [['entity1', 'entity2']],
                        [],
                        [],
                    )
                },
                afterUpdate: async (echo, ecsList) => {
                    expectUpdated(
                        // echo,
                        [['actor1', 'actor2']],
                        [['entity1', 'entity2']],
                        [{
                            actor1: {
                                color: new Uint8Array([ 255, 0, 0, 255 ]),
                                position: new Float32Array([ 0, 0, 0 ]),
                            },
                            actor2: {
                                color: new Uint8Array([ 0, 255, 0, 255 ]),
                                position: new Float32Array([ 1, 0, 0 ]),
                            },
                            entity1: {
                                color: new Uint8Array([ 0, 0, 255, 255 ]),
                                position: new Float32Array([ 0, 1, 0 ]),
                            },
                            entity2: {
                                color: new Uint8Array([ 255, 255, 0, 255 ]),
                                position: new Float32Array([ 1, 1, 0 ]),
                            },
                        }],
                        null, /*
                        [{
                            actor1: [{
                                move: [0, 0, 1],
                                type: 'move',
                            }],
                            actor2: [{
                                move: [0, 0, 1],
                                type: 'move',
                            }],
                        }],
                        */
                    )
                }
            })

            expectUpdated(
                // echo,
                [],
                [],
                null, /*
                [{
                    actor1: {},
                    actor2: {},
                    entity1: {},
                    entity2: {},
                }],
                */
                null, /* [{
                    actor1: [{
                        move: [0, 0, 1],
                        type: 'move',
                    }],
                    actor2: [{
                        move: [0, 0, 1],
                        type: 'move',
                    }],
                }],
                */
            )

            // expectUpdatedView(
            //     becsy,
            //     [],
            //     [],
            //     [],
            //     [{
            //         actor1: [{
            //             move: [0, 0, 1],
            //             type: 'move',
            //         }],
            //         actor2: [{
            //             move: [0, 0, 1],
            //             type: 'move',
            //         }],
            //     }],
            // )

            // expectUpdatedView(
            //     bitecs,
            //     [],
            //     [],
            //     [],
            //     [],
            // )

            // expectUpdatedView(
            //     miniplex,
            //     [],
            //     [],
            //     [],
            //     [],
            // )
        })
    });
}