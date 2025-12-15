import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Register() {
  // Step 2: All state variables
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [qualifications, setQualifications] = useState("")
  const [workplace, setWorkplace] = useState("")
  const [skills, setSkills] = useState("")

  // Step 4: useContext to get login function
  const { login } = useContext(AuthContext)

  // Step 4: Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      role,
      qualifications: role === "reviewer" ? qualifications : null,
      workplace: role === "reviewer" ? workplace : null,
      skills: role === "reviewer" ? skills : null,
    }

    login(userData)
    // Optional: redirect to dashboard later
    console.log(userData)
  }

  // Step 3: JSX return
  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="owner">Portfolio Owner</option>
          <option value="reviewer">Reviewer</option>
        </select>
        <br />

        {role === "reviewer" && (
          <>
            <input
              type="text"
              placeholder="Qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Workplace"
              value={workplace}
              onChange={(e) => setWorkplace(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Skills / Domain"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </>
        )}

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
