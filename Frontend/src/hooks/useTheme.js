import { useState, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState('light')

  const colors = {
    light: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      secondary: '#1e293b',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#059669',
      successHover: '#047857',
      error: '#ef4444',
      errorHover: '#dc2626'
    },
    dark: {
      primary: '#60a5fa',
      primaryHover: '#3b82f6',
      secondary: '#f1f5f9',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#10b981',
      successHover: '#059669',
      error: '#f87171',
      errorHover: '#ef4444'
    }
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const getCurrentColors = () => colors[theme]

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return {
    theme,
    colors: getCurrentColors(),
    toggleTheme
  }
}

export default useTheme