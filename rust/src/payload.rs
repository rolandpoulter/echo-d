use hash::HashMap;

enum Payload {
    Array(Vec<Payload>),
    String(String),
    Number(i32),
    HashMap(HashMap<String, Payload>),
}
