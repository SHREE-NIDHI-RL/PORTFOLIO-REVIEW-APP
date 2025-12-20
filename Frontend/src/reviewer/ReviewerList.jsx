import ReviewerNavbar from "../components/ReviewerNavbar"

function ReviewerList() {
  const reviewers = [
    { name: "Anita", skills: "Frontend", workplace: "Google" },
    { name: "Rahul", skills: "Backend", workplace: "Amazon" },
  ]

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div>
        <h2>Available Reviewers</h2>
      {reviewers.map((r, index) => (
        <div key={index}>
          <p>{r.name}</p>
          <p>{r.skills}</p>
          <p>{r.workplace}</p>
          <button>Request Review</button>
        </div>
      ))}
      </div>
    </div>
  )
}

export default ReviewerList
