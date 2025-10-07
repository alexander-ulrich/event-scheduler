import { getFromLocalStorage, saveToLocalStorage } from "./localStorageAccess";

const baseUrl = "http://localhost:3001";

export async function loginRequest(loginCredentials) {
  const authUrl = "/api/auth/login";
  const result = { token: null, error: null };
  try {
    const response = await fetch(baseUrl + authUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    });
    if (!response.ok) {
      result.error = "Something went wrong. Please try again!";
      throw new Error("Something went wrong. Please try again!");
    }
    console.log("Authentication complete!");

    const data = await response.json();
    saveToLocalStorage("credentials", data);
    result.token = data;
  } catch (error) {
    console.log(error.message);
    result.error = error.message;
  } finally {
    console.log(result);

    return result;
  }
}
