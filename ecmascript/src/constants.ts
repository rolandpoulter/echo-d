import { unionSetOrArray, createEnum } from './utils'
import { Types } from './storage'

/**
 * An array of action names.
 */
export const Actions = [
  'actorInput',
  'actors',
  'addSymbol',
  'batch',
  'changeComponent',
  'components',
  'createEntity',
  'entities',
  'fetchSymbol',
  'getSymbol',
  'mergeActors',
  'mergeComponents',
  'mergeEntities',
  'mergeSymbols',
  'mergeSymbol',
  'removeActor',
  'removeComponent',
  'removeEntity',
  'spawnActor',
  'symbol',
  'symbols',
  // 'tick',
  // 'tock',
  'upsertComponent'
]

/**
 * An array of common component names.
 */
export const CommonComponents = [
  'asset',
  'collider',
  'color',
  'hidden',
  'position',
  'rotation',
  'velocity',
  'spin'
]

/**
 * A set of default symbols, which is the union of Actions and CommonComponents.
 */
export const DefaultSymbols = unionSetOrArray(
  Actions,
  CommonComponents
)

/**
 * Padding for the enum.
 */
export const padEnum = 0 // 10;

/**
 * An enum of action names.
 */
export const enumActions = createEnum(Actions, padEnum)

/**
 * An enum of common component names.
 */
export const enumCommonComponents = createEnum(CommonComponents, Actions.length + padEnum)

/**
 * An enum of default symbols.
 */
export const enumDefaultSymbols = createEnum(DefaultSymbols, padEnum)

/**
 * An object that maps action names to their payload sizes.
 */
export const batchActionPayloadSizes = {
  actorInput: { default: 1, rollback: 2 },
  changeComponent: { default: 3, ordered: 4 },
  mergeSymbols: 2,
  removeComponent: 2,
  upsertComponent: { default: 3, ordered: 4 }
}

/**
 * Default options for the application.
 */
export const defaultOptions = {
  compressStringsAsInts: true,
  enableRollback: !true,
  enableQuerying: !true,
  isAuthority: true,
  isAsyncStorage: false,
  isComponentRelay: true,
  isDiffed: false,
  isGroupedComponents: !true,
  isOrdered: !true,
  isReadOnly: false,
  isSymbolLeader: false,
  isSymbolRelay: false,
  pageSize: 100,
  skipPending: false,
  indexes: {
    // asset: { type: 'sorted' },
    // collider: { type: 'sorted' },
    // color: { type: 'sorted' },
    // hidden: { type: 'sorted' },
    position: { type: 'spatial' },
  },
  types: {
    asset: 'str',
    collider: 'str',
    color: ['ui8', 4],
    hidden: 'bool',
    position: ['f32', 3],
    rotation: ['f32', 3],
    velocity: ['f32', 3],
    spin: ['f32', 3],
    size: ['f32', 3],
  }
}

/**
 * Default options for updates.
 */
export const defaultUpdateOptions = {
  mask: {
    actors: true,
    entities: true,
    components: true,
    inputs: true,
    symbols: true
  } && null,
  type: true,
  batched: true,
  batchSize: 100
}

/**
 * An object that maps keys to their validity.
 */
export const defaultValidKeys = {
  asset: true,
  collider: true,
  color: true,
  hidden: true,
  position: true,
  rotation: true,
  velocity: true,
  spin: true,
  size: true,
}

/**
 * A responder function that does nothing and returns nothing.
 */
export function voidResponder (): void { /* void */ }

/**
 * A function that retrieves the actor ID from a payload.
 *
 * @param {string} id - The payload from which the actor ID is to be retrieved.
 * @param {any} _context - The current context. This parameter is not used.
 * @returns {string | undefined} The actor ID, or undefined if it cannot be found.
 */
export function defaultGetActorId (id: string, _context: any): string | undefined {
  return id
}

/**
 * A function that retrieves the grouped value from a payload.
 *
 * @param {any | any[]} value - The payload from which the grouped value is to be retrieved.
 * @param {number} i - The index of the payload.
 * @param {Object} types - An object containing the types.
 * @param {string} key - The key of the grouped value.
 * @returns {any} The value from the group.
 */
export function defaultGetGroupedValue (value: any | any[], i: number, types: Types, key: string): any {
  const type = types[key]
  if (Array.isArray(type)) {
    return value.slice(i * type[1], (i + 1) * type[1])
  }
  return value[i]
}

/**
 * A function that sets the grouped value in a payload.
 *
 * @param {any} value - The payload in which the grouped value is to be set.
 * @param {Object} _types - An object containing the types.
 * @param {string} _key - The key of the grouped value.
 * @returns {any} The value from the group.
 */
export function defaultSetGroupedValue (value: any, _types: Types, _key: string): any {
  return value;
}