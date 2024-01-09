export const ArrayTypes = new Map([
    // ['eid', Uint32Array],
    // ['sid', Uint32Array],
    
    // ['sym', String],
    
    ['i8', Int8Array],
    ['ui8', Uint8Array],
    ['ui8c', Uint8ClampedArray],
    ['i16', Int16Array],
    ['ui16', Uint16Array],
    ['i32', Int32Array],
    ['ui32', Uint32Array],
    ['f32', Float32Array],
    ['f64', Float64Array],

    // ['str', String],
    // ['num', Number],
    // ['bool', Boolean],
    // ['map', Map],
    // ['set', Set],
    // ['arr', Array],
] as Iterable<readonly [string, any]>)
