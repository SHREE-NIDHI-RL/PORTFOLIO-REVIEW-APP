import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"

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

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Submit Portfolio for Review</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <select 
            value={portfolioType} 
            onChange={(e) => setPortfolioType(e.target.value)}
            className="auth-select"
            required
          >
            <option value="">Choose Portfolio Source</option>
            <option value="created">Select from Created Portfolios</option>
            <option value="upload">Upload Files from Device</option>
          </select>

          {portfolioType === "created" && (
            <select 
              value={selectedPortfolio} 
              onChange={(e) => setSelectedPortfolio(e.target.value)}
              className="auth-select"
              required
            >
              <option value="">Select Portfolio</option>
              {userPortfolios.map(portfolio => (
                <option key={portfolio.id} value={portfolio.id}>
                  {portfolio.title}
                </option>
              ))}
            </select>
          )}

          {portfolioType === "upload" && (
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="auth-input"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
              required
            />
          )}

          <select 
            value={visibility} 
            onChange={(e) => setVisibility(e.target.value)}
            className="auth-select"
            required
          >
            <option value="">Choose Visibility</option>
            <option value="public">Public - Anyone can review</option>
            <option value="private">Private - Only invited reviewers</option>
            <option value="reviewers-only">Reviewers Only - All registered reviewers</option>
          </select>

          {visibility === "private" && (
            <textarea
              placeholder="Enter specific reviewer emails (comma separated)"
              value={specificReviewers}
              onChange={(e) => setSpecificReviewers(e.target.value)}
              className="auth-input"
              rows="3"
            />
          )}

          <button type="submit" className="auth-button">Submit for Review</button>
        </form>
      </div>
    </div>
  )
}

export default SubmitPortfolio