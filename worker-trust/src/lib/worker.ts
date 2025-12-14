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

// get all workers
export async function getAllWorkers() {
  const { data, error } = await supabase.from("workers").select("*");

  if (error) throw error;
  console.log("All Workers Data:", data);
  return data;
}


export async function getAllWorkersWithFilters(filters: {
  category?: string;
  province?: string;
  district?: string;
  city?: string;
}) {
  let query = supabase.from('workers').select('*');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.province) {
    query = query.eq('province', filters.province);
  }

  if (filters.district) {
    query = query.eq('district', filters.district);
  }

  if (filters.city) {
    query = query.eq('city', filters.city);
  }

  const { data, error } = await query;
  console.log("Filtered Workers Data:", data);

  if (error) throw error;
  return data;
}
