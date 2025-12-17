import React, { createContext, useState, ReactNode } from "react";
import { Worker } from "../types/worker";

interface AuthContextType {
  user: Worker | null;
  setUser: (user: Worker | null) => void;
  login: (name: string, role: "worker" | "customer") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Worker | null>(null);

  const login = (name: string, role: "worker" | "customer") => {
    // Mock login implementation
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
