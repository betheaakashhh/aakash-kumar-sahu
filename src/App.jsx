import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Lenis from '@studio-freight/lenis'

import './App.css'

// Pages
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import AdminDashboard from './pages/AdminSide/AdminDashboard.jsx'
import ResumePage from './pages/ResumePage/ResumePage.jsx'

// Auth
import Login from './Components/Login/Login.jsx'
import Signup from './Components/Signup/Signup.jsx'
import AdminLogin from './Components/AdminLogin/AdminLogin.jsx'

// Blog
import Blog from './Components/BlogPost/Blog.jsx'
import BlogAdmin from './pages/AdminSide/BlogAdmin.jsx'

// Utils
import UpdateNotification from './Components/UpdateInfo/UpdateNotification.jsx'
import Cursor from './Components/Cursor/Cursor.jsx'

// Route Guards
import ProtectedRoute, {
  AdminProtectedRoute,
  PublicRoute,
  AdminPublicRoute
} from './Components/ProtectedRoute.jsx'

function App() {



  return (
    <div className="App">
      {/* Custom Cursor */}
      <Cursor />

      {/* Notifications */}
      <UpdateNotification />

      <Routes>

        {/* ============= PUBLIC ROUTES ============= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/public-blog" element={<Blog />} />
        <Route path="/public-blog/:slug" element={<Blog />} />

        {/* ============= AUTH ROUTES ============= */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />

        {/* ============= CLIENT PROTECTED ROUTES ============= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={<ResumePage />}
        />

        {/* ============= ADMIN PROTECTED ROUTES ============= */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <AdminProtectedRoute>
              <BlogAdmin />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/update-panel"
          element={
            <AdminProtectedRoute>
              <UpdateNotification />
            </AdminProtectedRoute>
          }
        />

        {/* ============= 404 PAGE ============= */}
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
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '72px' }}>404</h1>
              <p style={{ fontSize: '22px' }}>Page Not Found</p>
              <a
                href="/"
                style={{
                  marginTop: '20px',
                  padding: '12px 24px',
                  background: '#fff',
                  color: '#141415ff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600'
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

export default App
