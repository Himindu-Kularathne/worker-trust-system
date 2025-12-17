import React, { createContext, useState, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { Worker } from "../types/worker";

interface AuthContextType {
  user: Worker | null;
  setUser: (user: Worker | null) => void;
  login: (phone: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Worker | null>(null);

  // ✅ REAL LOGIN (Supabase)
  const login = async (
    phone: string,
    password: string
  ): Promise<{ error?: string }> => {
    if (!phone.startsWith("+")) {
      return { error: "Phone number must include country code" };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });

    if (error || !data.user) {
      return { error: error?.message || "Login failed" };
    }

    const userId = data.user.id;

    // ✅ Fetch worker profile
    const { data: worker, error: workerError } = await supabase
      .from("workers")
      .select("*")
      .eq("id", userId)
      .single();

    if (workerError || !worker) {
      return { error: "Worker profile not found" };
    }

    setUser(worker);
    return {};
  };

  // ✅ LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
