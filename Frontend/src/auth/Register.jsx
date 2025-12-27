import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Portfolio Owner")
  const [qualifications, setQualifications] = useState("")
  const [workplace, setWorkplace] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  const { register } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      if (!name || !email || !password) {
        throw new Error("Please fill in all required fields")
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }
      
      if (role === "Reviewer" && (!qualifications || !workplace)) {
        throw new Error("Please fill in all reviewer fields")
      }
      
      const userData = {
        name,
        email,
        password,
        role: role === "Portfolio Owner" ? "owner" : "reviewer",
        qualifications: role === "Reviewer" ? qualifications : undefined,
        workplace: role === "Reviewer" ? workplace : undefined,
        skills: role === "Reviewer" ? qualifications : undefined,
      }
      
      await register(userData)
      
      setSuccess("Account created successfully! Redirecting to dashboard...")
      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
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
            <div className="illustration-container register-illustration">
              <div className="person person-3">
                <div className="person-body"></div>
                <div className="person-head"></div>
              </div>
              <div className="person person-4">
                <div className="person-body"></div>
                <div className="person-head"></div>
              </div>
              <div className="portfolio-mockup">
                <div className="portfolio-header"></div>
                <div className="portfolio-content">
                  <div className="portfolio-item"></div>
                  <div className="portfolio-item"></div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="page-title">Create a new account</h2>
        </div>
        
        <div className="auth-right">
          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="form-input" 
                  required 
                />
              </div>
              
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
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="form-input" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="form-select"
                >
                  <option value="Portfolio Owner">Portfolio Owner</option>
                  <option value="Reviewer">Reviewer</option>
                </select>
              </div>
              
              {role === "Reviewer" && (
                <>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Qualifications" 
                      value={qualifications} 
                      onChange={(e) => setQualifications(e.target.value)} 
                      className="form-input" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Workplace" 
                      value={workplace} 
                      onChange={(e) => setWorkplace(e.target.value)} 
                      className="form-input" 
                      required 
                    />
                  </div>
                </>
              )}
              
              <div className="form-buttons">
                <button type="button" className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register