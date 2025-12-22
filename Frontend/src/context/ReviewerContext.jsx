import { createContext, useState } from "react"

export const ReviewerContext = createContext()

function ReviewerProvider({ children }) {
  // Get default reviewers from AuthContext
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
      credibility: [95, 88, 92][index]
    }))
  }

  const [reviewers, setReviewers] = useState(getDefaultReviewers())

  const addReviewer = (reviewer) => {
    const newReviewer = {
      ...reviewer,
      id: Date.now(),
      credibility: 50
    }
    setReviewers([...reviewers, newReviewer])
  }

  return (
    <ReviewerContext.Provider value={{ reviewers, addReviewer }}>
      {children}
    </ReviewerContext.Provider>
  )
}

export default ReviewerProvider