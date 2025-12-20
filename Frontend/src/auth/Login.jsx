import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      if (!email || !password || !role) {
        throw new Error("Please fill in all fields")
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      const userData = { email, role }
      login(userData)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address")
      return
    }
    alert(`Password reset link sent to ${email}`)
    setShowForgotPassword(false)
  }
  
  if (showForgotPassword) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Reset Password</h2>
            <p className="auth-subtitle">Enter your email to receive reset instructions</p>
          </div>
          <form onSubmit={handleForgotPassword} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            <div className="input-group">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
              <span className="input-icon">📧</span>
            </div>
            <button type="submit" className="auth-button">Send Reset Link</button>
            <button type="button" onClick={() => setShowForgotPassword(false)} className="auth-button" style={{ background: "#6c757d" }}>Back to Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
            <span className="input-icon">📧</span>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
            <span className="input-icon">🔒</span>
          </div>
          <div className="role-buttons">
            <button 
              type="button" 
              className={`role-button ${role === 'owner' ? 'active' : ''}`}
              onClick={() => setRole('owner')}
            >
              Portfolio Owner
            </button>
            <button 
              type="button" 
              className={`role-button ${role === 'reviewer' ? 'active' : ''}`}
              onClick={() => setRole('reviewer')}
            >
              Reviewer
            </button>
          </div>
          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me
            </label>
            <button type="button" onClick={() => setShowForgotPassword(true)} className="forgot-password">Forgot Password?</button>
          </div>
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading && <span className="loading-spinner"></span>}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" className="auth-link">Create Account</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login