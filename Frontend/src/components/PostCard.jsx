import { Link } from "react-router-dom"
import { useContext } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import apiService from "../services/api"

function PostCard({ post, isUserPost = false }) {
  const { setPosts } = useContext(PortfolioContext)

  const handleLike = async () => {
    try {
      const updatedPost = await apiService.likePost(post._id)
      setPosts(prev => prev.map(p => p._id === post._id ? updatedPost : p))
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const handleComment = async () => {
    const comment = prompt('Add a comment:')
    if (comment && comment.trim()) {
      try {
        const updatedPost = await apiService.commentPost(post._id)
        setPosts(prev => prev.map(p => p._id === post._id ? updatedPost : p))
        alert('Comment added!')
      } catch (error) {
        console.error('Error adding comment:', error)
      }
    }
  }

  const handleFileOpen = (fileName) => {
    const fileUrl = `http://localhost:5000/uploads/${fileName}`
    window.open(fileUrl, '_blank')
  }

  return (
    <div className={`post-card ${isUserPost ? 'user-post' : ''}`}>
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">
            {post.authorName.charAt(0).toUpperCase()}
          </div>
          <div className="author-info">
            <h4>
              {post.authorName} 
              {isUserPost && <span className="you-badge">You</span>}
            </h4>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="review-score-badge">
          {post.reviewScore}/10
        </div>
      </div>

      <div className="post-content">
        <h3 className="portfolio-title">Portfolio: {post.portfolioTitle}</h3>
        
        {/* Portfolio Content */}
        <div className="portfolio-content">
          {post.portfolioUploadType === 'file' && post.portfolioFileName && (
            <div style={{ 
              background: "#f8f9fa", 
              padding: "1rem", 
              borderRadius: "8px", 
              marginBottom: "1rem",
              border: "1px solid #dee2e6"
            }}>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>Portfolio File:</h4>
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  transition: "background 0.2s"
                }}
                onClick={() => handleFileOpen(post.portfolioFileName)}
                onMouseOver={(e) => e.target.style.background = "#e9ecef"}
                onMouseOut={(e) => e.target.style.background = "transparent"}
              >
                <span style={{ fontSize: "1.2rem" }}>📄</span>
                <span style={{ fontWeight: "bold", color: "#007bff" }}>{post.portfolioFileName}</span>
                <span style={{ fontSize: "0.8rem", color: "#666" }}>(Click to open)</span>
              </div>
            </div>
          )}
          
          {post.portfolioUploadType === 'link' && post.portfolioExternalLink && (
            <div style={{ 
              background: "#f8f9fa", 
              padding: "1rem", 
              borderRadius: "8px", 
              marginBottom: "1rem",
              border: "1px solid #dee2e6"
            }}>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>Portfolio Link:</h4>
              <a 
                href={post.portfolioExternalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: "#007bff", 
                  textDecoration: "none", 
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>🔗</span>
                {post.portfolioExternalLink}
              </a>
            </div>
          )}
          
          <p className="portfolio-description">
            {post.portfolioContent.substring(0, 200)}...
          </p>
        </div>
        
        <div className="review-section">
          <div className="reviewer-info">
            <strong>Reviewed by: </strong>
            <Link 
              to={`/reviewer-profile/${post.reviewerEmail}`}
              style={{ 
                color: "#007bff", 
                textDecoration: "none", 
                fontWeight: "bold" 
              }}
              onMouseOver={(e) => e.target.style.textDecoration = "underline"}
              onMouseOut={(e) => e.target.style.textDecoration = "none"}
            >
              {post.reviewerName}
            </Link>
          </div>
          
          {/* Structured Feedback */}
          {post.structuredFeedback && (
            <div style={{ marginTop: "1rem" }}>
              {post.structuredFeedback.strengths && (
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong style={{ color: "#28a745" }}>Strengths:</strong>
                  <p style={{ margin: "0.2rem 0", fontSize: "0.9rem" }}>
                    {post.structuredFeedback.strengths.substring(0, 100)}...
                  </p>
                </div>
              )}
              {post.structuredFeedback.suggestions && (
                <div style={{ marginBottom: "0.5rem" }}>
                  <strong style={{ color: "#007bff" }}>Suggestions:</strong>
                  <p style={{ margin: "0.2rem 0", fontSize: "0.9rem" }}>
                    {post.structuredFeedback.suggestions.substring(0, 100)}...
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="review-feedback">
            <p>"{post.reviewFeedback.substring(0, 150)}..."</p>
          </div>
        </div>
      </div>

      <div className="post-footer">
        <div className="post-stats">
          <button className="stat-btn" onClick={handleLike}>
            ❤️ {post.likes} Likes
          </button>
          <button className="stat-btn" onClick={handleComment}>
            💬 {post.comments} Comments
          </button>
        </div>
        <div className="post-actions">
          <button className="action-btn like-btn" onClick={handleLike}>
            👍 Like
          </button>
          <button className="action-btn comment-btn" onClick={handleComment}>
            💬 Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard