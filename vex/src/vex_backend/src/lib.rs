use ic_cdk::api::time;
use ic_cdk::query;
use ic_cdk::update;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::borrow::Cow;
use std::cell::RefCell;

use candid::{CandidType, Deserialize};
use serde::Serialize;

type Memory = VirtualMemory<DefaultMemoryImpl>;

const MAX_VALUE_SIZE: u32 = 100;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static MAP: RefCell<StableBTreeMap<u128, u128, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );

    static USERS: RefCell<StableBTreeMap<u64, User, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))),
        )
    );

    static USER_ID_COUNTER: RefCell<u64> = RefCell::new(0);
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct User {
    id: u64,
    name: String,
    email: String,
    created_at: u64,
}

impl Storable for User {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}

#[update]
fn create_user(name: String, email: String) -> Result<User, String> {
    let id = USER_ID_COUNTER.with(|counter| {
        let mut c = counter.borrow_mut();
        *c += 1;
        *c
    });

    let user = User {
        id,
        name,
        email,
        created_at: time(),
    };

    USERS.with(|users| {
        users.borrow_mut().insert(id, user.clone());
    });

    Ok(user)
}

#[query]
fn get_user(id: u64) -> Option<User> {
    USERS.with(|users| users.borrow().get(&id))
}

#[query]
fn get_all_users() -> Vec<User> {
    USERS.with(|users| {
        users
            .borrow()
            .iter()
            .map(|(_, user)| user.clone())
            .collect()
    })
}

#[update]
fn update_user(id: u64, name: Option<String>, email: Option<String>) -> Result<User, String> {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        match users.get(&id) {
            Some(mut user) => {
                if let Some(n) = name {
                    user.name = n;
                }
                if let Some(e) = email {
                    user.email = e;
                }
                users.insert(id, user.clone());
                Ok(user)
            }
            None => Err("User not found".to_string()),
        }
    })
}

#[update]
fn delete_user(id: u64) -> Result<(), String> {
    USERS.with(|users| {
        let mut users = users.borrow_mut();
        if users.remove(&id).is_some() {
            Ok(())
        } else {
            Err("User not found".to_string())
        }
    })
}

#[query]
fn heart_beat(name: String) -> String {
    format!("Hello, {}!", name)
}

ic_cdk::export_candid!();
