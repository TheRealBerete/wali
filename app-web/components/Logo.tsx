interface LogoProps {
  size?: number;
  className?: string;
}

// Le fichier public/logo.svg contient déjà son propre fond arrondi (squircle
// noir), donc une simple balise <img> suffit — pas besoin de next/image ici :
// c'est un petit SVG local, déjà optimal, sans "layout shift" à éviter.
export default function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG local minuscule et déjà optimal ; next/image n'optimise pas les SVG et ajouterait de la complexité pour rien ici.
    <img
      src="/logo.svg"
      alt="Wali"
      width={size}
      height={size}
      className={`rounded-md shrink-0 ${className}`}
    />
  );
}
