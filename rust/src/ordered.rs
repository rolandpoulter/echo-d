use chrono::Utc;

use crate::hash::HashMap;

/**
 * The OrderedData struct represents a mapping from keys to tick values.
 */
// type OrderedData<'a> = HashMap<u64, u32>;
// #[derive(Clone)]
type OrderedData<'a> = HashMap<&'a String, HashMap<&'a String, i64>>;

pub enum OrderedInput<'a> {
    Instance(&'a Ordered<'a>),
    Data(&'a OrderedData<'a>),
}

/**
 * The Ordered struct represents a collection of tick values.
 */
pub struct Ordered<'a> {
    ticks: &'a OrderedData<'a>,
}

impl<'a> Ordered<'a> {
    /**
     * Constructs a new Ordered object.
     *
     * @param {OrderedData} ticks - The initial tick values.
     */
    pub fn new(ordered: &OrderedInput) -> Self {
        match ordered {
            OrderedInput::Instance(instance) => {
                Ordered { ticks: instance.ticks }
            }
            OrderedInput::Data(data) => {
                Ordered { ticks: data }
            }
        }
        // ticks: &OrderedData
        // Ordered { ticks }
    }

    /**
     * Changes the tick value of a component.
     *
     * @param {String} id - The ID of the component.
     * @param {String} key - The key of the component.
     * @param {i32} tick - The new tick value.
     * @returns {bool} Whether the operation was successful.
     */
    pub fn change_component(&mut self, id: &String, key: &String, tick: i64) -> bool {
        self.upsert_component(id, key, tick)
    }

    /**
     * Resets the tick values.
     *
     * @param {OrderedData} ticks - The new tick values.
     * @returns {Ordered} The Ordered object.
     */
    pub fn reset(&mut self, ticks: &OrderedData) {
        self.ticks = ticks;
    }

    /**
     * Inserts or updates the tick value of a component.
     *
     * @param {String} id - The ID of the component.
     * @param {String} key - The key of the component.
     * @param {i32} tick - The new tick value.
     * @returns {bool} Whether the operation was successful.
     */
    pub fn upsert_component(&mut self, id: &String, key: &String, tick: i64) -> bool {
        let component = self.ticks.entry(&id).or_insert(HashMap::new());
        match component.get(&key) {
            Some(existing_tick) => {
                if existing_tick < &tick {
                    let threshold = 0;
                    if tick > (Utc::now().timestamp() + threshold) {
                        return false;
                    }
                    component.insert(&key, tick);
                    return true;
                }
                false
            }
            None => {
                component.insert(&key, tick);
                true
            }
        }
    }
}
