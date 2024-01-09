import { typeOf } from './utils.js';
/**
 * The Changes class provides methods for managing changes in a context.
 *
 * @property {Context} context - The context in which changes are to be managed.
 * @property {Record<string, any>} diffs - The diffs of the changes.
 */
export class Changes {
    context;
    diffs;
    /**
     * Creates a new instance of the Changes class.
     *
     * @param {Context} context - The context in which changes are to be managed.
     * @param {ChangesInput} changes - An optional initial set of changes.
     */
    constructor(context, changes) {
        this.context = context;
        this.diffs = changes?.diffs || {};
    }
    /**
     * Changes a component in the current context.
     *
     * @param {string} id - The ID of the component to be changed.
     * @param {string} key - The key of the property to be changed.
     * @param {any} newValue - The new value of the property.
     */
    changeComponent(id, key, newValue) {
        return this.upsertComponent(id, key, newValue);
    }
    /**
     * Retrieves the changes of a value.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the property.
     * @returns {Record<string, any>} The diffs.
     */
    getValue(id, key) {
        return this.diffs[id]?.[key];
    }
    /**
     * Resets the changes to a new set of changes or an empty object if no changes are provided.
     *
     * @param {ChangesInput} changes - The new set of changes.
     * @returns {Changes} The instance of the Changes class.
     */
    reset(changes) {
        this.diffs = changes?.diffs || {};
        return this;
    }
    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     *
     * @param {string} id - The ID of the component to be updated or inserted.
     * @param {string} key - The key of the property to be updated or inserted.
     * @param {any} newValue - The new value of the property.
     * @returns {any} The new value.
     */
    upsertComponent(id, key, newValue) {
        this.diffs[id] = this.diffs[id] || {};
        const context = this.context;
        const components = context.components;
        const currentScope = components[id];
        let diffObject = this.diffs[id];
        const recursiveDiff = (key, diff, scope, nextVal) => {
            if (!scope) {
                return [diff, nextVal];
            }
            const prevType = typeOf(scope[key]);
            const nextType = typeOf(nextVal);
            if (prevType !== nextType) {
                diff[key] = nextVal;
                diff = diff[key];
                return [diff, nextVal];
            }
            switch (nextType) {
                case 'bigint':
                case 'number': {
                    const v1 = scope[key];
                    const v2 = nextVal;
                    const d = v2 - v1;
                    scope[key] = v2;
                    diff[key] = d;
                    break;
                }
                case 'array':
                    diff = diff[key];
                    scope = scope[key];
                    for (let i = 0; i < nextVal.length; i += 1) {
                        recursiveDiff(i.toString(), diff, scope, nextVal[i]);
                    }
                    break;
                case 'object':
                    diff = diff[key];
                    scope = scope[key];
                    for (const k of Object.keys(nextVal)) {
                        recursiveDiff(k, diff, scope, nextVal[k]);
                    }
                    break;
                default:
                    diff[key] = nextVal;
            }
            diff = diff[key];
            nextVal = nextVal[key];
            return [diff, nextVal];
        };
        [diffObject, newValue] = recursiveDiff(key, diffObject, currentScope, newValue);
        return newValue;
    }
}
export default Changes;
