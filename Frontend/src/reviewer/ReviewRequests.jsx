import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import ReviewerNavbar from "../components/ReviewerNavbar"
import "../styles/ReviewWorkflow.css"

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
      <div style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "2rem", color: "#333" }}>Review Requests</h1>
        
        {pendingRequests.length === 0 && acceptedRequests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
            <h3>No review requests found</h3>
            <p>You'll see portfolio review requests here when owners send them to you.</p>
          </div>
        ) : (
          <div>
            {pendingRequests.map((req) => (
              <div key={req.id} className="review-request-card">
                <div className="request-header">
                  <div>
                    <h3 className="request-title">{req.portfolioTitle}</h3>
                    <p className="request-meta">Requested by: {req.ownerName}</p>
                  </div>
                  <div className="skill-tag">
                    {req.portfolioTitle.includes('UX') ? 'UI/UX Design' : 
                     req.portfolioTitle.includes('Web') ? 'Web Development' :
                     req.portfolioTitle.includes('Mobile') ? 'Mobile Development' : 'Design'}
                  </div>
                </div>
                
                <div style={{ 
                  background: "#f8f9fa", 
                  padding: "1rem", 
                  borderRadius: "8px", 
                  margin: "1rem 0",
                  fontSize: "0.9rem",
                  color: "#666"
                }}>
                  {req.portfolioContent.substring(0, 200)}...
                </div>
                
                <div className="request-actions">
                  <button 
                    onClick={() => handleRequest(req.id, "accepted")}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => handleRequest(req.id, "rejected")}
                    className="decline-btn"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
            
            {acceptedRequests.map((req) => (
              <div key={req.id} className="review-request-card" style={{ border: "2px solid #d4edda" }}>
                <div className="request-header">
                  <div>
                    <h3 className="request-title">{req.portfolioTitle}</h3>
                    <p className="request-meta">Requested by: {req.ownerName}</p>
                  </div>
                  <div className="accepted-badge">
                    Accepted
                  </div>
                </div>
                
                <div style={{ 
                  background: "#f8f9fa", 
                  padding: "1rem", 
                  borderRadius: "8px", 
                  margin: "1rem 0",
                  fontSize: "0.9rem",
                  color: "#666"
                }}>
                  {req.portfolioContent}
                </div>
                
                <div className="request-actions">
                  <a 
                    href={`/submit-review?requestId=${req.id}`}
                    className="accept-btn"
                    style={{ 
                      textDecoration: "none", 
                      display: "block", 
                      textAlign: "center",
                      background: "#28a745"
                    }}
                  >
                    Submit Review
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewRequests
