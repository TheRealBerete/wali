"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const TABS = [
  { href: "/", label: "Dashboard", icon: "grid_view" },
  { href: "/stats", label: "Statistics", icon: "insights" },
  { href: "/profile", label: "Profile", icon: "person" },
] as const;

interface SidebarProps {
  /** Sur le dashboard, ouvre directement la modale d'ajout au lieu de naviguer. */
  onAddClick?: () => void;
}

// 🧠 Concept — layout desktop en "rail" fixe
// Sur mobile, la nav est en bas (BottomNav) parce que le pouce y accède
// facilement. Sur desktop (souris, écran large), la convention est une
// colonne fixe à gauche : plus de place, toujours visible en scrollant.
// `hidden md:flex` bascule de l'une à l'autre selon la largeur d'écran —
// aucune donnée ni logique ne change, seulement la présentation.
export default function Sidebar({ onAddClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border py-10 z-40">
      <div className="px-6 mb-8 flex items-center gap-3">
        <Logo size={40} />
        <div>
          <h1 className="text-xl font-extrabold text-primary leading-tight">Wali</h1>
          <p className="text-[11px] uppercase tracking-wider text-muted">Contrôle financier</p>
        </div>
      </div>

      <ul className="flex-1 px-4 space-y-1">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-card transition-all ${
                  active
                    ? "bg-surface-strong text-primary font-bold"
                    : "text-muted hover:text-on-surface hover:bg-surface-strong/60 hover:translate-x-1"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-6 mt-auto">
        {onAddClick ? (
          <button
            onClick={onAddClick}
            className="w-full h-14 bg-primary text-on-primary font-bold rounded-card flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
            Ajouter une dépense
          </button>
        ) : (
          <Link
            href="/"
            className="w-full h-14 bg-primary text-on-primary font-bold rounded-card flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
            Ajouter une dépense
          </Link>
        )}
      </div>
    </nav>
  );
}
