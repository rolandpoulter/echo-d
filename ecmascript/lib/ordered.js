/**
 * The Ordered class represents a collection of tick values.
 *
 * @property {OrderedData} order - The collection of tick values.
 */
export class Ordered {
    order;
    /**
     * Constructs a new Ordered object.
     *
     * @param {OrderedData} order - The initial tick values.
     */
    constructor(order = {}) {
        this.order = order;
    }
    /**
     * Changes the tick value of a component.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the component.
     * @param {number} tick - The new tick value.
     * @returns {boolean} Whether the operation was successful.
     */
    changeComponent(id, key, tick) {
        return this.upsertComponent(id, key, tick);
    }
    /**
     * Resets the tick values.
     *
     * @param {OrderedData} order - The new tick values.
     * @returns {Ordered} The Ordered object.
     */
    reset(order = {}) {
        this.order = order;
    }
    /**
     * Inserts or updates the tick value of a component.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the component.
     * @param {number} tick - The new tick value.
     * @returns {boolean} Whether the operation was successful.
     */
    upsertComponent(id, key, tick) {
        if (isNaN(tick)) {
            return false;
        }
        this.order[id] = this.order[id] || {};
        switch (typeof this.order[id][key]) {
            case 'number':
                if (isFinite(this.order[id][key]) && this.order[id][key] < tick) {
                    const threshold = 0;
                    if (tick > (Date.now() + threshold)) {
                        return false;
                    }
                    this.order[id][key] = tick;
                    return true;
                }
                return false;
            case 'undefined':
            default:
                this.order[id][key] = tick;
                return true;
        }
    }
}
export default Ordered;
