import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../Login/login.css'; // Reuse the same CSS

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use ADMIN LOGIN method
      const result = await authService.adminLogin(formData.email, formData.password);
      
      // Verify the token was stored properly
      const token = localStorage.getItem('adminToken');
      const admin = localStorage.getItem('admin');
      
      console.log('Admin login successful - Token stored:', !!token);
      console.log('Admin data stored:', !!admin);
      
      // Verify user role is 'admin'
      const adminData = JSON.parse(admin || '{}');
      if (adminData.role !== 'admin') {
        setError('Access denied. Admin access only.');
        authService.adminLogout();
        setLoading(false);
        return;
      }
      
      // Force a quick verification
      const isVerified = await authService.verifyAdminToken();
      console.log('Admin token verified:', isVerified);
      
      if (isVerified) {
        const adminName = adminData.name || 'Admin';
        
        setTimeout(() => {
          navigate('/admin/dashboard', { 
            state: { 
              welcomeMessage: `Welcome back, ${adminName}!`
            }
          });
        }, 1500);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-auth-wrapper admin-theme">
      {/* Animated Background */}
      <div className="modern-auth-bg">
        <div className="modern-gradient-orb orb-1" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
        <div className="modern-gradient-orb orb-2" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></div>
        <div className="modern-gradient-orb orb-3" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
        <div className="modern-grid-pattern"></div>
        <div className="modern-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="modern-auth-container">
        <div className="modern-auth-card">
          {/* Logo/Brand Section */}
          <div className="modern-auth-brand">
            <div className="admin-badge">
              <span className="badge-icon">🛡️</span>
              <span>ADMIN PORTAL</span>
            </div>
            <h1 className="brand-title">
              Admin <span className="gradient-text">Login</span>
            </h1>
            <p className="brand-subtitle">Secure access to administrative dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="modern-error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="modern-auth-form">
            <div className="modern-form-group">
              <label htmlFor="email" className="modern-label">
                <span className="label-icon">👤</span>
                Admin Email
              </label>
              <div className="modern-input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="modern-input"
                  required
                  autoComplete="username"
                />
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="modern-form-group">
              <label htmlFor="password" className="modern-label">
                <span className="label-icon">🔐</span>
                Password
              </label>
              <div className="modern-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="modern-input"
                  required
                  minLength="6"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="modern-submit-btn admin-btn"
              disabled={loading}
            >
              <span className="btn-bg"></span>
              <span className="btn-content">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span className="lock-icon">🔓</span>
                    Access Admin Panel
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="modern-auth-footer">
            <p>Not an admin?</p>
            <Link to="/login" className="signup-link">
              Client Login
              <span className="link-arrow">→</span>
            </Link>
          </div>

          {/* Security Badge */}
          <div className="security-badge admin-security">
            <span className="security-icon">🔒</span>
            <span>Protected by enterprise-grade security</span>
          </div>
        </div>

        {/* Side Illustration */}
        <div className="modern-auth-illustration">
          <div className="illustration-content">
            <div className="floating-card card-1" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
              <div className="card-icon">📊</div>
              <div className="card-text">
                <h4>Dashboard</h4>
                <p>Monitor all activities</p>
              </div>
            </div>
            <div className="floating-card card-2" style={{ background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)' }}>
              <div className="card-icon">👥</div>
              <div className="card-text">
                <h4>Manage Clients</h4>
                <p>Full client control</p>
              </div>
            </div>
            <div className="floating-card card-3" style={{ background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)' }}>
              <div className="card-icon">💼</div>
              <div className="card-text">
                <h4>Projects</h4>
                <p>Handle requests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-theme .modern-gradient-orb {
          animation: float 20s ease-in-out infinite;
        }
        
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #667eea;
          margin-bottom: 20px;
        }
        
        .badge-icon {
          font-size: 16px;
        }
        
        .admin-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .admin-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }
        
        .lock-icon {
          font-size: 18px;
        }
        
        .admin-security {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
          border: 1px solid rgba(102, 126, 234, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;