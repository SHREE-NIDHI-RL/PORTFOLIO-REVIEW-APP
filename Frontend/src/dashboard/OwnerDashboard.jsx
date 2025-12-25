import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import OwnerNavbar from "../components/OwnerNavbar"
import UserProfile from "../components/UserProfile"
import "../styles/OwnerDashboard.css"
import "../styles/ReviewWorkflow.css"

function OwnerDashboard() {
  const { user } = useContext(AuthContext)
  const { portfolios, reviewRequests, addPost, posts } = useContext(PortfolioContext)
  const [selectedReview, setSelectedReview] = useState(null)
  
  const userPortfolios = portfolios.filter(p => p.owner === user?.email)
  const completedReviews = reviewRequests.filter(req => 
    req.ownerEmail === user?.email && req.status === "completed"
  )
  const recentPosts = posts.slice(0, 3)

  const handlePostReview = (review) => {
    const postData = {
      authorName: user.name,
      authorEmail: user.email,
      portfolioTitle: review.portfolioTitle,
      portfolioContent: review.portfolioContent,
      reviewerName: review.reviewerName,
      reviewScore: review.score,
      reviewFeedback: review.feedback
    }
    addPost(postData)
    alert("Review posted successfully!")
    setSelectedReview(null)
  }

  const portfolios_display = userPortfolios.map((portfolio, index) => ({
    id: portfolio.id,
    title: portfolio.title,
    version: portfolio.versions?.length || 1,
    status: "Draft",
    lastUpdated: new Date(portfolio.createdAt).toLocaleDateString(),
    template: "Custom",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='100' viewBox='0 0 180 100'%3E%3Crect width='180' height='100' fill='%23e5e7eb'/%3E%3Ctext x='90' y='55' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3EPortfolio%3C/text%3E%3C/svg%3E"
  }))


  return (
    <>
      <OwnerNavbar />
      <UserProfile />
      <div className="dashboard-with-navbar">
        <div className="owner-dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Portfolio Review Dashboard</h1>
            <button className="create-new-btn">
              <span className="btn-icon">+</span>
              Create New Portfolio
              <span className="dropdown-arrow">⌄</span>
            </button>
          </div>

          <div className="dashboard-content">
            <section className="portfolios-section">
              <h2 className="section-title">Saved Portfolios</h2>
              <div className="portfolios-grid">
                {portfolios_display.map(portfolio => (
                  <div key={portfolio.id} className="portfolio-item">
                    <div className="portfolio-content">
                      <div className="portfolio-info">
                        <h3 className="portfolio-title">{portfolio.title}</h3>
                        <p className="portfolio-meta">
                          Version {portfolio.version} - {portfolio.status} {portfolio.lastUpdated}
                        </p>
                        <div className="portfolio-tags">
                          <span className="template-tag">Template: {portfolio.template}</span>
                          <span className={`status-tag status-${portfolio.status.toLowerCase()}`}>
                            Status: {portfolio.status}
                          </span>
                        </div>
                        <div className="portfolio-actions">
                          {portfolio.status === "Reviewed" && (
                            <>
                              <button className="action-btn primary">View Feedback</button>
                              <button className="action-btn secondary">Create New Version</button>
                              <button className="action-btn more">More ⌄</button>
                            </>
                          )}
                          {portfolio.status === "Submitted" && (
                            <>
                              <button className="action-btn primary">View Submission</button>
                              <button className="action-btn secondary">Cancel Request</button>
                            </>
                          )}
                          {portfolio.status === "Draft" && (
                            <>
                              <button className="action-btn primary">Edit Portfolio</button>
                              <button className="action-btn more">Delete ⌄</button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="portfolio-image">
                        <img src={portfolio.image} alt={portfolio.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="reviews-section">
              <h2 className="section-title">Completed Reviews</h2>
              {completedReviews.length > 0 ? (
                <div className="reviews-list">
                  {completedReviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="reviewer-avatar">
                        {review.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className="review-content">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">Reviewed by {review.reviewerName}</span>
                            <span className="reviewer-title">Score: {review.score}/10</span>
                          </div>
                          <span className="review-date">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="review-body">
                          <h4>Portfolio: {review.portfolioTitle}</h4>
                          <div className="review-text">
                            <p className="review-comment">"{review.feedback.substring(0, 100)}..."</p>
                            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                              <button 
                                onClick={() => setSelectedReview(review)}
                                className="auth-button"
                                style={{ 
                                  background: "#6c757d", 
                                  padding: "0.5rem 1rem", 
                                  fontSize: "0.9rem" 
                                }}
                              >
                                View Feedback
                              </button>
                              <button 
                                onClick={() => handlePostReview(review)}
                                className="auth-button"
                                style={{ 
                                  background: "#007bff", 
                                  padding: "0.5rem 1rem", 
                                  fontSize: "0.9rem" 
                                }}
                              >
                                Post Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No completed reviews yet.</p>
                  <Link to="/find-reviewer" className="auth-link">Find a reviewer</Link>
                </div>
              )}
            </section>
            
            {selectedReview && (
              <div className="feedback-modal">
                <div className="feedback-card">
                  <div className="review-card-header">
                    <h2 className="review-card-title">Review Feedback</h2>
                    <button 
                      className="close-btn"
                      onClick={() => setSelectedReview(null)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="reviewer-profile">
                    <div className="reviewer-profile-avatar">
                      {selectedReview.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="reviewer-profile-info">
                      <h3>{selectedReview.reviewerName}</h3>
                      <p>Senior UX Designer • <span className="google-verified">✓ Google</span></p>
                      <p>Credibility: <strong>4.8</strong></p>
                    </div>
                  </div>
                  
                  <div className="score-section">
                    <div className="score-item">
                      <span className="score-label">Visual Design:</span>
                      <span className="score-value">{Math.floor(selectedReview.score * 0.9)}</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Usability:</span>
                      <span className="score-value">{Math.floor(selectedReview.score * 0.8)}</span>
                    </div>
                    <div className="score-item">
                      <span className="score-label">Content:</span>
                      <span className="score-value">{Math.floor(selectedReview.score * 0.7)}</span>
                    </div>
                  </div>
                  
                  <ul className="feedback-list">
                    <li>Great visual consistency and attention to detail.</li>
                    <li>Usability is strong, but consider simplifying the navigation.</li>
                    <li>Content is good, but could be more concise.</li>
                  </ul>
                  
                  <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
                    <h4>Full Feedback:</h4>
                    <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      {selectedReview.feedback}
                    </p>
                  </div>
                  
                  <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                    <button 
                      onClick={() => handlePostReview(selectedReview)}
                      className="send-request-btn"
                    >
                      Post Review
                    </button>
                    <button 
                      onClick={() => setSelectedReview(null)}
                      className="decline-btn"
                      style={{ flex: "none", padding: "0.75rem 1.5rem" }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            <section className="posts-section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2 className="section-title">Recent Community Posts</h2>
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
                          <strong>{post.authorName}</strong>
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
                      <h4 style={{ margin: "0.5rem 0" }}>{post.portfolioTitle}</h4>
                      <p style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>
                        Reviewed by <strong>{post.reviewerName}</strong>
                      </p>
                      <p style={{ margin: "0", fontSize: "0.85rem", color: "#666" }}>
                        "{post.reviewFeedback.substring(0, 100)}..."
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p>No posts yet. Post your reviews to share with the community!</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default OwnerDashboard