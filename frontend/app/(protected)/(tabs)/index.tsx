import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../../../utils/authContext";

export default function Index() {
  const authState = useContext(AuthContext);
  const { logOut } = authState;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Press the button to log out!</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
}
