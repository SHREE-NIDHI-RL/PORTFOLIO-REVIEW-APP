import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/OwnerDashboard.css"

function OwnerDashboard() {
  const { user } = useContext(AuthContext)

  const portfolios = [
    {
      id: 1,
      title: "Web Developer Portfolio",
      version: 3,
      status: "Reviewed",
      lastUpdated: "2 days ago",
      template: "Developer",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='100' viewBox='0 0 180 100'%3E%3Crect width='180' height='100' fill='%23e5e7eb'/%3E%3Ctext x='90' y='55' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3ECity Skyline%3C/text%3E%3C/svg%3E"
    },
    {
      id: 2,
      title: "UX Design Portfolio",
      version: 1,
      status: "Submitted",
      lastUpdated: "Pending Review",
      template: "Designer",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='100' viewBox='0 0 180 100'%3E%3Crect width='180' height='100' fill='%23d1d5db'/%3E%3Ctext x='90' y='55' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3EUrban View%3C/text%3E%3C/svg%3E"
    },
    {
      id: 3,
      title: "Cybersecurity Portfolio",
      version: 2,
      status: "Draft",
      lastUpdated: "Last Edited: 5 days ago",
      template: "Technical",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='100' viewBox='0 0 180 100'%3E%3Crect width='180' height='100' fill='%23bfdbfe'/%3E%3Ctext x='90' y='55' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3EOcean View%3C/text%3E%3C/svg%3E"
    }
  ]

  const recentReviews = [
    {
      id: 1,
      reviewerName: "Anjali Patel",
      reviewerTitle: "UI/UX Expert",
      date: "April 21, 2024",
      rating: "8.5/10",
      comment: "Great UI design, but consider improving the accessibility of your forms.",
      avatar: "A"
    },
    {
      id: 2,
      reviewerName: "Mark Jenson",
      reviewerTitle: "Senior Developer",
      date: "April 18, 2024",
      rating: "7/10",
      comment: "Solid projects, but detail your backend architecture more.",
      avatar: "M"
    }
  ]

  return (
    <>
      <OwnerNavbar />
      <div className="dashboard-with-navbar">
        <div className="owner-dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Portfolio Review Dashboard</h1>
            <button className="create-new-btn">
              <span className="btn-icon">+</span>
              Create New Portfolio
              <span className="dropdown-arrow">⌄</span>
            </button>
          </div>

          <div className="dashboard-content">
            <section className="portfolios-section">
              <h2 className="section-title">Saved Portfolios</h2>
              <div className="portfolios-grid">
                {portfolios.map(portfolio => (
                  <div key={portfolio.id} className="portfolio-item">
                    <div className="portfolio-content">
                      <div className="portfolio-info">
                        <h3 className="portfolio-title">{portfolio.title}</h3>
                        <p className="portfolio-meta">
                          Version {portfolio.version} - {portfolio.status} {portfolio.lastUpdated}
                        </p>
                        <div className="portfolio-tags">
                          <span className="template-tag">Template: {portfolio.template}</span>
                          <span className={`status-tag status-${portfolio.status.toLowerCase()}`}>
                            Status: {portfolio.status}
                          </span>
                        </div>
                        <div className="portfolio-actions">
                          {portfolio.status === "Reviewed" && (
                            <>
                              <button className="action-btn primary">View Feedback</button>
                              <button className="action-btn secondary">Create New Version</button>
                              <button className="action-btn more">More ⌄</button>
                            </>
                          )}
                          {portfolio.status === "Submitted" && (
                            <>
                              <button className="action-btn primary">View Submission</button>
                              <button className="action-btn secondary">Cancel Request</button>
                            </>
                          )}
                          {portfolio.status === "Draft" && (
                            <>
                              <button className="action-btn primary">Edit Portfolio</button>
                              <button className="action-btn more">Delete ⌄</button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="portfolio-image">
                        <img src={portfolio.image} alt={portfolio.title} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="reviews-section">
              <h2 className="section-title">Recent Reviews</h2>
              <div className="reviews-list">
                {recentReviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="reviewer-avatar">{review.avatar}</div>
                    <div className="review-content">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">Reviewed by {review.reviewerName}</span>
                          <span className="reviewer-title">{review.reviewerTitle}</span>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="review-body">
                        <span className="review-rating">{review.rating}</span>
                        <div className="review-text">
                          <p className="review-comment">"{review.comment}"</p>
                          <Link to="/view-reviews" className="read-full-link">Read Full Feedback →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default OwnerDashboard