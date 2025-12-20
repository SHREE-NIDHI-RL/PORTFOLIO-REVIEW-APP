import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import ReviewerNavbar from "../components/ReviewerNavbar"
import UserProfile from "../components/UserProfile"
import "../styles/ReviewerDashboard.css"

function ReviewerDashboard() {
  const { user } = useContext(AuthContext)
  const { reviewRequests, updateRequestStatus } = useContext(PortfolioContext)
  
  const pendingRequests = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "pending"
  )

  const handleAcceptRequest = (requestId) => {
    updateRequestStatus(requestId, "accepted")
    alert("Request accepted! You can now review the portfolio.")
  }

  const handleRejectRequest = (requestId) => {
    updateRequestStatus(requestId, "rejected")
    alert("Request rejected.")
  }

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
      <UserProfile />
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

            {pendingRequests.length > 0 && (
              <div className="pending-requests-section">
                <h2 className="pending-requests-title">Pending Review Requests</h2>
                <div className="requests-grid">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <h3>From: {request.ownerName}</h3>
                        <span className="request-date">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="request-details">
                        <h4>Portfolio: {request.portfolioTitle}</h4>
                        <p className="portfolio-preview">
                          {request.portfolioContent.substring(0, 150)}...
                        </p>
                      </div>
                      <div className="request-actions">
                        <button 
                          onClick={() => handleAcceptRequest(request.id)}
                          className="accept-btn"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleRejectRequest(request.id)}
                          className="reject-btn"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewerDashboard