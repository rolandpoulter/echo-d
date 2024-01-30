export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const {
        SortedIndex,
    } = echo;

    describe('sorted index', () => {

        // creating a new instance of SortedIndex with default parameters should return an empty index
        it('should return an empty index when creating a new instance with default parameters', () => {
            const sortedIndex = new SortedIndex();
            expect(sortedIndex.items).toEqual([]);
        });

        // adding a value to the index using set method should return the index of the added value
        xit('should return the index of the added value when using the set method', () => {
            const sortedIndex = new SortedIndex();
            const value = 1;
            const id = 'abc';
            const [hash, index] = sortedIndex.set(value, id);
            expect(hash).toBe(sortedIndex.hash(value));
            expect(index).toBe(0);
        });

        // querying the index with a value that exists in the index should return the correct IDs
        it('should return the correct IDs when querying the index with a value that exists', () => {
            const sortedIndex = new SortedIndex();
            const value = 1;
            const id = 'abc';
            sortedIndex.set(value, id);
            const result = sortedIndex.query(value);
            expect(result).toEqual([id]);
        });

        // adding a value with undefined ID to the index should return the correct index
        xit('should return the correct index when adding a value with undefined ID', () => {
            const sortedIndex = new SortedIndex();
            const value = 1;
            const id = undefined;
            const [hash, index] = sortedIndex.set(value, id);
            expect(hash).toBe(sortedIndex.hash(value));
            expect(index).toBe(0);
        });

        // adding a value with null ID to the index should return the correct index
        xit('should return the correct index when adding a value with null ID', () => {
            const sortedIndex = new SortedIndex();
            const value = 1;
            const id = null;
            const [hash, index] = sortedIndex.set(value, id);
            expect(hash).toBe(sortedIndex.hash(value));
            expect(index).toBe(0);
        });

        // creating a new SortedIndex with no arguments sets the items property to an empty array
        it('should set items property to an empty array when creating a new SortedIndex with no arguments', () => {
            const sortedIndex = new SortedIndex();
            expect(sortedIndex.items).toEqual([]);
        });

        // calling the clear method on a SortedIndex instance sets the items property to an empty array
        it('should set items property to an empty array when calling the clear method on a SortedIndex instance', () => {
            const sortedIndex = new SortedIndex();
            sortedIndex.items = [[1, [1, 2, 3]]];
            sortedIndex.clear();
            expect(sortedIndex.items).toEqual([]);
        });

        // calling the clone method on a SortedIndex instance returns a new SortedIndex instance with the same items
        it('should return a new SortedIndex instance with the same items when calling the clone method on a SortedIndex instance', () => {
            const sortedIndex = new SortedIndex();
            sortedIndex.items = [[1, [1, 2, 3]]];
            const clonedIndex = sortedIndex.clone();
            expect(clonedIndex).toBeInstanceOf(SortedIndex);
            expect(clonedIndex.items).toEqual(sortedIndex.items);
        });

        // calling the constructor of a SortedIndex instance with a non-array argument throws an error
        xit('should throw an error when calling the constructor of a SortedIndex instance with a non-array argument', () => {
            expect(() => {
                new SortedIndex('invalid');
            }).toThrow();
        });

        // calling the get method on a SortedIndex instance with a non-value argument throws an error
        xit('should throw an error when calling the get method on a SortedIndex instance with a non-value argument', () => {
            const sortedIndex = new SortedIndex();
            expect(() => {
                sortedIndex.get(null);
            }).toThrow();
        });

        // calling the has method on a SortedIndex instance with a non-value argument throws an error
        xit('should throw an error when calling the has method on a SortedIndex instance with a non-value argument', () => {
            const sortedIndex = new SortedIndex();
            expect(() => {
                sortedIndex.has(null, 1);
            }).toThrow();
        });
    });
}