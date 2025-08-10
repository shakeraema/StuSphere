// src/screens/RegisterScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert("All fields required");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created! You can now log in.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create StuSphere Account</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.switchText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  switchText: { marginTop: 20, textAlign: "center" },
  link: { color: "blue", fontWeight: "bold" },
});
