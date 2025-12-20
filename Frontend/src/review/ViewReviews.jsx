import { useContext } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/auth.css"

function ViewReviews() {
  const { portfolios } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)

  // Mock reviews data - in real app this would come from backend
  const mockReviews = [
    {
      portfolioId: 1,
      portfolioTitle: "Web Development Portfolio",
      reviewer: "John Smith",
      score: 8.5,
      feedback: "Great project showcase! The React applications demonstrate solid technical skills. Consider adding more detailed explanations of your problem-solving approach.",
      reviewDate: "2024-01-15",
      status: "completed"
    },
    {
      portfolioId: 2,
      portfolioTitle: "UI/UX Design Portfolio",
      reviewer: "Sarah Johnson", 
      score: 9.2,
      feedback: "Excellent design thinking and user experience focus. The case studies are well-documented. Minor suggestion: add more wireframe examples.",
      reviewDate: "2024-01-12",
      status: "completed"
    },
    {
      portfolioId: 3,
      portfolioTitle: "Mobile App Portfolio",
      reviewer: "Mike Chen",
      score: 7.8,
      feedback: "Good technical implementation. The apps show creativity and functionality. Would benefit from more performance optimization details.",
      reviewDate: "2024-01-10",
      status: "completed"
    }
  ]

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)
  const userReviews = mockReviews.filter(review => 
    userPortfolios.some(portfolio => portfolio.title === review.portfolioTitle)
  )

  const getScoreColor = (score) => {
    if (score >= 9) return "#28a745"
    if (score >= 7) return "#ffc107" 
    return "#dc3545"
  }

  const getScoreLabel = (score) => {
    if (score >= 9) return "Excellent"
    if (score >= 7) return "Good"
    return "Needs Improvement"
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="auth-container">
        <div className="auth-card">
        <h2 className="auth-title">Reviews & Scores</h2>
        
        {userReviews.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No reviews yet. Submit your portfolios for review to see feedback here!</p>
          </div>
        ) : (
          <div className="auth-form">
            <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
                <h3>Overall Statistics</h3>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <div>
                    <strong>Total Reviews:</strong> {userReviews.length}
                  </div>
                  <div>
                    <strong>Average Score:</strong> {
                      (userReviews.reduce((sum, r) => sum + r.score, 0) / userReviews.length).toFixed(1)
                    }/10
                  </div>
                </div>
              </div>
            </div>

            {userReviews.map((review, index) => (
              <div key={index} style={{ padding: "1.5rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ margin: 0 }}>{review.portfolioTitle}</h3>
                  <div style={{ background: getScoreColor(review.score), color: "white", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "bold" }}>
                    {review.score}/10 - {getScoreLabel(review.score)}
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <p><strong>Reviewer:</strong> {review.reviewer}</p>
                  <p><strong>Review Date:</strong> {new Date(review.reviewDate).toLocaleDateString()}</p>
                </div>

                <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "6px", borderLeft: "4px solid #0a66c2" }}>
                  <h4 style={{ margin: "0 0 0.5rem 0" }}>Feedback:</h4>
                  <p style={{ margin: 0, lineHeight: "1.5" }}>{review.feedback}</p>
                </div>

                <div style={{ marginTop: "1rem", padding: "0.5rem", background: "#e8f5e8", borderRadius: "4px", fontSize: "12px", color: "#28a745" }}>
                  ✓ Review Completed
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default ViewReviews