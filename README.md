

# VEX: Ticket-Oriented CRM on the Internet Computer

**VEX** is a modular, decentralized Customer Relationship Management system built on the Internet Computer Protocol (ICP). It leverages a canister-based architecture to deliver secure, scalable, and maintainable CRM workflows such as ticket handling, reputation tracking, and analytics.

## Overview

This project is designed with a focus on ISO 25010 software quality characteristics:

* **Functional Suitability**: Covers essential CRM workflows including ticket lifecycle, reputation, and analytics.
* **Performance Efficiency**: Achieves sub-second response times via parallel canister execution.
* **Security**: End-to-end encryption for private tickets and authentication using Internet Identity.
* **Maintainability**: Modular design with versioned canisters enabling safe and independent upgrades.

### Layers

1. **Presentation Layer**: A React Single Page Application (SPA) connected via ICP agent.
2. **Application Layer**:

   * Ticket management: state transitions (e.g., Open → Closed)
   * Analytics engine: lightweight, rule-based insights
3. **Data Layer**: On-chain storage using ICP's stable memory with structured persistence

### Design Highlights

* **Canister Sharding**: Enables horizontal scaling of ticket data.
* **Stateless Frontend**: Sessions are handled through Internet Identity.
* **Lightweight Analytics**: Avoids ML-heavy computations for better cost and speed on-chain.


## DOCS


**[c0utin.github.io/vex](https://c0utin.github.io/vex/)**

## License

This project is licensed under the APACHE 2.0 License. See the `LICENSE` file for more details.

