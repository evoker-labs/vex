import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Tickets from './pages/Tickets';
import NewTickets from './pages/NewTickets';
import Officials from './pages/Officials';
import UserMe from './pages/UserMe';
import Hello from './pages/Hello';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        path: 'new-tickets',
        element: <NewTickets />
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