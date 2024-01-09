import { actions as nodeActions } from './node'

// TODO: replace this with options.isClient

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
  actors() {},

  /**
   * Disable actions that should not be handled on the client.
   */
  components() {},

  /**
   * Disable actions that should not be handled on the client.
   */
  entities() {},

  /**
   * Disable actions that should not be handled on the client.
   */
  symbol() {},

  /**
   * Disable actions that should not be handled on the client.
   */
  symbols() {}
}

export default actions
