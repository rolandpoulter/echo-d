export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('client', () => {
        const { Client } = echo;

        it('should create and object with actions as methods', () => {
            const client = new Client.ClientActions();
            expect(client.batch).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });

        xit('empty test to skip', () => {
            // This test will be skipped.
        })
    });
}