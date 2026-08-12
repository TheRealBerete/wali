"use client";

import { useState } from "react";
import Modal from "./Modal";
import { addTransaction } from "@/lib/storage";
import { formatAmount, amountInputSizeClass } from "@/lib/format";

interface AddSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  onSaved: () => void;
}

// 🧠 Concept — useState
// `useState` donne à un composant une "mémoire" qui survit entre les rendus.
// `const [amount, setAmount] = useState("")` crée une variable `amount` et
// une fonction `setAmount` pour la changer. Appeler `setAmount(...)` dit à
// React : "redessine ce composant avec cette nouvelle valeur".
export default function AddSalaryModal({
  isOpen,
  onClose,
  year,
  month,
  onSaved,
}: AddSalaryModalProps) {
  const [amount, setAmount] = useState("");

  function handleAmountChange(raw: string) {
    const digitsOnly = raw.replace(/\D/g, "");
    setAmount(digitsOnly ? formatAmount(Number(digitsOnly)) : "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // empêche le rechargement de page par défaut d'un <form>
    const numericAmount = Number(amount.replace(/\D/g, ""));
    if (!numericAmount || numericAmount <= 0) return;

    const monthStr = String(month).padStart(2, "0");
    addTransaction({
      type: "salary",
      amount: numericAmount,
      category: null,
      date: `${year}-${monthStr}-01`, // le salaire n'a pas de jour précis, on fixe le 1er
    });

    setAmount("");
    onSaved();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wali">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 pt-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-muted font-bold">
            Salaire mensuel
          </span>
          <div className="flex items-end gap-2 w-full">
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
          </div>
          <span className="text-muted font-semibold">GNF</span>
        </div>
        <button
          type="submit"
          disabled={!amount}
          className="w-full bg-primary text-on-primary font-bold py-4 rounded-full active:scale-95 hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
        >
          Enregistrer
        </button>
        <p className="text-xs text-muted text-center -mt-4">
          Une fois enregistré, le salaire est verrouillé pour ce mois.
        </p>
      </form>
    </Modal>
  );
}
