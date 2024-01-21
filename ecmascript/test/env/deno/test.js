// import { assertExists } from 'https://deno.land/std@0.210.0/assert/mod.ts';
/*
import {
    // assertSpyCall,
    // assertSpyCalls,
    spy,
} from "https://deno.land/std@0.210.0/testing/mock.ts";
*/
import { expect } from 'https://deno.land/x/expect/mod.ts'
import { fn } from "https://deno.land/x/expect@v0.4.0/mock.ts";
import {
    // afterEach,
    // beforeEach,
    describe,
    it,
} from "https://deno.land/std@0.210.0/testing/bdd.ts";

import * as echo from '../../../lib/index.js'

import example from '../../example.js';
import spec from '../../spec.js';

function spy (o, m) {
    return o[m] = fn(o[m])
}

describe('echo', () => {
    it('should be defined', () => {
        expect(echo).toBeDefined()
    })
    
    const specOptions = { describe, it, expect, mock: fn, spy }
    
    spec(echo, specOptions)
    example(echo, specOptions)
})


