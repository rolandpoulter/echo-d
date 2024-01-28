export default function nodeSpec(echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('Node', () => {
        const { Node } = echo;

        it('should create and object with all actions as methods', () => {
            const node = new Node();
            expect(node.batch).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}