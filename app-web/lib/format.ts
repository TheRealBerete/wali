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
