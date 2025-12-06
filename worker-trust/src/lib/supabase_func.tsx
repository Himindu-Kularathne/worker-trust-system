import { supabase } from "./supabaseClient";

export async function getUserData(user_id: string) {
  const { data, error } = await supabase.from("app_users").select("*").eq("id", user_id).single();

  if (error) throw error;
  return data;
}
