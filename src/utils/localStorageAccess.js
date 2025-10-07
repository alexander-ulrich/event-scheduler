export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  JSON.parse(localStorage.getItem(key)) ?? [];
}
