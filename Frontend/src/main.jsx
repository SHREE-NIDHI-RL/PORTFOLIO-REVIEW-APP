import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PortfolioProvider from './context/PortfolioContext.jsx'
import ReviewerProvider from './context/ReviewerContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PortfolioProvider>
        <ReviewerProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ReviewerProvider>
      </PortfolioProvider>
    </AuthProvider>
  </StrictMode>
)
