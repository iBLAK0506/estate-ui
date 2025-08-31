import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Initialize state from localStorage to keep user logged in across page reloads
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // This is the function that your login page calls to update the global state
  const updateUser = (data) => {
    setCurrentUser(data?.user || data || null);
    setToken(data?.accessToken || token);
  };

  // This effect runs whenever the user or token changes, saving them to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", token);
  }, [currentUser, token]);

  // Provide the user, token, and update function to the rest of the app
  return (
    <AuthContext.Provider value={{ currentUser, token, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
