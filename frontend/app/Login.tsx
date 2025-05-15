import {
  GoogleSignin,
  GoogleSigninButton,
  SignInResponse,
  User,
} from "@react-native-google-signin/google-signin";
import { useContext, useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { AuthContext } from "../utils/authContext";
import { googleVerifyApi } from "../services/apiAuth";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";

const webClient = process.env.EXPO_PUBLIC_WEBCLIENT_ID;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const authState = useContext(AuthContext);
  const { isLoggedIn, logIn, logOut } = authState;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClient,
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res: SignInResponse = await GoogleSignin.signIn();
      setUserInfo(res.data);

      const googleCredential = GoogleAuthProvider.credential(
        res?.data?.idToken
      );

      const firebaseUserCredential = await signInWithCredential(
        auth,
        googleCredential
      );

      const firebaseIdToken = await firebaseUserCredential.user.getIdToken();
      // console.log(firebaseIdToken);
      // setIsLoggedIn(true);
      await googleVerifyApi(firebaseIdToken);

      logIn();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  };

  const logout = async () => {
    setUserInfo(null);
    setError(null);
    // setIsLoggedIn(false);
    logOut();
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess();
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && (
        <>
          {userInfo.user.photo && (
            <View>
              <Image
                source={{ uri: userInfo.user.photo }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            </View>
          )}
          <Text>{JSON.stringify(userInfo.user)}</Text>
        </>
      )}
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
}
