import React, { createContext, useState, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";

interface User {
  id: string;
  name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (phone: string, password: string): Promise<{ error?: string }> => {
    if (!phone.startsWith("+")) {
      return { error: "Phone number must include country code" };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    const userId = data.user.id;

    // fetch worker profile
    const { data: worker, error: workerError } = await supabase
      .from("workers")
      .select("full_name, phone")
      .eq("id", userId)
      .single();

    if (workerError || !worker) {
      return { error: "Worker profile not found" };
    }

    // ✅ set authenticated user
    setUser({
      id: userId,
      name: worker.full_name,
      phone: worker.phone,
    });

    return {};
  };

  // ✅ LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
