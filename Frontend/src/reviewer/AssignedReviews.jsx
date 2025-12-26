import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewerDashboard.css"

function AssignedReviews() {
  const { user } = useContext(AuthContext)
  const { reviewRequests } = useContext(PortfolioContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  
  const acceptedRequests = reviewRequests.filter(req => 
    req.reviewerEmail === user?.email && req.status === "accepted"
  )

  const handleViewPortfolio = (request) => {
    setSelectedPortfolio(request)
  }

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Assigned Reviews</h1>
        </div>

        <div className="dashboard-content">
          <section className="assigned-section">
            <h2 className="section-title">Portfolios Assigned for Review</h2>
            {acceptedRequests.length > 0 ? (
              <div className="assigned-grid">
                {acceptedRequests.map((request) => (
                  <div key={request.id} className="assigned-item">
                    <div className="assigned-content">
                      <div className="assigned-info">
                        <h3 className="assigned-title">{request.portfolioTitle}</h3>
                        <p className="assigned-meta">
                          Owner: {request.ownerName} • Version 1.0 • Accepted on {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                        <div className="assigned-tags">
                          <span className="domain-tag">
                            {request.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                             request.portfolioTitle.includes('Web') ? 'Web Development' :
                             request.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}
                          </span>
                          <span className="status-tag status-accepted">
                            Status: Accepted
                          </span>
                        </div>
                        <div className="portfolio-preview">
                          {(request.portfolioContent || '').substring(0, 200)}...
                        </div>
                        <div className="assigned-actions">
                          <button 
                            onClick={() => handleViewPortfolio(request)}
                            className="action-btn primary"
                          >
                            View Portfolio (Read-Only)
                          </button>
                          <Link 
                            to={`/submit-review?requestId=${request.id}`}
                            className="action-btn secondary"
                            style={{ textDecoration: 'none', textAlign: 'center' }}
                          >
                            Submit Review
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
                <h3>No assigned reviews</h3>
                <p>You'll see portfolios here once you accept review requests.</p>
                <Link to="/review-requests" className="action-btn primary">
                  View Review Requests
                </Link>
              </div>
            )}
          </section>

          {/* Portfolio View Modal */}
          {selectedPortfolio && (
            <div className="portfolio-modal">
              <div className="portfolio-modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedPortfolio.portfolioTitle} (Read-Only)</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedPortfolio(null)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="portfolio-details">
                    <p><strong>Owner:</strong> {selectedPortfolio.ownerName}</p>
                    <p><strong>Version:</strong> 1.0</p>
                    <p><strong>Domain:</strong> {selectedPortfolio.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                                                   selectedPortfolio.portfolioTitle.includes('Web') ? 'Web Development' :
                                                   selectedPortfolio.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}</p>
                    <p><strong>Assigned Date:</strong> {new Date(selectedPortfolio.requestDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="portfolio-content-view">
                    <h4>Portfolio Content:</h4>
                    <div className="content-preview">
                      {selectedPortfolio.portfolioContent || 'No content available'}
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <Link 
                    to={`/submit-review?requestId=${selectedPortfolio.id}`}
                    className="action-btn primary"
                    style={{ textDecoration: 'none', marginRight: '1rem' }}
                  >
                    Submit Review
                  </Link>
                  <button 
                    onClick={() => setSelectedPortfolio(null)}
                    className="action-btn secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignedReviews