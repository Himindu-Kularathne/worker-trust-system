import React, { createContext, useState, ReactNode, use, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Worker } from "../types/worker";

interface AuthContextType {
  user: Worker | null;
  setUser: (user: Worker | null) => void;
  login: (phone: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Worker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUser = async (userId: string) => {
    const { data: worker, error } = await supabase
      .from("workers")
      .select(
        `
    id,
    full_name,
    phone,
    email,
    image_url,
    address,
    description,
    trust_score,
    review_count,
    province,
    district,
    city,
    category,
    worker_categories (
      title
    )
  `
      )
      .eq("id", userId)
      .single();
    if (error || !worker) {
      setUser(null);
      return;
    }

    setUser({
      id: userId,
      full_name: worker.full_name,
      phone: worker.phone,
      email: worker.email,
      image_url: worker.image_url,
      address: worker.address,
      category: worker.worker_categories?.[0]?.title ?? null,
      description: worker.description,
      trust_score: worker.trust_score,
      review_count: worker.review_count,
      province: worker.province,
      district: worker.district,
      city: worker.city,
    });
  };
  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
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

  // ✅ REAL LOGIN (Supabase)
  const login = async (phone: string, password: string): Promise<{ error?: string }> => {
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
    // await loadUser(data.user.id);
    return {};
  };

  // ✅ LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>{children}</AuthContext.Provider>;
};
