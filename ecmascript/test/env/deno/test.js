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

import changesSpec from '../../spec/changes.js';
import contextSpec from '../../spec/context.js';
import emitterSpec from '../../spec/emitter.js';
import handlerSpec from '../../spec/handler.js';
import optionsSpec from '../../spec/options.js';
import orderedSpec from '../../spec/ordered.js';
import pendingSpec from '../../spec/pending.js';
import storageSpec from '../../spec/storage.js';
import symbolsSpec from '../../spec/symbols.js';
import updaterSpec from '../../spec/updater.js';
import utilsSpec from '../../spec/utils.js';

function spy (o, m) {
    return o[m] = fn(o[m])
}

describe('echo', () => {
    it('should be defined', () => {
        expect(echo).toBeDefined()
    })
    
    const specOptions = { describe, it, expect, mock: fn, spy }
    
    changesSpec(echo, specOptions)
    contextSpec(echo, specOptions)
    emitterSpec(echo, specOptions)
    handlerSpec(echo, specOptions)
    optionsSpec(echo, specOptions)
    orderedSpec(echo, specOptions)
    pendingSpec(echo, specOptions)
    storageSpec(echo, specOptions)
    symbolsSpec(echo, specOptions)
    updaterSpec(echo, specOptions)
    utilsSpec(echo, specOptions)
})


