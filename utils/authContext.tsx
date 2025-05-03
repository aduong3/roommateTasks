import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type User = {
  id: string | number;
  givenName: string;
  familyName: string;
  email: string;
  photo: string;
};

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const logIn = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };
  const logOut = () => {
    setIsLoggedIn(false);
    router.replace("/Login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
