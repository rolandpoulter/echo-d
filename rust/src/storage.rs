use serde_json::Value;
use serde_json::Map;

// use crate::hash::HashMap;
use crate::types::{
    Components,
    Inputs,
    Query,
};

/**
 * Creates a new Store object.
 *
 * @param store - The store.
 * @param props - The properties of the store.
 */
pub fn create_store<'a>(mut store: Box<&dyn Store>, props: StoreProps) -> Box<&'a dyn Store> {
    let StoreProps {
        actors,
        entities,
        components,
        inputs,
    } = props;

    store.set_actors(actors.unwrap_or_else(|| &Vec::<&String>::new()));
    store.set_entities(entities.unwrap_or_else(|| &Vec::<&String>::new()));
    store.set_components(components);
    store.set_inputs(inputs);

    store
}

pub trait Store {
    /**
     * Removes an actor ID.
     *
     * @param id - The ID of the actor to remove.
     * @returns True if the actor ID was removed, false otherwise.
     */
    fn destroy_actor(self: &mut Self, id: &String) -> bool {
        let mut actors = self.get_actors();
        self.destroy_id(&mut actors, id)
    }

    /**
     * Removes a component.
     *
     * @param id - The ID of the component to remove.
     * @param key - The key of the component to remove.
     */
    fn destroy_component(self: &mut Self, id: &String, key: &String) {
        if let Some(component) = self.get_components().get_mut(id) {
            if let Some(map) = component.as_object_mut() {
                map.remove(key);
            }
        }
    }

    /**
     * Removes an entity ID.
     *
     * @param id - The ID of the entity to remove.
     * @returns True if the entity ID was removed, false otherwise.
     */
    fn destroy_entity(self: &mut Self, id: &String) -> bool {
        let mut entities = self.get_entities();
        self.destroy_id(&mut entities, id)
    }

