pub mod constants;
pub mod types;

pub mod string;
pub mod utils;
pub mod hash;

pub mod symbols;
pub mod pending;
pub mod changes;
pub mod ordered;

pub mod index_manager;
pub mod index;

pub mod updater;

pub mod options;
pub mod context;

pub mod async_storage;
pub mod storage;
pub mod actions;

pub mod events;

pub mod client;
pub mod node;

pub mod extra;
pub mod examples;

pub mod handler;

extern crate cfg_if;
extern crate wasm_bindgen;

// mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-game-of-life!");
}