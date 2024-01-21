// import { Context } from './index.js';
import * as Constants from './constants.js';
import { actions as defaultActions } from './node.js';
/**
 * The Options class represents the options for a node.
 */
export class Options {
    actions;
    batchActionPayloadSizes;
    compressStringsAsInts;
    defaultSymbols;
    enableRollback;
    enableQuerying;
    enumDefaultSymbols;
    getActorId;
    getGroupedValue;
    indexes;
    isAuthority;
    isAsyncStorage;
    isComponentRelay;
    isDiffed;
    isGroupedComponents;
    isOrdered;
    isReadOnly;
    isSymbolLeader;
    isSymbolRelay;
    onUpdate;
    pageSize;
    responder;
    skipPending;
    types;
    setGroupedValue;
    updateOptions;
    worldOptions;
    // [key: string]: any;
    /**
     * Ensures that the provided options are an instance of Options.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionsThis - The context for the actions.
     * @returns {Options} - An instance of Options.
     */
    static ensure(options = {}, actionsThis) {
        return options instanceof Options ? options : new Options(options, actionsThis);
    }
    /**
     * Constructs a new Options object.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionsThis - The context for the actions.
     */
    constructor(options = {}, actionsThis = null) {
        const { actions = actionsThis || defaultActions, batchActionPayloadSizes = Constants.batchActionPayloadSizes, compressStringsAsInts = Constants.defaultOptions.compressStringsAsInts, defaultSymbols = Constants.DefaultSymbols, enableRollback = Constants.defaultOptions.enableRollback, enableQuerying = Constants.defaultOptions.enableQuerying, enumDefaultSymbols = Constants.enumDefaultSymbols, getActorId = Constants.defaultGetActorId, getGroupedValue = Constants.defaultGetGroupedValue, indexes = Constants.defaultOptions.indexes, isAuthority = Constants.defaultOptions.isAuthority, isAsyncStorage = Constants.defaultOptions.isAsyncStorage, isComponentRelay = Constants.defaultOptions.isComponentRelay, isDiffed = Constants.defaultOptions.isDiffed, isGroupedComponents = Constants.defaultOptions.isGroupedComponents, isOrdered = Constants.defaultOptions.isOrdered, isReadOnly = Constants.defaultOptions.isReadOnly, isSymbolLeader = Constants.defaultOptions.isSymbolLeader, isSymbolRelay = Constants.defaultOptions.isSymbolRelay, onUpdate = null, pageSize = Constants.defaultOptions.pageSize, responder = Constants.voidResponder, skipPending = Constants.defaultOptions.skipPending, types = Constants.defaultOptions.types, setGroupedValue = Constants.defaultSetGroupedValue, updateOptions: overridenUpdateOptions = {}, worldOptions = null,
        // ...otherOptions
         } = options;
        const updateOptions = {
            ...Constants.defaultUpdateOptions,
            ...overridenUpdateOptions
        };
        updateOptions.validKeys = !overridenUpdateOptions?.validKeys
            ? null
            : {
                ...Constants.defaultValidKeys,
                ...(overridenUpdateOptions?.validKeys || {})
            };
        this.actions = actions;
        this.batchActionPayloadSizes = batchActionPayloadSizes;
        this.compressStringsAsInts = compressStringsAsInts;
        this.defaultSymbols = defaultSymbols;
        this.enableRollback = enableRollback;
        this.enableQuerying = enableQuerying;
        this.enumDefaultSymbols = enumDefaultSymbols;
        this.getActorId = getActorId;
        this.getGroupedValue = getGroupedValue;
        this.indexes = indexes;
        this.isAuthority = isAuthority;
        this.isAsyncStorage = isAsyncStorage;
        this.isComponentRelay = isComponentRelay;
        this.isDiffed = isDiffed;
        this.isGroupedComponents = isGroupedComponents;
        this.isOrdered = isOrdered;
        this.isReadOnly = isReadOnly;
        this.isSymbolLeader = isSymbolLeader;
        this.isSymbolRelay = isSymbolRelay;
        this.onUpdate = onUpdate;
        this.pageSize = pageSize;
        this.responder = responder;
        this.skipPending = skipPending;
        this.types = types;
        this.setGroupedValue = setGroupedValue;
        this.updateOptions = updateOptions;
        this.worldOptions = worldOptions;
        // Object.assign(this, otherOptions)
    }
    /**
     * Creates a new Options object from the current one.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionThis - The context for the actions.
     */
    clone() {
        return new Options({ ...this }, this.actions);
    }
    /**
     * Extends the current Options object.
     *
     * @param {Options | OptionsProps | Object} options - The options for the node.
     * @param {any} actionThis - The context for the actions.
     */
    extend(options, actionThis = this.actions) {
        return new Options({ ...this, ...options }, actionThis);
    }
}
export default Options;
