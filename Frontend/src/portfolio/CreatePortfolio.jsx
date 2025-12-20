import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { PortfolioContext } from "../context/PortfolioContext"
import { useNavigate } from "react-router-dom"
import OwnerNavbar from "../components/OwnerNavbar"
import useForm from "../hooks/useForm"
import useTheme from "../hooks/useTheme"
import "../styles/auth.css"
import "../styles/CreatePortfolio.css"

function CreatePortfolio() {
  const { user } = useContext(AuthContext)
  const { addPortfolio } = useContext(PortfolioContext)
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const { colors } = useTheme()
  
  const { values, handleInputChange, reset } = useForm({
    title: '',
    description: ''
  })

  const portfolioTips = {
    column1: [
      "Keep your portfolio concise and focused on your best work",
      "Include live project links and GitHub repositories",
      "Write clear project descriptions explaining your role and impact"
    ],
    column2: [
      "Use professional language and proofread for errors",
      "Highlight specific technologies and skills used in each project",
      "Include quantifiable achievements and results where possible"
    ]
  }

  const portfolioTools = [
    { name: "Word", icon: "📝", url: "https://www.office.com/launch/word" },
    { name: "Canva", icon: "🎨", url: "https://www.canva.com" },
    { name: "PowerPoint", icon: "📊", url: "https://www.office.com/launch/powerpoint" }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const portfolioData = {
      owner: user.email,
      title: values.title,
      content: values.description
    }
    addPortfolio(portfolioData)
    alert("Portfolio created successfully!")
    reset()
    navigate("/dashboard")
  }

  if (showForm) {
    return (
      <div className="dashboard-with-navbar">
        <OwnerNavbar />
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Create Portfolio</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input 
                type="text" 
                name="title"
                placeholder="Portfolio Title" 
                value={values.title} 
                onChange={handleInputChange} 
                className="auth-input" 
                required
              />
              <textarea    
                name="description"
                placeholder="Describe your portfolio, add links, projects, etc." 
                value={values.description}  
                onChange={handleInputChange}  
                className="auth-input" 
                rows="6" 
                required  
              />
              <button type="submit" className="auth-button">Create Portfolio</button>
              <button 
                type="button"  
                onClick={() => setShowForm(false)} 
                style={{ 
                  background: colors.textSecondary, 
                  color: colors.surface, 
                  marginTop: "0.5rem" 
                }} 
                className="auth-button"
              >   
                Back to Tips
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h1 className="portfolio-title">Create Your Portfolio</h1>
        </div>
        <div className="main-container">
          <div className="tips-section">
            <h2 style={{ 
              textAlign: "center", 
              marginBottom: "2rem", 
              color: colors.text 
            }}> 
              Portfolio Creation Tips 
            </h2>
            <div className="tips-grid">
              <div className="tips-column">
                <h3>Content Guidelines</h3>
                <ul className="tips-list">
                  {portfolioTips.column1.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div className="tips-column">
                <h3>Best Practices</h3>
                <ul className="tips-list">
                  {portfolioTips.column2.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="templates-section">
            <h2 style={{ 
              textAlign: "center", 
              marginBottom: "2rem", 
              color: colors.text 
            }}>
              🛠️ Create Portfolio With
            </h2>
            <div className="templates-grid">
              {portfolioTools.map((tool, index) => (
                <div key={index} className="template-card">
                  <div className="template-image">
                    {tool.icon}
                  </div>
                  <h3 className="template-name">{tool.name}</h3>
                  <a 
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-btn"
                  >
                    Open {tool.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePortfolio