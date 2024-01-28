export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const gameExample = extras.game.gameExample
    
    describe('game example', () => {
        // Creates an instance of EventEmitter
        it('should create an instance of EventEmitter', () => {
            const game = gameExample()
            expect(game.events).toBeDefined()
        });
        // Registers a listener for the "frame" event on the EventEmitter
        it('should register a listener for the "frame" event', () => {
            const game = gameExample()
            expect(game.events.listenerCount('frame')).toBe(2)
        });

        // Registers a listener for the "actorInput" event on the EventEmitter
        it('should register a listener for the "actorInput" event', () => {
            const game = gameExample()
            expect(game.events.listenerCount('actorInput')).toBe(1)
        });

        // No responder function is passed as an argument
        it('should not throw an error when no responder function is passed', () => {
            expect(() => {
                gameExample()
            }).not.toThrow()
        });

        // The responder function throws an error
        xit('should throw an error when the responder function throws an error', () => {
            const responder = () => {
                throw new Error('Responder error')
            }
            expect(() => {
                gameExample(responder)
            }).toThrow('Responder error')
        });
    });
}