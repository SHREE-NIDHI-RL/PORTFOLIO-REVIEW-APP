import { useState } from "react"
import ReviewerNavbar from "../components/ReviewerNavbar"

function ReviewRequests() {
  const [requests, setRequests] = useState([
    {
      requestId: 1,
      owner: "owner@mail.com",
      portfolio: "UI Portfolio",
      status: "pending"
    }
  ])

  const handleRequest = (requestId, action) => {
    setRequests(requests.map(req => 
      req.requestId === requestId 
        ? { ...req, status: action }
        : req
    ))
    alert(`Request ${action}!`)
  }

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div>
        <h2>Review Requests</h2>

      {requests.map((req) => (
        <div key={req.requestId}>
          <p>Portfolio: {req.portfolio}</p>
          <p>From: {req.owner}</p>
          <p>Status: {req.status}</p>
          {req.status === "pending" && (
            <>
              <button onClick={() => handleRequest(req.requestId, "accepted")}>Accept</button>
              <button onClick={() => handleRequest(req.requestId, "rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
      </div>
    </div>
  )
}

export default ReviewRequests
