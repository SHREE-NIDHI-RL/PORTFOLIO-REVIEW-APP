import { createContext, useState } from "react"

export const ReviewerContext = createContext()

function ReviewerProvider({ children }) {
  const [reviewers, setReviewers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@techcorp.com",
      skills: "Frontend Development, UI/UX Design, React, JavaScript",
      workplace: "TechCorp Solutions",
      qualifications: "PhD Computer Science, 8+ years experience",
      credibility: 95
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@innovate.com",
      skills: "Full-Stack Development, Python, Node.js, AWS",
      workplace: "Innovate Labs",
      qualifications: "Senior Software Engineer, MS Computer Science",
      credibility: 88
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@designstudio.com",
      skills: "Product Design, User Research, Figma, Adobe Creative Suite",
      workplace: "Creative Design Studio",
      qualifications: "Lead Product Designer, 6+ years experience",
      credibility: 92
    },
    {
      id: 4,
      name: "David Kumar",
      email: "david.kumar@datatech.com",
      skills: "Data Science, Machine Learning, Python, SQL",
      workplace: "DataTech Analytics",
      qualifications: "Senior Data Scientist, PhD Statistics",
      credibility: 90
    }
  ])

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