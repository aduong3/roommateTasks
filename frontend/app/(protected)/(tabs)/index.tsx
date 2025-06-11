import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../../../utils/authContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NoHouse from "../../../components/NoHouse";
import HasHouse from "../../../components/HasHouse";
import { usePushNotifications } from "../../../utils/usePushNotifications";

export default function Index() {
  const authState = useContext(AuthContext);
  const { logOut, user, setPushToken } = authState;

  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  useEffect(() => {
    if (expoPushToken?.data && user?.id) {
      setPushToken(expoPushToken.data);
      //optional sendToken to backend too
    }
  }, [expoPushToken, user, setPushToken]);

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
        <Text>Token: {expoPushToken?.data}</Text>
        <Text>{data}</Text>
        {!user?.house && <NoHouse />}
        {user?.house && <HasHouse />}
      </View>
    </>
  );
}
