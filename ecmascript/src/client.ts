import nodeActions, { NodeActions } from './node'

export class ClientActions extends NodeActions {
  /**
   * Disable actions that should not be handled on the client.
   */
  actors() {}

  /**
   * Disable actions that should not be handled on the client.
   */
  components() {}

  /**
   * Disable actions that should not be handled on the client.
   */
  entities() {}

  /**
   * Disable actions that should not be handled on the client.
   */
  symbol() {}

  /**
   * Disable actions that should not be handled on the client.
   */
  symbols() {}
}

/**
 * An object that maps the names of actions.
 */
export const actions = {
  /**
   * The actions related to nodes, imported from the node module.
   */
  ...nodeActions,

  /**
   * Disable actions that should not be handled on the client.
   */
  actors: null,

  /**
   * Disable actions that should not be handled on the client.
   */
  components: null,

  /**
   * Disable actions that should not be handled on the client.
   */
  entities: null,

  /**
   * Disable actions that should not be handled on the client.
   */
  symbol: null,

  /**
   * Disable actions that should not be handled on the client.
   */
  symbols: null
}

export default actions
