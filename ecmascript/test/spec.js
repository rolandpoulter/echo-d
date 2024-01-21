import actorActionsSpec from './spec/actions/actor.js';
import componentActionsSpec from './spec/actions/components.js';
import coreActionsSpec from './spec/actions/core.js';
import entityActionsSpec from './spec/actions/entity.js';
import symbolActionsSpec from './spec/actions/symbol.js';

import extraBecsyStorageSpec from './spec/extra/storage/becsy.js';
import extraBitECSStorageSpec from './spec/extra/storage/bitecs.js';
import extraMiniplexStorageSpec from './spec/extra/storage/miniplex.js';

import extraRunLoopSpec from './spec/extra/runloop.js';
import extraSystemSpec from './spec/extra/system.js';

import indexSpec from './indexes/index.js';
import componentsIndexSpec from './indexes/components.js';
import sortedIndexSpec from './indexes/sorted.js';
import spatialIndexSpec from './indexes/spatial.js';

import changesSpec from './spec/changes.js';
import clientSpec from './spec/client.js';
import constantsSpec from './spec/constants.js';
import contextSpec from './spec/context.js';
import emitterSpec from './spec/emitter.js';
import handlerSpec from './spec/handler.js';
import optionsSpec from './spec/options.js';
import orderedSpec from './spec/ordered.js';
import pendingSpec from './spec/pending.js';
import storageSpec from './spec/storage.js';
import symbolsSpec from './spec/symbols.js';
import updaterSpec from './spec/updater.js';
import utilsSpec from './spec/utils.js';

export default function spec(echo, specOptions) {
    actorActionsSpec(echo, specOptions)
    componentActionsSpec(echo, specOptions)
    coreActionsSpec(echo, specOptions)
    entityActionsSpec(echo, specOptions)
    symbolActionsSpec(echo, specOptions)

    extraBecsyStorageSpec(echo, specOptions)
    extraBitECSStorageSpec(echo, specOptions)
    extraMiniplexStorageSpec(echo, specOptions)

    extraRunLoopSpec(echo, specOptions)
    extraSystemSpec(echo, specOptions)

    indexSpec(echo, specOptions)
    componentsIndexSpec(echo, specOptions)
    sortedIndexSpec(echo, specOptions)
    spatialIndexSpec(echo, specOptions)

    changesSpec(echo, specOptions)
    clientSpec(echo, specOptions)
    constantsSpec(echo, specOptions)
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
}