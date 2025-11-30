// ProtectedRoute.jsx - UPDATED with backward compatibility
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

// CLIENT PROTECTED ROUTE - BACKWARD COMPATIBLE
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = authService.getToken();
        
        if (!token || token === 'undefined' || token === 'null') {
          console.log('⚠️ No valid token found, redirecting to login');
          setIsAuthenticated(false);
          setIsVerifying(false);
          return;
        }

        console.log('🔍 Verifying token...');
        const isValid = await authService.verifyToken();
        
        if (isValid) {
          const user = authService.getCurrentUser();
          console.log('👤 User:', user);
          
          // FIXED: Accept client role OR no role (backward compatibility)
          if (user && (user.role === 'client' || !user.role)) {
            console.log('✅ Client authenticated');
            setIsAuthenticated(true);
          } else if (user && user.role === 'admin') {
            // Admin trying to access client area
            console.log('⚠️ Admin detected, redirecting to admin dashboard');
            window.location.href = '/admin/dashboard';
            return;
          } else {
            console.log('❌ Invalid user role:', user?.role);
            authService.logout();
            setIsAuthenticated(false);
          }
        } else {
          console.log('❌ Token verification failed');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('❌ Auth verification error:', error);
        authService.logout();
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);

  if (isVerifying) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Verifying access...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;


// ADMIN PROTECTED ROUTE - STRICT ADMIN CHECK
export const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = authService.getAdminToken();
        
        if (!token || token === 'undefined' || token === 'null') {
          console.log('⚠️ No valid admin token found, redirecting to admin login');
          setIsAuthenticated(false);
          setIsVerifying(false);
          return;
        }

        console.log('🔍 Verifying admin token...');
        const isValid = await authService.verifyAdminToken();
        
        if (isValid) {
          const admin = authService.getCurrentAdmin();
          console.log('🛡️ Admin:', admin);
          
          if (admin && admin.role === 'admin') {
            console.log('✅ Admin authenticated');
            setIsAuthenticated(true);
          } else {
            console.log('❌ User is not an admin');
            authService.adminLogout();
            setIsAuthenticated(false);
          }
        } else {
          console.log('❌ Admin token verification failed');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('❌ Admin auth verification error:', error);
        authService.adminLogout();
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);

  if (isVerifying) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>🛡️ Verifying admin access...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};


// PUBLIC ROUTE - Prevents logged-in users from accessing login/signup
export const PublicRoute = ({ children }) => {
  const token = authService.getToken();
  const user = authService.getCurrentUser();

  // If user is logged in, redirect to their dashboard
  if (token && user) {
    console.log('✅ User already logged in, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


// ADMIN PUBLIC ROUTE - Prevents logged-in admins from accessing admin login
export const AdminPublicRoute = ({ children }) => {
  const token = authService.getAdminToken();
  const admin = authService.getCurrentAdmin();

  // If admin is logged in, redirect to admin dashboard
  if (token && admin && admin.role === 'admin') {
    console.log('✅ Admin already logged in, redirecting to admin dashboard');
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};