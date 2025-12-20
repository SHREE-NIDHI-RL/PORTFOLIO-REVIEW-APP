import { useContext } from "react"
import { ReviewerContext } from "../context/ReviewerContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/FindReviewer.css"

function FindReviewer() {
  const { reviewers } = useContext(ReviewerContext)

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="find-reviewer-container">
        <div className="find-reviewer-header">
          <h1 className="find-reviewer-title">Find a Reviewer</h1>
          <p className="find-reviewer-subtitle">Browse and connect with professional reviewers</p>
        </div>
        
        <div className="reviewers-grid">
          {reviewers.length === 0 ? (
            <div className="no-reviewers">
              <h3>No reviewers available</h3>
              <p>Check back later for registered reviewers</p>
            </div>
          ) : (
            reviewers.map((reviewer, index) => (
              <div key={index} className="reviewer-card">
                <div className="reviewer-avatar">
                  {reviewer.name.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-info">
                  <h3 className="reviewer-name">{reviewer.name}</h3>
                  <p className="reviewer-email">{reviewer.email}</p>
                  <div className="reviewer-details">
                    <div className="detail-item">
                      <span className="detail-label">Qualifications:</span>
                      <span className="detail-value">{reviewer.qualifications}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Workplace:</span>
                      <span className="detail-value">{reviewer.workplace}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Skills:</span>
                      <span className="detail-value">{reviewer.skills}</span>
                    </div>
                  </div>
                  <button className="contact-reviewer-btn">
                    Contact Reviewer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default FindReviewer