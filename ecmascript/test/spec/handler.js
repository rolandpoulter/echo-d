export default function handlerSpec(echo, { describe, it, expect, mock, spy }) {
    const xit = (n) => { console.log('skip:', n) };

    describe('Handler', () => {
        const { Handler, Context, Options, Storage } = echo;

        // Handler can be instantiated with a Context and Options object
        it('should instantiate Handler with Context and Options object', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            expect(handler.context).toBeInstanceOf(Context);
            expect(handler.options).toBeInstanceOf(Options);
        });

        // Handler can be instantiated with a context, options, actions, and storage.
        it('should instantiate Handler with context, options, actions, and storage', () => {
            const context = new Context();
            const options = new Options();
            const actions = {
                addSymbol: () => { },
                getSymbol: () => { },
                // ...other actions
            };
            const storage = new Storage();

            const handler = new Handler(context, options, actions, storage);

            expect(handler.context).toBeInstanceOf(Context);
            expect(handler.options).toBeInstanceOf(Options);
        });

        // Handler can be instantiated with plain objects for Context and Options
        it('should instantiate Handler with plain objects for Context and Options', () => {
            const context = {};
            const options = {};
            const handler = new Handler(context, options);

            expect(handler.context).toBeInstanceOf(Context);
            expect(handler.options).toBeInstanceOf(Options);
        });

        // Handler can handle a single message with one()
        it('should handle a single message with one()', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            const message = {
                action: 'spawnActor',
                payload: 'actor1'
            };

            handler.one(message);

            // Add assertions here
        });

        // Handler can handle a single message.
        it('should handle a single message', () => {
            const context = new Context();
            const options = new Options();
            const actions = {
                addSymbol: () => { },
                getSymbol: () => { },
                // ...other actions
            };
            const storage = new Storage();

            const handler = new Handler(context, options, actions, storage);

            const message = {
                action: 'createEntity',
                payload: 'entity1'
            };

            const result = handler.one(message);

            // assert the result
        });

        // Handler can handle multiple messages with many()
        it('should handle multiple messages with many()', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            const messages = [
                {
                    action: 'spawnActor',
                    payload: 'actor1'
                },
                {
                    action: 'spawnActor',
                    payload: 'actor2'
                }
            ];

            handler.many(messages);

            // Add assertions here
        });

        // Handler can handle multiple messages.
        it('should handle multiple messages', () => {
            const context = new Context();
            const options = new Options();
            const actions = {
                addSymbol: () => { },
                getSymbol: () => { },
                // ...other actions
            };
            const storage = new Storage();

            const handler = new Handler(context, options, actions, storage);

            const messages = [
                {
                    action: 'createEntity',
                    payload: 'entity1'
                },
                {
                    action: 'createEntity',
                    payload: 'entity2'
                }
            ];

            const result = handler.many(messages);

            // assert the result
        });

        // Handler can be instantiated without a context or options.
        xit('should instantiate Handler without context or options', () => {
            const actions = {
                addSymbol: () => { },
                getSymbol: () => { },
                // ...other actions
            };
            const storage = new Storage();

            const handler = new Handler({}, {}, actions, storage);

            expect(handler.context).toBeInstanceOf(Context);
            expect(handler.options).toBeInstanceOf(Options);
        });

        // Handler can handle a message with an invalid format.
        it('should handle a message with an invalid format', () => {
            const context = new Context();
            const options = new Options();
            const actions = {
                addSymbol: () => { },
                getSymbol: () => { },
                // ...other actions
            };
            const storage = new Storage();

            const handler = new Handler(context, options, actions, storage);

            const message = {
                // invalid format
            };

            const result = handler.one(message);

            // assert the result
        });

        // one() can handle invalid message types
        xit('should handle invalid message types in one()', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            const message = 'invalid message';

            handler.one(message);

            // Add assertions here
        });

        // many() can handle invalid message types
        xit('should handle invalid message types in many()', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            const messages = ['invalid message'];

            handler.many(messages);

            // Add assertions here
        });

        // one() method calls oneHandler with context and options
        xit('should call oneHandler with context and options', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            const message = {
                action: 'addSymbol',
                payload: {
                    symbol: 'AAPL',
                    price: 150.50
                }
            };

            const spyOneHandler = spy(handler, 'oneHandler');
            handler.one(message);

            expect(spyOneHandler).toHaveBeenCalledWith(message, context, options);
        });

        // Handler throws an error if instantiated without Context or Options
        xit('should throw an error if instantiated without Context or Options', () => {
            // expect(() => new Handler()).toThrow();
            expect(() => new Handler(new Context())).toThrow();
            expect(() => new Handler(null, new Options())).toThrow();
        });

        // one() method throws an error if message is not an array or object
        xit('should throw an error if message is not an array or object', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            // expect(() => handler.one('invalid')).toThrow();
            expect(() => handler.one(123)).toThrow();
            // expect(() => handler.one(null)).toThrow();
        });

        // many() method throws an error if message is not an array or object
        it('should throw an error if message is not an array or object', () => {
            const context = new Context();
            const options = new Options();
            const handler = new Handler(context, options);

            expect(() => handler.many('invalid')).toThrow();
            expect(() => handler.many(123)).toThrow();
            // expect(() => handler.many(null)).toThrow();
        });

        // Handler can handle a message with an invalid action.
        it('should handle a message with an invalid action', () => {
            const context = new Context();
            const options = new Options();
            const actions = {
                addSymbol: () => { },
                getSymbol: () => { },
                // ...other actions
            };
            const storage = new Storage();

            const handler = new Handler(context, options, actions, storage);

            const message = {
                action: 'invalidAction',
                payload: 'entity1'
            };

            const result = handler.one(message);

            // assert the result
        });
    });
}