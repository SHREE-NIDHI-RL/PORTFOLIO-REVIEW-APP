import { useContext } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import "../styles/auth.css"

function SavedPortfolios() {
  const { portfolios } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)

  const userPortfolios = portfolios.filter(p => p.owner === user?.email)

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Saved Portfolios</h2>
        {userPortfolios.length === 0 ? (
          <p>No portfolios created yet. Create your first portfolio!</p>
        ) : (
          <div className="auth-form">
            {userPortfolios.map(portfolio => (
              <div key={portfolio.id} style={{
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}>
                <h3>{portfolio.title}</h3>
                <p>{portfolio.content}</p>
                <small>Created: {new Date(portfolio.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPortfolios