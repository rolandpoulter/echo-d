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
 * emitter.done() // cleanup
 * // => 'Hello, world!'
 */
export class Emitter {
    handlers;
    emissions;
    handlersDone;
    emissionsDone;
    /**
     * Constructs a new Emitter object.
     */
    constructor(emissions = [], emissionsDone = false, handlers = [], handlersDone = false) {
        this.handlers = handlers;
        this.emissions = emissions;
        for (const handler of this.handlers) {
            for (const emission of this.emissions) {
                handler(emission);
            }
        }
        this.handlersDone = emissionsDone;
        this.emissionsDone = handlersDone;
        this.cleanup();
    }
    /**
     * Cleans up the Emitter.
     */
    cleanup() {
        if (this.handlersDone && this.emissionsDone) {
            this.clear();
        }
    }
    /**
     * Clears all handlers and emissions from the Emitter.
     */
    clear() {
        this.handlers = [];
        this.emissions = [];
        this.handlersDone = false;
        this.emissionsDone = false;
    }
    /**
     * Marks the Emitter as done.
     *
     * @param {boolean} handlersDone - Whether or not the Emitter is done emitting values.
     * @param {boolean} emissionsDone - Whether or not the Emitter is done emitting values.
     */
    done(handlersDone = true, emissionsDone = true) {
        this.handlersDone = handlersDone;
        this.emissionsDone = emissionsDone;
        this.cleanup();
    }
    /**
     * Adds a handler to the Emitter and returns the handler.
     *
     * @param {Function} handler - The handler to add to the Emitter.
     * @param {boolean} handlersDone - Whether or not the Emitter is done emitting values.
     * @returns {Function} The handler.
     */
    emitTo(handler, handlersDone = false) {
        this.handlers.push(handler);
        for (const emission of this.emissions) {
            handler(emission);
        }
        this.handlersDone = handlersDone;
        this.cleanup();
    }
    /**
     * Emits a value to the handlers of the Emitter.
     *
     * @param {T} value - The value to emit to the handlers of the Emitter.
     * @param {boolean} emissionsDone - Whether or not the Emitter is done emitting values.
     */
    emit(value, emissionsDone = false) {
        this.emissions.push(value);
        for (const handler of this.handlers) {
            handler(value);
        }
        this.emissionsDone = emissionsDone;
        this.cleanup();
    }
    /**
     * Removes a handler from the Emitter.
     *
     * @param {Function} handler - The handler to remove from the Emitter.
     */
    removeHandler(handler) {
        const index = this.handlers.indexOf(handler);
        if (index !== -1) {
            this.handlers.splice(index, 1);
        }
    }
    /**
     * Removes an emission from the Emitter.
     *
     * @param {T} emission - The emission to remove from the Emitter.
     */
    removeEmission(emission) {
        const index = this.emissions.indexOf(emission);
        if (index !== -1) {
            this.emissions.splice(index, 1);
        }
    }
}
export default Emitter;
