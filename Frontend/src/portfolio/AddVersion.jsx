import { useState } from "react"

function AddVersion({ portfolio }) {
  const [content, setContent] = useState("")

  const addVersion = () => {
    const newVersion = {
      version: portfolio.versions.length + 1,
      content,
      createdAt: new Date().toISOString(),
      reviews: []
    }

    portfolio.versions.push(newVersion)
    console.log(portfolio)
  }

  return (
    <div>
      <textarea
        placeholder="Update portfolio based on feedback"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addVersion}>Add New Version</button>
    </div>
  )
}

export default AddVersion
