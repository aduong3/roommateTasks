import { useContext } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../../utils/authContext";

const fakeData = [
  {
    id: 1,
    title: "Clean Kitchen",
    person: "Andrew",
  },
  {
    id: 2,
    title: "Take out trash",
    person: "Bri",
  },
];

export default function Index() {
  const authState = useContext(AuthContext);
  const { logOut, user } = authState;
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View className="bg-gray-800 flex-1">
        <View className="mt-20">
          <Button onPress={logOut} title="Log Out" />
        </View>
      </View>
    </>
  );
}
