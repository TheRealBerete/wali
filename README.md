# Wali

Un "tableur de poche" perso pour suivre son salaire mensuel et ses dépenses, en **GNF** (Franc Guinéen). Pas de backend, pas de compte réel : tout vit dans le navigateur.

- **`PRD.md`** — le cahier des charges d'origine (scope volontairement minimaliste).
- **`UI-UX Maquette/`** — la maquette de référence (écrans, design system).
- **`app-web/`** — l'application Next.js déployable.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack) — 100% Client Components, aucune route API.
- **Tailwind CSS v4** — design tokens repris de la maquette (`app-web/app/globals.css`).
- **Stockage** : `localStorage` (voir `app-web/lib/storage.ts`) — aucune base de données, aucun serveur.
- **Auth** : identifiants fixes `admin` / `admin`, en façade uniquement (pas de vraie sécurité — voir `app-web/lib/auth.ts`).

## Lancer en local

```bash
cd app-web
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Déployer sur Vercel

Le code déployable est dans `app-web/`, pas à la racine du repo. Lors de l'import du projet sur [vercel.com](https://vercel.com) :

1. **Import Git Repository** → sélectionner ce repo.
2. Dans les réglages du projet, mettre **Root Directory** = `app-web`.
3. Framework Preset : Next.js (détecté automatiquement).
4. Aucune variable d'environnement nécessaire (zéro backend).
5. **Deploy**.

Les déploiements suivants se feront automatiquement à chaque push sur la branche par défaut.
