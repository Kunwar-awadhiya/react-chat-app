import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/layout/ProtectedRoute'
import { restoreAuth } from './store/slices/authSlice'
import { useTheme } from './contexts/ThemeContext'
import './index.css'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.className = theme
  }, [theme])

  useEffect(() => {
    // Restore authentication state on app load
    dispatch(restoreAuth())
  }, [dispatch])

  useEffect(() => {
    // Redirect authenticated users away from login page
    if (isAuthenticated && window.location.pathname === '/login') {
      navigate('/home', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />} 
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App