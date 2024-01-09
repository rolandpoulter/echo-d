export default function utilsSpec(echo, { describe, it, expect, mock, spy }) {
    const xit = (n) => { console.log('skip:', n) };
    const xdescribe = (n) => { console.log('skip all:', n) };

    describe('utils', () => {
        const { utils } = echo;

        describe('binarySearch', () => {
            const { binarySearch } = utils

            // Should return the index of the target value in a sorted array
            it('should return the index of the target value in a sorted array', () => {
                const items = [1, 2, 3, 4, 5];
                const target = 3;
                const result = binarySearch(items, target);
                expect(result).toEqual([2, 0]);
            });

            // Should return the index of the first occurrence of the target value in a sorted array with duplicates
            xit('should return the index of the first occurrence of the target value in a sorted array with duplicates', () => {
                const items = [1, 2, 2, 3, 4, 5];
                const target = 2;
                const result = binarySearch(items, target);
                expect(result).toEqual([1, 1]);
            });

            // Should return [-1, 0] when target value is less than the first item in the sorted array
            it('should return [-1, 0] when target value is less than the first item in the sorted array', () => {
                const items = [1, 2, 3, 4, 5];
                const target = 0;
                const result = binarySearch(items, target);
                expect(result).toEqual([-1, 0]);
            });

            // Should return [-1, items.length] when target value is greater than the last item in the sorted array
            it('should return [-1, items.length] when target value is greater than the last item in the sorted array', () => {
                const items = [1, 2, 3, 4, 5];
                const target = 6;
                const result = binarySearch(items, target);
                expect(result).toEqual([-1, items.length]);
            });

            // Should return [-1, left] when target value is not found in the sorted array
            it('should return [-1, left] when target value is not found in the sorted array', () => {
                const items = [1, 2, 3, 4, 5];
                const target = 6;
                const result = binarySearch(items, target);
                expect(result).toEqual([-1, 5]);
            });
        });

        xdescribe('recursiveCombination', () => {
            const { recursiveCombination } = utils

            // Successfully combines two numbers of the same type.
            it('should successfully combine two numbers of the same type', () => {
                const objA = 5;
                const objB = 10;
                const result = recursiveCombination(objA, objB);
                expect(result).toEqual([true, 15]);
            });

            // Successfully combines two bigints of the same type.
            it('should successfully combine two bigints of the same type', () => {
                const objA = BigInt(5);
                const objB = BigInt(10);
                const result = recursiveCombination(objA, objB);
                expect(result).toEqual([true, BigInt(15)]);
            });

            // Successfully combines two arrays of the same length and type.
            it('should successfully combine two arrays of the same length and type', () => {
                const objA = [1, 2, 3];
                const objB = [4, 5, 6];
                const result = recursiveCombination(objA, objB);
                expect(result).toEqual([true, [5, 7, 9]]);
            });

            // Fails to combine two numbers of different types.
            it('should fail to combine two numbers of different types', () => {
                const objA = 5;
                const objB = BigInt(10);
                const result = recursiveCombination(objA, objB);
                expect(result).toEqual([false, BigInt(10)]);
            });

            // Fails to combine two bigints of different types.
            it('should fail to combine two bigints of different types', () => {
                const objA = BigInt(5);
                const objB = 10;
                const result = recursiveCombination(objA, objB);
                expect(result).toEqual([false, 10]);
            });

            // Fails to combine two arrays of different lengths.
            it('should fail to combine two arrays of different lengths', () => {
                const objA = [1, 2, 3];
                const objB = [4, 5];
                const result = recursiveCombination(objA, objB);
                expect(result).toEqual([false, [4, 5]]);
            });
        });
    })
}