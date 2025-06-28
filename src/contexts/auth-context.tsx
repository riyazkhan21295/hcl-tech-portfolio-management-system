import { createContext, useContext, useEffect, useState } from "react";

type TUser = { id: string; firstName: string; lastName: string; email: string };

type TAuthContext = {
  isAuthenticated: boolean;
  user: TUser | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

const DEFAULT_USER: TUser = {
  id: "1",
  firstName: "Riyaz",
  lastName: "Khan",
  email: "riyaz.khan.21295@gmail.com",
};

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<TUser | null>(DEFAULT_USER);

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Cleanup function to reset user state on unmount
    return () => {
      setUser(null);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login: () => {
          const newUser = DEFAULT_USER;
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
        },
        logout: () => setUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
