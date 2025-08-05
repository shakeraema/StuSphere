# 📱 StuSphere – Student Lifestyle Manager App

StuSphere is a mobile lifestyle management app designed to help students build better habits, maintain notes/journals, and analyze their productivity through interactive charts.

Built with **React Native + Expo**, the app offers local storage-based habit tracking and journaling features with optional Firebase authentication.

---

## 🚀 Features

### ✅ Authentication
- Email/Password login & registration (via Firebase)
- Persistent login session

### 📋 Habit Tracker
- Add & mark daily habits as done
- Habits reset every day automatically
- Weekly analytics with bar charts
- Local storage via `AsyncStorage`

### 📝 Notes / Journal
- Add personal notes
- View, edit, delete entries
- Local device persistence

### 📊 Analytics Dashboard
- Weekly view of habits completed
- Dynamic bar chart via `react-native-chart-kit`

---

## 🛠️ Tech Stack

| Tool              | Purpose                          |
|-------------------|----------------------------------|
| React Native      | Mobile App Framework             |
| Expo              | App runtime & bundling           |
| Firebase Auth     | Authentication (email/password)  |
| AsyncStorage      | Local persistent storage         |
| ChartKit + SVG    | Habit analytics and visualization|

---

## 🧑‍💻 Getting Started

### 📦 Clone the repo
```bash
git clone https://github.com/shakeraema/StuSphere.git
cd StuSphere
