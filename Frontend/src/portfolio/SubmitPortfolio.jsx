import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/SubmitPortfolio.css"

function SubmitPortfolio() {
  const [portfolioType, setPortfolioType] = useState("")
  const [selectedPortfolio, setSelectedPortfolio] = useState("")
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [visibility, setVisibility] = useState("")
  const [specificReviewers, setSpecificReviewers] = useState("")
  const navigate = useNavigate()
  const { portfolios } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Portfolio submitted for review!")
    navigate("/dashboard")
  }

  const getSelectedPortfolioData = () => {
    return userPortfolios.find(p => p.id === selectedPortfolio)
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="submit-portfolio-container">
        <div className="submit-wrapper">
          <div className="submit-header">
            <h2 className="submit-title">Submit Portfolio</h2>
            <p className="submit-subtitle">Share your work with professional reviewers</p>
          </div>
          
          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label className="form-label">Portfolio Source</label>
              <select 
                value={portfolioType} 
                onChange={(e) => setPortfolioType(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Choose Portfolio Source</option>
                <option value="created">Select from Created Portfolios</option>
                <option value="upload">Upload Files from Device</option>
              </select>
            </div>

            {portfolioType === "created" && (
              <div className="form-group">
                <label className="form-label">Select Portfolio</label>
                <select 
                  value={selectedPortfolio} 
                  onChange={(e) => setSelectedPortfolio(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select Portfolio</option>
                  {userPortfolios.map(portfolio => (
                    <option key={portfolio.id} value={portfolio.id}>
                      {portfolio.title}
                    </option>
                  ))}
                </select>
                {selectedPortfolio && (
                  <div className="portfolio-preview">
                    <h4>{getSelectedPortfolioData()?.title}</h4>
                    <p>{getSelectedPortfolioData()?.content}</p>
                  </div>
                )}
              </div>
            )}

            {portfolioType === "upload" && (
              <div className="form-group">
                <label className="form-label">Upload Files</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="form-input"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                  required
                />
                <div className="form-help">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP
                </div>
                {selectedFiles && (
                  <div className="file-preview">
                    <div className="file-preview-title">Selected Files:</div>
                    <ul className="file-list">
                      {Array.from(selectedFiles).map((file, index) => (
                        <li key={index} className="file-item">{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Review Visibility</label>
              <select 
                value={visibility} 
                onChange={(e) => setVisibility(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Choose Visibility</option>
                <option value="public">Public - Anyone can review</option>
                <option value="private">Private - Only invited reviewers</option>
                <option value="reviewers-only">Reviewers Only - All registered reviewers</option>
              </select>
            </div>

            {visibility === "private" && (
              <div className="form-group">
                <label className="form-label">Specific Reviewers</label>
                <textarea
                  placeholder="Enter reviewer emails separated by commas\ne.g., reviewer1@email.com, reviewer2@email.com"
                  value={specificReviewers}
                  onChange={(e) => setSpecificReviewers(e.target.value)}
                  className="form-textarea"
                />
                <div className="form-help">
                  Only these reviewers will be able to access your portfolio
                </div>
              </div>
            )}

            <div className="submit-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!portfolioType || !visibility || (portfolioType === 'created' && !selectedPortfolio) || (portfolioType === 'upload' && !selectedFiles)}
              >
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitPortfolio