import React, { useContext, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(Cookies.get('user_pid'))

  const login = async (email, password) => {
    const response = await axios.post('api/auth/login', { email, password })
      .catch((error) => {
        console.log(error)
        throw error
      })
    const { token, pid } = response.data
    Cookies.set('token', token, { expires: 604800, secure: true, sameSite: 'Strict' })
    Cookies.set('user_pid', pid, { expires: 604800, secure: true, sameSite: 'Strict' })
    setCurrentUser({ pid })
  }

  const logout = async () => {
    Cookies.remove('token')
    Cookies.remove('user_pid')
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
