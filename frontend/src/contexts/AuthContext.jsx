import React, { useContext, useState } from 'react';

import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // You can use Firebase or another backend here

  const login = async (email, password) => {
    const { status, data } = await axios.post('api/auth/login', { 'email': email, 'password': password })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    setCurrentUser({ email });
  };

  const logout = async () => {
    // Implement your logout logic here (e.g., Firebase authentication)
    // Example with Firebase:
    // await firebase.auth().signOut();
    setCurrentUser(null);
  };

  const isAuthenticated = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
