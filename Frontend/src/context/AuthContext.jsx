import { createContext, useState, useEffect } from "react"
import apiService from "../services/api"

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      apiService.setToken(token)
      getCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const getCurrentUser = async () => {
    try {
      const response = await apiService.getCurrentUser()
      setUser(response.user)
    } catch (error) {
      console.error('Error getting current user:', error)
      // Clear invalid token
      localStorage.removeItem('token')
      apiService.setToken(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password, role) => {
    try {
      const response = await apiService.login({ email, password, role })
      apiService.setToken(response.token)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData)
      apiService.setToken(response.token)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    apiService.setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading 
    }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem'
        }}>
          Loading...
        </div>
      ) : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider