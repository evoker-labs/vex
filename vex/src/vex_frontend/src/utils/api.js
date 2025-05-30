import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../declarations/vex_backend/vex_backend.did.js";

const agent = new HttpAgent();
// Fetch root key for certificate validation during development
if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

// Canister ID from your dfx.json
const canisterId = process.env.CANISTER_ID_VEX_BACKEND || process.env.VEX_BACKEND_CANISTER_ID;

export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const vexBackend = createActor(canisterId);

// Ticket Type mapping between frontend and backend
export const TicketTypeMap = {
  bug: "Bug",
  feature: "Feature",
  support: "Support",
  maintenance: "Maintenance",
  other: "Other",
};

// Status mapping between frontend and backend
export const TicketStatusMap = {
  open: "Open",
  "on-going": "InProgress",
  "on-hold": "OnHold",
  resolved: "Resolved",
  closed: "Closed",
};

// API functions for tickets
export const ticketsApi = {
  // Create a new ticket
  createTicket: async (title, description, type, userId, priority) => {
    try {
      const backendType = Object.keys(TicketTypeMap).find(
        key => TicketTypeMap[key].toLowerCase() === type.toLowerCase()
      ) || "other";
      
      const response = await vexBackend.create_ticket(
        title, 
        description, 
        { [backendType]: null }, // Convert to backend enum format
        BigInt(userId), 
        priority
      );
      
      return response.Ok;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  // Get all tickets
  getAllTickets: async () => {
    try {
      const tickets = await vexBackend.get_all_tickets();
      return tickets;
    } catch (error) {
      console.error("Error getting tickets:", error);
      throw error;
    }
  },

  // Get a single ticket by ID
  getTicket: async (id) => {
    try {
      const ticket = await vexBackend.get_ticket(BigInt(id));
      return ticket;
    } catch (error) {
      console.error("Error getting ticket:", error);
      throw error;
    }
  },

  // Update ticket details
  updateTicket: async (id, title, description, type, priority) => {
    try {
      const backendType = type ? {
        [Object.keys(TicketTypeMap).find(
          key => TicketTypeMap[key].toLowerCase() === type.toLowerCase()
        ) || "other"]: null
      } : null;
      
      const response = await vexBackend.update_ticket(
        BigInt(id),
        title ? [title] : [], // Convert to opt format
        description ? [description] : [],
        backendType ? [backendType] : [],
        priority ? [priority] : []
      );
      
      return response.Ok;
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  },

  // Update ticket status
  updateTicketStatus: async (id, status) => {
    try {
      const backendStatus = Object.keys(TicketStatusMap).find(
        key => key === status.toLowerCase()
      ) || "open";
      
      const response = await vexBackend.update_ticket_status(
        BigInt(id),
        { [backendStatus]: null } // Convert to backend enum format
      );
      
      return response.Ok;
    } catch (error) {
      console.error("Error updating ticket status:", error);
      throw error;
    }
  },

  // Assign ticket to a user
  assignTicket: async (id, assigneeId) => {
    try {
      const response = await vexBackend.assign_ticket(
        BigInt(id),
        assigneeId ? [BigInt(assigneeId)] : [] // Convert to opt format
      );
      
      return response.Ok;
    } catch (error) {
      console.error("Error assigning ticket:", error);
      throw error;
    }
  },

  // Delete a ticket
  deleteTicket: async (id) => {
    try {
      const response = await vexBackend.delete_ticket(BigInt(id));
      return response.Ok;
    } catch (error) {
      console.error("Error deleting ticket:", error);
      throw error;
    }
  },

  // Add a message to a ticket
  addMessage: async (ticketId, userId, content) => {
    try {
      const response = await vexBackend.add_message_to_ticket(
        BigInt(ticketId),
        BigInt(userId),
        content
      );
      
      return response.Ok;
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    }
  },

  // Get ticket statistics
  getTicketStats: async () => {
    try {
      const stats = await vexBackend.get_ticket_stats();
      return stats;
    } catch (error) {
      console.error("Error getting ticket stats:", error);
      throw error;
    }
  }
}; 