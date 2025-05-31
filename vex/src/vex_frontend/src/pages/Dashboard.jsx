import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { format, parseISO, fromUnixTime } from 'date-fns';
import { vex_backend } from 'declarations/vex_backend';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.scss';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LineElement
);

// Helper to safely convert BigInt to Number
const safeToNumber = (bigIntValue) => {
  if (typeof bigIntValue === 'bigint') {
    // Convert BigInt to string first to avoid precision issues with large numbers
    return Number(bigIntValue.toString());
  }
  return Number(bigIntValue);
};

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [ticketStats, setTicketStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [ticketFilter, setTicketFilter] = useState(null); // 'open', 'all', etc.
  const [expandedTicket, setExpandedTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [ticketsData, usersData, statsData] = await Promise.all([
          vex_backend.get_all_tickets(),
          vex_backend.get_all_users(),
          vex_backend.get_ticket_stats()
        ]);
        
        // Convert BigInt values to numbers in tickets
        const processedTickets = ticketsData.map(ticket => ({
          ...ticket,
          id: safeToNumber(ticket.id),
          created_at: safeToNumber(ticket.created_at),
          updated_at: safeToNumber(ticket.updated_at),
          created_by: safeToNumber(ticket.created_by),
          assignee_id: ticket.assignee_id !== null ? safeToNumber(ticket.assignee_id) : null,
          priority: safeToNumber(ticket.priority),
          resolved_at: ticket.resolved_at !== null ? safeToNumber(ticket.resolved_at) : null,
          messages: ticket.messages.map(msg => ({
            ...msg,
            id: safeToNumber(msg.id),
            created_at: safeToNumber(msg.created_at),
            user_id: safeToNumber(msg.user_id)
          }))
        }));
        
        // Convert BigInt values to numbers in users
        const processedUsers = usersData.map(user => ({
          ...user,
          id: safeToNumber(user.id),
          created_at: safeToNumber(user.created_at)
        }));
        
        // Convert BigInt values to numbers in stats
        const processedStats = {
          ...statsData,
          total: safeToNumber(statsData.total),
          by_status: {
            open: safeToNumber(statsData.by_status.open),
            in_progress: safeToNumber(statsData.by_status.in_progress),
            on_hold: safeToNumber(statsData.by_status.on_hold),
            resolved: safeToNumber(statsData.by_status.resolved),
            closed: safeToNumber(statsData.by_status.closed)
          },
          by_type: statsData.by_type.map(([type, count]) => [type, safeToNumber(count)]),
          avg_resolution_time_ns: safeToNumber(statsData.avg_resolution_time_ns)
        };
        
        setTickets(processedTickets);
        setFilteredTickets(processedTickets);
        setUsers(processedUsers);
        setTicketStats(processedStats);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Apply filters when ticket filter changes
  useEffect(() => {
    if (!tickets.length) return;
    
    if (ticketFilter === 'open') {
      // Log status values to help debug
      console.log("Filtering for open tickets...");
      tickets.forEach(ticket => {
        console.log(`Ticket #${ticket.id} status:`, ticket.status, Object.keys(ticket.status)[0]);
      });
      
      // Fix the filter to correctly identify open tickets with case-insensitive comparison
      const openTickets = tickets.filter(ticket => {
        const statusKey = Object.keys(ticket.status)[0];
        return statusKey.toLowerCase() === 'open';
      });
      
      console.log(`Found ${openTickets.length} open tickets out of ${tickets.length} total`);
      setFilteredTickets(openTickets);
    } else {
      setFilteredTickets(tickets);
    }
  }, [ticketFilter, tickets]);

  // Add a debug effect to understand ticket structure
  useEffect(() => {
    if (tickets.length > 0) {
      console.log("Ticket statuses:", tickets.map(ticket => ({
        id: ticket.id,
        status: Object.keys(ticket.status)[0],
        statusObj: ticket.status
      })));
    }
  }, [tickets]);

  // Helper to convert nanoseconds timestamp to readable date
  const formatTimestamp = (nanoseconds) => {
    if (!nanoseconds) return 'N/A';
    // Convert nanoseconds to milliseconds
    const milliseconds = nanoseconds / 1000000;
    return format(new Date(milliseconds), 'MMM d, yyyy');
  };

  // Format time with more detail for messages
  const formatDetailTimestamp = (nanoseconds) => {
    if (!nanoseconds) return 'N/A';
    const milliseconds = nanoseconds / 1000000;
    return format(new Date(milliseconds), 'MMM d, yyyy h:mm a');
  };

  // Find user name by ID
  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  // Handle clicking on a stats card
  const handleCardClick = (cardType) => {
    if (cardType === 'tickets') {
      setActiveTab('tickets');
      setTicketFilter(null);
    } else if (cardType === 'open-tickets') {
      setActiveTab('tickets');
      setTicketFilter('open');
    } else if (cardType === 'users') {
      setActiveTab('users');
    }
  };

  // Toggle expanded ticket details
  const toggleTicketDetails = (ticketId) => {
    if (expandedTicket === ticketId) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketId);
    }
  };

  // Navigate to ticket detail page
  const goToTicket = (ticketId) => {
    navigate(`/app/ticket/${ticketId}`);
  };

  // Process data for status chart
  const getStatusChartData = () => {
    if (!ticketStats) return null;
    
    const statusData = {
      labels: ['Open', 'In Progress', 'On Hold', 'Resolved', 'Closed'],
      datasets: [
        {
          label: 'Tickets by Status',
          data: [
            ticketStats.by_status.open,
            ticketStats.by_status.in_progress,
            ticketStats.by_status.on_hold,
            ticketStats.by_status.resolved,
            ticketStats.by_status.closed
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
        }
      ]
    };
    
    return statusData;
  };

  // Process data for type chart
  const getTypeChartData = () => {
    if (!ticketStats || !ticketStats.by_type) return null;
    
    const typeLabels = ticketStats.by_type.map(item => item[0]);
    const typeCounts = ticketStats.by_type.map(item => item[1]);
    
    const typeData = {
      labels: typeLabels,
      datasets: [
        {
          label: 'Tickets by Type',
          data: typeCounts,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
        }
      ]
    };
    
    return typeData;
  };

  // Process data for priority chart
  const getPriorityChartData = () => {
    if (!tickets || tickets.length === 0) return null;
    
    // Count tickets by priority
    const priorityCounts = [0, 0, 0, 0, 0]; // P0, P1, P2, P3, P4
    tickets.forEach(ticket => {
      const priority = ticket.priority;
      if (priority >= 0 && priority < 5) {
        priorityCounts[priority]++;
      }
    });
    
    // Remove P0 if not used
    const labels = ['P1', 'P2', 'P3', 'P4'];
    const data = priorityCounts.slice(1);
    
    return {
      labels,
      datasets: [
        {
          label: 'Tickets by Priority',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }
      ]
    };
  };

  // Process data for activity timeline
  const getActivityTimelineData = () => {
    if (!tickets || tickets.length === 0) return null;
    
    // Group tickets by day created
    const ticketsByDay = {};
    tickets.forEach(ticket => {
      const date = formatTimestamp(ticket.created_at);
      ticketsByDay[date] = (ticketsByDay[date] || 0) + 1;
    });
    
    const sortedDates = Object.keys(ticketsByDay).sort((a, b) => 
      new Date(a) - new Date(b)
    );
    
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Tickets Created',
          data: sortedDates.map(date => ticketsByDay[date]),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
        }
      ]
    };
  };

  // Get the count of open tickets
  const getOpenTicketsCount = () => {
    if (!tickets.length) return 0;
    
    // Count open tickets correctly with case-insensitive comparison
    const openCount = tickets.filter(ticket => {
      const statusKey = Object.keys(ticket.status)[0];
      return statusKey.toLowerCase() === 'open';
    }).length;
    
    return openCount;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="dashboard loading-state">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="dashboard error-state">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const statusChartData = getStatusChartData();
  const typeChartData = getTypeChartData();
  const priorityChartData = getPriorityChartData();
  const activityTimelineData = getActivityTimelineData();
  const openTicketsCount = getOpenTicketsCount();

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Ticket System Dashboard</h1>
        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'tickets' ? 'active' : ''} 
            onClick={() => { setActiveTab('tickets'); setTicketFilter(null); }}
          >
            Tickets
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stat-cards">
        <div className="stat-card" onClick={() => handleCardClick('tickets')}>
          <div className="stat-icon tickets-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Tickets</h3>
            <p className="stat-value">{ticketStats?.total || 0}</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => handleCardClick('open-tickets')}>
          <div className="stat-icon open-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Open Tickets</h3>
            <p className="stat-value">{openTicketsCount}</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => handleCardClick('users')}>
          <div className="stat-icon users-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{users.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon response-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Avg Resolution Time</h3>
            <p className="stat-value">
              {ticketStats?.avg_resolution_time_ns ? 
                `${Math.round(ticketStats.avg_resolution_time_ns / (1000000000 * 60 * 60 * 24))} days` : 
                'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Tab */}
      {activeTab === 'overview' && (
        <div className="dashboard-overview">
          {/* Charts Row */}
          <div className="charts-row">
            <div className="chart-container">
              <h3>Tickets by Status</h3>
              {statusChartData ? (
                <Pie 
                  data={statusChartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15
                        }
                      }
                    },
                    layout: {
                      padding: {
                        top: 5,
                        bottom: 5
                      }
                    }
                  }} 
                />
              ) : (
                <p className="no-data">No status data available</p>
              )}
            </div>
            
            <div className="chart-container">
              <h3>Tickets by Type</h3>
              {typeChartData ? (
                <Pie 
                  data={typeChartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15
                        }
                      }
                    },
                    layout: {
                      padding: {
                        top: 5,
                        bottom: 5
                      }
                    }
                  }} 
                />
              ) : (
                <p className="no-data">No type data available</p>
              )}
            </div>
          </div>
          
          {/* More Charts */}
          <div className="charts-row">
            <div className="chart-container">
              <h3>Tickets by Priority</h3>
              {priorityChartData ? (
                <Bar 
                  data={priorityChartData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        }
                      }
                    }
                  }} 
                />
              ) : (
                <p className="no-data">No priority data available</p>
              )}
            </div>
            
            <div className="chart-container">
              <h3>Ticket Creation Timeline</h3>
              {activityTimelineData ? (
                <Line 
                  data={activityTimelineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        }
                      }
                    }
                  }}
                />
              ) : (
                <p className="no-data">No timeline data available</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="tickets-table-container">
          <h3>
            {ticketFilter === 'open' ? 'Open Tickets' : 'All Tickets'}
            {ticketFilter === 'open' && (
              <button 
                className="filter-clear-btn"
                onClick={() => setTicketFilter(null)}
              >
                View All
              </button>
            )}
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map(ticket => (
                    <tr 
                      key={ticket.id}
                      className="ticket-row clickable"
                      onClick={() => goToTicket(ticket.id)}
                    >
                      <td className="ticket-id">{ticket.id}</td>
                      <td>{ticket.title}</td>
                      <td>
                        <span className={`status-badge status-${Object.keys(ticket.status)[0].toLowerCase()}`}>
                          {Object.keys(ticket.status)[0]}
                        </span>
                      </td>
                      <td>{Object.keys(ticket.ticket_type)[0]}</td>
                      <td>P{ticket.priority}</td>
                      <td>{getUserName(ticket.created_by)}</td>
                      <td>{formatTimestamp(ticket.created_at)}</td>
                      <td>{formatTimestamp(ticket.updated_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      {ticketFilter === 'open' ? 'No open tickets available' : 'No tickets available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-container">
          <h3>System Users</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Tickets Created</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => {
                    const userTickets = tickets.filter(t => t.created_by === user.id);
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{formatTimestamp(user.created_at)}</td>
                        <td>{userTickets.length}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">No users available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 