# Prerequisites

Before you start using VEX, ensure that your development environment meets the following requirements:

## Development Environment

### For Local Development and Deployment

- **Rust** (version 1.60 or later)
  - Required for compiling the VEX canister
  - [Installation instructions](https://www.rust-lang.org/tools/install)

- **Node.js** (version 16 or later)
  - Required for frontend development and client libraries
  - [Installation instructions](https://nodejs.org/)

- **DFX** (version 0.14.0 or later)
  - The Internet Computer SDK for local development and deployment
  - Install using the following command:
  ```bash
  sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
  ```
  - Or using Nix:
  ```bash
  nix-shell https://github.com/ninegua/ic-nix/releases/latest/download/dfx-env.tar.gz
  ```

- **Candid Extractor** (for development only)
  - Used to generate Candid interfaces
  ```bash
  cargo install candid-extractor
  ```

- **LLVM linker** (lld)
  - Required for optimized builds
  - Install using your package manager or with Nix:
  ```bash
  nix shell nixpkgs#lld
  ```

## Internet Computer Network Access

If you're deploying to the Internet Computer mainnet or testnet:

- **ICP Tokens** - Required for canister creation and cycles
- **Cycles Wallet** - To fund your canisters with cycles
- **Internet Identity** - For authentication (optional but recommended)

## For Web2 Integration

If you're integrating VEX with a Web2 application:

- **Authentication Provider** - OAuth 2.0 compatible provider (Google, GitHub, etc.)
- **HTTPS Endpoint** - For secure communication with your backend
- **Cross-Origin Resource Sharing (CORS)** - Configured to allow requests from your domain

## Hardware Requirements

- **Memory**: At least 8GB RAM for local development
- **Storage**: At least 1GB free space
- **Processor**: Modern multi-core CPU (Intel i5/AMD Ryzen 5 or better)

## Network Requirements

- **Internet Connection**: Stable broadband connection
- **Firewall Settings**: Allow outbound connections to the Internet Computer network

## Next Steps

Once you have all prerequisites in place, proceed to the [Installation](./installation.md) guide to set up VEX in your project. 