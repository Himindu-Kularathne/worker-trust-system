import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

const submitReview = async ({
    worker_id,
    email,
    description,
    rating,
}: {
    worker_id: string;
    email: string;
    description: string;
    rating: number;
}) => {
  const token = uuidv4();

  await supabase.from("reviews").insert({
    worker_id,
    customer_email: email,
    description,
    rating,
    verification_token: token,
    status: false,
  });

  await fetch("https://YOUR_PROJECT.functions.supabase.co/send-review-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token }),
  });
};
