import { createContext, useState } from "react"

export const PortfolioContext = createContext()

function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([])

  const addPortfolio = (portfolio) => {
    const newPortfolio = {
      ...portfolio,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      versions: [{
        version: 1,
        content: portfolio.content,
        createdAt: new Date().toISOString(),
        reviews: []
      }]
    }
    setPortfolios([...portfolios, newPortfolio])
  }

  const addVersion = (portfolioId, content) => {
    setPortfolios(portfolios.map(p => {
      if (p.id === portfolioId) {
        const newVersion = {
          version: p.versions.length + 1,
          content,
          createdAt: new Date().toISOString(),
          reviews: []
        }
        return { ...p, versions: [...p.versions, newVersion] }
      }
      return p
    }))
  }

  return (
    <PortfolioContext.Provider value={{ portfolios, addPortfolio, addVersion }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider