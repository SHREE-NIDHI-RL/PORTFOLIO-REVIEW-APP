import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewerDashboard.css"

function ReviewerProfile() {
  const { user } = useContext(AuthContext)
  const { reviewRequests } = useContext(PortfolioContext)
  
  const myReviews = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "completed"
  )
  
  const avgScore = myReviews.length > 0 
    ? (myReviews.reduce((sum, review) => sum + (review.score || 0), 0) / myReviews.length).toFixed(1)
    : "N/A"

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Reviewer Profile</h1>
        </div>

        <div className="dashboard-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{user?.name}</h2>
                <p className="profile-email">{user?.email}</p>
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">{myReviews.length}</span>
                    <span className="stat-label">Reviews Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{avgScore}</span>
                    <span className="stat-label">Avg Score Given</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-section">
                <h3>Professional Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Workplace:</strong>
                    <span>{user?.workplace || "Not specified"}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Qualifications:</strong>
                    <span>{user?.qualifications || "Not specified"}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Skills:</strong>
                    <span>{user?.skills || "Not specified"}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Review History</h3>
                {myReviews.length > 0 ? (
                  <div className="review-history">
                    {myReviews.slice(0, 5).map(review => (
                      <div key={review.id} className="history-item">
                        <div className="history-header">
                          <h4>{review.portfolioTitle}</h4>
                          <span className="score-badge">{review.score}/10</span>
                        </div>
                        <p className="history-meta">
                          Owner: {review.ownerName} • {new Date(review.reviewDate).toLocaleDateString()}
                        </p>
                        <p className="history-feedback">
                          {review.feedback?.substring(0, 100)}...
                        </p>
                      </div>
                    ))}
                    {myReviews.length > 5 && (
                      <p className="view-more">And {myReviews.length - 5} more reviews...</p>
                    )}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No completed reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewerProfile
