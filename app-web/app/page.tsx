"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Logo from "@/components/Logo";
import LoadingScreen from "@/components/LoadingScreen";
import BalanceCard from "@/components/BalanceCard";
import MonthSelector from "@/components/MonthSelector";
import AddSalaryModal from "@/components/AddSalaryModal";
import AddExpenseModal from "@/components/AddExpenseModal";
import TransactionList from "@/components/TransactionList";
import { getAllTransactions, deleteTransaction } from "@/lib/storage";
import {
  filterByMonth,
  getSalaryTransaction,
  getExpenses,
  sumAmount,
  getBalance,
} from "@/lib/calculations";
import type { Transaction } from "@/lib/types";

const now = new Date();

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [salaryModalOpen, setSalaryModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);

  // 🧠 Concept — useEffect
  // `useEffect(() => { ... }, [])` exécute son code une seule fois, juste
  // après le premier affichage du composant dans le navigateur. On s'en sert
  // ici pour lire localStorage — chose impossible pendant le rendu serveur
  // (voir la note dans lib/storage.ts) — sans faire planter le SSR de Next.js.
  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setTransactions(getAllTransactions());
    setIsLoaded(true);
  }

  function handleDelete(id: string) {
    deleteTransaction(id);
    refresh();
  }

  if (!isLoaded) return <LoadingScreen />;

  const monthTransactions = filterByMonth(transactions, year, month);
  const salary = getSalaryTransaction(monthTransactions);
  const expenses = getExpenses(monthTransactions);
  const totalExpenses = sumAmount(expenses);
  const balance = getBalance(monthTransactions);

  return (
    <AuthGuard>
      <div className="min-h-screen pb-28 md:pb-10">
        <Sidebar onAddClick={() => setExpenseModalOpen(true)} />

        <div className="md:ml-64">
          <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-sm border-b border-border md:static md:bg-transparent md:border-none md:backdrop-blur-none">
            <div className="max-w-md md:max-w-3xl mx-auto md:mx-0 px-5 md:px-10 py-4 md:py-10 flex items-center justify-between">
              <div className="flex items-center gap-2 md:hidden">
                <Logo size={28} />
                <h1 className="text-2xl font-extrabold text-primary">Wali</h1>
              </div>
              <h2 className="hidden md:block text-2xl font-bold">Tableau de bord</h2>
              <MonthSelector year={year} month={month} onChange={(y, m) => { setYear(y); setMonth(m); }} />
            </div>
          </header>

          <main className="max-w-md md:max-w-3xl mx-auto md:mx-0 px-5 md:px-10 pt-6 md:pt-0 flex flex-col gap-8">
            <BalanceCard
              hasSalary={!!salary}
              salaryAmount={salary?.amount ?? 0}
              totalExpenses={totalExpenses}
              balance={balance}
              onAddSalary={() => setSalaryModalOpen(true)}
            />

            <button
              onClick={() => setExpenseModalOpen(true)}
              className="md:hidden w-full bg-surface border-2 border-primary text-primary font-bold py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] transition-transform animate-fade-in-up [animation-delay:80ms]"
            >
              <span className="material-symbols-outlined">add</span>
              Ajouter une dépense
            </button>

            <section className="flex flex-col gap-4 animate-fade-in-up [animation-delay:120ms]">
              <h2 className="font-semibold text-lg">Dépenses du mois</h2>
              <TransactionList expenses={expenses} onDelete={handleDelete} />
            </section>
          </main>
        </div>

        <AddSalaryModal
          isOpen={salaryModalOpen}
          onClose={() => setSalaryModalOpen(false)}
          year={year}
          month={month}
          onSaved={refresh}
        />
        <AddExpenseModal
          isOpen={expenseModalOpen}
          onClose={() => setExpenseModalOpen(false)}
          onSaved={refresh}
        />

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
