import { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "../styles/Navbar.css"

function OwnerNavbar() {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navItems = [
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/create-portfolio", icon: "📁", label: "Create Portfolio" },
    { path: "/find-reviewer", icon: "🔍", label: "Find a Reviewer" },
    { path: "/feedback", icon: "💬", label: "Feedback" },
    { path: "/settings", icon: "⚙️", label: "Settings" }
  ]

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <div className="navbar-logo">💼</div>
        <h3 className="navbar-title">Portfolio Review</h3>
      </div>

      <nav className="navbar-nav">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="user-profile-section">
        <div className="user-profile-card">
          <div className="user-profile-avatar">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="user-profile-info">
            <h4 className="user-profile-name">Shree Murugan</h4>
            <p className="user-profile-role">Owner</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  )
}

export default OwnerNavbar