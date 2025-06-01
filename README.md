# VEX - Internet Computer Support & Ticketing System

VEX is a powerful library and API designed to seamlessly integrate support and ticketing systems with Internet Computer Protocol (ICP) dapps and traditional Web2 applications.

## Features

- Complete ticketing system with user management
- Seamless integration with both ICP dapps and traditional web applications
- Secure, decentralized storage of support data
- Customizable workflows for ticket resolution
- Real-time updates and notifications

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
cd vex

# Deploy the backend canister
dfx deploy vex_backend

# Deploy the frontend assets
dfx deploy vex_frontend
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- Business Overview
- Getting Started
- Integration Guides
- API Reference
- Examples

To build and view the documentation:

```bash
cd docs
mdbook build
mdbook serve --open
```

## Integration

VEX can be integrated with:

- Internet Computer dapps
- Traditional web applications
- Mobile applications via web views
- Custom interfaces through the API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please check out our contributing guidelines in the documentation.
