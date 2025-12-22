import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/auth.css"

function ReviewRequests() {
  const { user } = useContext(AuthContext)
  const { reviewRequests, updateRequestStatus } = useContext(PortfolioContext)
  
  const userRequests = reviewRequests.filter(req => req.reviewerEmail === user?.email)
  const pendingRequests = userRequests.filter(req => req.status === "pending")
  const acceptedRequests = userRequests.filter(req => req.status === "accepted")

  const handleRequest = (requestId, action) => {
    updateRequestStatus(requestId, action)
    alert(`Request ${action}!`)
  }

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "800px" }}>
          <h2 className="auth-title">Review Requests</h2>
          
          {pendingRequests.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h3>Pending Requests</h3>
              {pendingRequests.map((req) => (
                <div key={req.id} style={{ 
                  border: "1px solid #ddd", 
                  padding: "1rem", 
                  margin: "1rem 0", 
                  borderRadius: "8px" 
                }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <h4>Portfolio: {req.portfolioTitle}</h4>
                    <p><strong>From:</strong> {req.ownerName} ({req.ownerEmail})</p>
                    <p><strong>Requested:</strong> {new Date(req.requestDate).toLocaleDateString()}</p>
                  </div>
                  <div style={{ 
                    backgroundColor: "#f8f9fa", 
                    padding: "1rem", 
                    borderRadius: "4px", 
                    marginBottom: "1rem" 
                  }}>
                    <h5>Portfolio Content:</h5>
                    <p>{req.portfolioContent}</p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button 
                      onClick={() => handleRequest(req.id, "accepted")}
                      className="auth-button"
                      style={{ background: "#28a745" }}
                    >
                      Accept & Review
                    </button>
                    <button 
                      onClick={() => handleRequest(req.id, "rejected")}
                      className="auth-button"
                      style={{ background: "#dc3545" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {acceptedRequests.length > 0 && (
            <div>
              <h3>Accepted - Ready to Review</h3>
              {acceptedRequests.map((req) => (
                <div key={req.id} style={{ 
                  border: "1px solid #28a745", 
                  padding: "1rem", 
                  margin: "1rem 0", 
                  borderRadius: "8px",
                  backgroundColor: "#f8fff9"
                }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <h4>Portfolio: {req.portfolioTitle}</h4>
                    <p><strong>From:</strong> {req.ownerName} ({req.ownerEmail})</p>
                    <p><strong>Status:</strong> Ready for Review</p>
                  </div>
                  <div style={{ 
                    backgroundColor: "#ffffff", 
                    padding: "1rem", 
                    borderRadius: "4px", 
                    marginBottom: "1rem" 
                  }}>
                    <h5>Portfolio Content:</h5>
                    <p>{req.portfolioContent}</p>
                  </div>
                  <a 
                    href={`/submit-review?requestId=${req.id}`}
                    className="auth-button"
                    style={{ 
                      textDecoration: "none", 
                      display: "inline-block", 
                      textAlign: "center" 
                    }}
                  >
                    Submit Review
                  </a>
                </div>
              ))}
            </div>
          )}
          
          {userRequests.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p>No review requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewRequests
