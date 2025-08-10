// src/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Please fill in all fields");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StuSphere Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.switchText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}>
          Register
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
