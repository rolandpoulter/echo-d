use std::collections::HashMap;
/**
 * The ChangesInput struct represents the input for changes.
 *
 * diffs: The diffs.
 */
struct ChangesInput {
    diffs: Option<HashMap<String, serde_json::Value>>,
}

/**
 * The Component struct represents a component with dynamic properties.
 */
struct Component {
    properties: HashMap<String, serde_json::Value>,
}

/**
 * The Components struct represents a collection of components.
 *
 * id: The component identified by id.
 */
struct Components {
    components: HashMap<String, Component>,
}

/**
 * The Context struct represents the context for the changes.
 *
 * components: The components.
 */
struct Context {
    components: Components,
}

/**
 * The Changes struct provides methods for managing changes in a context.
 *
 * context: The context in which changes are to be managed.
 * diffs: The diffs of the changes.
 */
struct Changes {
    context: Context,
    diffs: HashMap<String, serde_json::Value>,
}

impl Changes {
    /**
     * Creates a new instance of the Changes struct.
     *
     * context: The context in which changes are to be managed.
     * changes: An optional initial set of changes.
     */
    fn new(context: Context, changes: ChangesInput) -> Self {
        let diffs = changes.diffs.unwrap_or_default();
        Changes { context, diffs }
    }

    /**
     * Changes a component in the current context.
     *
     * id: The ID of the component to be changed.
     * key: The key of the property to be changed.
     * new_value: The new value of the property.
     */
    fn change_component(&mut self, id: String, key: String, new_value: serde_json::Value) {
        self.upsert_component(id, key, new_value);
    }

    /**
     * Resets the changes to a new set of changes or an empty object if no changes are provided.
     *
     * changes: The new set of changes.
     */
    fn reset(&mut self, changes: ChangesInput) {
        self.diffs = changes.diffs.unwrap_or_default();
    }

    /**
     * Updates an existing component or inserts a new one if it doesn't exist in the current context.
     *
     * id: The ID of the component to be updated or inserted.
     * key: The key of the property to be updated or inserted.
     * new_value: The new value of the property.
     */
    fn upsert_component(&mut self, id: String, key: String, new_value: serde_json::Value) {
        let context = &mut self.context;
        let components = &mut context.components;
        let current_scope = components.components.entry(id).or_insert_with(Component::default);
        let diff_object = self.diffs.entry(id).or_insert_with(serde_json::Value::default);
        recursive_diff(key, diff_object, current_scope, new_value);
    }
}

fn recursive_diff(key: String, diff: &mut serde_json::Value, scope: &mut Component, next_val: serde_json::Value) {
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
            scope.properties.insert(key.clone(), serde_json::Value::from(v2));
            diff[key] = serde_json::Value::from(d);
        }
        "array" => {
            let diff = diff.get_mut(&key).unwrap();
            let scope = scope.properties.get_mut(&key).unwrap();
            if let serde_json::Value::Array(next_val) = next_val {
                for (i, next_val) in next_val.into_iter().enumerate() {
                    recursive_diff(i.to_string(), diff, scope, next_val);
                }
            }
        }
        "object" => {
            let diff = diff.get_mut(&key).unwrap();
            let scope = scope.properties.get_mut(&key).unwrap();
            if let serde_json::Value::Object(next_val) = next_val {
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

fn type_of(value: &serde_json::Value) -> &str {
    match value {
        serde_json::Value::Null => "null",
        serde_json::Value::Bool(_) => "boolean",
        serde_json::Value::Number(_) => "number",
        serde_json::Value::String(_) => "string",
        serde_json::Value::Array(_) => "array",
        serde_json::Value::Object(_) => "object",
    }
}

impl Default for Component {
    fn default() -> Self {
        Component {
            properties: HashMap::new(),
        }
    }
}

impl Default for Changes {
    fn default() -> Self {
        Changes {
            context: Context {
                components: Components {
                    components: HashMap::new(),
                },
            },
            diffs: HashMap::new(),
        }
    }
}
