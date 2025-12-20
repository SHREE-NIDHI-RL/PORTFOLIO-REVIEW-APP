import { useState, useContext } from "react"
import { ReviewerContext } from "../context/ReviewerContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/SearchReviewers.css"

function SearchReviewers() {
  const { reviewers } = useContext(ReviewerContext)
  const [query, setQuery] = useState("")
  const [sentRequests, setSentRequests] = useState([])

  const filteredReviewers = reviewers.filter((r) =>
    r.skills.toLowerCase().includes(query.toLowerCase()) ||
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.workplace.toLowerCase().includes(query.toLowerCase())
  )

  const sendRequest = (reviewerId) => {
    setSentRequests([...sentRequests, reviewerId])
    alert("Review request sent!")
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="search-reviewers-container">
        <div className="search-header">
          <h2 className="search-title">Find Reviewers</h2>
          <p className="search-subtitle">Connect with industry professionals for portfolio reviews</p>
        </div>

        <div className="search-bar-section">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search by name, skills, or workplace..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
            />
          </div>
        </div>

        {query && (
          <div className="results-count">
            Found <strong>{filteredReviewers.length}</strong> reviewer{filteredReviewers.length !== 1 ? 's' : ''}
          </div>
        )}

        {filteredReviewers.length === 0 && query ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No reviewers found</h3>
            <p className="empty-state-text">Try adjusting your search terms</p>
          </div>
        ) : filteredReviewers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3 className="empty-state-title">Start searching</h3>
            <p className="empty-state-text">Enter skills, names, or workplaces to find reviewers</p>
          </div>
        ) : (
          <div className="reviewers-grid">
            {filteredReviewers.map((reviewer) => (
              <div key={reviewer.id} className="reviewer-card">
                <div className="reviewer-header">
                  <div className="reviewer-avatar">
                    {reviewer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-info">
                    <h3 className="reviewer-name">{reviewer.name}</h3>
                    <p className="reviewer-workplace">{reviewer.workplace}</p>
                  </div>
                </div>

                <div className="reviewer-details">
                  <div className="detail-row">
                    <span className="detail-label">Skills:</span>
                    <div className="skills-tags">
                      {reviewer.skills.split(',').map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Rating:</span>
                    <div className="credibility-badge">
                      {reviewer.credibility}/5
                    </div>
                  </div>
                </div>

                <div className="reviewer-actions">
                  <button 
                    className="send-request-btn"
                    onClick={() => sendRequest(reviewer.id)} 
                    disabled={sentRequests.includes(reviewer.id)}
                  >
                    {sentRequests.includes(reviewer.id) ? "Request Sent" : "Send Request"}
                  </button>
                  <button className="view-profile-btn">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchReviewers
