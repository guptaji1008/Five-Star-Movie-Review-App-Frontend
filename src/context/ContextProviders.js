import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './ThemeProvider'
import AuthProvider from './AuthProvider'
import SearchProvider from './SearchProvider'
import MovieProvider from './MovieProvider'

export default function ContextProviders({ children }) {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <SearchProvider>
                       <MovieProvider>
                            {children}
                        </MovieProvider> 
                    </SearchProvider>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
