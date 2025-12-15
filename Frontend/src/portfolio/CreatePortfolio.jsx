import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { useNavigate } from "react-router-dom"
import "../styles/auth.css"

function CreatePortfolio() {
  const { user } = useContext(AuthContext)
  const { addPortfolio } = useContext(PortfolioContext)
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const portfolioData = {
      owner: user.email,
      title,
      content: description
    }
    addPortfolio(portfolioData)
    alert("Portfolio created successfully!")
    navigate("/dashboard")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Portfolio</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Portfolio Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="auth-input"
            required
          />
          <textarea
            placeholder="Describe your portfolio, add links, projects, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="auth-input"
            rows="6"
            required
          />
          <button type="submit" className="auth-button">Create Portfolio</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePortfolio
