/**
 * The Pending class represents a pending state with removed, updated, and created states.
 *
 * @property {RemovedState} removed - The removed state.
 * @property {UpdatedState} updated - The updated state.
 * @property {CreatedState} created - The created state.
 */
export class Pending {
    /**
     * Constructs a new Pending object and resets its state.
     */
    constructor(isDiffed = false) {
        this.created = {
            actors: {},
            components: {},
            entities: [],
            inputs: {}
        };
        this.removed = {
            actors: {},
            components: {},
            entities: []
        };
        this.updated = {
            components: {}
        };
        this.symbols = [];
        this.isDiffed = isDiffed;
    }
    /**
     * Adds an actor input to the created inputs state.
     *
     * @param {string} id - The ID of the actor.
     * @param {number} index - The index of the new input.
     */
    actorInput(id, index) {
        this.created.inputs[id] = this.created.inputs[id] || [];
        this.created.inputs[id].push(index);
    }
    /**
     * Changes a component in the specified pending state.
     *
     * @param {string} pendingType - The type of the pending state (removed, updated, or created).
     * @param {string} id - The ID of the entity.
     * @param {string} key - The key of the component.
     */
    changeComponent(pendingType, id, key) {
        return this.upsertComponent(pendingType, id, key);
    }
    /**
     * Marks an entity as created in the created state.
     *
     * @param {string} id - The ID of the entity to create.
     */
    createEntity(id) {
        this.created.entities.push(id);
    }
    /**
     * Marks an actor as removed in the removed state.
     *
     * @param {string} id - The ID of the actor to remove.
     */
    removeActor(id) {
        this.removed.actors[id] = true;
    }
    /**
     * Marks a component as removed in the removed state.
     *
     * @param {string} id - The ID of the entity.
     * @param {string} key - The key of the component to remove.
     */
    removeComponent(id, key) {
        this.removed.components[id] = this.removed.components[id] || {};
        this.removed.components[id][key] = true;
    }
    /**
     * Marks an entity as removed in the removed state.
     *
     * @param {string} id - The ID of the entity to remove.
     */
    removeEntity(id) {
        this.removed.entities.push(id);
    }
    /**
     * Resets the state of the Pending object.
     */
    reset() {
        this.constructor();
    }
    /**
     * Marks an actor as spawned in the created state.
     *
     * @param {string} id - The ID of the actor to spawn.
     */
    spawnActor(id) {
        this.created.actors[id] = true;
    }
    /**
     * Inserts or updates a component in the specified pending state.
     *
     * @param {string} pendingType - The type of the pending state (created or updated).
     * @param {string} id - The ID of the entity.
     * @param {string} key - The key of the component.
     */
    upsertComponent(pendingType, id, key) {
        const pending = pendingType === 'created' ? this.created : this.updated;
        if (pending) {
            if (
            // !this.isDiffed // Diffed updates need to be created.
            // &&
            pendingType === 'updated'
                && this.created.components[id]
                && this.created.components[id][key]) {
                // Skip updating a component that was created and updated in the same tick.
                return;
            }
            pending.components[id] = pending.components[id] || {};
            pending.components[id][key] = true;
        }
    }
    /**
     * Adds a symbol tuple to the symbols array.
     *
     * @param {any} symbolTuple - The symbol tuple to add.
     */
    addSymbol(symbolTuple) {
        this.symbols.push(symbolTuple);
    }
    /**
     * Replaces the symbols array with a new array of symbol tuples.
     *
     * @param {any[]} symbols - The new array of symbols.
     */
    replaceSymbols(offset, symbols) {
        if (offset > 0) {
            const { length } = symbols;
            const { symbols: _symbols } = this;
            for (let i = 0; i < length; i++) {
                const value = symbols[i];
                const index = i + offset;
                _symbols[index] = [value, index];
            }
        }
        else {
            this.symbols = symbols.map((v, i) => [v, i]);
        }
    }
}
export default Pending;
