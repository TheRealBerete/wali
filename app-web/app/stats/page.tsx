"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";
import LoadingScreen from "@/components/LoadingScreen";
import TrendChart from "@/components/TrendChart";
import { getAllTransactions } from "@/lib/storage";
import {
  getDateRangeForPeriod,
  getPreviousDateRange,
  filterExpensesByDateRange,
  getCategoryBreakdown,
  getTopExpenses,
  getExpenseTrend,
  sumAmount,
  type StatsPeriod,
} from "@/lib/calculations";
import { getCategory } from "@/lib/categories";
import { formatGNF, formatDateLong } from "@/lib/format";
import type { Transaction } from "@/lib/types";

const PERIODS: { id: StatsPeriod; label: string }[] = [
  { id: "week", label: "Semaine" },
  { id: "month", label: "Mois" },
  { id: "year", label: "Année" },
];

// Palette limitée au design system (jaune + nuances de gris) plutôt qu'un
// arc-en-ciel par catégorie — cohérent avec la charte "high-contrast
// minimalism" de la maquette (voir wali/DESIGN.md).
const PALETTE = ["#fce300", "#dec800", "#cdc7ab", "#979177", "#4b4732", "#333535", "#282a2b"];

function buildConicGradient(breakdown: { percent: number }[]): string {
  if (breakdown.length === 0) return "#282a2b 0% 100%";
  let acc = 0;
  return breakdown
    .map((item, i) => {
      const color = PALETTE[i % PALETTE.length];
      const start = acc;
      acc += item.percent;
      const end = i === breakdown.length - 1 ? 100 : acc;
      return `${color} ${start}% ${end}%`;
    })
    .join(", ");
}

