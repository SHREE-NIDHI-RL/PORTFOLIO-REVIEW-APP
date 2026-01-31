import { createContext, useState, useEffect, useContext, useCallback } from "react"
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

  const loadData = useCallback(async () => {
    if (!user || loading) return
    
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
  }, [user])

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadPortfolios = async () => {
    try {
      const data = await apiService.getMyPortfolios()
      console.log('Loaded portfolios:', data)
      setPortfolios(data)
    } catch (error) {
      console.error('Error loading portfolios:', error)
      setPortfolios([])
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

  const loadCompletedReviews = async () => {
    try {
      if (user?.role === 'owner') {
        const data = await apiService.getCompletedReviews()
        return data
      }
      return []
    } catch (error) {
      console.error('Error loading completed reviews:', error)
      return []
    }
  }

  const loadReviewerHistory = async () => {
    try {
      if (user?.role === 'reviewer') {
        const data = await apiService.getReviewerHistory()
        return data
      }
      return []
    } catch (error) {
      console.error('Error loading reviewer history:', error)
      return []
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
      console.log('Loaded reviewers:', data)
      setReviewers(data)
    } catch (error) {
      console.error('Error loading reviewers:', error)
      setReviewers([])
    }
  }

  const addPortfolio = async (portfolioData) => {
    try {
      const newPortfolio = await apiService.createPortfolio(portfolioData)
      setPortfolios(prev => [newPortfolio, ...prev])
      return newPortfolio
    } catch (error) {
      console.error('Error creating portfolio:', error)
      throw error
    }
  }

  const addVersion = async (portfolioId, content) => {
    try {
      const updatedPortfolio = await apiService.addPortfolioVersion(portfolioId, content)
      setPortfolios(prev => prev.map(p => 
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
      setPortfolios(prev => prev.map(p => 
        p._id === portfolioId ? updatedPortfolio : p
      ))
      return updatedPortfolio
    } catch (error) {
      console.error('Error updating portfolio visibility:', error)
      throw error
    }
  }

  const sendReviewerRequest = async (portfolioId, message = "") => {
    try {
      const request = await apiService.sendReviewerRequest({
        portfolioId,
        message
      })
      return request
    } catch (error) {
      console.error('Error sending reviewer request:', error)
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
      setReviewRequests(prev => [request, ...prev])
      return request
    } catch (error) {
      console.error('Error sending review request:', error)
      throw error
    }
  }

  const updateRequestStatus = async (requestId, status) => {
    try {
      const updatedRequest = await apiService.updateReviewStatus(requestId, status)
      setReviewRequests(prev => prev.map(req => 
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
      setReviewRequests(prev => prev.map(req => 
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
      setPosts(prev => [newPost, ...prev])
      // Reload review requests to update the posted status
      await loadReviewRequests()
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
      setPosts,
      reviewers,
      loading,
      addPortfolio, 
      addVersion, 
      updatePortfolioVisibility,
      sendReviewRequest,
      sendReviewerRequest, 
      updateRequestStatus,
      submitReview,
      addPost,
      getReviewerByEmail,
      loadData,
      loadCompletedReviews,
      loadReviewerHistory
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider