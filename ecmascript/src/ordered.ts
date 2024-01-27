import { now } from './utils'

/**
 * The OrderedData interface represents a mapping from keys to tick values.
 */
interface OrderedData {
  [key: string]: {
    [key: string]: number;
  };
}

/**
 * The Ordered class represents a collection of tick values.
 *
 * @property {OrderedData} order - The collection of tick values.
 */
export class Ordered {
  private order: OrderedData;

  /**
   * Constructs a new Ordered object.
   *
   * @param {OrderedData} order - The initial tick values.
   */
  constructor (order: OrderedData = {}) {
    this.order = order
  }

  /**
   * Changes the tick value of a component.
   *
   * @param {string} id - The ID of the component.
   * @param {string} key - The key of the component.
   * @param {number} tick - The new tick value.
   * @returns {boolean} Whether the operation was successful.
   */
  changeComponent (id: string, key: string, tick: number): boolean {
    return this.upsertComponent(id, key, tick)
  }

  /**
   * Resets the tick values.
   *
   * @param {OrderedData} order - The new tick values.
   * @returns {Ordered} The Ordered object.
   */
  reset (order: OrderedData = {}) {
    this.order = order
  }

  /**
   * Inserts or updates the tick value of a component.
   *
   * @param {string} id - The ID of the component.
   * @param {string} key - The key of the component.
   * @param {number} tick - The new tick value.
   * @returns {boolean} Whether the operation was successful.
   */
  upsertComponent (id: string, key: string, tick: number): boolean {
    if (isNaN(tick)) {
      return false
    }
    this.order = this.order || {}
    this.order[id] = this.order[id] || {}
    switch (typeof this.order[id][key]) {
      case 'number':
        if (isFinite(this.order[id][key]) && this.order[id][key] <= tick) {
          const threshold = 0
          if (tick > (now() + threshold)) {
            return false
          }
          this.order[id][key] = tick
          return true
        }
        return false
      case 'undefined':
      default:
        this.order[id][key] = tick
        return true
    }
  }
}

export default Ordered