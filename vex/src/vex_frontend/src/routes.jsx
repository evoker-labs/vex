import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
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
import ErrorBoundary from './components/ErrorBoundary';

// New VEX Review System Components
import ClientDashboard from './pages/ClientDashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import SubmitReview from './pages/SubmitReview';
import DAOGovernance from './pages/DAOGovernance';

// Error Boundary component for routes
function RouteErrorBoundary() {
  const error = useRouteError();
  console.error("Route error:", error);
  
  let errorMessage = "An unexpected error occurred!";
  let errorDetails = null;
  
  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetails = error.data?.message || error.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack;
  }
  
  return (
    <div className="error-boundary">
      <h1>Oops!</h1>
      <h2>{errorMessage}</h2>
      {errorDetails && <pre>{errorDetails}</pre>}
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

// Simple fallback component for loading states
const LoadingFallback = () => (
  <div className="loading-fallback" style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    <div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <style>{`.spinner{transform-origin:center;animation:spin 1s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}`}</style>
          <circle className="spinner" cx="12" cy="12" r="10" fill="none" stroke="#7e57c2" strokeWidth="2" />
        </svg>
      </div>
      <div>Loading...</div>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <RouteErrorBoundary />
  },
  {
    path: '/app',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'tickets',
        element: <Tickets />,
      },
      {
        path: 'new-ticket',
        element: <NewTickets />,
      },
      {
        path: 'ticket/:id',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <TicketDetail />
            </Suspense>
          </ErrorBoundary>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'officials',
        element: <Officials />,
      },
      {
        path: 'user-me',
        element: <UserMe />,
      },
      {
        path: 'hello',
        element: <Hello />,
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
      },
      // New VEX Review System Routes
      {
        path: 'client-dashboard',
        element: <ClientDashboard />
      },
      {
        path: 'business-dashboard', 
        element: <BusinessDashboard />
      },
      {
        path: 'submit-review',
        element: <SubmitReview />
      },
      {
        path: 'dao',
        element: <DAOGovernance />
      }
    ]
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'tickets',
        element: <Tickets />,
      },
      {
        path: 'new-ticket',
        element: <NewTickets />,
      },
      {
        path: 'ticket/:id',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <TicketDetail />
            </Suspense>
          </ErrorBoundary>
        ),
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'officials',
        element: <Officials />,
      },
      {
        path: 'user-me',
        element: <UserMe />,
      },
      {
        path: 'hello',
        element: <Hello />,
      },
      // VEX Review System Routes (also at root level)
      {
        path: 'client-dashboard',
        element: <ClientDashboard />
      },
      {
        path: 'business-dashboard', 
        element: <BusinessDashboard />
      },
      {
        path: 'submit-review',
        element: <SubmitReview />
      },
      {
        path: 'dao',
        element: <DAOGovernance />
      }
    ]
  }
]);

function Routes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

export default Routes; 