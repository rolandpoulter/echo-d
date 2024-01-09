import { Context } from '../context'
import { manyHandler } from '../handler'
import { Options } from '../options'

/**
 * Creates a new instance of the CoreActions class that extends the provided Parent class
 * 
 * @param {any} Parent - The class to be extended by the CoreActions class. 
 * @returns {any} - A new class that extends the provided Parent class and the CoreActions class.
 */
export const CoreActionsFactory = (Parent: any = Object): any => class CoreActions extends Parent {
  /**
   * Processes a batch of payloads in the current context.
   *
   * @param {any[]} payload - The array of payloads to be processed.
   * @param {Context} context - The current context in which the payloads are to be processed.
   * @param {Options | any} options - The options for processing the payloads. If an instance of Options is not provided, a new one will be created.
   */
  batch (payload: any[], context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)

    manyHandler(payload, context, options)
  }

  // grouped() {}

  // tick() {}

  // tock() {}
}

/**
 * The CoreActions class provides the core functionality for managing actions in your application.
 */
export class CoreActions extends CoreActionsFactory() { }

const __CoreActions__ = new CoreActions()

/**
 * An object that maps the names of actions to their corresponding methods in the CoreActions class.
 */
export const actions = {
  /**
   * Processes a batch of payloads in the current context.
   */
  batch: __CoreActions__.batch
}

export default actions