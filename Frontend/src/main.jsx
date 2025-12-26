import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PortfolioProvider from './context/PortfolioContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

function ErrorBoundary({ children }) {
  try {
    return children
  } catch (error) {
    console.error('Error in app:', error)
    return <div>Something went wrong. Check console for details.</div>
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <PortfolioProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </PortfolioProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
)
