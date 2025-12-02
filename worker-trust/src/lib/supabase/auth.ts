import { supabase } from "../supabaseClient";

export async function signUpWorker(email: string, password: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: "worker" },
    },
  });
}

export async function signUpCustomer(email: string, password: string) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role: "customer" },
    },
  });
}

export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  return await supabase.auth.signOut();
}
