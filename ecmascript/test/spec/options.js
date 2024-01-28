export default function optionsSpec(echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('Options', () => {
        const { Options } = echo;

        // The 'ensure' static method returns an instance of 'Options' if the provided context is already an instance of 'Options'.
        it('should return the same instance of Options if the provided context is already an instance of Options', () => {
            // Arrange
            const existingOptions = new Options();

            // Act
            const result = Options.ensure(existingOptions);

            // Assert
            expect(result).toBe(existingOptions);
        });

        // The 'ensure' static method handles cases where the options is not an instance of 'Options'.
        it('should create a new instance of Options if the provided options is not an instance of Options', () => {
            // Arrange
            const optionsProps = {};

            // Act
            const result = Options.ensure(optionsProps, {});

            // Assert
            expect(result).toBeInstanceOf(Options);
        });

        // Constructing an Options object with default options should create an object with default values.
        it('should create an object with default values when constructed with default options', () => {
            const options = new Options({});

            expect(options.compressStringsAsInts).toBe(true);
            expect(options.enableRollback).toBe(false);
            expect(options.enableQuerying).toBe(false);
            expect(options.isAuthority).toBe(true);
            expect(options.isComponentRelay).toBe(true);
            expect(options.isDiffed).toBe(false);
            // expect(options.isOrdered).toBe(true);
            expect(options.isSymbolLeader).toBe(false);
            expect(options.isSymbolRelay).toBe(false);
            expect(options.pageSize).toBe(100);
            expect(options.skipPending).toBe(false);
            expect(options.updateOptions.batched).toBe(true);
            expect(options.updateOptions.batchSize).toBe(100);
            // expect(options.updateOptions.mask).toEqual({
            //     actors: true,
            //     components: true,
            //     entities: true,
            //     inputs: true,
            //     symbols: true
            // });
            expect(options.updateOptions.type).toBe(true);
            // expect(options.updateOptions.validKeys).toEqual({
            //     collider: true,
            //     color: true,
            //     hidden: true,
            //     position: true,
            //     rotation: true,
            //     velocity: true,
            //     spin: true
            // });
        });

        // Options object can be constructed with default options
        xit('should construct an Options object with default options', () => {
            const options = new Options();
            expect(options.actions).toEqual(actions);
            expect(options.batchActionPayloadSizes).toEqual(batchActionPayloadSizes);
            expect(options.compressStringsAsInts).toEqual(true);
            expect(options.defaultSymbols).toEqual(DefaultSymbols);
            expect(options.enableRollback).toEqual(true);
            expect(options.enableQuerying).toEqual(false);
            expect(options.enumDefaultSymbols).toEqual(enumDefaultSymbols);
            expect(options.getActorId).toEqual(defaultGetActorId);
            expect(options.indexes).toEqual(defaultOptions.indexes);
            expect(options.isAuthority).toEqual(true);
            expect(options.isAsyncStorage).toEqual(false);
            expect(options.isComponentRelay).toEqual(true);
            expect(options.isDiffed).toEqual(false);
            expect(options.isOrdered).toEqual(false);
            expect(options.isReadOnly).toEqual(false);
            expect(options.isSymbolLeader).toEqual(false);
            expect(options.isSymbolRelay).toEqual(false);
            expect(options.onUpdate).toBeNull();
            expect(options.pageSize).toEqual(100);
            expect(options.responder).toEqual(voidResponder);
            expect(options.skipPending).toEqual(false);
            expect(options.updateOptions).toEqual(defaultUpdateOptions);
        });

        // Constructing an Options object with custom options should create an object with custom values.
        it('should create an object with custom values when constructed with custom options', () => {
            const options = new Options({
                compressStringsAsInts: false,
                enableRollback: true,
                enableQuerying: true,
                isAuthority: false,
                isComponentRelay: false,
                isDiffed: true,
                isOrdered: false,
                isSymbolLeader: true,
                isSymbolRelay: true,
                pageSize: 50,
                skipPending: true,
                updateOptions: {
                    batched: false,
                    batchSize: 200,
                    mask: {
                        actors: false,
                        components: false,
                        entities: false,
                        inputs: true,
                        symbols: false
                    },
                    type: false,
                    validKeys: {
                        collider: false,
                        color: false,
                        hidden: false,
                        position: false,
                        rotation: false,
                        velocity: false,
                        spin: false
                    }
                }
            });

            expect(options.compressStringsAsInts).toBe(false);
            expect(options.enableRollback).toBe(true);
            expect(options.enableQuerying).toBe(true);
            expect(options.isAuthority).toBe(false);
            expect(options.isComponentRelay).toBe(false);
            expect(options.isDiffed).toBe(true);
            expect(options.isOrdered).toBe(false);
            expect(options.isSymbolLeader).toBe(true);
            expect(options.isSymbolRelay).toBe(true);
            expect(options.pageSize).toBe(50);
            expect(options.skipPending).toBe(true);
            expect(options.updateOptions.batched).toBe(false);
            expect(options.updateOptions.batchSize).toBe(200);
            // expect(options.updateOptions.mask).toEqual({
            //     actors: false,
            //     components: false,
            //     entities: false,
            //     inputs: true,
            //     symbols: false
            // });
            expect(options.updateOptions.type).toBe(false);
            // expect(options.updateOptions.validKeys).toEqual({
            //     collider: false,
            //     color: false,
            //     hidden: false,
            //     position: false,
            //     rotation: false,
            //     velocity: false,
            //     spin: false
            // });
        });

        // Options object can be cloned successfully
        it('should clone an Options object', () => {
            const options = new Options();
            const clonedOptions = options.clone();
            expect(clonedOptions).toEqual(options);
            expect(clonedOptions).not.toBe(options);
        });

        // Options object can be constructed with empty options
        xit('should construct an Options object with empty options', () => {
            const options = new Options({});
            expect(options.actions).toEqual(actions);
            expect(options.batchActionPayloadSizes).toEqual(batchActionPayloadSizes);
            expect(options.compressStringsAsInts).toEqual(true);
            expect(options.defaultSymbols).toEqual(DefaultSymbols);
            expect(options.enableRollback).toEqual(true);
            expect(options.enableQuerying).toEqual(false);
            expect(options.enumDefaultSymbols).toEqual(enumDefaultSymbols);
            expect(options.getActorId).toEqual(defaultGetActorId);
            expect(options.indexes).toEqual(defaultOptions.indexes);
            expect(options.isAuthority).toEqual(true);
            expect(options.isAsyncStorage).toEqual(false);
            expect(options.isComponentRelay).toEqual(true);
            expect(options.isDiffed).toEqual(false);
            expect(options.isOrdered).toEqual(false);
            expect(options.isReadOnly).toEqual(false);
            expect(options.isSymbolLeader).toEqual(false);
            expect(options.isSymbolRelay).toEqual(false);
            expect(options.onUpdate).toBeNull();
            expect(options.pageSize).toEqual(100);
            expect(options.responder).toEqual(voidResponder);
            expect(options.skipPending).toEqual(false);
            expect(options.updateOptions).toEqual(defaultUpdateOptions);
        });
    });
}