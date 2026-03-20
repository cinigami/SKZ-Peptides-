import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
    
    // Check if there's a saved preference
    try {
      const saved = localStorage.getItem('darkMode')
      if (saved !== null) {
        setDarkMode(JSON.parse(saved))
      } else {
        // Default to system preference
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    } catch (error) {
      console.log('Theme loading error:', error)
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    try {
      // Update document class
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      // Save preference
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    } catch (error) {
      console.log('Theme update error:', error)
    }
  }, [darkMode, mounted])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}