import type { CategoryId, Transaction } from "./types";

/** Transactions du mois/année sélectionné, triées de la plus récente à la plus ancienne. */
export function filterByMonth(
  transactions: Transaction[],
  year: number,
  month: number
): Transaction[] {
  return transactions
    .filter((t) => t.year === year && t.month === month)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Le salaire du mois : au plus une transaction 'salary' par mois (règle du PRD). */
export function getSalaryTransaction(
  monthTransactions: Transaction[]
): Transaction | undefined {
  return monthTransactions.find((t) => t.type === "salary");
}

export function getExpenses(monthTransactions: Transaction[]): Transaction[] {
  return monthTransactions.filter((t) => t.type === "expense");
}

export function sumAmount(transactions: Transaction[]): number {
  return transactions.reduce((total, t) => total + t.amount, 0);
}

/** Solde = salaire du mois − total des dépenses du mois (règle centrale du PRD §5). */
export function getBalance(monthTransactions: Transaction[]): number {
  const salary = getSalaryTransaction(monthTransactions);
  const expenses = getExpenses(monthTransactions);
  return (salary?.amount ?? 0) - sumAmount(expenses);
}

/** Libellé relatif façon maquette : "Aujourd'hui", "Hier", ou la date. */
export function getRelativeDayLabel(dateStr: string): string {
  const today = new Date();
  const todayKey = toDateKey(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = toDateKey(yesterday);

  if (dateStr === todayKey) return "Aujourd'hui";
  if (dateStr === yesterdayKey) return "Hier";

  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayDateKey(): string {
  return toDateKey(new Date());
}

// ---- Page Statistiques -----------------------------------------------

export type StatsPeriod = "week" | "month" | "year";

/**
 * Bornes [début, fin] (incluses, format YYYY-MM-DD) pour une période donnée,
 * relative à aujourd'hui. Les chaînes YYYY-MM-DD se comparent correctement
 * avec `<=`/`>=` comme des dates, pas besoin de les reconvertir.
 */
export function getDateRangeForPeriod(
  period: StatsPeriod,
  referenceDate: Date = new Date()
): { start: string; end: string } {
  const end = toDateKey(referenceDate);
  let startDate: Date;

  if (period === "week") {
    startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - 6);
  } else if (period === "month") {
    startDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  } else {
    startDate = new Date(referenceDate.getFullYear(), 0, 1);
  }

  return { start: toDateKey(startDate), end };
}

export function filterExpensesByDateRange(
  transactions: Transaction[],
  start: string,
  end: string
): Transaction[] {
  return transactions.filter(
    (t) => t.type === "expense" && t.date >= start && t.date <= end
  );
}

export interface CategoryBreakdownItem {
  categoryId: CategoryId;
  total: number;
  percent: number;
}

/** Total dépensé par catégorie sur une période, trié du plus gros au plus petit poste. */
export function getCategoryBreakdown(expenses: Transaction[]): CategoryBreakdownItem[] {
  const totals = new Map<CategoryId, number>();
  let grandTotal = 0;

  for (const expense of expenses) {
    if (!expense.category) continue;
    totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount);
    grandTotal += expense.amount;
  }

  return Array.from(totals.entries())
    .map(([categoryId, total]) => ({
      categoryId,
      total,
      percent: grandTotal > 0 ? Math.round((total / grandTotal) * 100) : 0,
    }))
    .sort((a, b) => b.total - a.total);
}

/** Les N dépenses individuelles les plus élevées de la période. */
export function getTopExpenses(expenses: Transaction[], n = 3): Transaction[] {
  return [...expenses].sort((a, b) => b.amount - a.amount).slice(0, n);
}
