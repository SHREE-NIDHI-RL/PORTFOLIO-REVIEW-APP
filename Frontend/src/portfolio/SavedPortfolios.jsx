import { useContext, useState } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/SavedPortfolios.css"

function SavedPortfolios() {
  const { portfolios, addPortfolio, addVersion } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadFiles, setUploadFiles] = useState(null)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [newVersionContent, setNewVersionContent] = useState("")
  const [versionFiles, setVersionFiles] = useState(null)
  const [versionType, setVersionType] = useState("text")

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  const handleFileUpload = (e) => {
    e.preventDefault()
    if (!uploadFiles || !uploadTitle) return
    const fileNames = Array.from(uploadFiles).map(file => file.name).join(", ")
    const portfolioData = { owner: user.email, title: uploadTitle, content: `Uploaded files: ${fileNames}`, type: "uploaded" }
    addPortfolio(portfolioData)
    setUploadTitle(""); setUploadFiles(null); setShowUpload(false)
    alert("Portfolio uploaded successfully!")
  }

  const handleAddVersion = (e) => {
    e.preventDefault()
    let versionContent = newVersionContent
    if (versionType === "files" && versionFiles) {
      const fileNames = Array.from(versionFiles).map(file => file.name).join(", ")
      versionContent = `Updated files: ${fileNames}${newVersionContent ? ` - ${newVersionContent}` : ""}`
    }
    addVersion(selectedPortfolio.id, versionContent)
    setNewVersionContent(""); setVersionFiles(null); setVersionType("text"); setSelectedPortfolio(null)
    alert("New version added successfully!")
  }

  const getLatestVersion = (portfolio) => portfolio.versions ? portfolio.versions[portfolio.versions.length - 1] : null

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="saved-portfolios-container">
        <div className="saved-portfolios-header">
          <h2 className="saved-portfolios-title">Saved Portfolios</h2>
        </div>
        
        <button 
          onClick={() => setShowUpload(!showUpload)} 
          className="upload-toggle-btn"
        >
          {showUpload ? "Cancel Upload" : "Upload Portfolio"}
        </button>

        {showUpload && (
          <div className="upload-section">
            <h3>Upload Portfolio Files</h3>
            <form onSubmit={handleFileUpload} className="auth-form">
              <input 
                type="text" 
                placeholder="Portfolio Title" 
                value={uploadTitle} 
                onChange={(e) => setUploadTitle(e.target.value)} 
                className="auth-input" 
                required 
              />
              <input 
                type="file" 
                multiple 
                onChange={(e) => setUploadFiles(e.target.files)} 
                className="auth-input" 
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip" 
                required 
              />
              <button type="submit" className="auth-button">Upload & Save</button>
            </form>
          </div>
        )}

        {userPortfolios.length === 0 ? (
          <div className="empty-state">
            <p>No portfolios saved yet. Create or upload your first portfolio!</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {userPortfolios.map(portfolio => {
              const latestVersion = getLatestVersion(portfolio)
              return (
                <div key={portfolio.id} className="portfolio-card">
                  <h3>{portfolio.title}</h3>
                  <p>{latestVersion ? latestVersion.content : portfolio.content}</p>
                  <div className="portfolio-meta">
                    <span className="version-badge">v{portfolio.versions ? portfolio.versions.length : 1}</span>
                    <span className="date-text">{new Date(portfolio.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedPortfolio(portfolio)} 
                    className="add-version-btn"
                  >
                    Add Version
                  </button>
                </div>
              )
            })}

            {selectedPortfolio && (
              <div className="version-form-section">
                <h3>Add Version to: {selectedPortfolio.title}</h3>
                <form onSubmit={handleAddVersion}>
                  <select 
                    value={versionType} 
                    onChange={(e) => setVersionType(e.target.value)} 
                    className="auth-select"
                  >
                    <option value="text">Add Text Content</option>
                    <option value="files">Upload Files</option>
                  </select>

                  {versionType === "text" ? (
                    <textarea 
                      placeholder="Enter updated portfolio content..." 
                      value={newVersionContent} 
                      onChange={(e) => setNewVersionContent(e.target.value)} 
                      className="auth-input" 
                      rows="4" 
                      required 
                    />
                  ) : (
                    <>
                      <input 
                        type="file" 
                        multiple 
                        onChange={(e) => setVersionFiles(e.target.files)} 
                        className="auth-input" 
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip" 
                        required 
                      />
                      <textarea 
                        placeholder="Optional: Add description for this version..." 
                        value={newVersionContent} 
                        onChange={(e) => setNewVersionContent(e.target.value)} 
                        className="auth-input" 
                        rows="2" 
                      />
                    </>
                  )}

                  <div className="form-actions">
                    <button type="submit" className="auth-button">Add Version</button>
                    <button 
                      type="button" 
                      onClick={() => { 
                        setSelectedPortfolio(null); 
                        setVersionType("text"); 
                        setNewVersionContent(""); 
                        setVersionFiles(null) 
                      }} 
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

export default SavedPortfolios