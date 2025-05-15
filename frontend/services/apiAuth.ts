import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

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
    console.log(data);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
}
