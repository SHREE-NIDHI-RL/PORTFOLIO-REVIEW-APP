import { createContext, useState } from "react"

export const ReviewerContext = createContext()

function ReviewerProvider({ children }) {
  const [reviewers, setReviewers] = useState([
    {
      id: 1,
      name: "Anita",
      email: "anita@example.com",
      skills: "Frontend",
      workplace: "Google",
      qualifications: "Senior Developer",
      credibility: 82
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@example.com",
      skills: "Backend",
      workplace: "Amazon",
      qualifications: "Tech Lead",
      credibility: 75
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