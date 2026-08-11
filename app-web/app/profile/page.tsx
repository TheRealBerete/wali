"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";
import BackupRestore from "@/components/BackupRestore";
import { getUsername, logout } from "@/lib/auth";

// Réglages présents dans la maquette mais qui n'ont rien derrière (pas de
// backend, pas de vrai compte) : on les affiche pour l'esthétique de l'app,
// mais clairement désactivés plutôt que de faire semblant qu'ils marchent.
const INERT_SETTINGS = [
  { icon: "person_outline", label: "Informations personnelles" },
  { icon: "lock", label: "Sécurité et connexion" },
  { icon: "credit_card", label: "Méthodes de paiement" },
  { icon: "language", label: "Langue et région" },
  { icon: "help_outline", label: "Aide et support" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  function loadUsername() {
    setUsername(getUsername());
  }

  useEffect(() => {
    // Lecture de localStorage au montage — cas d'usage légitime de useEffect
    // (synchroniser React avec un système externe indisponible côté serveur),
    // que cette règle expérimentale ne reconnaît pas encore correctement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsername();
  }, []);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <AuthGuard>
      <div className="min-h-screen pb-28 md:pb-10">
        <Sidebar />

        <div className="md:ml-64">
          <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border md:hidden">
            <div className="max-w-md mx-auto px-5 py-4 flex items-center gap-2">
              <Logo size={28} />
              <h1 className="text-2xl font-extrabold text-primary">Wali</h1>
            </div>
          </header>

          <main className="max-w-md md:max-w-3xl mx-auto md:mx-0 px-5 md:px-10 pt-6 md:pt-10 flex flex-col gap-8">
            <section className="flex flex-col items-center gap-3 md:items-start md:flex-row md:gap-6 animate-fade-in-up">
              <div className="w-24 h-24 rounded-full bg-surface border-2 border-border flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-5xl text-primary">person</span>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold capitalize">{username || "Admin"}</h2>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-surface px-3 py-1 rounded-full border border-border">
                  <span className="material-symbols-outlined text-sm text-primary">smartphone</span>
                  <span className="text-sm text-muted">Compte local — données sur cet appareil</span>
                </div>
              </div>
            </section>

            <div className="flex flex-col md:flex-row md:gap-8">
              <section className="flex flex-col gap-2 md:flex-1">
                <h3 className="text-xs uppercase tracking-wider text-muted font-bold px-1 mb-1">
                  Paramètres du compte
                </h3>
                {INERT_SETTINGS.map((item, i) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-4 bg-surface border border-border rounded-card opacity-60 cursor-default animate-fade-in-up"
                    style={{ animationDelay: `${80 + i * 40}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-muted">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted border border-border rounded-full px-2 py-0.5">
                      Bientôt
                    </span>
                  </div>
                ))}
              </section>

              <div className="flex flex-col gap-8 md:flex-1 animate-fade-in-up [animation-delay:100ms]">
                <section className="flex flex-col gap-2">
                  <h3 className="text-xs uppercase tracking-wider text-muted font-bold px-1 mb-1">Données</h3>
                  <BackupRestore onRestored={() => router.push("/")} />
                </section>

                <button
                  onClick={handleLogout}
                  className="w-full h-14 border-2 border-border rounded-card font-bold text-red-400 hover:border-red-400 hover:bg-red-500/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">logout</span>
                  Déconnexion
                </button>
              </div>
            </div>
          </main>
        </div>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
