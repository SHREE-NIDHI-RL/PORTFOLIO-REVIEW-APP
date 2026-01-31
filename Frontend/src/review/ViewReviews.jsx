import { useContext, useEffect, useState } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import UserProfile from "../components/UserProfile"
import "../styles/auth.css"

function ViewReviews() {
  const { loadCompletedReviews, addPost } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [completedReviews, setCompletedReviews] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === 'owner') {
        const reviews = await loadCompletedReviews()
        setCompletedReviews(reviews)
        setLoading(false)
      }
    }
    fetchData()
  }, [user, loadCompletedReviews])

  const handlePostReview = async (review) => {
    try {
      await addPost(review._id)
      alert("Review posted successfully!")
      // Reload completed reviews to update posted status
      const updated = await loadCompletedReviews()
      setCompletedReviews(updated)
    } catch (error) {
      alert(error.message || "Error posting review")
    }
  }

  const getScoreColor = (score) => {
    if (score >= 9) return "#28a745"
    if (score >= 7) return "#ffc107" 
    return "#dc3545"
  }

  const getScoreLabel = (score) => {
    if (score >= 9) return "Excellent"
    if (score >= 7) return "Good"
    return "Needs Improvement"
  }

  if (loading) {
    return (
      <div className="dashboard-with-navbar">
        <OwnerNavbar />
        <UserProfile />
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Loading Reviews...</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <UserProfile />
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">All Feedback & Reviews</h2>
          
          {completedReviews.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p>No completed reviews yet. Submit your portfolios for review to see feedback here!</p>
            </div>
          ) : (
            <div className="auth-form">
              <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
                  <h3>Overall Statistics</h3>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div>
                      <strong>Total Reviews:</strong> {completedReviews.length}
                    </div>
                    <div>
                      <strong>Average Score:</strong> {
                        (completedReviews.reduce((sum, r) => sum + r.score, 0) / completedReviews.length).toFixed(1)
                      }/10
                    </div>
                  </div>
                </div>
              </div>

              {completedReviews.map((review, index) => (
                <div key={review._id || index} style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ margin: 0 }}>{review.portfolioTitle}</h3>
                    <div style={{ background: getScoreColor(review.score), color: "white", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "bold" }}>
                      {review.score}/10 - {getScoreLabel(review.score)}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                    <p><strong>Review Date:</strong> {new Date(review.reviewDate || review.updatedAt).toLocaleDateString()}</p>
                  </div>

                  {/* Structured Feedback Display */}
                  {review.structuredFeedback && (
                    <div style={{ marginBottom: "1.5rem" }}>
                      {review.structuredFeedback.strengths && (
                        <div style={{ marginBottom: "1rem", padding: "1rem", background: "#e8f5e8", borderRadius: "8px" }}>
                          <h4 style={{ margin: "0 0 0.5rem 0", color: "#28a745" }}>Strengths:</h4>
                          <p style={{ margin: 0, lineHeight: "1.5" }}>{review.structuredFeedback.strengths}</p>
                        </div>
                      )}
                      
                      {review.structuredFeedback.weaknesses && (
                        <div style={{ marginBottom: "1rem", padding: "1rem", background: "#fff3cd", borderRadius: "8px" }}>
                          <h4 style={{ margin: "0 0 0.5rem 0", color: "#856404" }}>Areas for Improvement:</h4>
                          <p style={{ margin: 0, lineHeight: "1.5" }}>{review.structuredFeedback.weaknesses}</p>
                        </div>
                      )}
                      
                      {review.structuredFeedback.suggestions && (
                        <div style={{ marginBottom: "1rem", padding: "1rem", background: "#d1ecf1", borderRadius: "8px" }}>
                          <h4 style={{ margin: "0 0 0.5rem 0", color: "#0c5460" }}>Suggestions:</h4>
                          <p style={{ margin: 0, lineHeight: "1.5" }}>{review.structuredFeedback.suggestions}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "6px", borderLeft: "4px solid #0a66c2", marginBottom: "1rem" }}>
                    <h4 style={{ margin: "0 0 0.5rem 0" }}>Overall Feedback:</h4>
                    <p style={{ margin: 0, lineHeight: "1.5", whiteSpace: "pre-wrap" }}>{review.feedback}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ padding: "0.5rem", background: "#e8f5e8", borderRadius: "4px", fontSize: "12px", color: "#28a745" }}>
                      ✓ Review Completed
                    </div>
                    
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {!review.isPosted && (
                        <button 
                          onClick={() => handlePostReview(review)}
                          className="auth-button"
                          style={{ 
                            background: "#007bff", 
                            padding: "0.5rem 1rem", 
                            fontSize: "0.9rem" 
                          }}
                        >
                          Post to Community
                        </button>
                      )}
                      {review.isPosted && (
                        <span style={{ 
                          color: "#28a745", 
                          fontWeight: "bold",
                          padding: "0.5rem 1rem",
                          fontSize: "0.9rem",
                          background: "#e8f5e8",
                          borderRadius: "4px"
                        }}>
                          ✓ Posted to Community
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewReviews