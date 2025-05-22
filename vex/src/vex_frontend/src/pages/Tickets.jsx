import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Tickets() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock ticket data
  const tickets = [
    {
      id: 'Ticket# 2023-C5123',
      title: 'How to deposit money to my portal?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'on-going',
      priority: 'normal',
      createdAt: '12:45 AM',
      assignee: 'John Snow',
      assigneeAvatar: '/john-snow.png'
    },
    {
      id: 'Ticket# 2023-C5123',
      title: 'How to deposit money to my portal?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'on-going',
      priority: 'high',
      createdAt: '12:45 AM',
      assignee: 'John Snow',
      assigneeAvatar: '/john-snow.png'
    },
    {
      id: 'Ticket# 2023-C5123',
      title: 'How to deposit money to my portal?',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      status: 'resolved',
      priority: 'normal',
      createdAt: '12:45 AM',
      assignee: 'John Snow',
      assigneeAvatar: '/john-snow.png'
    }
  ];

  // Filter tickets based on active tab
  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new') return ticket.status === 'new';
    if (activeTab === 'on-going') return ticket.status === 'on-going';
    if (activeTab === 'resolved') return ticket.status === 'resolved';
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'blue';
      case 'on-going': return 'orange';
      case 'resolved': return 'green';
      default: return 'gray';
    }
  };

  const getPriorityLabel = (priority) => {
    return priority === 'high' ? (
      <span className="priority-badge high">High Priority</span>
    ) : null;
  };

  return (
    <div className="tickets-page">
      <div className="tickets-header">
        <h1>Tickets</h1>
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
          <button className="filter-button">
            <span>Select Priority</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
        
        <div className="filter-dropdown">
          <button className="filter-button">
            <span>This Week</span>
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
          className={`tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
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
        {filteredTickets.map((ticket, index) => (
          <div className="ticket-card" key={index}>
            <div className="ticket-header">
              <div className="ticket-id">
                <span className={`status-indicator ${getStatusColor(ticket.status)}`}></span>
                {ticket.id}
              </div>
              <div className="ticket-posted">Posted at {ticket.createdAt}</div>
            </div>
            
            <div className="ticket-content">
              <h3 className="ticket-title">{ticket.title} {getPriorityLabel(ticket.priority)}</h3>
              <p className="ticket-description">{ticket.description}</p>
            </div>
            
            <div className="ticket-footer">
              <div className="ticket-assignee">
                <img src={ticket.assigneeAvatar} alt={ticket.assignee} className="assignee-avatar" />
                <span className="assignee-name">{ticket.assignee}</span>
              </div>
              <Link to={`/ticket/${index}`} className="ticket-action">Open Ticket</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn prev">Previous</button>
        <button className="pagination-btn page active">1</button>
        <button className="pagination-btn page">2</button>
        <button className="pagination-btn next">Next</button>
      </div>
    </div>
  );
}

export default Tickets; 