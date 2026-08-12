"use client";

import { useState } from "react";
import Modal from "./Modal";
import { addTransaction } from "@/lib/storage";
import { formatAmount, amountInputSizeClass } from "@/lib/format";
import { todayDateKey } from "@/lib/calculations";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId } from "@/lib/types";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddExpenseModal({ isOpen, onClose, onSaved }: AddExpenseModalProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryId>(CATEGORIES[0].id);
  const [date, setDate] = useState(todayDateKey());

  function handleAmountChange(raw: string) {
    const digitsOnly = raw.replace(/\D/g, "");
    setAmount(digitsOnly ? formatAmount(Number(digitsOnly)) : "");
  }

  function handleClose() {
    setAmount("");
    setCategory(CATEGORIES[0].id);
    setDate(todayDateKey());
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const numericAmount = Number(amount.replace(/\D/g, ""));
    if (!numericAmount || numericAmount <= 0) return;

    addTransaction({
      type: "expense",
      amount: numericAmount,
      category,
      date,
    });

    onSaved();
    handleClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Wali">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 pt-2">
        {/* Montant */}
        <div className="flex flex-col items-center gap-2 py-4">
          <span className="text-xs uppercase tracking-wider text-muted font-bold">
            Montant de la dépense
          </span>
          <input
            autoFocus
            inputMode="numeric"
            placeholder="0"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className={`bg-transparent text-primary ${amountInputSizeClass(
              amount || "0"
            )} font-extrabold text-center outline-none w-full min-w-0 placeholder-border transition-[font-size] duration-150`}
          />
          <span className="text-muted font-semibold">GNF</span>
        </div>

        {/* Catégorie — 🧠 Concept : "controlled input" via radio caché
            Chaque catégorie est un <input type="radio"> invisible (sr-only) lié à un
            <label> stylé. Cliquer sur le label coche le radio correspondant, et React
            relit `category` pour savoir lequel est actif — pas besoin de gérer le clic
            à la main sur chaque case. */}
        <div>
          <h3 className="text-center font-semibold mb-4">Catégorie</h3>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-card border cursor-pointer transition-all duration-150 active:scale-95 ${
                  category === cat.id
                    ? "border-primary bg-primary/10 text-primary scale-105"
                    : "border-border bg-surface text-on-surface hover:border-primary/30"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  className="sr-only"
                  checked={category === cat.id}
                  onChange={() => setCategory(cat.id)}
                />
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                <span className="text-sm text-center">{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date optionnelle (par défaut aujourd'hui) */}
        <div className="min-w-0">
          <label className="block text-xs uppercase tracking-wider text-muted font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full max-w-full min-w-0 box-border bg-surface border border-border rounded-card px-4 py-3 text-on-surface outline-none focus:border-primary [color-scheme:dark]"
          />
        </div>

        <button
          type="submit"
          disabled={!amount}
          className="w-full bg-primary text-on-primary font-bold py-4 rounded-full active:scale-95 hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
        >
          Ajouter
        </button>
      </form>
    </Modal>
  );
}
