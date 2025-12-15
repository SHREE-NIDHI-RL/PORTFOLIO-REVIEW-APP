import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { ReviewerContext } from "../context/ReviewerContext"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [qualifications, setQualifications] = useState("")
  const [workplace, setWorkplace] = useState("")
  const [skills, setSkills] = useState("")
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const { addReviewer } = useContext(ReviewerContext)

  const handleSubmit = (e) => {
    e.preventDefault()
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
    
    login(userData)
    navigate("/dashboard")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          {role === "reviewer" && (
            <>
              <input
                type="text"
                placeholder="Qualifications"
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
                className="auth-input"
              />
              <input
                type="text"
                placeholder="Workplace"
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="auth-input"
              />
              <input
                type="text"
                placeholder="Skills / Domain"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="auth-input"
              />
            </>
          )}

          <button type="submit" className="auth-button">Register</button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Login here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register