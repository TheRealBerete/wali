"use client";

import type { Transaction } from "@/lib/types";
import { getRelativeDayLabel } from "@/lib/calculations";
import TransactionRow from "./TransactionRow";

interface TransactionListProps {
  expenses: Transaction[]; // déjà triées de la plus récente à la plus ancienne
  onDelete: (id: string) => void;
}

export default function TransactionList({ expenses, onDelete }: TransactionListProps) {
  if (expenses.length === 0) {
    return (
      <p className="text-muted text-sm text-center py-8">
        Aucune dépense enregistrée ce mois-ci.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {expenses.map((expense, index) => {
        const label = getRelativeDayLabel(expense.date);
        // Pas de variable mutable ici : on compare juste à l'élément
        // précédent du tableau (déjà trié) pour savoir si on change de jour.
        const previousLabel =
          index > 0 ? getRelativeDayLabel(expenses[index - 1].date) : null;
        const showHeader = label !== previousLabel;

        return (
          <div
            key={expense.id}
            className="animate-fade-in-up"
            // Petit effet de cascade : chaque ligne apparaît un peu après la
            // précédente. Plafonné à 8 pour qu'une longue liste ne mette pas
            // une éternité à finir de s'afficher.
            style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
          >
            {showHeader && (
              <p className="flex items-center gap-1.5 text-muted text-xs font-bold uppercase tracking-wider mb-2 mt-2 first:mt-0">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                {label}
              </p>
            )}
            <TransactionRow transaction={expense} onDelete={onDelete} />
          </div>
        );
      })}
    </div>
  );
}
