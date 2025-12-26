import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/OwnerDashboard.css"

function SavedPortfolios() {
  const { user } = useContext(AuthContext)
  const { portfolios, addVersion } = useContext(PortfolioContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [showVersionModal, setShowVersionModal] = useState(false)
  const [newVersionContent, setNewVersionContent] = useState("")

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  const handleAddVersion = (portfolioId) => {
    if (newVersionContent.trim()) {
      addVersion(portfolioId, newVersionContent)
      setNewVersionContent("")
      setShowVersionModal(false)
      alert("New version added successfully!")
    }
  }

  const portfolios_display = userPortfolios.map((portfolio) => ({
    id: portfolio.id,
    title: portfolio.title,
    version: portfolio.versions?.length || 1,
    status: portfolio.uploadType === 'file' ? 'PDF Uploaded' : portfolio.uploadType === 'link' ? 'External Link' : 'Draft',
    lastUpdated: new Date(portfolio.createdAt).toLocaleDateString(),
    template: portfolio.domain || "Custom",
    uploadType: portfolio.uploadType || 'text',
    fileName: portfolio.fileName,
    externalLink: portfolio.externalLink,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='100' viewBox='0 0 180 100'%3E%3Crect width='180' height='100' fill='%23e5e7eb'/%3E%3Ctext x='90' y='55' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3E" + (portfolio.uploadType === 'file' ? 'PDF' : portfolio.uploadType === 'link' ? 'Link' : 'Portfolio') + "%3C/text%3E%3C/svg%3E"
  }))

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="owner-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Portfolios</h1>
          <Link to="/create-portfolio" className="create-new-btn">
            <span className="btn-icon">+</span>
            Create New
          </Link>
        </div>

        <div className="dashboard-content">
          <section className="portfolios-section">
            <h2 className="section-title">Saved Portfolios</h2>
            <div className="portfolios-grid">
              {portfolios_display.map(portfolio => (
                <div key={portfolio.id} className="portfolio-item">
                  <div className="portfolio-content">
                    <div className="portfolio-info">
                      <h3 className="portfolio-title">{portfolio.title}</h3>
                      <p className="portfolio-meta">
                        Version {portfolio.version} - {portfolio.status} {portfolio.lastUpdated}
                      </p>
                      <div className="portfolio-tags">
                        <span className="template-tag">{portfolio.template}</span>
                        <span className={`status-tag status-${portfolio.status.toLowerCase().replace(' ', '-')}`}>
                          {portfolio.uploadType === 'file' && '📄 '}
                          {portfolio.uploadType === 'link' && '🔗 '}
                          {portfolio.status}
                        </span>
                        {portfolio.fileName && (
                          <span className="template-tag">📁 {portfolio.fileName}</span>
                        )}
                        {portfolio.externalLink && (
                          <a href={portfolio.externalLink} target="_blank" rel="noopener noreferrer" className="template-tag" style={{textDecoration:'none'}}>🔗 View Link</a>
                        )}
                      </div>
                      <div className="portfolio-actions">
                        <button 
                          onClick={() => setSelectedPortfolio(userPortfolios.find(p => p.id === portfolio.id))}
                          className="action-btn primary"
                        >
                          View Versions
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedPortfolio(userPortfolios.find(p => p.id === portfolio.id))
                            setShowVersionModal(true)
                          }}
                          className="action-btn secondary"
                        >
                          Add Version
                        </button>
                      </div>
                    </div>
                    <div className="portfolio-image">
                      <img src={portfolio.image} alt={portfolio.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {selectedPortfolio && !showVersionModal && (
          <div className="feedback-modal">
            <div className="feedback-card">
              <div className="review-card-header">
                <h2 className="review-card-title">{selectedPortfolio.title} - Versions</h2>
                <button onClick={() => setSelectedPortfolio(null)} className="close-btn">×</button>
              </div>
              <div style={{ padding: "1.5rem" }}>
                {(selectedPortfolio.versions || [{version: 1, content: selectedPortfolio.content, createdAt: selectedPortfolio.createdAt}]).map(version => (
                  <div key={version.version} style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <h4>Version {version.version}</h4>
                      <span style={{ color: "#666", fontSize: "0.9rem" }}>{new Date(version.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>{version.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showVersionModal && (
          <div className="feedback-modal">
            <div className="feedback-card">
              <div className="review-card-header">
                <h2 className="review-card-title">Add New Version - {selectedPortfolio?.title}</h2>
                <button onClick={() => setShowVersionModal(false)} className="close-btn">×</button>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <textarea
                  value={newVersionContent}
                  onChange={(e) => setNewVersionContent(e.target.value)}
                  placeholder="Enter new version content..."
                  rows="10"
                  style={{ width: "100%", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem" }}
                />
              </div>
              <div style={{ padding: "0 1.5rem 1.5rem", display: "flex", gap: "1rem" }}>
                <button 
                  onClick={() => handleAddVersion(selectedPortfolio.id)}
                  className="send-request-btn"
                >
                  Add Version
                </button>
                <button 
                  onClick={() => setShowVersionModal(false)}
                  className="decline-btn"
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

export default SavedPortfolios