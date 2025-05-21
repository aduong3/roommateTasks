import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export async function createHousehold({
  houseName,
  userId,
  houseCode,
}: {
  houseName: string;
  userId: string;
  houseCode: string;
}) {
  try {
    const res = await fetch(`${baseURL}/api/v1/house`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ houseName, userId, houseCode }),
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
