import { createContext, useState } from "react"

export const AuthContext = createContext()

// Default users for testing (2 owners + 3 reviewers)
const defaultUsers = [
  {
    name: "John Smith",
    email: "owner1@example.com",
    password: "password123",
    role: "owner"
  },
  {
    name: "Alice Johnson",
    email: "owner2@example.com",
    password: "password123",
    role: "owner"
  },
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    password: "password123",
    role: "reviewer",
    skills: "Frontend Development, UI/UX Design, React, JavaScript",
    workplace: "TechCorp Solutions",
    qualifications: "PhD Computer Science, 8+ years experience"
  },
  {
    name: "Michael Chen",
    email: "michael.chen@innovate.com",
    password: "password123",
    role: "reviewer",
    skills: "Full-Stack Development, Python, Node.js, AWS",
    workplace: "Innovate Labs",
    qualifications: "Senior Software Engineer, MS Computer Science"
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@designstudio.com",
    password: "password123",
    role: "reviewer",
    skills: "Product Design, User Research, Figma, Adobe Creative Suite",
    workplace: "Creative Design Studio",
    qualifications: "Lead Product Designer, 6+ years experience"
  }
]

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users] = useState(defaultUsers)

  const login = (email, password, role) => {
    const foundUser = users.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === role
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const addUser = (userData) => {
    users.push(userData)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, addUser, defaultUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
