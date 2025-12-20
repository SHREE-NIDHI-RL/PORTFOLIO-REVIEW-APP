import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewerDashboard.css"

function ReviewerDashboard() {
  const { user } = useContext(AuthContext)

  const reviewerActions = [
    {
      title: "Review Requests",
      link: "/review-requests",
      description: "View and manage incoming portfolio review requests"
    },
    {
      title: "Submit Review",
      link: "/submit-review", 
      description: "Provide detailed feedback and scores for portfolios"
    },
    {
      title: "My Profile",
      link: "/reviewer-profile",
      description: "Manage your professional reviewer profile and credentials"
    },
    {
      title: "Credibility Score",
      link: "/credibility-score",
      description: "Track your reviewer reputation and performance metrics"
    }
  ]

  return (
    <>
      <ReviewerNavbar />
      <div className="dashboard-with-navbar">
        <div className="reviewer-dashboard-wrapper">
          <div className="reviewer-dashboard-main">
            <div className="reviewer-dashboard-header">
              <h1 className="reviewer-dashboard-title">Review Hub</h1>
              <div className="reviewer-info">
                <div className="reviewer-detail">
                  <strong>{user?.name}</strong>
                </div>
                <div className="reviewer-detail">
                  {user?.qualifications}
                </div>
                <div className="reviewer-detail">
                  {user?.workplace}
                </div>
              </div>
            </div>

            <div className="reviewer-actions-section">
              <h2 className="reviewer-actions-title">Reviewer Actions</h2>
              <ul className="reviewer-actions-grid">
                {reviewerActions.map((action, index) => (
                  <li key={index} className="reviewer-action-card">
                    <Link to={action.link} className="capability-link">
                      {action.title}
                    </Link>
                    <p className="capability-description">
                      {action.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewerDashboard