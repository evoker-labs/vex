import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

// Function to handle errors during rendering
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Root element not found!');
      return;
    }
    
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Routes />
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </QueryClientProvider>
      </React.StrictMode>
    );
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render the app:', error);
    // Display a visible error message
    const errorElement = document.getElementById('error-container');
    if (errorElement) {
      errorElement.style.display = 'block';
      errorElement.textContent = `Rendering Error: ${error.message}`;
    }
  }
};

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', renderApp);

// In case DOMContentLoaded already fired, try to render now
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(renderApp, 1);
}
