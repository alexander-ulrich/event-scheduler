import { saveToLocalStorage } from "./localStorageAccess";

export const baseUrl = "http://localhost:3001";

export async function loginRequest(loginCredentials) {
  const authUrl = "/api/auth/login";
  const result = { credentials: null, error: null, success: null };
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
      result.success = false;
      throw new Error("Something went wrong. Please try again!");
    }
    console.log("Authentication complete!");

    const data = await response.json();
    saveToLocalStorage("credentials", data);
    result.credentials = data;
    result.success = true;
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);

    return result;
  }
}
