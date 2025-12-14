import React, { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  role: "worker" | "customer";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (name: string, role: "worker" | "customer") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, role: "worker" | "customer") => {
    setUser({ name, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
