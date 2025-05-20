import { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../../utils/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NoHouse from "../../../components/NoHouse";
import HasHouse from "../../../components/HasHouse";

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
        {!user?.house && <NoHouse />}
        {user?.house && <HasHouse />}
      </View>
    </>
  );
}
