StuSphere - Student Lifestyle Management App 🎓📱
StuSphere is a mobile app designed to help students build better habits, manage their daily routines, maintain notes and journals, and track their progress through interactive charts. The app includes user authentication, habit tracking, note-taking, and an analytics dashboard to visualize productivity and habit completion.

Features 🌟
User Authentication 🔐: Secure login and registration using Firebase Authentication.

Habit Tracker 📝: Add, mark, and track daily habits.

Notes & Journal 📖: Maintain personal notes and reflections, with full CRUD functionality (Create, Read, Update, Delete).

Analytics Dashboard 📊: Visualize progress with charts and stats for habits and note-taking.

Navigation 🔄: Easy-to-use bottom tab navigation to switch between screens like Home, Habits, Dashboard, and Notes.

Tech Stack 🔧
React Native: Framework for building the mobile app.

Firebase: Firebase Authentication for user login and registration.

React Navigation: React Navigation library to manage screen transitions.

AsyncStorage: Persistent local storage for storing user data like habits and notes.

React Native Chart Kit: React Native Chart Kit for rendering charts and progress tracking.

Installation ⚙️
1. Clone the repository 📥
bash
Copy
git clone https://github.com/shakeraema/StuSphere.git
2. Install dependencies 📦
bash
Copy
cd StuSphere
npm install
3. Set up Firebase 🔑
Create a Firebase project at Firebase Console.

Enable Email/Password Authentication under Authentication > Sign-in method.

Add your Firebase configuration details to src/firebaseConfig.js.

4. Run the app 🚀
To start the app in development mode, run:

bash
Copy
npx expo start
This will start the app and open a browser window where you can use the QR code to open the app on your mobile device.

Folder Structure 📂
bash
Copy
StuSphere/
├── src/
│   ├── contexts/
│   │   └── AuthContext.js           # Context for authentication state
│   ├── navigation/
│   │   └── AppNavigator.js          # Handles screen navigation
│   ├── screens/
│   │   ├── HomeScreen.js            # Main home screen
│   │   ├── LoginScreen.js           # Login screen
│   │   ├── RegisterScreen.js        # Registration screen
│   │   ├── HabitScreen.js           # Habit tracking screen
│   │   ├── NotesScreen.js           # Notes screen
│   │   └── DashboardScreen.js       # Analytics dashboard screen
│   └── firebaseConfig.js            # Firebase configuration and auth setup
├── App.js                           # Main entry point of the app
├── package.json                     # Project dependencies and scripts
└── tsconfig.json                    # TypeScript configuration (if applicable)
Features in Progress 🚧
Push Notifications 🔔: Send reminders and notifications for habit tracking (using Expo Notifications).

Cloud Sync ☁️: Sync notes and habits across devices using Firebase Firestore.

Streaks and Statistics 📈: Add more advanced analytics, such as streak tracking, success rate over time, and weekly/monthly charts.

Contributing 🛠️
If you'd like to contribute to StuSphere, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature-name).

Make your changes and commit them (git commit -m 'Add new feature').

Push to the branch (git push origin feature-name).

Open a Pull Request.

Screenshots 📷
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/6b99a7ce-ed47-448b-80a6-177a049fee07" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/879af3b7-6535-4fb8-a410-bc0201ec6433" />
<img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/7915a12e-0400-4ee4-9ec0-077f2299021f" />



License 📝
This project is licensed under the MIT License - see the LICENSE file for details.

Links 🔗
GitHub Repository=https://github.com/shakeraema/StuSphere.git

Firebase=https://firebase.google.com/

Expo Documentation=https://docs.expo.dev/

React Navigation Documentation=https://reactnavigation.org/
