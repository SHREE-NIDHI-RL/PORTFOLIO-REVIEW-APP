import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { Link } from "react-router-dom"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/OwnerDashboard.css"

function SavedPortfolios() {
  const { user } = useContext(AuthContext)
  const { portfolios, addVersion, updatePortfolioVisibility } = useContext(PortfolioContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [showVersionModal, setShowVersionModal] = useState(false)
  const [newVersionContent, setNewVersionContent] = useState("")

  const handleMakeAvailable = async (portfolioId, versionNum) => {
    try {
      await updatePortfolioVisibility(portfolioId, versionNum, true)
      alert("Portfolio version made available for all reviewers!")
    } catch (error) {
      alert("Error updating visibility: " + error.message)
    }
  }

  const userPortfolios = portfolios.filter(p => p.owner === user?.id || p.owner === user?.email)

  const handleAddVersion = async (portfolioId) => {
    if (newVersionContent.trim()) {
      try {
        await addVersion(portfolioId, newVersionContent)
        setNewVersionContent("")
        setShowVersionModal(false)
        alert("New version added successfully!")
      } catch (error) {
        alert("Error adding version: " + error.message)
      }
    }
  }

  const portfolios_display = userPortfolios.map((portfolio) => ({
    id: portfolio._id || portfolio.id,
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
            <h2 className="section-title">Saved Portfolios ({userPortfolios.length})</h2>
            {userPortfolios.length === 0 ? (
              <div className="no-portfolios" style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
                <h3>No portfolios found</h3>
                <p>Create your first portfolio to get started</p>
                <Link to="/create-portfolio" className="create-new-btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
                  Create Portfolio
                </Link>
              </div>
            ) : (
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
            )}
          </section>
        </div>

        {selectedPortfolio && !showVersionModal && (
          <div className="feedback-modal">
            <div className="feedback-card">
              <div className="review-card-header">
                <h2 className="review-card-title">{selectedPortfolio.title} - Portfolio Versions</h2>
                <button onClick={() => setSelectedPortfolio(null)} className="close-btn">×</button>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Select Version to View:</label>
                  <select 
                    style={{ 
                      width: "100%", 
                      padding: "0.5rem", 
                      border: "1px solid #ddd", 
                      borderRadius: "4px",
                      marginBottom: "1rem"
                    }}
                    onChange={(e) => {
                      const versionNum = parseInt(e.target.value)
                      const version = selectedPortfolio.versions?.find(v => v.version === versionNum) || 
                                    {version: 1, content: selectedPortfolio.content, createdAt: selectedPortfolio.createdAt}
                      setSelectedVersion(version)
                    }}
                  >
                    {(selectedPortfolio.versions || [{version: 1, content: selectedPortfolio.content, createdAt: selectedPortfolio.createdAt}]).map(version => (
                      <option key={version.version} value={version.version}>
                        Version {version.version} - {new Date(version.createdAt).toLocaleDateString()} {new Date(version.createdAt).toLocaleTimeString()}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedVersion && (
                  <div style={{ 
                    padding: "1.5rem", 
                    background: "#f8f9fa", 
                    borderRadius: "8px",
                    border: "1px solid #e9ecef"
                  }}>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      marginBottom: "1rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid #dee2e6"
                    }}>
                      <h4 style={{ margin: 0, color: "#495057" }}>Version {selectedVersion.version}</h4>
                      <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                        <div>📅 {new Date(selectedVersion.createdAt).toLocaleDateString()}</div>
                        <div>🕒 {new Date(selectedVersion.createdAt).toLocaleTimeString()}</div>
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: "0.95rem", 
                      lineHeight: "1.6", 
                      color: "#212529",
                      whiteSpace: "pre-wrap"
                    }}>
                      {selectedVersion.content}
                    </div>
                    
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #dee2e6' }}>
                      <button
                        onClick={() => handleMakeAvailable(selectedPortfolio.id, selectedVersion.version)}
                        style={{
                          background: '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        🌐 Make Available for All Reviewers
                      </button>
                    </div>
                  </div>
                )}
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