import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Text, View, ActivityIndicator } from "react-native";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed, user:", user); // Debug the user object
      setUser(user); // Set the user state with the Firebase user
      setAuthLoading(false); // Set loading to false once authentication state is determined
    });

    return unsubscribe;
  }, []);


  const logout = () => {
    signOut(auth); // Firebase logout
  };

  if (authLoading) {
    // Show loading state while Firebase auth state is being determined
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text> {/* Loading message */}
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};
