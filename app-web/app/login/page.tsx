"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login(username, password)) {
      router.push("/");
    } else {
      setError("Identifiant ou mot de passe incorrect.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Logo size={44} />
            <h1 className="text-4xl font-extrabold text-primary">Wali</h1>
          </div>
          <p className="text-muted">Contrôle financier</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-card p-8 flex flex-col gap-6 animate-fade-in-up [animation-delay:80ms]"
        >
          <div className="text-center mb-2">
            <h2 className="font-semibold text-lg">Content de te revoir</h2>
            <p className="text-muted text-sm mt-1">Connecte-toi pour continuer.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xs uppercase tracking-wider text-muted font-bold">
              Identifiant
            </label>
            <div className="flex items-center gap-2 border-b border-border pb-2 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-muted text-xl">person</span>
              <input
                id="username"
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-transparent outline-none placeholder-border"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs uppercase tracking-wider text-muted font-bold">
              Mot de passe
            </label>
            <div className="flex items-center gap-2 border-b border-border pb-2 focus-within:border-primary transition-colors">
              <span className="material-symbols-outlined text-muted text-xl">lock</span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full bg-transparent outline-none placeholder-border"
              />
              <button
                type="button"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={() => setShowPassword((v) => !v)}
                className="text-muted hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center animate-fade-in-up">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full h-14 bg-primary text-on-primary font-bold rounded-card flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] transition-transform group"
          >
            Se connecter
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>
        </form>

        <p className="text-center text-muted text-xs mt-6">
          Projet perso, pas un vrai système d&apos;auth — identifiants : <span className="text-on-surface">admin</span> / <span className="text-on-surface">admin</span>
        </p>
      </div>
    </div>
  );
}
