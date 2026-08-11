"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Dashboard", icon: "grid_view" },
  { href: "/stats", label: "Stats", icon: "insights" },
  { href: "/profile", label: "Profile", icon: "person" },
] as const;

// 🧠 Concept — usePathname
// Ce hook de Next.js renvoie l'URL actuelle (ex: "/stats"). On s'en sert pour
// savoir quel onglet est "actif" et le mettre en surbrillance, sans avoir à
// gérer un état manuellement — l'URL EST la source de vérité de l'onglet actif.
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md border-t border-border">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-5">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 pt-2 transition-colors ${
                active ? "text-primary font-bold border-t-2 border-primary" : "text-muted"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-xs">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
