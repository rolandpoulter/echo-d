import { StorageInterface } from './storage'
import { typeOf } from './utils'

/**
 * The ChangesInput interface represents the input for changes.
 *
 * @property {Record<string, any>} diffs - The diffs.
 */
interface ChangesInput {
    diffs?: Record<string, any>;
}

/**
 * The Changes class provides methods for managing changes in a context.
 *
 * @property {StorageInterface} store - The storage in which changes are to be managed.
 * @property {Record<string, any>} diffs - The diffs of the changes.
 */
export class Changes {
    private store: StorageInterface;
    private diffs: Record<string, any>;

    /**
     * Creates a new instance of the Changes class.
     *
     * @param {StorageInterface} store - The store in which changes are to be managed.
     * @param {ChangesInput} changes - An optional initial set of changes.
     */
    constructor(store: StorageInterface, changes?: ChangesInput) {
        this.store = store
        this.diffs = changes?.diffs || {}
    }

    /**
     * Changes a component in the current context.
     *
     * @param {string} id - The ID of the component to be changed.
     * @param {string} key - The key of the property to be changed.
     * @param {any} newValue - The new value of the property.
     * @param {any} prevValue - The previous value of the property.
     * @param {boolean} isAsyncStorage - Whether the storage is asynchronous.
     * @returns {Promise<any[]>} The new value.
     */
    changeComponent(id: string, key: string, newValue: any, prevValue: any, isAsyncStorage: boolean = false): Promise<any[]> {
        return this.upsertComponent(id, key, newValue, prevValue, isAsyncStorage)
    }

    /**
     * Retrieves the changes of a value.
     *
     * @param {string} id - The ID of the component.
     * @param {string} key - The key of the property.
     * @param {any} storedValue - The stored value.
     * @returns {Record<string, any>} The diffs.
     */
    getValue(id: string, key: string, storedValue: any): Record<string, any> {
        const diffedValue = this.diffs[id]?.[key]

        if (diffedValue === undefined || diffedValue === null) {
            return storedValue
        }

        return diffedValue
    }

    /**
     * Resets the changes to a new set of changes or an empty object if no changes are provided.
     *
     * @param {ChangesInput} changes - The new set of changes.
     * @returns {Changes} The instance of the Changes class.
     */
    reset(changes?: ChangesInput): Changes {
        this.diffs = changes?.diffs || {}
        return this
    }

    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     *
     * @param {string} id - The ID of the component to be updated or inserted.
     * @param {string} key - The key of the property to be updated or inserted.
     * @param {any} newValue - The new value of the property.
     * @param {any} _prevValue - The previous value of the property.
     * @param {boolean} isAsyncStorage - Whether the storage is asynchronous.
     * @returns {Promise<any[]>} The new value.
     */
    upsertComponent(id: string, key: string, newValue: any, _prevValue: any, isAsyncStorage: boolean = false): Promise<any> | any {
        this.diffs[id] = this.diffs[id] || {}
        const currentScopeOrPromise = this.store.findComponents(id)

        const promises: Promise<any>[] = [];

        const completeUpsertComponent = (currentScope: any) => {
            if (currentScope === undefined || currentScope === null) {
                this.diffs[id][key] = newValue

                const promise: any = this.store.storeComponent(id, key, newValue)
                if (isAsyncStorage && promise instanceof Promise) {
                    promises.push(promise)
                }

                return newValue
            }

            let diffObject = this.diffs[id]
            const recursiveDiff = (key: string, diff: any, scope: any, currVal: any): [any, any] => {
                let nextVal = currVal

                if (!scope) {
                    return [diff, nextVal]
                }

                const prevType = typeOf(scope[key])
                const nextType = typeOf(nextVal)

                if (prevType !== nextType) {
                    diff[key] = nextVal
                    diff = diff[key]
                    return [diff, nextVal]
                }

                switch (nextType) {
                    case 'bigint':
                    case 'number': {
                        const v1 = scope[key]
                        const v2 = nextVal
                        const d = v2 - v1
                        // scope[key] = v2
                        diff[key] = d
                        break
                    }
                    case 'array':
                        diff = diff[key]
                        scope = scope[key]
                        for (let i = 0; i < nextVal.length; i += 1) {
                            // if (nextVal[i] === undefined || nextVal[i] === null) {
                            //   nextVal[i] = []
                            // }
                            recursiveDiff(i.toString(), diff, scope, nextVal[i])
                        }
                        break
                    case 'object':
                        diff = diff[key]
                        scope = scope[key]
                        for (const k in nextVal) {
                            // if (nextVal[k] === undefined || nextVal[k] === null) {
                            //   nextVal[k] = {}
                            // }
                            recursiveDiff(k, diff, scope, nextVal[k])
                        }
                        break
                    case 'string':
                    // TODO: append with deletes?
                    case 'boolean':
                    default:
                        diff[key] = nextVal
                }

                diff = diff[key]
                nextVal = nextVal[key]
                return [diff, currVal]
            }

            [diffObject, newValue] = recursiveDiff(key, diffObject, currentScope, newValue)

            const promise: any = this.store.storeComponent(id, key, newValue)
            if (isAsyncStorage && promise instanceof Promise) {
                promises.push(promise)
            }

            return newValue
        }

        if (isAsyncStorage && currentScopeOrPromise instanceof Promise) {
            return new Promise((resolve, reject) => {
                currentScopeOrPromise.then((currentScope: any) => {
                    completeUpsertComponent(currentScope)
                    if (promises.length === 0) {
                        return Promise.all(promises).then(() => resolve(newValue), reject)
                    }
                    return resolve(newValue)
                })
            })
        }

        return completeUpsertComponent(currentScopeOrPromise)
    }
}

export default Changes