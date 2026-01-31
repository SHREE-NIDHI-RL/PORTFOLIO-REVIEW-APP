import { useContext, useState } from "react"
import { ReviewerContext } from "../context/ReviewerContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import { useNotificationContext } from "../context/NotificationContext"
import "../styles/FindReviewer.css"

function FindReviewer() {
  const { reviewers } = useContext(ReviewerContext) || { reviewers: [] }
  const { portfolios, sendReviewRequest, reviewRequests } = useContext(PortfolioContext) || { portfolios: [], reviewRequests: [] }
  const { user } = useContext(AuthContext) || {}
  const [expandedReviewer, setExpandedReviewer] = useState(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedReviewer, setSelectedReviewer] = useState(null)
  const [selectedPortfolio, setSelectedPortfolio] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { success, warning } = useNotificationContext() || { success: () => {}, warning: () => {} }

  if (!reviewers || !Array.isArray(reviewers)) {
    return (
      <div className="dashboard-with-navbar">
        <OwnerNavbar />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Loading reviewers...</h2>
        </div>
      </div>
    )
  }

  const userPortfolios = (portfolios || []).filter(p => {
    const userId = String(user?._id || user?.id)
    const ownerId = String(p.owner?._id || p.owner)
    return ownerId === userId
  })

  const getReviewCount = (reviewerEmail) => {
    return (reviewRequests || []).filter(req => 
      req.reviewerEmail === reviewerEmail && req.status === "completed"
    ).length
  }

  const filteredReviewers = (reviewers || []).filter(reviewer => {
    if (!searchQuery.trim()) return true
    
    const query = searchQuery.toLowerCase()
    return (
      (reviewer.name || '').toLowerCase().includes(query) ||
      (reviewer.skills || '').toLowerCase().includes(query) ||
      (reviewer.workplace || '').toLowerCase().includes(query) ||
      (reviewer.qualifications || '').toLowerCase().includes(query)
    )
  })

  const handleRequestReview = async () => {
    if (!selectedPortfolio) {
      warning && warning("Please select a portfolio and version")
      return
    }
    
    const [portfolioId, versionNumber] = selectedPortfolio.split('|')
    const portfolio = userPortfolios.find(p => p._id === portfolioId)
    
    if (!portfolio || !sendReviewRequest) {
      warning && warning("Portfolio not found")
      return
    }
    
    try {
      await sendReviewRequest(portfolioId, selectedReviewer.email, `Version ${versionNumber}`)
      success && success(`Review request sent to ${selectedReviewer.name} for "${portfolio.title}" Version ${versionNumber}!`)
    } catch (error) {
      warning && warning("Failed to send review request")
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
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Search by name, domain, skills, or workplace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                padding: "0.75rem", 
                width: "400px", 
                border: "1px solid #ddd", 
                borderRadius: "6px",
                fontSize: "0.9rem"
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                style={{
                  padding: "0.75rem 1rem",
                  background: "#6b7280",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <p style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
              Found {filteredReviewers.length} reviewer{filteredReviewers.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.9rem", color: "#666", marginRight: "0.5rem" }}>Quick filters:</span>
            {['UI/UX', 'Web Development', 'Mobile', 'Design', 'Frontend', 'Backend'].map(filter => (
              <button
                key={filter}
                onClick={() => setSearchQuery(filter)}
                style={{
                  padding: "0.25rem 0.75rem",
                  background: searchQuery === filter ? "#2563eb" : "#f3f4f6",
                  color: searchQuery === filter ? "white" : "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "16px",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {filter}
              </button>
            ))}
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
                    <p className="reviewer-specialty">{(reviewer.skills || 'Professional Reviewer').split(',')[0]}</p>
                    <p style={{ fontSize: "0.8rem", color: "#666", margin: "0.25rem 0" }}>{reviewer.workplace}</p>
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
                      <h4>Skills & Expertise</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                        {(reviewer.skills || '').split(',').map((skill, index) => (
                          <span key={index} style={{
                            background: "#e0f2fe",
                            color: "#0277bd",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            fontWeight: "500"
                          }}>
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Professional Background</h4>
                      <p><strong>Workplace:</strong> {reviewer.workplace || 'Not specified'}</p>
                      <p><strong>Qualifications:</strong> {reviewer.qualifications || 'Not specified'}</p>
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
                  <label>Select Portfolio & Version</label>
                  <select 
                    value={selectedPortfolio}
                    onChange={(e) => setSelectedPortfolio(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Choose portfolio and version...</option>
                    {userPortfolios.map((portfolio) => {
                      const versions = portfolio.versions || [{ version: 1, content: portfolio.content, createdAt: portfolio.createdAt }]
                      return versions.map((version) => (
                        <option key={`${portfolio._id}-v${version.version}`} value={`${portfolio._id}|${version.version}`}>
                          📄 {portfolio.title} - Version {version.version} ({new Date(version.createdAt).toLocaleDateString()})
                        </option>
                      ))
                    })}
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