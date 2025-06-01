# Users API

The Users API provides methods for managing users in the VEX system. This includes creating, retrieving, updating, and deleting user accounts.

## Data Types

### User

```typescript
interface User {
  id: bigint;        // Unique identifier for the user
  name: string;      // User's display name
  email: string;     // User's email address
  created_at: bigint; // Timestamp when the user was created (nanoseconds)
}
```

## API Methods

### Create User

Creates a new user in the system.

#### Candid Signature

```candid
create_user: (name: text, email: text) -> (variant { Ok: User; Err: text });
```

#### Client Library

```typescript
async function createUser(name: string, email: string): Promise<User>
```

#### Example

```javascript
// Using the client library
const user = await vexClient.createUser('John Doe', 'john@example.com');
console.log('Created user:', user);

// Using dfx directly
dfx canister call vex_backend create_user '("John Doe", "john@example.com")'
```

#### Parameters

- `name` (string): The display name for the user
- `email` (string): The email address for the user

#### Returns

- On success: User object
- On failure: Error message

#### Possible Errors

- "Email already in use"
- "Invalid email format"
- "Name cannot be empty"

---

### Get User

Retrieves a user by their ID.

#### Candid Signature

```candid
get_user: (id: nat64) -> (opt User) query;
```

#### Client Library

```typescript
async function getUser(id: bigint): Promise<User | null>
```

#### Example

```javascript
// Using the client library
const user = await vexClient.getUser(BigInt(123));
if (user) {
  console.log('Found user:', user);
} else {
  console.log('User not found');
}

// Using dfx directly
dfx canister call vex_backend get_user '(123)'
```

#### Parameters

- `id` (bigint): The unique identifier of the user to retrieve

#### Returns

- If user exists: User object
- If user does not exist: null

---

### Get All Users

Retrieves all users in the system.

#### Candid Signature

```candid
get_all_users: () -> (vec User) query;
```

#### Client Library

```typescript
async function getAllUsers(): Promise<User[]>
```

#### Example

```javascript
// Using the client library
const users = await vexClient.getAllUsers();
console.log('All users:', users);

// Using dfx directly
dfx canister call vex_backend get_all_users
```

#### Parameters

None

#### Returns

An array of User objects

---

### Update User

Updates an existing user's information.

#### Candid Signature

```candid
update_user: (id: nat64, name: opt text, email: opt text) -> (variant { Ok: User; Err: text });
```

#### Client Library

```typescript
async function updateUser(id: bigint, updates: { name?: string; email?: string }): Promise<User>
```

#### Example

```javascript
// Using the client library
const updatedUser = await vexClient.updateUser(BigInt(123), {
  name: 'John Smith',
  email: 'john.smith@example.com'
});
console.log('Updated user:', updatedUser);

// Using dfx directly
dfx canister call vex_backend update_user '(123, opt "John Smith", opt "john.smith@example.com")'
```

#### Parameters

- `id` (bigint): The unique identifier of the user to update
- `name` (string, optional): The new display name for the user
- `email` (string, optional): The new email address for the user

#### Returns

- On success: Updated User object
- On failure: Error message

#### Possible Errors

- "User not found"
- "Email already in use"
- "Invalid email format"

---

### Delete User

Deletes a user from the system.

#### Candid Signature

```candid
delete_user: (id: nat64) -> (variant { Ok; Err: text });
```

#### Client Library

```typescript
async function deleteUser(id: bigint): Promise<void>
```

#### Example

```javascript
// Using the client library
try {
  await vexClient.deleteUser(BigInt(123));
  console.log('User deleted successfully');
} catch (error) {
  console.error('Failed to delete user:', error);
}

// Using dfx directly
dfx canister call vex_backend delete_user '(123)'
```

#### Parameters

- `id` (bigint): The unique identifier of the user to delete

#### Returns

- On success: Empty success value
- On failure: Error message

#### Possible Errors

- "User not found"
- "Cannot delete user with active tickets"

## Best Practices

1. **Error Handling**: Always handle potential errors when calling these methods
2. **Validation**: Validate user input before sending to the API
3. **Security**: Control access to user management functions appropriately
4. **Batch Operations**: For operations involving multiple users, consider using batched API calls for better performance 