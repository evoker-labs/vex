import React, { useState } from 'react';

function NewTickets() {
  const [email, setEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [priorityStatus, setPriorityStatus] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would call the backend API to create a new ticket
    // For now, let's simulate an API call with a timeout
    setTimeout(() => {
      console.log({
        email,
        ticketType,
        priorityStatus,
        ticketBody
      });
      setIsSubmitting(false);
      // Reset form
      setEmail('');
      setTicketType('');
      setPriorityStatus('');
      setTicketBody('');
    }, 1000);
  };

  return (
    <div className="new-ticket-page">
      <h1>New Ticket</h1>
      
      <div className="new-ticket-content">
        <div className="section-header">
          <h2>Create Quick Ticket</h2>
          <p>Write and address new queries and issues</p>
        </div>
        
        <form className="new-ticket-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Type Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTickets; 