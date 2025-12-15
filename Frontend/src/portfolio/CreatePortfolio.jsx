import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function CreatePortfolio() {
  const { user } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState("private")

  const handleSubmit = (e) => {
    e.preventDefault()

    const portfolioData = {
          owner: user.email,
          title,
          visibility,
          versions: [
        {
            version: 1,
            content: description,
            createdAt: new Date().toISOString(),
            reviews: []
        }
       ]
    }


    console.log(portfolioData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Portfolio</h2>

      <input
        type="text"
        placeholder="Portfolio Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Describe your portfolio"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
        <option value="private">Private (Only Me)</option>
        <option value="reviewer">Reviewer Only</option>
        <option value="public">Public</option>
      </select>

      <button type="submit">Save Portfolio</button>
    </form>
  )
}

export default CreatePortfolio
