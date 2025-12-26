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
    { path: "/assigned-reviews", icon: "📝", label: "Assigned Reviews" },
    { path: "/review-history", icon: "📚", label: "Review History" },
    { path: "/portfolio-exploration", icon: "🔍", label: "Explore Portfolios" },
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

export default ReviewerNavbar