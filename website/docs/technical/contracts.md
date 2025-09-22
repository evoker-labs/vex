---
sidebar_position: 4
---

# Smart Contracts

## VEX Smart Contract Architecture

Our smart contracts are deployed on the Internet Computer Protocol (ICP) and manage the core functionality of the VEX platform.

## Core Contracts

### BusinessRegistry

Manages business registration and verification on the blockchain.

```typescript
// Canister ID: ryjl3-tyaaa-aaaaa-aaaba-cai
interface BusinessRegistry {
  // Register a new business
  registerBusiness(details: BusinessDetails): Promise<BusinessId>;
  
  // Update business information
  updateBusiness(id: BusinessId, updates: Partial<BusinessDetails>): Promise<void>;
  
  // Verify business credentials
  verifyBusiness(id: BusinessId, proof: VerificationProof): Promise<VerificationStatus>;
  
  // Query business details
  getBusiness(id: BusinessId): Promise<Business | null>;
  
  // List all businesses
  listBusinesses(filter: BusinessFilter): Promise<Business[]>;
}

interface BusinessDetails {
  name: string;
  description: string;
  website: string;
  category: Category[];
  walletAddress: Principal;
  metadata: Record<string, any>;
}
```

### FeedbackEngine

Handles feedback submission, validation, and reward distribution.

```typescript
// Canister ID: rdmx6-jaaaa-aaaaa-aaadq-cai
interface FeedbackEngine {
  // Submit new feedback
  submitFeedback(feedback: FeedbackSubmission): Promise<FeedbackId>;
  
  // Validate feedback authenticity
  validateFeedback(id: FeedbackId): Promise<ValidationResult>;
  
  // Calculate user reputation
  calculateReputation(userId: Principal): Promise<ReputationScore>;
  
  // Distribute token rewards
  distributeRewards(feedbackId: FeedbackId): Promise<TokenAmount>;
  
  // Query feedback
  getFeedback(id: FeedbackId): Promise<Feedback | null>;
  
  // Business response
  respondToFeedback(
    feedbackId: FeedbackId, 
    response: string
  ): Promise<void>;
}

interface FeedbackSubmission {
  businessId: BusinessId;
  rating: number; // 1-5
  comment: string;
  transactionProof?: TransactionProof;
  metadata: Record<string, any>;
}
```

### VEXToken

ERC-20 compatible token contract for the VEX ecosystem.

```typescript
// Canister ID: ryjl3-tyaaa-aaaaa-aaaba-cai
interface VEXToken {
  // Token information
  name(): Promise<string>;
  symbol(): Promise<string>;
  decimals(): Promise<number>;
  totalSupply(): Promise<bigint>;
  
  // Balance queries
  balanceOf(owner: Principal): Promise<bigint>;
  
  // Transfers
  transfer(to: Principal, amount: bigint): Promise<boolean>;
  transferFrom(
    from: Principal, 
    to: Principal, 
    amount: bigint
  ): Promise<boolean>;
  
  // Allowances
  approve(spender: Principal, amount: bigint): Promise<boolean>;
  allowance(owner: Principal, spender: Principal): Promise<bigint>;
  
  // Staking
  stake(amount: bigint, duration: number): Promise<StakeReceipt>;
  unstake(stakeId: string): Promise<bigint>;
  
  // Governance
  delegate(to: Principal): Promise<void>;
  vote(proposalId: string, support: boolean): Promise<void>;
}
```

### GovernanceDAO

Manages platform governance and community decisions.

```typescript
// Canister ID: suaf3-hqaaa-aaaaf-qaaya-cai
interface GovernanceDAO {
  // Create proposal
  propose(proposal: ProposalData): Promise<ProposalId>;
  
  // Vote on proposal
  castVote(
    proposalId: ProposalId, 
    support: boolean, 
    reason?: string
  ): Promise<void>;
  
  // Execute proposal
  execute(proposalId: ProposalId): Promise<ExecutionResult>;
  
  // Query proposals
  getProposal(id: ProposalId): Promise<Proposal | null>;
  listProposals(filter: ProposalFilter): Promise<Proposal[]>;
  
  // Delegation
  delegate(delegatee: Principal): Promise<void>;
  getDelegates(delegator: Principal): Promise<Principal[]>;
}

interface ProposalData {
  title: string;
  description: string;
  category: ProposalCategory;
  actions: ProposalAction[];
  startTime: bigint;
  endTime: bigint;
}
```

