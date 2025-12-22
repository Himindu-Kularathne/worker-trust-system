import "react-native-get-random-values";
import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

export async function submitReviews(worker_id: string, email: string, review: string, rating: number) {
  const token = uuidv4();

  const { error } = await supabase.from("reviews").insert({
    worker_id,
    customer_email: email,
    review,
    rating,
    verification_token: token,
    status: false,
  });

  if (error) throw error;
  const projectId = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_ID;
  await fetch(`https://${projectId}.functions.supabase.co/send-review-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token }),
  });
}
