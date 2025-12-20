import { useState } from "react"
import OwnerNavbar from "../components/OwnerNavbar"
import "../styles/AddVersion.css"

function AddVersion({ portfolio }) {
  const [content, setContent] = useState("")

  const addVersion = () => {
    const newVersion = {
      version: portfolio.versions.length + 1,
      content,
      createdAt: new Date().toISOString(),
      reviews: []
    }

    portfolio.versions.push(newVersion)
    console.log(portfolio)
    setContent("")
  }

  return (
    <div className="dashboard-with-navbar">
      <OwnerNavbar />
      <div className="add-version-container">
        <div className="add-version-wrapper">
          <div className="add-version-header">
            <h2 className="add-version-title">Add New Version</h2>
            <p className="add-version-subtitle">Update your portfolio based on feedback</p>
          </div>
          
          <div className="add-version-form">
            <div className="form-section">
              <h3 className="section-title">Version Content</h3>
              <textarea
                className="version-textarea"
                placeholder="Enter your updated portfolio content here...\n\nInclude:\n- New projects or achievements\n- Updated skills and technologies\n- Improved descriptions based on feedback\n- Additional certifications or experience"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="textarea-helper">
                Provide detailed updates to showcase your growth and improvements
              </div>
              <div className={`character-count ${
                content.length > 1000 ? 'warning' : ''
              } ${
                content.length > 2000 ? 'error' : ''
              }`}>
                {content.length} characters
              </div>
            </div>
            
            {content && (
              <div className="version-preview">
                <h4 className="preview-title">Preview</h4>
                <div className="preview-content">{content}</div>
              </div>
            )}
            
            <div className="version-actions">
              <button 
                onClick={addVersion}
                className="add-version-btn"
                disabled={!content.trim()}
              >
                Add New Version
              </button>
              <button className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}