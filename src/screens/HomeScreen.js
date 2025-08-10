import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email || "Student"} 🎓</Text>
      <Text style={styles.subtitle}>This is your Home Screen</Text>
      {/* Logout Button */}
      <Button title="Logout" onPress={logout} />{" "}
      {/* Call logout from AuthContext */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 16, marginBottom: 32 },
});
