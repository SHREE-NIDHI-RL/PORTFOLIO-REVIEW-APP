import { useContext } from "react"
import { PortfolioContext } from "../context/PortfolioContext"
import { AuthContext } from "../context/AuthContext"
import OwnerNavbar from "../components/OwnerNavbar"
import ReviewerNavbar from "../components/ReviewerNavbar"
import UserProfile from "../components/UserProfile"
import PostCard from "../components/PostCard"
import "../styles/Posts.css"

function Posts() {
  const { posts } = useContext(PortfolioContext)
  const { user } = useContext(AuthContext)

  const userPosts = posts.filter(post => post.authorEmail === user?.email)
  const otherPosts = posts.filter(post => post.authorEmail !== user?.email)
  const sortedUserPosts = userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const sortedOtherPosts = otherPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

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
          <div className="stat-card">
            <h3>Total Posts</h3>
            <span className="stat-number">{posts.length}</span>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="no-posts">
            <h3>No posts yet</h3>
            <p>Create posts by clicking the "Post" button on your portfolio reviews</p>
          </div>
        ) : (
          <div className="posts-feed">
            {/* User's Posts Section */}
            {sortedUserPosts.length > 0 && (
              <>
                <div className="section-header">
                  <h2>Your Posts ({sortedUserPosts.length})</h2>
                </div>
                {sortedUserPosts.map(post => (
                  <PostCard key={post._id} post={post} isUserPost={true} />
                ))}
              </>
            )}

            {/* Other Posts Section */}
            {sortedOtherPosts.length > 0 && (
              <>
                <div className="section-header">
                  <h2>Community Posts ({sortedOtherPosts.length})</h2>
                </div>
                {sortedOtherPosts.map(post => (
                  <PostCard key={post._id} post={post} isUserPost={false} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts