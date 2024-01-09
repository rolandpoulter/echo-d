// use std::collections::HashMap;
use rustc_hash::HashMap;

/**
 * The StoreProps struct represents the properties of a store.
 */
struct StoreProps {
    actors: Option<Vec<String>>,
    entities: Option<Vec<String>>,
    components: Components,
    inputs: Inputs,
}

/**
 * The Components struct represents a mapping from keys to any value.
 */
type Components = HashMap<String, HashMap<String, serde_json::Value>>;

/**
 * The Inputs struct represents a mapping from keys to any array.
 */
type Inputs = HashMap<String, Vec<serde_json::Value>>;

/**
 * The Store struct represents a store with actors, entities, components, and inputs.
 */
struct Store {
    actors: Vec<String>,
    entities: Vec<String>,
    components: Components,
    inputs: Inputs,
}

impl Store {
    /**
     * Constructs a new Store object.
     *
     * @param store - The properties of the store.
     */
    fn new(store: StoreProps) -> Self {
        let StoreProps {
            actors,
            entities,
            components,
            inputs,
        } = store;

        Store {
            actors: actors.unwrap_or_default(),
            entities: entities.unwrap_or_default(),
            components: components,
            inputs: inputs,
        }
    }

    /**
     * Removes an actor ID.
     *
     * @param id - The ID of the actor to remove.
     * @returns True if the actor ID was removed, false otherwise.
     */
    fn destroy_actor(&mut self, id: &str) -> bool {
        let actors = self.get_actors();
        self.destroy_id(&mut actors, id)
    }

    /**
     * Removes a component.
     *
     * @param id - The ID of the component to remove.
     * @param key - The key of the component to remove.
     */
    fn destroy_component(&mut self, id: &str, key: &str) {
        if let Some(component) = self.components.get_mut(id) {
            component.remove(key);
        }
    }

    /**
     * Removes an entity ID.
     *
     * @param id - The ID of the entity to remove.
     * @returns True if the entity ID was removed, false otherwise.
     */
    fn destroy_entity(&mut self, id: &str) -> bool {
        let entities = self.get_entities();
        self.destroy_id(&mut entities, id)
    }

    /**
     * Removes an ID from a list if it exists.
     *
     * @param list - The list to remove the ID from.
     * @param id - The ID to remove.
     * @returns True if the ID was removed, false otherwise.
     */
    fn destroy_id(&mut self, list: &mut Vec<String>, id: &str) -> bool {
        if let Some(index) = list.iter().position(|x| x == id) {
            list.remove(index);
            true
        } else {
            false
        }
    }

    /**
     * Fetches a component.
     *
     * @param id - The ID of the component to fetch.
     * @param key - The key of the component to fetch.
     * @returns The fetched component.
     */
    fn fetch_component(&mut self, id: &str, key: &str) -> Option<&serde_json::Value> {
        self.components
            .entry(id.to_string())
            .or_insert_with(HashMap::new)
            .get(key)
    }

    /**
     * Gets the actors.
     *
     * @returns The actors.
     */
    fn get_actors(&self) -> &Vec<String> {
        &self.actors
    }

    /**
     * Gets the components.
     *
     * @returns The components.
     */
    fn get_components(&self) -> &Components {
        &self.components
    }

    /**
     * Gets the entities.
     *
     * @returns The entities.
     */
    fn get_entities(&self) -> &Vec<String> {
        &self.entities
    }

    /**
     * Gets the inputs.
     *
     * @returns The inputs.
     */
    fn get_inputs(&self) -> &Inputs {
        &self.inputs
    }

    /**
     * Sets the actors.
     *
     * @param actors - The actors to set.
     * @returns The actors.
     */
    fn set_actors(&mut self, actors: Vec<String>) -> &Vec<String> {
        self.actors = actors;
        &self.actors
    }

    /**
     * Sets the components.
     *
     * @param components - The components to set.
     * @returns The components.
     */
    fn set_components(&mut self, components: Components) -> &Components {
        self.components = components;
        &self.components
    }

    /**
     * Sets the entities.
     *
     * @param entities - The entities to set.
     * @returns The entities.
     */
    fn set_entities(&mut self, entities: Vec<String>) -> &Vec<String> {
        self.entities = entities;
        &self.entities
    }

    /**
     * Sets the inputs.
     *
     * @param inputs - The inputs to set.
     * @returns The inputs.
     */
    fn set_inputs(&mut self, inputs: Inputs) -> &Inputs {
        self.inputs = inputs;
        &self.inputs
    }

    /**
     * Stores an actor ID.
     *
     * @param id - The ID of the actor to store.
     * @returns True if the actor ID was stored, false otherwise.
     */
    fn store_actor(&mut self, id: &str) -> bool {
        let actors = self.get_actors();
        self.store_id(&mut actors, id)
    }

    /**
     * Stores a component.
     *
     * @param id - The ID of the component to store.
     * @param key - The key of the component to store.
     * @param value - The value of the component to store.
     */
    fn store_component(&mut self, id: &str, key: &str, value: serde_json::Value) {
        self.components
            .entry(id.to_string())
            .or_insert_with(HashMap::new)
            .insert(key.to_string(), value);
    }

    /**
     * Stores an entity ID.
     *
     * @param id - The ID of the entity to store.
     * @returns True if the entity ID was stored, false otherwise.
     */
    fn store_entity(&mut self, id: &str) -> bool {
        let entities = self.get_entities();
        self.store_id(&mut entities, id)
    }

    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param list - The list to store the ID in.
     * @param id - The ID to store.
     * @returns True if the ID was stored, false otherwise.
     */
    fn store_id(&mut self, list: &mut Vec<String>, id: &str) -> bool {
        if !list.contains(&id.to_string()) {
            list.push(id.to_string());
            true
        } else {
            false
        }
    }

    /**
     * Stores an input.
     *
     * @param id - The ID of the input to store.
     * @param payload - The payload of the input to store.
     * @returns The new index of the stored input.
     */
    fn store_input(&mut self, id: &str, payload: serde_json::Value) -> usize {
        let inputs = self.get_inputs();

        let input_list = inputs.entry(id.to_string()).or_insert_with(Vec::new);

        let new_index = input_list.len();

        input_list.push(payload);

        new_index
    }
}
