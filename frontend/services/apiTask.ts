import { Platform } from "react-native";

const baseURL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export async function createNewTask(
  name: string,
  dueDate: Date,
  recurrence: string,
  assignedTo: string,
  houseId: string
) {
  try {
    const res = await fetch(`${baseURL}/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, dueDate, recurrence, assignedTo, houseId }),
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
