export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('actor actions', () => {
        const { Actor } = echo;

        it('should create and object with actions as methods', () => {
            const actions = new Actor.ActorActions();
            expect(actions.actors).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}