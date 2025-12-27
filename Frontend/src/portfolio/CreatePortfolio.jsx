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
    description: '',
    portfolioFile: null,
    externalLink: '',
    domain: '',
    experienceLevel: '',
    openForReview: false
  })

  const [uploadType, setUploadType] = useState('text') // 'text', 'file', 'link'

  const domains = ['Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design', 'Product Design', 'AI/ML', 'Data Science']
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      handleInputChange({ target: { name: 'portfolioFile', value: file } })
    } else {
      alert('Please select a PDF file')
    }
  }

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
    
    let content = values.description
    if (uploadType === 'file' && values.portfolioFile) {
      content = `PDF Portfolio: ${values.portfolioFile.name}\n\n${values.description}`
    } else if (uploadType === 'link' && values.externalLink) {
      content = `External Portfolio: ${values.externalLink}\n\n${values.description}`
    }
    
    const portfolioData = {
      owner: user.email,
      ownerName: user.name,
      title: values.title,
      content: content,
      uploadType: uploadType,
      externalLink: uploadType === 'link' ? values.externalLink : null,
      fileName: uploadType === 'file' && values.portfolioFile ? values.portfolioFile.name : null,
      domain: values.domain,
      experienceLevel: values.experienceLevel,
      openForReview: values.openForReview,
      private: false
    }
    addPortfolio(portfolioData)
    alert("Portfolio created successfully!")
    reset()
    navigate("/saved-portfolios")
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
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Upload Type:</label>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" value="text" checked={uploadType === 'text'} onChange={(e) => setUploadType(e.target.value)} />
                    Text Description
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" value="file" checked={uploadType === 'file'} onChange={(e) => setUploadType(e.target.value)} />
                    PDF Upload
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="radio" value="link" checked={uploadType === 'link'} onChange={(e) => setUploadType(e.target.value)} />
                    External Link
                  </label>
                </div>
              </div>

              {uploadType === 'file' && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Upload PDF:</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="auth-input"
                    required
                  />
                </div>
              )}

              {uploadType === 'link' && (
                <input
                  type="url"
                  name="externalLink"
                  placeholder="https://your-portfolio-link.com"
                  value={values.externalLink}
                  onChange={handleInputChange}
                  className="auth-input"
                  required
                  style={{ marginBottom: '1rem' }}
                />
              )}
              
              <select
                name="domain"
                value={values.domain}
                onChange={handleInputChange}
                className="auth-input"
                required
              >
                <option value="">Select Domain</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
              <select
                name="experienceLevel"
                value={values.experienceLevel}
                onChange={handleInputChange}
                className="auth-input"
                required
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <textarea    
                name="description"
                placeholder={uploadType === 'text' ? 'Describe your portfolio, add projects, etc.' : 'Add description or additional details...'} 
                value={values.description}  
                onChange={handleInputChange}  
                className="auth-input" 
                rows="6" 
                required={uploadType === 'text'}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  name="openForReview"
                  checked={values.openForReview}
                  onChange={(e) => handleInputChange({ target: { name: 'openForReview', value: e.target.checked } })}
                />
                Make this portfolio open for public review
              </label>
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