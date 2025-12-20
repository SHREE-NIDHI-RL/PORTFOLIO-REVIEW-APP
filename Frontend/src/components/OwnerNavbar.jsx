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
    { path: "/saved-portfolios", icon: "💾", label: "Saved Portfolios" },
    { path: "/posts", icon: "📱", label: "Posts" },
    { path: "/find-reviewer", icon: "🔍", label: "Find a Reviewer" },
    { path: "/view-feedback", icon: "💬", label: "View Feedback" },
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
    </div>
  )
}

export default OwnerNavbar