"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

// 🧠 Concept — rendu conditionnel
// En React, `if (!isOpen) return null;` veut dire "n'affiche rien du tout".
// C'est comme ça qu'on fait apparaître/disparaître une popup : pas de show/hide
// CSS, on ne rend simplement pas le composant tant qu'il n'est pas nécessaire.
export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-0 sm:p-4 animate-fade-in">
      <div className="bg-background w-full sm:max-w-md sm:rounded-card rounded-t-card max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <header className="flex items-center justify-between px-5 py-4 sticky top-0 bg-background">
          <button
            aria-label="Fermer"
            onClick={onClose}
            className="text-on-surface p-2 -ml-2 rounded-full hover:bg-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <span className="font-extrabold text-primary">{title}</span>
          <div className="w-10" />
        </header>
        <div className="px-5 pb-6">{children}</div>
      </div>
    </div>
  );
}
