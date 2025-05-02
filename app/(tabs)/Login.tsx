import { View, Text, Button } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  SignInResponse,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

const Login = () => {
  const [error, setError] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEBCLIENT_ID,
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
    } catch (err: Error) {
      setError(err);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
        />
      )}
    </View>
  );
};

export default Login;