## Contract Interactions

### Web3 Integration

```javascript
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/vex';

// Initialize agent
const agent = new HttpAgent({
  host: 'https://ic0.app'
});

// Create actor
const vexActor = Actor.createActor(idlFactory, {
  agent,
  canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai'
});

// Submit feedback
const feedback = await vexActor.submitFeedback({
  businessId: Principal.fromText('business-principal'),
  rating: BigInt(5),
  comment: 'Excellent service!',
  transactionProof: proof
});

console.log('Feedback submitted:', feedback);
```

### Direct Canister Calls

```bash
# Query business details
dfx canister call business_registry getBusiness '("business_123")'

# Submit feedback
dfx canister call feedback_engine submitFeedback '(record {
  businessId = "business_123";
  rating = 5;
  comment = "Great experience!";
})'

# Check token balance
dfx canister call vex_token balanceOf '(principal "your-principal-id")'
```

## Security Features

### Access Control
```typescript
// Role-based permissions
enum Role {
  Admin = 'admin',
  Moderator = 'moderator',
  Business = 'business',
  User = 'user'
}

// Permission checks
function requireRole(role: Role): void {
  if (!hasRole(caller(), role)) {
    throw new Error('Unauthorized');
  }
}
```

### Anti-Sybil Mechanisms
- One account per verified identity
- Reputation-weighted voting
- Time-based review limits
- Transaction proof requirements

### Upgrade Security
- Multi-signature upgrade authority
- Time-locked upgrades
- Community approval for major changes
- Automated security audits

## Gas Optimization

### Batch Operations
```typescript
// Batch feedback submission
interface BatchFeedback {
  submitBatch(feedbacks: FeedbackSubmission[]): Promise<FeedbackId[]>;
}

// Batch token transfers
interface BatchTransfer {
  transferBatch(transfers: Transfer[]): Promise<boolean[]>;
}
```

### Storage Optimization
- IPFS for large data storage
- Merkle trees for proof verification
- Compressed data structures
- Efficient indexing strategies

## Testing

### Local Development
```bash
# Deploy contracts locally
dfx deploy --network local

# Run tests
npm run test:contracts

# Check coverage
npm run coverage:contracts
```

### Test Networks
- **Local**: http://localhost:8000
- **Testnet**: https://testnet.dfinity.network
- **Mainnet**: https://ic0.app

### Mock Contracts
```typescript
import { MockBusinessRegistry } from '@vex/test-utils';

const mockRegistry = new MockBusinessRegistry();
mockRegistry.setBusiness('business_123', {
  name: 'Test Business',
  trustScore: 95
});

const business = await mockRegistry.getBusiness('business_123');
```

## Audits & Security

### Audit Reports
- [Audit #1 - CertiK (March 2024)](#)
- [Audit #2 - Trail of Bits (April 2024)](#)

### Bug Bounty Program
- Critical: Up to $50,000
- High: Up to $10,000
- Medium: Up to $2,500
- Low: Up to $500

Report vulnerabilities to: security@vex.network

## Deployment Addresses

### Mainnet (ICP)
```
BusinessRegistry: ryjl3-tyaaa-aaaaa-aaaba-cai
FeedbackEngine: rdmx6-jaaaa-aaaaa-aaadq-cai
VEXToken: rrkah-fqaaa-aaaaa-aaaaq-cai
GovernanceDAO: suaf3-hqaaa-aaaaf-qaaya-cai
```

### Testnet
```
BusinessRegistry: xkbqi-2qaaa-aaaah-qbpqq-cai
FeedbackEngine: xnjld-iqaaa-aaaah-qcqbq-cai
VEXToken: rdmx6-jaaaa-aaaaa-aaadq-cai
GovernanceDAO: be2us-64aaa-aaaaa-qaabq-cai
```

## Resources

- [Contract Source Code](https://github.com/vex-network/contracts)
- [Integration Examples](/technical/examples)
- [Motoko Documentation](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [ICP Developer Forum](https://forum.dfinity.org)