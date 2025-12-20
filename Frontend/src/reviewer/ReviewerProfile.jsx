import calculateCredibility from "./CredibilityScore"
import ReviewerNavbar from "../components/ReviewerNavbar"

function ReviewerProfile({ reviewer }) {
  const credibility = calculateCredibility(reviewer.reviews || [])

  return (
    <div className="dashboard-with-navbar">
      <ReviewerNavbar />
      <div>
        <h3>{reviewer.name}</h3>
      <p>Workplace: {reviewer.workplace}</p>
      <p>Qualifications: {reviewer.qualifications}</p>
        <p>Credibility Score: {credibility}</p>
      </div>
    </div>
  )
}

export default ReviewerProfile
