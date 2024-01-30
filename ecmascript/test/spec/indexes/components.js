export default function (echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    const {
        ComponentsIndex
    } = echo;

    describe('componentes index', () => {
        // can create an instance of ComponentsIndex with default values
        it('should create an instance of ComponentsIndex with default values', () => {
            const componentsIndex = new ComponentsIndex();
            expect(componentsIndex.items).toEqual({});
        });

        // can set a value to the index
        it('should set a value to the index', () => {
            const componentsIndex = new ComponentsIndex();
            componentsIndex.set('value1', 'id1');
            expect(componentsIndex.items).toEqual({ 'value1': new Set(['id1']) });
        });

        // can get a value from the index
        it('should get a value from the index', () => {
            const componentsIndex = new ComponentsIndex();
            componentsIndex.set('value1', 'id1');
            const result = componentsIndex.get('value1');
            expect(result).toEqual(new Set(['id1']));
        });

        // can set a value to the index with an empty value
        it('should set a value to the index with an empty value', () => {
            const componentsIndex = new ComponentsIndex();
            componentsIndex.set('', 'id1');
            expect(componentsIndex.items).toEqual({ '': new Set(['id1']) });
        });

        // can remove a value from the index that does not exist
        it('should remove a value from the index that does not exist', () => {
            const componentsIndex = new ComponentsIndex();
            const result = componentsIndex.remove('value1', 'id1');
            expect(result).toBeUndefined();
        });

        // can query the index with 'with' and 'without' parameters that do not exist
        it('should query the index with \'with\' and \'without\' parameters that do not exist', () => {
            const componentsIndex = new ComponentsIndex();
            const query = {
                with: ['value1'],
                without: ['value2']
            };
            const result = componentsIndex.query(query);
            expect(result).toEqual(new Set());
        });

    });
}