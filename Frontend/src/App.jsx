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



function App() {
  const { user } = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>  {user?.role === "owner" ? <OwnerDashboard /> : <ReviewerDashboard />}  </ProtectedRoute> }/>
        <Route path="/create-portfolio" element={<ProtectedRoute>   <CreatePortfolio /> </ProtectedRoute> }/>
        <Route path="/submit-review" element={  <ProtectedRoute>  <SubmitReview /></ProtectedRoute>}/>
        <Route path="/search-reviewers" element={ <ProtectedRoute> <SearchReviewers /></ProtectedRoute> }/>
        <Route path="/review-requests" element={ <ProtectedRoute> <ReviewRequests /></ProtectedRoute> }/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
