import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import PortfolioProvider from './context/PortfolioContext.jsx'
import ReviewerProvider from './context/ReviewerContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

function ErrorBoundary({ children }) {
  try {
    return children
  } catch (error) {
    console.error('Error in app:', error)
    return <div style={{ padding: '20px', color: 'red' }}>Something went wrong. Check console for details.</div>
  }
}

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <ReviewerProvider>
            <PortfolioProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </PortfolioProvider>
          </ReviewerProvider>
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>
  )
} catch (error) {
  console.error('Failed to render app:', error)
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Failed to load app. Check console for details.</div>'
}
