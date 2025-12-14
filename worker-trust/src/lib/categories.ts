import { supabase } from "./supabaseClient";

// Load all categories from the database
export async function loadCategories() {
  const { data, error } = await supabase.from("worker_categories").select("id, title, icon"); 

  if (error) {
    console.error("Error loading categories:", error);
    throw error;
  }

  return data;
}

// Load subcategories for a given category ID
// export async function loadSubcategories(categoryId: string) {
//   const { data, error } = await supabase.from("worker_subcategories").select("id, name").eq("category_id", categoryId);

//   if (error) {
//     console.error("Error loading subcategories:", error);
//     throw error;
//   }

//   return data;
// }
