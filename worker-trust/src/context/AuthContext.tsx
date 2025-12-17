import React, { createContext, useState, ReactNode, use, useEffect } from "react";
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
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadUser = async (userId: string) => {
    const { data: worker, error } = await supabase.from("workers").select("full_name, phone").eq("id", userId).single();

    if (error || !worker) {
      setUser(null);
      return;
    }

    setUser({
      id: userId,
      name: worker.full_name,
      phone: worker.phone,
    });
  };

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        await loadUser(data.session.user.id);
      }

      setLoading(false);
    };
    restoreSession();

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadUser(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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
    await loadUser(data.user.id);
    return {};
  };

  // ✅ LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};
