import { useContext, useState } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/PortfolioVersions.css"

function PortfolioVersions() {
  const { portfolios, addVersion } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [newContent, setNewContent] = useState("")

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  const handleAddVersion = (e) => {
    e.preventDefault()
    addVersion(selectedPortfolio.id, newContent)
    setNewContent("")
    alert("New version added successfully!")
  }

  const getLatestVersion = (portfolio) => {
    return portfolio.versions[portfolio.versions.length - 1]
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="portfolio-versions-container">
        <div className="versions-header">
          <h2 className="versions-title">Portfolio Versions</h2>
          <p className="versions-subtitle">Manage and track different versions of your portfolios</p>
        </div>
        
        {userPortfolios.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <p>No portfolios created yet.</p>
          </div>
        ) : (
          <div className="versions-grid">
            {userPortfolios.map(portfolio => {
              const latestVersion = getLatestVersion(portfolio)
              return (
                <div key={portfolio.id} className="version-card">
                  <h3>{portfolio.title}</h3>
                  <div className="version-info">
                    <div className="version-detail">
                      <strong>Current Version</strong>
                      <span className="version-number">v{latestVersion.version}</span>
                    </div>
                    <div className="version-detail">
                      <strong>Last Updated</strong>
                      <span>{new Date(latestVersion.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="version-detail">
                      <strong>Total Versions</strong>
                      <span>{portfolio.versions.length}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedPortfolio(portfolio)}
                    className="add-version-btn"
                  >
                    Add New Version
                  </button>
                </div>
              )
            })}

            {selectedPortfolio && (
              <div className="version-form-modal">
                <h3>Add Version to: {selectedPortfolio.title}</h3>
                <form onSubmit={handleAddVersion}>
                  <textarea
                    placeholder="Enter updated portfolio content based on feedback..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="version-textarea"
                    required
                  />
                  <div className="form-actions">
                    <button type="submit" className="submit-btn">Add Version</button>
                    <button 
                      type="button" 
                      onClick={() => setSelectedPortfolio(null)} 
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioVersions