function calculateCredibility(reviews) {
  if (reviews.length === 0) {
    return 0
  }

  let totalScore = 0

  for (let i = 0; i < reviews.length; i++) {
    totalScore = totalScore + Number(reviews[i].score)
  }

  const averageScore = totalScore / reviews.length

  const credibility = Math.round(
    (reviews.length * 0.6 + averageScore * 0.4) * 10
  )

  return credibility
}

export default calculateCredibility
