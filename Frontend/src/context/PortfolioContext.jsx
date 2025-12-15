import { createContext, useState } from "react"

export const PortfolioContext = createContext()

function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([])

  const addPortfolio = (portfolio) => {
    const newPortfolio = {
      ...portfolio,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setPortfolios([...portfolios, newPortfolio])
  }

  return (
    <PortfolioContext.Provider value={{ portfolios, addPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider