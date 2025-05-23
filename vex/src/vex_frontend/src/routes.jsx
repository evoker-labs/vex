import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Tickets from './pages/Tickets';
import NewTickets from './pages/NewTickets';
import Officials from './pages/Officials';
import UserMe from './pages/UserMe';
import Hello from './pages/Hello';
import TicketDetail from './pages/TicketDetail';
import Layout from './components/Layout';
import Landing from './pages/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'tickets',
        element: <Tickets />
      },
      {
        path: 'new-ticket',
        element: <NewTickets />
      },
      {
        path: 'ticket/:id',
        element: <TicketDetail />
      },
      {
        path: 'officials',
        element: <Officials />
      },
      {
        path: 'user-me',
        element: <UserMe />
      },
      {
        path: 'hello',
        element: <Hello />
      },
      {
        path: 'docs',
        element: <div className="page-content">
          <h1>VEX Documentation</h1>
          <p>Comprehensive documentation for the VEX Ticket System.</p>
          <div style={{marginTop: '20px'}}>
            <h2>Getting Started</h2>
            <p>Welcome to the VEX Ticket System documentation. Here you'll find everything you need to use and customize the system for your organization.</p>
          </div>
          <div style={{marginTop: '20px'}}>
            <h2>User Guide</h2>
            <p>Learn how to create and manage tickets, user accounts, and administrative settings.</p>
          </div>
          <div style={{marginTop: '20px'}}>
            <h2>API Documentation</h2>
            <p>Explore the VEX API for custom integrations and extensions.</p>
          </div>
        </div>
      }
    ]
  }
]);

export default router; 