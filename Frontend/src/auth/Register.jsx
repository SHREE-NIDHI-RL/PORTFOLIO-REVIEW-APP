import { useState } from "react"

function Register() {
    const [role, setRole] = useState("")
  return (
    <div>
      <h2>Register</h2>

      <form>
        <input type="text" placeholder="Name" />
        <br />

        <input type="email" placeholder="Email" />
        <br />

        <input type="password" placeholder="Password" />
        <br />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
         <option value="">Select Role</option>
         <option value="owner">Portfolio Owner</option>
          <option value="reviewer">Reviewer</option>
        </select>
        <br />
        {role === "reviewer" && (
  <>
    <br />
    <input type="text" placeholder="Qualifications" />
    <br />
    <input type="text" placeholder="Workplace" />
    <br />
    <input type="text" placeholder="Skills / Domain" />
  </>
)}

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
