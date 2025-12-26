import { useContext } from "react"
import { useParams } from "react-router-dom"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewerDashboard.css"

function ReviewerProfileView() {
  const { reviewerEmail } = useParams()
  const { reviewers, reviewRequests } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  
  const reviewer = reviewers.find(r => r.email === reviewerEmail)
  const reviewerReviews = reviewRequests.filter(req => 
    req.reviewerEmail === reviewerEmail && req.status === "completed"
  )

  const averageScore = reviewerReviews.length > 0 
    ? (reviewerReviews.reduce((sum, review) => sum + review.score, 0) / reviewerReviews.length).toFixed(1)
    : 0

  if (!reviewer) {
    return (
      <div className="dashboard-with-navbar">
        {user?.role === "owner" ? <OwnerNavbar /> : <ReviewerNavbar />}
        <div className="reviewer-dashboard">
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Reviewer not found</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-with-navbar">
      {user?.role === "owner" ? <OwnerNavbar /> : <ReviewerNavbar />}
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Reviewer Profile</h1>
        </div>

        <div className="dashboard-content">
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{reviewerReviews.length}</div>
                <div className="stat-label">Total Reviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{averageScore}</div>
                <div className="stat-label">Average Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{reviewer.credibilityScore}</div>
                <div className="stat-label">Credibility</div>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-card" style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <div className="profile-header" style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                <div className="reviewer-avatar" style={{ width: "80px", height: "80px", fontSize: "2rem" }}>
                  {reviewer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={{ margin: "0 0 0.5rem 0", color: "#374151" }}>{reviewer.name}</h2>
                  <p style={{ margin: "0 0 0.5rem 0", color: "#6b7280" }}>{reviewer.workplace}</p>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.9rem" }}>
                    <span>⭐ {reviewer.credibilityScore}/5</span>
                    <span>📊 {averageScore} avg</span>
                    <span>📝 {reviewerReviews.length} reviews</span>
                  </div>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-section" style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "#374151" }}>Qualifications</h3>
                  <p style={{ margin: 0, color: "#6b7280", lineHeight: "1.5" }}>{reviewer.qualifications}</p>
                </div>
                
                <div className="detail-section" style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "#374151" }}>Skills & Expertise</h3>
                  <p style={{ margin: 0, color: "#6b7280", lineHeight: "1.5" }}>{reviewer.skills}</p>
                </div>

                <div className="detail-section">
                  <h3 style={{ margin: "0 0 1rem 0", color: "#374151" }}>Recent Reviews</h3>
                  {reviewerReviews.slice(0, 3).map(review => (
                    <div key={review.id} className="history-item" style={{ marginBottom: "1rem" }}>
                      <div className="reviewer-avatar" style={{ width: "32px", height: "32px", fontSize: "0.8rem" }}>
                        {review.portfolioTitle.charAt(0).toUpperCase()}
                      </div>
                      <div className="history-content">
                        <div className="history-header">
                          <div className="history-info">
                            <span className="history-title">{review.portfolioTitle}</span>
                            <span className="history-meta">Score: {review.score}/10</span>
                          </div>
                          <span className="history-date">
                            {new Date(review.reviewDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="history-feedback">
                          "{(review.feedback || '').substring(0, 100)}..."
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ReviewerProfileView