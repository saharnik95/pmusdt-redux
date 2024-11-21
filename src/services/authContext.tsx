import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, email: string, password: string) => void;
  logout: () => void;
  setPersistentLogin: (persist: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [persistentLogin, setPersistentLogin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPersistentLogin = localStorage.getItem("persistentLogin");
    if (storedUser && storedPersistentLogin === "true") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (name: string, email: string, password: string) => {
    const newUser = { name, email, password };
    setUser(newUser);
    if (persistentLogin) {
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("persistentLogin", "true");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("persistentLogin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setPersistentLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
