use crate::hash::HashSet;

const STRINGS: HashSet<String> = HashSet::new();

pub fn str(s: &str) -> &String {
    let string = String::from(s);
    if let Some(str) = STRINGS.get(&string) {
        str
    } else {
        STRINGS.insert(string);
        &string
    }
}

pub fn str_drop(s: &str) {
    STRINGS.remove(&String::from(s));
}

pub fn string(s: &String) -> &String {
    if let Some(str) = STRINGS.get(s) {
        str
    } else {
        STRINGS.insert(s);
        &s
    }
}

pub fn string_drop(s: &String) {
    STRINGS.remove(&s);
}