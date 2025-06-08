import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../utils/authContext";
import Toast from "react-native-toast-message";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(protected)"
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
