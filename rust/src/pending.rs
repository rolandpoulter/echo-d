use crate::hash::HashMap;
use crate::string::str;
// use crate::context::Context;

pub type PendingComponents = HashMap<String, HashMap<String, bool>>;

/**
 * The RemovedState struct represents the state of removed actors, entities, and components.
 */
pub struct RemovedState<'a> {
    pub actors: &'a mut HashMap<String, bool>,
    pub entities: &'a mut Vec<String>,
    pub components: &'a mut PendingComponents,
}

/**
 * The UpdatedState struct represents the state of updated components.
 */
pub struct UpdatedState<'a> {
    pub components: &'a mut PendingComponents,
}

/**
 * The CreatedState struct represents the state of created actors, entities, components, and inputs.
 */
pub struct CreatedState<'a> {
    pub actors: &'a mut HashMap<String, bool>,
    pub entities: &'a mut Vec<String>,
    pub components: &'a mut PendingComponents,
    pub inputs: &'a mut HashMap<String, Vec<i32>>,
}

pub type SymbolsState<'a> = Vec<(&'a String, i32)>;

/**
 * The PendingContext struct represents the context of pending operations.
 */
// struct PendingContext<'a> {
//     pending: Option<Pending<'a>>,
// }

/**
 * The Pending struct represents a pending state with removed, updated, and created states.
 */
pub struct Pending<'a> {
    pub removed: RemovedState<'a>,
    pub updated: UpdatedState<'a>,
    pub created: CreatedState<'a>,
    
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
                actors: &mut HashMap::new(),
                entities: &mut Vec::new(),
                components: &mut HashMap::new(),
            },
            updated: UpdatedState {
                components: &mut HashMap::new(),
            },
            created: CreatedState {
                actors: &mut HashMap::new(),
                entities: &mut Vec::new(),
                components: &mut HashMap::new(),
                inputs: &mut HashMap::new(),
            },
            symbols: &mut Vec::new(),
            is_diffed,
        }
    }

    /**
     * Adds an actor input to the created inputs state.
     *
     * @param {String} id - The ID of the actor.
     * @param {i32} newindex - The index of the new input.
     */
    pub fn actor_input(&mut self, id: &String, newindex: i32) {
        self.created.inputs.entry(*id).or_insert(Vec::new()).push(newindex);
    }

    /**
     * Changes a component in the specified pending state.
     *
     * @param {String} pending_type - The type of the pending state (removed, updated, or created).
     * @param {String} id - The ID of the entity.
     * @param {String} key - The key of the component.
     */
    pub fn change_component(&mut self, pending_type: &String, id: &String, key: &String) {
        self.upsert_component(pending_type, id, key);
    }

    /**
     * Marks an entity as created in the created state.
     *
     * @param {String} id - The ID of the entity to create.
     */
    pub fn create_entity(&mut self, id: &String) {
        self.created.entities.push(*id);
    }

    /**
     * Marks an actor as removed in the removed state.
     *
     * @param {String} id - The ID of the actor to remove.
     */
    pub fn remove_actor(&mut self, id: &String) {
        self.removed.actors.insert(*id, true);
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
    pub fn remove_entity(&mut self, id: &String) {
        self.removed.entities.push(*id);
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
    pub fn spawn_actor(&mut self, id: &String) {
        self.created.actors.insert(*id, true);
    }

    /**
     * Inserts or updates a component in the specified pending state.
     *
     * @param {String} pending_type - The type of the pending state (created or updated).
     * @param {String} id - The ID of the entity.
     * @param {String} key - The key of the component.
     */
    pub fn upsert_component(&mut self, pending_type: &String, id: &String, key: &String) {
        if pending_type == str("created") {
            let pending = &mut self.created;
            Self::upsert_component_op(&mut pending.components, id, key);
        } else {
            let pending = &mut self.updated;
            Self::upsert_component_op(&mut pending.components, id, key);
        };
    }

    fn upsert_component_op(components: &mut PendingComponents, id: &String, key: &String) {
        if let Some(components) = components.get_mut(id) {
            components.insert(*key, true);
        } else {
            let mut new_components = HashMap::new();
            new_components.insert(*key, true);
            components.insert(*id, new_components);
        }
    }

    /**
     * Adds a symbol tuple to the symbols array.
     *
     * @param {String} symbol_tuple - The symbol tuple to add.
     */
    pub fn add_symbol<'b>(&mut self, symbol_tuple: &'a (&String, i32)) {
        let symbol = symbol_tuple.0;
        let index = symbol_tuple.1;
        self.symbols.push((&symbol, index));
    }

    /**
     * Replaces the symbols array with a new array of symbol tuples.
     *
     * @param {Vec<(String, i32)>} symbols - The new array of symbols.
     */
    pub fn replace_symbols<'b>(&mut self, symbols: &'b Vec<(&String, i32)>) {
        self.symbols = symbols;
    }

    pub fn reset_pending(&mut self) {
        self.removed.actors = &mut HashMap::new();
        self.removed.entities = &mut Vec::new();
        self.removed.components = &mut HashMap::new();
        self.updated.components = &mut HashMap::new();
        self.created.actors = &mut HashMap::new();
        self.created.entities = &mut Vec::new();
        self.created.components = &mut HashMap::new();
        self.created.inputs = &mut HashMap::new();
        self.symbols = &mut Vec::new();
    }
}