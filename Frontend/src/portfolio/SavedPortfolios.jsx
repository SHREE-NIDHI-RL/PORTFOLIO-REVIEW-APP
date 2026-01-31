import { useContext, useState, useEffect, useCallback } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/OwnerDashboard.css"

function SavedPortfolios() {
  const { user } = useContext(AuthContext)
  const { portfolios, addPortfolio, addVersion, updatePortfolioVisibility, loadData } = useContext(PortfolioContext)
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showVersionModal, setShowVersionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    file: null,
    domain: '',
    experienceLevel: ''
  })

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user, loadData])

  const userId = String(user?._id || user?.id)
  const userPortfolios = portfolios.filter(p => {
    const ownerId = String(p.owner?._id || p.owner)
    return ownerId === userId
  })

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setUploadData({...uploadData, file})
    } else {
      alert('Please select a PDF file')
      e.target.value = ''
    }
  }

  const handleCreatePortfolio = async (e) => {
    e.preventDefault()
    if (!uploadData.title || !uploadData.file) {
      alert('Please fill in title and select a file')
      return
    }

    setIsLoading(true)
    try {
      const portfolioData = {
        title: uploadData.title,
        content: `PDF Portfolio: ${uploadData.file.name}`,
        uploadType: 'file',
        fileName: uploadData.file.name,
        domain: uploadData.domain || 'Other',
        experienceLevel: uploadData.experienceLevel || 'Intermediate',
        openForReview: true,
        private: false
      }
      
      await addPortfolio(portfolioData)
      setUploadData({ title: '', file: null, domain: '', experienceLevel: '' })
      setShowUploadModal(false)
      alert('Portfolio uploaded successfully!')
    } catch (error) {
      console.error('Portfolio creation error:', error)
      alert('Error uploading portfolio: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddVersion = async (e) => {
    e.preventDefault()
    const fileInput = document.getElementById('versionFile')
    const file = fileInput?.files[0]
    
    if (!file) {
      alert('Please select a file')
      return
    }

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file')
      return
    }

    setIsLoading(true)
    try {
      const content = `PDF Portfolio Version: ${file.name}`
      await addVersion(selectedPortfolio._id, content)
      setShowVersionModal(false)
      setSelectedPortfolio(null)
      alert('New version added successfully!')
    } catch (error) {
      console.error('Version addition error:', error)
      alert('Error adding version: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMakeAvailable = async (portfolioId, versionNum) => {
    setIsLoading(true)
    try {
      await updatePortfolioVisibility(portfolioId, versionNum, true)
      alert('Portfolio version made available for all reviewers!')
    } catch (error) {
      console.error('Visibility update error:', error)
      alert('Error updating visibility: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="owner-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Portfolio Files</h1>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="create-new-btn"
          >
            <span className="btn-icon">📁</span>
            Upload Portfolio
          </button>
        </div>

        <div className="dashboard-content">
          {isLoading && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: 'rgba(0,0,0,0.5)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              zIndex: 9999 
            }}>
              <div style={{ 
                background: 'white', 
                padding: '2rem', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <div>Processing...</div>
              </div>
            </div>
          )}
          <section className="portfolios-section">
            <h2 className="section-title">Uploaded Portfolios ({userPortfolios.length})</h2>
            {isLoading ? (
              <div className="no-portfolios" style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                <h3>Loading portfolios...</h3>
              </div>
            ) : userPortfolios.length === 0 ? (
              <div className="no-portfolios" style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                <h3>No portfolios uploaded</h3>
                <p>Upload your first portfolio file to get started</p>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="create-new-btn" 
                  style={{ display: 'inline-block', marginTop: '1rem' }}
                >
                  Upload Portfolio
                </button>
              </div>
            ) : (
              <div className="portfolios-grid">
                {userPortfolios.map(portfolio => (
                  <div key={portfolio._id} className="portfolio-item">
                    <div className="portfolio-content">
                      <div className="portfolio-info">
                        <h3 className="portfolio-title">📄 {portfolio.title}</h3>
                        <p className="portfolio-meta">
                          {portfolio.versions?.length || 1} Version(s) • {new Date(portfolio.createdAt).toLocaleDateString()}
                        </p>
                        <div className="portfolio-tags">
                          <span className="template-tag">{portfolio.domain || 'General'}</span>
                          <span className="status-tag">
                            {portfolio.experienceLevel || 'Intermediate'}
                          </span>
                          {portfolio.fileName && (
                            <span className="template-tag">📁 {portfolio.fileName}</span>
                          )}
                        </div>
                        <div className="portfolio-actions">
                          <button 
                            onClick={() => {
                              const portfolioWithVersions = {
                                ...portfolio,
                                versions: portfolio.versions || []
                              }
                              setSelectedPortfolio(portfolioWithVersions)
                              setSelectedVersion(
                                portfolio.versions?.[0] || {
                                  version: 1, 
                                  content: portfolio.content, 
                                  createdAt: portfolio.createdAt
                                }
                              )
                            }}
                            className="action-btn primary"
                          >
                            View Versions
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedPortfolio(portfolio)
                              setShowVersionModal(true)
                            }}
                            className="action-btn secondary"
                          >
                            Add Version
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Upload Portfolio Modal */}
        {showUploadModal && (
          <div className="feedback-modal">
            <div className="feedback-card">
              <div className="review-card-header">
                <h2 className="review-card-title">Upload New Portfolio</h2>
                <button onClick={() => setShowUploadModal(false)} className="close-btn">×</button>
              </div>
              <form onSubmit={handleCreatePortfolio} style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Portfolio Title *</label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    placeholder="Enter portfolio title"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Upload PDF File *</label>
                  <div style={{ 
                    border: '2px dashed #ddd', 
                    borderRadius: '8px', 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: uploadData.file ? '#f0f8ff' : '#f9f9f9'
                  }}>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="portfolioFile"
                      required
                    />
                    <label htmlFor="portfolioFile" style={{ cursor: 'pointer' }}>
                      {uploadData.file ? (
                        <div>
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                          <div style={{ fontWeight: 'bold', color: '#007bff' }}>{uploadData.file.name}</div>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>Click to change file</div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
                          <div>Click to select PDF file</div>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>Maximum file size: 10MB</div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Domain</label>
                    <select
                      value={uploadData.domain}
                      onChange={(e) => setUploadData({...uploadData, domain: e.target.value})}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                      <option value="">Select Domain</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Data Science">Data Science</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Experience Level</label>
                    <select
                      value={uploadData.experienceLevel}
                      onChange={(e) => setUploadData({...uploadData, experienceLevel: e.target.value})}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="send-request-btn">
                    📁 Upload Portfolio
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="decline-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Version Modal */}
        {showVersionModal && (
          <div className="feedback-modal">
            <div className="feedback-card">
              <div className="review-card-header">
                <h2 className="review-card-title">Add New Version - {selectedPortfolio?.title}</h2>
                <button onClick={() => setShowVersionModal(false)} className="close-btn">×</button>
              </div>
              <form onSubmit={handleAddVersion} style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Upload New Version (PDF) *</label>
                  <div style={{ 
                    border: '2px dashed #ddd', 
                    borderRadius: '8px', 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: '#f9f9f9'
                  }}>
                    <input
                      type="file"
                      accept=".pdf"
                      style={{ display: 'none' }}
                      id="versionFile"
                      required
                    />
                    <label htmlFor="versionFile" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                      <div>Click to select PDF file for new version</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>This will be version {(selectedPortfolio?.versions?.length || 0) + 1}</div>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="send-request-btn">
                    📁 Add Version
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowVersionModal(false)}
                    className="decline-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Versions Modal */}
        {selectedPortfolio && !showVersionModal && !showUploadModal && (
          <div className="feedback-modal">
            <div className="feedback-card">
              <div className="review-card-header">
                <h2 className="review-card-title">📄 {selectedPortfolio.title} - Versions</h2>
                <button onClick={() => setSelectedPortfolio(null)} className="close-btn">×</button>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Select Version:</label>
                  <select 
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      marginBottom: '1rem'
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
                        📄 Version {version.version} - {new Date(version.createdAt).toLocaleDateString()} {new Date(version.createdAt).toLocaleTimeString()}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedVersion && (
                  <div style={{ 
                    padding: '1.5rem', 
                    background: '#f8f9fa', 
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '1rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid #dee2e6'
                    }}>
                      <h4 style={{ margin: 0, color: '#495057' }}>📄 Version {selectedVersion.version}</h4>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        <div>📅 {new Date(selectedVersion.createdAt).toLocaleDateString()}</div>
                        <div>🕒 {new Date(selectedVersion.createdAt).toLocaleTimeString()}</div>
                      </div>
                    </div>
                    <div style={{ 
                      fontSize: '0.95rem', 
                      lineHeight: '1.6', 
                      color: '#212529',
                      marginBottom: '1rem'
                    }}>
                      {selectedVersion.content}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        onClick={() => handleMakeAvailable(selectedPortfolio._id, selectedVersion.version)}
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
                        🌐 Make Available for Reviewers
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPortfolios