import { createContext, useContext } from 'react'
import useNotification from '../hooks/useNotification'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const notificationMethods = useNotification()
  
  return (
    <NotificationContext.Provider value={notificationMethods}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider')
  }
  return context
}