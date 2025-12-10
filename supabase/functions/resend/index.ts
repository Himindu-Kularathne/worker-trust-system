// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

Deno.serve(async (req: Request) => {
  console.log("📩 Webhook received");

  const payload = await req.json();
  console.log("Payload:", payload);

  const worker = payload.record;
  console.log("Worker record:", worker);

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
      html: `
        <h2>New Worker Request</h2>
        <p><b>Name:</b> ${worker.full_name}</p>
        <p><b>Phone:</b> ${worker.phone}</p>
        <p><b>Email:</b> ${worker.email ?? "Not provided"}</p>
        <p><b>Address:</b> ${worker.address}</p>
        <p><b>Category:</b> ${worker.category}</p>
      `,
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
