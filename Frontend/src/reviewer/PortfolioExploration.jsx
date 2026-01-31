import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import ReviewerNavbar from "../components/ReviewerNavbar"
import UserProfile from "../components/UserProfile"
import apiService from "../services/api"
import "../styles/ReviewerDashboard.css"

function PortfolioExploration() {
  const { user } = useContext(AuthContext)
  const [publicPortfolios, setPublicPortfolios] = useState([])
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requestMessage, setRequestMessage] = useState("")

  useEffect(() => {
    const fetchPublicPortfolios = async () => {
      try {
        const portfolios = await apiService.getPublicPortfolios()
        setPublicPortfolios(portfolios)
        setLoading(false)
      } catch (error) {
        console.error('Error loading public portfolios:', error)
        setLoading(false)
      }
    }
    fetchPublicPortfolios()
  }, [])

  const handleViewPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio)
  }

  const handleRequestReview = async (portfolio) => {
    try {
      await apiService.sendReviewerRequest({
        portfolioId: portfolio._id,
        message: requestMessage
      })
      alert("Review request sent successfully!")
      setRequestMessage("")
    } catch (error) {
      alert(error.message || "Error sending request")
    }
  }

  if (loading) {
    return (
      <div className="dashboard-with-navbar">
        <ReviewerNavbar />
        <UserProfile />
        <div className="reviewer-dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Loading Portfolios...</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <UserProfile />
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Explore Public Portfolios</h1>
          <p>Discover portfolios available for review</p>
        </div>

        <div className="dashboard-content">
          <section className="exploration-section">
            <h2 className="section-title">Available Portfolios ({publicPortfolios.length})</h2>
            {publicPortfolios.length > 0 ? (
              <div className="exploration-grid">
                {publicPortfolios.map((portfolio) => (
                  <div key={portfolio._id} className="exploration-item">
                    <div className="exploration-content">
                      <div className="exploration-info">
                        <h3 className="exploration-title">{portfolio.title}</h3>
                        <p className="exploration-meta">
                          Owner: {portfolio.owner?.name || portfolio.ownerName} • {portfolio.domain || 'General'}
                        </p>
                        <div className="exploration-tags">
                          <span className="domain-tag">
                            {portfolio.domain || 'General'}
                          </span>
                          <span className="level-tag">
                            {portfolio.experienceLevel || 'Intermediate'}
                          </span>
                        </div>
                        <p className="portfolio-preview">
                          {portfolio.content.substring(0, 150)}...
                        </p>
                        <div className="exploration-actions">
                          <button 
                            onClick={() => handleViewPortfolio(portfolio)}
                            className="action-btn primary"
                          >
                            View Portfolio
                          </button>
                          <button 
                            onClick={() => handleRequestReview(portfolio)}
                            className="action-btn secondary"
                          >
                            Request to Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
                <h3>No public portfolios available</h3>
                <p>Check back later for new portfolios to review.</p>
              </div>
            )}
          </section>

          {/* Portfolio View Modal */}
          {selectedPortfolio && (
            <div className="portfolio-modal">
              <div className="portfolio-modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedPortfolio.title}</h2>
                  <button 
                    className="close-btn"
                    onClick={() => setSelectedPortfolio(null)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="portfolio-details">
                    <p><strong>Owner:</strong> {selectedPortfolio.owner?.name || selectedPortfolio.ownerName}</p>
                    <p><strong>Domain:</strong> {selectedPortfolio.domain || 'General'}</p>
                    <p><strong>Experience Level:</strong> {selectedPortfolio.experienceLevel || 'Intermediate'}</p>
                    <p><strong>Upload Type:</strong> {selectedPortfolio.uploadType || 'text'}</p>
                  </div>
                  
                  <div className="portfolio-content-view">
                    <h4>Portfolio Content:</h4>
                    <div className="content-preview">
                      {selectedPortfolio.content}
                    </div>
                  </div>

                  <div style={{ marginTop: "1.5rem" }}>
                    <h4>Request Message (Optional):</h4>
                    <textarea
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Add a message to your review request..."
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        resize: "vertical"
                      }}
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => handleRequestReview(selectedPortfolio)}
                    className="action-btn primary"
                  >
                    Send Review Request
                  </button>
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

export default PortfolioExploration