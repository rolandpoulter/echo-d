export default function nodeSpec(echo, { describe, it, expect, mock, spy }) {
    // const xit = (n) => { console.log('skip:', n) };
    
    describe('Node', () => {
        const { Node } = echo;

        it('should create and object with all actions as methods', () => {
            const node = new Node();
            expect(node.batch).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}