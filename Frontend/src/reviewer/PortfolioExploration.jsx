import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewerDashboard.css"

function PortfolioExploration() {
  const { user } = useContext(AuthContext)
  const { portfolios, addReviewRequest } = useContext(PortfolioContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [filters, setFilters] = useState({
    domain: '',
    experienceLevel: ''
  })

  // Filter portfolios that are open for review and not private
  const openPortfolios = portfolios.filter(p => p.openForReview && !p.private)

  const filteredPortfolios = openPortfolios.filter(portfolio => {
    const domainMatch = !filters.domain || 
      (portfolio.domain && portfolio.domain.toLowerCase().includes(filters.domain.toLowerCase())) ||
      (portfolio.title && portfolio.title.toLowerCase().includes(filters.domain.toLowerCase()))
    
    const levelMatch = !filters.experienceLevel || 
      (portfolio.experienceLevel && portfolio.experienceLevel.toLowerCase() === filters.experienceLevel.toLowerCase())
    
    return domainMatch && levelMatch
  })

  const handleViewPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio)
  }

  const handleRequestReview = (portfolio) => {
    const reviewRequest = {
      portfolioId: portfolio.id,
      portfolioTitle: portfolio.title,
      portfolioContent: portfolio.content,
      ownerName: portfolio.ownerName,
      ownerEmail: portfolio.owner,
      reviewerName: user.name,
      reviewerEmail: user.email,
      requestDate: new Date().toISOString(),
      status: "pending"
    }
    
    addReviewRequest(reviewRequest)
    alert("Review request sent successfully!")
  }

  const domains = ['UI/UX Design', 'Web Development', 'Mobile Development', 'Graphic Design', 'Product Design']
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div className="reviewer-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Portfolio Exploration</h1>
        </div>

        <div className="dashboard-content">
          {/* Filters Section */}
          <section className="filters-section">
            <h2 className="section-title">Filter Portfolios</h2>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="domain-filter">Domain/Stream:</label>
                <select 
                  id="domain-filter"
                  value={filters.domain}
                  onChange={(e) => setFilters({...filters, domain: e.target.value})}
                  className="filter-select"
                >
                  <option value="">All Domains</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="level-filter">Experience Level:</label>
                <select 
                  id="level-filter"
                  value={filters.experienceLevel}
                  onChange={(e) => setFilters({...filters, experienceLevel: e.target.value})}
                  className="filter-select"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div className="filter-actions">
                <button 
                  onClick={() => setFilters({domain: '', experienceLevel: ''})}
                  className="action-btn secondary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section className="exploration-section">
            <h2 className="section-title">
              Open Portfolios ({filteredPortfolios.length} found)
            </h2>
            {filteredPortfolios.length > 0 ? (
              <div className="exploration-grid">
                {filteredPortfolios.map((portfolio) => (
                  <div key={portfolio.id} className="exploration-item">
                    <div className="exploration-content">
                      <div className="exploration-info">
                        <h3 className="exploration-title">{portfolio.title}</h3>
                        <p className="exploration-meta">
                          Owner: {portfolio.ownerName || "Portfolio Owner"} • Open for Review
                        </p>
                        <div className="exploration-tags">
                          <span className="domain-tag">
                            {portfolio.domain || 
                             (portfolio.title.includes('UX') ? 'UI/UX Design' : 
                              portfolio.title.includes('Web') ? 'Web Development' :
                              portfolio.title.includes('Mobile') ? 'Mobile Development' : 'Design')}
                          </span>
                          <span className="level-tag">
                            {portfolio.experienceLevel || 'Intermediate'}
                          </span>
                          <span className="status-tag status-open">
                            Open for Review
                          </span>
                        </div>
                        <div className="portfolio-preview">
                          {(portfolio.content || portfolio.description || "Portfolio available for review").substring(0, 150)}...
                        </div>
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
                <h3>No portfolios found</h3>
                <p>Try adjusting your filters or check back later for new portfolios.</p>
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
                    <p><strong>Owner:</strong> {selectedPortfolio.ownerName || "Portfolio Owner"}</p>
                    <p><strong>Domain:</strong> {selectedPortfolio.domain || 
                      (selectedPortfolio.title.includes('UX') ? 'UI/UX Design' : 
                       selectedPortfolio.title.includes('Web') ? 'Web Development' :
                       selectedPortfolio.title.includes('Mobile') ? 'Mobile Development' : 'Design')}</p>
                    <p><strong>Experience Level:</strong> {selectedPortfolio.experienceLevel || 'Intermediate'}</p>
                    <p><strong>Created:</strong> {new Date(selectedPortfolio.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="portfolio-content-view">
                    <h4>Portfolio Preview:</h4>
                    <div className="content-preview">
                      {selectedPortfolio.content || selectedPortfolio.description || "Portfolio content available for detailed review upon acceptance."}
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    onClick={() => handleRequestReview(selectedPortfolio)}
                    className="action-btn primary"
                    style={{ marginRight: '1rem' }}
                  >
                    Request to Review
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