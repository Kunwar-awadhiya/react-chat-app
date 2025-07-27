import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ThemeContext = createContext()

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    default:
      return state
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      dispatch({ type: 'SET_THEME', payload: prefersDark ? 'dark' : 'light' })
    }
  }, [])

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' })

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
