import calculateCredibility from "./CredibilityScore"

function ReviewerProfile({ reviewer }) {
  const credibility = calculateCredibility(reviewer.reviews || [])

  return (
    <div>
      <h3>{reviewer.name}</h3>
      <p>Workplace: {reviewer.workplace}</p>
      <p>Qualifications: {reviewer.qualifications}</p>
      <p>Credibility Score: {credibility}</p>
    </div>
  )
}

export default ReviewerProfile
