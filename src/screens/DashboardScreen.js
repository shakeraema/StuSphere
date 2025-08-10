import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const [habits, setHabits] = useState([]);
  const [notes, setNotes] = useState([]);
  const [completedHabitsCount, setCompletedHabitsCount] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [noteFrequency, setNoteFrequency] = useState({});

  // Load habits and notes from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      const storedHabits = await AsyncStorage.getItem("habits");
      const storedNotes = await AsyncStorage.getItem("notes");

      if (storedHabits) {
        const habitsList = JSON.parse(storedHabits);
        setHabits(habitsList);
        setCompletedHabitsCount(
          habitsList.filter((habit) => habit.done).length
        );
        calculateWeeklyStats(habitsList);
      }

      if (storedNotes) {
        const notesList = JSON.parse(storedNotes);
        setNotes(notesList);
        calculateNoteFrequency(notesList);
      }
    };

    loadData();
  }, []);

  // Calculate weekly habit stats (completed habits per week)
  const calculateWeeklyStats = (habits) => {
    const weeklyData = habits.reduce((acc, habit) => {
      const habitDate = new Date(habit.date);
      const weekNumber = Math.ceil(
        (habitDate.getDate() - habitDate.getDay()) / 7
      ); // Get the week number
      acc[weekNumber] = acc[weekNumber] || 0;
      if (habit.done) acc[weekNumber]++;
      return acc;
    }, {});

    setWeeklyStats(Object.values(weeklyData));
  };

  // Calculate note frequency (count entries by date)
  const calculateNoteFrequency = (notes) => {
    const frequency = notes.reduce((acc, note) => {
      const noteDate = new Date(note.timestamp).toLocaleDateString();
      acc[noteDate] = (acc[noteDate] || 0) + 1;
      return acc;
    }, {});

    setNoteFrequency(frequency);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Analytics Dashboard</Text>

      {/* Completed Habits Count */}
      <Text style={styles.sectionTitle}>Completed Habits</Text>
      <Text style={styles.statsText}>
        Total Completed: {completedHabitsCount}
      </Text>

      {/* Weekly Stats Chart */}
      <Text style={styles.sectionTitle}>Weekly Habit Completion</Text>
      <BarChart
        data={{
          labels: weeklyStats.map((_, index) => `Week ${index + 1}`),
          datasets: [
            {
              data: weeklyStats,
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

      {/* Note Frequency Chart */}
      <Text style={styles.sectionTitle}>Note Frequency</Text>
      <LineChart
        data={{
          labels: Object.keys(noteFrequency),
          datasets: [
            {
              data: Object.values(noteFrequency),
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
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  statsText: { fontSize: 16, textAlign: "center", marginBottom: 20 },
});
