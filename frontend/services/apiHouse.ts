import { Platform } from "react-native";

// const baseURL =
//   Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
const baseURL = "http://192.168.1.97:3000";

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

export async function getHouseholdMembers(houseId: string) {
  try {
    const res = await fetch(`${baseURL}/api/v1/house/${houseId}`);

    if (!res.ok) {
      const error = await res.json();
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

export async function joinHousehold(userId: string, houseCode: string) {
  try {
    const res = await fetch(`${baseURL}/api/v1/house/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, houseCode }),
    });

    if (!res.ok) {
      const error = await res.json();
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
