export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('component actions', () => {
        const { Component } = echo;

        it('should create and object with actions as methods', () => {
            const actions = new Component.ComponentActions();
            expect(actions.components).toBeInstanceOf(Function);

            // TODO: Add more tests here.
        });
    });
}