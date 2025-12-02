import { supabase } from "./supabase";

export async function getUserData(google_uid: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
            google_uid,
            role,
            full_name,
            email,
            phone,
            user_settings (
                language_pref
            )
            `
    )
    .eq("google_uid", google_uid)
    .single();

  if (error) throw error;
  return data;
}
