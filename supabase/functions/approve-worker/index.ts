import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

Deno.serve(async (req) => {
  const { request_id } = await req.json();

  // 1. Fetch request
  const { data: request } = await supabase
    .from("worker_registration_requests")
    .select("*")
    .eq("id", request_id)
    .single();

  if (!request) {
    return new Response("Request not found", { status: 404 });
  }

  // 2. Update request
  await supabase
    .from("worker_registration_requests")
    .update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", request_id);

  // 3. Create auth user
  const { data: user, error: authError } = await supabase.auth.admin.createUser({
    email: request.email,
    email_confirm: true,
  });

  if (authError) {
    return new Response(authError.message, { status: 500 });
  }

  // 4. Insert worker
  await supabase.from("workers").insert({
    id: user.user.id,
    full_name: request.full_name,
    phone: request.phone,
    email: request.email,
    address: request.address,
    category: request.category,
  });

  return new Response("Worker approved");
});
