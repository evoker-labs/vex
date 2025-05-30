import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vex_backend } from 'declarations/vex_backend';

function NewTickets() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [priorityStatus, setPriorityStatus] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(''); // Will be set from fetched users
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await vex_backend.get_all_users();
        console.log("Fetched users:", allUsers);
        
        if (allUsers && allUsers.length > 0) {
          // Convert BigInt IDs to strings for proper handling in forms
          const processedUsers = allUsers.map(user => ({
            ...user,
            id: Number(user.id)
          }));
          
          setUsers(processedUsers);
          // Set the first user as default
          if (processedUsers.length > 0) {
            setUserId(processedUsers[0].id.toString());
            // Set email field to the first user's email for convenience
            setEmail(processedUsers[0].email);
          }
        } else {
          setError("No users found. Please create a user first.");
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
      }
    };
    
    fetchUsers();
  }, []);

  // Update email when user changes
  const handleUserChange = (e) => {
    const selectedId = e.target.value;
    setUserId(selectedId);
    
    // Update email field to match selected user
    const selectedUser = users.find(user => user.id.toString() === selectedId);
    if (selectedUser) {
      setEmail(selectedUser.email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError("Please select a user");
      return;
    }
    
    if (!ticketType) {
      setError("Please select a ticket type");
      return;
    }
    
    if (!priorityStatus) {
      setError("Please select a priority status");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log("Creating ticket with data:", {
        title,
        description: ticketBody,
        type: ticketType,
        userId,
        priorityStatus
      });
      
      // Map priority string to numeric value (1-5)
      const priorityValue = 
        priorityStatus === 'urgent' ? 1 : 
        priorityStatus === 'high' ? 2 :
        priorityStatus === 'normal' ? 3 :
        priorityStatus === 'low' ? 4 : 5;
      
      // Map ticket type to backend enum variant
      let ticketTypeVariant;
      if (ticketType === 'feature') {
        ticketTypeVariant = { Feature: null };
      } else if (ticketType === 'technical') {
        ticketTypeVariant = { Support: null };
      } else if (ticketType === 'billing') {
        ticketTypeVariant = { Other: null };
      } else {
        ticketTypeVariant = { Bug: null }; // Default for general
      }
      
      console.log("Using backend format:", {
        ticketTypeVariant,
        userId: BigInt(userId),
        priorityValue
      });
      
      // Create the ticket
      const result = await vex_backend.create_ticket(
        title,
        ticketBody,
        ticketTypeVariant,
        BigInt(userId),
        priorityValue
      );
      
      console.log("Ticket creation result:", result);
      
      if ('Ok' in result) {
        // Get the created ticket ID
        const newTicketId = Number(result.Ok.id);
        console.log("New ticket created with ID:", newTicketId);
        
        // Redirect to the tickets list page
        navigate('/tickets');
      } else if ('Err' in result) {
        console.error("Error from backend:", result.Err);
        setError(`Failed to create ticket: ${result.Err}`);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-ticket-page">
      <h1>New Ticket</h1>
      
      <div className="new-ticket-content">
        <div className="section-header">
          <h2>Create Quick Ticket</h2>
          <p>Write and address new queries and issues</p>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <form className="new-ticket-form" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="title">Ticket Title</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Enter a descriptive title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Type Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
                required
              />
              <small className="form-hint">Email from selected user</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="ticketType">Request Ticket Type</label>
              <div className="select-wrapper">
                <select 
                  id="ticketType" 
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  required
                >
                  <option value="" disabled>Choose Type</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Issue</option>
                  <option value="feature">Feature Request</option>
                </select>
                <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="priorityStatus">Priority Status</label>
              <div className="select-wrapper">
                <select 
                  id="priorityStatus" 
                  value={priorityStatus}
                  onChange={(e) => setPriorityStatus(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Status</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>
          
          {users.length > 0 ? (
            <div className="form-group">
              <label htmlFor="userId">Created By</label>
              <div className="select-wrapper">
                <select 
                  id="userId" 
                  value={userId}
                  onChange={handleUserChange}
                  required
                >
                  {users.map(user => (
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
          ) : (
            <div className="form-group">
              <div className="warning-message">
                No users available. Please <a href="/users">create a user</a> first.
              </div>
            </div>
          )}
          
          <div className="form-group full-width">
            <label htmlFor="ticketBody">Ticket Body</label>
            <textarea 
              id="ticketBody" 
              placeholder="Type ticket issue here..."
              value={ticketBody}
              onChange={(e) => setTicketBody(e.target.value)}
              required
              rows={6}
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || users.length === 0}
            >
              {isSubmitting ? 'Sending...' : 'Send Ticket'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/tickets')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTickets; 