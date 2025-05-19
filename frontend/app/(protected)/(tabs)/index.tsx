import { useContext } from "react";
import { Button, Image, Text, View } from "react-native";
import { AuthContext } from "../../../utils/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      <View className="bg-gray-50 flex-1 py-20">
        <View className="flex flex-row items-center justify-between bg-blue-500 py-4 px-3">
          <Text className="text-2xl text-white font-semibold">
            {user?.name}
          </Text>
          <MaterialIcons
            name="logout"
            size={30}
            color="white"
            onPress={logOut}
          />
        </View>
        {!user?.house && (
          <View className="flex-1 justify-center items-center mt-8">
            <Text>You are currently not in a household!</Text>
            <View className="flex-row gap-8 mt-5">
              <Button title="Join by code" />
              <Button title="Make a house" />
            </View>
          </View>
        )}
      </View>
    </>
  );
}
