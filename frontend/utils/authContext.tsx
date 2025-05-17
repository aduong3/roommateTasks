import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
};

type AuthState = {
  user?: User | null;
  isLoggedIn: boolean;
  logIn: (data: User) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logIn = (data: User) => {
    setIsLoggedIn(true);
    setUser(data);
    router.replace("/");
  };
  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
    router.replace("/Login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}
