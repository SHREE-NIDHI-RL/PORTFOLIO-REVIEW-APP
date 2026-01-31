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
    { path: "/create-portfolio", icon: "", label: "Create Portfolio" },
    { path: "/saved-portfolios", icon: "", label: "Saved Portfolios" },
    { path: "/reviewer-requests", icon: "", label: "Requests from Reviewers" },
    { path: "/posts", icon: "", label: "Posts" },
    { path: "/find-reviewer", icon: "", label: "Find a Reviewer" },
    { action: handleLogout, icon: "", label: "Logout" }
  ]

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <div className="navbar-logo"></div>
        <h3 className="navbar-title">Portfolio Review</h3>
      </div>

      <nav className="navbar-nav">
        {navItems.map((item, index) => (
          item.path ? (
            <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ) : (
            <button key={index} onClick={item.action} className="nav-item logout-btn">
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          )
        ))}
      </nav>
    </div>
  )
}

export default OwnerNavbar