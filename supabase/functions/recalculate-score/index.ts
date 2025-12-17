import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const worker_id = payload.record.worker_id;

    const supabase = createClient(Deno.env.get("PROJECT_URL")!, Deno.env.get("SERVICE_ROLE_KEY")!);

    // Fetch reviews for worker
    const { data: reviews } = await supabase.from("reviews").select("rating, created_at").eq("worker_id", worker_id);

    if (!reviews || reviews.length === 0) {
      await supabase
        .from("workers")
        .update({
          trust_score: 0,
          review_count: 0,
        })
        .eq("id", worker_id);

      return new Response("No reviews", { status: 200 });
    }

    let totalWeighted = 0;
    let totalWeight = 0;

    for (const r of reviews) {
      const daysAgo = (Date.now() - new Date(r.created_at).getTime()) / 86400000;

      const weight = daysAgo <= 30 ? 0.6 : 0.4;

      totalWeighted += r.rating * weight;
      totalWeight += weight;
    }

    const trustScore = totalWeighted / totalWeight;
    //const trustScore100 = Math.round(trustScore * 20); // use if you want score out of 100

    await supabase
      .from("workers")
      .update({
        trust_score: trustScore,
        review_count: reviews.length,
      })
      .eq("id", worker_id);

    return new Response("Trust score updated", { status: 200 });
  } catch (e) {
    return new Response(e instanceof Error ? e.message : "Unknown error", { status: 500 });
  }
});
