import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

function Login() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { email, role }
    login(userData)
    navigate("/dashboard")
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="auth-select"
            required
          >
            <option value="">Select Role</option>
            <option value="owner">Portfolio Owner</option>
            <option value="reviewer">Reviewer</option>
          </select>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" className="auth-link">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login