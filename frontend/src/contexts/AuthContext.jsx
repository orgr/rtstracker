import React, { useContext, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(Cookies.get('token') ? 'previously_logged_in' : null) // You can use Firebase or another backend here

  const login = async (email, password) => {
    const response = await axios.post('api/auth/login', { email, password })
      .catch((error) => {
        console.log(error)
        throw error
      })
    const { token } = response.data
    Cookies.set('token', token, { expires: 604800, secure: true, sameSite: 'Strict' })
    setCurrentUser({ email })
  }

  const logout = async () => {
    Cookies.remove('token')
    setCurrentUser(null)
  }

  const isAuthenticated = () => {
    return !!currentUser
  }

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
