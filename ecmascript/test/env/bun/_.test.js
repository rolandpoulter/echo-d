import { expect, test, describe, mock, spyOn } from 'bun:test'

import * as echo from '../../../src/index.ts'

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

describe('echo', () => {
    test('should be defined', () => {
        expect(echo).toBeDefined()
    })
    
    const specOptions = { describe, it: test, expect, mock, spy: spyOn }
    
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
