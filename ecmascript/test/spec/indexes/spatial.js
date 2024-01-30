export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const {
        SpatialIndex
    } = echo;

    describe('spatial index', () => {

        // creating a new instance of SpatialIndex with default parameters should return an empty index
        it('should return an empty index when creating a new instance with default parameters', () => {
            const spatialIndex = new SpatialIndex();
            expect(spatialIndex.items).toEqual([]);
        });

        // adding a value to the index using set method should return the index of the added value
        xit('should return the index of the added value when using the set method', () => {
            const spatialIndex = new SpatialIndex();
            const value = [1, 2, 3];
            const id = 'abc';
            const [hash, index] = spatialIndex.set(value, id);
            expect(hash).toBe(spatialIndex.hash(value));
            expect(index).toBe(0);
        });

        // querying the index with a value that exists in the index should return the correct IDs
        it('should return the correct IDs when querying the index with a value that exists', () => {
            const spatialIndex = new SpatialIndex();
            const value = [1, 2, 3];
            const id = 'abc';
            spatialIndex.set(value, id);
            const result = spatialIndex.query(value);
            expect(result).toEqual([id]);
        });

        // adding a value with undefined ID to the index should return the correct index
        xit('should return the correct index when adding a value with undefined ID', () => {
            const spatialIndex = new SpatialIndex();
            const value = [1, 2, 3];
            const id = undefined;
            const [hash, index] = spatialIndex.set(value, id);
            expect(hash).toBe(spatialIndex.hash(value));
            expect(index).toBe(0);
        });

        // adding a value with null ID to the index should return the correct index
        xit('should return the correct index when adding a value with null ID', () => {
            const spatialIndex = new SpatialIndex();
            const value = [1, 2, 3];
            const id = null;
            const [hash, index] = spatialIndex.set(value, id);
            expect(hash).toBe(spatialIndex.hash(value));
            expect(index).toBe(0);
        });

        // querying the index with a value that has undefined ID should return true if the value exists in the index, false otherwise
        it('should return true if the value exists in the index and has undefined ID, false otherwise', () => {
            const spatialIndex = new SpatialIndex();
            const value = [1, 2, 3];
            const id = undefined;
            spatialIndex.set(value, id);
            const result = spatialIndex.has(value, id);
            expect(result).toBe(true);
        });

    });
}