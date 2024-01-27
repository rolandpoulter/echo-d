export default function (echo, extras, { describe, it, expect, mock, spy }) {
    // const xit = (n) => { console.log('skip:', n) };

    const EchoD = extras.echo.Handler;
    const echoExample = extras.echo.echoExample

    describe('bitecs example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD', () => {
            const result = echoExample();
            expect(result.echo).toBeInstanceOf(EchoD);
        });

        // The function retrieves the world from the EchoD context store.
        it('should retrieve the world from the EchoD context store', () => {
            const result = echoExample();
            expect(result.world).toBeUndefined();
        });
    });
}