import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields")
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const loginSuccess = login(email, password, 'owner')
      if (!loginSuccess) {
        throw new Error("Invalid credentials")
      }
      
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
      <div className="auth-page">
        <div className="auth-container-split">
          <div className="auth-left">
            <div className="brand-header">
              <div className="brand-icon">💼</div>
              <h1 className="brand-title">Portfolio Review Platform</h1>
            </div>
            <div className="auth-illustration">
              <div className="illustration-container">
                <div className="person person-1">
                  <div className="person-body"></div>
                  <div className="person-head"></div>
                </div>
                <div className="person person-2">
                  <div className="person-body"></div>
                  <div className="person-head"></div>
                </div>
                <div className="dashboard-mockup">
                  <div className="dashboard-header"></div>
                  <div className="dashboard-content">
                    <div className="chart"></div>
                    <div className="stats"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-right">
            <div className="auth-form-container">
              <h2 className="auth-title">Reset Password</h2>
              <form onSubmit={handleForgotPassword} className="auth-form">
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-input" 
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary">Send Reset Link</button>
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(false)} 
                  className="btn-secondary"
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-container-split">
        <div className="auth-left">
          <div className="brand-header">
            <div className="brand-icon">💼</div>
            <h1 className="brand-title">Portfolio Review Platform</h1>
          </div>
          <div className="auth-illustration">
            <div className="illustration-container">
              <div className="person person-1">
                <div className="person-body"></div>
                <div className="person-head"></div>
              </div>
              <div className="person person-2">
                <div className="person-body"></div>
                <div className="person-head"></div>
              </div>
              <div className="dashboard-mockup">
                <div className="dashboard-header"></div>
                <div className="dashboard-content">
                  <div className="chart"></div>
                  <div className="stats"></div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="page-title">Sign in to your account</h2>
        </div>
        
        <div className="auth-right">
          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="form-input" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="form-input" 
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁️
                  </button>
                </div>
              </div>
              
              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  Remember me
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(true)} 
                  className="forgot-link"
                >
                  Forgot Password?
                </button>
              </div>
              
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Log In"}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register" className="auth-link">Create an account</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login