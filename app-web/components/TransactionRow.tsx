"use client";

import Link from "next/link";
import type { Transaction } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { formatGNF } from "@/lib/format";

interface TransactionRowProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

export default function TransactionRow({ transaction, onDelete }: TransactionRowProps) {
  const category = getCategory(transaction.category);

  function handleDelete(e: React.MouseEvent) {
    // La ligne entière est un lien vers le détail (voir <Link> plus bas) :
    // on stoppe la propagation pour que cliquer sur la poubelle ne déclenche
    // pas aussi la navigation vers la page de détail.
    e.preventDefault();
    e.stopPropagation();
    // Pas d'édition dans le PRD (§3) : on confirme avant de supprimer,
    // vu que c'est la seule façon de corriger une erreur de saisie.
    if (window.confirm("Supprimer cette dépense ?")) {
      onDelete(transaction.id);
    }
  }

  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className="flex items-center justify-between p-4 bg-surface border border-border rounded-card hover:border-primary/40 hover:-translate-y-0.5 transition-[transform,border-color] duration-200"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-xl">{category?.icon ?? "payments"}</span>
        </div>
        <p className="font-semibold truncate">{category?.label ?? "Dépense"}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-bold">- {formatGNF(transaction.amount)}</span>
        <button
          aria-label="Supprimer"
          onClick={handleDelete}
          className="text-muted hover:text-red-400 transition-colors p-1"
        >
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>
    </Link>
  );
}
