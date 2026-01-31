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
  
  const requestId = searchParams.get('requestId')
  const request = reviewRequests.find(req => req._id === requestId)

  const [score, setScore] = useState(0)
  const [strengths, setStrengths] = useState("")
  const [weaknesses, setWeaknesses] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [generalFeedback, setGeneralFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    if (!request) {
      navigate('/dashboard')
      return
    }
    if (request.reviewerEmail !== user.email) {
      navigate('/dashboard')
      return
    }
  }, [request, user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (score < 1 || score > 10) {
      error && error("Please enter a score between 1 and 10")
      return
    }
    
    if (!strengths.trim() || !weaknesses.trim() || !suggestions.trim()) {
      error && error("Please fill in all structured feedback sections (Strengths, Weaknesses, Suggestions)")
      return
    }

    setIsSubmitting(true)

    try {
      const structuredFeedback = {
        strengths: strengths.trim(),
        weaknesses: weaknesses.trim(),
        suggestions: suggestions.trim(),
        generalFeedback: generalFeedback.trim()
      }

      const combinedFeedback = `STRENGTHS:\n${strengths.trim()}\n\nWEAKNESSES:\n${weaknesses.trim()}\n\nSUGGESTIONS FOR IMPROVEMENT:\n${suggestions.trim()}${generalFeedback.trim() ? `\n\nADDITIONAL COMMENTS:\n${generalFeedback.trim()}` : ''}`

      const reviewData = {
        score: parseFloat(score),
        feedback: combinedFeedback,
        structuredFeedback: structuredFeedback
      }

      await submitReview(requestId, reviewData)
      
      if (success) {
        success(`Review submitted successfully for "${request.portfolioTitle}"! The portfolio owner will be notified.`)
      }
      
      // Navigate back to dashboard
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
      
    } catch (err) {
      console.error('Submit review error:', err)
      if (error) {
        error('Failed to submit review. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
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
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Submit Portfolio Review</h1>
          <p className="dashboard-subtitle">Provide detailed feedback to help improve this portfolio</p>
        </div>

        <div className="dashboard-content">
          <div className="review-form-container">
            {/* Portfolio Details Card */}
            <div className="portfolio-details-card">
              <h3 className="card-title">Portfolio Information</h3>
              <div className="portfolio-info-grid">
                <div className="info-item">
                  <span className="info-label">Title:</span>
                  <span className="info-value">{request.portfolioTitle}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Owner:</span>
                  <span className="info-value">{request.ownerName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{request.ownerEmail}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Domain:</span>
                  <span className="info-value">{request.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                                         request.portfolioTitle.includes('Web') ? 'Web Development' :
                                         request.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}</span>
                </div>
              </div>
              
              <div className="portfolio-content-section">
                <h4 className="content-title">Portfolio Content</h4>
                <div className="content-preview">
                  {request.portfolioContent}
                </div>
              </div>
            </div>

            {/* Review Form Card */}
            <div className="review-form-card">
              <h3 className="card-title">Your Review</h3>
              
              <form onSubmit={handleSubmit} className="review-form">
                {/* Score Section */}
                <div className="form-section score-section">
                  <label className="form-label score-label">
                    <span className="label-icon">⭐</span>
                    Overall Score (0-10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="score-input"
                    placeholder="e.g., 8.5"
                    required
                  />
                  <small className="form-hint">
                    Rate the overall quality (0 = Poor, 10 = Excellent)
                  </small>
                </div>

                {/* Strengths Section */}
                <div className="form-section strengths-section">
                  <label className="form-label strengths-label">
                    <span className="label-icon">✅</span>
                    Strengths
                  </label>
                  <textarea
                    placeholder="What are the strong points of this portfolio? What did the owner do well? Be specific about design elements, technical skills, presentation, etc."
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>

                {/* Weaknesses Section */}
                <div className="form-section weaknesses-section">
                  <label className="form-label weaknesses-label">
                    <span className="label-icon">⚠️</span>
                    Areas for Improvement
                  </label>
                  <textarea
                    placeholder="What aspects could be improved? What are the main weaknesses or missing elements? Be constructive and specific."
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>

                {/* Suggestions Section */}
                <div className="form-section suggestions-section">
                  <label className="form-label suggestions-label">
                    <span className="label-icon">💡</span>
                    Suggestions for Improvement
                  </label>
                  <textarea
                    placeholder="Provide specific, actionable suggestions on how the owner can improve their portfolio. Include resources, techniques, or changes they should consider."
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    required
                  />
                </div>

                {/* Additional Comments Section */}
                <div className="form-section comments-section">
                  <label className="form-label comments-label">
                    <span className="label-icon">💬</span>
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    placeholder="Any additional feedback, encouragement, or industry insights you'd like to share..."
                    value={generalFeedback}
                    onChange={(e) => setGeneralFeedback(e.target.value)}
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                {/* Warning Note */}
                <div className="warning-note">
                  <span className="warning-icon">⚠️</span>
                  <p>
                    <strong>Note:</strong> Once submitted, this review will be locked and cannot be edited. 
                    The review will be linked to this specific portfolio version.
                  </p>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="submit-review-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Review..." : "Submit Structured Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitReview
