import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

 const [fontsLoaded] = useFonts({
    UbuntuRegular: require('../assets/fonts/Ubuntu-Regular.ttf'),
    UbuntuBold: require('../assets/fonts/Ubuntu-Bold.ttf'),
    UbuntuMedium: require('../assets/fonts/Ubuntu-Medium.ttf'),
    UbuntuLight: require('../assets/fonts/Ubuntu-Light.ttf'),
  });

  

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(otpInput)" options={{ headerShown: false }} />
        
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </SafeAreaProvider>
  );
}
