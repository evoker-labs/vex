import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vex_backend } from 'declarations/vex_backend';

function Tickets() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Status mapping between frontend and backend
  const statusMap = {
    open: "Open",
    "on-going": "InProgress",
    "on-hold": "OnHold",
    resolved: "Resolved",
    closed: "Closed",
  };
  
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchTickets(),
        fetchUsers()
      ]);
    };
    
    loadData();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching all users...");
      const userData = await vex_backend.get_all_users();
      
      if (Array.isArray(userData) && userData.length > 0) {
        // Convert BigInt IDs to numbers for easier comparison
        const processedUsers = userData.map(user => ({
          ...user,
          id: Number(user.id)
        }));
        
        setUsers(processedUsers);
        console.log("Fetched users:", processedUsers);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      // Don't set error state here to avoid blocking ticket display
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching all tickets...");
      
      const ticketsData = await vex_backend.get_all_tickets();
      
      // Handle BigInt serialization using a sanitizer function
      const sanitizeForJSON = (obj) => {
        if (obj === null || obj === undefined) return obj;
        
        // Handle different types of data
        if (typeof obj === 'bigint') return Number(obj);
        if (typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(sanitizeForJSON);
        
        // Handle regular objects
        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
          sanitized[key] = sanitizeForJSON(value);
        }
        return sanitized;
      };
      
      // Log safely sanitized data
      const sanitizedData = sanitizeForJSON(ticketsData);
      console.log("Tickets data response:", sanitizedData);
      
      // Handle variant response structure (if applicable)
      let processedTickets = ticketsData;
      
      if (ticketsData && typeof ticketsData === 'object' && !Array.isArray(ticketsData)) {
        // Check if it's in a variant structure like { Ok: [...tickets] }
        if ('Ok' in ticketsData && Array.isArray(ticketsData.Ok)) {
          processedTickets = ticketsData.Ok;
          console.log("Extracted tickets from Ok variant");
        } else {
          // Try to find an array in the response object
          const arrayProps = Object.entries(ticketsData)
            .find(([_, value]) => Array.isArray(value));
            
          if (arrayProps) {
            processedTickets = arrayProps[1];
            console.log(`Extracted tickets from ${arrayProps[0]} property`);
          }
        }
      }
      
      // Ensure the response is an array
      if (!Array.isArray(processedTickets)) {
        console.error("Expected an array of tickets but got:", sanitizedData);
        setTickets([]);
        setError('Received invalid ticket data format from server');
      } else {
        // Filter out null tickets before setting state
        const validTickets = processedTickets.filter(ticket => 
          ticket !== null && ticket !== undefined
        );
        
        console.log(`Found ${validTickets.length} valid tickets`);
        setTickets(validTickets || []);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Map backend status to frontend status names
  const getStatusName = (backendStatus) => {
    if (!backendStatus || Object.keys(backendStatus).length === 0) {
      return 'open'; // Default status
    }
    
    try {
      const statusKey = Object.entries(statusMap).find(
        ([_, value]) => {
          const statusObj = Object.keys(backendStatus)[0];
          return value === statusObj;
        }
      );
      return statusKey ? statusKey[0] : 'open';
    } catch (err) {
      console.error('Error processing status:', err, backendStatus);
      return 'open';
    }
  };

  // Safe getter for ticket properties with default values
  const safelyGet = (obj, path, defaultValue = '') => {
    try {
      if (!obj) return defaultValue;
      
      const properties = path.split('.');
      let result = obj;
      
      for (const prop of properties) {
        if (result === undefined || result === null) return defaultValue;
        result = result[prop];
      }
      
      return result !== undefined && result !== null ? result : defaultValue;
    } catch (err) {
      console.error(`Error accessing ${path}:`, err);
      return defaultValue;
    }
  };

  // Find user by ID with safety check
  const getUserById = (userId) => {
    if (!userId) return null;
    
    try {
      const numericId = Number(userId);
      return users.find(user => user.id === numericId) || null;
    } catch (err) {
      console.error('Error finding user:', err);
      return null;
    }
  };

  // Convert backend ticket to frontend format
  const formatTicket = (ticket) => {
    try {
      if (!ticket || typeof ticket !== 'object') {
        console.warn('Invalid ticket object:', ticket);
        return null; // Return null for invalid tickets - will be filtered out later
      }
      
      // Sanitize the ticket data to ensure it doesn't contain BigInt values
      const sanitizeValue = (value) => {
        if (value === null || value === undefined) return null;
        if (typeof value === 'bigint') return Number(value);
        if (typeof value !== 'object') return value;
        if (Array.isArray(value)) return value.map(sanitizeValue);
        
        const result = {};
        for (const [key, val] of Object.entries(value)) {
          result[key] = sanitizeValue(val);
        }
        return result;
      };
      
      const safeTicket = sanitizeValue(ticket);
      
      // Safely get ticket ID
      let ticketId;
      try {
        ticketId = typeof safeTicket.id === 'bigint' ? Number(safeTicket.id) : Number(safeTicket.id);
        if (isNaN(ticketId) || ticketId <= 0) {
          console.warn('Invalid or missing ticket ID:', safeTicket.id);
          ticketId = 0; // Use 0 to indicate invalid ID
        }
      } catch (err) {
        console.error('Error processing ticket ID:', err);
        ticketId = 0;
      }
      
      // Extract the ticket type - with better error handling
      let ticketTypeKey = "Bug"; // Default
      try {
        if (safeTicket.ticket_type) {
          if (typeof safeTicket.ticket_type === 'string') {
            ticketTypeKey = safeTicket.ticket_type;
          } else if (typeof safeTicket.ticket_type === 'object') {
            // Handle variant structure {TypeName: null}
            const keys = Object.keys(safeTicket.ticket_type);
            if (keys.length > 0) {
              ticketTypeKey = keys[0];
            }
          }
        }
      } catch (err) {
        console.error('Error extracting ticket type:', err);
      }
      
      // Extract status with better error handling
      let statusKey = "Open"; // Default status
      let statusName = "open"; // Default frontend status
      
      try {
        if (safeTicket.status) {
          if (typeof safeTicket.status === 'string') {
            statusKey = safeTicket.status;
          } else if (typeof safeTicket.status === 'object') {
            // Handle variant structure {StatusName: null}
            const keys = Object.keys(safeTicket.status);
            if (keys.length > 0) {
              statusKey = keys[0];
            }
          }
          
          // Map backend status to frontend status string
          const statusEntry = Object.entries(statusMap).find(
            ([_, value]) => value === statusKey
          );
          
          if (statusEntry) {
            statusName = statusEntry[0];
          }
        }
      } catch (err) {
        console.error('Error extracting ticket status:', err);
      }

      // Safely process creator and assignee IDs
      let creatorId = null;
      try {
        if (safeTicket.created_by !== null && safeTicket.created_by !== undefined) {
          creatorId = Number(safeTicket.created_by);
        }
      } catch (err) {
        console.error('Error processing creator ID:', err);
      }
      
      let assigneeId = null;
      try {
        if (safeTicket.assignee_id !== null && safeTicket.assignee_id !== undefined) {
          assigneeId = Number(safeTicket.assignee_id);
        }
      } catch (err) {
        console.error('Error processing assignee ID:', err);
      }
      
      // Find creator and assignee from users list
      const creator = getUserById(creatorId);
      const assignee = getUserById(assigneeId);
      
      // Safely process message count
      let messageCount = 0;
      try {
        if (Array.isArray(safeTicket.messages)) {
          messageCount = safeTicket.messages.length;
        }
      } catch (err) {
        console.error('Error counting messages:', err);
      }
      
      // Safely format created date
      let createdAt = 'Unknown date';
      try {
        if (safeTicket.created_at) {
          // Convert to milliseconds (nanoseconds / 1,000,000)
          const timestamp = Number(safeTicket.created_at) / 1000000;
          createdAt = new Date(timestamp).toLocaleString();
        }
      } catch (err) {
        console.error('Error formatting date:', err);
      }
      
      // Format priority safely
      let priority = 'normal';
      try {
        const priorityNum = Number(safeTicket.priority);
        if (!isNaN(priorityNum) && priorityNum <= 2) {
          priority = 'high';
        }
      } catch (err) {
        console.error('Error processing priority:', err);
      }

      // Assemble the final ticket object with safe values
      return {
        id: ticketId,
        title: safeTicket.title || 'Untitled',
        description: safeTicket.description || 'No description',
        status: statusName,
        priority: priority,
        createdAt: createdAt,
        createdBy: creator ? creator.name : `User #${creatorId || '?'}`,
        creatorEmail: creator ? creator.email : '',
        assignee: assignee ? assignee.name : (assigneeId ? `User #${assigneeId}` : 'Unassigned'),
        assigneeEmail: assignee ? assignee.email : '',
        assigneeAvatar: '/avatar-placeholder.png',
        messageCount: messageCount,
        rawData: safeTicket // Include raw data for debugging
      };
    } catch (error) {
      console.error("Error formatting ticket:", error, ticket);
      // Return a default formatted ticket if something goes wrong
      return {
        id: 0, // Use 0 for invalid tickets to prevent routing issues
        title: "Error: Malformed Ticket",
        description: "There was an error processing this ticket's data",
        status: 'open',
        priority: 'normal',
        createdAt: 'Unknown',
        createdBy: 'Unknown',
        creatorEmail: '',
        assignee: 'Unknown',
        assigneeEmail: '',
        assigneeAvatar: '/avatar-placeholder.png',
        messageCount: 0,
        error: error.toString()
      };
    }
  };

  // Filter tickets based on active tab
  const filteredTickets = tickets
    // First check and filter out null/undefined tickets
    .filter(ticket => ticket !== null && ticket !== undefined)
    // Then format each ticket - some might return null if invalid
    .map(formatTicket)
    // Filter out any null values that might have been returned by formatTicket
    .filter(ticket => ticket !== null && typeof ticket === 'object')
    // Apply tab filter
    .filter(ticket => {
      if (activeTab === 'all') return true;
      return ticket.status === activeTab;
    })
    // Apply search filter if query exists
    .filter(ticket => {
      if (!searchQuery) return true;
      return (
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    // Apply priority filter if selected
    .filter(ticket => {
      if (!selectedPriority) return true;
      return ticket.priority === selectedPriority;
    });

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'blue';
      case 'on-going': return 'orange';
      case 'on-hold': return 'yellow';
      case 'resolved': return 'green';
      case 'closed': return 'gray';
      default: return 'gray';
    }
  };

  const getPriorityLabel = (priority) => {
    return priority === 'high' ? (
      <span className="priority-badge high">High Priority</span>
    ) : null;
  };

  const handleRefresh = () => {
    const loadData = async () => {
      await Promise.all([
        fetchTickets(),
        fetchUsers()
      ]);
    };
    
    loadData();
  };

  if (loading) {
    return <div className="tickets-page loading">Loading tickets...</div>;
  }

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <h1>Tickets</h1>
        <div className="header-actions">
          <button 
            onClick={handleRefresh} 
            className="refresh-button"
            title="Refresh tickets"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
            </svg>
          </button>
          <Link to="/new-ticket" className="new-ticket-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
            New Ticket
          </Link>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={handleRefresh} className="retry-button">Retry</button>
        </div>
      )}

      <div className="tickets-filters">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search for ticket" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <button 
            className="filter-button"
            onClick={() => setSelectedPriority(selectedPriority === 'high' ? null : 'high')}
          >
            <span>{selectedPriority === 'high' ? 'High Priority' : 'Select Priority'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="tickets-tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          All Tickets
        </button>
        <button 
          className={`tab ${activeTab === 'open' ? 'active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          New
        </button>
        <button 
          className={`tab ${activeTab === 'on-going' ? 'active' : ''}`}
          onClick={() => setActiveTab('on-going')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          On-Going
        </button>
        <button 
          className={`tab ${activeTab === 'resolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Resolved
        </button>
      </div>

      <div className="tickets-list">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket, index) => {
            // Extra safety check
            if (!ticket || typeof ticket !== 'object') {
              console.warn('Invalid ticket in filtered list:', ticket);
              return null;
            }
            
            // Safely extract ticket ID
            const ticketId = typeof ticket.id === 'number' ? ticket.id : 0;
            
            return (
              <div className="ticket-card" key={`ticket-${ticketId || index}`}>
                <div className="ticket-header">
                  <div className="ticket-id">
                    <span className={`status-indicator ${getStatusColor(ticket.status || 'open')}`}></span>
                    Ticket# {ticketId || '?'}
                  </div>
                  <div className="ticket-posted">Posted at {ticket.createdAt || 'Unknown'}</div>
                </div>
                
                <div className="ticket-content">
                  <h3 className="ticket-title">
                    {ticket.title || 'Untitled'} {getPriorityLabel(ticket.priority || 'normal')}
                  </h3>
                  <p className="ticket-description">{ticket.description || 'No description'}</p>
                  <div className="ticket-meta">
                    <span className="ticket-creator">
                      Created by: {ticket.createdBy || 'Unknown'}
                      {ticket.creatorEmail && (
                        <span className="meta-email">({ticket.creatorEmail})</span>
                      )}
                    </span>
                    <span className="ticket-message-count">
                      {(ticket.messageCount || 0) > 0 ? 
                        `${ticket.messageCount} message${ticket.messageCount !== 1 ? 's' : ''}` : 
                        'No messages'}
                    </span>
                  </div>
                </div>
                
                <div className="ticket-footer">
                  <div className="ticket-assignee">
                    <img 
                      src={ticket.assigneeAvatar || '/avatar-placeholder.png'} 
                      alt={ticket.assignee || 'Unassigned'} 
                      className="assignee-avatar" 
                    />
                    <span className="assignee-name">{ticket.assignee || 'Unassigned'}</span>
                    {ticket.assigneeEmail && (
                      <span className="assignee-email">({ticket.assigneeEmail})</span>
                    )}
                  </div>
                  {ticketId > 0 ? (
                    <Link to={`/ticket/${ticketId}`} className="ticket-action">Open Ticket</Link>
                  ) : (
                    <span className="ticket-action disabled">Invalid Ticket</span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-tickets">
            <p>
              {tickets.length === 0 ? 
                "No tickets found. Create your first ticket!" : 
                "No tickets match your filter criteria."
              }
            </p>
            {tickets.length === 0 && (
              <Link to="/new-ticket" className="create-first-ticket">
                Create First Ticket
              </Link>
            )}
          </div>
        )}
      </div>

      {filteredTickets.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn prev" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button className="pagination-btn page active">{currentPage}</button>
          <button 
            className="pagination-btn next"
            disabled={filteredTickets.length < 10} // Assuming 10 tickets per page
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Tickets; 