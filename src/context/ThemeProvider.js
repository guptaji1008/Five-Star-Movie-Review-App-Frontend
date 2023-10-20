import React, { createContext, useEffect } from 'react'

export const ThemeContext = createContext()

export default function ThemeProvider({children}) {

    const toggleTheme = () => {
        const oldTheme = localStorage.getItem("theme")
        const newTheme = oldTheme === "light" ? "dark" : "light"

        document.documentElement.classList.remove(oldTheme)
        document.documentElement.classList.add(newTheme)
        
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        let theme = localStorage.getItem("theme")
        if (!theme) document.documentElement.classList.add("light")
        else document.documentElement.classList.add(theme)
    }, [])

  return (
    <ThemeContext.Provider value={{toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
