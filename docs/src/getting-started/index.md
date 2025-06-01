# Getting Started with VEX

Welcome to VEX! This section will guide you through the process of setting up and integrating VEX into your applications, whether they're Internet Computer dapps or traditional Web2 applications.

## Overview

VEX is designed to be flexible and easy to integrate. The core components include:

1. **VEX Backend Canister**: A Rust-based Internet Computer canister that handles data storage and business logic
2. **VEX Client Libraries**: JavaScript/TypeScript libraries for easy integration with frontend applications
3. **Optional UI Components**: Pre-built UI components for common frameworks like React, Vue, and Angular

## Integration Paths

There are several ways to integrate VEX into your application:

### Path 1: Deploy Your Own VEX Canister
For complete control and customization, you can deploy your own instance of the VEX canister on the Internet Computer. This is ideal for projects that require full customization and data ownership.

### Path 2: Use VEX as a Service
For faster integration, you can use our hosted VEX service. This option is perfect for teams that want to get started quickly without managing infrastructure.

### Path 3: Hybrid Approach
Combine local components with our cloud services for a customized solution that balances control and convenience.

## Quick Start

To get started with VEX:

1. Check the [Prerequisites](./prerequisites.md) to ensure your environment is properly set up
2. Follow the [Installation Guide](./installation.md) to install VEX in your project
3. Walk through the [Quick Start Guide](./quick-start.md) to create your first VEX integration

## Example Implementation

Here's a simple example of what a VEX integration might look like in a React application:

```jsx
import { VexClient } from '@vex/client';
import { TicketForm } from '@vex/react-components';

// Initialize the VEX client
const vexClient = new VexClient({
  canisterId: 'YOUR_CANISTER_ID',
  // For Web2 applications
  authProvider: 'oauth', 
  // For ICP applications
  // authProvider: 'internetIdentity',
});

function SupportPage() {
  return (
    <div className="support-page">
      <h1>Support</h1>
      <TicketForm 
        client={vexClient}
        onSubmit={(ticket) => console.log('Ticket created:', ticket)}
      />
    </div>
  );
}
```

Ready to get started? Head over to the [Prerequisites](./prerequisites.md) page to begin your VEX integration journey. 