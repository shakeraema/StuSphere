import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function HabitScreen() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [habitData, setHabitData] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [averageStreak, setAverageStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  // Load habits from local storage
  useEffect(() => {
    const loadHabits = async () => {
      const storedHabits = await AsyncStorage.getItem("habits");
      if (storedHabits) {
        const habitsList = JSON.parse(storedHabits);
        setHabits(habitsList);
        trackProgress(habitsList);
      }
    };

    loadHabits();
  }, []);

  // Save habits when they change
  useEffect(() => {
    AsyncStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (habit.trim() === "") return;
    const newHabit = {
      id: Date.now().toString(),
      name: habit,
      done: false,
      streak: 0,
      date: new Date().toLocaleDateString(),
    };
    setHabits([...habits, newHabit]);
    setHabit("");
    trackProgress([...habits, newHabit]);
  };

  const toggleHabit = (id) => {
    const updatedHabits = habits.map((h) =>
      h.id === id
        ? { ...h, done: !h.done, date: new Date().toLocaleDateString() }
        : h
    );
    setHabits(updatedHabits);
    trackProgress(updatedHabits);
  };

  // Track analytics (completion percentage, streak, weekly progress)
  const trackProgress = (habits) => {
    const completedCount = habits.filter((h) => h.done).length;
    const totalCount = habits.length;

    // Completion Percentage
    const percentage = (completedCount / totalCount) * 100;
    setCompletionPercentage(percentage);

    // Average Streaks Calculation
    const totalStreaks = habits.filter((h) => h.streak > 0).length;
    const streakSum = habits.reduce((acc, habit) => acc + habit.streak, 0);
    const avgStreak = totalStreaks > 0 ? streakSum / totalStreaks : 0;
    setAverageStreak(avgStreak);

    // Weekly Progress
    const today = new Date();
    const weekStartDate = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const weeklyHabits = habits.filter(
      (h) => new Date(h.date) >= weekStartDate
    );
    const weeklyCompleted = weeklyHabits.filter((h) => h.done).length;
    const weeklyPercentage = (weeklyCompleted / weeklyHabits.length) * 100;
    setWeeklyProgress(weeklyPercentage);

    setHabitData([{ completedCount, totalCount }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Daily Habit Tracker</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter habit"
          value={habit}
          onChangeText={setHabit}
        />
        <Button title="Add" onPress={addHabit} />
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.habitItem, item.done && styles.habitDone]}
            onPress={() => toggleHabit(item.id)}>
            <Text style={styles.habitText}>
              {item.done ? "✅" : "⬜"} {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Completion Percentage */}
      <Text style={styles.stats}>
        Completion Percentage: {completionPercentage.toFixed(2)}%
      </Text>

      {/* Average Streak */}
      <Text style={styles.stats}>
        Average Streak: {averageStreak.toFixed(2)} days
      </Text>

      {/* Weekly Progress */}
      <Text style={styles.stats}>
        Weekly Progress: {weeklyProgress.toFixed(2)}%
      </Text>

      {/* Bar Chart for Habit Completion */}
      <BarChart
        data={{
          labels: ["Completed", "Pending"],
          datasets: [
            {
              data: habitData.length
                ? [
                    habitData[0].completedCount,
                    habitData[0].totalCount - habitData[0].completedCount,
                  ]
                : [0, 0],
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
  inputRow: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    borderColor: "#ccc",
  },
  habitItem: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  habitDone: {
    backgroundColor: "#d4edda",
  },
  habitText: {
    fontSize: 16,
  },
  stats: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
