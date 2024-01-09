import { Index } from './index'
import { 
    // SetExperimental,
    differenceSets,
    intersectionSets,
    unionSets,
} from '../utils'

/**
 * The Index class represents an index.
 */
export class ComponentsIndex<V, ID> extends Index<V, ID> {
    declare items: {
        [key: string]: Set<ID>;
    };

    constructor(items: any = {}, _options: any = {}) {
        super(items)
    }

    /**
     * The clear method clears the index.
     */
    clear() {
        this.items = {}
    }

    /**
     * The clone method clones the index.
     */
    clone(): any {
        return new Index(this.items)
    }

    /**
     * The get method gets a value from the index.
     *
     * @param {any} value - The value to get from the index.
     * @returns {any} The value from the index.
     */
    get(value: any): any {
        return this.items[value]
    }

    /**
     * The has method checks if a value is in the index.
     *
     * @param {any} value - The value to check in the index.
     * @param {any} id - The ID of the value to check in the index.
     * @returns {boolean} True if the value is in the index, false otherwise.
     */
    has(value: any, id: any): boolean {
        const ids = this.items[value]
        if (ids && ids.has(id)) {
            return true
        }
        return false
    }

    /**
     * The remove method removes a value from the index.
     * 
     * @param {any} value - The value to remove from the index.
     * @param {any} id - The ID of the value to remove from the index.
     * @returns {any} The value removed from the index.
     */
    remove(value: any, id: any): any {
        const ids = this.items[value]
        if (ids && ids.has(id)) {
            ids.delete(id)
            return true
        }
    }

    /**
     * The set method sets a value to the index.
     *
     * @param {any} value - The value to set to the index.
     * @param {any} id - The ID to set to the index.
     * @returns {any} The value being set.
     */
    set(value: any, id: any): any {
        this.items[value] = this.items[value] || new Set()
        if (this.items[value].has(id)) {
            return false
        }
        this.items[value].add(id)
        return true
    }

    /**
     * The union method creates an union of two indexes.
     * 
     * @param {string} key - The key of the index.
     * @param {Index} other - The other index.
     * @returns {Index} The union of the indexes.
     */
    union(key: string, other: ComponentsIndex<V, ID>): ComponentsIndex<V, ID> {
        return new ComponentsIndex({
            ...this.items,
            [key]: unionSets(this.items[key], other.items[key])
        })
    }

    /**
     * The difference method creates a difference of two indexes.
     * 
     * @param {string} key - The key of the index.
     * @param {Index} other - The other index.
     * @returns {Index} The difference of the indexes.
     */
    difference(key: string, other: ComponentsIndex<V, ID>): ComponentsIndex<V, ID> {
        return new ComponentsIndex({
            ...this.items,
            [key]: differenceSets(this.items[key], other.items[key])
        })
    }

    /**
     * The intersection method creates an intersection of two indexes.
     * 
     * @param {string} key - The key of the index.
     * @param {Index} other - The other index.
     * @returns {Index} The intersection of the indexes.
     */
    intersection(key: string, other: ComponentsIndex<V, ID>): ComponentsIndex<V, ID> {
        return new ComponentsIndex({
            ...this.items,
            [key]: intersectionSets(this.items[key], other.items[key])
        })
    }

     /**
     * The query method queries the index.
     *
     * @param {any} query - The query to use.
     * @returns {any[]} The result of the query.
     */
     query (query: any): Set<any> {
        const {
            with: with_,
            without,
            // where,
        } = query || {}

        let matches = new Set<any>()
        if (with_) {
            for (const key of with_) {
                const ids = this.items[key]
                if (ids) {
                    matches = unionSets(matches, ids)
                }
            }
        }

        if (without) {
            for (const key of without) {
                const ids = this.items[key]
                if (ids) {
                    matches = differenceSets(matches, ids)
                }
            }
        }

        return matches
    }
}