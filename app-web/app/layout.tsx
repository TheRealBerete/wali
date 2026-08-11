import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

// 🧠 Concept — next/font/google
// Next.js télécharge la police au moment du build et la sert depuis ton propre
// domaine (au lieu d'un <link> vers Google Fonts). Résultat : pas de requête
// externe au chargement, et pas de "flash" de police par défaut.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 🧠 Concept — metadataBase
// Next.js a besoin d'une URL absolue de référence pour transformer les
// chemins relatifs (comme l'image OpenGraph auto-générée) en URLs complètes
// dans les balises <meta og:image>. Sur Vercel, l'URL du déploiement est
// fournie automatiquement via une variable d'environnement — on n'a rien à
// configurer à la main, avec un repli sur localhost en développement.
const siteUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ? `https://${siteUrl}` : "http://localhost:3000"),
  title: "Wali",
  description: "Suivi simple du salaire et des dépenses, en GNF.",
  openGraph: {
    title: "Wali",
    description: "Suivi simple du salaire et des dépenses, en GNF.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wali",
    description: "Suivi simple du salaire et des dépenses, en GNF.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#121414",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${inter.variable} h-full`}>
      <head>
        {/* Material Symbols : police d'icônes utilisée dans toute la maquette Wali */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full bg-background text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
