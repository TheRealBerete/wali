"use client";

import { useState } from "react";
import { formatCompactAmount, formatGNF } from "@/lib/format";
import type { TrendPoint } from "@/lib/calculations";

interface TrendChartProps {
  points: TrendPoint[];
}

// Dimensions du système de coordonnées SVG (pas des pixels réels — le SVG
// s'étire ensuite pour remplir son conteneur, voir `preserveAspectRatio`).
const VIEW_W = 300;
const VIEW_H = 120;
const PAD_TOP = 14;
const PAD_BOTTOM = 4;

/**
 * 🧠 Concept — spline de Catmull-Rom convertie en courbes de Bézier
 * Relier des points par des lignes droites donne un tracé anguleux. Cette
 * formule calcule, pour chaque segment, deux "poignées" à partir des points
 * voisins : la courbe résultante passe exactement par chaque valeur réelle,
 * mais avec des transitions arrondies entre elles — un vrai graphe de
 * tendance, pas juste une ligne brisée.
 */
function buildSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

/** Graphe de tendance (aire + courbe lissée) des dépenses sur la période. */
export default function TrendChart({ points }: TrendChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (points.length === 0) return null;

  const max = Math.max(...points.map((p) => p.total), 1);
  const usableH = VIEW_H - PAD_TOP - PAD_BOTTOM;
  const coords = points.map((p, i) => ({
    x: points.length === 1 ? VIEW_W / 2 : (i / (points.length - 1)) * VIEW_W,
    y: PAD_TOP + usableH - (p.total / max) * usableH,
  }));

  const linePath = buildSmoothPath(coords);
  const last = coords[coords.length - 1];
  const first = coords[0];
  const areaPath = `${linePath} L ${last.x.toFixed(2)} ${VIEW_H} L ${first.x.toFixed(2)} ${VIEW_H} Z`;

  // Trop de points (jusqu'à ~31 pour un mois) ferait chevaucher les
  // étiquettes : on n'en garde qu'une sur N, plus toujours la dernière.
  const labelStep = Math.max(1, Math.ceil(points.length / 7));

  return (
    <div className="w-full">
      <div className="relative">
        <span className="absolute left-0 top-0 text-[10px] text-muted select-none">
          {formatCompactAmount(max)}
        </span>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className="w-full h-40 overflow-visible"
        >
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Lignes de repère horizontales (haut / milieu / bas) */}
          {[0, 0.5, 1].map((t) => (
            <line
              key={t}
              x1="0"
              x2={VIEW_W}
              y1={PAD_TOP + usableH * t}
              y2={PAD_TOP + usableH * t}
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
          ))}

          <path
            d={areaPath}
            fill="url(#trend-fill)"
            className="animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          />
          <path
            d={linePath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            vectorEffect="non-scaling-stroke"
            className="animate-draw-line"
          />

          {coords.map((c, i) => (
            <circle
              key={points[i].key}
              cx={c.x}
              cy={c.y}
              r={hovered === i ? 4.5 : 2.5}
              fill={hovered === i ? "var(--primary)" : "var(--background)"}
              stroke="var(--primary)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              className="transition-all duration-150 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
      </div>

      <div className="flex justify-between text-[10px] text-muted mt-1 px-0.5">
        {points.map((p, i) =>
          i % labelStep === 0 || i === points.length - 1 ? (
            <span key={p.key} className={hovered === i ? "text-primary font-bold" : ""}>
              {p.label}
            </span>
          ) : (
            <span key={p.key} />
          )
        )}
      </div>

      <div className="h-5 text-center animate-fade-in" key={hovered}>
        {hovered !== null && (
          <>
            <span className="text-xs text-muted">{points[hovered].label} — </span>
            <span className="text-sm font-bold text-primary">
              {formatGNF(points[hovered].total)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
