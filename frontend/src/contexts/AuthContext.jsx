import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // You can use Firebase or another backend here

  const login = async (email, password) => {
    // Implement your login logic here (e.g., Firebase authentication)
    // Example with Firebase:
    // await firebase.auth().signInWithEmailAndPassword(email, password);
    setCurrentUser({ email }); // Mock user for demonstration
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
