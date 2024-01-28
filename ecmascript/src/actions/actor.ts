import { Context } from '../context'
import { Emitter } from '../emitter'
import { Options } from '../options'
import { extractSymbol } from '../symbols'

/**
 * Payload for actor inputs.
 */
export interface InputPayload {
  id?: string;
  [key: string]: any;
}

/**
 * Creates a new instance of the ActorActions class that extends the provided Parent class
 * 
 * @param {any} Parent - The class to be extended by the ActorActions class. 
 * @returns {any} - A new class that extends the provided Parent class and the ActorActions class.
 */
export const ActorActionsFactory = (Parent: any = Object): any => class ActorActions extends Parent {
  /**
   * Handles input for a specific actor in the current context.
   *
   * @param {any[] | InputPayload} payload - The payload containing the actor's id and the input to be handled.
   * @param {Context} context - The current context in which the actor input is to be handled.
   * @param {Options | any} options - The options for handling the actor input. If an instance of Options is not provided, a new one will be created.
   */
  actorInput (payload: any[] | InputPayload, context: Context, options: Options | any) {
    options = Options.ensure(options, this)
    const { getActorId, compressStringsAsInts } = options

    let input
    let tick = 0
    
    if (Array.isArray(payload)) {
      input = payload[0] as InputPayload
      tick = payload[1] || 0
    } else {
      input = payload as InputPayload
    }

    let id = getActorId(input?.id, context)
    if (id === undefined || id === null || id === '') { return }

    if (compressStringsAsInts) {
      id = extractSymbol(id, context, options)
      if (id === '') { return }
    }

    if (!input?.id) { input.id = id }

    context.actorInput(id, input, tick, options)
  }

  /**
   * Retrieves actors from the current context and sends them to the responder.
   *
   * @param {any} payload - This parameter is not used in the function.
   * @param {Context} context - The current context from which the actors are retrieved.
   * @param {Options | any} options - The options for retrieving actors. If an instance of Options is not provided, a new one will be created.
   */
  actors (payload: any, context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { responder, isAuthority, isAsyncStorage, pageSize, enableQuerying, enumDefaultSymbols } = options

    if (!isAuthority) { return }
    
    const sendActors = (pages: string[][]) => {
      // send pages to responder
      for (const page of pages) {
        responder([enumDefaultSymbols.mergeActors, page])
      }
    }
    
    const ctxActors = context.getActors(enableQuerying ? payload : null, pageSize)

    if (isAsyncStorage) {
      (ctxActors as Emitter<string[][]>).emitTo(sendActors, true)
    } else {
      sendActors(ctxActors as string[][])
    }
  }

  /**
   * Merges actors into the current context.
   *
   * @param {any[]} payload - The payload containing the actors to be merged.
   * @param {Context} context - The current context in which the actors are to be merged.
   * @param {Options | any} options - The options for merging. If an instance of Options is not provided, a new one will be created.
   */
  mergeActors (payload: any[], context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)

    context.mergeActors(payload, options)
  }

  /**
   * Removes an actor from the current context.
   *
   * @param {any} id - The identifier for the actor to be removed.
   * @param {Context} context - The current context from which the actor is to be removed.
   * @param {Options | any} options - The options for removing the actor. If an instance of Options is not provided, a new one will be created.
   */
  removeActor (id: any, context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { skipPending, getActorId, compressStringsAsInts } = options

    id = getActorId(id, context)
    if (id === undefined || id === null || id === '') { return }

    if (compressStringsAsInts) {
      id = extractSymbol(id, context, options)
      if (id === '') { return }
    }

    context.removeActor(id, skipPending)
  }

  /**
   * Spawns a new actor in the current context.
   *
   * @param {any} id - The identifier for the actor to be spawned.
   * @param {Context} context - The current context in which the actor is to be spawned.
   * @param {OptionsExtended | any} options - The options for spawning the actor. If an instance of Options is not provided, a new one will be created.
   */
  spawnActor (id: any, context: Context, options: Options | any) {
    options = options = Options.ensure(options, this)
    const { skipPending, getActorId, compressStringsAsInts } = options

    id = getActorId(id, context)
    if (id === undefined || id === null || id === '') { return }
        
    if (compressStringsAsInts) {
      id = extractSymbol(id, context, options)
      if (id === '') { return }
    }

    context.spawnActor(id, skipPending)
  }
}

/**
 * Class representing actions that can be performed on actors.
 * This class encapsulates the logic for merging, spawning, removing, and handling input for actors.
 */
export class ActorActions extends ActorActionsFactory() {}

const __ActorActions__ = new ActorActions()

/**
 * An object that maps the names of actions to their corresponding methods in the ActorActions class.
 */
export const actions = {
  /**
   * Handles input for a specific actor in the current context.
   */
  actorInput: __ActorActions__.actorInput,

  /**
   * Retrieves actors from the current context.
   */
  actors: __ActorActions__.actors,

  /**
   * Merges actors into the current context.
   */
  mergeActors: __ActorActions__.mergeActors,

  /**
   * Removes an actor from the current context.
   */
  removeActor: __ActorActions__.removeActor,

  /**
   * Spawns a new actor in the current context.
   */
  spawnActor: __ActorActions__.spawnActor
}

export default actions