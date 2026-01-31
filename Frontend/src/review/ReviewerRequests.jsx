import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import OwnerNavbar from "../components/OwnerNavbar"
import apiService from "../services/api"
import "../styles/OwnerDashboard.css"
import "../styles/ReviewWorkflow.css"

function ReviewerRequests() {
  const { user } = useContext(AuthContext)
  const { updateRequestStatus } = useContext(PortfolioContext)
  const [reviewerRequests, setReviewerRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviewerRequests = async () => {
      try {
        const requests = await apiService.getReviewerRequests()
        setReviewerRequests(requests)
        setLoading(false)
      } catch (error) {
        console.error('Error loading reviewer requests:', error)
        setLoading(false)
      }
    }
    fetchReviewerRequests()
  }, [])

  const handleAcceptRequest = async (requestId) => {
    try {
      await updateRequestStatus(requestId, "accepted")
      const updatedRequests = await apiService.getReviewerRequests()
      setReviewerRequests(updatedRequests)
      alert("Request accepted! The reviewer can now review your portfolio.")
    } catch (error) {
      console.error('Accept error:', error)
      alert("Error accepting request: " + (error.message || "Unknown error"))
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      await updateRequestStatus(requestId, "rejected")
      const updatedRequests = await apiService.getReviewerRequests()
      setReviewerRequests(updatedRequests)
      alert("Request rejected.")
    } catch (error) {
      console.error('Reject error:', error)
      alert("Error rejecting request: " + (error.message || "Unknown error"))
    }
  }

  if (loading) {
    return (
      <>
        <OwnerNavbar />
        <div className="dashboard-with-navbar">
          <div className="owner-dashboard">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Loading Requests...</h1>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <OwnerNavbar />
      <div className="dashboard-with-navbar">
        <div className="owner-dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Requests from Reviewers</h1>
          </div>

          <div className="dashboard-content">
            <section className="reviews-section">
              <h2 className="section-title">Pending Requests ({reviewerRequests.length})</h2>
              {reviewerRequests.length > 0 ? (
                <div className="reviews-list">
                  {reviewerRequests.map((request) => (
                    <div key={request._id} className="review-item" style={{ border: '2px solid #ffc107' }}>
                      <div className="reviewer-avatar">
                        {request.reviewerName.charAt(0).toUpperCase()}
                      </div>
                      <div className="review-content">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <span className="reviewer-name">{request.reviewerName} wants to review</span>
                            <span className="reviewer-title">Portfolio: {request.portfolioTitle}</span>
                          </div>
                          <span className="review-date">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="review-body">
                          <div className="reviewer-details">
                            <p><strong>Reviewer Email:</strong> {request.reviewerEmail}</p>
                          </div>
                          
                          {request.message && (
                            <div style={{ 
                              background: "#f8f9fa", 
                              padding: "1rem", 
                              borderRadius: "8px", 
                              margin: "1rem 0",
                              borderLeft: "4px solid #007bff"
                            }}>
                              <h4 style={{ margin: "0 0 0.5rem 0", color: "#007bff" }}>Message from Reviewer:</h4>
                              <p style={{ margin: 0, fontStyle: "italic" }}>"{request.message}"</p>
                            </div>
                          )}

                          <div style={{ 
                            background: "#f1f3f4", 
                            padding: "1rem", 
                            borderRadius: "8px", 
                            margin: "1rem 0"
                          }}>
                            <h4 style={{ margin: "0 0 0.5rem 0" }}>Portfolio Preview:</h4>
                            <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
                              {request.portfolioContent.substring(0, 200)}...
                            </p>
                          </div>

                          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                            <button 
                              onClick={() => handleAcceptRequest(request._id)}
                              className="auth-button"
                              style={{ 
                                background: "#28a745", 
                                padding: "0.5rem 1rem", 
                                fontSize: "0.9rem",
                                flex: 1
                              }}
                            >
                              Accept Request
                            </button>
                            <button 
                              onClick={() => handleRejectRequest(request._id)}
                              className="auth-button"
                              style={{ 
                                background: "#dc3545", 
                                padding: "0.5rem 1rem", 
                                fontSize: "0.9rem",
                                flex: 1
                              }}
                            >
                              Reject Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem", background: '#f8f9fa', borderRadius: '8px' }}>
                  <p>No pending requests from reviewers.</p>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>Reviewers can find your public portfolios and send review requests.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewerRequests