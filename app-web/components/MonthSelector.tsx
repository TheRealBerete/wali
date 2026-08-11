"use client";

import { formatMonthLabel } from "@/lib/format";

interface MonthOption {
  year: number;
  month: number;
}

interface MonthSelectorProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}

// Génère les 12 derniers mois (mois courant en premier) — §E du PRD :
// "Voir le mois de", pour consulter le solde des mois précédents.
function getRecentMonths(): MonthOption[] {
  const options: MonthOption[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    options.push({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }
  return options;
}

export default function MonthSelector({ year, month, onChange }: MonthSelectorProps) {
  const options = getRecentMonths();

  return (
    <select
      aria-label="Voir le mois de"
      value={`${year}-${month}`}
      onChange={(e) => {
        const [y, m] = e.target.value.split("-").map(Number);
        onChange(y, m);
      }}
      className="bg-surface border border-border text-on-surface rounded-card px-4 py-2 text-sm font-medium outline-none focus:border-primary"
    >
      {options.map((opt) => (
        <option key={`${opt.year}-${opt.month}`} value={`${opt.year}-${opt.month}`}>
          {formatMonthLabel(opt.year, opt.month)}
        </option>
      ))}
    </select>
  );
}
