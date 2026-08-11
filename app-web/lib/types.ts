// 🧠 Concept — type union ('salary' | 'expense')
// Au lieu de deux tables séparées (comme le PRD le propose en SQL), on a UNE
// seule "forme" de donnée avec un champ `type` qui dit ce qu'elle représente.
// TypeScript peut alors vérifier à la compilation qu'on n'écrit jamais
// autre chose que 'salary' ou 'expense' dans ce champ.
export type TransactionType = "salary" | "expense";

export type CategoryId =
  | "manger"
  | "vetements"
  | "plaisir"
  | "transport"
  | "logement"
  | "sante"
  | "cadeaux";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number; // en GNF, toujours un entier positif (le signe est déduit du type)
  category: CategoryId | null; // null pour un salaire
  date: string; // format YYYY-MM-DD
  month: number; // 1-12, dérivé de `date`, stocké pour filtrer vite
  year: number; // dérivé de `date`
}
