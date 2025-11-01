import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function OtpInputLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
         <Stack.Screen name="passwordChanged" options={{ headerShown: false }}/>
         <Stack.Screen name="forgetPassword" options={{ headerShown: false }}/>
         <Stack.Screen name="resetPassword" options={{ headerShown: false }}/>
         <Stack.Screen name="verify" options={{ headerShown: false }}/>
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
