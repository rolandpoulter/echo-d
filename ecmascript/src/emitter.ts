/**
 * Emitter
 * 
 * @template T
 * @class Emitter
 * @description An Emitter is a class that emits values to its handlers.
 * @property {Function[]} handlers - The handlers of the Emitter.
 * @method emitTo - Adds a handler to the Emitter and returns the handler.
 * @method emit - Emits a value to the handlers of the Emitter.
 * @example
 * const emitter = new Emitter()
 * const handler = emitter.emitTo((value) => {
 *  console.log(value)
 * })
 * emitter.emit('Hello, world!')
 * // => 'Hello, world!'
 */
export class Emitter<T> {
    handlers: Function[];
    
    /**
     * Constructs a new Emitter object.
     */
    constructor () {
        this.handlers = []
    }
    
    /**
     * Adds a handler to the Emitter and returns the handler.
     * 
     * @param {Function} handler - The handler to add to the Emitter.
     * @returns {Function} The handler.
     */
    emitTo (handler: Function): Function {
        this.handlers.push(handler)

        return handler
    }

    /**
     * Emits a value to the handlers of the Emitter.
     * 
     * @param {T} value - The value to emit to the handlers of the Emitter.
     */
    emit (value: T): void {
        for (const handler of this.handlers) {
            handler(value)
        }
    }
}