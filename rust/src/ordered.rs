use chrono::Utc;

use crate::hash::HashMap;

/**
 * The OrderedData struct represents a mapping from keys to tick values.
 */
type OrderedData = HashMap<u64, u32>;

/**
 * The Ordered struct represents a collection of tick values.
 */
pub struct Ordered<'a> {
    ticks: &'a OrderedData,
}

impl<'a> Ordered<'a> {
    /**
     * Constructs a new Ordered object.
     *
     * @param {OrderedData} ticks - The initial tick values.
     */
    pub fn new(ticks: &OrderedData) -> Self {
        Ordered { ticks }
    }

    /**
     * Changes the tick value of a component.
     *
     * @param {String} id - The ID of the component.
     * @param {String} key - The key of the component.
     * @param {i32} tick - The new tick value.
     * @returns {bool} Whether the operation was successful.
     */
    pub fn change_component(&mut self, id: String, key: String, tick: i32) -> bool {
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
    pub fn upsert_component(&mut self, id: String, key: String, tick: i32) -> bool {
        let component = self.ticks.data.entry(id).or_insert(HashMap::new());
        match component.get(&key) {
            Some(existing_tick) => {
                if existing_tick < &tick {
                    let threshold = 0;
                    if tick > (Utc::now().timestamp() + threshold) {
                        return false;
                    }
                    component.insert(key, tick);
                    return true;
                }
                false
            }
            None => {
                component.insert(key, tick);
                true
            }
        }
    }
}
