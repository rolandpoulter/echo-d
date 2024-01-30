// import { Context } from '.';
import * as Constants from './constants'
import { actions as defaultActions } from './node'
import { UpdateOptions } from './updater'

/**
 * The OptionsProps interface represents the properties for the Options class.
 *
 * @property {Object} actions - An object containing the `addSymbol` and `getSymbol` functions.
 * @property {Object} batchActionPayloadSizes - An object to specify the payload sizes for batch actions.
 * @property {boolean} compressStringsAsInts - A flag to compress strings as integers.
 * @property {Array<string>} defaultSymbols - An array of default symbols.
 * @property {Object} enumDefaultSymbols - An object containing the default symbols.
 * @property {boolean} enableQuerying - A flag to indicate if querying is enabled.
 * @property {boolean} enableRollback - A flag to indicate if time rollback is enabled on inputs.
 * @property {Function} getActorId - A function to get the actor ID.
 * @property {Function} getGroupedValue - A function to get the value from a group.
 * @property {Object} indexes - An object containing the indexes.
 * @property {boolean} isAuthority - A flag to indicate if the node is an authority.
 * @property {boolean} isAsyncStorage - A flag to indicate if the node uses async storage.
 * @property {boolean} isComponentRelay - A flag to indicate if the node is a component relay.
 * @property {boolean} isDiffed - A flag to indicate if the node is diffed.
 * @property {boolean} isGroupedComponents - A flag to indicate if the node uses grouped components.
 * @property {boolean} isOrdered - A flag to indicate if the node is ticked.
 * @property {boolean} isReadOnly - A flag to indicate if the node is read only.
 * @property {boolean} isSymbolLeader - A flag to indicate if the node is a symbol leader.
 * @property {boolean} isSymbolRelay - A flag to indicate if the node is a symbol relay.
 * @property {Function} onUpdate - A function to call when the node is updated.
 * @property {number} pageSize - The page size.
 * @property {Function} responder - A function to respond to actions.
 * @property {boolean} skipPending - A flag to skip pending actions.
 * @property {Object} types - An object containing the types.
 * @property {Function} setGroupedValue - A function to set the value in a group.
 * @property {Object} storeOptions - An object containing the store options.
 * @property {Object} updateOptions - An object containing the valid keys for updates and any other options.
 * @property {any} worldOptions - An object containing the world options.
 */
export interface OptionsProps {
    actions?: {
        addSymbol?: Function;
        getSymbol?: Function;
    };
    batchActionPayloadSizes?: Object;
    compressStringsAsInts?: boolean;
    defaultSymbols?: Array<string>;
    enableRollback?: boolean;
    enableQuerying?: boolean;
    enumDefaultSymbols?: Object;
    getActorId?: Function;
    getGroupedValue?: Function;
    indexes?: Object;
    isAuthority?: boolean;
    isAsyncStorage?: boolean;
    isComponentRelay?: boolean;
    isDiffed?: boolean;
    isGroupedComponents?: boolean;
    isOrdered?: boolean;
    isReadOnly?: boolean;
    isSymbolLeader?: boolean;
    isSymbolRelay?: boolean;
    onUpdate?: Function;
    pageSize?: number;
    responder?: Function;
    skipPending?: boolean;
    types?: Object;
    setGroupedValue?: Function;
    storeOptions?: Object;
    updateOptions?: UpdateOptions;
    worldOptions?: any;
    // [key: string]: any;
}

/**
 * The Options class represents the options for a node.
 */
export class Options {
    actions: {
        addSymbol: Function;
        getSymbol: Function;
        [key: string]: Function;
    };
    batchActionPayloadSizes: Object;
    compressStringsAsInts: boolean;
    defaultSymbols: Array<string>;
    enableRollback: boolean;
    enableQuerying: boolean;
    enumDefaultSymbols: Object;
    getActorId: Function;
    getGroupedValue: Function;
    indexes: Object;
    isAuthority: boolean;
    isAsyncStorage: boolean;
    isComponentRelay: boolean;
    isDiffed: boolean;
    isGroupedComponents: boolean;
    isOrdered: boolean;
    isReadOnly: boolean;
    isSymbolLeader: boolean;
    isSymbolRelay: boolean;
    onUpdate: Function | null;
    pageSize: number;
    responder: Function;
    skipPending: boolean;
    types: Object;
    setGroupedValue: Function;
    storeOptions: Object;
    updateOptions: UpdateOptions;
    worldOptions: any;
    // [key: string]: any;