    /**
     * Removes an ID from a list if it exists.
     *
     * @param list - The list to remove the ID from.
     * @param id - The ID to remove.
     * @returns True if the ID was removed, false otherwise.
     */
    fn destroy_id(self: &mut Self, list: &mut Vec<&String>, id: &String) -> bool {
        if let Some(index) = list.iter().position(|x| *x == id) {
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
    fn fetch_component(self: &mut Self, id: &String, key: &String) -> Option<&Value> {
        let entry = self.get_components().entry(id);

        let component = entry.or_insert_with(|| &Value::Object(Map::new()));

        if let Some(map) = component.as_object_mut() {
            return map.get(key);
        }
        None
    }

    /**
     * Gets the actors.
     *
     * @returns The actors.
     */
    fn get_actors(self: &Self) -> &Vec<&String>;

    /**
     * Gets the components.
     *
     * @returns The components.
     */
    fn get_components(self: &Self) -> &Components;

    /**
     * Gets the entities.
     *
     * @returns The entities.
     */
    fn get_entities(self: &Self) -> &Vec<&String>;

    /**
     * Gets the inputs.
     *
     * @returns The inputs.
     */
    fn get_inputs(self: &Self) -> &Inputs;

    /**
     * Lists the actors.
     *
     * @returns The actors.
     */
    fn list_actors(self: &Self, query: Option<&Query>, page_size: Option<i16>) -> &Vec<&Vec<&String>> {
        let mut list = Vec::new();
        list.push(self.get_actors());
        &list
    }

    /**
     * Lists the components.
     *
     * @returns The components.
     */
    fn list_components(self: &Self, query: Option<&Query>, page_size: Option<i16>) -> &Vec<&Components> {
        let mut list = Vec::new();
        list.push(self.get_components());
        &list
    }

    /**
     * Lists the entities.
     *
     * @returns The entities.
     */
    fn list_entities(self: &Self, query: Option<&Query>, page_size: Option<i16>) -> &Vec<&Vec<&String>> {
        let mut list = Vec::new();
        list.push(self.get_entities());
        &list
    }

    /**
     * Lists the inputs.
     *
     * @returns The inputs.
     */
    fn list_inputs(self: &Self) -> &Vec<&Inputs> {
        let mut list = Vec::new();
        list.push(self.get_inputs());
        &list
    }

    /**
     * Sets the actors.
     *
     * @param actors - The actors to set.
     * @returns The actors.
     */
    fn set_actors(self: &mut Self, actors: &Vec<&String>) -> &Vec<&String>;

    /**
     * Sets the components.
     *
     * @param components - The components to set.
     * @returns The components.
     */
    fn set_components(self: &mut Self, components: &Components) -> &Components;

    /**
     * Sets the entities.
     *
     * @param entities - The entities to set.
     * @returns The entities.
     */
    fn set_entities(self: &mut Self, entities: &Vec<&String>) -> &Vec<&String>;

    /**
     * Sets the inputs.
     *
     * @param inputs - The inputs to set.
     * @returns The inputs.
     */
    fn set_inputs(self: &mut Self, inputs: &Inputs) -> &Inputs;

    /**
     * Stores an actor ID.
     *
     * @param id - The ID of the actor to store.
     * @returns True if the actor ID was stored, false otherwise.
     */
    fn store_actor(self: &mut Self, id: &String) -> bool {
        let mut actors = self.get_actors();
        self.store_id(&mut actors, id)
    }

    /**
     * Stores a component.
     *
     * @param id - The ID of the component to store.
     * @param key - The key of the component to store.
     * @param value - The value of the component to store.
     */
    fn store_component(self: &mut Self, id: &String, key: &String, value: &Value) {
        let entry = self.get_components().entry(id);

        let component = entry.or_insert_with(|| {
            let mut default = Map::<String, Value>::new();
            &Value::Object(default)
        });

            // .or_insert_with(|| Map::<String, Value>::new())
        if let Some(map) = component.as_object_mut() {
            map.insert(*key, *value);
        }
    }

    /**
     * Stores an entity ID.
     *
     * @param id - The ID of the entity to store.
     * @returns True if the entity ID was stored, false otherwise.
     */
    fn store_entity(self: &mut Self, id: &String) -> bool {
        let mut entities = self.get_entities();
        self.store_id(&mut entities, id)
    }

    /**
     * Stores an ID in a list if it doesn't exist already.
     *
     * @param list - The list to store the ID in.
     * @param id - The ID to store.
     * @returns True if the ID was stored, false otherwise.
     */
    fn store_id(self: &mut Self, list: &mut Vec<&String>, id: &String) -> bool {
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
    fn store_input(self: &mut Self, id: &String, payload: &Value) -> usize {
        let inputs = self.get_inputs();

        let input_list = inputs.entry(id).or_insert_with(|| &Vec::new());

        let new_index = input_list.len();

        input_list.push(payload);

        new_index
    }

    fn query_components(self: &Self, query: Query) -> &Vec<&String> {
        // TODO:
        let actors = self.get_actors();
        let entities = self.get_entities();
        let mut combined = Vec::new();
        for actor in actors {
            combined.push(*actor);
        }
        for entity in entities {
            combined.push(*entity);
        }
        &combined
    }
}

pub trait StoreCtor {
    fn new(self: &Self, props: StoreProps) -> &Self;
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

impl<'a> StoreCtor for Storage<'a> {
    fn new(self: &Self, props: StoreProps) -> &Self {
        let store = Box::<&dyn Store>::new(self);
        let store = create_store(store, props);
        &self
    }
}

impl<'a> Store for Storage<'a> {
    /**
     * Gets the actors.
     *
     * @returns The actors.
     */
    fn get_actors(self: &Self) -> &Vec<&String> {
        self.actors
    }

    /**
     * Gets the components.
     *
     * @returns The components.
     */
    fn get_components(self: &Self) -> &Components {
        &self.components
    }

    /**
     * Gets the entities.
     *
     * @returns The entities.
     */
    fn get_entities(self: &Self) -> &Vec<&String> {
        &self.entities
    }

    /**
     * Gets the inputs.
     *
     * @returns The inputs.
     */
    fn get_inputs(self: &Self) -> &Inputs {
        &self.inputs
    }

    /**
     * Sets the actors.
     *
     * @param actors - The actors to set.
     * @returns The actors.
     */
    fn set_actors(self: &mut Self, actors: &Vec<&String>) -> &Vec<&String> {
        self.actors = actors;
        &self.actors
    }

    /**
     * Sets the components.
     *
     * @param components - The components to set.
     * @returns The components.
     */
    fn set_components(self: &mut Self, components: &Components) -> &Components {
        self.components = components;
        &self.components
    }

    /**
     * Sets the entities.
     *
     * @param entities - The entities to set.
     * @returns The entities.
     */
    fn set_entities(self: &mut Self, entities: &Vec<&String>) -> &Vec<&String> {
        self.entities = entities;
        &self.entities
    }

    /**
     * Sets the inputs.
     *
     * @param inputs - The inputs to set.
     * @returns The inputs.
     */
    fn set_inputs(self: &mut Self, inputs: &Inputs) -> &Inputs {
        self.inputs = inputs;
        &self.inputs
    }
}
