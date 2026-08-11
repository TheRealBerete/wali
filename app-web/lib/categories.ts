import type { CategoryId } from "./types";

export interface Category {
  id: CategoryId;
  label: string;
  // Nom d'icône Material Symbols (voir globals.css pour comment elle s'affiche)
  icon: string;
}

// Les 7 catégories fixes du PRD. En dur, volontairement : pas de création
// possible côté utilisateur = pas de formulaire de gestion, pas de bugs.
export const CATEGORIES: Category[] = [
  { id: "manger", label: "Manger", icon: "restaurant" },
  { id: "vetements", label: "Vêtements & Accessoires", icon: "checkroom" },
  { id: "plaisir", label: "Plaisir personnel", icon: "sports_esports" },
  { id: "transport", label: "Transport", icon: "directions_car" },
  { id: "logement", label: "Logement", icon: "home" },
  { id: "sante", label: "Santé", icon: "favorite" },
  { id: "cadeaux", label: "Cadeaux / Sorties", icon: "redeem" },
];

export function getCategory(id: CategoryId | null): Category | undefined {
  if (!id) return undefined;
  return CATEGORIES.find((c) => c.id === id);
}
