import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import ReviewerNavbar from "../components/ReviewerNavbar"
import UserProfile from "../components/UserProfile"
import "../styles/ReviewerDashboard.css"

function ReviewerDashboard() {
  const { user } = useContext(AuthContext)
  const { reviewRequests, updateRequestStatus, posts, portfolios, addReviewRequest } = useContext(PortfolioContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  
  const pendingRequests = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "pending"
  )
  const acceptedRequests = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "accepted"
  )
  const completedReviews = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "completed"
  )
  const openPortfolios = portfolios.filter(p => p.openForReview && !p.private)
  const recentPosts = posts.slice(0, 3)

  const handleAcceptRequest = (requestId) => {
    updateRequestStatus(requestId, "accepted")
    alert("Request accepted! You can now review the portfolio.")
  }

  const handleRejectRequest = (requestId) => {
    updateRequestStatus(requestId, "rejected")
    alert("Request rejected.")
  }

  const handleViewPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio)
  }

  return (
    <>
      <ReviewerNavbar />
      <UserProfile />
      <div className="dashboard-with-navbar">
        <div className="reviewer-dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Reviewer Dashboard</h1>
          </div>

          <div className="dashboard-content">
            {/* Review Requests Inbox */}
            <section className="requests-section">
              <h2 className="section-title">Review Requests Inbox</h2>
              {pendingRequests.length > 0 ? (
                <div className="requests-grid">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="request-item">
                      <div className="request-content">
                        <div className="request-info">
                          <h3 className="request-title">{request.portfolioTitle}</h3>
                          <p className="request-meta">
                            Owner: {request.ownerName} • Version 1.0 • Pending
                          </p>
                          <div className="request-tags">
                            <span className="domain-tag">
                              {request.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                               request.portfolioTitle.includes('Web') ? 'Web Development' :
                               request.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}
                            </span>
                            <span className="status-tag status-pending">
                              Status: Pending
                            </span>
                          </div>
                          <div className="request-actions">
                            <button 
                              onClick={() => handleAcceptRequest(request.id)}
                              className="action-btn primary"
                            >
                              Accept Request
                            </button>
                            <button 
                              onClick={() => handleRejectRequest(request.id)}
                              className="action-btn secondary"
                            >
                              Reject Request
                            </button>
                          </div>
                        </div>
                        <div className="request-preview">
                          <div className="portfolio-preview">
                            {(request.portfolioContent || '').substring(0, 150)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No pending review requests.</p>
                </div>
              )}
            </section>

            {/* Assigned/Accepted Reviews */}
            <section className="assigned-section">
              <h2 className="section-title">Assigned Reviews</h2>
              {acceptedRequests.length > 0 ? (
                <div className="assigned-grid">
                  {acceptedRequests.map((request) => (
                    <div key={request.id} className="assigned-item">
                      <div className="assigned-content">
                        <div className="assigned-info">
                          <h3 className="assigned-title">{request.portfolioTitle}</h3>
                          <p className="assigned-meta">
                            Owner: {request.ownerName} • Version 1.0 • Accepted
                          </p>
                          <div className="assigned-tags">
                            <span className="domain-tag">
                              {request.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                               request.portfolioTitle.includes('Web') ? 'Web Development' :
                               request.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}
                            </span>
                            <span className="status-tag status-accepted">
                              Status: Accepted
                            </span>
                          </div>
                          <div className="assigned-actions">
                            <button 
                              onClick={() => handleViewPortfolio(request)}
                              className="action-btn primary"
                            >
                              View Portfolio
                            </button>
                            <Link 
                              to={`/submit-review?requestId=${request.id}`}
                              className="action-btn secondary"
                              style={{ textDecoration: 'none', textAlign: 'center' }}
                            >
                              Submit Review
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No assigned reviews.</p>
                </div>
              )}
            </section>

            {/* Review History */}
            <section className="history-section">
              <h2 className="section-title">Review History</h2>
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
                            <span className="history-meta">Score: {review.score}/10 • Version 1.0</span>
                          </div>
                          <span className="history-date">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="history-body">
                          <p className="history-feedback">
                            "{(review.feedback || '').substring(0, 100)}..."
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No completed reviews yet.</p>
                </div>
              )}
            </section>

            {/* Portfolio Exploration */}
            <section className="exploration-section">
              <h2 className="section-title">Portfolio Exploration</h2>
              {openPortfolios.length > 0 ? (
                <div className="exploration-grid">
                  {openPortfolios.slice(0, 6).map((portfolio) => (
                    <div key={portfolio.id} className="exploration-item">
                      <div className="exploration-content">
                        <div className="exploration-info">
                          <h3 className="exploration-title">{portfolio.title}</h3>
                          <p className="exploration-meta">
                            Owner: {portfolio.ownerName} • Open for Review
                          </p>
                          <div className="exploration-tags">
                            <span className="domain-tag">
                              {portfolio.domain || 'General'}
                            </span>
                            <span className="level-tag">
                              {portfolio.experienceLevel || 'Intermediate'}
                            </span>
                          </div>
                          <div className="exploration-actions">
                            <button 
                              onClick={() => handleViewPortfolio(portfolio)}
                              className="action-btn primary"
                            >
                              View Portfolio
                            </button>
                            <button 
                              onClick={() => {
                                const reviewRequest = {
                                  portfolioId: portfolio.id,
                                  portfolioTitle: portfolio.title,
                                  portfolioContent: portfolio.content,
                                  ownerName: portfolio.ownerName,
                                  ownerEmail: portfolio.owner,
                                  reviewerName: user.name,
                                  reviewerEmail: user.email,
                                  requestDate: new Date().toISOString(),
                                  status: "pending"
                                }
                                addReviewRequest(reviewRequest)
                                alert("Review request sent!")
                              }}
                              className="action-btn secondary"
                            >
                              Request to Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No portfolios open for review.</p>
                </div>
              )}
            </section>

            {/* Portfolio View Modal */}
            {selectedPortfolio && (
              <div className="portfolio-modal">
                <div className="portfolio-modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title">{selectedPortfolio.portfolioTitle || selectedPortfolio.title}</h2>
                    <button 
                      className="close-btn"
                      onClick={() => setSelectedPortfolio(null)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-body">
                    <div className="portfolio-details">
                      <p><strong>Owner:</strong> {selectedPortfolio.ownerName || selectedPortfolio.owner}</p>
                      <p><strong>Version:</strong> 1.0</p>
                      <p><strong>Domain:</strong> {selectedPortfolio.domain || 'General'}</p>
                    </div>
                    
                    <div className="portfolio-content-view">
                      <h4>Portfolio Content:</h4>
                      <div className="content-preview">
                        {selectedPortfolio.portfolioContent || selectedPortfolio.content || 'Portfolio content will be displayed here in read-only mode.'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button 
                      onClick={() => setSelectedPortfolio(null)}
                      className="action-btn secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Community Posts */}
            <section className="posts-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title">Community Posts</h2>
                <Link to="/posts" className="auth-link">View All Posts</Link>
              </div>
              {recentPosts.length > 0 ? (
                <div className="posts-preview">
                  {recentPosts.map(post => (
                    <div key={post.id} style={{ 
                      border: "1px solid #ddd", 
                      padding: "1rem", 
                      margin: "0.5rem 0", 
                      borderRadius: "8px",
                      backgroundColor: "#f8f9fa"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <div>
                          <strong>Owner: {post.authorName}</strong>
                          <span style={{ marginLeft: "1rem", color: "#666" }}>
                            {new Date(post.postDate).toLocaleDateString()}
                          </span>
                        </div>
                        <span style={{ 
                          backgroundColor: "#007bff", 
                          color: "white", 
                          padding: "0.2rem 0.5rem", 
                          borderRadius: "4px", 
                          fontSize: "0.8rem" 
                        }}>
                          {post.reviewScore}/10
                        </span>
                      </div>
                      <h4 style={{ margin: "0.5rem 0" }}>Portfolio: {post.portfolioTitle}</h4>
                      <p style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>
                        Reviewed by <Link 
                          to={`/reviewer-profile/${post.reviewerEmail}`} 
                          style={{ 
                            color: "#007bff", 
                            textDecoration: "none", 
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                          onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                          onMouseOut={(e) => e.target.style.textDecoration = "none"}
                        >
                          {post.reviewerName}
                        </Link>
                      </p>
                      <p style={{ margin: "0", fontSize: "0.85rem", color: "#666" }}>
                        "{post.reviewFeedback.substring(0, 100)}..."
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No posts yet. Complete reviews to see community posts!</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewerDashboard