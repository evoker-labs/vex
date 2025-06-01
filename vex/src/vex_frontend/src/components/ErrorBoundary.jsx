import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#fff3f3',
          border: '1px solid #ffcaca',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#d32f2f' }}>Something went wrong</h2>
          <p>{this.state.error && this.state.error.toString()}</p>
          {this.state.errorInfo && (
            <details style={{ whiteSpace: 'pre-wrap', margin: '10px 0' }}>
              <summary>Error Details</summary>
              {this.state.errorInfo.componentStack}
            </details>
          )}
          <div style={{ marginTop: '20px' }}>
            <Link 
              to="/tickets" 
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#7e57c2',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none',
                marginRight: '10px'
              }}
            >
              Back to Tickets
            </Link>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 