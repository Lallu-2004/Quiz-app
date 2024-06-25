import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userQuizData, setUserQuizData] = useState([]);

  const login = (username, password) => {
    // Example login validation
    if (username === 'usertest' && password === 'password123') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setUserQuizData([]);
  };

  const addQuizData = (quizData) => {
    setUserQuizData((prevData) => [...prevData, quizData]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userQuizData, addQuizData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
