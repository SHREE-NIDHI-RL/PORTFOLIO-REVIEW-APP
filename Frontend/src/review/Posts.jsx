import { useContext } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import OwnerNavbar from "../components/OwnerNavbar"
import ReviewerNavbar from "../components/ReviewerNavbar"
import UserProfile from "../components/UserProfile"
import "../styles/Posts.css"

function Posts() {
  const { posts } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)

  const userPosts = posts.filter(post => post.authorEmail === user?.email)
  const allPosts = posts.sort((a, b) => new Date(b.postDate || b.createdAt) - new Date(a.postDate || a.createdAt))

  return (
    <div className="dashboard-with-navbar">
      {user?.role === "owner" ? <OwnerNavbar /> : <ReviewerNavbar />}
      <UserProfile />
      <div className="posts-container">
        <div className="posts-header">
          <h1 className="posts-title">Portfolio Posts</h1>
          <p className="posts-subtitle">Share your portfolios and reviews with the community</p>
        </div>

        <div className="posts-stats">
          <div className="stat-card">
            <h3>Your Posts</h3>
            <span className="stat-number">{userPosts.length}</span>
          </div>
        </div>

        {allPosts.length === 0 ? (
          <div className="no-posts">
            <h3>No posts yet</h3>
            <p>Create posts by clicking the "Post" button on your portfolio reviews</p>
          </div>
        ) : (
          <div className="posts-feed">
            {allPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-author">
                    <div className="author-avatar">
                      {post.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="author-info">
                      <h4>{post.authorName}</h4>
                      <span className="post-date">
                        {new Date(post.postDate || post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="review-score-badge">
                    {post.reviewScore}/10
                  </div>
                </div>

                <div className="post-content">
                  <h3 className="portfolio-title">Portfolio: {post.portfolioTitle}</h3>
                  <p className="portfolio-description">
                    {post.portfolioContent.substring(0, 200)}...
                  </p>
                  
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
                    <div className="review-feedback">
                      <p>"{post.reviewFeedback.substring(0, 150)}..."</p>
                    </div>
                  </div>
                </div>

                <div className="post-footer">
                  <div className="post-stats">
                    <button className="stat-btn">
                      ❤️ {post.likes} Likes
                    </button>
                    <button className="stat-btn">
                      💬 {post.comments} Comments
                    </button>
                  </div>
                  <div className="post-actions">
                    <button className="action-btn like-btn">
                      👍 Like
                    </button>
                    <button className="action-btn comment-btn">
                      💬 Comment
                    </button>
                    <button className="action-btn share-btn">
                      📤 Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts