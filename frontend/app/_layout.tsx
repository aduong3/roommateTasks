import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "../utils/authContext";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
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
    </AuthProvider>
  );
}
