// src/utils/apiAccess.js

import { saveToLocalStorage } from "./localStorageAccess"; 
// Hilfsfunktion, um Daten lokal im Browser zu speichern, z.B. Auth-Token

// ==================== Basis-Konfiguration ====================
export const baseUrl = "http://localhost:3001"; 
// Basis-URL der API, wird für alle Requests verwendet

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
// Hilfsfunktion, die eine Verzögerung einfügt (z.B. für Ladeanimationen)

// ==================== AUTHENTIFIZIERUNG ====================

// Funktion für Login
export async function loginRequest(loginCredentials) {
  const authUrl = "/api/auth/login"; // API-Endpunkt
  const result = { credentials: null, error: null, success: null }; 
  // Ergebnisobjekt, das an die aufrufende Komponente zurückgegeben wird

  try {
    await sleep(2000); // künstliche Verzögerung
    const response = await fetch(baseUrl + authUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginCredentials), // Login-Daten als JSON senden
    });

    if (!response.ok) {
      // Fehlerbehandlung falls der Request fehlschlägt
      result.error = "Irgendwas ist falsch gelaufen. Versuche es noch einmal!";
      result.success = false;
      throw new Error(result.error);
    }

    const data = await response.json(); // Antwort von API parsen
    saveToLocalStorage("credentials", data); // Token/Daten speichern
    result.credentials = data;
    result.success = true;

    console.log("Authentifizierung Erfolgreich!");
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);
    return result; // immer einheitliches Rückgabeobjekt
  }
}

// Funktion für User-Registrierung
export async function registerRequest(registerCredentials) {
  const registerUrl = "/api/users"; // API-Endpunkt für User
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
      throw new Error(result.error);
    }

    const data = await response.json();
    result.user = data;
    result.success = true;

    console.log("Registration complete!");
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

// Alle Events abrufen
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
      throw new Error(result.error);
    }

    const data = await response.json();
    result.events = data.results || []; // Events aus der API extrahieren
    result.success = true;

    console.log("Events wurden erfolgreich abgerufen!");
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);
    return result;
  }
}

// Ein einzelnes Event nach ID abrufen
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
      throw new Error(result.error);
    }

    const data = await response.json();
    result.event = data;
    result.success = true;

    console.log("Event fetched successfully!");
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);
    return result;
  }
}

// Event erstellen
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
        Authorization: `Bearer ${token}`, // Token für Auth erforderlich
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      result.error = "Das Event konnte nicht erstellt werden. Versuche es noch einmal!";
      result.success = false;
      throw new Error(result.error);
    }

    const data = await response.json();
    result.event = data;
    result.success = true;

    console.log("Das Event wurde erfolgreich erstellt!");
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);
    return result;
  }
}

// Event aktualisieren
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
      throw new Error(result.error);
    }

    const data = await response.json();
    result.event = data;
    result.success = true;

    console.log("Event updated successfully!");
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);
    return result;
  }
}

// Event löschen
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
      throw new Error(result.error);
    }

    result.success = true;
    console.log("Event deleted successfully!");
  } catch (error) {
    console.log(error.message);
    result.success = false;
    result.error = error.message;
  } finally {
    console.log(result);
    return result;
  }
}

/*
Hinweise/Stolpersteinchen:
- Alle Requests nutzen try/catch/finally und geben ein einheitliches Result zurück.
- create/update/delete Requests benötigen zwingend einen gültigen Token!
- getEventsRequest greift auf `data.results` zurück, falls die API die Daten anders strukturiert, muss hier angepasst werden.
- sleep() ist optional und dient nur der UX-Simulation.
- Fehler werden immer ins Result-Objekt geschrieben, deswegen ganz praktisch: UI-Komponenten können darauf reagieren (z.B. EventList.jsx, CreateEvent.jsx).
*/
