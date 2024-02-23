use serde_json::Value;

use std::clone::Clone;
use std::cmp::Eq;
use std::hash::Hash;
use std::ops::Add;
// use std::collections::HashMap;
use crate::hash::{HashMap, HashSet};
use crate::types::{Action, EnumObject, SetOrVec};

/**
 * Creates a union of multiple sets or vec.
 *
 * @param sets - The sets or vec to be united.
 * @returns The union of the sets or vec.
 */
pub fn union_sets<'a, T: Eq + Hash + Clone, const S: usize>(
    sets: [SetOrVec<&T>; S],
) -> Vec<&T> {
    let mut union: HashSet<&T> = HashSet::new();

    for set in sets {
        match set {
            SetOrVec::Set(set) => {
                for v in set {
                    union.insert(&v.clone());
                }
            }
            SetOrVec::Vec(vec) => {
                for v in vec {
                    union.insert(&v.clone());
                }
            }
        }
    }

    union.into_iter().collect()
}

/**
 * Creates an enum from a set or a vec.
 *
 * @param set - The set or vec from which the enum is to be created.
 * @param offset - The starting value of the enum.
 * @returns The created enum.
 */
pub fn create_enum<'a, T: Eq + Hash + Clone>(set: SetOrVec<T>, offset: u16) -> EnumObject<'a, T, u32> {
    let mut enum_map: EnumObject<T, u32> = HashMap::new();

    let mut i: u32 = offset as u32;

    match set {
        SetOrVec::Set(set) => {
            for v in set {
                enum_map.insert(v.clone(), i.into());
                i += 1;
            }
        }
        SetOrVec::Vec(vec) => {
            for v in vec {
                enum_map.insert(v.clone(), i);
                i += 1;
            }
        }
    }

    enum_map
}

/**
 * Creates a tuple from a message.
 *
 * @param message - The message from which the tuple is to be created.
 * @returns The created tuple.
 */
pub fn message_tuple<'a>(
    message: Option<(Option<&'a Action<'a>>, Option<&'a Value>)>,
) -> (Option<&'a Action<'a>>, Option<&'a Value>) {
    match message {
        Some((action, payload)) => (action.clone(), payload.clone()),
        _ => (None, None),
    }
}

/**
 * Determines the type of a value.
 *
 * @param v - The value whose type is to be determined.
 * @returns The type of the value.
 */
pub fn type_of<T>(v: &T) -> &'static str {
    let t = std::any::type_name::<T>();
    if t == "std::option::Option<T>" {
        return "option";
    } else if t == "std::vec::Vec<T>" {
        return "vec";
    } else if t == "std::collections::HashSet<T>" {
        return "set";
    } else if t == "std::collections::HashMap<K, V>" {
        return "map";
    } else if t == "std::string::String" {
        return "string";
    } else if t == "i32" {
        return "number";
    } else if t == "bool" {
        return "boolean";
    } else if t == "()" {
        return "null";
    }
    "unknown"
}

// pub fn type_of(value: &Value) -> &str {
//     match value {
//         Value::Null => "null",
//         Value::Bool(_) => "boolean",
//         Value::Number(_) => "number",
//         Value::String(_) => "string",
//         Value::Array(_) => "array",
//         Value::Object(_) => "object",
//     }
// }

/**
 * Combines two values.
 *
 * @param obj_a - The first value.
 * @param obj_b - The second value.
 * @returns A tuple where the first element is a boolean indicating whether the values were combined, and the second element is the combined value.
 */
pub fn combine_values<T: Hash + Eq + Clone>(obj_a: &T, obj_b: &T) -> (bool, T) {
    // recursive_combination(obj_a, obj_b)
    (false, obj_b.clone())
}

/**
 * Recursively combines two values.
 *
 * @param obj_a - The first value.
 * @param obj_b - The second value.
 * @returns A tuple where the first element is a boolean indicating whether the values were combined, and the second element is the combined value.
 */
pub fn recursive_combination<T: Hash + Add + Eq + Clone>(obj_a: &T, obj_b: &T) -> (bool, T) {
    let type_a = type_of(obj_a);
    let type_b = type_of(obj_b);

    // match type_b {
    //     "number" => {
    //         if type_a != "number" && type_a != "bigint" {
    //             return (false, obj_b.clone());
    //         }
    //         let combined: <T as Add<T>>::Output = *obj_a + *obj_b;
    //         (true, combined)
    //     }
    //     "vec" => {
    //         if type_a != "vec" {
    //             return (false, [obj_b.clone()].to_vec());
    //         }
    //         let mut new_vec: Vec<T> = Vec::new();
    //         let mut combined = true;
    //         for (i, (a, b)) in obj_a.iter().zip(obj_b.iter()).enumerate() {
    //             let (c, value) = recursive_combination(a, b);
    //             new_vec.push(value);
    //             if !c {
    //                 combined = false;
    //             }
    //         }
    //         (combined, new_vec)
    //     }
    //     "map" => {
    //         if type_a != "map" {
    //             return (false, obj_b.clone());
    //         }
    //         let mut new_map: HashMap<T, T> = HashMap::new();
    //         let mut combined = true;
    //         for (k, v) in obj_b.iter() {
    //             if let Some(a) = obj_a.get(k) {
    //                 let (c, value) = recursive_combination(a, v);
    //                 if !c {
    //                     combined = false;
    //                 }
    //                 new_map.insert(k.clone(), value);
    //             } else {
    //                 new_map.insert(k.clone(), v.clone());
    //             }
    //         }
    //         (combined, new_map)
    //     }
    //     _ => (false, obj_b.clone()),
    // }
    (false, obj_b.clone())
}
