"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import LoadingScreen from "./LoadingScreen";

interface AuthGuardProps {
  children: React.ReactNode;
}

// 🧠 Concept — garde de route côté client
// `useRouter` (de next/navigation) permet de rediriger depuis un Client
// Component, sans passer par un lien cliquable. On l'utilise ici comme un
// "videur à l'entrée" : si personne n'est connecté, on renvoie vers /login
// avant d'afficher le contenu protégé.
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  function checkAuth() {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    setChecked(true);
  }

  useEffect(() => {
    // La règle react-hooks/set-state-in-effect nous demande d'éviter un
    // setState direct ici, mais c'est justement le cas d'usage légitime de
    // useEffect qu'elle décrit elle-même : synchroniser l'état React avec un
    // système externe (localStorage) qui n'existe pas côté serveur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ne doit tourner qu'une fois au montage
  }, []);

  if (!checked) return <LoadingScreen />;

  return <>{children}</>;
}
