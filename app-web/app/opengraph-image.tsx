import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Wali — Contrôle financier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 🧠 Concept — pourquoi charger une police manuellement ici ?
// L'image OpenGraph n'est pas rendue par un navigateur classique : Next.js
// utilise Satori, un moteur qui transforme du JSX/CSS en image, sans accès
// aux polices système ni à next/font. Il faut donc lui fournir le fichier de
// police brut (ici en woff2) qu'on a téléchargé une fois dans app-web/assets/.
const jakartaExtraBold = readFile(
  join(process.cwd(), "assets/PlusJakartaSans-ExtraBold.ttf")
);

export default async function Image() {
  const fontData = await jakartaExtraBold;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#121414",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Même monogramme "W" que public/logo.svg et app/icon.svg,
              agrandi pour l'aperçu de partage. */}
          <svg width="150" height="150" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="22" fill="#1a1c1c" />
            <path
              d="M 25,33 L 38,65 L 50,41 L 62,65 L 75,33"
              fill="none"
              stroke="#fce300"
              strokeWidth={9.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontSize: 140,
              color: "#fce300",
              fontFamily: "Plus Jakarta Sans",
              lineHeight: 1,
            }}
          >
            Wali
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 32,
            color: "#cdc7ab",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          Suivi simple du salaire et des dépenses, en GNF
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: fontData,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
