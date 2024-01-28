import { InputPayload } from './actions/actor';

/**
 * The RemovedState interface represents the state of removed actors, entities, and components.
 */
export interface RemovedState {
  actors: {
    [key: string]: boolean
  };
  entities: string[];
  components: {
    [key: string]: {
      [key: string]: boolean
    }
  };
}

/**
 * The UpdatedState interface represents the state of updated components.
 */
export interface UpdatedState {
  components: {
    [key: string]: {
      [key: string]: boolean
    }
  };
}

/**
 * The CreatedState interface represents the state of created actors, entities, components, and inputs.
 */
export interface CreatedState {
  actors: {
    [key: string]: boolean
  };
  entities: string[];
  components: {
    [key: string]: {
      [key: string]: boolean
    }
  };
  inputs: {
    [key: string]: any[]
  };
}

/**
 * The Pending class represents a pending state with removed, updated, and created states.
 *
 * @property {RemovedState} removed - The removed state.
 * @property {UpdatedState} updated - The updated state.
 * @property {CreatedState} created - The created state.
 */
export class Pending {
  declare removed: RemovedState;
  declare updated: UpdatedState;
  declare created: CreatedState;
  declare symbols: (number | [InputPayload, number])[];
  declare isDiffed: boolean;

  /**
   * Constructs a new Pending object and resets its state.
   */
  constructor (isDiffed: boolean = false) {
    this.created = {
      actors: {},
      components: {},
      entities: [],
      inputs: {}
    }
    this.removed = {
      actors: {},
      components: {},
      entities: []
    }
    this.updated = {
      components: {}
    }
    this.symbols = []
    this.isDiffed = isDiffed
  }

  /**
   * Adds an actor input to the created inputs state.
   *
   * @param {string} id - The ID of the actor.
   * @param {number} index - The index of the new input.
   */
  actorInput (id: string, index: number): void {
    this.created.inputs[id] = this.created.inputs[id] || []
    this.created.inputs[id].push(index)
  }

  /**
   * Changes a component in the specified pending state.
   *
   * @param {string} pendingType - The type of the pending state (removed, updated, or created).
   * @param {string} id - The ID of the entity.
   * @param {string} key - The key of the component.
   */
  changeComponent (pendingType: string, id: string, key: string): void {
    return this.upsertComponent(pendingType, id, key)
  }

  /**
   * Marks an entity as created in the created state.
   *
   * @param {string} id - The ID of the entity to create.
   */
  createEntity (id: string): void {
    this.created.entities.push(id)
  }
  
  /**
   * Marks an actor as removed in the removed state.
   *
   * @param {string} id - The ID of the actor to remove.
   */
  removeActor (id: string): void {
    this.removed.actors[id] = true
  }

  /**
   * Marks a component as removed in the removed state.
   *
   * @param {string} id - The ID of the entity.
   * @param {string} key - The key of the component to remove.
   */
  removeComponent (id: string, key: string): void {
    this.removed.components[id] = this.removed.components[id] || {}
    this.removed.components[id][key] = true
  }

  /**
   * Marks an entity as removed in the removed state.
   *
   * @param {string} id - The ID of the entity to remove.
   */
  removeEntity (id: string): void {
    this.removed.entities.push(id)
  }

  /**
   * Resets the state of the Pending object.
   */
  reset (): void {
    this.constructor()
  }

  /**
   * Marks an actor as spawned in the created state.
   *
   * @param {string} id - The ID of the actor to spawn.
   */
  spawnActor (id: string): void {
    this.created.actors[id] = true
  }

  /**
   * Inserts or updates a component in the specified pending state.
   *
   * @param {string} pendingType - The type of the pending state (created or updated).
   * @param {string} id - The ID of the entity.
   * @param {string} key - The key of the component.
   */
  upsertComponent (pendingType: string, id: string, key: string): void {
    const pending = pendingType === 'created' ? this.created : this.updated
    if (pending) {
      if (
        // !this.isDiffed // Diffed updates need to be created.
        // &&
        pendingType === 'updated'
        && this.created.components[id]
        && this.created.components[id][key]
      ) {
        // Skip updating a component that was created and updated in the same tick.
        return;
      }
      pending.components[id] = pending.components[id] || {}
      pending.components[id][key] = true
    }
  }

  /**
   * Adds a symbol tuple to the symbols array.
   *
   * @param {any} symbolTuple - The symbol tuple to add.
   */
  addSymbol (symbolTuple: any) {
    this.symbols.push(symbolTuple)
  }

  /**
   * Replaces the symbols array with a new array of symbol tuples.
   *
   * @param {any[]} symbols - The new array of symbols.
   */
  replaceSymbols (offset: number, symbols: any[]) {
    if (offset > 0) {
      const { length } = symbols
      const { symbols: _symbols } = this

      for (let i = 0; i < length; i++) {
        const value = symbols[i]
        const index = i + offset

        _symbols[index] = [value, index]
      }
    } else {
      this.symbols = symbols.map((v, i) => [v, i])
    }
  }
}

export default Pending


