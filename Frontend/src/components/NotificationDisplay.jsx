import { useEffect, useState } from 'react'
import './NotificationDisplay.css'

function NotificationDisplay({ notifications, removeNotification }) {
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationDisplay