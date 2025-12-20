import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./UserProfile.css"

function UserProfile() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="user-profile-topbar">
      <button 
        className="profile-toggle"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="profile-avatar">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <span className="profile-name">{user?.name || 'User'}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {showDropdown && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="dropdown-info">
              <h4>{user?.name || 'User'}</h4>
              <p>{user?.email}</p>
              <span className="role-badge">{user?.role}</span>
            </div>
          </div>
          <div className="dropdown-actions">
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile