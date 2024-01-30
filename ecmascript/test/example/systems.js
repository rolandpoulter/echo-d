export default function (echo, extras, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const systemsExample = extras.systems.systemsExample
    const EchoD = extras.echo.Handler

    describe('systems example', () => {
        // The function creates an instance of EchoD.
        it('should create an instance of EchoD when called without any arguments', () => {
            const echo = systemsExample();
            expect(echo).toBeInstanceOf(EchoD);

            // TODO: add more tests
        });
    });

}