import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = { email, role }
    login(userData)
    navigate("/dashboard")
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="owner">Portfolio Owner</option>
          <option value="reviewer">Reviewer</option>
        </select>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
