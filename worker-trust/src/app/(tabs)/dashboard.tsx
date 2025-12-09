import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getWorkerProfile } from "@/src/lib/worker";
import { supabase } from "@/src/lib/supabaseClient";

export default function Dashboard() {
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const workerId = "test-user-001"; // Replace with actual worker ID
  async function loadData() {
    const data = await getWorkerProfile(workerId);
    setTrustScore(data.trust_score);
    setReviewCount(data.review_count);
  }

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("worker-profile")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "worker_profiles",
          filter: `worker_id=eq.${workerId}`,
        },
        (payload) => {
          setTrustScore(payload.new.trust_score);
          setReviewCount(payload.new.review_count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [workerId]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Trust Score: {trustScore ?? "--"} / 100</Text>

      <Text style={{ fontSize: 18, marginTop: 8 }}>Reviews: {reviewCount}</Text>
    </View>
  );
}
