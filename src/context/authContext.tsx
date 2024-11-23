import React, { createContext, useContext, useState, useEffect } from "react";

// Define the structure of a User object
interface User {
  name: string;
  email: string;
}

// Define the shape of the AuthContext, including methods for login and logout
interface AuthContextType {
  user: User | null; // Holds the current user object or null if not logged in
  login: (
    name: string,
    email: string,
    password: string,
    keepLoggedIn: boolean
  ) => Promise<void>; // Function to handle user login
  logout: () => void; // Function to handle user logout
  isAuthenticated: boolean; // Boolean to indicate if the user is authenticated
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // State to hold the current user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State to indicate if the user is authenticated

  // On component mount, check if there is a user stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Parse the stored user data and set it in state
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true); // Set the authenticated state to true
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle user login
  const login = async (
    name: string,
    email: string,
    _password: string, // Password is not stored in this implementation for security reasons
    keepLoggedIn: boolean // Flag to determine if the session should persist across refreshes
  ) => {
    try {
      const userData: User = { name, email }; // Create a user object
      setUser(userData); // Set the user state
      setIsAuthenticated(true); // Set authenticated state to true

      if (keepLoggedIn) {
        // Store user data in localStorage if 'keepLoggedIn' is true
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      // Log any error during login
      console.error("Login failed:", error);
      throw error; // Propagate the error to the caller
    }
  };

  // Function to handle user logout
  const logout = () => {
    // Clear the user state and set authenticated state to false
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // Remove user data from localStorage

    // Remove any other session-related data stored in localStorage
    localStorage.removeItem("currentLevel");
    localStorage.removeItem("exchangeInfo");
    localStorage.removeItem("timerStatus");
  };

  // Return the context provider with the current auth state and methods
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
export const useAuth = () => {
  const context = useContext(AuthContext); // Access the context value
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
