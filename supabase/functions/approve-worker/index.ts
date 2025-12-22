import { createClient } from "@supabase/supabase-js";
import { sendApprovalSms } from "./sendSms.ts";

export const config = {
  verify_jwt: false,
};

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const requestId = url.searchParams.get("request_id");
  const token = url.searchParams.get("token");

  if (!token || token !== Deno.env.get("APPROVE_SECRET")) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!requestId) {
    return new Response("Missing request_id", { status: 400 });
  }

  // 1. Fetch request
  const { data: request, error } = await supabase
    .from("worker_registration_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (error || !request) {
    return new Response("Request not found", { status: 404 });
  }

  if (request.status !== "pending") {
    return new Response("Already processed", { status: 400 });
  }
  await supabase
    .from("worker_registration_requests")
    .update({
      status: "approved",
      reviewed_at: new Date(),
    })
    .eq("id", requestId);

  await sendApprovalSms(request.phone, request.full_name);

  return new Response(
    `
    <html>
      <body style="font-family:sans-serif;padding:40px;">
        <h2>✅ Worker Approved</h2>
        <p>${request.full_name} has been approved.</p>
        <p>A login link has been sent to their email.</p>
      </body>
    </html>
    `,
    { headers: { "Content-Type": "text/html" } }
  );
});
