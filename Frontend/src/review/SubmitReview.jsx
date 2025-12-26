import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import ReviewerNavbar from "../components/ReviewerNavbar"
import { useNotificationContext } from "../context/NotificationContext"
import "../styles/auth.css"

function SubmitReview() {
  const { user } = useContext(AuthContext)
  const { reviewRequests, submitReview } = useContext(PortfolioContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { success, error } = useNotificationContext()
  
  const requestId = parseInt(searchParams.get('requestId'))
  const request = reviewRequests.find(req => req.id === requestId)

  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!request || request.reviewerEmail !== user?.email) {
      navigate('/review-requests')
    }
  }, [request, user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (score < 1 || score > 10) {
      alert("Please enter a score between 1 and 10")
      return
    }
    
    if (!feedback.trim()) {
      alert("Please provide feedback")
      return
    }

    setIsSubmitting(true)

    const reviewData = {
      reviewer: {
        name: user.name,
        email: user.email,
        qualifications: user.qualifications,
        workplace: user.workplace,
      },
      score: parseFloat(score),
      feedback: feedback.trim(),
      createdAt: new Date().toISOString(),
    }

    submitReview(requestId, reviewData)
    success(`Review submitted successfully for "${request.portfolioTitle}"! The portfolio owner will be notified.`)
    navigate('/review-requests')
  }

  if (!request) {
    return (
      <div className="dashboard-with-navbar">
        <ReviewerNavbar />
        <div className="auth-container">
          <div className="auth-card">
            <h2>Request not found</h2>
            <p>The review request could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "800px" }}>
          <h2 className="auth-title">Submit Review</h2>
          
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "1rem", 
            borderRadius: "8px", 
            marginBottom: "2rem" 
          }}>
            <h3>Portfolio Details</h3>
            <p><strong>Title:</strong> {request.portfolioTitle}</p>
            <p><strong>Owner:</strong> {request.ownerName} ({request.ownerEmail})</p>
            <div style={{ marginTop: "1rem" }}>
              <h4>Portfolio Content:</h4>
              <div style={{ 
                backgroundColor: "white", 
                padding: "1rem", 
                borderRadius: "4px", 
                border: "1px solid #ddd" 
              }}>
                {request.portfolioContent}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Score (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Detailed Feedback
              </label>
              <textarea
                placeholder="Provide detailed feedback on the portfolio, including strengths, areas for improvement, and specific suggestions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="auth-input"
                rows="8"
                required
              />
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitReview
