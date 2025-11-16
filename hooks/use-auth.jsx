'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/constants'

const AuthContext = createContext(null)

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      if (authApi.isAuthenticated()) {
        const userData = await authApi.getMe()
        setUser(userData)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authApi.login(credentials)
      setUser(data.user || data)
      router.push(ROUTES.DASHBOARD)
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.'
      console.error('Login error:', err)
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await authApi.register(userData)
      setUser(data.user || data)
      router.push(ROUTES.DASHBOARD)
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.'
      console.error('Registration error:', err)
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await authApi.logout()
      setUser(null)
      router.push(ROUTES.LOGIN)
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth Hook
 * Access authentication state and methods
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
