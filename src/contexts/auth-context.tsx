import { createContext, useContext, useEffect, useState } from "react";

import USER_DETAIL from "../data/USER_DETAIL.json";

type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  created_on: string;
  user_role: string;
};

type TAuthContext = {
  isAuthenticated: boolean;
  user: TUser | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<TUser | null>(USER_DETAIL?.[0]);

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
          const newUser = USER_DETAIL?.[0];
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
