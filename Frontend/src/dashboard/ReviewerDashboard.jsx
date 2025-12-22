import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import ReviewerNavbar from "../components/ReviewerNavbar"
import UserProfile from "../components/UserProfile"
import "../styles/ReviewerDashboard.css"

function ReviewerDashboard() {
  const { user } = useContext(AuthContext)
  const { reviewRequests, updateRequestStatus, posts } = useContext(PortfolioContext)
  
  const pendingRequests = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "pending"
  )
  const recentPosts = posts.slice(0, 3)

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