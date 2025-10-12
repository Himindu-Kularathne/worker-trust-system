import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";

type AppUser = {
  google_uid: string;
  role: string;
  full_name: string;
  email: string;
  phone?: string;
};

export default function ProfileScreen() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppUsers();
  }, []);

  async function fetchAppUsers() {
    try {
      const { data, error } = await supabase.from("app_users").select("*");
      if (error) throw error;
      setUsers(data);
    } catch (error: any) {
      setError(error.message);
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 App Users</Text>
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.google_uid}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.name}>{item.full_name}</Text>
              <Text>{item.email}</Text>
              <Text style={styles.role}>Role: {item.role}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  userCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "500" },
  role: { color: "#555" },
});
