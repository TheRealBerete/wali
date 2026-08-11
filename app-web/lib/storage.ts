import type { Transaction } from "./types";

const STORAGE_KEY = "wali_transactions";

// 🧠 Concept — localStorage
// C'est un petit espace de stockage clé-valeur intégré au navigateur (5-10 Mo),
// qui survit à la fermeture de l'onglet. Il ne stocke que du texte, donc on
// sérialise/désérialise nos données avec JSON.stringify / JSON.parse.
// Contrairement à une vraie base de données, il n'y a ni requêtes SQL, ni
// serveur : tout vit dans le navigateur de l'utilisateur.
//
// 🧠 Concept — SSR et `typeof window`
// Next.js essaie de générer du HTML côté serveur avant d'envoyer la page.
// Or `localStorage` n'existe que dans un navigateur : le serveur n'en a pas.
// On vérifie donc `typeof window === "undefined"` pour ne jamais y toucher
// pendant le rendu serveur (sinon ça crashe).
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readAll(): Transaction[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Donnée corrompue ou JSON invalide : on repart d'une liste vide plutôt
    // que de faire planter toute l'app.
    return [];
  }
}

function writeAll(transactions: Transaction[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function monthYearFromDate(date: string): { month: number; year: number } {
  const [year, month] = date.split("-").map(Number);
  return { month, year };
}

export function getAllTransactions(): Transaction[] {
  return readAll();
}

export function addTransaction(
  input: Pick<Transaction, "type" | "amount" | "category" | "date">
): Transaction {
  const { month, year } = monthYearFromDate(input.date);
  const transaction: Transaction = {
    id: crypto.randomUUID(),
    ...input,
    month,
    year,
  };
  const all = readAll();
  all.push(transaction);
  writeAll(all);
  return transaction;
}

export function deleteTransaction(id: string): void {
  const all = readAll().filter((t) => t.id !== id);
  writeAll(all);
}

/** Remplace tout le stockage — utilisé par la restauration de sauvegarde. */
export function replaceAllTransactions(transactions: Transaction[]): void {
  writeAll(transactions);
}
