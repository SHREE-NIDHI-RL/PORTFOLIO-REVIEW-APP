import { useState } from "react"

function SearchReviewers() {
  const reviewers = [
    {
      id: 1,
      name: "Anita",
      skills: "Frontend",
      workplace: "Google",
      credibility: 82
    },
    {
      id: 2,
      name: "Rahul",
      skills: "Backend",
      workplace: "Amazon",
      credibility: 75
    }
  ]

  const [query, setQuery] = useState("")
  const [sentRequests, setSentRequests] = useState([])

  const filteredReviewers = reviewers.filter((r) =>
    r.skills.toLowerCase().includes(query.toLowerCase())
  )

  const sendRequest = (reviewerId) => {
    setSentRequests([...sentRequests, reviewerId])
    alert("Review request sent!")
  }

  return (
    <div>
      <h2>Find Reviewers</h2>

      <input
        type="text"
        placeholder="Search by skill"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredReviewers.map((r) => (
        <div key={r.id}>
          <p>Name: {r.name}</p>
          <p>Skills: {r.skills}</p>
          <p>Workplace: {r.workplace}</p>
          <p>Credibility: {r.credibility}</p>
          <button 
            onClick={() => sendRequest(r.id)}
            disabled={sentRequests.includes(r.id)}
          >
            {sentRequests.includes(r.id) ? "Request Sent" : "Send Review Request"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default SearchReviewers
