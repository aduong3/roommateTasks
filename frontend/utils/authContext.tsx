import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  house: string | null;
  houseId: string | null;
  expoPushToken?: string;
};

type AuthState = {
  user?: User | null;
  isLoggedIn: boolean;
  logIn: (data: User) => void;
  logOut: () => void;
  updateHousehold: (houseName: string, houseId: string) => void;
  setPushToken: (token: string) => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
  updateHousehold: () => {},
  setPushToken: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logIn = (data: User) => {
    // console.log(data);
    setIsLoggedIn(true);
    setUser(data);
    router.replace("/");
  };
  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/Login");
  };
  const updateHousehold = (houseName: string, houseId: string) => {
    const updateUser: User = { ...user!, house: houseName, houseId: houseId };
    setUser(updateUser);
  };

  const setPushToken = (token: string) => {
    if (user) {
      setUser({ ...user, expoPushToken: token });
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, user, updateHousehold, setPushToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
