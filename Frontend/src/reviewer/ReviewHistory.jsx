import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewerDashboard.css"

function ReviewHistory() {
  const { user } = useContext(AuthContext)
  const { reviewRequests } = useContext(PortfolioContext)
  const [selectedReview, setSelectedReview] = useState(null)
  
  const completedReviews = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "completed"
  ).sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate))

  const handleViewReview = (review) => {
    setSelectedReview(review)
  }

  const getAverageScore = () => {
    if (completedReviews.length === 0) return 0
    const total = completedReviews.reduce((sum, review) => sum + review.score, 0)
    return (total / completedReviews.length).toFixed(1)
  }

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Review History</h1>
        </div>

        <div className="dashboard-content">
          {/* Review Statistics */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{completedReviews.length}</div>
                <div className="stat-label">Total Reviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{getAverageScore()}</div>
                <div className="stat-label">Average Score Given</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {completedReviews.filter(r => new Date(r.reviewDate) > new Date(Date.now() - 30*24*60*60*1000)).length}
                </div>
                <div className="stat-label">Reviews This Month</div>
              </div>
            </div>
          </section>

          <section className="history-section">
            <h2 className="section-title">Completed Reviews</h2>
            {completedReviews.length > 0 ? (
              <div className="history-list">
                {completedReviews.map(review => (
                  <div key={review.id} className="history-item">
                    <div className="reviewer-avatar">
                      {review.portfolioTitle.charAt(0).toUpperCase()}
                    </div>
                    <div className="history-content">
                      <div className="history-header">
                        <div className="history-info">
                          <span className="history-title">{review.portfolioTitle}</span>
                          <span className="history-meta">
                            Owner: {review.ownerName} • Score: {review.score}/10 • Version 1.0
                          </span>
                        </div>
                        <span className="history-date">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="history-body">
                        <div className="history-tags">
                          <span className="domain-tag">
                            {review.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                             review.portfolioTitle.includes('Web') ? 'Web Development' :
                             review.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}
                          </span>
                          <span className={`score-tag score-${review.score >= 8 ? 'high' : review.score >= 6 ? 'medium' : 'low'}`}>
                            {review.score}/10
                          </span>
                        </div>
                        <p className="history-feedback">
                          "{(review.feedback || '').substring(0, 150)}..."
                        </p>
                        <div className="history-actions">
                          <button 
                            onClick={() => handleViewReview(review)}
                            className="action-btn primary"
                          >
                            View Full Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
                <h3>No completed reviews yet</h3>
                <p>Your review history will appear here once you complete portfolio reviews.</p>
              </div>
            )}
          </section>

          {/* Review Detail Modal */}
          {selectedReview && (
            <div className="portfolio-modal">
              <div className="portfolio-modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Review Details: {selectedReview.portfolioTitle}</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedReview(null)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="review-details">
                    <div className="detail-row">
                      <strong>Portfolio:</strong> {selectedReview.portfolioTitle}
                    </div>
                    <div className="detail-row">
                      <strong>Owner:</strong> {selectedReview.ownerName}
                    </div>
                    <div className="detail-row">
                      <strong>Review Date:</strong> {new Date(selectedReview.reviewDate).toLocaleDateString()}
                    </div>
                    <div className="detail-row">
                      <strong>Overall Score:</strong> 
                      <span className={`score-badge score-${selectedReview.score >= 8 ? 'high' : selectedReview.score >= 6 ? 'medium' : 'low'}`}>
                        {selectedReview.score}/10
                      </span>
                    </div>
                  </div>
                  
                  <div className="review-feedback-section">
                    <h4>Review Feedback:</h4>
                    <div className="feedback-content">
                      {selectedReview.feedback || 'No feedback available'}
                    </div>
                  </div>

                  <div className="review-breakdown">
                    <h4>Score Breakdown:</h4>
                    <div className="score-items">
                      <div className="score-item">
                        <span className="score-label">Visual Design:</span>
                        <span className="score-value">{Math.floor(selectedReview.score * 0.9)}/10</span>
                      </div>
                      <div className="score-item">
                        <span className="score-label">Usability:</span>
                        <span className="score-value">{Math.floor(selectedReview.score * 0.8)}/10</span>
                      </div>
                      <div className="score-item">
                        <span className="score-label">Content Quality:</span>
                        <span className="score-value">{Math.floor(selectedReview.score * 0.7)}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="action-btn secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewHistory