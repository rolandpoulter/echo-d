import { expect, test, describe, mock, spyOn } from 'bun:test'

import * as echo from '../../../src/index.ts'

import example from '../../example.js';
import spec from '../../spec.js';

describe('echo', () => {
    test('should be defined', () => {
        expect(echo).toBeDefined()
    })
    
    const specOptions = { describe, it: test, expect, mock, spy: spyOn }
    
    spec(echo, specOptions)
    example(echo, specOptions)
})
