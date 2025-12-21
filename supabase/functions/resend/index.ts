import { workerRequestTemplate } from "./emailTemplate.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req: Request) => {
  console.log("📩 Webhook received");
  const payload = await req.json();
  console.log("Payload:", payload);

  const worker = payload;

  console.log("Worker record:", worker);

  let categoryTitle = "Unknown";

  if (worker.category) {
    const { data: category, error } = await supabase
      .from("worker_categories")
      .select("title")
      .eq("id", worker.category)
      .single();

    if (error) {
      console.warn("Category fetch failed:", error.message);
    } else {
      categoryTitle = category.title;
    }
  }

  const enrichedWorker = {
    ...worker,
    category_title: categoryTitle,
  };

  console.log("Enriched worker:", enrichedWorker);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "minethweerasinghe@gmail.com",
      subject: "New Worker Registration Request",
      html: workerRequestTemplate(enrichedWorker),
    }),
  });
  const data = await res.json();
  console.log("Resend response:", data);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/resend' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
