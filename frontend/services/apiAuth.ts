export async function googleVerifyApi(idToken: string) {
  try {
    const res = await fetch(
      "http://localhost:3000/api/v1/users/google/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      throw new Error(error);
    }
    const data = await res.json();
    console.log("data:", data);
  } catch (err) {
    console.log(err);
  }
}
