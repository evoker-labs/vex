# API Reference

This section provides a comprehensive reference for the VEX API, including all available endpoints, methods, data types, and usage examples.

## API Overview

VEX provides two main interfaces:

1. **Candid Interface** - For direct interaction with the VEX canister from other canisters or applications
2. **Client Library API** - For higher-level interaction with VEX from frontend applications

## Core Concepts

### Authentication

All API operations are subject to authentication and authorization. VEX supports:

- Internet Identity for ICP dapps
- OAuth for traditional web applications
- API keys for system-to-system integration

### Data Types

VEX uses the following core data types:

- **User** - Represents a user in the system
- **Ticket** - Represents a support ticket
- **TicketMessage** - Represents a message within a ticket
- **TicketStatus** - Represents the status of a ticket (Open, InProgress, OnHold, Resolved, Closed)
- **TicketType** - Represents the type of a ticket (Bug, Feature, Support, Maintenance, Other)

### Error Handling

API methods return structured error responses that include:

- Error code
- Error message
- Error details (when available)

## API Sections

- [Users API](./users.md) - Methods for user management
- [Tickets API](./tickets.md) - Methods for ticket management

## API Usage Examples

### Candid Interface Example

```candid
// Call the VEX canister directly
dfx canister call vex_backend create_user '("John Doe", "john@example.com")'
```

### JavaScript Client Example

```javascript
// Using the VEX client library
import { VexClient } from '@vex/client';

const vexClient = new VexClient({
  canisterId: 'YOUR_CANISTER_ID',
  authProvider: 'internetIdentity',
});

// Create a user
const user = await vexClient.createUser('John Doe', 'john@example.com');

// Create a ticket
const ticket = await vexClient.createTicket(
  'Login Issue',
  'Unable to log in using Google authentication',
  'Bug',
  user.id,
  2 // High priority
);
```

### Rust Canister Integration Example

```rust
// From another canister
#[update]
async fn create_support_ticket(title: String, description: String) -> Result<Ticket, String> {
    let user_id = get_current_user_id();
    
    let create_ticket_args = CreateTicketArgs {
        title,
        description,
        ticket_type: TicketType::Support,
        created_by: user_id,
        priority: 3,
    };
    
    let ticket: Result<Ticket, String> = ic_cdk::call(
        Principal::from_text("YOUR_VEX_CANISTER_ID").unwrap(),
        "create_ticket",
        (create_ticket_args,),
    )
    .await
    .map_err(|e| format!("Error calling VEX canister: {:?}", e))?;
    
    ticket
}
```

## API Versioning

VEX follows semantic versioning. The current API version is `0.1.0`.

- Major version changes indicate incompatible API changes
- Minor version changes indicate added functionality in a backward-compatible manner
- Patch version changes indicate backward-compatible bug fixes

For more detailed information about specific API endpoints and methods, see the respective API reference pages. 