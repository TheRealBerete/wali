"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";
import LoadingScreen from "@/components/LoadingScreen";
import { getAllTransactions, deleteTransaction } from "@/lib/storage";
import { getCategory } from "@/lib/categories";
import { formatGNF, formatDateLong } from "@/lib/format";
import type { Transaction } from "@/lib/types";

// 🧠 Concept — route dynamique + useParams
// Le dossier `app/transactions/[id]/` avec des crochets crée une route
// dynamique : `/transactions/abc123` fait correspondre `id = "abc123"`.
// `useParams()` (Client Component) lit ce morceau d'URL directement, sans
// avoir à le passer manuellement en props.
export default function TransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null | undefined>(undefined);

  function load() {
    const found = getAllTransactions().find((t) => t.id === params.id) ?? null;
    setTransaction(found);
  }

  useEffect(() => {
    // Lecture de localStorage au montage — cas d'usage légitime de useEffect
    // (synchroniser React avec un système externe indisponible côté serveur),
    // que cette règle expérimentale ne reconnaît pas encore correctement.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ne doit se relancer que si l'id de l'URL change
  }, [params.id]);

  function handleDelete() {
    if (!transaction) return;
    if (window.confirm("Supprimer cette dépense ?")) {
      deleteTransaction(transaction.id);
      router.push("/");
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen pb-16">
        <Sidebar />

        <div className="md:ml-64">
          <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border md:static md:bg-transparent md:border-none md:backdrop-blur-none">
            <div className="max-w-md md:max-w-3xl mx-auto md:mx-0 px-5 md:px-10 py-4 md:py-10 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Retour
              </Link>
              <div className="flex items-center gap-2 md:hidden">
                <Logo size={24} />
              </div>
            </div>
          </header>

        <main className="max-w-md md:max-w-3xl mx-auto md:mx-0 px-5 md:px-10 pt-6 md:pt-0 flex flex-col gap-6">
          {transaction === undefined && <LoadingScreen />}

          {transaction === null && (
            <p className="text-muted text-center py-10">
              Cette transaction n&apos;existe pas (ou plus).
            </p>
          )}

          {transaction && (
            <>
              {(() => {
                const category = getCategory(transaction.category);
                const isExpense = transaction.type === "expense";
                return (
                  <>
                    <section className="bg-surface border border-border rounded-card p-6 flex flex-col gap-4 animate-fade-in-up">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">
                              {isExpense ? category?.icon ?? "payments" : "payments"}
                            </span>
                          </div>
                          <h2 className="font-semibold text-lg">
                            {isExpense ? category?.label ?? "Dépense" : "Salaire"}
                          </h2>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {isExpense ? "Sortie" : "Entrée"}
                        </span>
                      </div>
                      <div>
                        <p className="text-muted text-sm mb-1">Montant</p>
                        <p className="text-4xl font-extrabold">
                          {isExpense ? "- " : "+ "}
                          {formatGNF(transaction.amount)}
                        </p>
                      </div>
                    </section>

                    <section className="bg-surface border border-border rounded-card p-6 animate-fade-in-up [animation-delay:60ms]">
                      <p className="text-xs uppercase tracking-wider text-muted font-bold mb-2">Date</p>
                      <p className="flex items-center gap-2 font-semibold">
                        <span className="material-symbols-outlined text-muted text-xl">calendar_today</span>
                        {formatDateLong(transaction.date)}
                      </p>
                    </section>

                    {isExpense && (
                      <button
                        onClick={handleDelete}
                        className="w-full h-14 rounded-card bg-red-500/10 border border-red-500/20 text-red-400 font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white hover:scale-[1.02] active:scale-95 transition-all animate-fade-in-up [animation-delay:120ms]"
                      >
                        <span className="material-symbols-outlined">delete</span>
                        Supprimer
                      </button>
                    )}
                  </>
                );
              })()}
            </>
          )}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
