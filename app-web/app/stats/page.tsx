"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";
import LoadingScreen from "@/components/LoadingScreen";
import { getAllTransactions } from "@/lib/storage";
import {
  getDateRangeForPeriod,
  filterExpensesByDateRange,
  getCategoryBreakdown,
  getTopExpenses,
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

          <main className="max-w-md md:max-w-3xl mx-auto md:mx-0 px-5 md:px-10 pt-6 md:pt-10 flex flex-col gap-8">
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
            <div key={period} className="flex flex-col md:flex-row gap-8">
              <section className="bg-surface border border-border rounded-card p-6 flex flex-col items-center md:flex-1 animate-fade-in-up">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center animate-scale-in"
                  style={{ background: `conic-gradient(${buildConicGradient(breakdown)})` }}
                >
                  <div className="w-36 h-36 rounded-full bg-surface flex flex-col items-center justify-center text-center px-2">
                    <span className="text-muted text-xs">Total dépensé</span>
                    <span className="text-xl font-bold mt-1">{formatGNF(total)}</span>
                  </div>
                </div>

                {breakdown.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-6 w-full">
                    {breakdown.map((item, i) => {
                      const category = getCategory(item.categoryId);
                      return (
                        <div
                          key={item.categoryId}
                          className="flex items-center gap-2 animate-fade-in-up"
                          style={{ animationDelay: `${150 + i * 60}ms` }}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ background: PALETTE[i % PALETTE.length] }}
                          />
                          <span className="text-sm">{category?.label ?? item.categoryId}</span>
                          <span className="text-muted text-xs">{item.percent}%</span>
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
          </main>
        </div>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
