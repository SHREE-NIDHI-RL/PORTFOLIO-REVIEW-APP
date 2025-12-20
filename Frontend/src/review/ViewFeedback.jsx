import { useContext, useState } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { ReviewerContext } from "../context/ReviewerContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/ViewFeedback.css"

function ViewFeedback() {
  const { portfolios, reviewRequests, addPost } = useContext(PortfolioContext)
  const { reviewers } = useContext(ReviewerContext)
  const { user } = useContext(AuthContext)
  const [selectedReview, setSelectedReview] = useState(null)

  const handleCreatePost = (review, portfolio) => {
    const postData = {
      authorName: user.name,
      authorEmail: user.email,
      portfolioTitle: portfolio.title,
      portfolioContent: portfolio.content,
      reviewerName: review.reviewerName,
      reviewScore: review.score,
      reviewFeedback: review.feedback
    }
    addPost(postData)
    alert("Portfolio and review posted successfully!")
  }

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)
  const completedReviews = reviewRequests.filter(req => 
    req.ownerEmail === user?.email && req.status === "completed"
  )

  const getReviewerProfile = (reviewerEmail) => {
    return reviewers.find(r => r.email === reviewerEmail)
  }

  const getPortfolioReviews = (portfolioTitle) => {
    return completedReviews.filter(review => review.portfolioTitle === portfolioTitle)
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="view-feedback-container">
        <div className="view-feedback-header">
          <h1 className="view-feedback-title">Portfolio Reviews & Feedback</h1>
          <p className="view-feedback-subtitle">View all reviews received for your portfolios</p>
          <div className="demo-note">
            <p>📊 Demo Data: 4 portfolios with 5 completed reviews from professional reviewers</p>
          </div>
        </div>

        {userPortfolios.length === 0 ? (
          <div className="no-portfolios">
            <h3>No portfolios found</h3>
            <p>Create portfolios to receive reviews and feedback</p>
          </div>
        ) : (
          <div className="portfolios-with-reviews">
            {userPortfolios.map(portfolio => {
              const reviews = getPortfolioReviews(portfolio.title)
              return (
                <div key={portfolio.id} className="portfolio-review-section">
                  <div className="portfolio-info">
                    <h2>{portfolio.title}</h2>
                    <p className="portfolio-summary">{portfolio.content.substring(0, 100)}...</p>
                    <span className="review-count">{reviews.length} Review(s)</span>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="no-reviews">
                      <p>No reviews yet for this portfolio</p>
                    </div>
                  ) : (
                    <div className="reviews-grid">
                      {reviews.map(review => {
                        const reviewer = getReviewerProfile(review.reviewerEmail)
                        return (
                          <div key={review.id} className="review-card">
                            <div className="review-header">
                              <div className="reviewer-info">
                                <div className="reviewer-avatar">
                                  {review.reviewerName.charAt(0).toUpperCase()}
                                </div>
                                <div className="reviewer-details">
                                  <h4>{review.reviewerName}</h4>
                                  <p>{reviewer?.qualifications || "Professional Reviewer"}</p>
                                </div>
                              </div>
                              <span className="review-date">
                                {new Date(review.reviewDate || review.requestDate).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="review-content">
                              <div className="review-score">
                                <span>Score: {review.score || "N/A"}/10</span>
                              </div>
                              <p className="review-feedback">
                                {review.feedback || "Review completed - detailed feedback provided"}
                              </p>
                            </div>

                            <div className="review-actions">
                              <button 
                                onClick={() => setSelectedReview({review, reviewer})}
                                className="view-reviewer-btn"
                              >
                                View Reviewer Profile
                              </button>
                              <button 
                                onClick={() => handleCreatePost(review, portfolio)}
                                className="create-post-btn"
                              >
                                📱 Post
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {selectedReview && (
          <div className="reviewer-profile-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Reviewer Profile</h3>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              
              <div className="reviewer-profile-content">
                <div className="reviewer-avatar-large">
                  {selectedReview.review.reviewerName.charAt(0).toUpperCase()}
                </div>
                
                <div className="reviewer-profile-info">
                  <h2>{selectedReview.review.reviewerName}</h2>
                  <p className="reviewer-email">{selectedReview.review.reviewerEmail}</p>
                  
                  {selectedReview.reviewer && (
                    <div className="reviewer-credentials">
                      <div className="credential-item">
                        <strong>Qualifications:</strong>
                        <span>{selectedReview.reviewer.qualifications}</span>
                      </div>
                      <div className="credential-item">
                        <strong>Workplace:</strong>
                        <span>{selectedReview.reviewer.workplace}</span>
                      </div>
                      <div className="credential-item">
                        <strong>Skills:</strong>
                        <span>{selectedReview.reviewer.skills}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewFeedback