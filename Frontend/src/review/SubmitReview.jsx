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
  const [strengths, setStrengths] = useState("")
  const [weaknesses, setWeaknesses] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [generalFeedback, setGeneralFeedback] = useState("")
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
    
    if (!strengths.trim() || !weaknesses.trim() || !suggestions.trim()) {
      alert("Please fill in all structured feedback sections (Strengths, Weaknesses, Suggestions)")
      return
    }

    setIsSubmitting(true)

    // Combine structured feedback into a comprehensive review
    const structuredFeedback = {
      strengths: strengths.trim(),
      weaknesses: weaknesses.trim(),
      suggestions: suggestions.trim(),
      generalFeedback: generalFeedback.trim()
    }

    const combinedFeedback = `STRENGTHS:\n${strengths.trim()}\n\nWEAKNESSES:\n${weaknesses.trim()}\n\nSUGGESTIONS FOR IMPROVEMENT:\n${suggestions.trim()}${generalFeedback.trim() ? `\n\nADDITIONAL COMMENTS:\n${generalFeedback.trim()}` : ''}`

    const reviewData = {
      reviewer: {
        name: user.name,
        email: user.email,
        qualifications: user.qualifications,
        workplace: user.workplace,
      },
      score: parseFloat(score),
      feedback: combinedFeedback,
      structuredFeedback: structuredFeedback,
      createdAt: new Date().toISOString(),
    }

    submitReview(requestId, reviewData)
    success(`Review submitted successfully for "${request.portfolioTitle}"! The portfolio owner will be notified.`)
    navigate('/assigned-reviews')
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
        <div className="auth-card" style={{ maxWidth: "900px" }}>
          <h2 className="auth-title">Submit Structured Review</h2>
          
          <div style={{ 
            backgroundColor: "#f8f9fa", 
            padding: "1.5rem", 
            borderRadius: "8px", 
            marginBottom: "2rem" 
          }}>
            <h3>Portfolio Details</h3>
            <p><strong>Title:</strong> {request.portfolioTitle}</p>
            <p><strong>Owner:</strong> {request.ownerName} ({request.ownerEmail})</p>
            <p><strong>Domain:</strong> {request.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                                         request.portfolioTitle.includes('Web') ? 'Web Development' :
                                         request.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}</p>
            <div style={{ marginTop: "1rem" }}>
              <h4>Portfolio Content:</h4>
              <div style={{ 
                backgroundColor: "white", 
                padding: "1rem", 
                borderRadius: "4px", 
                border: "1px solid #ddd",
                maxHeight: "200px",
                overflowY: "auto"
              }}>
                {request.portfolioContent}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#2563eb" }}>
                Overall Score (0-10)
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="auth-input"
                placeholder="e.g., 8.5"
                required
              />
              <small style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                Rate the overall quality of this portfolio (0 = Poor, 10 = Excellent)
              </small>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#059669" }}>
                Strengths
              </label>
              <textarea
                placeholder="What are the strong points of this portfolio? What did the owner do well? Be specific about design elements, technical skills, presentation, etc."
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                className="auth-input"
                rows="4"
                required
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#dc2626" }}>
                Weaknesses / Areas for Improvement
              </label>
              <textarea
                placeholder="What aspects of the portfolio could be improved? What are the main weaknesses or missing elements? Be constructive and specific."
                value={weaknesses}
                onChange={(e) => setWeaknesses(e.target.value)}
                className="auth-input"
                rows="4"
                required
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#7c3aed" }}>
                Suggestions for Improvement
              </label>
              <textarea
                placeholder="Provide specific, actionable suggestions on how the owner can improve their portfolio. Include resources, techniques, or changes they should consider."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="auth-input"
                rows="4"
                required
              />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold", color: "#6b7280" }}>
                Additional Comments (Optional)
              </label>
              <textarea
                placeholder="Any additional feedback, encouragement, or industry insights you'd like to share..."
                value={generalFeedback}
                onChange={(e) => setGeneralFeedback(e.target.value)}
                className="auth-input"
                rows="3"
              />
            </div>

            <div style={{ 
              backgroundColor: "#fef3c7", 
              padding: "1rem", 
              borderRadius: "6px", 
              marginBottom: "1.5rem",
              border: "1px solid #f59e0b"
            }}>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#92400e" }}>
                <strong>Note:</strong> Once submitted, this review will be locked and cannot be edited. 
                The review will be linked to this specific portfolio version.
              </p>
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
              style={{ width: "100%", padding: "0.75rem" }}
            >
              {isSubmitting ? "Submitting Review..." : "Submit Structured Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitReview
