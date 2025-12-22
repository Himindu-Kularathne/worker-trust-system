import { supabase } from "./supabaseClient";

export async function getWorkerProfile(workerId: string) {
  const { data, error } = await supabase.from("workers").select("*").eq("id", workerId).single();

  if (error) throw error;
  return data;
}

export async function getAllWorkers() {
  const { data, error } = await supabase.from("workers").select("*");

  if (error) throw error;
  return data;
}

export async function getAllWorkersWithFilters(filters: {
  category?: string;
  province?: string;
  district?: string;
  city?: string;
}) {
  let query = supabase.from("workers").select("*");

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.province) {
    query = query.eq("province", filters.province);
  }

  if (filters.district) {
    query = query.eq("district", filters.district);
  }

  if (filters.city) {
    query = query.eq("city", filters.city);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getWorkerById(workerId: string) {
  const { data, error } = await supabase.from("workers").select("*").eq("id", workerId).single();

  if (error) throw error;
  return data;
}

export async function getWorkerReviews(workerId: string) {
  const { data, error } = await supabase.from("reviews").select("*").eq("worker_id", workerId);

  if (error) throw error;
  return data;
}
