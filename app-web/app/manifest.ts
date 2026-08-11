import type { MetadataRoute } from "next";

// 🧠 Concept — le manifest PWA
// Ce fichier décrit l'app aux navigateurs/OS pour qu'elle puisse être
// "installée" (icône sur l'écran d'accueil, ouverture en plein écran sans
// barre d'adresse). Next.js détecte automatiquement `app/manifest.ts` et
// génère /manifest.webmanifest + la balise <link> qui va avec — comme pour
// app/icon.svg, pas de configuration manuelle dans <head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wali — Contrôle financier",
    short_name: "Wali",
    description: "Suivi simple du salaire et des dépenses, en GNF.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#121414",
    theme_color: "#121414",
    lang: "fr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
