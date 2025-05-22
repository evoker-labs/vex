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

const router = createBrowserRouter([
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
        path: '',
        element: <Dashboard />
      }
    ]
  }
]);

export default router; 