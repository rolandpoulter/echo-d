use serde_json::Value;

use crate::hash::HashMap;
// use crate::context::Context;
use crate::types::{
    // ChangesInput,
    Component,
    // Components_ as Components,
};

/**
 * The ChangesInput struct represents the input for changes.
 *
 * diffs: The diffs.
 */
pub struct ChangesInput {
    pub diffs: Option<HashMap<String, serde_json::Value>>,
}

/**
 * The Changes struct provides methods for managing changes in a context.
 *
 * context: The context in which changes are to be managed.
 * diffs: The diffs of the changes.
 */
pub struct Changes<'a, T> {
    store: &'a T,
    pub diffs: HashMap<String, Value>,
}

impl<'a, T> Changes<'a, T> {
    /**
     * Creates a new instance of the Changes struct.
     *
     * context: The context in which changes are to be managed.
     * changes: An optional initial set of changes.
     */
    pub fn new(store: &T, changes: ChangesInput) -> Self {
        let diffs = changes.diffs.unwrap_or_default();
        Changes { store, diffs }
    }

    /**
     * Changes a component in the current context.
     *
     * id: The ID of the component to be changed.
     * key: The key of the property to be changed.
     * new_value: The new value of the property.
     */
    pub fn change_component(&mut self, id: String, key: String, new_value: serde_json::Value) {
        self.upsert_component(id, key, new_value);
    }

    /**
     * Resets the changes to a new set of changes or an empty object if no changes are provided.
     *
     * changes: The new set of changes.
     */
    pub fn reset(&mut self, changes: ChangesInput) {
        self.diffs = changes.diffs.unwrap_or_default();
    }

    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     *
     * id: The ID of the component to be updated or inserted.
     * key: The key of the property to be updated or inserted.
     * new_value: The new value of the property.
     */
    pub fn upsert_component(&mut self, id: String, key: String, new_value: Value) {
        let components = self.store.get_components();
        let current_scope = components.components.entry(id).or_insert_with(Component::default);
        let diff_object = self.diffs.entry(id).or_insert_with(Value::default);
        recursive_diff(key, diff_object, current_scope, new_value);
    }
}

pub fn recursive_diff(key: String, diff: &mut Value, scope: &mut Component, next_val: Value) {
    let prev_type = scope.properties.get(&key).map(|v| type_of(v));
    let next_type = type_of(&next_val);
    if prev_type != Some(next_type) {
        diff[key] = next_val;
        return;
    }
    match next_type {
        "bigint" | "number" => {
            let v1 = scope.properties.get(&key).and_then(|v| v.as_f64()).unwrap_or_default();
            let v2 = next_val.as_f64().unwrap_or_default();
            let d = v2 - v1;
            scope.properties.insert(key.clone(), Value::from(v2));
            diff[key] = Value::from(d);
        }
        "array" => {
            let diff = diff.get_mut(&key).unwrap();
            let scope = scope.properties.get_mut(&key).unwrap();
            if let Value::Array(next_val) = next_val {
                for (i, next_val) in next_val.into_iter().enumerate() {
                    recursive_diff(i.to_string(), diff, scope, next_val);
                }
            }
        }
        "object" => {
            let diff = diff.get_mut(&key).unwrap();
            let scope = scope.properties.get_mut(&key).unwrap();
            if let Value::Object(next_val) = next_val {
                for (k, next_val) in next_val.into_iter() {
                    recursive_diff(k, diff, scope, next_val);
                }
            }
        }
        _ => {
            diff[key] = next_val;
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
