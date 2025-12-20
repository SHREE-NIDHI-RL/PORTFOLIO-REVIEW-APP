import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "../styles/Navbar.css"

function ReviewerNavbar() {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navItems = [
    { path: "/dashboard", icon: "🏠", label: "Dashboard" },
    { path: "/review-requests", icon: "📋", label: "Review Requests" },
    { path: "/submit-review", icon: "✍️", label: "Submit Review" },
    { path: "/reviewer-profile", icon: "👤", label: "My Profile" },
    { path: "/credibility-score", icon: "🏆", label: "Credibility Score" }
  ]

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <div className="navbar-logo">⭐</div>
        <h3 className="navbar-title">Review Hub</h3>
      </div>
      
      <div className="navbar-user">
        <div className="user-profile">
          <div className="user-avatar">👨💼</div>
          <div className="user-details">
            <h4 className="user-name">{user?.name || user?.email?.split('@')[0]}</h4>
            <p className="user-role">Professional Reviewer</p>
            <p className="user-email">{user?.email}</p>
            <div className="user-stats">
              <span className="stat-item">📝 12 Reviews</span>
              <span className="stat-item">🏆 8.7 Score</span>
            </div>
            <div className="user-status">
              <span className="status-indicator"></span>
              <span className="status-text">Online</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar-nav">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="navbar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewerNavbar