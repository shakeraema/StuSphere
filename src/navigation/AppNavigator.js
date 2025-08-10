import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import HabitScreen from "../screens/HabitScreen";
import DashboardScreen from "../screens/DashboardScreen";
import NotesScreen from "../screens/NotesScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Habits") {
            iconName = "checkmark-circle";
          } else if (route.name === "Dashboard") {
            iconName = "stats-chart";
          } else if (route.name === "Notes") {
            iconName = "document-text";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Habits" component={HabitScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
    </Tab.Navigator>
  );
}
