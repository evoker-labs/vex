#[ic_cdk::query]
fn heart_beat(name: String) -> String {
    format!("Hello, {}!", name)
}

use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use std::cell::RefCell;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static MAP: RefCell<StableBTreeMap<u128, u128, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );
}

#[ic_cdk::query]
fn get(key: u128) -> Option<u128> {
    MAP.with(|p| p.borrow().get(&key))
}

#[ic_cdk::update]
fn insert(key: u128, value: u128) -> Option<u128> {
    MAP.with(|p| p.borrow_mut().insert(key, value))
}

ic_cdk::export_candid!();
