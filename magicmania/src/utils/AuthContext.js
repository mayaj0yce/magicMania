import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to set user data when a user logs in
  const login = (userData) => {
    setUser(userData);
  };

  // Function to clear user data when a user logs out
  const logout = () => {
    setUser(null);
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
