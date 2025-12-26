import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import OwnerDashboard from "./dashboard/OwnerDashboard"
import ReviewerDashboard from "./dashboard/ReviewerDashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import CreatePortfolio from "./portfolio/CreatePortfolio"
import SubmitReview from "./review/SubmitReview"
import SearchReviewers from "./reviewer/SearchReviewers"
import ReviewRequests from "./reviewer/ReviewRequests"
import AssignedReviews from "./reviewer/AssignedReviews"
import ReviewHistory from "./reviewer/ReviewHistory"
import PortfolioExploration from "./reviewer/PortfolioExploration"
import FindReviewer from "./reviewer/FindReviewer"
import ReviewerProfileView from "./reviewer/ReviewerProfileView"
import Home from "./pages/Home"
import SubmitPortfolio from "./portfolio/SubmitPortfolio"
import SavedPortfolios from "./portfolio/SavedPortfolios"
import PortfolioVersions from "./portfolio/PortfolioVersions"
import ViewReviews from "./review/ViewReviews"
import ViewFeedback from "./review/ViewFeedback"
import Posts from "./review/Posts"
import NotificationDisplay from "./components/NotificationDisplay"
import { useNotificationContext } from "./context/NotificationContext"

function App() {
  const { user } = useContext(AuthContext)
  const { notifications, removeNotification } = useNotificationContext()

  // Add error boundary
  try {
    return (
      <BrowserRouter>
        <NotificationDisplay 
          notifications={notifications} 
          removeNotification={removeNotification} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute>  {user?.role === "owner" ? <OwnerDashboard /> : <ReviewerDashboard />}  </ProtectedRoute> }/>
          <Route path="/create-portfolio" element={<ProtectedRoute>   <CreatePortfolio /> </ProtectedRoute> }/>
          <Route path="/find-reviewer" element={<ProtectedRoute>   <FindReviewer /> </ProtectedRoute> }/>
          <Route path="/submit-review" element={  <ProtectedRoute>  <SubmitReview /></ProtectedRoute>}/>
          <Route path="/search-reviewers" element={ <ProtectedRoute> <SearchReviewers /></ProtectedRoute> }/>
          <Route path="/review-requests" element={ <ProtectedRoute> <ReviewRequests /></ProtectedRoute> }/>
          <Route path="/assigned-reviews" element={ <ProtectedRoute> <AssignedReviews /></ProtectedRoute> }/>
          <Route path="/review-history" element={ <ProtectedRoute> <ReviewHistory /></ProtectedRoute> }/>
          <Route path="/portfolio-exploration" element={ <ProtectedRoute> <PortfolioExploration /></ProtectedRoute> }/>
          <Route path="/submit-portfolio" element={ <ProtectedRoute> <SubmitPortfolio /></ProtectedRoute> }/>
          <Route path="/saved-portfolios" element={ <ProtectedRoute> <SavedPortfolios /></ProtectedRoute> }/>
          <Route path="/posts" element={ <ProtectedRoute> <Posts /></ProtectedRoute> }/>
          <Route path="/portfolio-versions" element={ <ProtectedRoute> <PortfolioVersions /></ProtectedRoute> }/>
          <Route path="/view-reviews" element={ <ProtectedRoute> <ViewReviews /></ProtectedRoute> }/>
          <Route path="/view-feedback" element={ <ProtectedRoute> <ViewFeedback /></ProtectedRoute> }/>
          <Route path="/reviewer-profile/:reviewerEmail" element={ <ProtectedRoute> <ReviewerProfileView /></ProtectedRoute> }/>
        </Routes>
      </BrowserRouter>
    )
  } catch (error) {
    console.error('App error:', error)
    return <div style={{ padding: '20px' }}>Error loading app. Check console.</div>
  }
}

export default App
