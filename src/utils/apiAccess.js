// src/utils/apiAccess.js
import { saveToLocalStorage } from "./localStorageAccess";

export const baseUrl = "http://localhost:3001";

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// ==================== AUTH ====================

export async function loginRequest(loginCredentials) {
  const authUrl = "/api/auth/login";
  const result = { credentials: null, error: null, success: null };
  try {
    await sleep(2000);
    const response = await fetch(baseUrl + authUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
    });
    if (!response.ok) {
      result.error = "Irgendwas ist falsch gelaufen. Versuche es noch einmal!";
      result.success = false;
      throw new Error("Irgendwas ist falsch gelaufen, Versuche es noch einmal!");
    }
    console.log("Authentifizierung Erfolgreich!");

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

export async function registerRequest(registerCredentials) {
  const registerUrl = "/api/users";
  const result = { user: null, error: null, success: null };
  try {
    await sleep(2000);
    const response = await fetch(baseUrl + registerUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerCredentials),
    });
    if (!response.ok) {
      result.error = "Irgendetwas ist falsch gelaufen. Versuche es noch einmal... am besten mit BITTE!";
      result.success = false;
      throw new Error("Irgendetwas ist falsch gelaufen. Versuche es noch einmal... am besten mit BITTE!");
    }
    console.log("Registration complete!");

    const data = await response.json();
    result.user = data;
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

// ==================== EVENTS ====================

export async function getEventsRequest() {
  const eventsUrl = "/api/events";
  const result = { events: [], error: null, success: null };
  try {
    await sleep(1000);
    const response = await fetch(baseUrl + eventsUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      result.error = "Events konnten nicht geladen werden. Versuche es noch einmal!";
      result.success = false;
      throw new Error("Events konnten nicht geladen werden. Versuche es noch einmal!");
    }
    console.log("Events wurden erfolgreich abgerufen!");

    const data = await response.json();
    result.events = data.results || [];
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

export async function getEventByIdRequest(eventId) {
  const eventUrl = `/api/events/${eventId}`;
  const result = { event: null, error: null, success: null };
  try {
    await sleep(500);
    const response = await fetch(baseUrl + eventUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      result.error = "Failed to fetch event. Please try again!";
      result.success = false;
      throw new Error("Failed to fetch event. Please try again!");
    }
    console.log("Event fetched successfully!");

    const data = await response.json();
    result.event = data;
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

export async function createEventRequest(eventData, token) {
  const eventsUrl = "/api/events";
  const result = { event: null, error: null, success: null };
  try {
    await sleep(1500);
    const response = await fetch(baseUrl + eventsUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      result.error = "Das Event konnte nicht erstellt werden. Versuche es noch einmal!";
      result.success = false;
      throw new Error("Das Event konnte nicht erstellt werden. Versuche es noch einmal!");
    }
    console.log("Das Event wurde erfolgreich erstellt!");

    const data = await response.json();
    result.event = data;
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

export async function updateEventRequest(eventId, eventData, token) {
  const eventUrl = `/api/events/${eventId}`;
  const result = { event: null, error: null, success: null };
  try {
    await sleep(1500);
    const response = await fetch(baseUrl + eventUrl, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      result.error = "Failed to update event. Please try again!";
      result.success = false;
      throw new Error("Failed to update event. Please try again!");
    }
    console.log("Event updated successfully!");

    const data = await response.json();
    result.event = data;
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

export async function deleteEventRequest(eventId, token) {
  const eventUrl = `/api/events/${eventId}`;
  const result = { error: null, success: null };
  try {
    await sleep(1000);
    const response = await fetch(baseUrl + eventUrl, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      result.error = "Failed to delete event. Please try again!";
      result.success = false;
      throw new Error("Failed to delete event. Please try again!");
    }
    console.log("Event deleted successfully!");

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
