use serde_json::Value;
use serde_json::Map;

use crate::string::string;
use crate::hash::HashMap;
use crate::storage::Store;
// use crate::context::Context;
use crate::types::{
    // ChangesInput,
    // Components,
    // Component,
    // ComponentsMap,
    ComponentMap,
    // Components_ as Components,
};

pub enum ChangesInput<'a> {
    Props(ChangesProps<'a>),
    Instance(Changes<'a>),
}

/**
 * The ChangesProps struct represents the input for changes.
 *
 * diffs: The diffs.
 */
pub struct ChangesProps<'a> {
    store: Option<&'a dyn Store>,
    pub diffs: Option<ComponentMap>,
}

/**
 * The Changes struct provides methods for managing changes in a context.
 *
 * context: The context in which changes are to be managed.
 * diffs: The diffs of the changes.
 */
pub struct Changes<'a> {
    store: &'a dyn Store,
    // pub diffs: HashMap<String, Value>,
    pub diffs: ComponentMap,
}

impl<'a> Changes<'a> {
    /**
     * Creates a new instance of the Changes struct.
     *
     * context: The context in which changes are to be managed.
     * changes: An optional initial set of changes.
     */
    pub fn new(store: &dyn Store, changes: ChangesInput) -> Self {
        match changes {
            ChangesInput::Props(props) => {
                let ChangesProps {
                    store,
                    diffs,
                } = props;
                let store = store.unwrap();
                let diffs = props.diffs.unwrap_or_else(|| Map::new());
                Changes {
                    store,
                    diffs,
                }
            },
            ChangesInput::Instance(instance) => {
                let Changes {
                    store,
                    diffs,
                } = instance;
                let diffs = instance.diffs.clone();
                Changes {
                    store,
                    diffs,
                }
            },
        }
    }

    /**
     * Changes a component in the current context.
     *
     * id: The ID of the component to be changed.
     * key: The key of the property to be changed.
     * new_value: The new value of the property.
     */
    pub fn change_component(&mut self, id: &String, key: &String, new_value: &Value) {
        self.upsert_component(id, key, new_value);
    }

    /**
     * Resets the changes to a new set of changes or an empty object if no changes are provided.
     *
     * changes: The new set of changes.
     */
    pub fn reset(&mut self) {
        self.diffs = Map::<String, Value>::new();
    }

    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     *
     * id: The ID of the component to be updated or inserted.
     * key: The key of the property to be updated or inserted.
     * new_value: The new value of the property.
     */
    pub fn upsert_component(&mut self, id: &String, key: &String, new_value: &Value) {
        let components = self.store.get_components();
        let mut current_scope = components.entry(&id).or_insert_with(|| &Value::Object(Map::new()));
        let diff_object = self.diffs.entry(id).or_insert_with(Value::default);
        recursive_diff(key, diff_object, current_scope, new_value);
    }
}

pub enum ValueOrHash<'a> {
    Value(Value),
    Hash(&'a HashMap<&'a String, &'a Value>),
}

pub fn recursive_diff(key: &String, diff: &mut Value, scope: &mut Value, next_val: &Value) {
    let prev_type = scope.get(&key).map(|v| type_of(v));
    let next_type = type_of(&next_val);
    if prev_type != Some(next_type) {
        diff[key] = *next_val;
        return;
    }
    // match next_type {
    match next_val {
        Value::Number(next_val) => {
            let v1 = scope.get(&key).and_then(|v| v.as_f64()).unwrap_or_default();
            let v2 = next_val.as_f64().unwrap_or_default();
            let d = v2 - v1;
            if let Some(map) = scope.as_object_mut() {
                map.insert(*key, Value::from(v2));
            }
            // scope.insert(&key, &Value::from(v2));
            diff[key] = Value::from(d);
        }
        Value::Array(next_val) => {
            let diff = diff.get_mut(&key).unwrap();
            let scope = scope.get_mut(&key).unwrap();
            for (i, next_val) in next_val.into_iter().enumerate() {
                recursive_diff(string(&i.to_string()), diff, scope, next_val);
            }
        }
        Value::Object(next_val) => {
            let diff = diff.get_mut(&key).unwrap();
            let scope = scope.get_mut(&key).unwrap();
            for (k, next_val) in next_val.into_iter() {
                recursive_diff(string(k), diff, scope, next_val);
            }
        }
        _ => {
            diff[key] = *next_val;
        }
    }
}

pub fn type_of(value: &Value) -> &str {
    match value {
        Value::Null => "null",
        Value::Bool(_) => "boolean",
        Value::Number(_) => "number",
        Value::String(_) => "string",
        Value::Array(_) => "array",
        Value::Object(_) => "object",
    }
}
