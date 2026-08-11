const AUTH_KEY = "wali_auth";
const USERNAME_KEY = "wali_auth_username";

// 🧠 Concept — pourquoi un "faux" login ?
// Il n'y a pas de backend (voir lib/storage.ts), donc pas de vraie vérification
// de mot de passe côté serveur possible — n'importe qui peut lire le code JS
// et voir "admin"/"admin". C'est un simple écran de façade demandé pour
// coller à la maquette, PAS une protection réelle. Ne jamais réutiliser ce
// pattern pour protéger de vraies données sensibles.
const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function login(username: string, password: string): boolean {
  const ok = username === VALID_USERNAME && password === VALID_PASSWORD;
  if (ok && isBrowser()) {
    window.localStorage.setItem(AUTH_KEY, "1");
    window.localStorage.setItem(USERNAME_KEY, username);
  }
  return ok;
}

export function logout(): void {
  if (isBrowser()) {
    window.localStorage.removeItem(AUTH_KEY);
    window.localStorage.removeItem(USERNAME_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function getUsername(): string {
  if (!isBrowser()) return "";
  return window.localStorage.getItem(USERNAME_KEY) ?? "";
}
