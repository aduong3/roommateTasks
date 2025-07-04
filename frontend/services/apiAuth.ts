import { Platform } from "react-native";

// const baseURL =
//   Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function googleVerifyApi(idToken: string) {
  try {
    const res = await fetch(`${baseURL}/api/v1/users/google/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error);
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
}
