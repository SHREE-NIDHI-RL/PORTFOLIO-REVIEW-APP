import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import "./DemoControls.css"

function DemoControls() {
  const { user, login } = useContext(AuthContext)

  const switchToOwner = () => {
    login({
      name: "John Smith",
      email: "owner@example.com", 
      role: "owner"
    })
  }

  const switchToReviewer = () => {
    login({
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      role: "reviewer",
      qualifications: "PhD Computer Science, 8+ years experience",
      workplace: "TechCorp Solutions",
      skills: "Frontend Development, UI/UX Design, React, JavaScript"
    })
  }

  return (
    <div className="demo-controls">
      <div className="demo-header">
        <h4>🧪 Demo Mode</h4>
        <p>Current: {user?.name} ({user?.role})</p>
      </div>
      <div className="demo-buttons">
        <button 
          onClick={switchToOwner}
          className={`demo-btn ${user?.role === 'owner' ? 'active' : ''}`}
        >
          Switch to Owner
        </button>
        <button 
          onClick={switchToReviewer}
          className={`demo-btn ${user?.role === 'reviewer' ? 'active' : ''}`}
        >
          Switch to Reviewer
        </button>
      </div>
    </div>
  )
}

export default DemoControls