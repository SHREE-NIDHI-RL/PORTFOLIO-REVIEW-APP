import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

function ReviewerDashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div>
      <h2>Reviewer Dashboard</h2>

      <div>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Qualifications:</strong> {user?.qualifications}</p>
        <p><strong>Workplace:</strong> {user?.workplace}</p>
      </div>

      <h3>Reviewer Actions</h3>
      <ul>
        <li>Search Portfolios for Review</li>
        <li> <Link to="/submit-review">Review a Portfolio</Link></li>
        <li><Link to="/review-requests">Review Requests</Link></li>
        <li>Accept / Reject Review Requests</li>
        <li>Give Scores (0–10)</li>
        <li>Provide Structured Feedback</li>
        <li>Build Reviewer Credibility</li>
      </ul>
    </div>
  )
}

export default ReviewerDashboard
