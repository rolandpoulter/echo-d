/**
 * The Index class represents an index.
 */
export class Index {
    items;
    constructor(items = null, _options = {}) {
        this.items = items;
    }
    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = null;
    }
    /**
     * The clone method clones the index.
     */
    clone() {
        return new Index(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {any} _value - The value to get from the index.
     * @returns {any} The value from the index.
     */
    get(_value) { }
    /**
     * The has method checks if a value is in the index.
     *
     * @param {any} _value - The value to check in the index.
     * @param {any} _id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(_value, _id) {
        return false;
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {any} _value - The value to remove from the index.
     * @param {any} _id - The ID of the value to remove from the index.
     * @returns {any} The value removed from the index.
     */
    remove(_value, _id) { }
    /**
     * The set method sets a value to the index.
     *
     * @param {any} _value - The value to set to the index.
     * @param {any} _id - The ID to set to the index.
     * @returns {any} The value being set.
     */
    set(_value, _id) {
        return null;
    }
    /**
   * The store method stores a value to the index.
   *
   * @param {ID} id - The ID of the value to store.
   * @param {V} preValue - The previous value to store to the index.
   * @param {V} value - The value to store to the index.
   * @returns The value being stored.
   */
    store(id, preValue, value) {
        if (preValue) {
            this.remove(preValue, id);
        }
        return this.set(value, id);
    }
    /**
     * The query method queries the index.
     *
     * @param {any} _query - The query to use.
     * @returns {any[]} The result of the query.
     */
    query(_query) {
        return [];
    }
}
