import { useContext, useState } from "react"
import { ReviewerContext } from "../context/ReviewerContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import { useNotificationContext } from "../context/NotificationContext"
import "../styles/FindReviewer.css"

function FindReviewer() {
  const { reviewers } = useContext(ReviewerContext)
  const { portfolios, sendReviewRequest, reviewRequests } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  const [expandedReviewer, setExpandedReviewer] = useState(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedReviewer, setSelectedReviewer] = useState(null)
  const [selectedPortfolio, setSelectedPortfolio] = useState("")
  const [searchDomain, setSearchDomain] = useState("")
  const { success, warning } = useNotificationContext()

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  const getReviewCount = (reviewerEmail) => {
    return reviewRequests.filter(req => 
      req.reviewerEmail === reviewerEmail && req.status === "completed"
    ).length
  }

  const filteredReviewers = reviewers.filter(reviewer => 
    !searchDomain || reviewer.skills.toLowerCase().includes(searchDomain.toLowerCase())
  )

  const handleRequestReview = () => {
    if (!selectedPortfolio) {
      warning("Please select a portfolio")
      return
    }
    
    const portfolio = userPortfolios.find(p => p.title === selectedPortfolio)
    const success_result = sendReviewRequest(portfolio.id, selectedReviewer.email)
    
    if (success_result) {
      success(`Review request sent to ${selectedReviewer.name} for "${portfolio.title}"!`)
    } else {
      warning("Failed to send review request")
    }
    
    setShowRequestModal(false)
    setSelectedReviewer(null)
    setSelectedPortfolio("")
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="find-reviewer-page">
        <div className="page-header">
          <h1>Find Reviewers</h1>
          <p>Connect with professional reviewers to get feedback on your portfolio</p>
          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Search by domain or skills..."
              value={searchDomain}
              onChange={(e) => setSearchDomain(e.target.value)}
              style={{ padding: "0.5rem", width: "300px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
        </div>
        
        <div className="reviewers-grid">
          {filteredReviewers.map((reviewer) => {
            const isExpanded = expandedReviewer === reviewer.id
            const reviewCount = getReviewCount(reviewer.email)
            
            return (
              <div key={reviewer.id} className={`reviewer-card ${isExpanded ? 'expanded' : ''}`}>
                <div 
                  className="reviewer-summary" 
                  onClick={() => setExpandedReviewer(isExpanded ? null : reviewer.id)}
                >
                  <div className="reviewer-avatar">
                    {reviewer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-basic-info">
                    <h3>{reviewer.name}</h3>
                    <p className="reviewer-specialty">{reviewer.skills || "Professional Reviewer"}</p>
                    <div className="reviewer-stats">
                      <span className="review-count">{reviewCount} Reviews</span>
                      <span className="rating">⭐ {reviewer.credibilityScore || 4.5}/5</span>
                    </div>
                  </div>
                  <div className="expand-icon">
                    {isExpanded ? "▼" : "▶"}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="reviewer-details">
                    <div className="detail-section">
                      <h4>Qualifications</h4>
                      <p>{reviewer.qualifications}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Workplace</h4>
                      <p>{reviewer.workplace}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Review Statistics</h4>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">{reviewCount}</span>
                          <span className="stat-label">Reviews</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">{reviewer.credibilityScore}</span>
                          <span className="stat-label">Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="request-review-btn"
                      onClick={() => {
                        setSelectedReviewer(reviewer)
                        setShowRequestModal(true)
                      }}
                    >
                      Request Review
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {showRequestModal && (
          <div className="modal-overlay">
            <div className="request-modal">
              <div className="modal-header">
                <h3>Request Review from {selectedReviewer?.name}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowRequestModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="form-group">
                  <label>Select Portfolio</label>
                  <select 
                    value={selectedPortfolio}
                    onChange={(e) => setSelectedPortfolio(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Choose portfolio...</option>
                    {userPortfolios.map((portfolio) => (
                      <option key={portfolio.id} value={portfolio.title}>
                        {portfolio.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowRequestModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={handleRequestReview}
                    disabled={!selectedPortfolio}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindReviewer