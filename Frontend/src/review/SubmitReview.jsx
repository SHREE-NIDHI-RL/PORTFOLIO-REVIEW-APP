import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function SubmitReview() {
  const { user } = useContext(AuthContext)

  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const reviewData = {
      reviewer: {
        name: user.name,
        email: user.email,
        qualifications: user.qualifications,
        workplace: user.workplace,
      },
      score,
      feedback,
      createdAt: new Date().toISOString(),
    }

    console.log(reviewData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Review</h2>

      <label>Score (0–10)</label>
      <input
        type="number"
        min="0"
        max="10"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <textarea
        placeholder="Give detailed feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <button type="submit">Submit Review</button>
    </form>
  )
}

export default SubmitReview
