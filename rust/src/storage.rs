use serde_json::Value;

use crate::hash::HashMap;
use crate::types::{
    Components,
    Inputs,
    Query,
};

trait Store {
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

        Storage {
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
    fn destroy_actor(&mut self, id: &String) -> bool {
        let mut actors = self.get_actors(None, None);
        self.destroy_id(&mut actors, id)
    }

    /**
     * Removes a component.
     *
     * @param id - The ID of the component to remove.
     * @param key - The key of the component to remove.
     */
    fn destroy_component(&mut self, id: &String, key: &String) {
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
    fn destroy_entity(&mut self, id: &String) -> bool {
        let mut entities = self.get_entities(None, None);
        self.destroy_id(&mut entities, id)
    }

    /**
     * Removes an ID from a list if it exists.
     *
     * @param list - The list to remove the ID from.
     * @param id - The ID to remove.
     * @returns True if the ID was removed, false otherwise.
     */
    fn destroy_id(&mut self, list: &mut Vec<String>, id: &String) -> bool {
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
    fn fetch_component(&mut self, id: &String, key: &String) -> Option<&Value> {
        self.components
            .entry(id)
            .or_insert_with(HashMap::new)
            .get(key)
    }

    /**
     * Gets the actors.
     *
     * @returns The actors.
     */
    fn get_actors(&self, query: Option<&Query>, page_size: Option<i32>) -> &Vec<String> {
        &self.actors
    }

    /**
     * Gets the components.
     *
     * @returns The components.
     */
    fn get_components(&self, query: Option<&Query>, page_size: Option<i32>) -> &Components {
        &self.components
    }

    /**
     * Gets the entities.
     *
     * @returns The entities.
     */
    fn get_entities(&self, query: Option<&Query>, page_size: Option<i32>) -> &Vec<String> {
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
    fn set_actors(&mut self, actors: Vec<String>) -> &Vec<&String> {
        self.actors = actors;
        &self.actors
    }

    /**
     * Sets the components.
     *
     * @param components - The components to set.
     * @returns The components.
     */
    fn set_components(&mut self, components: &Components) -> &Components {
        self.components = components;
        &self.components
    }

    /**
     * Sets the entities.
     *
     * @param entities - The entities to set.
     * @returns The entities.
     */
    fn set_entities(&mut self, entities: &Vec<&String>) -> &Vec<&String> {
        self.entities = entities;
        &self.entities
    }

    /**
     * Sets the inputs.
     *
     * @param inputs - The inputs to set.
     * @returns The inputs.
     */
    fn set_inputs(&mut self, inputs: &Inputs) -> &Inputs {
        self.inputs = inputs;
        &self.inputs
    }

    /**
     * Stores an actor ID.
     *
     * @param id - The ID of the actor to store.
     * @returns True if the actor ID was stored, false otherwise.
     */
    fn store_actor(&mut self, id: &String) -> bool {
        let mut actors = self.get_actors(None, None);
        self.store_id(&mut actors, id)
    }

    /**
     * Stores a component.
     *
     * @param id - The ID of the component to store.
     * @param key - The key of the component to store.
     * @param value - The value of the component to store.
     */
    fn store_component(&mut self, id: &String, key: &String, value: &Value) {
        self.components
            .entry(id)
            .or_insert_with(HashMap::new)
            .insert(key, value);
    }

    /**
     * Stores an entity ID.
     *
     * @param id - The ID of the entity to store.
     * @returns True if the entity ID was stored, false otherwise.
     */
    fn store_entity(&mut self, id: &String) -> bool {
        let mut entities = self.get_entities(None, None);
        self.store_id(&mut entities, id)
    }

    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param list - The list to store the ID in.
     * @param id - The ID to store.
     * @returns True if the ID was stored, false otherwise.
     */
    fn store_id(&mut self, list: &mut Vec<&String>, id: &String) -> bool {
        if !list.contains(&id) {
            list.push(&id);
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
    fn store_input(&mut self, id: &String, payload: &Value) -> usize {
        let inputs = self.get_inputs();

        let input_list = inputs.entry(id).or_insert_with(Vec::new);

        let new_index = input_list.len();

        input_list.push(payload);

        new_index
    }
}


/**
 * The StoreProps struct represents the properties of a store.
 */
pub struct StoreProps<'a> {
    actors: Option<&'a Vec<&'a String>>,
    entities: Option<&'a Vec<&'a String>>,
    components: &'a Components<'a>,
    inputs: &'a Inputs<'a>,
}

/**
 * The Store struct represents a store with actors, entities, components, and inputs.
 */
pub struct Storage<'a> {
    actors: &'a Vec<&'a String>,
    entities: &'a Vec<&'a String>,
    components: &'a Components<'a>,
    inputs: &'a Inputs<'a>,
}

impl<'a> Store for Storage<'a> {}