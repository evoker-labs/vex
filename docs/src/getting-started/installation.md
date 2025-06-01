# Installation

This guide will walk you through the process of installing and setting up VEX for your project. There are multiple ways to use VEX, depending on your needs:

## Option 1: Deploy Your Own VEX Canister

This option gives you full control over your VEX instance and data.

### 1. Clone the VEX Repository

```bash
git clone https://github.com/love4game/vex.git
cd vex
```

### 2. Set Up the Development Environment

Ensure you have the [prerequisites](./prerequisites.md) installed, then start the DFX environment:

```bash
# Using standard DFX
dfx start --background --clean

# Or using Nix
nix-shell https://github.com/ninegua/ic-nix/releases/latest/download/dfx-env.tar.gz
dfx start --background --clean
```

### 3. Deploy the VEX Canister Locally

```bash
dfx deploy vex_backend
```

This will deploy the VEX backend canister to your local replica. Note the canister ID that is output, as you'll need it for your frontend integration.

### 4. Deploy to the Internet Computer (Optional)

To deploy to the IC mainnet:

```bash
dfx deploy --network ic vex_backend
```

Make sure you have a cycles wallet configured with sufficient cycles before deploying to the mainnet.

## Option 2: Use the Client Libraries with Our Hosted Service

If you prefer not to deploy your own canister, you can use our hosted VEX service.

### 1. Install the VEX Client Library

For a JavaScript/TypeScript project:

```bash
# Using npm
npm install @vex/client

# Using yarn
yarn add @vex/client

# Using pnpm
pnpm add @vex/client
```

### 2. Install Framework-Specific Components (Optional)

We provide pre-built UI components for popular frameworks:

```bash
# For React
npm install @vex/react-components

# For Vue
npm install @vex/vue-components

# For Angular
npm install @vex/angular-components
```

### 3. Configure the VEX Client

In your application code, initialize the VEX client:

```javascript
import { VexClient } from '@vex/client';

const vexClient = new VexClient({
  // For our hosted service
  canisterId: 'aaaaa-bbbbb-ccccc-ddddd-eee',
  
  // Or for your own deployment
  // canisterId: 'YOUR_CANISTER_ID',
  
  // Authentication options
  authProvider: 'internetIdentity', // or 'oauth' for Web2 apps
});
```

## Option 3: Use VEX as a Direct Dependency

For Rust projects, you can include VEX as a direct dependency:

### 1. Add VEX to Your Cargo.toml

```toml
[dependencies]
vex_backend = { git = "https://github.com/love4game/vex.git" }
```

### 2. Import and Use VEX in Your Rust Code

```rust
use vex_backend::{User, Ticket, TicketType, TicketStatus};

// Use VEX functionality in your code
```

## Verifying Your Installation

To verify that VEX is installed and working properly:

### For Local Canister Deployment

```bash
dfx canister call vex_backend heart_beat '("test")'
```

This should return `"Heartbeat received: test"`.

### For Client Library Installation

```javascript
// In your application code
vexClient.ping()
  .then(response => console.log('VEX client connected:', response))
  .catch(error => console.error('VEX client connection failed:', error));
```

## Next Steps

Now that you have VEX installed, proceed to the [Quick Start](./quick-start.md) guide to create your first VEX integration. 