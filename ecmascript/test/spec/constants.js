export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('constants', () => {
        const { Constants } = echo;

        it('should exist', () => {
            expect(Constants).toBeDefined();
        });
    });
}