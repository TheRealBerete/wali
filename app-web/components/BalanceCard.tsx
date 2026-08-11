"use client";

import { formatGNF } from "@/lib/format";

interface BalanceCardProps {
  hasSalary: boolean;
  salaryAmount: number;
  totalExpenses: number;
  balance: number;
  onAddSalary: () => void;
}

export default function BalanceCard({
  hasSalary,
  salaryAmount,
  totalExpenses,
  balance,
  onAddSalary,
}: BalanceCardProps) {
  // Règle du PRD §5 : tant qu'aucun salaire n'est enregistré pour le mois,
  // on ne montre pas "0 GNF" (trompeur) mais une invitation claire à l'ajouter.
  if (!hasSalary) {
    return (
      <section className="bg-surface border border-border rounded-card p-6 text-center space-y-4 animate-fade-in-up">
        <p className="flex items-center justify-center gap-2 text-on-surface text-lg font-semibold">
          <span className="material-symbols-outlined text-primary">savings</span>
          Ajoute ton salaire du mois
        </p>
        <button
          onClick={onAddSalary}
          className="w-full bg-primary text-on-primary font-bold py-3 rounded-card active:scale-95 hover:scale-[1.02] transition-transform"
        >
          Ajouter mon salaire
        </button>
      </section>
    );
  }

  return (
    <section className="bg-primary rounded-card p-6 text-on-primary animate-fade-in-up">
      <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
        Il te reste
      </p>
      <div className="flex items-baseline gap-2 mb-6">
        <h2 className="text-5xl font-extrabold tracking-tight">
          {formatGNF(balance).replace(" GNF", "")}
        </h2>
        <span className="text-lg font-semibold">GNF</span>
      </div>
      <div className="flex justify-between text-sm font-medium border-t border-on-primary/15 pt-4">
        <span>Salaire du mois : {formatGNF(salaryAmount)}</span>
        <span>Dépenses : {formatGNF(totalExpenses)}</span>
      </div>
    </section>
  );
}
