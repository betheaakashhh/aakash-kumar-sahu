import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Login from './Components/Login/Login.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import AdminDashboard from './pages/AdminSide/AdminDashboard.jsx'
import AdminLogin from './Components/AdminLogin/AdminLogin.jsx'
import ResumePage from './pages/ResumePage/ResumePage.jsx'



// Import ALL protected route components
import ProtectedRoute, { 
  AdminProtectedRoute,
  PublicRoute,
  AdminPublicRoute 
} from './Components/ProtectedRoute.jsx'

import Blog from './Components/BlogPost/Blog.jsx'
import BlogAdmin from './pages/AdminSide/BlogAdmin.jsx'


function App() {
  return (
    <div className="App">
      <Routes>
        {/* ============= PUBLIC ROUTES ============= */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/public-blog' element={<Blog />} />
        <Route path="/public-blog/:slug" element={<Blog />} />
        

        
        {/* Client Auth Routes - Redirect to dashboard if already logged in */}
        <Route 
          path='/login' 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route 
          path='/signup' 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />

        {/* Admin Auth Route - Redirect to admin dashboard if already logged in */}
        <Route 
          path='/admin/login' 
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          } 
        />

        {/* ============= CLIENT PROTECTED ROUTES ============= */}
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Uncomment when ready */}
        <Route 
          path='/resume' 
          element={
            
              <ResumePage />
            
          } 
        />
        
        

        {/* ============= ADMIN PROTECTED ROUTES ============= */}
        <Route 
          path='/admin/dashboard' 
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } 
        />
        <Route path="/admin/blogs" element={<AdminProtectedRoute> <BlogAdmin /> </AdminProtectedRoute>} />


        {/* ============= OTHER ROUTES ============= */}
        {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}

        {/* ============= 404 NOT FOUND ============= */}
        <Route 
          path="*" 
          element={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              padding: '20px'
            }}>
              <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
              <p style={{ fontSize: '24px', margin: '20px 0' }}>Page Not Found</p>
              <a 
                href="/" 
                style={{
                  padding: '12px 24px',
                  background: 'white',
                  color: '#667eea',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  marginTop: '20px'
                }}
              >
                Go Home
              </a>
            </div>
          } 
        />
      </Routes>
    </div>
  )
}

// Placeholder components (uncomment when ready)
// const ResumePage = () => (
//   <div style={{ padding: '2rem', color: 'white', background: '#0a0a0f', minHeight: '100vh' }}>
//     <h1>Resume (Protected)</h1>
//     <p>Your resume content here...</p>
//   </div>
// );

const CertificatesPage = () => (
  <div style={{ padding: '2rem', color: 'white', background: '#0a0a0f', minHeight: '100vh' }}>
    <h1>Certificates (Protected)</h1>
    <p>Your certificates here...</p>
  </div>
);

const ForgotPassword = () => (
  <div style={{ padding: '2rem', color: 'white', background: '#0a0a0f', minHeight: '100vh' }}>
    <h1>Forgot Password</h1>
    <p>Password reset functionality coming soon...</p>
    <a href="/login" style={{ color: '#6366f1' }}>Back to Login</a>
  </div>
);

export default App