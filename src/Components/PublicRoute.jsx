import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

// This component prevents authenticated users from accessing login/signup pages
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // First check if token exists in localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        // No token found, user is not authenticated
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Token exists, verify it with the server
      try {
        const authenticated = await authService.verifyToken();
        setIsAuthenticated(authenticated);
        
        // If token is invalid, remove it
        if (!authenticated) {
          localStorage.removeItem('token');
        }
      } catch (error) {
        // If verification fails, clear token and set as not authenticated
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, show the login/signup page
  return children;
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid rgba(99, 102, 241, 0.2)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: '16px',
    marginTop: '16px'
  }
};

// AdminPublicRoute.jsx - Prevents logged-in admins from accessing admin login
export const AdminPublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAdminAuthenticated();
  const admin = authService.getCurrentAdmin();

  // If admin is logged in, redirect to admin dashboard
  if (isAuthenticated && admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;

