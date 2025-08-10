import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./src/contexts/AuthContext"; // Ensure proper import
import AppNavigator from "./src/navigation/AppNavigator";
import LoginScreen from "./src/screens/LoginScreen"; // Ensure LoginScreen is imported

export default function App() {
  const { user } = useContext(AuthContext);
  console.log("User from AuthContext:", user); // Debugging log to check the value of `user`
  // Access user from AuthContext

  // Log the user value to debug
  console.log("User from AuthContext:", user);

  return (
    <AuthProvider>
      <NavigationContainer>
        {/* If no user, show LoginScreen */}
        {!user ? <LoginScreen /> : <AppNavigator />}
      </NavigationContainer>
    </AuthProvider>
  );
}
