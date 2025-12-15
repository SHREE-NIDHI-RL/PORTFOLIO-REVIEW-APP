import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PortfolioProvider from './context/PortfolioContext.jsx'
import ReviewerProvider from './context/ReviewerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PortfolioProvider>
        <ReviewerProvider>
          <App />
        </ReviewerProvider>
      </PortfolioProvider>
    </AuthProvider>
  </StrictMode>
)
