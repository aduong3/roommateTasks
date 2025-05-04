import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../../utils/authContext";

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);
  const { isLoggedIn } = authState;

  if (!isLoggedIn) {
    return <Redirect href="/Login" />;
  }
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
      </Tabs>
    </>
  );
}
