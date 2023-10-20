import React, { createContext, useEffect, useState } from 'react'
import { getIsAuth, signInUser } from '../api/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const defaultAuth = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: ""
}

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [authInfo, setAuthInfo] = useState({ ...defaultAuth })

  const navigate = useNavigate()

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...defaultAuth, isPending: true })
    const { error, user } = await signInUser({ email, password })
    if (error) {
      toast.error(error)
      return setAuthInfo({ ...authInfo, isPending: false, error })
    }

    navigate('/', {state: {message: "Logg in successfully!"}})

    setAuthInfo({ profile: { ...user }, isPending: false, isLoggedIn: true, error: "" })

    localStorage.setItem('auth-token', user.token)
  }

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token")
    if (!token) return;

    const { user, error } = await getIsAuth(token)
    if (error) {
      toast.error(error)
      return setAuthInfo({ ...authInfo, isPending: false, error })
    }
    setAuthInfo({ profile: { ...user }, isPending: false, isLoggedIn: true, error: "" })
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    setAuthInfo({ ...defaultAuth })
    // navigate("/auth/signin")
  }

  useEffect(() => {
    isAuth()
  }, [])

  // handleLogout, isAuth
  return (
    <AuthContext.Provider value={{ authInfo, handleLogin, isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
