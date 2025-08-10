import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function AnalyticsScreen() {
  const [habitData, setHabitData] = useState([]);
  const [weeklyCompletionData, setWeeklyCompletionData] = useState([]);
  const [monthlyCompletionData, setMonthlyCompletionData] = useState([]);

  // Load habits and calculate analytics
  useEffect(() => {
    const loadData = async () => {
      const storedHabits = await AsyncStorage.getItem("habits");
      if (storedHabits) {
        const habits = JSON.parse(storedHabits);
        processAnalytics(habits);
      }
    };
    loadData();
  }, []);

  // Process habits to get analytics
  const processAnalytics = (habits) => {
    const completionStats = habits.map((habit) => {
      return habit.done ? 1 : 0;
    });

    // Weekly Analytics: Calculate completed habits per week
    const weeklyStats = habits.reduce((acc, habit) => {
      const habitDate = new Date(habit.date);
      const weekNumber = Math.ceil(
        (habitDate.getDate() - habitDate.getDay()) / 7
      ); // Get week number
      acc[weekNumber] = acc[weekNumber] || 0;
      if (habit.done) acc[weekNumber]++;
      return acc;
    }, {});

    // Monthly Analytics: Calculate completed habits per month
    const monthlyStats = habits.reduce((acc, habit) => {
      const habitDate = new Date(habit.date);
      const month = habitDate.getMonth() + 1; // Get month (1-based)
      acc[month] = acc[month] || 0;
      if (habit.done) acc[month]++;
      return acc;
    }, {});

    // Set the data for the charts
    setHabitData(completionStats);
    setWeeklyCompletionData(Object.values(weeklyStats));
    setMonthlyCompletionData(Object.values(monthlyStats));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Completion Analytics</Text>

      {/* Habit Completion Rate Chart */}
      <Text style={styles.chartTitle}>Habit Completion Rate</Text>
      <BarChart
        data={{
          labels: ["Completed", "Pending"],
          datasets: [
            {
              data: [
                habitData.filter((x) => x === 1).length,
                habitData.length - habitData.filter((x) => x === 1).length,
              ],
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#e26a00",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      {/* Weekly Completion Chart */}
      <Text style={styles.chartTitle}>Weekly Habit Completion</Text>
      <BarChart
        data={{
          labels: weeklyCompletionData.map((_, index) => `Week ${index + 1}`),
          datasets: [
            {
              data: weeklyCompletionData,
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#1e2923",
          backgroundGradientFrom: "#08130D",
          backgroundGradientTo: "#1e2923",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      {/* Monthly Completion Chart */}
      <Text style={styles.chartTitle}>Monthly Habit Completion</Text>
      <LineChart
        data={{
          labels: monthlyCompletionData.map((_, index) => `Month ${index + 1}`),
          datasets: [
            {
              data: monthlyCompletionData,
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#1e2923",
          backgroundGradientFrom: "#08130D",
          backgroundGradientTo: "#1e2923",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  chartTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});
