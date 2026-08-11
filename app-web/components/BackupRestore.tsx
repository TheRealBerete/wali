"use client";

import { useRef } from "react";
import { getAllTransactions, replaceAllTransactions } from "@/lib/storage";
import { todayDateKey } from "@/lib/calculations";
import type { Transaction } from "@/lib/types";

interface BackupRestoreProps {
  onRestored: () => void;
}

// 🧠 Concept — Blob + URL.createObjectURL
// Un Blob est un "paquet de données brutes" (ici du texte JSON) que le
// navigateur peut traiter comme un fichier. `URL.createObjectURL` lui donne
// une URL temporaire (blob:...) qu'on peut mettre dans un <a download> pour
// déclencher un vrai téléchargement, sans jamais passer par un serveur.
function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function isValidBackup(data: unknown): data is Transaction[] {
  return (
    Array.isArray(data) &&
    data.every(
      (t) =>
        t &&
        typeof t.id === "string" &&
        (t.type === "salary" || t.type === "expense") &&
        typeof t.amount === "number" &&
        typeof t.date === "string"
    )
  );
}

export default function BackupRestore({ onRestored }: BackupRestoreProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleBackup() {
    const transactions = getAllTransactions();
    downloadJson(transactions, `wali-backup-${todayDateKey()}.json`);
  }

  // 🧠 Concept — FileReader
  // Un <input type="file"> ne donne accès qu'à un objet File (métadonnées).
  // FileReader lit réellement son contenu de façon asynchrone : on écoute
  // l'événement "load" pour récupérer le texte une fois la lecture terminée.
  function handleRestoreFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!isValidBackup(parsed)) {
          window.alert("Ce fichier ne ressemble pas à une sauvegarde Wali valide.");
          return;
        }
        if (
          window.confirm(
            "Ceci va remplacer toutes tes données actuelles par celles du fichier. Continuer ?"
          )
        ) {
          replaceAllTransactions(parsed);
          onRestored();
        }
      } catch {
        window.alert("Impossible de lire ce fichier (JSON invalide).");
      }
    };
    reader.readAsText(file);

    // Permet de re-sélectionner le même fichier une deuxième fois si besoin
    e.target.value = "";
  }

  return (
    <div className="flex gap-3 text-sm">
      <button
        onClick={handleBackup}
        className="flex-1 flex items-center justify-center gap-2 border border-border rounded-card py-3 text-on-surface hover:border-primary/50 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">download</span>
        Sauvegarder mes données
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex-1 flex items-center justify-center gap-2 border border-border rounded-card py-3 text-on-surface hover:border-primary/50 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">upload</span>
        Restaurer
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleRestoreFile}
      />
    </div>
  );
}
