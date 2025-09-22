## Quick Setup

### Prerequisites

```bash
# Using DFX directly
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Or using Nix
nix-shell https://github.com/ninegua/ic-nix/releases/latest/download/dfx-env.tar.gz

# Install LLVM linker
nix shell nixpkgs#lld

# Install Candid extractor
cargo install candid-extractor
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/love4game/vex.git
cd vex

# Start the local replica
dfx start --background --clean

# Deploy the backend canister
dfx deploy vex_backend

# Deploy the frontend assets
dfx deploy vex_frontend
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please check out our contributing guidelines in the documentation.
