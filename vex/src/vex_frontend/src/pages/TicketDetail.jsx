import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vex_backend } from 'declarations/vex_backend';

// Basic fallback component
const Fallback = ({ message }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    {message || 'Loading...'}
  </div>
);

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState('');
  const [ticketType, setTicketType] = useState('Bug');
  const [status, setStatus] = useState('open');
  const [replyBody, setReplyBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('1'); // Default to first user
  const [users, setUsers] = useState([]);
  const [creator, setCreator] = useState(null);

  // Status mapping
  const statusMap = {
    open: "Open",
    "on-going": "InProgress",
    "on-hold": "OnHold",
    resolved: "Resolved",
    closed: "Closed",
  };

  // Safe array mapping function
  const safeMap = (array, mapFn) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map(mapFn);
  };

  // Fetch ticket and users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching ticket with ID:", id);
        
        if (!id || isNaN(Number(id))) {
          setError('Invalid ticket ID');
          setLoading(false);
          return;
        }
        
        // Load users first
        try {
          const allUsers = await vex_backend.get_all_users();
          console.log("Users:", allUsers);
          
          if (allUsers && Array.isArray(allUsers) && allUsers.length > 0) {
            const processedUsers = allUsers.map(user => ({
              ...user,
              id: Number(user.id)
            }));
            
            setUsers(processedUsers);
            
            // Set default user
            if (processedUsers.length > 0) {
              setUserId(processedUsers[0].id.toString());
              setCustomerEmail(processedUsers[0].email || '');
            }
          }
        } catch (userErr) {
          console.error("Error loading users:", userErr);
        }
        
        // Then load ticket
        const ticketData = await vex_backend.get_ticket(BigInt(id));
        console.log("Ticket data:", ticketData);
        
        if (!ticketData) {
          setError('Ticket not found');
          setLoading(false);
          return;
        }
        
        // Process ticket data to handle BigInt
        const processedTicket = {
          ...ticketData,
          id: Number(ticketData.id || 0),
          created_by: Number(ticketData.created_by || 0),
          created_at: Number(ticketData.created_at || 0),
          updated_at: Number(ticketData.updated_at || 0),
          resolved_at: ticketData.resolved_at ? Number(ticketData.resolved_at) : null,
          assignee_id: ticketData.assignee_id ? Number(ticketData.assignee_id) : null,
          messages: [] // Start with empty messages array
        };
        
        setTicket(processedTicket);
        
        // Extract ticket type
        if (ticketData.ticket_type && Object.keys(ticketData.ticket_type).length > 0) {
          setTicketType(Object.keys(ticketData.ticket_type)[0]);
        }
        
        // Extract status
        if (ticketData.status && Object.keys(ticketData.status).length > 0) {
          const statusKey = Object.keys(ticketData.status)[0];
          const foundStatus = Object.entries(statusMap).find(
            ([_, value]) => value === statusKey
          );
          if (foundStatus) {
            setStatus(foundStatus[0]);
          }
        }
        
        // Load messages separately
        try {
          console.log("Fetching messages for ticket:", id);
          const messagesResult = await vex_backend.get_ticket_messages(BigInt(id));
          console.log("Messages result:", messagesResult);
          
          if (messagesResult && 'Ok' in messagesResult) {
            const messages = messagesResult.Ok;
            if (Array.isArray(messages)) {
              const processedMessages = messages.map(msg => ({
                ...msg,
                id: Number(msg.id || 0),
                user_id: Number(msg.user_id || 0),
                created_at: Number(msg.created_at || 0)
              }));
              
              // Update ticket with messages
              setTicket(prev => ({
                ...prev,
                messages: processedMessages
              }));
            }
          }
        } catch (msgErr) {
          console.error("Error fetching messages:", msgErr);
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load ticket data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Update creator information when ticket and users are loaded
  useEffect(() => {
    if (ticket && users.length > 0) {
      const creatorId = ticket.created_by;
      const foundCreator = users.find(user => user.id === creatorId);
      if (foundCreator) {
        setCreator(foundCreator);
        setCustomerEmail(foundCreator.email || '');
      }
    }
  }, [ticket, users]);

  // Handle user selection change
  const handleUserChange = (e) => {
    const selectedId = e.target.value;
    setUserId(selectedId);
    
    const selectedUser = users.find(user => user.id.toString() === selectedId);
    if (selectedUser) {
      setCustomerEmail(selectedUser.email || '');
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    try {
      setStatus(newStatus);
      
      const backendStatus = statusMap[newStatus] || 'Open';
      
      await vex_backend.update_ticket_status(
        BigInt(id),
        { [backendStatus]: null }
      );
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status. Please try again.');
      setStatus(status); // Revert on error
    }
  };

  // Handle reply submission
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log("Adding message:", {
        ticketId: id,
        userId,
        content: replyBody
      });
      
      await vex_backend.add_message_to_ticket(
        BigInt(id),
        BigInt(userId),
        replyBody
      );
      
      // Refresh ticket
      const refreshedTicket = await vex_backend.get_ticket(BigInt(id));
      
      if (refreshedTicket) {
        const processedTicket = {
          ...refreshedTicket,
          id: Number(refreshedTicket.id || 0),
          created_by: Number(refreshedTicket.created_by || 0),
          created_at: Number(refreshedTicket.created_at || 0),
          updated_at: Number(refreshedTicket.updated_at || 0),
          resolved_at: refreshedTicket.resolved_at ? Number(refreshedTicket.resolved_at) : null,
          assignee_id: refreshedTicket.assignee_id ? Number(refreshedTicket.assignee_id) : null,
          messages: Array.isArray(refreshedTicket.messages) 
            ? refreshedTicket.messages.map(msg => ({
                ...msg,
                id: Number(msg.id || 0),
                user_id: Number(msg.user_id || 0),
                created_at: Number(msg.created_at || 0)
              }))
            : []
        };
        
        setTicket(processedTicket);
      }
      
      setReplyBody(''); // Clear input
    } catch (err) {
      console.error('Error submitting reply:', err);
      setError('Failed to send reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle refresh
  const handleRefreshTicket = async () => {
    try {
      setLoading(true);
      
      const refreshedTicket = await vex_backend.get_ticket(BigInt(id));
      
      if (!refreshedTicket) {
        setError('Ticket not found');
        setLoading(false);
        return;
      }
      
      const processedTicket = {
        ...refreshedTicket,
        id: Number(refreshedTicket.id || 0),
        created_by: Number(refreshedTicket.created_by || 0),
        created_at: Number(refreshedTicket.created_at || 0),
        updated_at: Number(refreshedTicket.updated_at || 0),
        resolved_at: refreshedTicket.resolved_at ? Number(refreshedTicket.resolved_at) : null,
        assignee_id: refreshedTicket.assignee_id ? Number(refreshedTicket.assignee_id) : null,
        messages: [] // Start with empty messages
      };
      
      setTicket(processedTicket);
      
      // Refresh messages
      try {
        const messagesResult = await vex_backend.get_ticket_messages(BigInt(id));
        
        if (messagesResult && 'Ok' in messagesResult) {
          const messages = messagesResult.Ok;
          if (Array.isArray(messages)) {
            const processedMessages = messages.map(msg => ({
              ...msg,
              id: Number(msg.id || 0),
              user_id: Number(msg.user_id || 0),
              created_at: Number(msg.created_at || 0)
            }));
            
            setTicket(prev => ({
              ...prev,
              messages: processedMessages
            }));
          }
        }
      } catch (msgErr) {
        console.error("Error refreshing messages:", msgErr);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error refreshing ticket:', err);
      setError('Failed to refresh ticket data.');
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return <Fallback message="Loading ticket data..." />;
  }

  // Render error state
  if (error) {
    return (
      <div className="ticket-detail-page error">
        <h1>Error</h1>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/tickets')} 
          className="primary-button"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  // Render empty state
  if (!ticket) {
    return (
      <div className="ticket-detail-page error">
        <h1>Ticket Not Found</h1>
        <p>The requested ticket could not be found.</p>
        <button 
          onClick={() => navigate('/tickets')} 
          className="primary-button"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    try {
      return new Date(Number(timestamp) / 1000000).toLocaleString();
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid date';
    }
  };

  // Check if messages exist
  const hasMessages = ticket.messages && Array.isArray(ticket.messages) && ticket.messages.length > 0;
  
  return (
    <div className="ticket-detail-page">
      <div className="ticket-response">
        <h1>Ticket Details</h1>
        
        <div className="ticket-info">
          <div className="ticket-header">
            <div className="ticket-id">
              <span className="status-indicator orange"></span>
              Ticket #{ticket.id || '?'}
            </div>
            <div className="ticket-posted">Posted at {formatDate(ticket.created_at)}</div>
          </div>
          
          <div className="ticket-content">
            <h2 className="ticket-title">{ticket.title || 'Untitled Ticket'}</h2>
            <div className="ticket-creator">
              Created by: {creator ? creator.name : `User #${ticket.created_by || '?'}`}
              {creator && <span className="creator-email">({creator.email})</span>}
            </div>
            <div className="ticket-body">
              <p>{ticket.description || 'No description'}</p>
            </div>
          </div>
        </div>
        
        {/* Messages Section */}
        <div className="ticket-messages">
          <div className="messages-header">
            <h3>Messages</h3>
            <button 
              onClick={handleRefreshTicket}
              className="refresh-button small"
              title="Refresh ticket messages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
            </button>
          </div>
          
          {hasMessages ? (
            <div className="message-list">
              {safeMap(ticket.messages, (message) => {
                if (!message) return null;
                
                const messageDate = formatDate(message.created_at);
                
                // Find message sender
                const messageUserId = message.user_id;
                const messageSender = users.find(u => u.id === messageUserId);
                
                const displayName = messageSender ? 
                  messageSender.name : `User #${message.user_id || '?'}`;
                
                const senderEmail = messageSender ? messageSender.email : '';
                
                const messageId = message.id || Math.random().toString(36).substr(2, 9);
                
                return (
                  <div key={messageId} className="message-item">
                    <div className="message-header">
                      <div className="message-user">
                        {displayName}
                        {senderEmail && <span className="message-email">({senderEmail})</span>}
                      </div>
                      <div className="message-date">{messageDate}</div>
                    </div>
                    <div className="message-content">{message.content || 'No content'}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-messages-wrapper">
              <p className="no-messages">No messages yet.</p>
            </div>
          )}
        </div>
        
        {/* Reply Section */}
        <div className="reply-section">
          <h3>Reply to Ticket</h3>
          
          <form className="reply-form" onSubmit={handleSubmitReply}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerEmail">Responder Email</label>
                <input 
                  type="email" 
                  id="customerEmail" 
                  value={customerEmail}
                  readOnly
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="ticketType">Request Type</label>
                <div className="select-wrapper">
                  <select 
                    id="ticketType" 
                    value={ticketType}
                    disabled
                  >
                    <option value="Bug">Bug</option>
                    <option value="Feature">Feature Request</option>
                    <option value="Support">Technical Support</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                  </select>
                  <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <div className="select-wrapper">
                  <select 
                    id="status" 
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="on-going">On-Going</option>
                    <option value="on-hold">On-Hold</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            {users.length > 0 && (
              <div className="form-group">
                <label htmlFor="userId">Reply As</label>
                <div className="select-wrapper">
                  <select 
                    id="userId" 
                    value={userId}
                    onChange={handleUserChange}
                  >
                    {safeMap(users, user => (
                      <option key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                  <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            )}
            
            <div className="form-group full-width">
              <label htmlFor="replyBody">Message</label>
              <textarea 
                id="replyBody" 
                placeholder="Type your message here..."
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                required
                rows={6}
              ></textarea>
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || !userId}
              >
                {isSubmitting ? 'Submitting...' : 'Add Message'}
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate('/tickets')}
              >
                Back to Tickets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail; 