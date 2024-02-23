use crate::storage::{create_store, Store, StoreProps};
use crate::types::{Components, Inputs};

pub struct AsyncStorage<'a> {
    actors: &'a Vec<&'a String>,
    entities: &'a Vec<&'a String>,
    components: &'a Components<'a>,
    inputs: &'a Inputs<'a>,
}

impl<'a> AsyncStorage<'a> {
    fn new(self: &Self, props: StoreProps) -> &Self {
        let store = Box::<&dyn Store>::new(self);
        let store = create_store(store, props);
        &self
    }
}

impl<'a> Store for AsyncStorage<'a> {
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