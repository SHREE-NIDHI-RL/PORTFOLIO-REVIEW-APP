/*import { useNavigate } from "react-router-dom"
import "../styles/home.css"


function Home() {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)

  const handleClick = () => {
    navigate("/login")
  }

  return (
    <div className="home-container" onClick={handleClick}>
      <h1 className="home-title">Portfolio Review App</h1>
      <p className="home-subtitle">Click anywhere to continue</p>
    </div>
  )
}

export default Home
*/
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "../styles/home.css"

function Home() {
  const navigate = useNavigate()
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(true)

    setTimeout(() => {
      navigate("/login")
    }, 300)
  }

  return (
    <div
      className={`home-container ${active ? "home-active" : ""}`}
      onClick={handleClick}
    >
      <h1 className="home-title">Portfolio Review App</h1>
      <p className="home-subtitle">Click anywhere to continue</p>
    </div>
  )
}

export default Home
