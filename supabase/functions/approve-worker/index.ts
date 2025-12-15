import { createClient } from "@supabase/supabase-js";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const requestId = url.searchParams.get("request_id");

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

  // 2. Create Auth user (no password)
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    phone: request.phone,
    email: request.email ?? undefined,
    phone_confirm: true,
  });

  console.log("Auth user creation response:", authUser, authError);
  if (authError || !authUser.user) {
    console.error(authError);
    return new Response("Auth user creation failed", { status: 500 });
  }

  const userId = authUser.user.id;

  // 3. Insert worker
  const { error: workerError } = await supabase.from("workers").insert({
    id: userId,
    full_name: request.full_name,
    phone: request.phone,
    email: request.email,
    address: request.address,
    category: request.category,
  });

  if (workerError) {
    console.error(workerError);
    return new Response("Worker creation failed", { status: 500 });
  }

  // 4. Update request
  await supabase
    .from("worker_registration_requests")
    .update({
      status: "approved",
      reviewed_at: new Date(),
    })
    .eq("id", requestId);

  // 5. Send password setup link
  await supabase.auth.admin.inviteUserByEmail(request.email, {
    redirectTo: "workertrust://set-password",
  });

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
