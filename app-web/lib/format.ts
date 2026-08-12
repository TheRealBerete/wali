/**
 * Formate un montant en GNF façon maquette : "2.500.000" (points comme
 * séparateurs de milliers, pas de décimales — le Franc Guinéen n'a pas de
 * sous-unité utilisée en pratique).
 *
 * 🧠 Concept — pourquoi la locale 'de-DE' ?
 * `toLocaleString` formate un nombre selon les conventions d'un pays. Il n'y a
 * pas de locale "GNF" officielle avec point comme séparateur, mais la locale
 * allemande (de-DE) utilise justement le point pour les milliers — on
 * "détourne" cette locale uniquement pour son format d'affichage.
 */
export function formatAmount(amount: number): string {
  return Math.round(amount).toLocaleString("de-DE");
}

export function formatGNF(amount: number): string {
  return `${formatAmount(amount)} GNF`;
}

/**
 * Classe Tailwind de taille de police pour un input de montant géant
 * (salaire, dépense). Sans ça, un nombre à 4 chiffres tient très bien en
 * `text-5xl`, mais un nombre à 8-9 chiffres déborde du champ : le navigateur
 * fait alors défiler le texte pour garder le curseur visible, ce qui masque
 * les premiers chiffres. On réduit progressivement la taille pour que le
 * montant entier reste toujours visible d'un coup.
 */
export function amountInputSizeClass(formatted: string): string {
  const len = formatted.length;
  if (len <= 9) return "text-5xl"; // "2.500.000" (7 chiffres + 2 points)
  if (len <= 11) return "text-4xl";
  if (len <= 13) return "text-3xl";
  return "text-2xl";
}

const MONTH_LABELS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export function formatMonthLabel(year: number, month: number): string {
  return `${MONTH_LABELS[month - 1]} ${year}`;
}

/** "2026-08-10" -> "10 Août 2026" */
export function formatDateLong(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTH_LABELS[month - 1]} ${year}`;
}

export const MONTH_SHORT_LABELS = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

// Lundi en premier (convention française), contrairement à `Date.getDay()`
// qui commence à dimanche (0) — voir `getExpenseTrend` dans calculations.ts.
export const WEEKDAY_SHORT_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

/**
 * Version compacte d'un montant pour les axes de graphique, où l'espace est
 * limité : "1.250.000" -> "1,3M", "45.000" -> "45k". `Intl.NumberFormat` avec
 * `notation: "compact"` fait tout le travail (arrondi + choix de l'unité).
 */
export function formatCompactAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(amount);
}
