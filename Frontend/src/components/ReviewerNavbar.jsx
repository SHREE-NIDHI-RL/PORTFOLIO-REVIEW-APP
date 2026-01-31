import { useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import "../styles/Navbar.css"

function ReviewerNavbar() {
  const { user, logout } = useContext(AuthContext)
  const { reviewRequests } = useContext(PortfolioContext)
  const location = useLocation()
  const navigate = useNavigate()

  const completedReviews = (reviewRequests || []).filter(req => 
    req.reviewerEmail === user?.email && req.status === "completed"
  ).length

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navItems = [
    { path: "/review-requests", icon: "", label: "Review Requests" },
    { path: "/assigned-reviews", icon: "", label: "Assigned Reviews" },
    { path: "/review-history", icon: "", label: "Review History" },
    { path: "/portfolio-exploration", icon: "", label: "Explore Portfolios" },
    { path: "/submit-review", icon: "", label: "Submit Review" },
    { path: "/reviewer-profile", icon: "", label: "My Profile" }
  ]

  const logoutItem = { action: handleLogout, icon: "", label: "Logout" }

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <div className="navbar-logo"></div>
        <h3 className="navbar-title">Review Hub</h3>
      </div>
      
      <nav className="navbar-nav">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
        <button onClick={logoutItem.action} className="nav-item logout-btn">
          <span className="nav-icon">{logoutItem.icon}</span>
          <span className="nav-label">{logoutItem.label}</span>
        </button>
      </nav>
    </div>
  )
}

export default ReviewerNavbar