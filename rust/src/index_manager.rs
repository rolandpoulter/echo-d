use crate::index::Index;
// TODO: boundless spatial grid hash 3d

/**
 * The IndexManager struct manages multiple indexes.
 */
pub struct IndexManager<'a> {
    indexes: &'a Vec<&'a Index>,
}

impl<'a> IndexManager<'a> {
    /**
     * Constructs a new IndexManager object.
     */
    pub fn new() -> Self {
        IndexManager {
            indexes: &Vec::new(),
        }
    }
}