    /**
     * Ensures that the provided options are an instance of Options.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionsThis - The context for the actions.
     * @returns {Options} - An instance of Options.
     */
    static ensure(options: Options | OptionsProps = {}, actionsThis: any): Options {
        return options instanceof Options ? options : new Options(options, actionsThis)
    }

    /**
     * Constructs a new Options object.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionsThis - The context for the actions.
     */
    constructor(options: Options | OptionsProps = {}, actionsThis: any = null) {
        const {
            actions = actionsThis || defaultActions,
            batchActionPayloadSizes = Constants.batchActionPayloadSizes,
            compressStringsAsInts = Constants.defaultOptions.compressStringsAsInts,
            defaultSymbols = Constants.DefaultSymbols,
            enableRollback = Constants.defaultOptions.enableRollback,
            enableQuerying = Constants.defaultOptions.enableQuerying,
            enumDefaultSymbols = Constants.enumDefaultSymbols,
            getActorId = Constants.defaultGetActorId,
            getGroupedValue = Constants.defaultGetGroupedValue,
            indexes = Constants.defaultOptions.indexes,
            isAuthority = Constants.defaultOptions.isAuthority,
            isAsyncStorage = Constants.defaultOptions.isAsyncStorage,
            isComponentRelay = Constants.defaultOptions.isComponentRelay,
            isDiffed = Constants.defaultOptions.isDiffed,
            isGroupedComponents = Constants.defaultOptions.isGroupedComponents,
            isOrdered = Constants.defaultOptions.isOrdered,
            isReadOnly = Constants.defaultOptions.isReadOnly,
            isSymbolLeader = Constants.defaultOptions.isSymbolLeader,
            isSymbolRelay = Constants.defaultOptions.isSymbolRelay,
            onUpdate = null,
            pageSize = Constants.defaultOptions.pageSize,
            responder = Constants.voidResponder,
            skipPending = Constants.defaultOptions.skipPending,
            types = Constants.defaultOptions.types,
            setGroupedValue = Constants.defaultSetGroupedValue,
            storeOptions = {},
            updateOptions: overridenUpdateOptions = {},
            worldOptions = null,

            // ...otherOptions
        } = options

        const updateOptions = {
            ...Constants.defaultUpdateOptions,
            ...overridenUpdateOptions
        }

        updateOptions.validKeys = !overridenUpdateOptions?.validKeys
            ? null
            : {
                ...Constants.defaultValidKeys,
                ...(overridenUpdateOptions?.validKeys || {})
            }

        this.actions = actions
        this.batchActionPayloadSizes = batchActionPayloadSizes
        this.compressStringsAsInts = compressStringsAsInts
        this.defaultSymbols = defaultSymbols
        this.enableRollback = enableRollback
        this.enableQuerying = enableQuerying
        this.enumDefaultSymbols = enumDefaultSymbols
        this.getActorId = getActorId
        this.getGroupedValue = getGroupedValue
        this.indexes = indexes
        this.isAuthority = isAuthority
        this.isAsyncStorage = isAsyncStorage
        this.isComponentRelay = isComponentRelay
        this.isDiffed = isDiffed
        this.isGroupedComponents = isGroupedComponents
        this.isOrdered = isOrdered
        this.isReadOnly = isReadOnly
        this.isSymbolLeader = isSymbolLeader
        this.isSymbolRelay = isSymbolRelay
        this.onUpdate = onUpdate
        this.pageSize = pageSize
        this.responder = responder
        this.skipPending = skipPending
        this.types = types
        this.setGroupedValue = setGroupedValue
        this.storeOptions = storeOptions
        this.updateOptions = updateOptions as UpdateOptions
        this.worldOptions = worldOptions
        // Object.assign(this, otherOptions)
    }

    /**
     * Creates a new Options object from the current one.
     *
     * @param {Options | OptionsProps} options - The options for the node.
     * @param {any} actionThis - The context for the actions.
     */
    clone(): Options {
        return new Options({ ...this }, this.actions)
    }

    /**
     * Extends the current Options object.
     *
     * @param {Options | OptionsProps | Object} options - The options for the node.
     * @param {any} actionThis - The context for the actions.
     */
    extend(options: Options | OptionsProps | Object, actionThis: any = this.actions): Options {
        return new Options({ ...this, ...options } as OptionsProps, actionThis)
    }
}

export default Options