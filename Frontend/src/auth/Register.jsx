import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { ReviewerContext } from "../context/ReviewerContext"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [qualifications, setQualifications] = useState("")
  const [workplace, setWorkplace] = useState("")
  const [skills, setSkills] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const { addReviewer } = useContext(ReviewerContext)

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("")
        setSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  const validateForm = () => {
    if (!name || !email || !password || !role) {
      throw new Error("Please fill in all required fields")
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match")
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }
    if (!agreeTerms) {
      throw new Error("Please agree to the terms and conditions")
    }
    if (role === "reviewer" && (!qualifications || !workplace || !skills)) {
      throw new Error("Please fill in all reviewer fields")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      validateForm()
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const userData = {
        name,
        email,
        role,
        qualifications: role === "reviewer" ? qualifications : null,
        workplace: role === "reviewer" ? workplace : null,
        skills: role === "reviewer" ? skills : null,
      }
      
      if (role === "reviewer") {
        addReviewer(userData)
      }
      
      setSuccess("Account created successfully! Redirecting to login...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our portfolio review community</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="input-group">
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="auth-input" required />
            <span className="input-icon">👤</span>
          </div>
          
          <div className="input-group">
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" required />
            <span className="input-icon">📧</span>
          </div>
          
          <div className="input-group">
            <input type="password" placeholder="Password (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" required />
            <span className="input-icon">🔒</span>
          </div>
          
          <div className="input-group">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="auth-input" required />
            <span className="input-icon">🔓</span>
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
              Professional Reviewer
            </button>
          </div>

          {role === "reviewer" && (
            <>
              <div className="input-group">
                <input type="text" placeholder="Professional Qualifications" value={qualifications} onChange={(e) => setQualifications(e.target.value)} className="auth-input" required />
                <span className="input-icon">🎓</span>
              </div>
              <div className="input-group">
                <input type="text" placeholder="Current Workplace" value={workplace} onChange={(e) => setWorkplace(e.target.value)} className="auth-input" required />
                <span className="input-icon">🏢</span>
              </div>
              <div className="input-group">
                <input type="text" placeholder="Skills & Expertise" value={skills} onChange={(e) => setSkills(e.target.value)} className="auth-input" required />
                <span className="input-icon">🛠️</span>
              </div>
            </>
          )}

          <label className="remember-me" style={{ marginTop: "1rem" }}>
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
            I agree to the Terms of Service and Privacy Policy
          </label>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading && <span className="loading-spinner"></span>}
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register