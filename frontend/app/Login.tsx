import {
  GoogleSignin,
  GoogleSigninButton,
  SignInResponse,
  User,
} from "@react-native-google-signin/google-signin";
import { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../utils/authContext";
import { googleVerifyApi } from "../services/apiAuth";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";
import * as SecureStore from "expo-secure-store";

const webClient = process.env.EXPO_PUBLIC_WEBCLIENT_ID;

const fakeData = {
  _id: "682f91f7c5d7ded9864c0e63",
  email: "mythalink@gmail.com",
  name: "Andrew Duong",
  houseId: "682f9200c5d7ded9864c0e65",
  house: "Dream Team Squad",
  photo:
    "https://lh3.googleusercontent.com/a/ACg8ocKHbAQGr3DS5b-anLDgulpbqcZNP_yg_I2T0kl7cpf21VtidyFz=s96-c",
};

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  const authState = useContext(AuthContext);
  const { logIn, logOut, isLoggedIn } = authState;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClient,
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res: SignInResponse = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(
        res?.data?.idToken
      );

      const firebaseUserCredential = await signInWithCredential(
        auth,
        googleCredential
      );

      const firebaseIdToken = await firebaseUserCredential.user.getIdToken();
      const userData = await googleVerifyApi(firebaseIdToken);

      if (!userData) return;
      await SecureStore.setItemAsync("jwt", userData.token);

      // const { _id, ...rest } = userData.user;

      // logIn({ ...rest, id: _id });
    } catch (err) {
      console.log(err);
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  };

  const logout = async () => {
    setError(null);
    logOut();
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess();
  };

  return (
    <View className="flex-1 items-center justify-center">
      {error && <Text>{JSON.stringify(error)}</Text>}
      {isLoggedIn ? (
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
