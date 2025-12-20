import { useNavigate } from "react-router-dom"

function HomeIcon() {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate("/dashboard")
  }

  return (
    <button 
      onClick={handleHomeClick}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#0a66c2",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      title="Go to Dashboard"
    >
      🏠
    </button>
  )
}

export default HomeIcon