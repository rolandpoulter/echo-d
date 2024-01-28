export default function emitterSpec(echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('Emitter', () => {
        const { Emitter } = echo;

        // Emitter can be instantiated without any arguments.
        it('should instantiate Emitter without any arguments', () => {
            const emitter = new Emitter();
            expect(emitter).toBeInstanceOf(Emitter);
            expect(emitter.handlers).toEqual([]);
        });

        // Emitter can add a handler to its list of handlers using emitTo method.
        it('should add a handler to the list of handlers using emitTo method', () => {
            const emitter = new Emitter();
            const handler = mock();
            emitter.emitTo(handler);
            expect(emitter.handlers).toContain(handler);
            emitter.done();
        });

        // Emitter can emit a value to all its handlers using emit method.
        it('should emit a value to all handlers using emit method', () => {
            const emitter = new Emitter();
            const handler1 = mock();
            const handler2 = mock();
            emitter.emitTo(handler1);
            emitter.emitTo(handler2);
            emitter.emit('Hello, world!');
            emitter.done();
            expect(handler1).toHaveBeenCalledWith('Hello, world!');
            expect(handler2).toHaveBeenCalledWith('Hello, world!');
        });

        // Emitter can add a null handler to its list of handlers using emitTo method.
        it('should add a null handler to the list of handlers using emitTo method', () => {
            const emitter = new Emitter();
            const handler = null;
            emitter.emitTo(handler);
            expect(emitter.handlers).toContain(handler);
            emitter.done();
        });

        // Emitter can emit a null value to all its handlers using emit method.
        it('should emit a null value to all handlers using emit method', () => {
            const emitter = new Emitter();
            const handler1 = mock();
            const handler2 = mock();
            emitter.emitTo(handler1);
            emitter.emitTo(handler2);
            emitter.emit(null);
            emitter.done();
            expect(handler1).toHaveBeenCalledWith(null);
            expect(handler2).toHaveBeenCalledWith(null);
        });

        // Emitter can add a handler to its list of handlers using emitTo method and then remove it.
        it('should add a handler to the list of handlers using emitTo method and then remove it', () => {
            const emitter = new Emitter();
            const handler = mock();
            const returnedHandler = emitter.emitTo(handler);
            expect(emitter.handlers).toContain(handler);
            emitter.handlers = emitter.handlers.filter(h => h !== returnedHandler);
            emitter.done();
            expect(emitter.handlers).not.toContain(handler);
        });
    });
}