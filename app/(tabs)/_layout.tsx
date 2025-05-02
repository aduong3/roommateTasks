import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen
          name="Login"
          options={{ title: "Login", headerShown: false }}
        />
      </Tabs>
    </>
  );
};

export default _layout;
