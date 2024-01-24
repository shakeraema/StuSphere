
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from '@/navigation';
import theme from '@/.utils/theme';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { registerRootComponent } from 'expo';


export default function App() {
  return (
    <GestureHandlerRootView 
    style={{
      flex: 1,
    }}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>

        
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Navigation/>
    </NavigationContainer>
    </BottomSheetModalProvider>
    </SafeAreaProvider>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}


