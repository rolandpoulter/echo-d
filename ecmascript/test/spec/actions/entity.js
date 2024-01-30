export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('entity actions', () => {
        const { Entity } = echo;

        it('should create and object with actions as methods', () => {
            const actions = new Entity.EntityActions();
            expect(actions.entities).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}