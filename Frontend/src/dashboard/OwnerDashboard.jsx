import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

function OwnerDashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h2>Owner Dashboard</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>

      <h3>Your Capabilities</h3>
      <ul>
        <Link to="/create-portfolio">Create Portfolio</Link>
        <li>Submit Portfolio for Review</li>
        <li>Request Specific Reviewers</li>
        <li>View Reviews & Scores</li>
        <li>Control Portfolio Visibility</li>
      </ul>
    </div>
  )
}

export default OwnerDashboard
