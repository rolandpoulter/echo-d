use crate::hash::HashMap;
// use crate::context::Context;

/**
 * The RemovedState struct represents the state of removed actors, entities, and components.
 */
pub struct RemovedState {
    pub actors: HashMap<String, bool>,
    pub entities: Vec<String>,
    pub components: HashMap<String, HashMap<String, bool>>,
}

/**
 * The UpdatedState struct represents the state of updated components.
 */
pub struct UpdatedState {
    pub components: HashMap<String, HashMap<String, bool>>,
}

/**
 * The CreatedState struct represents the state of created actors, entities, components, and inputs.
 */
pub struct CreatedState {
    pub actors: HashMap<String, bool>,
    pub entities: Vec<String>,
    pub components: HashMap<String, HashMap<String, bool>>,
    pub inputs: HashMap<String, Vec<i32>>,
}

pub type SymbolsState = Vec<(String, i32)>;

/**
 * The PendingContext struct represents the context of pending operations.
 */
struct PendingContext<'a> {
    pending: Option<Pending<'a>>,
}

/**
 * The Pending struct represents a pending state with removed, updated, and created states.
 */
pub struct Pending<'a> {
    pub removed: RemovedState,
    pub updated: UpdatedState,
    pub created: CreatedState,
    
    pub symbols: &'a Vec<(&'a String, i32)>,
    pub is_diffed: bool,
}

impl<'a> Pending<'a> {
    /**
     * Constructs a new Pending object and resets its state.
     */
    pub fn new(is_diffed: bool) -> Self {
        Self {
            removed: RemovedState {
                actors: HashMap::new(),
                entities: Vec::new(),
                components: HashMap::new(),
            },
            updated: UpdatedState {
                components: HashMap::new(),
            },
            created: CreatedState {
                actors: HashMap::new(),
                entities: Vec::new(),
                components: HashMap::new(),
                inputs: HashMap::new(),
            },
            symbols: &Vec::new(),
            is_diffed,
        }
    }

    /**
     * Adds an actor input to the created inputs state.
     *
     * @param {String} id - The ID of the actor.
     * @param {i32} newindex - The index of the new input.
     */
    pub fn actor_input(&mut self, id: String, newindex: i32) {
        self.created.inputs.entry(id).or_insert(Vec::new()).push(newindex);
    }

    /**
     * Changes a component in the specified pending state.
     *
     * @param {String} pending_type - The type of the pending state (removed, updated, or created).
     * @param {String} id - The ID of the entity.
     * @param {String} key - The key of the component.
     */
    pub fn change_component(&mut self, pending_type: String, id: String, key: String) {
        self.upsert_component(pending_type, id, key);
    }

    /**
     * Marks an entity as created in the created state.
     *
     * @param {String} id - The ID of the entity to create.
     */
    pub fn create_entity(&mut self, id: String) {
        self.created.entities.push(id);
    }

    /**
     * Marks an actor as removed in the removed state.
     *
     * @param {String} id - The ID of the actor to remove.
     */
    pub fn remove_actor(&mut self, id: String) {
        self.removed.actors.insert(id, true);
    }

    /**
     * Marks a component as removed in the removed state.
     *
     * @param {String} id - The ID of the entity.
     * @param {String} key - The key of the component to remove.
     */
    pub fn remove_component(&mut self, id: String, key: String) {
        self.removed.components.entry(id).or_insert(HashMap::new()).insert(key, true);
    }

    /**
     * Marks an entity as removed in the removed state.
     *
     * @param {String} id - The ID of the entity to remove.
     */
    pub fn remove_entity(&mut self, id: String) {
        self.removed.entities.push(id);
    }

    /**
     * Resets the state of the Pending object.
     */
    pub fn reset(&mut self) {
        *self = Self::new(self.is_diffed);
    }

    /**
     * Marks an actor as spawned in the created state.
     *
     * @param {String} id - The ID of the actor to spawn.
     */
    pub fn spawn_actor(&mut self, id: String) {
        self.created.actors.insert(id, true);
    }

    /**
     * Inserts or updates a component in the specified pending state.
     *
     * @param {String} pending_type - The type of the pending state (created or updated).
     * @param {String} id - The ID of the entity.
     * @param {String} key - The key of the component.
     */
    pub fn upsert_component(&mut self, pending_type: String, id: String, key: String) {
        let pending = if pending_type == "created" {
            &mut self.created
        } else {
            &mut self.updated
        };

        if let Some(components) = pending.components.get_mut(&id) {
            components.insert(key, true);
        } else {
            let mut new_components = HashMap::new();
            new_components.insert(key, true);
            pending.components.insert(id, new_components);
        }
    }

    /**
     * Adds a symbol tuple to the symbols array.
     *
     * @param {String} symbol_tuple - The symbol tuple to add.
     */
    pub fn add_symbol(&mut self, symbol_tuple: (String, i32)) {
        self.symbols.push(symbol_tuple);
    }

    /**
     * Replaces the symbols array with a new array of symbol tuples.
     *
     * @param {Vec<(String, i32)>} symbols - The new array of symbols.
     */
    pub fn replace_symbols(&mut self, symbols: Vec<(String, i32)>) {
        self.symbols = symbols;
    }
}