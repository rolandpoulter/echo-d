import { Index } from './index.js';
import { binaryInsert } from '../utils.js';
/**
 * binaryInsertID inserts an ID value into a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} value - The value to insert
 * @param {any} id - The ID of the value to insert
 * @returns {number[]} The index of the inserted value
 */
function binaryInsertID(items, value, id) {
    if (!items) {
        return [0, 0];
    }
    const low = binaryInsert(items, value, (item) => item[0]);
    const item = items[low];
    const v = item; // [0] || item;
    if (v === value) {
        const ids = item[1];
        const i = ids.indexOf(id);
        if (i === -1) {
            ids.push(id);
            return [low, ids.length - 1];
        }
        else {
            // return [low, i]
        }
    }
    else {
        const ids = [id];
        items.splice(low, 0, [value, ids]);
        return [low, 0];
    }
    return [-1, -1];
}
/**
 * binaryRemove removes a value from a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} value - The value to remove
 * @param {any} id - The ID of the value to remove
 * @returns {number[]} The index of the removed value
 */
function binaryRemoveID(items, value, id) {
    if (!items) {
        return [-1, -1];
    }
    const low = binaryInsert(items, value, (item) => item[0]);
    const item = items[low];
    const v = item; // [0] || item;
    if (v === value) {
        const ids = item[1];
        const i = ids.lastIndexOf(id);
        if (i !== -1) {
            ids.splice(i, 1);
            if (ids.length === 0) {
                items.splice(low, 1);
            }
            return [low, i];
        }
    }
    return [-1, -1];
}
/**
 * SortedIndex class represents a sorted index.
 */
export class SortedIndex extends Index {
    constructor(items = [], _options = {}) {
        super(items);
    }
    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = [];
    }
    /**
     * The clone method clones the index.
     */
    clone() {
        return new SortedIndex(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {V} value - The value to get from the index.
     * @returns {ID[]} The value from the index.
     */
    get(value) {
        const item = this.items.find((item) => item[0] === value);
        if (item) {
            return item[1];
        }
        return [];
    }
    /**
     * The has method checks if a value is in the index.
     *
     * @param {V} value - The value to check in the index.
     * @param {ID} id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(value, id) {
        const item = this.items.find((item) => item[0] === value);
        if (id === undefined) {
            return !!item;
        }
        if (item) {
            const ids = item[1];
            return ids.indexOf(id) !== -1;
        }
        return false;
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {T} value - The value to remove from the index.
     * @returns {number[]} The value removed from the index.
     */
    remove(value, id) {
        const indexes = binaryRemoveID(this.items, value, id);
        return indexes;
        // return indexes[0] === -1 || indexes[1] === -1 ? null : value 
    }
    /**
     * The set method sets a value to the index.
     *
     * @param {T} value - The value to set to the index.
     * @param {ID} id - The ID of the value to set to the index.
     * @returns {number[]} The index of the value being set.
     */
    set(value, id) {
        const indexes = binaryInsertID(this.items, value, id);
        return indexes;
    }
    /**
     * The query method queries the manager.
     *
     * @param {V} query - The query to use.
     * @returns {ID[]} The result of the query.
     */
    query(query) {
        // if (query && typeof query === 'object') {}
        return this.get(query);
    }
}
