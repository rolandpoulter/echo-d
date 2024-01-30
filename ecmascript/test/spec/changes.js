export default function changesSpec(echo, { describe, it, expect, mock, spy, xit, xdescribe }) {
    describe('Changes', () => {
        const { Changes, Context } = echo;

        // Can create a new instance of Changes class with a context and an optional initial set of changes.
        it('should create a new instance of Changes class with a context', () => {
            const context = new Context();
            const changes = new Changes(context);

            expect(changes).toBeInstanceOf(Changes);
            expect(changes.context).toBe(context);
            expect(changes.diffs).toEqual({});
        });

        // Can change a component in the current context.
        xit('should change a component in the current context', () => {
            const context = new Context();
            const changes = new Changes(context);
            const id = 'componentId';
            const key = 'propertyKey';
            const newValue = 'new value';
            const prevValue = 'previous value';

            const result = changes.changeComponent(id, key, newValue, prevValue);

            expect(result).toBeInstanceOf(Promise);
            return result.then((value) => {
                expect(value).toEqual(newValue);
                expect(changes.diffs[id][key]).toEqual(newValue);
            });
        });

        // Can retrieve the changes of a value.
        it('should retrieve the changes of a value', () => {
            const context = new Context();
            const changes = new Changes(context);
            const id = 'componentId';
            const key = 'propertyKey';
            const storedValue = 'stored value';

            const result = changes.getValue(id, key, storedValue);

            expect(result).toEqual(storedValue);
        });

        // Can handle undefined or null diffedValue when retrieving the changes of a value.
        it('should handle undefined or null diffedValue when retrieving the changes of a value', () => {
            const context = new Context();
            const changes = new Changes(context);
            const id = 'componentId';
            const key = 'propertyKey';
            const storedValue = 'stored value';

            changes.diffs[id] = { [key]: null };

            const result1 = changes.getValue(id, key, storedValue);
            expect(result1).toEqual(storedValue);

            changes.diffs[id] = { [key]: undefined };

            const result2 = changes.getValue(id, key, storedValue);
            expect(result2).toEqual(storedValue);
        });

        // Can upsert a component in the current context.
        it('should create an instance of Changes class with a context and an initial set of changes', () => {
            const context = new Context();
            const changes = new Changes(context, { diffs: { '1': { name: 'John', age: 30 } } });

            expect(changes).toBeInstanceOf(Changes);
            expect(changes).toHaveProperty('context', context);
            expect(changes).toHaveProperty('diffs', { '1': { name: 'John', age: 30 } });
        });

        // creating a new instance of Changes with a context and an initial set of changes should result in an instance of Changes with the diffs object set to the provided changes
        it('should create a new instance of Changes with the diffs object set to the provided changes', () => {
            const context = { components: {} };
            const initialChanges = { diffs: { component1: { property1: 'value1' } } };
            const changes = new Changes(context, initialChanges);
            expect(changes.diffs).toEqual(initialChanges.diffs);
        });

        // calling reset with no changes should result in the diffs object being set to an empty object
        it('should set the diffs object to an empty object when reset is called with no changes', () => {
            const context = { components: {} };
            const initialChanges = { diffs: { component1: { property1: 'value1' } } };
            const changes = new Changes(context, initialChanges);
            changes.reset();
            expect(changes.diffs).toEqual({});
        });

        // can reset the changes to a new set of changes or an empty object if no changes are provided
        it('should reset the changes to a new set of changes', () => {
            const context = new Context();
            const changes = new Changes(context, { diffs: { '1': { name: 'John', age: 30 } } });

            changes.reset({ diffs: { '2': { name: 'Jane', age: 25 } } });

            expect(changes).toHaveProperty('diffs', { '2': { name: 'Jane', age: 25 } });
        });

        // can retrieve the changes of a value
        it('should retrieve the changes of a value', () => {
            const context = new Context();
            const changes = new Changes(context, { diffs: { '1': { name: 'John', age: 30 } } });

            const nameDiff = changes.getValue('1', 'name');
            const ageDiff = changes.getValue('1', 'age');

            expect(nameDiff).toBe('John');
            expect(ageDiff).toBe(30);
        });

        // can handle a null or undefined context when creating an instance of Changes class
        it('should handle a null context when creating an instance of Changes class', () => {
            const changes = new Changes(null, { diffs: { '1': { name: 'John', age: 30 } } });

            expect(changes).toBeInstanceOf(Changes);
            expect(changes).toHaveProperty('context', null);
            expect(changes).toHaveProperty('diffs', { '1': { name: 'John', age: 30 } });
        });

        // can handle a null or undefined initial set of changes when creating an instance of Changes class
        it('should handle a null initial set of changes when creating an instance of Changes class', () => {
            const context = new Context();
            const changes = new Changes(context, null);

            expect(changes).toBeInstanceOf(Changes);
            expect(changes).toHaveProperty('context', context);
            expect(changes).toHaveProperty('diffs', {});
        });

        // can handle a null or undefined changes when resetting the changes
        it('should handle a null changes when resetting the changes', () => {
            const context = new Context();
            const changes = new Changes(context, { diffs: { '1': { name: 'John', age: 30 } } });

            changes.reset(null);

            expect(changes).toHaveProperty('diffs', {});
        });

        // calling changeComponent with a non-existent component ID should not throw an error and should not modify the diffs object
        xit('should not modify the diffs object when changeComponent is called with a non-existent component ID', () => {
            const context = { components: {} };
            const changes = new Changes(context);
            changes.changeComponent('nonExistentComponent', 'property1', 'value1');
            expect(changes.diffs).toEqual({});
        });

        // calling upsertComponent with a non-existent component ID, a new property key, and a new value should add the new component to the diffs object with the new property and value
        xit('should add the new component to the diffs object with the new property and value when upsertComponent is called with a non-existent component ID, a new property key, and a new value', () => {
            const context = { components: {} };
            const changes = new Changes(context);
            changes.upsertComponent('newComponent', 'property1', 'value1');
            expect(changes.diffs).toEqual({ newComponent: { property1: 'value1' } });
        });

        // calling upsertComponent with a non-existent component ID, an existing property key, and a new value should add the new component to the diffs object with the new property and value
        xit('should add the new component to the diffs object with the new property and value when upsertComponent is called with a non-existent component ID, an existing property key, and a new value', () => {
            const context = { components: {} };
            const changes = new Changes(context);
            changes.upsertComponent('newComponent', 'property1', 'value1');
            changes.upsertComponent('newComponent', 'property1', 'newValue');
            expect(changes.diffs).toEqual({ newComponent: { property1: 'newValue' } });
        });
    });
}