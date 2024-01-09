import { Context } from '../context'
import { Emitter } from '../emitter'
import { Options } from '../options'
import { Components } from '../storage'
import {
  extractSymbol,
  recursiveSymbolExtraction
} from '../symbols'

/**
 * Creates a new instance of the ComponentActions class that extends the provided Parent class
 * 
 * @param {any} Parent - The class to be extended by the ComponentActions class. 
 * @returns {any} - A new class that extends the provided Parent class and the ComponentActions class.
 */
export const ComponentActionsFactory = (Parent: any = Object): any => class ComponentActions extends Parent {
  /**
   * Changes a component in the current context.
   *
   * @param {any[]} payload - The payload containing the component's id, key, and the new value.
   * @param {Context} context - The current context in which the component is to be changed.
   * @param {Options | any} options - The options for changing the component. If an instance of Options is not provided, a new one will be created.
   */
  changeComponent (payload: any[], context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { compressStringsAsInts, types, isOrdered } = options

    let [id, key, value] = payload

    let tick = isOrdered ? payload[3] as number : 0

    if (id === undefined || id === null || id === '' ||
      key === undefined || key === null || key === '') { return }

    if (compressStringsAsInts) {
      id = extractSymbol(id, context, options)
      if (!id) { return }
      key = extractSymbol(key, context, options)
      if (!key) { return }
      const type = types[key];
      if (type && (type === String || type[0] === String)) {
        value = recursiveSymbolExtraction(key, value, context, options);
        if (!value) { return; }
      }
    }

    context.changeComponent(id, key, value, tick, options)
  }

  /**
   * Retrieves components from the current context and sends them to the responder.
   *
   * @param {any} payload - The payload containing the request for components.
   * @param {Context} context - The current context from which the components are retrieved.
   * @param {Options | any} options - The options for retrieving components. If an instance of Options is not provided, a new one will be created.
   */
  components (payload: any, context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { responder, isAuthority, isAsyncStorage, pageSize, enableQuerying, enumDefaultSymbols } = options

    if (!isAuthority) { return }

    const sendComponents = (pages: Components[]) => {
      // return responder([enumDefaultSymbols.mergeComponents, components])

      // send pages to responder
      for (const page of pages) {
        responder([
          enumDefaultSymbols.mergeComponents,
          page
        ])
      }
    }

    const ctxComponents = context.getComponents(enableQuerying ? payload : null, pageSize)

    if (isAsyncStorage) {
      (ctxComponents as Emitter<Components[]>).emitTo(sendComponents)
    } else {
      sendComponents(ctxComponents as Components[])
    }
  }

  /**
   * Merges components into the current context.
   *
   * @param {any[]} payload - The payload containing the components to be merged.
   * @param {Context} context - The current context in which the components are to be merged.
   * @param {Options | any} options - The options for merging. If an instance of Options is not provided, a new one will be created.
   */
  mergeComponents (payload: any[], context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)

    context.mergeComponents(payload, options)
  }

  /**
   * Removes a component from the current context.
   *
   * @param {any[]} payload - The payload containing the component's id and key to be removed.
   * @param {Context} context - The current context from which the component is to be removed.
   * @param {Options | any} options - The options for removing the component. If an instance of Options is not provided, a new one will be created.
   */
  removeComponent (payload: any[], context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { compressStringsAsInts } = options

    let [id, key] = payload

    if (id === undefined || id === null || id === '' ||
      key === undefined || key === null || key === '') { return }

    if (compressStringsAsInts) {
      id = extractSymbol(id, context, options)
      if (!id) { return }
      key = extractSymbol(key, context, options)
      if (!key) { return }
    }

    context.removeComponent(id, key, options)
  }

  /**
   * Inserts a new component or updates an existing one in the current context.
   *
   * @param {any[]} payload - The payload containing the component's id, key, and the new value.
   * @param {Context} context - The current context in which the component is to be upserted.
   * @param {OptionsExtended | any} options - The options for upserting the component. If an instance of Options is not provided, a new one will be created.
   */
  upsertComponent (payload: any[], context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { compressStringsAsInts, types, isOrdered } = options

    let [id, key, value] = payload
    
    let tick = isOrdered ? payload[3] as number : 0

    if (id === undefined || id === null || id === '' ||
      key === undefined || key === null || key === '') { return }

    if (compressStringsAsInts) {
      id = extractSymbol(id, context, options)
      if (!id) { return }
      key = extractSymbol(key, context, options)
      if (!key) { return }
      const type = types[key];
      if (type && (type === String || type[0] === String)) {
        value = recursiveSymbolExtraction(key, value, context, options);
        if (!value) { return; }
      }
    }

    context.upsertComponent(id, key, value, tick, options)
  }
}

/**
 * Class representing actions that can be performed on components.
 * This class encapsulates the logic for merging, retrieving, and changing components.
 */
export class ComponentActions extends ComponentActionsFactory() {}

const __ComponentActions__ = new ComponentActions()

/**
 * An object that maps the names of actions to their corresponding methods in the ComponentActions class.
 */
export const actions = {
  /**
   * Changes a component in the current context.
   */
  changeComponent: __ComponentActions__.changeComponent,

  /**
   * Retrieves components from the current context.
   */
  components: __ComponentActions__.components,

  /**
   * Merges components into the current context.
   */
  mergeComponents: __ComponentActions__.mergeComponents,

  /**
   * Removes a component from the current context.
   */
  removeComponent: __ComponentActions__.removeComponent,
  
  /**
   * Updates an existing component or inserts a new one if it doesn't exist in the current context.
   */
  upsertComponent: __ComponentActions__.upsertComponent
}

export default actions