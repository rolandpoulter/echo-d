import { jest } from '@jest/globals'

import example from '../../example.js';
import spec from '../../spec.js';

import * as echo from '../../../lib/index.js';

describe('echo', () => { 
    test('should be defined', async () => {
        expect(echo).toBeDefined();
    })
    
    const specOptions = {
        describe,
        it: test,
        expect,
        mock: jest.fn,
        spy: jest.spyOn,
        xdescribe,
        xit,
    }
    
    spec(echo, specOptions)
    example(echo, specOptions)
})