import { supabase } from "./supabaseClient";

export async function getUserData(google_uid: string) {
  const { data, error } = await supabase.from("app_users").select("*").eq("google_uid", google_uid).single();

  if (error) throw error;
  return data;
}
