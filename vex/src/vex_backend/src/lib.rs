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

const MAX_VALUE_SIZE: u32 = 500;

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
    
    static TICKETS: RefCell<StableBTreeMap<u64, Ticket, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))),
        )
    );

    static TICKET_ID_COUNTER: RefCell<u64> = RefCell::new(0);
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

#[derive(Clone, Debug, CandidType, Deserialize, Serialize, PartialEq, Copy)]
enum TicketType {
    Bug,
    Feature,
    Support,
    Maintenance,
    Other,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize, PartialEq, Copy)]
enum TicketStatus {
    Open,
    InProgress,
    OnHold,
    Resolved,
    Closed,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct TicketMessage {
    id: u64,
    user_id: u64,
    content: String,
    created_at: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct Ticket {
    id: u64,
    title: String,
    description: String,
    ticket_type: TicketType,
    status: TicketStatus,
    assignee_id: Option<u64>,
    created_by: u64,
    created_at: u64,
    updated_at: u64,
    resolved_at: Option<u64>,
    priority: u8, // 1-5 scale where 1 is highest
    messages: Vec<TicketMessage>,
}

impl Storable for Ticket {
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

#[update]
fn create_ticket(
    title: String,
    description: String,
    ticket_type: TicketType,
    created_by: u64,
    priority: u8,
) -> Result<Ticket, String> {
    // Validate priority is between 1-5
    if priority < 1 || priority > 5 {
        return Err("Priority must be between 1 and 5".to_string());
    }

    // Validate user exists
    let user_exists = USERS.with(|users| users.borrow().get(&created_by).is_some());
    if !user_exists {
        return Err("Created by user does not exist".to_string());
    }

    let id = TICKET_ID_COUNTER.with(|counter| {
        let mut c = counter.borrow_mut();
        *c += 1;
        *c
    });

    let current_time = time();
    
    let ticket = Ticket {
        id,
        title,
        description,
        ticket_type,
        status: TicketStatus::Open,
        assignee_id: None,
        created_by,
        created_at: current_time,
        updated_at: current_time,
        resolved_at: None,
        priority,
        messages: Vec::new(),
    };

    TICKETS.with(|tickets| {
        tickets.borrow_mut().insert(id, ticket.clone());
    });

    Ok(ticket)
}

#[query]
fn get_ticket(id: u64) -> Option<Ticket> {
    TICKETS.with(|tickets| tickets.borrow().get(&id))
}

#[query]
fn get_all_tickets() -> Vec<Ticket> {
    TICKETS.with(|tickets| {
        tickets
            .borrow()
            .iter()
            .map(|(_, ticket)| ticket.clone())
            .collect()
    })
}

#[query]
fn get_tickets_by_type(ticket_type: TicketType) -> Vec<Ticket> {
    TICKETS.with(|tickets| {
        tickets
            .borrow()
            .iter()
            .filter(|(_, t)| t.ticket_type == ticket_type)
            .map(|(_, ticket)| ticket.clone())
            .collect()
    })
}

#[query]
fn get_tickets_by_status(status: TicketStatus) -> Vec<Ticket> {
    TICKETS.with(|tickets| {
        tickets
            .borrow()
            .iter()
            .filter(|(_, t)| t.status == status)
            .map(|(_, ticket)| ticket.clone())
            .collect()
    })
}

#[query]
fn get_tickets_by_assignee(assignee_id: u64) -> Vec<Ticket> {
    TICKETS.with(|tickets| {
        tickets
            .borrow()
            .iter()
            .filter(|(_, t)| t.assignee_id == Some(assignee_id))
            .map(|(_, ticket)| ticket.clone())
            .collect()
    })
}

#[update]
fn update_ticket_status(id: u64, status: TicketStatus) -> Result<Ticket, String> {
    TICKETS.with(|tickets| {
        let mut tickets = tickets.borrow_mut();
        match tickets.get(&id) {
            Some(mut ticket) => {
                ticket.status = status;
                ticket.updated_at = time();
                
                // If resolved, set resolved_at timestamp
                if matches!(status, TicketStatus::Resolved) {
                    ticket.resolved_at = Some(time());
                }
                
                tickets.insert(id, ticket.clone());
                Ok(ticket)
            }
            None => Err("Ticket not found".to_string()),
        }
    })
}

#[update]
fn assign_ticket(id: u64, assignee_id: Option<u64>) -> Result<Ticket, String> {
    // If assignee_id is Some, validate user exists
    if let Some(user_id) = assignee_id {
        let user_exists = USERS.with(|users| users.borrow().get(&user_id).is_some());
        if !user_exists {
            return Err("Assignee user does not exist".to_string());
        }
    }

    TICKETS.with(|tickets| {
        let mut tickets = tickets.borrow_mut();
        match tickets.get(&id) {
            Some(mut ticket) => {
                ticket.assignee_id = assignee_id;
                ticket.updated_at = time();
                tickets.insert(id, ticket.clone());
                Ok(ticket)
            }
            None => Err("Ticket not found".to_string()),
        }
    })
}

#[update]
fn update_ticket(
    id: u64,
    title: Option<String>,
    description: Option<String>,
    ticket_type: Option<TicketType>,
    priority: Option<u8>,
) -> Result<Ticket, String> {
    // Validate priority if provided
    if let Some(p) = priority {
        if p < 1 || p > 5 {
            return Err("Priority must be between 1 and 5".to_string());
        }
    }

    TICKETS.with(|tickets| {
        let mut tickets = tickets.borrow_mut();
        match tickets.get(&id) {
            Some(mut ticket) => {
                if let Some(t) = title {
                    ticket.title = t;
                }
                if let Some(d) = description {
                    ticket.description = d;
                }
                if let Some(tt) = ticket_type {
                    ticket.ticket_type = tt;
                }
                if let Some(p) = priority {
                    ticket.priority = p;
                }
                
                ticket.updated_at = time();
                tickets.insert(id, ticket.clone());
                Ok(ticket)
            }
            None => Err("Ticket not found".to_string()),
        }
    })
}

#[update]
fn delete_ticket(id: u64) -> Result<(), String> {
    TICKETS.with(|tickets| {
        let mut tickets = tickets.borrow_mut();
        if tickets.remove(&id).is_some() {
            Ok(())
        } else {
            Err("Ticket not found".to_string())
        }
    })
}

// Statistics endpoints
#[query]
fn get_ticket_stats() -> TicketStats {
    TICKETS.with(|tickets| {
        let tickets = tickets.borrow();
        let all_tickets: Vec<Ticket> = tickets.iter().map(|(_, t)| t.clone()).collect();
        
        let total = all_tickets.len() as u64;
        let open = all_tickets.iter().filter(|t| matches!(t.status, TicketStatus::Open)).count() as u64;
        let in_progress = all_tickets.iter().filter(|t| matches!(t.status, TicketStatus::InProgress)).count() as u64;
        let on_hold = all_tickets.iter().filter(|t| matches!(t.status, TicketStatus::OnHold)).count() as u64;
        let resolved = all_tickets.iter().filter(|t| matches!(t.status, TicketStatus::Resolved)).count() as u64;
        let closed = all_tickets.iter().filter(|t| matches!(t.status, TicketStatus::Closed)).count() as u64;
        
        let by_type = all_tickets.iter().fold(std::collections::HashMap::new(), |mut acc, t| {
            let key = format!("{:?}", t.ticket_type);
            *acc.entry(key).or_insert(0) += 1;
            acc
        });

        // Calculate average resolution time for resolved tickets
        let resolved_tickets: Vec<&Ticket> = all_tickets.iter()
            .filter(|t| t.resolved_at.is_some())
            .collect();
        
        let avg_resolution_time = if !resolved_tickets.is_empty() {
            resolved_tickets.iter()
                .map(|t| t.resolved_at.unwrap() - t.created_at)
                .sum::<u64>() / resolved_tickets.len() as u64
        } else {
            0
        };

        TicketStats {
            total,
            by_status: StatusCounts { open, in_progress, on_hold, resolved, closed },
            by_type,
            avg_resolution_time_ns: avg_resolution_time,
        }
    })
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct StatusCounts {
    open: u64,
    in_progress: u64,
    on_hold: u64,
    resolved: u64,
    closed: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
struct TicketStats {
    total: u64,
    by_status: StatusCounts,
    by_type: std::collections::HashMap<String, i32>,
    avg_resolution_time_ns: u64,
}

#[query]
fn heart_beat(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
fn add_message_to_ticket(ticket_id: u64, user_id: u64, content: String) -> Result<Ticket, String> {
    // Validate user exists
    let user_exists = USERS.with(|users| users.borrow().get(&user_id).is_some());
    if !user_exists {
        return Err("User does not exist".to_string());
    }
    
    // Check if content is empty
    if content.trim().is_empty() {
        return Err("Message content cannot be empty".to_string());
    }

    TICKETS.with(|tickets| {
        let mut tickets = tickets.borrow_mut();
        match tickets.get(&ticket_id) {
            Some(mut ticket) => {
                // Generate a message id (simple incremental id within the ticket)
                let message_id = ticket.messages.len() as u64 + 1;
                
                // Create new message
                let message = TicketMessage {
                    id: message_id,
                    user_id,
                    content,
                    created_at: time(),
                };
                
                // Add message to ticket
                ticket.messages.push(message);
                
                // Update ticket's updated_at time
                ticket.updated_at = time();
                
                // Save updated ticket
                tickets.insert(ticket_id, ticket.clone());
                Ok(ticket)
            }
            None => Err("Ticket not found".to_string()),
        }
    })
}

#[query]
fn get_ticket_messages(ticket_id: u64) -> Result<Vec<TicketMessage>, String> {
    TICKETS.with(|tickets| {
        match tickets.borrow().get(&ticket_id) {
            Some(ticket) => Ok(ticket.messages),
            None => Err("Ticket not found".to_string()),
        }
    })
}

ic_cdk::export_candid!();
