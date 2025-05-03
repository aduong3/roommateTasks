import {
  GoogleSignin,
  GoogleSigninButton,
  SignInResponse,
  User,
} from "@react-native-google-signin/google-signin";
import { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../utils/authContext";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const authState = useContext(AuthContext);
  const { isLoggedIn, logIn, logOut } = authState;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEBCLIENT_ID,
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res: SignInResponse = await GoogleSignin.signIn();
      setUserInfo(res.data);
      // setIsLoggedIn(true);
      logIn();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  };

  const logout = () => {
    setUserInfo(null);
    setError(null);
    // setIsLoggedIn(false);
    logOut();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View className="flex-1 items-center justify-center">
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
