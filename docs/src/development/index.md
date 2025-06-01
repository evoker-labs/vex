# Development Guide

This section provides information for developers who want to contribute to VEX or understand its architecture in more detail.

## Development Philosophy

VEX is built with the following principles in mind:

1. **Decentralization** - Leverage the Internet Computer's capabilities for true decentralization
2. **Interoperability** - Seamless integration with both Web2 and Web3 environments
3. **Developer Experience** - Intuitive APIs and clear documentation
4. **Extensibility** - Modular design that allows for customization and extension

## Project Structure

The VEX project is organized as follows:

```
vex/
├── .github/            # GitHub workflows and configuration
├── docs/               # Documentation source files
├── src/                # Source code
│   ├── vex_backend/    # Rust canister code for the backend
│   └── vex_frontend/   # Frontend code (JavaScript/TypeScript)
├── dfx.json            # Internet Computer project configuration
├── Cargo.toml          # Rust workspace configuration
├── README.md           # Project overview
└── LICENSE             # Project license
```

## Development Environment

To set up a development environment:

1. Install the required [prerequisites](../getting-started/prerequisites.md)
2. Clone the repository:
   ```bash
   git clone https://github.com/love4game/vex.git
   cd vex
   ```
3. Start the local IC replica:
   ```bash
   dfx start --background --clean
   ```
4. Deploy the canisters locally:
   ```bash
   dfx deploy
   ```

## Development Workflow

1. **Feature Planning**: New features are planned and discussed in GitHub issues
2. **Implementation**: Features are implemented in feature branches
3. **Testing**: Comprehensive tests are added for new features
4. **Code Review**: Pull requests are reviewed by maintainers
5. **Integration**: Approved changes are merged into the main branch
6. **Release**: Stable versions are tagged and released periodically

## Testing

VEX includes several types of tests:

- **Unit Tests**: Tests for individual functions and components
- **Integration Tests**: Tests for interaction between components
- **End-to-End Tests**: Tests for complete user flows

To run the tests:

```bash
# Backend unit tests
cd src/vex_backend
cargo test

# Frontend tests
cd src/vex_frontend
npm test
```

## Building for Production

To build VEX for production:

```bash
# Build the backend canister
dfx build vex_backend

# Build the frontend assets
dfx build vex_frontend
```

## Continuous Integration

VEX uses GitHub Actions for continuous integration:

- **Build Check**: Runs on every push and pull request
- **Test Suite**: Runs all tests on every push and pull request
- **Linting**: Checks code style and quality
- **Documentation**: Builds and verifies documentation

## Further Reading

- [Architecture](./architecture.md) - Detailed architecture of VEX
- [Contributing](./contributing.md) - Guidelines for contributing to VEX

For any questions or discussions about development, join our community on [Discord](#) or [Telegram](#). 