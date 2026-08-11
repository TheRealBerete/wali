import Logo from "./Logo";

// Écran de chargement générique — remplace le texte "Wali" qu'on répétait
// dans chaque page pendant la lecture de localStorage (voir AuthGuard,
// dashboard, stats...). `animate-pulse` fait clignoter doucement le logo
// pour signaler "ça charge" sans figer complètement l'écran.
export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Logo size={48} className="animate-pulse" />
    </div>
  );
}
