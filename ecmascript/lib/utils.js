/**
 * Creates a union of multiple sets or arrays.
 *
 * @param {...Array<SetOrArray<any>>} sets - The sets or arrays to be united.
 * @returns {Array<string>} The union of the sets or arrays.
 */
export function unionSetOrArray(...sets) {
    const union = {};
    for (const set of sets) {
        if (set) {
            for (const v of set) {
                union[v] = true;
            }
        }
    }
    return Object.keys(union);
}
/**
 * Creates an union of two sets.
 *
 * @param {SetExperimental} setA - The first set.
 * @param {SetExperimental} setB - The second set.
 * @returns {Set<any>} The union of the sets.
 */
export function unionSets(setA, setB) {
    if (typeof setA.union === 'function') {
        return setA.union(setA);
    }
    const union = new Set();
    for (const v of setA)
        union.add(v);
    for (const v of setB)
        union.add(v);
    return union;
}
/**
 * Creates an difference of the two sets.
 *
 * @param {SetExperimental} setA - The first set.
 * @param {SetExperimental} setB - The second set.
 * @returns {Set<any>} The difference of the sets.
 */
export function differenceSets(setA, setB) {
    if (typeof setA.difference === 'function') {
        return setA.difference(setA);
    }
    const difference = new Set();
    for (const v of setA)
        if (!setB.has(v))
            difference.add(v);
    return difference;
}
/**
 * Creates an intersection of the two sets.
 *
 * @param {SetExperimental} setA - The first set.
 * @param {SetExperimental} setB - The second set.
 * @returns {Set<any>} The intersection of the sets.
 */
export function intersectionSets(setA, setB) {
    if (typeof setA.intersection === 'function') {
        return setA.intersection(setA);
    }
    const intersection = new Set();
    for (const v of setA)
        if (setB.has(v))
            intersection.add(v);
    return intersection;
}
/**
 * binaryInsert finds the index of where a value should be inserted into a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} value - The value to insert
 * @param {Function} getValue - The function to get the value from the item
 * @returns {number} The index of where the value should be inserted
 */
export function binaryInsert(items, value, getValue = (v) => v) {
    let low = 0;
    let high = items.length;
    while (low < high) {
        const mid = (low + high) >>> 1;
        const item = items[mid];
        const v = getValue(item);
        if (v < value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    return low;
}
/**
 * binarySearch finds the index of a value in a sorted array.
 *
 * @param {any[]} items - The sorted array
 * @param {any} target - The value to find
 * @param {Function} getValue - The function to get the value from the item
 * @returns {number[]} The index of the value
 */
export function binarySearch(items, target, getValue = (v) => v) {
    let left = 0;
    let right = items.length - 1;
    while (left <= right) {
        const mid = (left + right) >>> 1;
        const item = items[mid];
        const v = getValue(item);
        if (v === target) {
            return [mid, left];
        }
        else if (v < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return [-1, left];
}
/**
 * Creates an enum from a set or an array.
 *
 * @param {SetOrArray<any>} set - The set or array from which the enum is to be created.
 * @param {number} offset - The starting value of the enum.
 * @returns {Record<string, number>} The created enum.
 */
export function createEnum(set, offset = 0) {
    const _enum = {};
    let i = offset;
    if (set) {
        for (const v of set) {
            _enum[v] = i++;
        }
    }
    return _enum;
}
/**
 * Creates a tuple from a message.
 *
 * @param {{ action?: any, payload?: any }} message - The message from which the tuple is to be created.
 * @returns {Array<any>} The created tuple.
 */
export function messageTuple(message) {
    return [message?.action, message?.payload];
}
/**
 * Split an array into pages
 *
 * @param {any[]} array - The array to be split into pages.
 * @param {number} pageSize - The size of each page.
 * @returns {any[][]} The array of pages.
 */
export function paginate(array, pageSize) {
    const pages = [];
    let page = [];
    let i = 0;
    for (const v of array) {
        if (i >= pageSize) {
            pages.push(page);
            page = [];
            i = 0;
        }
        page.push(v);
        i++;
    }
    return pages;
}
/**
 * Determines the type of a value.
 *
 * @param {any} v - The value whose type is to be determined.
 * @returns {string} The type of the value.
 */
export function typeOf(v) {
    const t = typeof v;
    if (t === 'object') {
        if (!v) {
            return 'null';
        }
        else if (Array.isArray(v)) {
            return 'array';
        }
    }
    return t;
}
/**
 * Combines two values.
 *
 * @param {any} objA - The first value.
 * @param {any} objB - The second value.
 * @returns {[boolean, any]} A tuple where the first element is a boolean indicating whether the values were combined, and the second element is the combined value.
 */
export function combineValues(objA, objB) {
    return recursiveCombination(objA, objB);
}
/**
 * Recursively combines two objects or arrays and returns the result.
 * If the combination is successful, it returns a tuple with a boolean indicating success and the combined object/array.
 * If the combination fails, it returns a tuple with a boolean indicating failure and the second object/array.
 * @param objA - The first object/array to combine.
 * @param objB - The second object/array to combine.
 * @returns A tuple with a boolean indicating success/failure and the combined object/array.
 */
export function recursiveCombination(objA, objB) {
    const typeA = typeOf(objA);
    const typeB = typeOf(objB);
    switch (typeB) {
        case 'bigint':
        case 'number': {
            if (typeA !== 'number' && typeA !== 'bigint') {
                return [false, objB];
            }
            return [true, objA + objB];
        }
        case 'array': {
            if (typeA !== 'array') {
                return [false, objB];
            }
            const newArr = [];
            let combined = true;
            for (let i = 0; i < objB.length; i += 1) {
                const [c, value] = recursiveCombination(objA[i], objB[i]);
                newArr[i] = value;
                if (c === false) {
                    combined = false;
                }
            }
            return [combined, newArr];
        }
        case 'object': {
            if (typeA !== 'object') {
                return [false, objB];
            }
            const newObj = {};
            let combined = true;
            for (const k of Object.keys(objB)) {
                const [c, value] = recursiveCombination(objA[k], objB[k]);
                if (c === false) {
                    combined = false;
                }
                newObj[k] = value;
            }
            return [combined, newObj];
        }
        default:
            return [false, objB];
    }
}
