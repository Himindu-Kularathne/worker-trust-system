import { supabase } from "./supabaseClient";

export async function getWorkerProfile(workerId: string) {
  const { data, error } = await supabase
    .from("worker_profiles")
    .select("trust_score, review_count")
    .eq("worker_id", workerId)
    .single();

  if (error) throw error;
  console.log("Worker Profile Data:", data);
  return data;
}
