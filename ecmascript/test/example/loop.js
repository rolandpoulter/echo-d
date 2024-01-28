export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const loopExample = extras.loop.loopExample

    describe('loop example', () => {

        describe('loopExample', () => {

            // Creates a new EventEmitter if no events are passed as argument
            it('should create a new EventEmitter if no events are passed as argument', () => {
                const runLoop = loopExample()
                expect(runLoop.events).toBeDefined()
            });

            // Defines a loop function that logs the timestamp, lastEmitDelta, delta and state, and calls the fn function if it exists
            xit('should define a loop function that logs the timestamp, lastEmitDelta, delta and state, and calls the fn function if it exists', () => {
                const mockFn = mock()
                const runLoop = loopExample(mockFn)
                const timestamp = 123456789
                const lastEmitDelta = 100
                const delta = 50
                const state = { prop: 'value' }
                runLoop.nextFrame(timestamp, lastEmitDelta, delta, state)
                expect(console.log).toHaveBeenCalledWith('loop', timestamp, lastEmitDelta, delta, state)
                expect(mockFn).toHaveBeenCalledWith(timestamp, lastEmitDelta, delta, state)
            });

            // Calls the start method of the runLoop object
            xit('should call the start method of the runLoop object', () => {
                const runLoop = loopExample()
                runLoop.start = mock()
                expect(runLoop.start).toHaveBeenCalled()
            });

            // If events is passed as argument, uses it as the events property of the runLoop object
            xit('should use events as the events property of the runLoop object if it is passed as argument', () => {
                const events = new EventEmitter()
                const runLoop = loopExample(null, events)
                expect(runLoop.events).toBe(events)
            });

            // If fn is not passed as argument, does not call it in the loop function
            xit('should not call fn in the loop function if it is not passed as argument', () => {
                const mockFn = mock()
                const runLoop = loopExample()
                const timestamp = 123456789
                const lastEmitDelta = 100
                const delta = 50
                const state = { prop: 'value' }
                runLoop.loop(timestamp, lastEmitDelta, delta, state)
                expect(mockFn).not.toHaveBeenCalled()
            });

            // If updateFrequency is not passed as argument, sets it to 1000 / 20
            xit('should set updateFrequency to 1000 / 20 if it is not passed as argument', () => {
                const runLoop = loopExample()
                expect(runLoop.updateFrequency).toBe(1000 / 20)
            });
        });
    });
}