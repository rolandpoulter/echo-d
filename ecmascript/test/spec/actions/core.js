export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('core actions', () => {
        const { Core } = echo;

        it('should create and object with actions as methods', () => {
            const actions = new Core.CoreActions();
            expect(actions.batch).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}