export default function StatsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [period, setPeriod] = useState<StatsPeriod>("month");

  function load() {
    setTransactions(getAllTransactions());
    setIsLoaded(true);
  }

  useEffect(() => {
    // Lecture de localStorage au montage — cas d'usage légitime de useEffect
    // (synchroniser React avec un système externe indisponible côté serveur),
    // que cette règle expérimentale ne reconnaît pas encore correctement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  if (!isLoaded) return <LoadingScreen />;

  const { start, end } = getDateRangeForPeriod(period);
  const expenses = filterExpensesByDateRange(transactions, start, end);
  const total = sumAmount(expenses);
  const breakdown = getCategoryBreakdown(expenses);
  const topExpenses = getTopExpenses(expenses, 3);
  const trend = getExpenseTrend(expenses, period);

  const previousRange = getPreviousDateRange(period);
  const previousTotal = sumAmount(
    filterExpensesByDateRange(transactions, previousRange.start, previousRange.end)
  );
  // null = rien à comparer (aucune dépense sur la période précédente) plutôt
  // qu'un "+∞%" absurde.
  const delta =
    previousTotal > 0 ? Math.round(((total - previousTotal) / previousTotal) * 100) : null;

  return (
    <AuthGuard>
      <div className="min-h-screen pb-28 md:pb-10">
        <Sidebar />

        <div className="md:ml-64">
          <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border md:hidden">
            <div className="max-w-md mx-auto px-5 py-4 flex items-center gap-2">
              <Logo size={28} />
              <h1 className="text-2xl font-extrabold text-primary">Wali</h1>
            </div>
          </header>

          <main className="max-w-md md:max-w-4xl mx-auto md:mx-0 px-5 md:px-10 pt-6 md:pt-10 flex flex-col gap-8">
            <section>
              <h2 className="text-xl font-bold">Statistiques</h2>
              <p className="text-muted text-sm mt-1">Analyse tes dépenses</p>
            </section>

            <div className="flex bg-surface p-1 rounded-card md:max-w-sm">
              {PERIODS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`flex-1 py-2 rounded-card text-sm font-bold transition-all active:scale-95 ${
                    period === p.id
                      ? "bg-surface-strong text-on-surface border border-border"
                      : "text-muted hover:text-on-surface"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* `key={period}` force React à remonter ce bloc quand la période change,
                ce qui rejoue les animations d'apparition — petit feedback visuel
                que les chiffres viennent bien d'être recalculés. */}
            <div key={period} className="flex flex-col gap-8">
              {/* Tendance : total de la période + courbe + delta vs période précédente */}
              <section className="bg-surface border border-border rounded-card p-6 animate-fade-in-up">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-muted text-xs uppercase tracking-wider font-bold">
                      Total dépensé
                    </h3>
                    <p className="text-3xl font-extrabold mt-1">{formatGNF(total)}</p>
                  </div>

                  {delta !== null && (
                    <div
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold shrink-0 ${
                        delta > 0
                          ? "bg-negative/10 text-negative"
                          : delta < 0
                            ? "bg-positive/10 text-positive"
                            : "bg-surface-strong text-muted"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">
                        {delta > 0 ? "trending_up" : delta < 0 ? "trending_down" : "trending_flat"}
                      </span>
                      {delta > 0 ? "+" : ""}
                      {delta}%
                    </div>
                  )}
                </div>

                <TrendChart points={trend} />

                <p className="text-muted text-xs mt-3">
                  {delta !== null
                    ? `${formatGNF(previousTotal)} sur la période précédente`
                    : "Pas encore de période précédente à comparer."}
                </p>
              </section>

              <div className="flex flex-col md:flex-row gap-8">
                <section className="bg-surface border border-border rounded-card p-6 flex flex-col items-center md:flex-1 animate-fade-in-up">
                  <div
                    className="w-40 h-40 rounded-full flex items-center justify-center animate-scale-in"
                    style={{ background: `conic-gradient(${buildConicGradient(breakdown)})` }}
                  >
                    <div className="w-28 h-28 rounded-full bg-surface flex flex-col items-center justify-center text-center px-2">
                      <span className="text-muted text-xs">Par catégorie</span>
                      <span className="text-lg font-bold mt-1">
                        {breakdown.length} poste{breakdown.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {breakdown.length > 0 ? (
                    <div className="flex flex-col gap-3 mt-6 w-full">
                      {breakdown.map((item, i) => {
                        const category = getCategory(item.categoryId);
                        return (
                          <div
                            key={item.categoryId}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${150 + i * 60}ms` }}
                          >
                            <div className="flex items-center justify-between text-sm mb-1 gap-2">
                              <span className="flex items-center gap-2 min-w-0">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ background: PALETTE[i % PALETTE.length] }}
                                />
                                <span className="truncate">{category?.label ?? item.categoryId}</span>
                              </span>
                              <span className="text-muted text-xs shrink-0">
                                {item.percent}% · {formatGNF(item.total)}
                              </span>
                            </div>
                            {/* La barre grandit depuis la gauche (origin-left) plutôt que
                                depuis le centre : ça se lit comme une "jauge qui se remplit". */}
                            <div className="h-1.5 rounded-full bg-surface-strong overflow-hidden">
                              <div
                                className="h-full rounded-full origin-left animate-grow-bar"
                                style={{
                                  width: `${item.percent}%`,
                                  background: PALETTE[i % PALETTE.length],
                                  animationDelay: `${200 + i * 60}ms`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted text-sm mt-6">Aucune dépense sur cette période.</p>
                  )}
                </section>

                <section className="flex flex-col gap-4 md:flex-1">
                  <h3 className="font-semibold text-lg">Top 3 dépenses</h3>
                  {topExpenses.length === 0 && (
                    <p className="text-muted text-sm">Rien à montrer pour l&apos;instant.</p>
                  )}
                  <div className="flex flex-col gap-3">
                    {topExpenses.map((expense, i) => {
                      const category = getCategory(expense.category);
                      return (
                        <div
                          key={expense.id}
                          className="flex items-center justify-between p-4 bg-surface border border-border rounded-card hover:border-primary/40 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 animate-fade-in-up"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined">{category?.icon ?? "payments"}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold truncate">{category?.label ?? "Dépense"}</p>
                              <p className="text-muted text-xs">{formatDateLong(expense.date)}</p>
                            </div>
                          </div>
                          <span className="font-bold shrink-0">{formatGNF(expense.amount)}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
