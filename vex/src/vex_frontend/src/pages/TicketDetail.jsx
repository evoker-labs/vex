import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [status, setStatus] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the ticket data from your backend
    // For now, let's use mock data
    const fetchTicket = () => {
      setLoading(true);
      // Simulating API call
      setTimeout(() => {
        const mockTicket = {
          id: 'Ticket# 2023-C5123',
          title: 'How to deposit money to my portal?',
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          
Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
          customerEmail: 'example@gmail.com',
          type: 'Deposit Issue',
          status: 'On-Going',
          createdAt: '12:45 AM'
        };
        
        setTicket(mockTicket);
        setCustomerEmail(mockTicket.customerEmail);
        setTicketType(mockTicket.type);
        setStatus(mockTicket.status);
        setLoading(false);
      }, 800);
    };
    
    fetchTicket();
  }, [id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would call your backend API to submit the reply
    // For now, let's simulate an API call
    setTimeout(() => {
      console.log({
        ticketId: id,
        customerEmail,
        ticketType,
        status,
        replyBody
      });
      
      setIsSubmitting(false);
      setReplyBody(''); // Clear the reply input
    }, 1000);
  };

  if (loading) {
    return <div className="ticket-detail-page">Loading...</div>;
  }

  return (
    <div className="ticket-detail-page">
      <div className="ticket-response">
        <h1>Tickets</h1>
        
        <div className="ticket-info">
          <div className="ticket-header">
            <div className="ticket-id">
              <span className="status-indicator orange"></span>
              {ticket.id}
            </div>
            <div className="ticket-posted">Posted at {ticket.createdAt}</div>
          </div>
          
          <div className="ticket-content">
            <h2 className="ticket-title">{ticket.title}</h2>
            <div className="ticket-body">
              {ticket.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        
        <div className="reply-section">
          <h3>Reply to Ticket</h3>
          
          <form className="reply-form" onSubmit={handleSubmitReply}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerEmail">Customer Email</label>
                <input 
                  type="email" 
                  id="customerEmail" 
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
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
                    <option value="" disabled>Select Type</option>
                    <option value="Deposit Issue">Deposit Issue</option>
                    <option value="Withdrawal Issue">Withdrawal Issue</option>
                    <option value="Account Issue">Account Issue</option>
                    <option value="Technical Issue">Technical Issue</option>
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
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="On-Going">On-Going</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="replyBody">Ticket Body</label>
              <textarea 
                id="replyBody" 
                placeholder="Type ticket issue here..."
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
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
                {isSubmitting ? 'Submitting...' : 'Submit Reply'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail; 