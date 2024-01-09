export default function symbolsSpec(echo, { describe, it, expect, mock, spy }) {
    const xit = (n) => { console.log('skip:', n) };

    describe('Symbols', () => {
        const { Symbols } = echo;

        // should be able to add a symbol and retrieve its index
        it('should return the index of the added symbol when adding a valid symbol', () => {
            const symbols = new Symbols();
            const index = symbols.add('symbol');
            expect(index).toBe(0);
        });

        // should be able to fetch a symbol and its index based on a payload
        it('should return the symbol and its index when fetching by symbol', () => {
            const symbols = new Symbols({ _list: ['symbol'] });
            const [symbol, index] = symbols.fetch('symbol');
            expect(symbol).toBe('symbol');
            expect(index).toBe(0);
        });

        // should be able to find the index of a symbol
        it('should return the index of the symbol when finding a valid symbol', () => {
            const symbols = new Symbols({ _list: ['symbol'] });
            const index = symbols.find('symbol');
            expect(index).toBe(0);
        });

        // should return null when trying to add an empty symbol
        it('should return null when adding an empty symbol', () => {
            const symbols = new Symbols();
            const index = symbols.add('');
            expect(index).toBeNull();
        });

        // should return null when trying to add a symbol that already exists
        xit('should return null when adding a symbol that already exists', () => {
            const symbols = new Symbols({ _list: ['symbol'] });
            const index = symbols.add('symbol');
            expect(index).toBeNull();
        });

        // should return undefined when trying to get a symbol at an index that does not exist
        it('should return undefined when getting a symbol at an index that does not exist', () => {
            const symbols = new Symbols();
            const symbol = symbols.get(0);
            expect(symbol).toBeUndefined();
        });

        // can construct a Symbols object with an empty list of symbols
        it('should construct a Symbols object with an empty list of symbols', () => {
            const symbols = new Symbols();
            expect(symbols.getSymbols()).toEqual([]);
        });

        // can add a symbol to the Symbols object
        it('should add a symbol to the Symbols object', () => {
            const symbols = new Symbols();
            const index = symbols.add('symbol');
            expect(index).toBe(0);
            expect(symbols.getSymbols()).toEqual(['symbol']);
        });

        // can fetch a symbol and its index based on a payload
        it('should fetch a symbol and its index based on a payload', () => {
            const symbols = new Symbols();
            symbols.add('symbol');
            const [symbol, index] = symbols.fetch(0);
            expect(symbol).toBe('symbol');
            expect(index).toBe(0);
        });

        // returns null when trying to add an empty symbol
        it('should return null when trying to add an empty symbol', () => {
            const symbols = new Symbols();
            const index = symbols.add('');
            expect(index).toBeNull();
        });

        // returns null when trying to add a symbol that is not valid
        it('should return null when trying to add a symbol that is not valid', () => {
            const symbols = new Symbols();
            const index = symbols.add(null);
            expect(index).toBeNull();
        });

        // returns undefined when trying to get a symbol at an index that does not exist
        it('should return undefined when trying to get a symbol at an index that does not exist', () => {
            const symbols = new Symbols();
            const symbol = symbols.get(0);
            expect(symbol).toBeUndefined();
        });
    });

}