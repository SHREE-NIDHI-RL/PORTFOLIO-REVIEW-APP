import { useContext, useState } from "react"
import { ReviewerContext } from "../context/ReviewerContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/FindReviewer.css"

function FindReviewer() {
  const { reviewers } = useContext(ReviewerContext)
  const { portfolios, addReviewRequest } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  const [selectedReviewer, setSelectedReviewer] = useState(null)
  const [selectedPortfolio, setSelectedPortfolio] = useState("")

  const handleSendRequest = (reviewer) => {
    if (!selectedPortfolio) {
      alert("Please select a portfolio first")
      return
    }
    
    const portfolio = portfolios.find(p => p.title === selectedPortfolio)
    const requestData = {
      reviewerEmail: reviewer.email,
      reviewerName: reviewer.name,
      ownerEmail: user.email,
      ownerName: user.name || "Portfolio Owner",
      portfolioTitle: portfolio.title,
      portfolioContent: portfolio.content,
      status: "pending",
      requestDate: new Date().toISOString()
    }
    
    addReviewRequest(requestData)
    alert(`Portfolio request sent to ${reviewer.name}!`)
    setSelectedReviewer(null)
    setSelectedPortfolio("")
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="find-reviewer-container">
        <div className="find-reviewer-header">
          <h1 className="find-reviewer-title">Find a Reviewer</h1>
          <p className="find-reviewer-subtitle">Browse and connect with professional reviewers</p>
        </div>
        
        <div className="reviewers-grid">
          {reviewers.length === 0 ? (
            <div className="no-reviewers">
              <h3>No reviewers available</h3>
              <p>Check back later for registered reviewers</p>
            </div>
          ) : (
            reviewers.map((reviewer, index) => (
              <div key={index} className="reviewer-card">
                <div className="reviewer-avatar">
                  {reviewer.name.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-info">
                  <h3 className="reviewer-name">{reviewer.name}</h3>
                  <p className="reviewer-email">{reviewer.email}</p>
                  <div className="reviewer-details">
                    <div className="detail-item">
                      <span className="detail-label">Qualifications:</span>
                      <span className="detail-value">{reviewer.qualifications}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Workplace:</span>
                      <span className="detail-value">{reviewer.workplace}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Skills:</span>
                      <span className="detail-value">{reviewer.skills}</span>
                    </div>
                  </div>
                  <button 
                    className="send-request-btn"
                    onClick={() => setSelectedReviewer(reviewer)}
                  >
                    Send Portfolio Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {selectedReviewer && (
          <div className="request-modal">
            <div className="modal-content">
              <h3>Send Portfolio to {selectedReviewer.name}</h3>
              <select 
                value={selectedPortfolio} 
                onChange={(e) => setSelectedPortfolio(e.target.value)}
                className="portfolio-select"
              >
                <option value="">Select a portfolio</option>
                {portfolios.filter(p => p.owner === user.email).map((portfolio, index) => (
                  <option key={index} value={portfolio.title}>{portfolio.title}</option>
                ))}
              </select>
              <div className="modal-buttons">
                <button 
                  onClick={() => handleSendRequest(selectedReviewer)}
                  className="send-btn"
                >
                  Send Request
                </button>
                <button 
                  onClick={() => setSelectedReviewer(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindReviewer