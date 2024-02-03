import { Index } from './index.js';
import { binarySearch } from '../utils.js';
/**
 * The SpatialIndex class represents a spatial index.
 */
export class SpatialIndex extends Index {
    constructor(items = [], { cellSize = 5 } = {}) {
        super(items);
        this.cellSize = cellSize;
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
        return new SpatialIndex(this.items);
    }
    /**
     * The get method gets a value from the index.
     *
     * @param {V} value - The value to get from the index.
     * @returns {ID[]} The value from the index.
     */
    get(value) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        if (ids) {
            return ids;
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
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        if (id === undefined) {
            return !!ids;
        }
        if (ids) {
            return ids.indexOf(id) !== -1;
        }
        return false;
    }
    /**
     * The hash method hashes 2D or 3D value.
     * @param {number[]} value - The 2D or 3D value to hash.
     * @returns {number} The hash of the value.
     */
    hash(value) {
        if (value.length === 2) {
            return this.hash2d(value[0], value[1]);
        }
        return this.hash3d(value[0], value[1], value[2]);
    }
    /**
     * The hash2d method hashes a 2D value.
     * @param {number} x - The X value to hash.
     * @param {number} y - The Y value to hash.
     * @returns {number} The hash of the 3D value.
     */
    hash2d(x = 0, y = 0) {
        const ix = Math.floor((x + 1000) / this.cellSize), iy = Math.floor((y + 1000) / this.cellSize);
        return ((ix * 73856093) ^ (iy * 19349663)); // % 5000; // 5000 is size of hash table.
    }
    /**
     * The hash3d method hashes a 3D value.
     * @param {number} x - The X value to hash.
     * @param {number} y - The Y value to hash.
     * @param {number} z - The Z value to hash.
     * @returns {number} The hash of the 3D value.
     */
    hash3d(x = 0, y = 0, z = 0) {
        const ix = Math.floor((x + 1000) / this.cellSize), iy = Math.floor((y + 1000) / this.cellSize), iz = Math.floor((z + 1000) / this.cellSize);
        return ((ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791)); // % 5000; // 5000 is size of hash table.
    }
    /**
     * The remove method removes a value from the index.
     *
     * @param {T} value - The value to remove from the index.
     * @returns {number[]} The value removed from the index.
     */
    remove(value, id) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        const [index] = binarySearch(ids, id);
        if (index === -1) {
            ids.splice(index, 1);
        }
        if (ids.length === 0) {
            delete this.items[hash];
        }
        return [hash, index];
    }
    /**
     * The set method sets a value to the index.
     *
     * @param {T} value - The value to set to the index.
     * @param {ID} id - The ID of the value to set to the index.
     * @returns {number[]} The index of the value being set.
     */
    set(value, id) {
        const hash = this.hash(value);
        this.items[hash] = this.items[hash] || [];
        const ids = this.items[hash];
        const [index, left] = binarySearch(ids, id);
        if (index === -1) {
            ids.splice(left, 0, id);
        }
        return [hash, index];
    }
    /**
     * The query method queries the manager.
     *
     * @param {V} query - The query to use.
     * @returns {ID[]} The result of the query.
     */
    query(query) {
        let results = [];
        const o = this.cellSize;
        const dims = query.length === 2 ? 2 : 3;
        if (dims === 2) {
            const [x, y] = query;
            for (let xx = -o * 2; xx < o * 2 + o; xx += o) {
                for (let yy = -o * 2; yy < o * 2 + o; yy += o) {
                    const ids = this.items[this.hash2d(x + xx, y + yy)];
                    if (ids !== undefined) {
                        results = results.concat(ids);
                    }
                }
            }
        }
        else {
            const [x, y, z] = query;
            for (let xx = -o * 2; xx < o * 2 + o; xx += o) {
                for (let yy = -o * 2; yy < o * 2 + o; yy += o) {
                    for (let zz = -o * 2; zz < o * 2 + o; zz += o) {
                        const ids = this.items[this.hash3d(x + xx, y + yy, z + zz)];
                        if (ids !== undefined) {
                            results = results.concat(ids);
                        }
                    }
                }
            }
        }
        return results;
    }
}
