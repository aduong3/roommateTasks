import { useContext } from "react";
import { Button, FlatList, Text, View } from "react-native";
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
  const { logOut } = authState;
  return (
    <>
      <View className="flex-1 items-center justify-center">
        <Text>Log Out Here</Text>
        <Button onPress={logOut} title="Log Out" />
      </View>
      <View>
        <Text className="text-3xl font-semibold">Chores</Text>
        <FlatList
          data={fakeData}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <Text>
              {item.title} - {item.person}
            </Text>
          )}
        ></FlatList>
      </View>
    </>
  );
}
