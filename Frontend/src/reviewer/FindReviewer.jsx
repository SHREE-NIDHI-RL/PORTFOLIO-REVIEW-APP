import { useContext, useState } from "react"
import { ReviewerContext } from "../context/ReviewerContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/FindReviewer.css"

function FindReviewer() {
  const { reviewers } = useContext(ReviewerContext)
  const { portfolios, addReviewRequest, reviewRequests } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  const [expandedReviewer, setExpandedReviewer] = useState(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [selectedReviewer, setSelectedReviewer] = useState(null)
  const [selectedPortfolio, setSelectedPortfolio] = useState("")
  const [selectedVersion, setSelectedVersion] = useState("")

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  const getReviewCount = (reviewerEmail) => {
    return reviewRequests.filter(req => 
      req.reviewerEmail === reviewerEmail && req.status === "completed"
    ).length
  }

  const getPortfolioVersions = (portfolioTitle) => {
    const portfolio = userPortfolios.find(p => p.title === portfolioTitle)
    if (!portfolio || !portfolio.versions) return [{ version: 1, content: portfolio?.content || "" }]
    return portfolio.versions
  }

  const handleRequestReview = () => {
    if (!selectedPortfolio || !selectedVersion) {
      alert("Please select both portfolio and version")
      return
    }
    
    const portfolio = userPortfolios.find(p => p.title === selectedPortfolio)
    const versions = getPortfolioVersions(selectedPortfolio)
    const versionContent = versions.find(v => v.version.toString() === selectedVersion)?.content || portfolio.content
    
    const requestData = {
      reviewerEmail: selectedReviewer.email,
      reviewerName: selectedReviewer.name,
      ownerEmail: user.email,
      ownerName: user.name || "Portfolio Owner",
      portfolioTitle: portfolio.title,
      portfolioContent: versionContent,
      portfolioVersion: selectedVersion,
      status: "pending",
      requestDate: new Date().toISOString(),
      ownerProfile: {
        name: user.name || "Portfolio Owner",
        email: user.email,
        role: user.role
      }
    }
    
    addReviewRequest(requestData)
    alert(`Review request sent to ${selectedReviewer.name}!`)
    setShowRequestModal(false)
    setSelectedReviewer(null)
    setSelectedPortfolio("")
    setSelectedVersion("")
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="find-reviewer-page">
        <div className="page-header">
          <h1>Find Reviewers</h1>
          <p>Connect with professional reviewers to get feedback on your portfolio</p>
        </div>
        
        <div className="reviewers-grid">
          {reviewers.map((reviewer) => {
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
                      <span className="rating">⭐ {reviewer.credibility || 85}/100</span>
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
                      <p>{reviewer.qualifications || "Professional experience in portfolio review"}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Workplace</h4>
                      <p>{reviewer.workplace || "Independent Reviewer"}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Expertise</h4>
                      <p>{reviewer.skills || "General portfolio review"}</p>
                    </div>
                    
                    <div className="detail-section">
                      <h4>Review Statistics</h4>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-number">{reviewCount}</span>
                          <span className="stat-label">Portfolios Reviewed</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-number">{reviewer.credibility || 85}</span>
                          <span className="stat-label">Credibility Score</span>
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
                    onChange={(e) => {
                      setSelectedPortfolio(e.target.value)
                      setSelectedVersion("")
                    }}
                    className="form-select"
                  >
                    <option value="">Choose portfolio...</option>
                    {userPortfolios.map((portfolio, index) => (
                      <option key={index} value={portfolio.title}>
                        {portfolio.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedPortfolio && (
                  <div className="form-group">
                    <label>Select Version</label>
                    <select 
                      value={selectedVersion}
                      onChange={(e) => setSelectedVersion(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Choose version...</option>
                      {getPortfolioVersions(selectedPortfolio).map((version) => (
                        <option key={version.version} value={version.version}>
                          Version {version.version}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
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
                    disabled={!selectedPortfolio || !selectedVersion}
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