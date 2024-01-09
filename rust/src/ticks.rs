// use std::collections::HashMap;
use rustc_hash::HashMap;

/**
 * The TicksData struct represents a mapping from keys to tick values.
 */
struct TicksData {
    data: HashMap<String, HashMap<String, i32>>,
}

/**
 * The Ticks struct represents a collection of tick values.
 */
struct Ticks {
    ticks: TicksData,
}

impl Ticks {
    /**
     * Constructs a new Ticks object.
     *
     * @param {TicksData} ticks - The initial tick values.
     */
    fn new(ticks: TicksData) -> Self {
        Ticks { ticks }
    }

    /**
     * Changes the tick value of a component.
     *
     * @param {String} id - The ID of the component.
     * @param {String} key - The key of the component.
     * @param {i32} tick - The new tick value.
     * @returns {bool} Whether the operation was successful.
     */
    fn change_component(&mut self, id: String, key: String, tick: i32) -> bool {
        self.upsert_component(id, key, tick)
    }

    /**
     * Resets the tick values.
     *
     * @param {TicksData} ticks - The new tick values.
     * @returns {Ticks} The Ticks object.
     */
    fn reset(&mut self, ticks: TicksData) {
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
    fn upsert_component(&mut self, id: String, key: String, tick: i32) -> bool {
        let component = self.ticks.data.entry(id).or_insert(HashMap::new());
        match component.get(&key) {
            Some(existing_tick) => {
                if existing_tick < &tick {
                    let threshold = 0;
                    if tick > (chrono::Utc::now().timestamp() + threshold) {
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
