export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('symbol actions', () => {
        const { Symbol } = echo;

        it('should create and object with actions as methods', () => {
            const actions = new Symbol.SymbolActions();
            expect(actions.symbols).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}