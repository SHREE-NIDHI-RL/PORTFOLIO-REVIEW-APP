import { createContext, useState } from "react"

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "John Smith",
    email: "owner@example.com",
    role: "owner"
  })

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
