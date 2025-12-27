import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"
import apiService from "../services/api"

export const PortfolioContext = createContext()

function PortfolioProvider({ children }) {
  const { user } = useContext(AuthContext)
  const [portfolios, setPortfolios] = useState([])
  const [reviewRequests, setReviewRequests] = useState([])
  const [posts, setPosts] = useState([])
  const [reviewers, setReviewers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        loadPortfolios(),
        loadReviewRequests(),
        loadPosts(),
        loadReviewers()
      ])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPortfolios = async () => {
    try {
      if (user?.role === 'owner') {
        const data = await apiService.getMyPortfolios()
        setPortfolios(data)
      } else {
        const data = await apiService.getPublicPortfolios()
        setPortfolios(data)
      }
    } catch (error) {
      console.error('Error loading portfolios:', error)
    }
  }

  const loadReviewRequests = async () => {
    try {
      if (user?.role === 'reviewer') {
        const data = await apiService.getReviewRequests()
        setReviewRequests(data)
      } else {
        const data = await apiService.getMyReviews()
        setReviewRequests(data)
      }
    } catch (error) {
      console.error('Error loading review requests:', error)
    }
  }

  const loadPosts = async () => {
    try {
      const data = await apiService.getPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
    }
  }

  const loadReviewers = async () => {
    try {
      const data = await apiService.getReviewers()
      setReviewers(data)
    } catch (error) {
      console.error('Error loading reviewers:', error)
    }
  }

  const addPortfolio = async (portfolioData) => {
    try {
      const newPortfolio = await apiService.createPortfolio(portfolioData)
      setPortfolios([newPortfolio, ...portfolios])
      return newPortfolio
    } catch (error) {
      console.error('Error creating portfolio:', error)
      throw error
    }
  }

  const addVersion = async (portfolioId, content) => {
    try {
      const updatedPortfolio = await apiService.addPortfolioVersion(portfolioId, content)
      setPortfolios(portfolios.map(p => 
        p._id === portfolioId ? updatedPortfolio : p
      ))
      return updatedPortfolio
    } catch (error) {
      console.error('Error adding version:', error)
      throw error
    }
  }

  const updatePortfolioVisibility = async (portfolioId, versionNumber, isPublic) => {
    try {
      const updatedPortfolio = await apiService.updatePortfolioVisibility(
        portfolioId, 
        versionNumber, 
        isPublic
      )
      setPortfolios(portfolios.map(p => 
        p._id === portfolioId ? updatedPortfolio : p
      ))
      return updatedPortfolio
    } catch (error) {
      console.error('Error updating portfolio visibility:', error)
      throw error
    }
  }

  const sendReviewRequest = async (portfolioId, reviewerEmail, message = "") => {
    try {
      const request = await apiService.sendReviewRequest({
        portfolioId,
        reviewerEmail,
        message
      })
      setReviewRequests([request, ...reviewRequests])
      return request
    } catch (error) {
      console.error('Error sending review request:', error)
      throw error
    }
  }

  const updateRequestStatus = async (requestId, status) => {
    try {
      const updatedRequest = await apiService.updateReviewStatus(requestId, status)
      setReviewRequests(reviewRequests.map(req => 
        req._id === requestId ? updatedRequest : req
      ))
      return updatedRequest
    } catch (error) {
      console.error('Error updating request status:', error)
      throw error
    }
  }

  const submitReview = async (requestId, reviewData) => {
    try {
      const completedReview = await apiService.submitReview(requestId, reviewData)
      setReviewRequests(reviewRequests.map(req => 
        req._id === requestId ? completedReview : req
      ))
      return completedReview
    } catch (error) {
      console.error('Error submitting review:', error)
      throw error
    }
  }

  const addPost = async (reviewId) => {
    try {
      const newPost = await apiService.createPost(reviewId)
      setPosts([newPost, ...posts])
      return newPost
    } catch (error) {
      console.error('Error creating post:', error)
      throw error
    }
  }

  const getReviewerByEmail = (email) => {
    return reviewers.find(reviewer => reviewer.email === email)
  }

  return (
    <PortfolioContext.Provider value={{ 
      portfolios, 
      reviewRequests,
      posts,
      reviewers,
      loading,
      addPortfolio, 
      addVersion, 
      updatePortfolioVisibility,
      sendReviewRequest, 
      updateRequestStatus,
      submitReview,
      addPost,
      getReviewerByEmail,
      loadData
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider