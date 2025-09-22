# VEX Technical Documentation

## Architecture Overview

```
Frontend Layer (React + Vite)
    ↓
Internet Computer Canisters
    ↓
Smart Contracts (Motoko/Rust)
    ↓
├── Review Storage (On-chain)
├── Token Management (VEX Token)
├── DAO Governance
└── TLSN Verification
```

## Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS, Framer Motion
- **Backend**: Internet Computer (Motoko/Rust)
- **Blockchain**: Internet Computer Protocol (ICP)
- **Authentication**: Internet Identity, Plug Wallet
- **Verification**: TLS Notary (TLSN)
- **Storage**: On-chain data storage
- **Smart Contracts**: Motoko

## Development Setup

### Prerequisites

- Node.js v18+
- DFX (Internet Computer SDK) 
- pnpm or npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vex.git
cd vex/vex
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start local Internet Computer replica:
```bash
dfx start --clean --background
```

4. Deploy canisters:
```bash
dfx deploy
```

5. Start the frontend development server:
```bash
cd src/vex_frontend
pnpm dev
# or
npm run dev
```

6. Access the application:
```
Local IC: http://{canister-id}.localhost:4943
Development: http://localhost:5173
```

## Project Structure

```
vex/
├── src/
│   ├── vex_backend/         # Backend canister code (Rust)
│   │   ├── src/
│   │   │   └── lib.rs       # Main backend logic
│   │   └── Cargo.toml       # Rust dependencies
│   │
│   ├── vex_frontend/        # Frontend application
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── pages/       # Page components
│   │   │   ├── routes.jsx   # Routing configuration
│   │   │   └── App.jsx      # Main app component
│   │   ├── vite.config.js   # Vite configuration
│   │   └── package.json     # Frontend dependencies
│   │
│   └── declarations/        # Auto-generated canister interfaces
│
├── .dfx/                    # Local canister IDs and state
├── dfx.json                 # DFX configuration
└── package.json             # Root package configuration
```

## Key Features Implementation

### 1. Business Registration
- Canister method: `register_business()`
- Stores business data on-chain
- Generates unique business ID

### 2. Review Submission
- Canister method: `submit_review()`
- TLSN verification for authenticity
- Immutable storage on blockchain

### 3. Token Management
- VEX token smart contract
- Reward distribution system
- Staking mechanisms

### 4. DAO Governance
- Proposal creation and voting
- Token-weighted voting power
- On-chain execution

## Frontend Routes

- `/` - Landing page
- `/client-dashboard` - Client dashboard
- `/business-dashboard` - Business dashboard
- `/submit-review` - Review submission
- `/dao` - DAO governance interface
- `/app/*` - Legacy app routes

## API Endpoints (Canister Methods)

### Business Operations
```
register_business(business_data) -> Result<BusinessId, Error>
get_business(business_id) -> Result<Business, Error>
update_business(business_id, updates) -> Result<(), Error>
```

### Review Operations
```
submit_review(review_data) -> Result<ReviewId, Error>
get_reviews(business_id) -> Result<Vec<Review>, Error>
verify_review(review_id) -> Result<bool, Error>
```

### Token Operations
```
transfer(to, amount) -> Result<(), Error>
balance_of(account) -> Result<u64, Error>
approve(spender, amount) -> Result<(), Error>
```

### DAO Operations
```
create_proposal(proposal_data) -> Result<ProposalId, Error>
vote(proposal_id, vote) -> Result<(), Error>
execute_proposal(proposal_id) -> Result<(), Error>
```

## Development Commands

### Build and Deploy
```bash
# Build backend
dfx build vex_backend

# Build frontend
cd src/vex_frontend && pnpm build

# Deploy all
dfx deploy

# Deploy specific canister
dfx deploy vex_backend
```

### Testing
```bash
# Run frontend tests
cd src/vex_frontend && pnpm test

# Run backend tests
cargo test

# Run integration tests
dfx canister call vex_backend run_tests
```

### Generate Candid Interface
```bash
dfx generate
```

### Local Development
```bash
# Start replica
dfx start --clean

# Deploy locally
dfx deploy --network local

# Check canister status
dfx canister status --all
```

## Environment Variables

Create `.env` file in `src/vex_frontend/`:
```env
VITE_DFX_NETWORK=local
VITE_BACKEND_CANISTER_ID=<backend-canister-id>
```

## Smart Contract Architecture

### Review Storage Contract
- Immutable review records
- Cryptographic verification
- IPFS integration for media

### Token Contract (VEX)
- ERC-20 compatible interface
- Minting and burning mechanisms
- Governance integration

### DAO Contract
- Proposal lifecycle management
- Voting mechanisms
- Treasury management

## Security Considerations

1. **Data Integrity**: All data cryptographically signed
2. **Access Control**: Role-based permissions
3. **Rate Limiting**: Protection against spam
4. **Audit Trail**: All actions logged on-chain
5. **TLSN Verification**: Prevents fake reviews

## Performance Optimization

- Lazy loading for frontend components
- Query caching mechanisms
- Batch processing for reviews
- Optimized canister cycles usage

## Troubleshooting

### Common Issues

1. **Canister not found**
   ```bash
   dfx canister id vex_backend
   ```

2. **Frontend not connecting**
   - Check canister IDs in `.dfx/local/canister_ids.json`
   - Verify network configuration

3. **Build failures**
   ```bash
   dfx stop
   rm -rf .dfx
   dfx start --clean
   ```

## Additional Resources

- [Internet Computer SDK Docs](https://sdk.dfinity.org/)
- [Motoko Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/)