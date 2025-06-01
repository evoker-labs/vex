# Quick Start Guide

This guide will help you quickly implement VEX in your application. We'll walk through creating a simple support ticket system that allows users to create, view, and manage tickets.

## Prerequisites

Ensure you have completed the [Installation](./installation.md) steps and have VEX set up in your project.

## 1. Basic VEX Client Setup

Let's start by initializing the VEX client in your application:

```javascript
// Import the VEX client library
import { VexClient } from '@vex/client';

// Initialize the client
const vexClient = new VexClient({
  canisterId: 'YOUR_CANISTER_ID', // Replace with your canister ID or use the hosted service
  
  // For ICP dapps
  authProvider: 'internetIdentity',
  
  // For Web2 applications
  // authProvider: 'oauth',
  // oauthConfig: {
  //   provider: 'google', // or 'github', 'facebook', etc.
  //   clientId: 'YOUR_OAUTH_CLIENT_ID',
  //   redirectUri: 'YOUR_REDIRECT_URI'
  // }
});
```

## 2. User Management

### Registering a User

```javascript
async function registerUser(name, email) {
  try {
    const user = await vexClient.createUser(name, email);
    console.log('User registered:', user);
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Example usage
const user = await registerUser('John Doe', 'john@example.com');
```

### Getting User Information

```javascript
async function getUserInfo(userId) {
  try {
    const user = await vexClient.getUser(userId);
    console.log('User info:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Example usage
const userInfo = await getUserInfo(user.id);
```

## 3. Creating and Managing Tickets

### Creating a Ticket

```javascript
async function createSupportTicket(title, description, type, userId, priority = 3) {
  try {
    const ticket = await vexClient.createTicket(
      title,
      description,
      type, // 'Bug', 'Feature', 'Support', 'Maintenance', or 'Other'
      userId,
      priority // 1-5, where 1 is highest priority
    );
    console.log('Ticket created:', ticket);
    return ticket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
}

// Example usage
const ticket = await createSupportTicket(
  'Login Issue',
  'Unable to log in using Google authentication',
  'Bug',
  user.id,
  2 // High priority
);
```

### Retrieving Tickets

```javascript
// Get a specific ticket
async function getTicket(ticketId) {
  return await vexClient.getTicket(ticketId);
}

// Get all tickets
async function getAllTickets() {
  return await vexClient.getAllTickets();
}

// Get tickets by status
async function getTicketsByStatus(status) {
  // status can be 'Open', 'InProgress', 'OnHold', 'Resolved', or 'Closed'
  return await vexClient.getTicketsByStatus(status);
}

// Get tickets by type
async function getTicketsByType(type) {
  // type can be 'Bug', 'Feature', 'Support', 'Maintenance', or 'Other'
  return await vexClient.getTicketsByType(type);
}
```

### Updating Ticket Status

```javascript
async function updateTicketStatus(ticketId, newStatus) {
  try {
    const updatedTicket = await vexClient.updateTicketStatus(ticketId, newStatus);
    console.log('Ticket updated:', updatedTicket);
    return updatedTicket;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
}

// Example usage
const updatedTicket = await updateTicketStatus(ticket.id, 'InProgress');
```

### Adding Messages to a Ticket

```javascript
async function addTicketMessage(ticketId, userId, message) {
  try {
    const updatedTicket = await vexClient.addMessageToTicket(ticketId, userId, message);
    console.log('Message added:', updatedTicket);
    return updatedTicket;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
}

// Example usage
const ticketWithMessage = await addTicketMessage(
  ticket.id, 
  user.id, 
  'I tried clearing cache and cookies but still having the issue.'
);
```

## 4. Using Pre-built UI Components (Optional)

If you're using React, you can utilize our pre-built components:

```jsx
import React, { useState, useEffect } from 'react';
import { VexClient } from '@vex/client';
import { TicketList, TicketForm, TicketDetails } from '@vex/react-components';

// Initialize client
const vexClient = new VexClient({
  canisterId: 'YOUR_CANISTER_ID',
  authProvider: 'internetIdentity',
});

function SupportPortal() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  
  // Load tickets on component mount
  useEffect(() => {
    async function loadTickets() {
      const allTickets = await vexClient.getAllTickets();
      setTickets(allTickets);
    }
    
    if (user) {
      loadTickets();
    }
  }, [user]);
  
  // Handle user authentication
  useEffect(() => {
    async function checkAuth() {
      const userData = await vexClient.getCurrentUser();
      setUser(userData);
    }
    
    checkAuth();
  }, []);
  
  if (!user) {
    return <div>Loading or authentication required...</div>;
  }
  
  return (
    <div className="support-portal">
      <h1>Support Portal</h1>
      
      <div className="ticket-form-container">
        <h2>Create New Ticket</h2>
        <TicketForm 
          client={vexClient}
          userId={user.id}
          onSubmit={(newTicket) => {
            setTickets([...tickets, newTicket]);
          }}
        />
      </div>
      
      <div className="ticket-list-container">
        <h2>Your Tickets</h2>
        <TicketList
          tickets={tickets}
          onSelectTicket={(ticket) => setSelectedTicket(ticket)}
        />
      </div>
      
      {selectedTicket && (
        <div className="ticket-details-container">
          <h2>Ticket Details</h2>
          <TicketDetails
            ticket={selectedTicket}
            client={vexClient}
            userId={user.id}
            onUpdate={(updatedTicket) => {
              setSelectedTicket(updatedTicket);
              setTickets(tickets.map(t => 
                t.id === updatedTicket.id ? updatedTicket : t
              ));
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SupportPortal;
```

## 5. Next Steps

Congratulations! You've implemented a basic VEX integration in your application. Here are some next steps to explore:

- Check out the [API Reference](../api/index.md) for detailed information on all available methods
- Learn about [Web2 Integration](../integration/web2.md) for traditional web applications
- Explore [ICP Dapps Integration](../integration/icp-dapps.md) for Internet Computer applications
- See [Examples](../examples/index.md) for more complex implementation patterns

For any questions or issues, join our community on [Discord](#) or [Telegram](#). 