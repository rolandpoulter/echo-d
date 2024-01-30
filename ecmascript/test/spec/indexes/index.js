export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const {
        Index
    } = echo;
    
    describe('base index', () => {
        // Index can be instantiated with no arguments
        it('should instantiate Index with no arguments', () => {
            const index = new Index();
            expect(index).toBeInstanceOf(Index);
            expect(index.items).toBeNull();
        });

        // Index can be instantiated with items argument
        it('should instantiate Index with items argument', () => {
            const items = [1, 2, 3];
            const index = new Index(items);
            expect(index).toBeInstanceOf(Index);
            expect(index.items).toEqual(items);
        });

        // Index can be cleared successfully
        it('should clear the index successfully', () => {
            const items = [1, 2, 3];
            const index = new Index(items);
            index.clear();
            expect(index.items).toBeNull();
        });

        // Index can be instantiated with null items argument
        it('should instantiate Index with null items argument', () => {
            const index = new Index(null);
            expect(index).toBeInstanceOf(Index);
            expect(index.items).toBeNull();
        });

        // Index can be instantiated with empty items argument
        it('should instantiate Index with empty items argument', () => {
            const index = new Index([]);
            expect(index).toBeInstanceOf(Index);
            expect(index.items).toEqual([]);
        });

        // Index can set a null value
        it('should set a null value to the index', () => {
            const index = new Index();
            const value = null;
            const id = 1;
            const result = index.set(value, id);
            expect(result).toBeNull();
        });

    });
}