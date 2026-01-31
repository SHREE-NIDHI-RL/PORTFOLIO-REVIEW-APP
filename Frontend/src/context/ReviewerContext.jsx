import { createContext, useState, useEffect, useContext } from "react"
import { AuthContext } from "./AuthContext"

export const ReviewerContext = createContext()

function ReviewerProvider({ children }) {
  const { token } = useContext(AuthContext) || {}
  
  // Keep the original hardcoded reviewers for UI
  const getDefaultReviewers = () => {
    const defaultUsers = [
      {
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@techcorp.com",
        password: "password123",
        role: "reviewer",
        skills: "Frontend Development, UI/UX Design, React, JavaScript",
        workplace: "TechCorp Solutions",
        qualifications: "PhD Computer Science, 8+ years experience"
      },
      {
        name: "Michael Chen",
        email: "michael.chen@innovate.com",
        password: "password123",
        role: "reviewer",
        skills: "Full-Stack Development, Python, Node.js, AWS",
        workplace: "Innovate Labs",
        qualifications: "Senior Software Engineer, MS Computer Science"
      },
      {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@designstudio.com",
        password: "password123",
        role: "reviewer",
        skills: "Product Design, User Research, Figma, Adobe Creative Suite",
        workplace: "Creative Design Studio",
        qualifications: "Lead Product Designer, 6+ years experience"
      }
    ]
    
    return defaultUsers.map((user, index) => ({
      id: index + 1,
      name: user.name,
      email: user.email,
      skills: user.skills,
      workplace: user.workplace,
      qualifications: user.qualifications,
      credibilityScore: [4.8, 4.6, 4.7][index]
    }))
  }

  const [reviewers, setReviewers] = useState(getDefaultReviewers())
  const [loading, setLoading] = useState(false)

  const addReviewer = (reviewer) => {
    const newReviewer = {
      ...reviewer,
      id: Date.now(),
      credibilityScore: 4.5
    }
    setReviewers([...reviewers, newReviewer])
  }

  const fetchReviewers = () => {
    // Keep original reviewers, no need to fetch from API for UI
    return reviewers
  }

  return (
    <ReviewerContext.Provider value={{ reviewers, addReviewer, loading, fetchReviewers }}>
      {children}
    </ReviewerContext.Provider>
  )
}

export default ReviewerProvider